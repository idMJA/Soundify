import { NextResponse, type NextRequest } from "next/server";

/**
 * Interface for Spotify API search response track items
 */
interface SpotifyTrack {
	id: string;
	name: string;
	uri: string;
	album: {
		id: string;
		name: string;
		images: Array<{
			url: string;
			height: number;
			width: number;
		}>;
		release_date: string;
		available_markets: string[];
	};
	artists: Array<{
		id: string;
		name: string;
		uri: string;
	}>;
	duration_ms: number;
	popularity: number;
	external_ids?: {
		isrc?: string;
	};
	explicit: boolean;
}

/**
 * Interface for Spotify API search response playlist items
 */
interface SpotifyPlaylist {
	id: string;
	name: string;
	description: string;
	images: Array<{
		url: string;
		height: number | null;
		width: number | null;
	}>;
	owner: {
		id: string;
		display_name: string;
	};
	uri: string;
	tracks: {
		total: number;
	};
}

/**
 * Interface for Spotify API search response
 */
interface SpotifySearchResponse {
	tracks?: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyTrack[];
	};
	playlists?: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyPlaylist[];
	};
}

/**
 * Handles GET requests to search the Spotify API
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q");
		const type = searchParams.get("type") || "track,playlist";
		const limit = searchParams.get("limit") || "20";
		const offset = searchParams.get("offset") || "0";
		const isrc = searchParams.get("isrc"); // Get ISRC if provided

		if (!query && !isrc) {
			return NextResponse.json(
				{ error: "Either query parameter 'q' or 'isrc' is required" },
				{ status: 400 },
			);
		}

		// First, get a Spotify access token
		const tokenResponse = await fetch(
			`${new URL(request.url).origin}/api/spotify/token`,
		);

		if (!tokenResponse.ok) {
			const errorText = await tokenResponse.text();
			console.error("Failed to fetch Spotify token:", errorText);
			return NextResponse.json(
				{ error: "Failed to authenticate with Spotify" },
				{ status: tokenResponse.status },
			);
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
					Accept: "application/json",
				},
			});

			if (isrcResponse.ok) {
				const isrcData: SpotifySearchResponse = await isrcResponse.json();

				// If we found tracks by ISRC, return them
				if (isrcData.tracks && isrcData.tracks.items.length > 0) {
					console.log(`Found ${isrcData.tracks.items.length} tracks by ISRC`);
					return NextResponse.json(isrcData);
				}
				// Otherwise fall through to regular search
				console.log("No tracks found by ISRC, falling back to regular search");
			} else {
				console.log(
					`ISRC search failed with status ${isrcResponse.status}, falling back to regular search`,
				);
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
				Accept: "application/json",
			},
		});

		if (!searchResponse.ok) {
			const errorText = await searchResponse.text();
			console.error(
				`Spotify API search error (${searchResponse.status}):`,
				errorText,
			);

			// If we get an insufficient scope error, we need to inform the user
			// that we can only access public data with our current auth method
			if (searchResponse.status === 403) {
				console.log(
					"Insufficient scope error - client credentials can only access public data",
				);
				// Try again with just the public-facing aspects
				spotifyUrl.searchParams.set("type", "track,artist,album");

				const retryResponse = await fetch(spotifyUrl.toString(), {
					headers: {
						Authorization: `Bearer ${tokenData.accessToken}`,
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				});

				if (retryResponse.ok) {
					return NextResponse.json(await retryResponse.json());
				}
			}

			return NextResponse.json(
				{
					error: `Spotify API error: ${searchResponse.status}`,
					details: errorText,
				},
				{ status: searchResponse.status },
			);
		}

		const searchData: SpotifySearchResponse = await searchResponse.json();

		// Return the raw Spotify search response
		return NextResponse.json(searchData);
	} catch (error) {
		console.error("Spotify search error:", error);

		return NextResponse.json(
			{
				error: "Failed to search Spotify",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
