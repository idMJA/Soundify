import { LavalinkManager } from "lavalink-client";
import type { Player } from "lavalink-client";
import { NextResponse } from "next/server";

// Extend LavalinkManager type to include the methods used but not properly typed
interface ExtendedLavalinkManager extends LavalinkManager {
  search?: (options: { query: string; source?: string }) => Promise<unknown>;
  rest?: Record<string, unknown>;
  // The original createPlayer returns Player, not Promise<Player>
  createPlayer(options: {
    guildId: string;
    voiceChannelId: string;
    textChannelId: string;
    selfDeaf?: boolean;
    selfMute?: boolean;
  }): Player;
}

// Initialize Lavalink client (this should be in a separate file and properly managed)
let lavalinkManager: ExtendedLavalinkManager | null = null;
let nodeConnected = false;

// Initialize the Lavalink manager if it doesn't exist
export async function getLavalinkManager(): Promise<ExtendedLavalinkManager> {
  if (!lavalinkManager) {
    console.log("Creating new Lavalink manager instance");
    // First cast to unknown, then to our extended type to avoid direct incompatible casting
    const manager = new LavalinkManager({
      nodes: [
        {
          authorization: "AlyaMahiru",
          host: "localhost",
          port: 5556,
          id: "main",
          secure: false,
          retryAmount: 5,       // Add retries
          retryDelay: 3000,     // Retry delay in ms
        }
      ],
      sendToShard: (guildId, payload) => {
        // This would be handled differently in a web context
        console.log(`Sending to guild ${guildId}:`, payload);
      },
      client: {
        id: "Soundify",
        username: "Soundify",
      },
      playerOptions: {
        defaultSearchPlatform: "ytmsearch",
      }
    });
    
    // Safe casting
    lavalinkManager = manager as unknown as ExtendedLavalinkManager;
    
    try {
      // Initialize the client
      await lavalinkManager.init({ id: "Soundify", username: "Soundify" });
      
      // Add node connection event listener
      lavalinkManager.nodeManager.on("connect", (node) => {
        console.log(`Node ${node.id} connected successfully!`);
        nodeConnected = true;
      });
      
      // Add node disconnect event listener
      lavalinkManager.nodeManager.on("disconnect", (node) => {
        console.log(`Node ${node.id} disconnected!`);
        nodeConnected = false;
      });
      
      // Add node error event listener
      lavalinkManager.nodeManager.on("error", (node, error) => {
        console.error(`Node ${node.id} encountered an error:`, error);
        
        // Handle v4/info error specifically
        if (error?.message?.includes("/v4/info")) {
          console.log("Version incompatibility detected. The Lavalink server might be using v3 API.");
          // The node will try to reconnect automatically with retryAmount
        }
      });
      
      // Log available methods to help debugging
      console.log("LavalinkManager methods:", Object.keys(lavalinkManager));
      console.log("Has direct search?", typeof lavalinkManager.search === 'function');
      console.log("Has REST API?", !!lavalinkManager.rest);
      
      if (lavalinkManager.rest) {
        console.log("REST API methods:", Object.keys(lavalinkManager.rest));
      }
      
      // Wait for node connection (with timeout)
      try {
        await waitForNodeConnection(10000); // Increase timeout to 10 seconds
      } catch (error) {
        console.error("Error connecting to Lavalink node:", error);
        // Continue anyway - the app can handle not having a connected node
      }
    } catch (error) {
      console.error("Failed to initialize Lavalink manager:", error);
      // Don't throw, just log the error
      // This allows the app to function even without Lavalink
    }
  } else if (!nodeConnected) {
    // If manager exists but node isn't connected, try to wait for connection
    try {
      await waitForNodeConnection(5000);
    } catch (error) {
      console.error("Error reconnecting to Lavalink node:", error);
      // Continue anyway
    }
  }
  
  return lavalinkManager;
}

// Function to wait for node connection with timeout
async function waitForNodeConnection(timeoutMs = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already connected
    if (nodeConnected) {
      return resolve();
    }
    
    if (!lavalinkManager) {
      return reject(new Error("LavalinkManager not initialized"));
    }
    
    // Check if any nodes are connected
    const connectedNodes = Array.from(lavalinkManager.nodeManager.nodes.values()).filter(node => node.connected);
    if (connectedNodes.length > 0) {
      nodeConnected = true;
      return resolve();
    }
    
    // Set timeout for connection
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Timed out waiting for Lavalink node connection"));
    }, timeoutMs);
    
    // Set up connection event listener
    const connectHandler = () => {
      cleanup();
      nodeConnected = true;
      resolve();
    };
    
    // Clean up function
    function cleanup() {
      clearTimeout(timeout);
      if (lavalinkManager) {
        lavalinkManager.nodeManager.removeListener("connect", connectHandler);
      }
    }
    
    // Listen for connection event
    lavalinkManager.nodeManager.on("connect", connectHandler);
    
    // Try to connect nodes manually
    for (const node of lavalinkManager.nodeManager.nodes.values()) {
      if (!node.connected) {
        node.connect();
      }
    }
  });
}

export async function GET(request: Request) {
  try {
    const manager = await getLavalinkManager();
    const nodes = Array.from(manager.nodeManager.nodes.values()).map(node => ({
      id: node.id,
      connected: node.connected,
    }));
    
    if (!nodes.some(node => node.connected)) {
      return NextResponse.json(
        { error: "No Lavalink nodes are connected. Make sure your Lavalink server is running." }, 
        { status: 503 }
      );
    }
    
    return NextResponse.json({ status: "ok", nodes });
  } catch (error) {
    console.error("Lavalink error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to connect to Lavalink: ${errorMessage}` }, 
      { status: 503 }
    );
  }
} 