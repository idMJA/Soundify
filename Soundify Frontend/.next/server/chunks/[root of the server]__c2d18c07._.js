module.exports = {

"[project]/.next-internal/server/app/api/search/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
    "https://inv.nadeko.net",
    "https://yewtu.be",
    "https://id.420129.xyz" // 🇩🇪 Germany - Second backup instance
];
async function searchVideos(query) {
    let lastError = null;
    // Try each instance until one works
    for (const instance of INVIDIOUS_INSTANCES){
        try {
            console.log(`Searching using Invidious instance: ${instance}`);
            const response = await fetch(`${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`, {
                cache: 'no-store',
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000) // 5 second timeout
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
                cache: 'no-store',
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(5000) // 5 second timeout
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
    const audioStreams = streamInfo.adaptiveFormats.filter((format)=>format.type.startsWith('audio/') || format.audioQuality);
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
                cache: 'no-store',
                next: {
                    revalidate: 0
                },
                signal: AbortSignal.timeout(3000) // 3 second timeout
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
"[project]/src/app/api/search/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/invidious/route.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");
        if (!query) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Query parameter is required"
            }, {
                status: 400
            });
        }
        try {
            // Use Invidious API to search for videos
            const searchResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$invidious$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchVideos"])(query);
            if (!searchResults || !Array.isArray(searchResults) || searchResults.length === 0) {
                console.log("No tracks found in search results");
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    tracks: []
                });
            }
            // Format the results
            const tracks = searchResults.map((video)=>{
                // Get the best thumbnail
                const thumbnail = video.videoThumbnails.find((t)=>t.quality === 'medium')?.url || video.videoThumbnails[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;
                return {
                    id: video.videoId,
                    title: video.title || 'Unknown Title',
                    artist: video.author || 'Unknown Artist',
                    thumbnail,
                    duration: video.lengthSeconds || 0,
                    uri: `https://www.youtube.com/watch?v=${video.videoId}`
                };
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                tracks
            });
        } catch (error) {
            console.error("Search method error:", error);
            console.error("Error details:", error instanceof Error ? error.stack : String(error));
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Invidious search failed: ${errorMessage}`
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error("Search error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Failed to search tracks: ${errorMessage}`
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__c2d18c07._.js.map