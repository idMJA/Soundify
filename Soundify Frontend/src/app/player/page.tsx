"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";

// Define interfaces for type safety
interface Track {
	id: string;
	title: string;
	artist: string;
	thumbnail: string;
	duration: number;
	views?: number;
	uploadedDate?: string;
	album?: string;
	uri?: string;
	spotifyUri?: string;
	source?: string;
	isrc?: string;
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

interface SpotifyToken {
	accessToken: string;
	expiresIn: number;
	timestamp: number;
}

interface SpotifyArtist {
	id: string;
	name: string;
	thumbnail?: string;
	uri: string;
}

interface SpotifyAlbum {
	id: string;
	name: string;
	artist: string;
	thumbnail?: string;
	uri: string;
}

// Types for Spotify API responses
interface SpotifyImage {
	url: string;
	height: number;
	width: number;
}

interface SpotifyArtistItem {
	id: string;
	name: string;
	images: SpotifyImage[];
	uri: string;
}

interface SpotifyAlbumItem {
	id: string;
	name: string;
	artists: Array<{ id: string; name: string }>;
	images: SpotifyImage[];
	uri: string;
}

interface SpotifyTrackItem {
	id: string;
	name: string;
	artists: Array<{ id: string; name: string }>;
	album: {
		id: string;
		name: string;
		images: SpotifyImage[];
	};
	duration_ms: number;
	uri: string;
}

interface SpotifyTrackExtended extends SpotifyTrackItem {
	external_ids?: {
		isrc?: string;
	};
}

// Interface for Spotify search response
interface SpotifySearchResponse {
	tracks?: {
		items: SpotifyTrackItem[];
	};
	artists?: {
		items: SpotifyArtistItem[];
	};
	albums?: {
		items: SpotifyAlbumItem[];
	};
}

export default function Player() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Track[]>([]);
	const [spotifyToken, setSpotifyToken] = useState<SpotifyToken | null>(null);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(75);
	const [queue, setQueue] = useState<Track[]>([]);
	const [currentService, setCurrentService] = useState<string>("spotify");
	const [isSearching, setIsSearching] = useState(false);
	const [trendingVideos, setTrendingVideos] = useState<Track[]>([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [activeFilter, setActiveFilter] = useState("All");
	const [artists, setArtists] = useState<SpotifyArtist[]>([]);
	const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);

	// Reference to the audio element
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Load volume from cookies when component mounts
	useEffect(() => {
		const savedVolume = Cookies.get("soundify_volume");
		if (savedVolume) {
			const parsedVolume = Number.parseInt(savedVolume, 10);
			setVolume(parsedVolume);
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Initialize audio element and fetch trending videos when component mounts
		if (typeof window !== "undefined" && !audioRef.current) {
			audioRef.current = new Audio();
			audioRef.current.volume = volume / 100;
			audioRef.current.addEventListener("ended", handleTrackEnded);
			audioRef.current.addEventListener("error", handleAudioError);

			// Fetch trending videos
			fetchTrendingVideos();

			// Preload Spotify token
			preloadSpotifyToken();
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.removeEventListener("ended", handleTrackEnded);
				audioRef.current.removeEventListener("error", handleAudioError);
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
		Cookies.set("soundify_volume", volume.toString(), { expires: 365 });
	}, [volume]);

	const fetchTrendingVideos = async () => {
		try {
			const response = await fetch("/api/invidious/trending?region=US");
			const data: TrendingVideo[] = await response.json();

			const formattedTrending: Track[] = data.map((video) => {
				// Extract video ID safely with fallbacks
				let videoId = "unknown";
				if (video.url && typeof video.url === "string") {
					const urlParts = video.url.split("v=");
					videoId = urlParts.length > 1 ? urlParts[1] : "unknown";
				}

				// Extract artist ID safely with fallbacks
				let artistId = "unknown";
				if (video.uploaderUrl && typeof video.uploaderUrl === "string") {
					const channelParts = video.uploaderUrl.split("/channel/");
					artistId = channelParts.length > 1 ? channelParts[1] : "unknown";
				}

				// Extract thumbnail from videoThumbnails array
				let thumbnailUrl = "";
				if (video.videoThumbnails && video.videoThumbnails.length > 0) {
					// Try to get high quality thumbnail first, fallback to others
					const highQuality = video.videoThumbnails.find(
						(t) => t.quality === "high",
					);
					const mediumQuality = video.videoThumbnails.find(
						(t) => t.quality === "medium",
					);
					const anyQuality = video.videoThumbnails[0];

					thumbnailUrl =
						highQuality?.url || mediumQuality?.url || anyQuality.url;
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
					uploadedDate: video.uploadedDate || "Unknown date",
				};
			});

			setTrendingVideos(formattedTrending);
		} catch (error) {
			console.error("Error fetching trending videos:", error);
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
			// Keep currentTrack to maintain the now playing info
		}
	};

	const handleAudioError = (error: Event) => {
		console.error("Audio playback error:", error);
		handleTrackEnded(); // Skip to next track on error
	};

	// Function to get Spotify access token
	const getSpotifyToken = async () => {
		try {
			// Check if we have a valid token already
			if (
				spotifyToken &&
				spotifyToken.timestamp + spotifyToken.expiresIn * 1000 > Date.now()
			) {
				return spotifyToken.accessToken;
			}

			// Generate timestamp for the request
			const currentTimestamp = Math.floor(Date.now() / 1000);

			toast.info("Connecting to Spotify...");

			// Make the token request
			const tokenUrl = `/api/spotify/token?ts=${currentTimestamp}`;
			const tokenRes = await fetch(tokenUrl);

			if (!tokenRes.ok) {
				const errorData = await tokenRes.json().catch(() => ({}));
				const errorMessage =
					errorData.error ||
					`Failed to authenticate with Spotify: ${tokenRes.status}`;
				throw new Error(errorMessage);
			}

			const tokenData = await tokenRes.json();

			if (tokenData.error) {
				throw new Error(tokenData.error);
			}

			const newToken = {
				accessToken: tokenData.accessToken,
				expiresIn: tokenData.expiresIn,
				timestamp: Date.now(),
			};

			setSpotifyToken(newToken);
			toast.success("Connected to Spotify!");
			return newToken.accessToken;
		} catch (error) {
			console.error("Error getting Spotify token:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to authenticate with Spotify",
			);
			return null;
		}
	};

	// Function to process Spotify search results
	const processSpotifyResults = (data: SpotifySearchResponse) => {
		// Process tracks
		const tracks: Track[] =
			data.tracks?.items.map((item: SpotifyTrackItem) => ({
				id: item.id,
				title: item.name,
				artist: item.artists.map((artist) => artist.name).join(", "),
				thumbnail: item.album.images[0]?.url,
				duration: Math.floor(item.duration_ms / 1000),
				album: item.album.name,
				spotifyUri: item.uri,
			})) || [];

		// Process artists
		const artistsData: SpotifyArtist[] =
			data.artists?.items.map((item: SpotifyArtistItem) => ({
				id: item.id,
				name: item.name,
				thumbnail: item.images[0]?.url,
				uri: item.uri,
			})) || [];

		// Process albums
		const albumsData: SpotifyAlbum[] =
			data.albums?.items.map((item: SpotifyAlbumItem) => ({
				id: item.id,
				name: item.name,
				artist: item.artists.map((artist) => artist.name).join(", "),
				thumbnail: item.images[0]?.url,
				uri: item.uri,
			})) || [];

		setResults(tracks);
		setArtists(artistsData);
		setAlbums(albumsData);
		setCurrentService("spotify");
	};

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!query.trim() || isSearching) return;

		setShowSearchResults(true);
		setIsSearching(true);
		setActiveFilter("All");

		try {
			// Check if the query looks like an ISRC (typically 12 characters, alphanumeric)
			const isrcRegex = /^[A-Za-z]{2}[A-Za-z0-9]{10}$/;
			const isLikelyIsrc = isrcRegex.test(query.trim());

			if (isLikelyIsrc && currentService === "spotify") {
				console.log("Query looks like an ISRC, searching directly by ISRC");
				const track = await searchByIsrc(query.trim());

				if (track) {
					// If we found a track by ISRC, use it directly
					setResults([track]);
					setArtists([]);
					setAlbums([]);
					return;
				}
				console.log("No results found by ISRC, falling back to regular search");
			}

			if (currentService === "spotify") {
				// Use our new API endpoint instead of directly calling Spotify
				const url = `/api/spotify/search?q=${encodeURIComponent(query)}&type=track,album,artist&limit=20`;
				console.log("Making Spotify search request with URL:", url);

				const response = await fetch(url);
				console.log("Spotify search response status:", response.status);

				if (!response.ok) {
					const errorData = await response
						.json()
						.catch(() => ({ error: "Unknown error" }));
					console.error("Spotify search error:", errorData);
					throw new Error(errorData.error || `Error: ${response.status}`);
				}

				const data = await response.json();
				processSpotifyResults(data);
			} else {
				// Existing code for non-Spotify searches
				const response = await fetch("/api/search", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ query }),
				});

				if (!response.ok) {
					throw new Error("Search failed");
				}

				const data = await response.json();
				setResults(data.results || []);

				// Clear artists and albums for non-Spotify searches
				setArtists([]);
				setAlbums([]);
			}
		} catch (error) {
			console.error("Search error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Search failed. Please try again.",
			);
			setResults([]);
		} finally {
			setIsSearching(false);
		}
	};

	// Function to get Spotify track details including ISRC
	const getSpotifyTrackDetails = async (
		trackId: string,
	): Promise<SpotifyTrackExtended | null> => {
		try {
			console.log(`Fetching Spotify track details for ID: ${trackId}`);

			// Use our dedicated track endpoint instead of directly calling Spotify API
			const response = await fetch(`/api/spotify/track?id=${trackId}`);

			console.log("Spotify track details response status:", response.status);

			if (!response.ok) {
				const errorText = await response.text().catch(() => "Unknown error");
				console.error("Error fetching track details:", errorText);
				throw new Error(`Failed to fetch track details: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Error fetching Spotify track details:", error);
			return null;
		}
	};

	// Function to search for track by ISRC
	const searchByIsrc = async (isrc: string) => {
		try {
			console.log(`Searching Spotify by ISRC: ${isrc}`);

			// Use our new dedicated track endpoint with ISRC
			const response = await fetch(`/api/spotify/track?isrc=${isrc}`);

			if (!response.ok) {
				console.log(`ISRC search failed with status ${response.status}`);
				return null;
			}

			const trackData = await response.json();
			console.log("Found track by ISRC:", trackData);

			// Create a Track object from the response
			const track: Track = {
				id: trackData.id,
				title: trackData.name,
				artist: trackData.artists
					.map((artist: { name: string }) => artist.name)
					.join(", "),
				thumbnail: trackData.album.images[0]?.url,
				duration: Math.floor(trackData.duration_ms / 1000),
				album: trackData.album.name,
				spotifyUri: trackData.uri,
				isrc: trackData.external_ids?.isrc,
			};

			return track;
		} catch (error) {
			console.error("Error searching by ISRC:", error);
			return null;
		}
	};

	// First, add a new utility function for fading audio at the appropriate place in the file
	const fadeOutAudio = (audio: HTMLAudioElement, duration = 500): Promise<void> => {
		return new Promise((resolve) => {
			if (!audio || audio.paused || audio.volume === 0) {
				resolve();
				return;
			}
			
			const originalVolume = audio.volume;
			const fadeSteps = 20;
			const fadeInterval = duration / fadeSteps;
			const volumeStep = originalVolume / fadeSteps;
			
			const fadeTimer = setInterval(() => {
				if (audio.volume > volumeStep) {
					audio.volume -= volumeStep;
				} else {
					audio.volume = 0;
					clearInterval(fadeTimer);
					audio.pause();
					// Restore original volume setting for future playback
					audio.volume = originalVolume;
					resolve();
				}
			}, fadeInterval);
		});
	};

	// Update the playTrack function to use the fade effect
	const playTrack = async (track: Track) => {
		try {
			// If there's already a track playing, fade it out first
			if (audioRef.current && !audioRef.current.paused) {
				await fadeOutAudio(audioRef.current);
			}
			
			// Set the current track information immediately to maintain UI state
			setCurrentTrack(track);
			
			if (track.spotifyUri && currentService === "spotify") {
				playSpotifyTrack(track);
			} else {
				try {
					setIsPlaying(true);
					
					// Get audio URL from your API using the existing /api/play endpoint
					// The play endpoint will prioritize using Piped for music playback
					const response = await fetch("/api/play", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							track: {
								...track,
								// Force the track to be played using Piped when possible
								preferredService: "piped",
							},
						}),
					});

					// Check if response is OK before trying to parse JSON
					if (!response.ok) {
						console.error(
							`Failed to fetch track: ${response.status} ${response.statusText}`,
						);
						setIsPlaying(false);
						// Don't reset currentTrack here to prevent disappearing now playing info
						toast.error(
							"Could not play this track. Please try a different track.",
						);
						return;
					}

					// Parse the JSON response
					const data = await response.json();

					if (data.audioUrl) {
						if (audioRef.current) {
							// Set the source and start playback
							audioRef.current.src = data.audioUrl;
							
							try {
								await audioRef.current.play();
								if (data.service === "piped") {
									toast.success(`Now playing (via Piped): ${track.title}`);
								} else {
									toast.success(
										`Now playing (via ${data.service}): ${track.title}`,
									);
								}
							} catch (playError) {
								console.error("Error during audio playback:", playError);
								setIsPlaying(false);
								toast.error("Playback failed. Please try again.");
								// Keep currentTrack state to prevent now playing from disappearing
							}
						}
					} else {
						console.error("No audio URL in the response data");
						setIsPlaying(false);
						// Don't reset currentTrack here to prevent disappearing now playing info
						toast.error("Could not play this track. No audio stream found.");
					}
				} catch (error) {
					console.error("Error playing track:", error);
					setIsPlaying(false);
					// Don't reset currentTrack here to prevent disappearing now playing info
					toast.error("Could not play this track due to an error.");
				}
			}
		} catch (error) {
			console.error("Error in playTrack:", error);
			setIsPlaying(false);
			// Don't reset currentTrack to prevent disappearing now playing info
			toast.error("An unexpected error occurred while playing the track.");
		}
	};

	// Also update playSpotifyTrack to use the fadeOutAudio function
	const playSpotifyTrack = async (track: Track) => {
		try {
			// First set the current track to maintain UI state throughout the process
			setCurrentTrack(track);
			setIsPlaying(true);

			toast.info(`Finding "${track.title}" by ${track.artist}...`);

			// Get the full track details from Spotify to get the ISRC if not already available
			let isrc = track.isrc;
			if (!isrc && track.id) {
				const trackDetails = await getSpotifyTrackDetails(track.id);
				if (trackDetails?.external_ids?.isrc) {
					isrc = trackDetails.external_ids.isrc;
				}
			}

			try {
				// Search for the track on YouTube
				const youtubeResponse = await fetch("/api/youtube/search", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						isrc: isrc,
						title: track.title,
						artist: track.artist,
						spotifyId: track.id,
					}),
				});

				if (!youtubeResponse.ok) {
					throw new Error(`YouTube search failed: ${youtubeResponse.status}`);
				}

				const youtubeData = await youtubeResponse.json();

				if (
					!youtubeData.success ||
					!youtubeData.videos ||
					youtubeData.videos.length === 0
				) {
					throw new Error("No YouTube videos found for this track");
				}

				// Get the audio stream from your existing API
				const ytVideo = youtubeData.videos[0];
				const audioResponse = await fetch("/api/play", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						track: {
							...track,
							id: ytVideo.videoId,
							source: "youtube",
							preferredService: "piped", // Use Piped for playback
						},
					}),
				});

				if (!audioResponse.ok) {
					throw new Error(
						`Failed to get audio stream: ${audioResponse.status}`,
					);
				}

				const audioData = await audioResponse.json();

				if (audioData.audioUrl) {
					if (audioRef.current) {
						// Fade out current audio if playing
						if (!audioRef.current.paused) {
							await fadeOutAudio(audioRef.current);
						}
						
						// Set source and play
						audioRef.current.src = audioData.audioUrl;
						
						try {
							await audioRef.current.play();
							toast.success(
								`Now playing (via ${audioData.service}): ${track.title}`,
							);
						} catch (playError) {
							console.error("Error during audio playback:", playError);
							setIsPlaying(false);
							toast.error("Playback failed. Please try again.");
							// Keep currentTrack state to prevent now playing from disappearing
						}
					}
				} else {
					throw new Error("No audio URL in the response");
				}
			} catch (youtubeError) {
				// Fallback to regular search if YouTube search fails
				console.error(
					"Error with YouTube search, falling back to regular search:",
					youtubeError,
				);
				toast.info(
					`YouTube search failed, trying alternative sources for "${track.title}"...`,
				);

				// Try to play using the regular playTrack method
				try {
					// Call the regular search API
					const searchResponse = await fetch("/api/search", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							query: `${track.title} ${track.artist}`,
						}),
					});

					if (!searchResponse.ok) {
						throw new Error("Fallback search failed");
					}

					const searchData = await searchResponse.json();

					// Use the first result if available
					if (searchData.tracks && searchData.tracks.length > 0) {
						const searchTrack = searchData.tracks[0];

						// Get audio URL
						const audioResponse = await fetch("/api/play", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								track: {
									...searchTrack,
									preferredService: "piped", // Use Piped for playback
								},
							}),
						});

						if (!audioResponse.ok) {
							throw new Error("Failed to get audio from fallback source");
						}

						const audioData = await audioResponse.json();

						if (audioData.audioUrl) {
							if (audioRef.current) {
								// Fade out current audio if playing
								if (!audioRef.current.paused) {
									await fadeOutAudio(audioRef.current);
								}
								
								audioRef.current.src = audioData.audioUrl;
								
								try {
									await audioRef.current.play();
									toast.success(
										`Now playing (alternative source via ${audioData.service}): ${track.title}`,
									);
								} catch (playError) {
									console.error("Error during audio playback:", playError);
									setIsPlaying(false);
									toast.error("Playback failed. Please try again.");
									// Keep currentTrack state to prevent now playing from disappearing
								}
							}
						} else {
							throw new Error("No audio URL in fallback response");
						}
					} else {
						throw new Error("No results from fallback search");
					}
				} catch (fallbackError) {
					console.error("Fallback search also failed:", fallbackError);
					throw new Error("Could not find any playable source for this track");
				}
			}
		} catch (error) {
			console.error("Error playing track:", error);
			setIsPlaying(false);
			// Don't reset currentTrack to prevent the now playing from disappearing
			toast.error("Could not play this track. Please try a different one.");
		}
	};

	// Filter options
	const filterOptions = [
		"All",
		"Artists",
		"Songs",
		"Albums",
		"Playlists",
		"Podcasts & Shows",
		"Genres & Moods",
	];

	// Function to clear search and return to main content
	const clearSearch = () => {
		setQuery("");
		setShowSearchResults(false);
	};

	const pauseTrack = () => {
		if (audioRef.current && isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			toast("Track paused");
		}
	};

	const resumeTrack = () => {
		if (audioRef.current && !isPlaying) {
			audioRef.current.play();
			setIsPlaying(true);
			toast("Track resumed");
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(e.target.value);
		setVolume(newVolume);

		// Show volume toast
		if (newVolume === 0) {
			toast("Volume: Muted");
		} else if (newVolume < 30) {
			toast(`Volume: ${newVolume}% (Low)`);
		} else if (newVolume < 70) {
			toast(`Volume: ${newVolume}% (Medium)`);
		} else {
			toast(`Volume: ${newVolume}% (High)`);
		}
	};

	// Preload Spotify token to ensure we have it ready
	const preloadSpotifyToken = async () => {
		try {
			const token = await getSpotifyToken();
			if (token) {
				console.log("Successfully preloaded Spotify token");
			}
		} catch (error) {
			console.error("Failed to preload Spotify token:", error);
		}
	};

	return (
		<div className="flex h-screen bg-black text-white">
			{/* Left Sidebar */}
			<div className="w-64 flex-shrink-0 border-r border-gray-800 flex flex-col">
				{/* Navigation */}
				<div className="p-4 flex items-center gap-2">
					<button type="button" className="p-2 text-gray-400 hover:text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M15 18l-6-6 6-6" />
						</svg>
					</button>
					<button type="button" className="p-2 text-gray-400 hover:text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M9 18l6-6-6-6" />
						</svg>
					</button>
					<button
						type="button"
						className="p-2 text-gray-400 hover:text-white ml-auto"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
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
							{[
								"Kimi no Koto ga Daidaidaidaisuki na 100-nin no Kanojo",
								"2.5 Jigen no Ririsa",
								"Aria",
								"Akagami no Shirayuki-hime",
								"Make Heroine ga Oosugiru!",
								"Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
								"Karakai Jouzu no Takagi-san",
								"Summertime Render",
							].map((playlist, index) => (
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
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
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						)}
					</form>
					<div className="flex items-center gap-4 ml-4">
						<button type="button" className="text-gray-400 hover:text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
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
												? "bg-white text-black"
												: "bg-gray-800 text-white hover:bg-gray-700"
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
															src={
																results[0].thumbnail ||
																"/placeholder-artist.jpg"
															}
															alt={results[0].title}
															fill
															className="object-cover"
														/>
													</div>
													<h3 className="text-2xl font-bold mb-1">
														{results[0].title}
													</h3>
													<p className="text-sm text-gray-400 mb-4">
														Song • {results[0].artist}
													</p>
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
															src={
																track.thumbnail ||
																`https://picsum.photos/40/40?random=${track.id}`
															}
															alt={track.title}
															fill
															className="object-cover rounded"
														/>
													</div>
													<div className="ml-3 flex-1 overflow-hidden">
														<h4 className="text-sm font-medium text-white truncate">
															{track.title}
														</h4>
														<p className="text-xs text-gray-400 truncate">
															{track.artist}
														</p>
													</div>
													<div className="text-xs text-gray-400 ml-2">
														{track.duration
															? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, "0")}`
															: "3:42"}
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
										{artists.slice(0, 6).map((artist) => (
											<div
												key={artist.id}
												className="flex flex-col items-center p-4 rounded-md hover:bg-gray-800/40 cursor-pointer text-center"
											>
												<div className="relative w-28 h-28 rounded-full overflow-hidden mb-3">
													<Image
														src={artist.thumbnail || "/placeholder-artist.jpg"}
														alt={artist.name}
														fill
														className="object-cover"
													/>
												</div>
												<h3 className="font-medium truncate w-full">
													{artist.name}
												</h3>
												<p className="text-xs text-gray-400 mt-1">Artist</p>
											</div>
										))}
									</div>
								</div>

								{/* Albums Section */}
								<div>
									<h2 className="text-2xl font-bold mb-4">Albums</h2>
									<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
										{albums.slice(0, 6).map((album) => (
											<div
												key={album.id}
												className="flex flex-col p-4 rounded-md hover:bg-gray-800/40 cursor-pointer"
											>
												<div className="relative aspect-square mb-3 rounded overflow-hidden">
													<Image
														src={album.thumbnail || "/placeholder-album.jpg"}
														alt={album.name}
														fill
														className="object-cover"
													/>
												</div>
												<h3 className="font-medium truncate">{album.name}</h3>
												<p className="text-xs text-gray-400 mt-1 truncate">
													{album.artist}
												</p>
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
									<button
										type="button"
										className="text-sm text-gray-400 hover:text-white"
									>
										Show all
									</button>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
									{[
										"Daily Mix 1",
										"Daily Mix 2",
										"Daily Mix 3",
										"Daily Mix 4",
										"Aria",
										"Long Drives",
									].map((mix, index) => (
										<button
											key={`daily-mix-${mix.replace(/\s+/g, "-").toLowerCase()}`}
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
											<p className="text-xs text-gray-400 mt-1">
												Featured artists
											</p>
										</button>
									))}
								</div>
							</section>

							<section className="mb-8">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-2xl font-bold">Made for iaMJ</h2>
									<button
										type="button"
										className="text-sm text-gray-400 hover:text-white"
									>
										Show all
									</button>
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
													src={
														video.thumbnail ||
														`https://picsum.photos/200/200?random=${video.id}`
													}
													alt={video.title}
													fill
													className="object-cover"
												/>
											</div>
											<h3 className="font-semibold text-sm truncate">
												{video.title}
											</h3>
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
									<button
										type="button"
										className="text-sm text-gray-400 hover:text-white"
									>
										Show all
									</button>
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
													src={
														track.thumbnail ||
														`https://picsum.photos/200/200?random=${track.id}`
													}
													alt={track.title}
													fill
													className="object-cover"
												/>
											</div>
											<h3 className="font-semibold text-sm truncate">
												{track.title}
											</h3>
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
										src={
											currentTrack.thumbnail ||
											"https://picsum.photos/200/200?random=1"
										}
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<polygon points="19 20 9 12 19 4 19 20" />
										<line x1="5" y1="19" x2="5" y2="5" />
									</svg>
								</button>

								<button
									type="button"
									className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
									onClick={() => (isPlaying ? pauseTrack() : resumeTrack())}
								>
									{isPlaying ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<rect x="6" y="4" width="4" height="16" />
											<rect x="14" y="4" width="4" height="16" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<polygon points="5 3 19 12 5 21 5 3" />
										</svg>
									)}
								</button>

								<button
									type="button"
									className="text-gray-400 hover:text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<line x1="1" y1="1" x2="23" y2="23" />
											<path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
											<path d="M17 16.95A7 7 0 0 1 12 19c-2.38 0-4.5-1.12-5.86-2.86" />
										</svg>
									) : volume < 30 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
											<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
										</svg>
									) : volume < 70 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
											<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
											<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
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
							<button
								type="button"
								className="p-1 text-gray-400 hover:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						</div>

						<div className="relative aspect-square mb-5 rounded-lg overflow-hidden">
							<Image
								src={
									currentTrack.thumbnail ||
									"https://picsum.photos/400/400?random=1"
								}
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
