(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_ae3f9b7f._.js", {

"[project]/src/app/hooks/useLavalink.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useLavalink": (()=>useLavalink)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useLavalink() {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentTrack, setCurrentTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Search for tracks
    const searchTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[searchTracks]": async (query)=>{
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
            } finally{
                setIsLoading(false);
            }
        }
    }["useLavalink.useCallback[searchTracks]"], []);
    // Play a track
    const playTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[playTrack]": async (query, options)=>{
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/lavalink/play', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query,
                        volume: options?.volume ?? 100
                    })
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
            } finally{
                setIsLoading(false);
            }
        }
    }["useLavalink.useCallback[playTrack]"], []);
    // Control playback (pause, resume, stop)
    const controlPlayback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[controlPlayback]": async (action, options)=>{
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/lavalink/control', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action,
                        ...options || {}
                    })
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
            } finally{
                setIsLoading(false);
            }
        }
    }["useLavalink.useCallback[controlPlayback]"], []);
    // Pause playback
    const pausePlayback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[pausePlayback]": ()=>{
            return controlPlayback('pause');
        }
    }["useLavalink.useCallback[pausePlayback]"], [
        controlPlayback
    ]);
    // Resume playback
    const resumePlayback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[resumePlayback]": ()=>{
            return controlPlayback('resume');
        }
    }["useLavalink.useCallback[resumePlayback]"], [
        controlPlayback
    ]);
    // Stop playback
    const stopPlayback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[stopPlayback]": ()=>{
            return controlPlayback('stop');
        }
    }["useLavalink.useCallback[stopPlayback]"], [
        controlPlayback
    ]);
    // Set volume
    const setVolume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLavalink.useCallback[setVolume]": (volume)=>{
            return controlPlayback('volume', {
                volume
            });
        }
    }["useLavalink.useCallback[setVolume]"], [
        controlPlayback
    ]);
    // Clean up player when component unmounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLavalink.useEffect": ()=>{
            return ({
                "useLavalink.useEffect": ()=>{
                    if (sessionId) {
                        // Attempt to destroy the player when component unmounts
                        fetch('/api/lavalink/control', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'destroy'
                            })
                        }).catch({
                            "useLavalink.useEffect": (err)=>{
                                console.error('Failed to clean up player:', err);
                            }
                        }["useLavalink.useEffect"]);
                    }
                }
            })["useLavalink.useEffect"];
        }
    }["useLavalink.useEffect"], [
        sessionId
    ]);
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
        setVolume
    };
}
_s(useLavalink, "Y6ehvqYtnuAJdVCL54B1Y7UkYUA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/LavalinkPlayer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LavalinkPlayer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useLavalink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/hooks/useLavalink.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LavalinkPlayer() {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [volume, setVolumeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(100);
    const { isLoading, error, currentTrack, isPlaying, searchTracks, playTrack, pausePlayback, resumePlayback, stopPlayback, setVolume } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useLavalink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLavalink"])();
    const handleSearch = async ()=>{
        if (!searchQuery.trim()) return;
        const results = await searchTracks(searchQuery);
        if (results?.tracks) {
            setSearchResults(results.tracks);
        }
    };
    const handlePlay = async (track)=>{
        // If track.encoded exists, use that, otherwise use track.uri or track.info.uri
        const trackIdentifier = track.encoded || track.uri || track.info?.uri || `ytsearch:${track.info?.title || 'music'}`;
        await playTrack(trackIdentifier, {
            volume
        });
    };
    const handleVolumeChange = (e)=>{
        const newVolume = Number.parseInt(e.target.value, 10);
        setVolumeState(newVolume);
        setVolume(newVolume);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 bg-gray-800 rounded-lg shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold mb-4 text-white",
                children: "Lavalink Player"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        placeholder: "Search for tracks...",
                        className: "flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleSearch,
                        disabled: isLoading,
                        className: "px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50",
                        children: isLoading ? 'Searching...' : 'Search'
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-red-500 text-white rounded-md",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            currentTrack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-gray-700 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: "Now Playing"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mt-2",
                        children: [
                            currentTrack.artworkUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: currentTrack.artworkUrl,
                                alt: currentTrack.title,
                                className: "w-16 h-16 rounded-md mr-4 object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white font-medium",
                                        children: currentTrack.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: currentTrack.author
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex mt-4 space-x-2",
                        children: [
                            isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: pausePlayback,
                                className: "px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500",
                                children: "Pause"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: resumePlayback,
                                className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",
                                children: "Play"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: stopPlayback,
                                className: "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700",
                                children: "Stop"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "volume-control",
                                className: "block text-sm text-gray-400 mb-1",
                                children: [
                                    "Volume: ",
                                    volume,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "volume-control",
                                type: "range",
                                min: "0",
                                max: "100",
                                value: volume,
                                onChange: handleVolumeChange,
                                className: "w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2 text-white",
                        children: "Search Results"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-80 overflow-y-auto",
                        children: searchResults.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "flex w-full items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-left",
                                onClick: ()=>handlePlay(track),
                                "aria-label": `Play ${track.info?.title || 'track'}`,
                                children: [
                                    track.info?.artworkUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: track.info.artworkUrl,
                                        alt: track.info.title,
                                        className: "w-10 h-10 rounded-md mr-3 object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                        lineNumber: 165,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-sm font-medium truncate",
                                                children: track.info?.title || 'Unknown Title'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-xs truncate",
                                                children: track.info?.author || 'Unknown Artist'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                handlePlay(track);
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-4 w-4",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                                        children: "Play"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                            lineNumber: 180,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, track.encoded || track.uri || track.info?.uri || track.info?.identifier || `track-${Date.now()}-${Math.random()}`, true, {
                                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/LavalinkPlayer.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(LavalinkPlayer, "GStM9Yb2AbJ+eG3GEaqrfwtS9PE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useLavalink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLavalink"]
    ];
});
_c = LavalinkPlayer;
var _c;
__turbopack_context__.k.register(_c, "LavalinkPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/LavalinkPlayer.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/components/LavalinkPlayer.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_app_ae3f9b7f._.js.map