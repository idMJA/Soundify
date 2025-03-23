/**
 * SoundifyAPI - Service for interacting with the Soundify Backend API
 */

// The base URL for the Soundify API
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Interface for Track objects
 */
export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
  uri: string;
}

/**
 * Interface for search response
 */
export interface SearchResponse {
  tracks: Track[];
  service: string;
  playbackService: string;
}

/**
 * Interface for player status
 */
export interface PlayerStatus {
  isPlaying: boolean;
  isPaused: boolean;
  volume: number;
  track?: string;
  author?: string;
  duration?: number;
  position?: number;
}

/**
 * Search for tracks using the Soundify Backend API
 * 
 * @param query - The search query
 * @returns Promise with search results
 */
export async function searchTracks(query: string): Promise<SearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Search request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data as SearchResponse;
  } catch (error) {
    console.error('Error searching tracks:', error);
    // Return empty results on error
    return {
      tracks: [],
      service: 'error',
      playbackService: 'error'
    };
  }
}

/**
 * Play a track using the Soundify Backend API
 * 
 * @param uri - The URI of the track to play
 * @returns Promise with play result
 */
export async function playTrack(uri: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/play?uri=${encodeURIComponent(uri)}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Play request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error playing track:', error);
    return {
      success: false,
      error: 'Failed to play track'
    };
  }
}

/**
 * Pause the currently playing track
 * 
 * @returns Promise with pause result
 */
export async function pauseTrack(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/pause`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Pause request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error pausing track:', error);
    return {
      success: false,
      error: 'Failed to pause track'
    };
  }
}

/**
 * Resume the currently paused track
 * 
 * @returns Promise with resume result
 */
export async function resumeTrack(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/resume`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Resume request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error resuming track:', error);
    return {
      success: false,
      error: 'Failed to resume track'
    };
  }
}

/**
 * Skip to the next track in the queue
 * 
 * @returns Promise with skip result
 */
export async function skipTrack(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/skip`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Skip request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error skipping track:', error);
    return {
      success: false,
      error: 'Failed to skip track'
    };
  }
}

/**
 * Set the player volume
 * 
 * @param volume - Volume level (0-100)
 * @returns Promise with volume result
 */
export async function setVolume(volume: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/volume?volume=${volume}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Volume request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error setting volume:', error);
    return {
      success: false,
      error: 'Failed to set volume'
    };
  }
}

/**
 * Get the current player status
 * 
 * @returns Promise with player status
 */
export async function getPlayerStatus(): Promise<PlayerStatus> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/status`);
    
    if (!response.ok) {
      throw new Error(`Status request failed with status ${response.status}`);
    }
    
    return await response.json() as PlayerStatus;
  } catch (error) {
    console.error('Error getting player status:', error);
    return {
      isPlaying: false,
      isPaused: false,
      volume: 50
    };
  }
} 