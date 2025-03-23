import { useState, useEffect, useCallback } from 'react';

interface TrackInfo {
  title: string;
  author: string;
  length: number;
  identifier: string;
  isStream: boolean;
  uri: string;
  artworkUrl?: string;
}

interface PlayOptions {
  volume?: number;
  noReplace?: boolean;
}

export function useLavalink() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Search for tracks
  const searchTracks = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/lavalink/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search for tracks');
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search for tracks');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Play a track
  const playTrack = useCallback(async (query: string, options?: PlayOptions) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/lavalink/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          volume: options?.volume ?? 100,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to play track');
      }
      
      const data = await response.json();
      
      setCurrentTrack(data.trackInfo);
      setIsPlaying(true);
      setSessionId(data.sessionId);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play track');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Control playback (pause, resume, stop)
  const controlPlayback = useCallback(async (action: 'pause' | 'resume' | 'stop' | 'volume' | 'destroy', options?: { volume?: number }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/lavalink/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...(options || {}),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${action} playback`);
      }
      
      const data = await response.json();
      
      // Update local state based on action
      if (action === 'pause') {
        setIsPlaying(false);
      } else if (action === 'resume') {
        setIsPlaying(true);
      } else if (action === 'stop' || action === 'destroy') {
        setIsPlaying(false);
        setCurrentTrack(null);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} playback`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Pause playback
  const pausePlayback = useCallback(() => {
    return controlPlayback('pause');
  }, [controlPlayback]);

  // Resume playback
  const resumePlayback = useCallback(() => {
    return controlPlayback('resume');
  }, [controlPlayback]);

  // Stop playback
  const stopPlayback = useCallback(() => {
    return controlPlayback('stop');
  }, [controlPlayback]);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    return controlPlayback('volume', { volume });
  }, [controlPlayback]);

  // Clean up player when component unmounts
  useEffect(() => {
    return () => {
      if (sessionId) {
        // Attempt to destroy the player when component unmounts
        fetch('/api/lavalink/control', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'destroy',
          }),
        }).catch((err) => {
          console.error('Failed to clean up player:', err);
        });
      }
    };
  }, [sessionId]);

  return {
    isLoading,
    error,
    currentTrack,
    isPlaying,
    sessionId,
    searchTracks,
    playTrack,
    pausePlayback,
    resumePlayback,
    stopPlayback,
    setVolume,
  };
} 