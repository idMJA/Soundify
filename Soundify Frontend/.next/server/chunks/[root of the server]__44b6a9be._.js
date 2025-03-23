module.exports = {

"[project]/.next-internal/server/app/api/spotify/search/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/spotify/search/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
        const query = searchParams.get("q");
        const type = searchParams.get("type") || "track,playlist";
        const limit = searchParams.get("limit") || "20";
        const offset = searchParams.get("offset") || "0";
        const isrc = searchParams.get("isrc"); // Get ISRC if provided
        if (!query && !isrc) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Either query parameter 'q' or 'isrc' is required"
            }, {
                status: 400
            });
        }
        // First, get a Spotify access token
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
        // If ISRC is provided, try searching by ISRC first
        if (isrc) {
            console.log(`Searching Spotify by ISRC: ${isrc}`);
            const isrcUrl = new URL("https://api.spotify.com/v1/search");
            isrcUrl.searchParams.append("q", `isrc:${isrc}`);
            isrcUrl.searchParams.append("type", "track");
            isrcUrl.searchParams.append("limit", "5"); // Usually just one match for ISRC
            isrcUrl.searchParams.append("market", "US");
            const isrcResponse = await fetch(isrcUrl.toString(), {
                headers: {
                    Authorization: `Bearer ${tokenData.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
            if (isrcResponse.ok) {
                const isrcData = await isrcResponse.json();
                // If we found tracks by ISRC, return them
                if (isrcData.tracks && isrcData.tracks.items.length > 0) {
                    console.log(`Found ${isrcData.tracks.items.length} tracks by ISRC`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(isrcData);
                }
                // Otherwise fall through to regular search
                console.log("No tracks found by ISRC, falling back to regular search");
            } else {
                console.log(`ISRC search failed with status ${isrcResponse.status}, falling back to regular search`);
            }
        }
        // Regular search if no ISRC was provided or ISRC search returned no results
        // Now use the token to search Spotify
        const spotifyUrl = new URL("https://api.spotify.com/v1/search");
        spotifyUrl.searchParams.append("q", query || ""); // Use empty string if we got here via ISRC fallback with no query
        spotifyUrl.searchParams.append("type", type);
        spotifyUrl.searchParams.append("limit", limit);
        spotifyUrl.searchParams.append("offset", offset);
        spotifyUrl.searchParams.append("market", "US");
        console.log(`Searching Spotify with URL: ${spotifyUrl.toString()}`);
        const searchResponse = await fetch(spotifyUrl.toString(), {
            headers: {
                Authorization: `Bearer ${tokenData.accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        if (!searchResponse.ok) {
            const errorText = await searchResponse.text();
            console.error(`Spotify API search error (${searchResponse.status}):`, errorText);
            // If we get an insufficient scope error, we need to inform the user
            // that we can only access public data with our current auth method
            if (searchResponse.status === 403) {
                console.log("Insufficient scope error - client credentials can only access public data");
                // Try again with just the public-facing aspects
                spotifyUrl.searchParams.set("type", "track,artist,album");
                const retryResponse = await fetch(spotifyUrl.toString(), {
                    headers: {
                        Authorization: `Bearer ${tokenData.accessToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                });
                if (retryResponse.ok) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(await retryResponse.json());
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Spotify API error: ${searchResponse.status}`,
                details: errorText
            }, {
                status: searchResponse.status
            });
        }
        const searchData = await searchResponse.json();
        // Return the raw Spotify search response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(searchData);
    } catch (error) {
        console.error("Spotify search error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to search Spotify",
            details: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__44b6a9be._.js.map