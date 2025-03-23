'use client';

import { useState, useEffect, useCallback } from 'react';
import * as SoundifyAPI from '../lib/soundifyApi';
import type { Track, PlayerStatus, SearchResponse } from '../lib/soundifyApi';

/**
 * React hook for interacting with the Soundify API
 */
export function useSoundify() {
  // State for search results
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // State for player
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>({
    isPlaying: false,
    isPaused: false,
    volume: 50
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the current player status
  const fetchPlayerStatus = useCallback(async () => {
    const status = await SoundifyAPI.getPlayerStatus();
    setPlayerStatus(status);
  }, []);
  
  // Update player status periodically
  useEffect(() => {
    // Initial status check
    fetchPlayerStatus();
    
    // Set up polling for status updates
    const interval = setInterval(() => {
      fetchPlayerStatus();
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [fetchPlayerStatus]);
  
  // Search for tracks
  const searchTracks = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await SoundifyAPI.searchTracks(query);
      setSearchResults(response.tracks);
    } catch (error) {
      console.error('Error in searchTracks:', error);
      setSearchError('Failed to search for tracks');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  // Play a track
  const playTrack = useCallback(async (track: Track) => {
    setIsLoading(true);
    
    try {
      await SoundifyAPI.playTrack(track.uri);
      // Update player status after playing
      fetchPlayerStatus();
    } catch (error) {
      console.error('Error in playTrack:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchPlayerStatus]);
  
  // Pause the current track
  const pauseTrack = useCallback(async () => {
    try {
      await SoundifyAPI.pauseTrack();
      // Update player status after pausing
      fetchPlayerStatus();
    } catch (error) {
      console.error('Error in pauseTrack:', error);
    }
  }, [fetchPlayerStatus]);
  
  // Resume the current track
  const resumeTrack = useCallback(async () => {
    try {
      await SoundifyAPI.resumeTrack();
      // Update player status after resuming
      fetchPlayerStatus();
    } catch (error) {
      console.error('Error in resumeTrack:', error);
    }
  }, [fetchPlayerStatus]);
  
  // Skip to the next track
  const skipTrack = useCallback(async () => {
    try {
      await SoundifyAPI.skipTrack();
      // Update player status after skipping
      fetchPlayerStatus();
    } catch (error) {
      console.error('Error in skipTrack:', error);
    }
  }, [fetchPlayerStatus]);
  
  // Set the volume
  const setVolume = useCallback(async (volume: number) => {
    try {
      await SoundifyAPI.setVolume(volume);
      // Update player status after setting volume
      fetchPlayerStatus();
    } catch (error) {
      console.error('Error in setVolume:', error);
    }
  }, [fetchPlayerStatus]);
  
  // Format duration in MM:SS format
  const formatDuration = useCallback((durationMs: number) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
  return {
    // Search
    searchResults,
    isSearching,
    searchError,
    searchTracks,
    
    // Player
    playerStatus,
    isLoading,
    playTrack,
    pauseTrack,
    resumeTrack,
    skipTrack,
    setVolume,
    
    // Utilities
    formatDuration
  };
} 