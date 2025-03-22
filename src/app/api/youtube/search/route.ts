import { NextResponse } from "next/server";

// YouTube API key from the provided code
const YOUTUBE_API_KEY = "AIzaSyAtiG_ZCzMX6_n3GZvjZGndJyc0V_pnb5E";

// Interface for YouTube API response items
interface YouTubeSearchItem {
	id: {
		videoId: string;
	};
	snippet?: {
		title?: string;
		channelTitle?: string;
		thumbnails?: Record<string, unknown>;
	};
}

// Interface for our transformed video result
interface YouTubeVideo {
	videoId: string;
	title: string;
	channelTitle: string;
	thumbnails: Record<string, unknown>;
}

// Function to search YouTube by query
async function searchYouTube(
	query: string,
	maxResults = 1,
): Promise<YouTubeVideo[]> {
	try {
		const encodedQuery = encodeURIComponent(query);
		const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`YouTube API error: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();

		if (data.items && data.items.length > 0) {
			return data.items.map((item: YouTubeSearchItem) => ({
				videoId: item.id.videoId,
				title: item.snippet?.title || "",
				channelTitle: item.snippet?.channelTitle || "",
				thumbnails: item.snippet?.thumbnails || {},
			}));
		}

		return [];
	} catch (error) {
		console.error("Error searching YouTube:", error);
		throw error;
	}
}

// Interface for request body
interface SearchRequest {
	isrc?: string;
	title?: string;
	artist?: string;
	spotifyId?: string;
}

// Search strategy based on the Python code provided
export async function POST(request: Request) {
	try {
		const { isrc, title, artist } = (await request.json()) as SearchRequest;

		// Validation
		if (!isrc && (!title || !artist)) {
			return NextResponse.json(
				{
					error: "Either ISRC or both title and artist must be provided",
				},
				{ status: 400 },
			);
		}

		let youtubeVideos: YouTubeVideo[] = [];

		// Strategy 1: Try with ISRC code (most accurate)
		if (isrc) {
			// Try with both the raw ISRC and a formatted version with "ISRC" prefix
			const queries = [
				isrc, // Raw ISRC
				`ISRC ${isrc}`, // ISRC with prefix
				`${isrc} official`, // ISRC with official keyword
			];

			// Try each query until we find results
			for (const query of queries) {
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
				`${title} ${artist}`,
			];

			// Try each query until we find results
			for (const query of queries) {
				youtubeVideos = await searchYouTube(query, 3);
				if (youtubeVideos.length > 0) break;
			}
		}

		// Strategy 3: Last resort fallback - use a more general search if nothing found
		if (youtubeVideos.length === 0) {
			console.log(
				"No results found with specific search, trying general fallback search",
			);

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
						console.log(
							`Found ${youtubeVideos.length} results with fallback search`,
						);
					}
				} catch (fallbackError) {
					console.error("Error during fallback search:", fallbackError);
				}
			}
		}

		if (youtubeVideos.length > 0) {
			return NextResponse.json({
				success: true,
				videos: youtubeVideos,
				audioUrl: `https://www.youtube.com/watch?v=${youtubeVideos[0].videoId}`,
			});
		}

		return NextResponse.json(
			{
				success: false,
				error: "No videos found on YouTube",
			},
			{ status: 404 },
		);
	} catch (error) {
		console.error("YouTube search error:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Error searching YouTube",
			},
			{ status: 500 },
		);
	}
}
