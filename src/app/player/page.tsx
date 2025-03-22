"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from 'sonner';
import Cookies from 'js-cookie';

// Define interfaces for type safety
interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  duration?: number;
  views?: number;
  uploadedDate?: string;
}

interface TrendingVideo {
  duration: number;
  thumbnail?: string;
  videoThumbnails?: Array<{
    quality: string;
    url: string;
    width: number;
    height: number;
  }>;
  title: string;
  uploadedDate: string;
  uploaderAvatar: string;
  uploaderUrl: string;
  uploaderVerified: boolean;
  url: string;
  views: number;
}

export default function Player() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [queue, setQueue] = useState<Track[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<string>("invidious");
  const [isSearching, setIsSearching] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState<Track[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Load volume from cookies when component mounts
  useEffect(() => {
    const savedVolume = Cookies.get('soundify_volume');
    if (savedVolume) {
      const parsedVolume = Number.parseInt(savedVolume, 10);
      setVolume(parsedVolume);
    }
  }, []);
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    // Initialize audio element and fetch trending videos when component mounts
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('ended', handleTrackEnded);
      audioRef.current.addEventListener('error', handleAudioError);
      
      // Fetch trending videos
      fetchTrendingVideos();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleTrackEnded);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current = null;
      }
    };
  }, []);
  
  // Update audio volume when volume state changes and save to cookies
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    // Save volume to cookies
    Cookies.set('soundify_volume', volume.toString(), { expires: 365 });
  }, [volume]);

  const fetchTrendingVideos = async () => {
    try {
      const response = await fetch('/api/invidious/trending?region=US');
      const data: TrendingVideo[] = await response.json();
      
      const formattedTrending: Track[] = data.map(video => {
        // Extract video ID safely with fallbacks
        let videoId = "unknown";
        if (video.url && typeof video.url === 'string') {
          const urlParts = video.url.split('v=');
          videoId = urlParts.length > 1 ? urlParts[1] : "unknown";
        }

        // Extract artist ID safely with fallbacks
        let artistId = "unknown";
        if (video.uploaderUrl && typeof video.uploaderUrl === 'string') {
          const channelParts = video.uploaderUrl.split('/channel/');
          artistId = channelParts.length > 1 ? channelParts[1] : "unknown";
        }

        // Extract thumbnail from videoThumbnails array
        let thumbnailUrl = "";
        if (video.videoThumbnails && video.videoThumbnails.length > 0) {
          // Try to get high quality thumbnail first, fallback to others
          const highQuality = video.videoThumbnails.find(t => t.quality === "high");
          const mediumQuality = video.videoThumbnails.find(t => t.quality === "medium");
          const anyQuality = video.videoThumbnails[0];
          
          thumbnailUrl = highQuality?.url || mediumQuality?.url || anyQuality.url;
        } else if (video.thumbnail) {
          // Fallback to direct thumbnail property if it exists
          thumbnailUrl = video.thumbnail;
        }

        return {
          id: videoId,
          title: video.title || "Unknown Title",
          artist: artistId,
          thumbnail: thumbnailUrl,
          duration: video.duration,
          views: video.views,
          uploadedDate: video.uploadedDate || "Unknown date"
        };
      });
      
      setTrendingVideos(formattedTrending);
    } catch (error) {
      console.error('Error fetching trending videos:', error);
    }
  };

  const handleTrackEnded = () => {
    // Play next track in queue
    if (queue.length > 0) {
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      playTrack(nextTrack);
    } else {
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const handleAudioError = (error: Event) => {
    console.error('Audio playback error:', error);
    handleTrackEnded(); // Skip to next track on error
  };

  const playTrack = async (track: Track) => {
    try {
      setIsPlaying(true);
      setCurrentTrack(track);
      
      // Get audio URL from your API using the existing /api/play endpoint
      const response = await fetch('/api/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ track }),
      });
      
      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        console.error(`Failed to fetch track: ${response.status} ${response.statusText}`);
        setIsPlaying(false);
        alert('Could not play this track. Please try a different track.');
        return;
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl;
          audioRef.current.play();
        }
      } else {
        console.error('No audio URL in the response data');
        setIsPlaying(false);
        alert('Could not play this track. No audio stream found.');
      }
    } catch (error) {
      console.error('Error playing track:', error);
      setIsPlaying(false);
      alert('Could not play this track due to an error.');
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.tracks || []);
      
      // Set the service that was used
      if (data.service) {
        setCurrentService(data.service);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Filter options
  const filterOptions = ["All", "Artists", "Songs", "Albums", "Playlists", "Podcasts & Shows", "Genres & Moods"];

  // Function to clear search and return to main content
  const clearSearch = () => {
    setQuery("");
    setShowSearchResults(false);
  };

  const pauseTrack = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      toast('Track paused');
    }
  };

  const resumeTrack = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      toast('Track resumed');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    
    // Show volume toast
    if (newVolume === 0) {
      toast('Volume: Muted');
    } else if (newVolume < 30) {
      toast(`Volume: ${newVolume}% (Low)`);
    } else if (newVolume < 70) {
      toast(`Volume: ${newVolume}% (Medium)`);
    } else {
      toast(`Volume: ${newVolume}% (High)`);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-gray-800 flex flex-col">
        {/* Navigation */}
        <div className="p-4 flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-white ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </button>
        </div>
        
        {/* Sidebar menu items */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Anime Theme Music</h3>
            
            <div className="mb-2 px-2 py-1 bg-gray-800 rounded flex items-center">
              <span className="text-xs text-gray-400">By you</span>
            </div>
            
            {/* Playlist items */}
            <div className="space-y-2 mt-4">
              {['Kimi no Koto ga Daidaidaidaisuki na 100-nin no Kanojo', 
                '2.5 Jigen no Ririsa', 
                'Aria', 
                'Akagami no Shirayuki-hime',
                'Make Heroine ga Oosugiru!',
                'Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san',
                'Karakai Jouzu no Takagi-san',
                'Summertime Render'].map((playlist, index) => (
                <button 
                  key={`playlist-item-${playlist.substring(0, 10)}`} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer w-full text-left"
                  type="button"
                  onClick={() => console.log(`Play ${playlist}`)}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded relative overflow-hidden">
                    <Image 
                      src={`https://picsum.photos/40/40?random=${index + 1}`}
                      alt={playlist}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{playlist}</p>
                    <p className="text-xs text-gray-400 truncate">iaMJ</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Header */}
        <header className="px-6 py-4 flex items-center justify-between bg-gray-900 sticky top-0 z-10">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="What do you want to play?"
              className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
          <button 
            type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={clearSearch}
          >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
          </button>
            )}
          </form>
          <div className="flex items-center gap-4 ml-4">
          <button 
            type="button"
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
          </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium">
              MJ
            </div>
        </div>
      </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black p-6">
          {showSearchResults ? (
            <>
              {/* Search Filters */}
              <div className="mb-6 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeFilter === filter 
                        ? 'bg-white text-black' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Results */}
              <div className="space-y-8">
                {/* Top Result Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Top result</h2>
                    <div className="bg-gray-800/40 hover:bg-gray-800/60 p-5 rounded-lg transition-all cursor-pointer">
                      {results.length > 0 && (
                        <div className="flex flex-col">
                          <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden shadow-lg">
                            <Image
                              src={results[0].thumbnail || '/placeholder-artist.jpg'}
                              alt={results[0].title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-2xl font-bold mb-1">{results[0].title}</h3>
                          <p className="text-sm text-gray-400 mb-4">Artist</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Songs Section */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Songs</h2>
                    <div className="space-y-2">
                      {results.slice(0, 4).map((track) => (
                        <button 
                          key={track.id} 
                          className="flex items-center p-2 hover:bg-gray-800/40 rounded-md cursor-pointer w-full text-left"
                          onClick={() => playTrack(track)}
                          type="button"
                          aria-label={`Play ${track.title}`}
                        >
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                              src={track.thumbnail || `https://picsum.photos/40/40?random=${track.id}`}
                              alt={track.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="ml-3 flex-1 overflow-hidden">
                            <h4 className="text-sm font-medium text-white truncate">{track.title}</h4>
                            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                          </div>
                          <div className="text-xs text-gray-400 ml-2">
                            {track.duration 
                              ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` 
                              : '3:42'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Artists Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Artists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {results.slice(0, 6).map((track) => (
                      <div key={track.id} className="flex flex-col items-center p-4 rounded-md hover:bg-gray-800/40 cursor-pointer text-center">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden mb-3">
                          <Image
                            src={track.thumbnail || '/placeholder-artist.jpg'}
                            alt={track.artist}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-medium truncate w-full">{track.artist}</h3>
                        <p className="text-xs text-gray-400 mt-1">Artist</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Daily Mix</h2>
                  <button type="button" className="text-sm text-gray-400 hover:text-white">Show all</button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {['Daily Mix 1', 'Daily Mix 2', 'Daily Mix 3', 'Daily Mix 4', 'Aria', 'Long Drives'].map((mix, index) => (
                    <button 
                      key={`daily-mix-${mix.replace(/\s+/g, '-').toLowerCase()}`}
                      className="bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left"
                      type="button"
                      onClick={() => console.log(`Play ${mix}`)}
                    >
                      <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
                        <Image
                          src={`https://picsum.photos/200/200?random=${index + 10}`}
                          alt={mix}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-sm">{mix}</h3>
                      <p className="text-xs text-gray-400 mt-1">Featured artists</p>
                    </button>
                  ))}
                </div>
              </section>

        <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Made for iaMJ</h2>
                  <button type="button" className="text-sm text-gray-400 hover:text-white">Show all</button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {trendingVideos.slice(0, 6).map((video) => (
              <button
                key={video.id}
                type="button"
                      className="bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left"
                onClick={() => playTrack(video)}
              >
                      <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
                  <Image
                    src={video.thumbnail || `https://picsum.photos/200/200?random=${video.id}`}
                    alt={video.title}
                    fill
                          className="object-cover"
                  />
                </div>
                      <h3 className="font-semibold text-sm truncate">{video.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {video.uploadedDate}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Recommended for today</h2>
                  <button type="button" className="text-sm text-gray-400 hover:text-white">Show all</button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {results.slice(0, 6).map((track) => (
              <button
                key={track.id}
                type="button"
                      className="bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left"
                onClick={() => playTrack(track)}
              >
                      <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
                  <Image
                          src={track.thumbnail || `https://picsum.photos/200/200?random=${track.id}`}
                    alt={track.title}
                    fill
                          className="object-cover"
                  />
                </div>
                      <h3 className="font-semibold text-sm truncate">{track.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                  {track.artist}
                </p>
              </button>
            ))}
          </div>
        </section>
            </>
          )}
      </main>

        {/* Now Playing Bar */}
        <footer className="h-20 bg-gray-900 border-t border-gray-800 p-4 flex items-center">
          {currentTrack ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded overflow-hidden">
                  <Image
                    src={currentTrack.thumbnail || 'https://picsum.photos/200/200?random=1'}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{currentTrack.title}</h4>
                  <p className="text-xs text-gray-400">{currentTrack.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line x1="5" y1="19" x2="5" y2="5" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
                
                <button type="button" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-white mr-1"
                  onClick={() => setVolume(volume > 0 ? 0 : 75)}
                >
                  {volume === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                      <path d="M17 16.95A7 7 0 0 1 12 19c-2.38 0-4.5-1.12-5.86-2.86" />
                    </svg>
                  ) : volume < 30 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  ) : volume < 70 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 accent-white"
                />
              </div>
            </div>
          ) : (
            <div className="w-full text-center text-gray-400">
              <p>Select a track to play</p>
            </div>
          )}
        </footer>
      </div>

      {/* Now Playing Panel (Right Side) */}
      {currentTrack && (
        <div className="w-96 flex-shrink-0 border-l border-gray-800 bg-gradient-to-b from-blue-900/30 to-black overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">{currentTrack.title}</h2>
              <button type="button" className="p-1 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="relative aspect-square mb-5 rounded-lg overflow-hidden">
              <Image
                src={currentTrack.thumbnail || 'https://picsum.photos/400/400?random=1'}
                alt={currentTrack.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
            
            {/* <div className="flex justify-between items-center mb-8">
              <button type="button" className="text-white font-medium flex items-center gap-2">
                Lyrics
              </button>
              <button type="button" className="text-gray-400 hover:text-white px-4 py-1 rounded-full border border-gray-600">
                Show lyrics
              </button>
            </div>
            
            <div className="mb-8">
              <h4 className="text-gray-400 font-medium mb-3">Credits</h4>
              <div className="flex flex-col gap-3">
                <div>
                  <h5 className="text-white">saya</h5>
                  <p className="text-gray-400 text-sm">Main Artist</p>
                </div>
              </div>
            </div>
            
            <button type="button" className="w-full text-right text-gray-400 hover:text-white">
              Show all
            </button> */}
          </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}