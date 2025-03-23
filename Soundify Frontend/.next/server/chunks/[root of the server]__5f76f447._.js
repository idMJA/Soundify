module.exports = {

"[project]/.next-internal/server/app/api/youtube/search/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/youtube/search/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// YouTube API key from the provided code
const YOUTUBE_API_KEY = "AIzaSyAtiG_ZCzMX6_n3GZvjZGndJyc0V_pnb5E";
// Function to search YouTube by query
async function searchYouTube(query, maxResults = 1) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items.map((item)=>({
                    videoId: item.id.videoId,
                    title: item.snippet?.title || "",
                    channelTitle: item.snippet?.channelTitle || "",
                    thumbnails: item.snippet?.thumbnails || {}
                }));
        }
        return [];
    } catch (error) {
        console.error("Error searching YouTube:", error);
        throw error;
    }
}
async function POST(request) {
    try {
        const { isrc, title, artist } = await request.json();
        // Validation
        if (!isrc && (!title || !artist)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Either ISRC or both title and artist must be provided"
            }, {
                status: 400
            });
        }
        let youtubeVideos = [];
        // Strategy 1: Try with ISRC code (most accurate)
        if (isrc) {
            // Try with both the raw ISRC and a formatted version with "ISRC" prefix
            const queries = [
                isrc,
                `ISRC ${isrc}`,
                `${isrc} official`
            ];
            // Try each query until we find results
            for (const query of queries){
                const results = await searchYouTube(query, 2);
                if (results.length > 0) {
                    youtubeVideos = results;
                    break;
                }
            }
        }
        // Strategy 2: If no results with ISRC, try with title and artist
        if (youtubeVideos.length === 0 && title && artist) {
            // Try different query formats to increase chances of finding the correct video
            const queries = [
                `${title} ${artist} official audio`,
                `${title} ${artist} audio`,
                `${title} ${artist} lyrics`,
                `${title} ${artist}`
            ];
            // Try each query until we find results
            for (const query of queries){
                youtubeVideos = await searchYouTube(query, 3);
                if (youtubeVideos.length > 0) break;
            }
        }
        // Strategy 3: Last resort fallback - use a more general search if nothing found
        if (youtubeVideos.length === 0) {
            console.log("No results found with specific search, trying general fallback search");
            // Create a fallback query from whatever information we have
            let fallbackQuery = "";
            if (title) {
                fallbackQuery = title;
            } else if (isrc) {
                fallbackQuery = isrc;
            }
            // Try a more generic search with fewer terms and constraints
            if (fallbackQuery) {
                try {
                    console.log(`Trying fallback search with query: "${fallbackQuery}"`);
                    youtubeVideos = await searchYouTube(fallbackQuery, 5);
                    if (youtubeVideos.length > 0) {
                        console.log(`Found ${youtubeVideos.length} results with fallback search`);
                    }
                } catch (fallbackError) {
                    console.error("Error during fallback search:", fallbackError);
                }
            }
        }
        if (youtubeVideos.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                videos: youtubeVideos,
                audioUrl: `https://www.youtube.com/watch?v=${youtubeVideos[0].videoId}`
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "No videos found on YouTube"
        }, {
            status: 404
        });
    } catch (error) {
        console.error("YouTube search error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error searching YouTube"
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5f76f447._.js.map