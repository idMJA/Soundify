module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/player/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Player)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Player() {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [spotifyToken, setSpotifyToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentTrack, setCurrentTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [volume, setVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(75);
    const [queue, setQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentService, setCurrentService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("spotify");
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [trendingVideos, setTrendingVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSearchResults, setShowSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [artists, setArtists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [albums, setAlbums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Reference to the audio element
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load volume from cookies when component mounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedVolume = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("soundify_volume");
        if (savedVolume) {
            const parsedVolume = Number.parseInt(savedVolume, 10);
            setVolume(parsedVolume);
        }
    }, []);
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize audio element and fetch trending videos when component mounts
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return ()=>{
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener("ended", handleTrackEnded);
                audioRef.current.removeEventListener("error", handleAudioError);
                audioRef.current = null;
            }
        };
    }, []);
    // Update audio volume when volume state changes and save to cookies
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        // Save volume to cookies
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set("soundify_volume", volume.toString(), {
            expires: 365
        });
    }, [
        volume
    ]);
    const fetchTrendingVideos = async ()=>{
        try {
            const response = await fetch("/api/invidious/trending?region=US");
            const data = await response.json();
            const formattedTrending = data.map((video)=>{
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
                    const highQuality = video.videoThumbnails.find((t)=>t.quality === "high");
                    const mediumQuality = video.videoThumbnails.find((t)=>t.quality === "medium");
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
            console.error("Error fetching trending videos:", error);
        }
    };
    const handleTrackEnded = ()=>{
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
    const handleAudioError = (error)=>{
        console.error("Audio playback error:", error);
        handleTrackEnded(); // Skip to next track on error
    };
    // Function to get Spotify access token
    const getSpotifyToken = async ()=>{
        try {
            // Check if we have a valid token already
            if (spotifyToken && spotifyToken.timestamp + spotifyToken.expiresIn * 1000 > Date.now()) {
                return spotifyToken.accessToken;
            }
            // Generate timestamp for the request
            const currentTimestamp = Math.floor(Date.now() / 1000);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info("Connecting to Spotify...");
            // Make the token request
            const tokenUrl = `/api/spotify/token?ts=${currentTimestamp}`;
            const tokenRes = await fetch(tokenUrl);
            if (!tokenRes.ok) {
                const errorData = await tokenRes.json().catch(()=>({}));
                const errorMessage = errorData.error || `Failed to authenticate with Spotify: ${tokenRes.status}`;
                throw new Error(errorMessage);
            }
            const tokenData = await tokenRes.json();
            if (tokenData.error) {
                throw new Error(tokenData.error);
            }
            const newToken = {
                accessToken: tokenData.accessToken,
                expiresIn: tokenData.expiresIn,
                timestamp: Date.now()
            };
            setSpotifyToken(newToken);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Connected to Spotify!");
            return newToken.accessToken;
        } catch (error) {
            console.error("Error getting Spotify token:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : "Failed to authenticate with Spotify");
            return null;
        }
    };
    // Function to process Spotify search results
    const processSpotifyResults = (data)=>{
        // Process tracks
        const tracks = data.tracks?.items.map((item)=>({
                id: item.id,
                title: item.name,
                artist: item.artists.map((artist)=>artist.name).join(", "),
                thumbnail: item.album.images[0]?.url,
                duration: Math.floor(item.duration_ms / 1000),
                album: item.album.name,
                spotifyUri: item.uri
            })) || [];
        // Process artists
        const artistsData = data.artists?.items.map((item)=>({
                id: item.id,
                name: item.name,
                thumbnail: item.images[0]?.url,
                uri: item.uri
            })) || [];
        // Process albums
        const albumsData = data.albums?.items.map((item)=>({
                id: item.id,
                name: item.name,
                artist: item.artists.map((artist)=>artist.name).join(", "),
                thumbnail: item.images[0]?.url,
                uri: item.uri
            })) || [];
        setResults(tracks);
        setArtists(artistsData);
        setAlbums(albumsData);
        setCurrentService("spotify");
    };
    const handleSearch = async (e)=>{
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
                    setResults([
                        track
                    ]);
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
                    const errorData = await response.json().catch(()=>({
                            error: "Unknown error"
                        }));
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query
                    })
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : "Search failed. Please try again.");
            setResults([]);
        } finally{
            setIsSearching(false);
        }
    };
    // Function to get Spotify track details including ISRC
    const getSpotifyTrackDetails = async (trackId)=>{
        try {
            console.log(`Fetching Spotify track details for ID: ${trackId}`);
            // Use our dedicated track endpoint instead of directly calling Spotify API
            const response = await fetch(`/api/spotify/track?id=${trackId}`);
            console.log("Spotify track details response status:", response.status);
            if (!response.ok) {
                const errorText = await response.text().catch(()=>"Unknown error");
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
    const searchByIsrc = async (isrc)=>{
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
            const track = {
                id: trackData.id,
                title: trackData.name,
                artist: trackData.artists.map((artist)=>artist.name).join(", "),
                thumbnail: trackData.album.images[0]?.url,
                duration: Math.floor(trackData.duration_ms / 1000),
                album: trackData.album.name,
                spotifyUri: trackData.uri,
                isrc: trackData.external_ids?.isrc
            };
            return track;
        } catch (error) {
            console.error("Error searching by ISRC:", error);
            return null;
        }
    };
    // First, add a new utility function for fading audio at the appropriate place in the file
    const fadeOutAudio = (audio, duration = 500)=>{
        return new Promise((resolve)=>{
            if (!audio || audio.paused || audio.volume === 0) {
                resolve();
                return;
            }
            const originalVolume = audio.volume;
            const fadeSteps = 20;
            const fadeInterval = duration / fadeSteps;
            const volumeStep = originalVolume / fadeSteps;
            const fadeTimer = setInterval(()=>{
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
    const playTrack = async (track)=>{
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
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            track: {
                                ...track,
                                // Force the track to be played using Piped when possible
                                preferredService: "piped"
                            }
                        })
                    });
                    // Check if response is OK before trying to parse JSON
                    if (!response.ok) {
                        console.error(`Failed to fetch track: ${response.status} ${response.statusText}`);
                        setIsPlaying(false);
                        // Don't reset currentTrack here to prevent disappearing now playing info
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Could not play this track. Please try a different track.");
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
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Now playing (via Piped): ${track.title}`);
                                } else {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Now playing (via ${data.service}): ${track.title}`);
                                }
                            } catch (playError) {
                                console.error("Error during audio playback:", playError);
                                setIsPlaying(false);
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Playback failed. Please try again.");
                            // Keep currentTrack state to prevent now playing from disappearing
                            }
                        }
                    } else {
                        console.error("No audio URL in the response data");
                        setIsPlaying(false);
                        // Don't reset currentTrack here to prevent disappearing now playing info
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Could not play this track. No audio stream found.");
                    }
                } catch (error) {
                    console.error("Error playing track:", error);
                    setIsPlaying(false);
                    // Don't reset currentTrack here to prevent disappearing now playing info
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Could not play this track due to an error.");
                }
            }
        } catch (error) {
            console.error("Error in playTrack:", error);
            setIsPlaying(false);
            // Don't reset currentTrack to prevent disappearing now playing info
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("An unexpected error occurred while playing the track.");
        }
    };
    // Also update playSpotifyTrack to use the fadeOutAudio function
    const playSpotifyTrack = async (track)=>{
        try {
            // First set the current track to maintain UI state throughout the process
            setCurrentTrack(track);
            setIsPlaying(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`Finding "${track.title}" by ${track.artist}...`);
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        isrc: isrc,
                        title: track.title,
                        artist: track.artist,
                        spotifyId: track.id
                    })
                });
                if (!youtubeResponse.ok) {
                    throw new Error(`YouTube search failed: ${youtubeResponse.status}`);
                }
                const youtubeData = await youtubeResponse.json();
                if (!youtubeData.success || !youtubeData.videos || youtubeData.videos.length === 0) {
                    throw new Error("No YouTube videos found for this track");
                }
                // Get the audio stream from your existing API
                const ytVideo = youtubeData.videos[0];
                const audioResponse = await fetch("/api/play", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        track: {
                            ...track,
                            id: ytVideo.videoId,
                            source: "youtube",
                            preferredService: "piped"
                        }
                    })
                });
                if (!audioResponse.ok) {
                    throw new Error(`Failed to get audio stream: ${audioResponse.status}`);
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
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Now playing (via ${audioData.service}): ${track.title}`);
                        } catch (playError) {
                            console.error("Error during audio playback:", playError);
                            setIsPlaying(false);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Playback failed. Please try again.");
                        // Keep currentTrack state to prevent now playing from disappearing
                        }
                    }
                } else {
                    throw new Error("No audio URL in the response");
                }
            } catch (youtubeError) {
                // Fallback to regular search if YouTube search fails
                console.error("Error with YouTube search, falling back to regular search:", youtubeError);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`YouTube search failed, trying alternative sources for "${track.title}"...`);
                // Try to play using the regular playTrack method
                try {
                    // Call the regular search API
                    const searchResponse = await fetch("/api/search", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            query: `${track.title} ${track.artist}`
                        })
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
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                track: {
                                    ...searchTrack,
                                    preferredService: "piped"
                                }
                            })
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
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Now playing (alternative source via ${audioData.service}): ${track.title}`);
                                } catch (playError) {
                                    console.error("Error during audio playback:", playError);
                                    setIsPlaying(false);
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Playback failed. Please try again.");
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Could not play this track. Please try a different one.");
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
        "Genres & Moods"
    ];
    // Function to clear search and return to main content
    const clearSearch = ()=>{
        setQuery("");
        setShowSearchResults(false);
    };
    const pauseTrack = ()=>{
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])("Track paused");
        }
    };
    const resumeTrack = ()=>{
        if (audioRef.current && !isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])("Track resumed");
        }
    };
    const handleVolumeChange = (e)=>{
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        // Show volume toast
        if (newVolume === 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])("Volume: Muted");
        } else if (newVolume < 30) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])(`Volume: ${newVolume}% (Low)`);
        } else if (newVolume < 70) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])(`Volume: ${newVolume}% (Medium)`);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])(`Volume: ${newVolume}% (High)`);
        }
    };
    // Preload Spotify token to ensure we have it ready
    const preloadSpotifyToken = async ()=>{
        try {
            const token = await getSpotifyToken();
            if (token) {
                console.log("Successfully preloaded Spotify token");
            }
        } catch (error) {
            console.error("Failed to preload Spotify token:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-64 flex-shrink-0 border-r border-gray-800 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-2 text-gray-400 hover:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M15 18l-6-6 6-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 878,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 866,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 865,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-2 text-gray-400 hover:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 18l6-6-6-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 894,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 882,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 881,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-2 text-gray-400 hover:text-white ml-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 913,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 901,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 897,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/player/page.tsx",
                        lineNumber: 864,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-4",
                                    children: "Anime Theme Music"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 921,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 px-2 py-1 bg-gray-800 rounded flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-400",
                                        children: "By you"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 924,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 923,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 mt-4",
                                    children: [
                                        "Kimi no Koto ga Daidaidaidaisuki na 100-nin no Kanojo",
                                        "2.5 Jigen no Ririsa",
                                        "Aria",
                                        "Akagami no Shirayuki-hime",
                                        "Make Heroine ga Oosugiru!",
                                        "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
                                        "Karakai Jouzu no Takagi-san",
                                        "Summertime Render"
                                    ].map((playlist, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer w-full text-left",
                                            type: "button",
                                            onClick: ()=>console.log(`Play ${playlist}`),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 bg-gray-700 rounded relative overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: `https://picsum.photos/40/40?random=${index + 1}`,
                                                        alt: playlist,
                                                        width: 40,
                                                        height: 40,
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 946,
                                                        columnNumber: 11
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium truncate",
                                                            children: playlist
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 11
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 truncate",
                                                            children: "iaMJ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 956,
                                                            columnNumber: 11
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 954,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, `playlist-item-${playlist.substring(0, 10)}`, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 939,
                                            columnNumber: 9
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 928,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 920,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/player/page.tsx",
                        lineNumber: 919,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/player/page.tsx",
                lineNumber: 862,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "px-6 py-4 flex items-center justify-between bg-gray-900 sticky top-0 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSearch,
                                className: "relative flex-1 max-w-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "11",
                                                cy: "11",
                                                r: "8"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 983,
                                                columnNumber: 8
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "21",
                                                y1: "21",
                                                x2: "16.65",
                                                y2: "16.65"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 984,
                                                columnNumber: 8
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 970,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "What do you want to play?",
                                        className: "w-full pl-10 pr-10 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white",
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 986,
                                        columnNumber: 7
                                    }, this),
                                    query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white",
                                        onClick: clearSearch,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "18",
                                                    y1: "6",
                                                    x2: "6",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1011,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1012,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 999,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 994,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 969,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 ml-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "text-gray-400 hover:text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1031,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "12",
                                                    cy: "10",
                                                    r: "3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1032,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1033,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1019,
                                            columnNumber: 8
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 1018,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium",
                                        children: "MJ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 1017,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/player/page.tsx",
                        lineNumber: 968,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black p-6",
                        children: showSearchResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 flex items-center gap-2 overflow-x-auto scrollbar-hide",
                                    children: filterOptions.map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === filter ? "bg-white text-black" : "bg-gray-800 text-white hover:bg-gray-700"}`,
                                            onClick: ()=>setActiveFilter(filter),
                                            children: filter
                                        }, filter, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1049,
                                            columnNumber: 10
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1047,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-bold mb-4",
                                                            children: "Top result"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1069,
                                                            columnNumber: 11
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-800/40 hover:bg-gray-800/60 p-5 rounded-lg transition-all cursor-pointer",
                                                            children: results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative w-24 h-24 rounded-full mb-4 overflow-hidden shadow-lg",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: results[0].thumbnail || "/placeholder-artist.jpg",
                                                                            alt: results[0].title,
                                                                            fill: true,
                                                                            className: "object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/player/page.tsx",
                                                                            lineNumber: 1074,
                                                                            columnNumber: 15
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/player/page.tsx",
                                                                        lineNumber: 1073,
                                                                        columnNumber: 14
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-2xl font-bold mb-1",
                                                                        children: results[0].title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/player/page.tsx",
                                                                        lineNumber: 1084,
                                                                        columnNumber: 14
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-400 mb-4",
                                                                        children: [
                                                                            "Song • ",
                                                                            results[0].artist
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/player/page.tsx",
                                                                        lineNumber: 1087,
                                                                        columnNumber: 14
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/player/page.tsx",
                                                                lineNumber: 1072,
                                                                columnNumber: 13
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1070,
                                                            columnNumber: 11
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-bold mb-4",
                                                            children: "Songs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1097,
                                                            columnNumber: 11
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: results.slice(0, 4).map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "flex items-center p-2 hover:bg-gray-800/40 rounded-md cursor-pointer w-full text-left",
                                                                    onClick: ()=>playTrack(track),
                                                                    type: "button",
                                                                    "aria-label": `Play ${track.title}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative w-10 h-10 flex-shrink-0",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                src: track.thumbnail || `https://picsum.photos/40/40?random=${track.id}`,
                                                                                alt: track.title,
                                                                                fill: true,
                                                                                className: "object-cover rounded"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/player/page.tsx",
                                                                                lineNumber: 1108,
                                                                                columnNumber: 15
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/player/page.tsx",
                                                                            lineNumber: 1107,
                                                                            columnNumber: 14
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "ml-3 flex-1 overflow-hidden",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                    className: "text-sm font-medium text-white truncate",
                                                                                    children: track.title
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                                    lineNumber: 1119,
                                                                                    columnNumber: 15
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-gray-400 truncate",
                                                                                    children: track.artist
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                                    lineNumber: 1122,
                                                                                    columnNumber: 15
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/player/page.tsx",
                                                                            lineNumber: 1118,
                                                                            columnNumber: 14
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-400 ml-2",
                                                                            children: track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, "0")}` : "3:42"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/player/page.tsx",
                                                                            lineNumber: 1126,
                                                                            columnNumber: 14
                                                                        }, this)
                                                                    ]
                                                                }, track.id, true, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1100,
                                                                    columnNumber: 13
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1098,
                                                            columnNumber: 11
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold mb-4",
                                                    children: "Artists"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1139,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                                    children: artists.slice(0, 6).map((artist)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center p-4 rounded-md hover:bg-gray-800/40 cursor-pointer text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative w-28 h-28 rounded-full overflow-hidden mb-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: artist.thumbnail || "/placeholder-artist.jpg",
                                                                        alt: artist.name,
                                                                        fill: true,
                                                                        className: "object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/player/page.tsx",
                                                                        lineNumber: 1147,
                                                                        columnNumber: 14
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1146,
                                                                    columnNumber: 13
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-medium truncate w-full",
                                                                    children: artist.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1154,
                                                                    columnNumber: 13
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 mt-1",
                                                                    children: "Artist"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1157,
                                                                    columnNumber: 13
                                                                }, this)
                                                            ]
                                                        }, artist.id, true, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1142,
                                                            columnNumber: 12
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1140,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1138,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold mb-4",
                                                    children: "Albums"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1165,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                                    children: albums.slice(0, 6).map((album)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col p-4 rounded-md hover:bg-gray-800/40 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative aspect-square mb-3 rounded overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: album.thumbnail || "/placeholder-album.jpg",
                                                                        alt: album.name,
                                                                        fill: true,
                                                                        className: "object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/player/page.tsx",
                                                                        lineNumber: 1173,
                                                                        columnNumber: 14
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1172,
                                                                    columnNumber: 13
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-medium truncate",
                                                                    children: album.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1180,
                                                                    columnNumber: 13
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 mt-1 truncate",
                                                                    children: album.artist
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/player/page.tsx",
                                                                    lineNumber: 1181,
                                                                    columnNumber: 13
                                                                }, this)
                                                            ]
                                                        }, album.id, true, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1168,
                                                            columnNumber: 12
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1164,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1065,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold",
                                                    children: "Daily Mix"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1194,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "text-sm text-gray-400 hover:text-white",
                                                    children: "Show all"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1195,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1193,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                            children: [
                                                "Daily Mix 1",
                                                "Daily Mix 2",
                                                "Daily Mix 3",
                                                "Daily Mix 4",
                                                "Aria",
                                                "Long Drives"
                                            ].map((mix, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left",
                                                    type: "button",
                                                    onClick: ()=>console.log(`Play ${mix}`),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative aspect-square mb-4 rounded-md overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: `https://picsum.photos/200/200?random=${index + 10}`,
                                                                alt: mix,
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/player/page.tsx",
                                                                lineNumber: 1219,
                                                                columnNumber: 13
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1218,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-sm",
                                                            children: mix
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1226,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-1",
                                                            children: "Featured artists"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1227,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, `daily-mix-${mix.replace(/\s+/g, "-").toLowerCase()}`, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1212,
                                                    columnNumber: 11
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1203,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1192,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold",
                                                    children: "Made for iaMJ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1237,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "text-sm text-gray-400 hover:text-white",
                                                    children: "Show all"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1238,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1236,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                            children: trendingVideos.slice(0, 6).map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left",
                                                    onClick: ()=>playTrack(video),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative aspect-square mb-4 rounded-md overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: video.thumbnail || `https://picsum.photos/200/200?random=${video.id}`,
                                                                alt: video.title,
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/player/page.tsx",
                                                                lineNumber: 1255,
                                                                columnNumber: 13
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1254,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-sm truncate",
                                                            children: video.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1265,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-1 truncate",
                                                            children: video.uploadedDate
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1268,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, video.id, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1248,
                                                    columnNumber: 11
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1246,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1235,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold",
                                                    children: "Recommended for today"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1278,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "text-sm text-gray-400 hover:text-white",
                                                    children: "Show all"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1279,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1277,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                            children: results.slice(0, 6).map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "bg-gray-800 bg-opacity-40 hover:bg-opacity-60 p-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col text-left",
                                                    onClick: ()=>playTrack(track),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative aspect-square mb-4 rounded-md overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: track.thumbnail || `https://picsum.photos/200/200?random=${track.id}`,
                                                                alt: track.title,
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/player/page.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 13
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-sm truncate",
                                                            children: track.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1306,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-1 truncate",
                                                            children: track.artist
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/player/page.tsx",
                                                            lineNumber: 1309,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, track.id, true, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1289,
                                                    columnNumber: 11
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1287,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1276,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/player/page.tsx",
                        lineNumber: 1043,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "h-20 bg-gray-900 border-t border-gray-800 p-4 flex items-center",
                        children: currentTrack ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-12 h-12 rounded overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: currentTrack.thumbnail || "https://picsum.photos/200/200?random=1",
                                                alt: currentTrack.title,
                                                fill: true,
                                                className: "object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1326,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-sm",
                                                    children: currentTrack.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1337,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400",
                                                    children: currentTrack.artist
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1338,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1336,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "text-gray-400 hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "20",
                                                height: "20",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "19 20 9 12 19 4 19 20"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1359,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "5",
                                                        y1: "19",
                                                        x2: "5",
                                                        y2: "5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1360,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1347,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1343,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "bg-white text-black w-8 h-8 rounded-full flex items-center justify-center",
                                            onClick: ()=>isPlaying ? pauseTrack() : resumeTrack(),
                                            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "6",
                                                        y: "4",
                                                        width: "4",
                                                        height: "16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1382,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "14",
                                                        y: "4",
                                                        width: "4",
                                                        height: "16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1383,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 11
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    points: "5 3 19 12 5 21 5 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/player/page.tsx",
                                                    lineNumber: 1398,
                                                    columnNumber: 12
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1386,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1364,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "text-gray-400 hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "20",
                                                height: "20",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "5 4 15 12 5 20 5 4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1419,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "19",
                                                        y1: "5",
                                                        x2: "19",
                                                        y2: "19"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1420,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1407,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1403,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1342,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "text-gray-400 hover:text-white mr-1",
                                            onClick: ()=>setVolume(volume > 0 ? 0 : 75),
                                            children: volume === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "1",
                                                        y1: "1",
                                                        x2: "23",
                                                        y2: "23"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1444,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1445,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M17 16.95A7 7 0 0 1 12 19c-2.38 0-4.5-1.12-5.86-2.86"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1446,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1432,
                                                columnNumber: 11
                                            }, this) : volume < 30 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1461,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M15.54 8.46a5 5 0 0 1 0 7.07"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1462,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1449,
                                                columnNumber: 11
                                            }, this) : volume < 70 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1477,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M15.54 8.46a5 5 0 0 1 0 7.07"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1478,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M19.07 4.93a10 10 0 0 1 0 14.14"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1479,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1465,
                                                columnNumber: 11
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1494,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M15.54 8.46a5 5 0 0 1 0 7.07"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1495,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M19.07 4.93a10 10 0 0 1 0 14.14"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/player/page.tsx",
                                                        lineNumber: 1496,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1482,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1426,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: "0",
                                            max: "100",
                                            value: volume,
                                            onChange: handleVolumeChange,
                                            className: "w-24 h-1 accent-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/player/page.tsx",
                                            lineNumber: 1500,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1425,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 1323,
                            columnNumber: 7
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full text-center text-gray-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Select a track to play"
                            }, void 0, false, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 1512,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 1511,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/player/page.tsx",
                        lineNumber: 1321,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/player/page.tsx",
                lineNumber: 966,
                columnNumber: 4
            }, this),
            currentTrack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-96 flex-shrink-0 border-l border-gray-800 bg-gradient-to-b from-blue-900/30 to-black overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold",
                                    children: currentTrack.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1523,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "p-1 text-gray-400 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "18",
                                                y1: "6",
                                                x2: "6",
                                                y2: "18"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1540,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "6",
                                                y1: "6",
                                                x2: "18",
                                                y2: "18"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/player/page.tsx",
                                                lineNumber: 1541,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/player/page.tsx",
                                        lineNumber: 1528,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1524,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 1522,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-square mb-5 rounded-lg overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: currentTrack.thumbnail || "https://picsum.photos/400/400?random=1",
                                alt: currentTrack.title,
                                fill: true,
                                className: "object-cover",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/player/page.tsx",
                                lineNumber: 1547,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 1546,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold",
                                    children: currentTrack.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1560,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: currentTrack.artist
                                }, void 0, false, {
                                    fileName: "[project]/src/app/player/page.tsx",
                                    lineNumber: 1561,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/player/page.tsx",
                            lineNumber: 1559,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/player/page.tsx",
                    lineNumber: 1521,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/player/page.tsx",
                lineNumber: 1520,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                fileName: "[project]/src/app/player/page.tsx",
                lineNumber: 1590,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/player/page.tsx",
        lineNumber: 860,
        columnNumber: 3
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__7552605d._.js.map