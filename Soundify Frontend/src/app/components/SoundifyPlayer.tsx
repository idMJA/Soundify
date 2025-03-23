'use client';

import { useState, useEffect, useRef } from 'react';
import { useSoundify } from '../hooks/useSoundify';
import type { Track } from '../lib/soundifyApi';

/**
 * SoundifyPlayer component for audio search and playback
 */
export default function SoundifyPlayer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const {
    searchResults,
    isSearching,
    searchError,
    searchTracks,
    playerStatus,
    isLoading,
    playTrack,
    pauseTrack,
    resumeTrack,
    skipTrack,
    setVolume,
    formatDuration
  } = useSoundify();
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchTracks(searchQuery);
  };
  
  // Handle track selection for playback
  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    playTrack(track);
  };
  
  // Handle play/pause toggle
  const handlePlayPauseToggle = () => {
    if (playerStatus.isPaused) {
      resumeTrack();
    } else {
      pauseTrack();
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
  };
  
  // Focus the search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Soundify Player</h1>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for songs..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchError && <p className="text-red-500 mt-2">{searchError}</p>}
      </form>
      
      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((track) => (
              <div 
                key={track.id} 
                className="border border-gray-200 rounded p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePlayTrack(track)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 shrink-0">
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-sm truncate">{track.title}</h3>
                    <p className="text-gray-500 text-xs truncate">{track.artist}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {formatDuration(track.duration)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Player controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 flex-1">
            {currentTrack && (
              <>
                <div className="w-12 h-12 shrink-0">
                  <img 
                    src={currentTrack.thumbnail} 
                    alt={currentTrack.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-medium text-sm truncate">{currentTrack.title}</h3>
                  <p className="text-gray-500 text-xs truncate">{currentTrack.artist}</p>
                </div>
              </>
            )}
            {!currentTrack && playerStatus.track && (
              <div className="overflow-hidden">
                <h3 className="font-medium text-sm truncate">{playerStatus.track}</h3>
                <p className="text-gray-500 text-xs truncate">{playerStatus.author}</p>
              </div>
            )}
            {!currentTrack && !playerStatus.track && (
              <div className="overflow-hidden">
                <p className="text-gray-500 text-sm">No track playing</p>
              </div>
            )}
          </div>
          
          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPauseToggle}
              disabled={!playerStatus.isPlaying}
              className="bg-blue-500 text-white h-10 w-10 rounded-full flex items-center justify-center disabled:bg-gray-300"
            >
              {playerStatus.isPaused ? '▶' : '⏸'}
            </button>
            <button
              onClick={skipTrack}
              disabled={!playerStatus.isPlaying}
              className="bg-blue-500 text-white h-10 w-10 rounded-full flex items-center justify-center disabled:bg-gray-300"
            >
              ⏭
            </button>
          </div>
          
          {/* Volume control */}
          <div className="flex items-center gap-2 w-32">
            <span className="text-gray-500">🔈</span>
            <input
              type="range"
              min="0"
              max="100"
              value={playerStatus.volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 