import { type NextRequest, NextResponse } from "next/server";
import {
	getVideoStreams as getInvidiousStreams,
	getBestAudioStream as getInvidiousBestAudio,
} from "../invidious/route";
import {
	getVideoStreams as getPipedStreams,
	getBestAudioStream as getPipedBestAudio,
} from "../piped/route";

// Global object to track playback state
declare global {
	/* eslint-disable no-var */
	var currentAudioPlayer: HTMLAudioElement | null;
	var currentTrackId: string | null;
	/* eslint-enable no-var */
}

// Initialize global state if not already present
if (typeof global.currentAudioPlayer === "undefined") {
	global.currentAudioPlayer = null;
	global.currentTrackId = null;
}

export async function POST(request: NextRequest) {
	try {
		const { track } = await request.json();

		if (!track || !track.id) {
			return NextResponse.json(
				{ error: "Track information is required" },
				{ status: 400 },
			);
		}

		// Extract preferred service, defaulting to piped
		const preferredService = track.preferredService || "piped";

		try {
			let audioUrl: string | null = null;
			let title = "";
			let author = "";
			let usedService = preferredService; // Use the preferred service

			// Always try the preferred service first (should be piped by default)
			if (preferredService === "piped" || usedService === "piped") {
				try {
					// Directly use Piped API for music streaming
					console.log("Getting stream with Piped API");
					const pipedStreamInfo = await getPipedStreams(track.id);
					audioUrl = getPipedBestAudio(pipedStreamInfo);
					title = pipedStreamInfo.title;
					author = pipedStreamInfo.uploader;

					// If Piped fails, only then fall back to Invidious
					if (!audioUrl) {
						throw new Error("No suitable audio stream found from Piped");
					}
				} catch (pipedError) {
					console.warn(
						"Piped streams failed, falling back to Invidious API:",
						pipedError,
					);
					usedService = "invidious";

					try {
						console.log("Falling back to Invidious API for streaming");
						const streamInfo = await getInvidiousStreams(track.id);
						audioUrl = getInvidiousBestAudio(streamInfo);
						title = streamInfo.title;
						author = streamInfo.author;

						if (!audioUrl) {
							throw new Error("No suitable audio stream found from Invidious");
						}
					} catch (invidiousError) {
						console.error(
							"Both Piped and Invidious streams failed:",
							invidiousError,
						);
						throw new Error("All stream services failed");
					}
				}
			} else if (preferredService === "invidious") {
				// If for some reason Invidious is preferred, try it first
				try {
					console.log("Getting stream with Invidious API (as requested)");
					const streamInfo = await getInvidiousStreams(track.id);
					audioUrl = getInvidiousBestAudio(streamInfo);
					title = streamInfo.title;
					author = streamInfo.author;

					if (!audioUrl) {
						throw new Error("No suitable audio stream found from Invidious");
					}
				} catch (invidiousError) {
					console.warn(
						"Invidious streams failed, falling back to Piped API:",
						invidiousError,
					);
					usedService = "piped";

					try {
						console.log("Falling back to Piped API for streaming");
						const pipedStreamInfo = await getPipedStreams(track.id);
						audioUrl = getPipedBestAudio(pipedStreamInfo);
						title = pipedStreamInfo.title;
						author = pipedStreamInfo.uploader;

						if (!audioUrl) {
							throw new Error("No suitable audio stream found from Piped");
						}
					} catch (pipedError) {
						console.error(
							"Both Invidious and Piped streams failed:",
							pipedError,
						);
						throw new Error("All stream services failed");
					}
				}
			}

			if (!audioUrl) {
				return NextResponse.json(
					{ error: "No suitable audio stream found for this track" },
					{ status: 404 },
				);
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

			return NextResponse.json({
				status: "playing",
				trackId: track.id,
				audioUrl,
				title,
				author,
				service: usedService,
			});
		} catch (error) {
			console.error("Stream error:", error);
			return NextResponse.json(
				{ error: "Failed to get stream information" },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("Play error:", error);
		return NextResponse.json(
			{ error: "Failed to play track" },
			{ status: 500 },
		);
	}
}
