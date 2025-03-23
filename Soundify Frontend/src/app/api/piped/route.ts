import { NextResponse } from "next/server";

// Define interfaces for Piped API responses
interface PipedVideo {
	url: string;
	title: string;
	thumbnail: string;
	uploaderName: string;
	uploaderUrl: string;
	uploaderAvatar: string;
	uploadedDate: string;
	duration: number;
	views: number;
	uploaded: number;
	uploaderVerified: boolean;
	isShort: boolean;
}

interface PipedSearchResult {
	items: PipedVideo[];
	nextpage: string | null;
	suggestion: string | null;
	corrected: boolean;
}

interface PipedStreamFormat {
	itag: number;
	mimeType: string;
	bitrate: number;
	width: number;
	height: number;
	initStart: number;
	initEnd: number;
	indexStart: number;
	indexEnd: number;
	quality: string;
	fps: number;
	url: string;
	audioTrack?: {
		audioChannels: number;
		audioQuality: string;
		audioSampleRate: number;
	};
}

interface PipedStreamInfo {
	title: string;
	description: string;
	uploadDate: string;
	uploader: string;
	uploaderUrl: string;
	uploaderAvatar: string;
	thumbnailUrl: string;
	hls: string | null;
	dash: string | null;
	lbryId: string | null;
	uploaderVerified: boolean;
	duration: number;
	views: number;
	likes: number;
	dislikes: number;
	audioStreams: PipedStreamFormat[];
	videoStreams: PipedStreamFormat[];
}

// List of Piped instances from https://github.com/TeamPiped/documentation/blob/main/content/docs/public-instances/index.md
const PIPED_INSTANCES = [
	// "https://pipedapi.nosebs.ru",
	"https://pipedapi.drgns.space",
	"https://pipedapi.ducks.party",
	"https://api.piped.private.coffee",
	"https://pipedapi.orangenet.cc",
];

// Function to search for videos
export async function searchVideos(query: string): Promise<PipedVideo[]> {
	let lastError: Error | null = null;

	// Try each instance until one works
	for (const instance of PIPED_INSTANCES) {
		try {
			console.log(`Searching using Piped instance: ${instance}`);
			const response = await fetch(
				`${instance}/search?q=${encodeURIComponent(query)}&filter=videos`,
				{
					cache: "no-store",
					next: { revalidate: 0 },
					signal: AbortSignal.timeout(5000), // 5 second timeout
				},
			);

			if (!response.ok) {
				console.warn(
					`Piped instance ${instance} returned status: ${response.status}`,
				);
				lastError = new Error(
					`Piped instance ${instance} returned status: ${response.status}`,
				);
				continue; // Try the next instance
			}

			// Check content type for debugging
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				console.warn(
					`Piped instance ${instance} returned non-JSON content type: ${contentType}`,
				);

				// Get some response text for debugging
				const text = await response.text();
				console.warn(`Response starts with: ${text.substring(0, 100)}`);

				lastError = new Error(
					`Piped instance ${instance} returned non-JSON content: ${contentType}`,
				);
				continue; // Try the next instance
			}

			// Parse JSON after ensuring it's the right content type
			const data = JSON.parse(await response.text()) as PipedSearchResult;
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

// Function to get streaming URLs for a video
export async function getVideoStreams(
	videoId: string,
): Promise<PipedStreamInfo> {
	let lastError: Error | null = null;

	// Try each instance until one works
	for (const instance of PIPED_INSTANCES) {
		try {
			console.log(`Getting video stream from Piped instance: ${instance}`);
			const response = await fetch(`${instance}/streams/${videoId}`, {
				cache: "no-store",
				next: { revalidate: 0 },
				signal: AbortSignal.timeout(5000), // 5 second timeout
			});

			if (!response.ok) {
				console.warn(
					`Piped instance ${instance} returned status: ${response.status}`,
				);
				lastError = new Error(
					`Piped instance ${instance} returned status: ${response.status}`,
				);
				continue; // Try the next instance
			}

			// Check content type for debugging
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				console.warn(
					`Piped instance ${instance} returned non-JSON content type: ${contentType}`,
				);

				// Get some response text for debugging
				const text = await response.text();
				console.warn(`Response starts with: ${text.substring(0, 100)}`);

				lastError = new Error(
					`Piped instance ${instance} returned non-JSON content: ${contentType}`,
				);
				continue; // Try the next instance
			}

			// Parse JSON after ensuring it's the right content type
			const data = JSON.parse(await response.text()) as PipedStreamInfo;
			return data;
		} catch (error) {
			console.warn(
				`Get video stream with Piped instance ${instance} failed:`,
				error,
			);
			lastError = error instanceof Error ? error : new Error(String(error));
			// Continue to next instance
		}
	}

	// If we reach here, all instances failed
	console.error("All Piped instances failed for video streams");
	throw lastError || new Error("All Piped instances failed");
}

// Function to get the best audio stream URL
export function getBestAudioStream(streamInfo: PipedStreamInfo): string | null {
	// Get audio streams and sort by bitrate (highest first)
	const sortedStreams = [...streamInfo.audioStreams].sort(
		(a, b) => b.bitrate - a.bitrate,
	);

	// Return the URL of the highest quality audio stream, or null if none found
	return sortedStreams.length > 0 ? sortedStreams[0].url : null;
}

// Check if our service is available (for health check)
export async function GET() {
	// Try each instance until one works
	for (const instance of PIPED_INSTANCES) {
		try {
			console.log(`Checking health of Piped instance: ${instance}`);
			// Just checking if the API responds
			const response = await fetch(`${instance}/config`, {
				cache: "no-store",
				next: { revalidate: 0 },
				signal: AbortSignal.timeout(3000), // 3 second timeout
			});

			if (!response.ok) {
				console.warn(
					`Piped instance ${instance} health check failed with status: ${response.status}`,
				);
				continue; // Try the next instance
			}

			// Check content type for debugging
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				console.warn(
					`Piped instance ${instance} returned non-JSON content type: ${contentType}`,
				);
				continue; // Try the next instance
			}

			const config = await response.json();
			return NextResponse.json({
				status: "ok",
				instance,
				config,
			});
		} catch (error) {
			console.warn(
				`Health check for Piped instance ${instance} failed:`,
				error,
			);
			// Continue to next instance
		}
	}

	// If we reach here, all instances failed
	console.error("All Piped instances failed health check");
	return NextResponse.json(
		{ error: "All Piped API instances are not responding" },
		{ status: 503 },
	);
}
