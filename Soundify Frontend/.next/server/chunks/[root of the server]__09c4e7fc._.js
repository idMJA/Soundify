module.exports = {

"[project]/.next-internal/server/app/api/spotify/track/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/spotify/track/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const isrc = searchParams.get("isrc");
        if (!id && !isrc) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Either 'id' or 'isrc' parameter is required"
            }, {
                status: 400
            });
        }
        // Get Spotify token
        const tokenResponse = await fetch(`${new URL(request.url).origin}/api/spotify/token`);
        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Failed to fetch Spotify token:", errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to authenticate with Spotify"
            }, {
                status: tokenResponse.status
            });
        }
        const tokenData = await tokenResponse.json();
        // If ISRC is provided, search by ISRC first
        if (isrc) {
            console.log(`Finding track by ISRC: ${isrc}`);
            const searchUrl = new URL("https://api.spotify.com/v1/search");
            searchUrl.searchParams.append("q", `isrc:${isrc}`);
            searchUrl.searchParams.append("type", "track");
            searchUrl.searchParams.append("limit", "1");
            searchUrl.searchParams.append("market", "US");
            const searchResponse = await fetch(searchUrl.toString(), {
                headers: {
                    Authorization: `Bearer ${tokenData.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
            if (!searchResponse.ok) {
                const errorText = await searchResponse.text();
                console.error(`Spotify ISRC search error (${searchResponse.status}):`, errorText);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Spotify API error: ${searchResponse.status}`,
                    details: errorText
                }, {
                    status: searchResponse.status
                });
            }
            const searchData = await searchResponse.json();
            if (searchData.tracks && searchData.tracks.items.length > 0) {
                // We found a track by ISRC, get its full details using the ID
                const trackId = searchData.tracks.items[0].id;
                console.log(`Found track by ISRC: ${trackId}`);
                const trackUrl = `https://api.spotify.com/v1/tracks/${trackId}?market=US`;
                const trackResponse = await fetch(trackUrl, {
                    headers: {
                        Authorization: `Bearer ${tokenData.accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!trackResponse.ok) {
                    const errorText = await trackResponse.text();
                    console.error(`Spotify track details error (${trackResponse.status}):`, errorText);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `Spotify API error: ${trackResponse.status}`,
                        details: errorText
                    }, {
                        status: trackResponse.status
                    });
                }
                const trackData = await trackResponse.json();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(trackData);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No track found with this ISRC"
            }, {
                status: 404
            });
        }
        // If ID is provided, get track directly
        if (id) {
            console.log(`Getting track by ID: ${id}`);
            const trackUrl = `https://api.spotify.com/v1/tracks/${id}?market=US`;
            const trackResponse = await fetch(trackUrl, {
                headers: {
                    Authorization: `Bearer ${tokenData.accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!trackResponse.ok) {
                const errorText = await trackResponse.text();
                console.error(`Spotify track details error (${trackResponse.status}):`, errorText);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Spotify API error: ${trackResponse.status}`,
                    details: errorText
                }, {
                    status: trackResponse.status
                });
            }
            const trackData = await trackResponse.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(trackData);
        }
    } catch (error) {
        console.error("Spotify track error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to get track from Spotify",
            details: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__09c4e7fc._.js.map