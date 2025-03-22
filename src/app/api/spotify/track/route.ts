import { NextResponse, type NextRequest } from "next/server";

/**
 * Interface for Spotify Track details
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
	external_ids: {
		isrc?: string;
		ean?: string;
		upc?: string;
	};
	explicit: boolean;
}

/**
 * Get track details by ID or ISRC
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const isrc = searchParams.get("isrc");

		if (!id && !isrc) {
			return NextResponse.json(
				{ error: "Either 'id' or 'isrc' parameter is required" },
				{ status: 400 },
			);
		}

		// Get Spotify token
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
					Accept: "application/json",
				},
			});

			if (!searchResponse.ok) {
				const errorText = await searchResponse.text();
				console.error(
					`Spotify ISRC search error (${searchResponse.status}):`,
					errorText,
				);
				return NextResponse.json(
					{
						error: `Spotify API error: ${searchResponse.status}`,
						details: errorText,
					},
					{ status: searchResponse.status },
				);
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
						"Content-Type": "application/json",
					},
				});

				if (!trackResponse.ok) {
					const errorText = await trackResponse.text();
					console.error(
						`Spotify track details error (${trackResponse.status}):`,
						errorText,
					);
					return NextResponse.json(
						{
							error: `Spotify API error: ${trackResponse.status}`,
							details: errorText,
						},
						{ status: trackResponse.status },
					);
				}

				const trackData: SpotifyTrack = await trackResponse.json();
				return NextResponse.json(trackData);
			}

			return NextResponse.json(
				{ error: "No track found with this ISRC" },
				{ status: 404 },
			);
		}

		// If ID is provided, get track directly
		if (id) {
			console.log(`Getting track by ID: ${id}`);

			const trackUrl = `https://api.spotify.com/v1/tracks/${id}?market=US`;
			const trackResponse = await fetch(trackUrl, {
				headers: {
					Authorization: `Bearer ${tokenData.accessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (!trackResponse.ok) {
				const errorText = await trackResponse.text();
				console.error(
					`Spotify track details error (${trackResponse.status}):`,
					errorText,
				);
				return NextResponse.json(
					{
						error: `Spotify API error: ${trackResponse.status}`,
						details: errorText,
					},
					{ status: trackResponse.status },
				);
			}

			const trackData: SpotifyTrack = await trackResponse.json();
			return NextResponse.json(trackData);
		}
	} catch (error) {
		console.error("Spotify track error:", error);

		return NextResponse.json(
			{
				error: "Failed to get track from Spotify",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
