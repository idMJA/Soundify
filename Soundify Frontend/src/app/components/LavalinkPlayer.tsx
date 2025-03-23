'use client';

import { useState } from 'react';
import { useLavalink } from '../hooks/useLavalink';

interface Track {
  encoded?: string;
  uri?: string;
  info?: {
    title?: string;
    author?: string;
    uri?: string;
    identifier?: string;
    artworkUrl?: string;
  };
}

export default function LavalinkPlayer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [volume, setVolumeState] = useState(100);
  
  const {
    isLoading,
    error,
    currentTrack,
    isPlaying,
    searchTracks,
    playTrack,
    pausePlayback,
    resumePlayback,
    stopPlayback,
    setVolume,
  } = useLavalink();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const results = await searchTracks(searchQuery);
    if (results?.tracks) {
      setSearchResults(results.tracks);
    }
  };

  const handlePlay = async (track: Track) => {
    // If track.encoded exists, use that, otherwise use track.uri or track.info.uri
    const trackIdentifier = track.encoded || track.uri || track.info?.uri || `ytsearch:${track.info?.title || 'music'}`;
    await playTrack(trackIdentifier, { volume });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value, 10);
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Lavalink Player</h2>
      
      {/* Search section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for tracks..."
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
          {error}
        </div>
      )}
      
      {/* Now playing */}
      {currentTrack && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Now Playing</h3>
          <div className="flex items-center mt-2">
            {currentTrack.artworkUrl && (
              <img 
                src={currentTrack.artworkUrl} 
                alt={currentTrack.title} 
                className="w-16 h-16 rounded-md mr-4 object-cover"
              />
            )}
            <div>
              <p className="text-white font-medium">{currentTrack.title}</p>
              <p className="text-gray-400">{currentTrack.author}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex mt-4 space-x-2">
            {isPlaying ? (
              <button
                type="button"
                onClick={pausePlayback}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={resumePlayback}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Play
              </button>
            )}
            <button
              type="button"
              onClick={stopPlayback}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Stop
            </button>
          </div>
          
          {/* Volume control */}
          <div className="mt-4">
            <label htmlFor="volume-control" className="block text-sm text-gray-400 mb-1">
              Volume: {volume}%
            </label>
            <input
              id="volume-control"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
      
      {/* Search results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Search Results</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {searchResults.map((track) => (
              <button
                type="button"
                key={track.encoded || track.uri || track.info?.uri || track.info?.identifier || `track-${Date.now()}-${Math.random()}`}
                className="flex w-full items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-left"
                onClick={() => handlePlay(track)}
                aria-label={`Play ${track.info?.title || 'track'}`}
              >
                {track.info?.artworkUrl && (
                  <img
                    src={track.info.artworkUrl}
                    alt={track.info.title}
                    className="w-10 h-10 rounded-md mr-3 object-cover"
                  />
                )}
                <div className="overflow-hidden">
                  <p className="text-white text-sm font-medium truncate">
                    {track.info?.title || 'Unknown Title'}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {track.info?.author || 'Unknown Artist'}
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    type="button"
                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(track);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <title>Play</title>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 