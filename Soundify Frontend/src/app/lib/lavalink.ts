import { Shoukaku } from 'shoukaku';
import type { Node, Player, NodeOption } from 'shoukaku';

// Define the Nodes configuration
const Nodes = [
  {
    name: 'Lavalink',
    url: process.env.LAVALINK_URL || 'localhost:2333',
    auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
    secure: process.env.LAVALINK_SECURE === 'true',
  },
];

// Create a class to manage Lavalink connections
class LavalinkManager {
  private static instance: LavalinkManager;
  private shoukaku: Shoukaku | null = null;
  private initialized = false;
  private players: Map<string, Player> = new Map();

  private constructor() {
    // Private constructor to enforce singleton
  }

  // Get singleton instance
  public static getInstance(): LavalinkManager {
    if (!LavalinkManager.instance) {
      LavalinkManager.instance = new LavalinkManager();
    }
    return LavalinkManager.instance;
  }

  // Initialize connection to Lavalink
  // Since we can't use the Discord.js connector directly in Next.js,
  // we use a custom connector implementation
  public initialize(): void {
    if (this.initialized) return;

    try {
      // Create the connector object required by Shoukaku v4
      const connector = {
        send: () => Promise.resolve(),
        sendWS: () => Promise.resolve(),
        configureResuming: () => Promise.resolve(),
        userId: 'web-client',
        guildId: () => 'web-guild',
        channelId: () => 'web-channel',
        shardId: () => 0
      };

      // Initialize Shoukaku
      // @ts-ignore - Custom connector for web usage with Shoukaku v4
      this.shoukaku = new Shoukaku(connector, Nodes, {
        resumeTimeout: 30,
        resumeByLibrary: true,
        reconnectTries: 3,
        reconnectInterval: 5000,
        restTimeout: 10000,
      });

      // Handle errors and connection events
      this.shoukaku.on('error', (_, error) => console.error('Lavalink error:', error));
      this.shoukaku.on('ready', (name) => console.log(`Lavalink node ${name} is ready`));
      this.shoukaku.on('disconnect', (name) => console.log(`Lavalink node ${name} disconnected`));

      this.initialized = true;
      console.log('Lavalink manager initialized');
    } catch (error) {
      console.error('Failed to initialize Lavalink manager:', error);
      this.initialized = false;
    }
  }

  // Get a Lavalink node
  public async getNode(): Promise<Node | null> {
    if (!this.shoukaku || !this.initialized) {
      this.initialize();
    }
    
    if (!this.shoukaku) return null;
    const nodes = Array.from(this.shoukaku.nodes.values());
    
    return nodes.length > 0 ? nodes[0] : null;
  }

  // Play a track by URL or search term
  public async play(
    sessionId: string,
    query: string,
    options?: {
      noReplace?: boolean;
      pause?: boolean;
      volume?: number;
    }
  ): Promise<{ track: Record<string, any>; player: Player }> {
    const node = await this.getNode();
    
    if (!node) {
      throw new Error('No Lavalink nodes available');
    }

    let player = this.players.get(sessionId);
    
    if (!player) {
      if (!this.shoukaku) {
        throw new Error('Shoukaku is not initialized');
      }
      
      player = await this.shoukaku.joinVoiceChannel({
        guildId: sessionId,
        channelId: 'web-channel',
        shardId: 0
      });
      
      if (!player) {
        throw new Error('Failed to create player');
      }

      this.players.set(sessionId, player);
      
      player.on('exception', (error) => console.error('Player exception:', error));
      player.on('end', () => {
        console.log('Track ended for session', sessionId);
      });
    }

    // Search for tracks safely with type casting
    const result = await node.rest.resolve(query) as any;
    
    // Check for results, handle different response types from Shoukaku v4
    if (!result) {
      throw new Error('No results found');
    }
    
    // Safely extract track information
    let trackData;
    
    if (result.tracks && Array.isArray(result.tracks) && result.tracks.length > 0) {
      trackData = result.tracks[0];
    } else if (result.track) {
      trackData = result.track;
    } else {
      throw new Error('No tracks found in the response');
    }
    
    // Play the track with error handling
    try {
      const trackParam = typeof trackData === 'string' 
        ? trackData 
        : (trackData.encoded || trackData.track || trackData);
      
      await player.playTrack({ track: trackParam });
    } catch (error) {
      console.error('Error playing track:', error);
      throw new Error('Failed to play track');
    }
    
    // Set volume if provided
    if (options?.volume !== undefined) {
      await player.setGlobalVolume(options.volume);
    }
    
    return { track: trackData, player };
  }

  // Stop playback for a session
  public async stop(sessionId: string): Promise<boolean> {
    const player = this.players.get(sessionId);
    if (player) {
      await player.stopTrack();
      return true;
    }
    return false;
  }

  // Pause playback for a session
  public async pause(sessionId: string, shouldPause = true): Promise<boolean> {
    const player = this.players.get(sessionId);
    if (player) {
      await player.setPaused(shouldPause);
      return true;
    }
    return false;
  }

  // Set volume for a session
  public async setVolume(sessionId: string, volume: number): Promise<boolean> {
    const player = this.players.get(sessionId);
    if (player) {
      await player.setGlobalVolume(volume);
      return true;
    }
    return false;
  }

  // Get current player for a session
  public getPlayer(sessionId: string): Player | undefined {
    return this.players.get(sessionId);
  }

  // Destroy player for a session
  public async destroyPlayer(sessionId: string): Promise<boolean> {
    const player = this.players.get(sessionId);
    if (player && this.shoukaku) {
      await this.shoukaku.leaveVoiceChannel(sessionId);
      this.players.delete(sessionId);
      return true;
    }
    return false;
  }

  // Search for tracks
  public async search(query: string): Promise<Record<string, any>> {
    const node = await this.getNode();
    if (!node) {
      throw new Error('No Lavalink nodes available');
    }

    const result = await node.rest.resolve(query) as any;
    if (!result) {
      throw new Error('Failed to resolve query');
    }
    
    return result;
  }
}

// Export singleton instance
export const lavalinkManager = LavalinkManager.getInstance();

// Initialize on import
if (typeof window === 'undefined') {
  // Only initialize on the server-side
  lavalinkManager.initialize();
} 