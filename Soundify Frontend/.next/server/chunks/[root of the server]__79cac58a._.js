module.exports = {

"[project]/.next-internal/server/app/api/play/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/invidious/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "getBestAudioStream": (()=>getBestAudioStream),
    "getVideoStreams": (()=>getVideoStreams),
    "searchVideos": (()=>searchVideos)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// You can configure a list of Invidious instances to use
// If one fails, the system will try another
const INVIDIOUS_INSTANCES = [
    "https://id.420129.xyz"
];
async function searchVideos(query) {
    let lastError = null;
    // Try each instance until one works
    for (const instance of INVIDIOUS_INSTANCES){
        try {
            console.log(`Searching using Invidious instance: ${instance}`);
            const response = await fetch(`${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000)
            });
            if (!response.ok) {
                console.warn(`Instance ${instance} returned status: ${response.status}`);
                lastError = new Error(`Instance ${instance} returned status: ${response.status}`);
                continue; // Try the next instance
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn(`Search with instance ${instance} failed:`, error);
            lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Invidious instances failed for search");
    throw lastError || new Error("All Invidious instances failed");
}
async function getVideoStreams(videoId) {
    let lastError = null;
    // Try each instance until one works
    for (const instance of INVIDIOUS_INSTANCES){
        try {
            console.log(`Getting video stream from Invidious instance: ${instance}`);
            const response = await fetch(`${instance}/api/v1/videos/${videoId}`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000)
            });
            if (!response.ok) {
                console.warn(`Instance ${instance} returned status: ${response.status}`);
                lastError = new Error(`Instance ${instance} returned status: ${response.status}`);
                continue; // Try the next instance
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn(`Get video stream with instance ${instance} failed:`, error);
            lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Invidious instances failed for video streams");
    throw lastError || new Error("All Invidious instances failed");
}
function getBestAudioStream(streamInfo) {
    // First try to get an audio-only stream from adaptive formats
    const audioStreams = streamInfo.adaptiveFormats.filter((format)=>format.type.startsWith("audio/") || format.audioQuality);
    // Sort by bitrate (highest first)
    const sortedStreams = [
        ...audioStreams
    ].sort((a, b)=>b.bitrate - a.bitrate);
    // Return the URL of the highest quality audio stream, or null if none found
    return sortedStreams.length > 0 ? sortedStreams[0].url : null;
}
async function GET() {
    // Try each instance until one works
    for (const instance of INVIDIOUS_INSTANCES){
        try {
            console.log(`Checking health of Invidious instance: ${instance}`);
            const response = await fetch(`${instance}/api/v1/stats`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(3000)
            });
            if (!response.ok) {
                console.warn(`Instance ${instance} health check failed with status: ${response.status}`);
                continue; // Try the next instance
            }
            const stats = await response.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "ok",
                instance,
                stats: {
                    version: stats.version,
                    software: stats.software
                }
            });
        } catch (error) {
            console.warn(`Health check for instance ${instance} failed:`, error);
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Invidious instances failed health check");
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "All Invidious API instances are not responding"
    }, {
        status: 503
    });
}
}}),
"[project]/src/app/api/piped/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "getBestAudioStream": (()=>getBestAudioStream),
    "getVideoStreams": (()=>getVideoStreams),
    "searchVideos": (()=>searchVideos)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// List of Piped instances from https://github.com/TeamPiped/documentation/blob/main/content/docs/public-instances/index.md
const PIPED_INSTANCES = [
    // "https://pipedapi.nosebs.ru",
    "https://pipedapi.drgns.space",
    "https://pipedapi.ducks.party",
    "https://api.piped.private.coffee",
    "https://pipedapi.orangenet.cc"
];
async function searchVideos(query) {
    let lastError = null;
    // Try each instance until one works
    for (const instance of PIPED_INSTANCES){
        try {
            console.log(`Searching using Piped instance: ${instance}`);
            const response = await fetch(`${instance}/search?q=${encodeURIComponent(query)}&filter=videos`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000)
            });
            if (!response.ok) {
                console.warn(`Piped instance ${instance} returned status: ${response.status}`);
                lastError = new Error(`Piped instance ${instance} returned status: ${response.status}`);
                continue; // Try the next instance
            }
            // Check content type for debugging
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn(`Piped instance ${instance} returned non-JSON content type: ${contentType}`);
                // Get some response text for debugging
                const text = await response.text();
                console.warn(`Response starts with: ${text.substring(0, 100)}`);
                lastError = new Error(`Piped instance ${instance} returned non-JSON content: ${contentType}`);
                continue; // Try the next instance
            }
            // Parse JSON after ensuring it's the right content type
            const data = JSON.parse(await response.text());
            return data.items;
        } catch (error) {
            console.warn(`Search with Piped instance ${instance} failed:`, error);
            lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Piped instances failed for search");
    throw lastError || new Error("All Piped instances failed");
}
async function getVideoStreams(videoId) {
    let lastError = null;
    // Try each instance until one works
    for (const instance of PIPED_INSTANCES){
        try {
            console.log(`Getting video stream from Piped instance: ${instance}`);
            const response = await fetch(`${instance}/streams/${videoId}`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000)
            });
            if (!response.ok) {
                console.warn(`Piped instance ${instance} returned status: ${response.status}`);
                lastError = new Error(`Piped instance ${instance} returned status: ${response.status}`);
                continue; // Try the next instance
            }
            // Check content type for debugging
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn(`Piped instance ${instance} returned non-JSON content type: ${contentType}`);
                // Get some response text for debugging
                const text = await response.text();
                console.warn(`Response starts with: ${text.substring(0, 100)}`);
                lastError = new Error(`Piped instance ${instance} returned non-JSON content: ${contentType}`);
                continue; // Try the next instance
            }
            // Parse JSON after ensuring it's the right content type
            const data = JSON.parse(await response.text());
            return data;
        } catch (error) {
            console.warn(`Get video stream with Piped instance ${instance} failed:`, error);
            lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Piped instances failed for video streams");
    throw lastError || new Error("All Piped instances failed");
}
function getBestAudioStream(streamInfo) {
    // Get audio streams and sort by bitrate (highest first)
    const sortedStreams = [
        ...streamInfo.audioStreams
    ].sort((a, b)=>b.bitrate - a.bitrate);
    // Return the URL of the highest quality audio stream, or null if none found
    return sortedStreams.length > 0 ? sortedStreams[0].url : null;
}
async function GET() {
    // Try each instance until one works
    for (const instance of PIPED_INSTANCES){
        try {
            console.log(`Checking health of Piped instance: ${instance}`);
            // Just checking if the API responds
            const response = await fetch(`${instance}/config`, {
                cache: "no-store",
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(3000)
            });
            if (!response.ok) {
                console.warn(`Piped instance ${instance} health check failed with status: ${response.status}`);
                continue; // Try the next instance
            }
            // Check content type for debugging
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn(`Piped instance ${instance} returned non-JSON content type: ${contentType}`);
                continue; // Try the next instance
            }
            const config = await response.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "ok",
                instance,
                config
            });
        } catch (error) {
            console.warn(`Health check for Piped instance ${instance} failed:`, error);
        // Continue to next instance
        }
    }
    // If we reach here, all instances failed
    console.error("All Piped instances failed health check");
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "All Piped API instances are not responding"
    }, {
        status: 503
    });
}
}}),
"[project]/src/app/api/play/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/invidious/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$piped$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/piped/route.ts [app-route] (ecmascript)");
;
;
;
// Initialize global state if not already present
if (typeof global.currentAudioPlayer === "undefined") {
    global.currentAudioPlayer = null;
    global.currentTrackId = null;
}
async function POST(request) {
    try {
        const { track } = await request.json();
        if (!track || !track.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Track information is required"
            }, {
                status: 400
            });
        }
        // Extract preferred service, defaulting to piped
        const preferredService = track.preferredService || "piped";
        try {
            let audioUrl = null;
            let title = "";
            let author = "";
            let usedService = preferredService; // Use the preferred service
            // Always try the preferred service first (should be piped by default)
            if (preferredService === "piped" || usedService === "piped") {
                try {
                    // Directly use Piped API for music streaming
                    console.log("Getting stream with Piped API");
                    const pipedStreamInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$piped$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getVideoStreams"])(track.id);
                    audioUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$piped$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBestAudioStream"])(pipedStreamInfo);
                    title = pipedStreamInfo.title;
                    author = pipedStreamInfo.uploader;
                    // If Piped fails, only then fall back to Invidious
                    if (!audioUrl) {
                        throw new Error("No suitable audio stream found from Piped");
                    }
                } catch (pipedError) {
                    console.warn("Piped streams failed, falling back to Invidious API:", pipedError);
                    usedService = "invidious";
                    try {
                        console.log("Falling back to Invidious API for streaming");
                        const streamInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getVideoStreams"])(track.id);
                        audioUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBestAudioStream"])(streamInfo);
                        title = streamInfo.title;
                        author = streamInfo.author;
                        if (!audioUrl) {
                            throw new Error("No suitable audio stream found from Invidious");
                        }
                    } catch (invidiousError) {
                        console.error("Both Piped and Invidious streams failed:", invidiousError);
                        throw new Error("All stream services failed");
                    }
                }
            } else if (preferredService === "invidious") {
                // If for some reason Invidious is preferred, try it first
                try {
                    console.log("Getting stream with Invidious API (as requested)");
                    const streamInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getVideoStreams"])(track.id);
                    audioUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBestAudioStream"])(streamInfo);
                    title = streamInfo.title;
                    author = streamInfo.author;
                    if (!audioUrl) {
                        throw new Error("No suitable audio stream found from Invidious");
                    }
                } catch (invidiousError) {
                    console.warn("Invidious streams failed, falling back to Piped API:", invidiousError);
                    usedService = "piped";
                    try {
                        console.log("Falling back to Piped API for streaming");
                        const pipedStreamInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$piped$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getVideoStreams"])(track.id);
                        audioUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$piped$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBestAudioStream"])(pipedStreamInfo);
                        title = pipedStreamInfo.title;
                        author = pipedStreamInfo.uploader;
                        if (!audioUrl) {
                            throw new Error("No suitable audio stream found from Piped");
                        }
                    } catch (pipedError) {
                        console.error("Both Invidious and Piped streams failed:", pipedError);
                        throw new Error("All stream services failed");
                    }
                }
            }
            if (!audioUrl) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "No suitable audio stream found for this track"
                }, {
                    status: 404
                });
            }
            // If we're already playing something, stop it
            if (global.currentAudioPlayer) {
                global.currentAudioPlayer.pause();
                global.currentAudioPlayer = null;
            }
            // In a web context, HTMLAudioElement wouldn't exist server-side
            // We're simulating audio playback for the server environment
            // In a real app with client-side playback, this would be handled differently
            global.currentTrackId = track.id;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "playing",
                trackId: track.id,
                audioUrl,
                title,
                author,
                service: usedService
            });
        } catch (error) {
            console.error("Stream error:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to get stream information"
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error("Play error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to play track"
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__79cac58a._.js.map