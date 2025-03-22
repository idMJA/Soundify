import { type NextRequest, NextResponse } from "next/server";

declare global {
	/* eslint-disable no-var */
	var currentAudioPlayer: HTMLAudioElement | null;
	var currentTrackId: string | null;
	var currentVolume: number;
	/* eslint-enable no-var */
}

// Initialize volume if needed
if (typeof global.currentVolume === "undefined") {
	global.currentVolume = 75; // Default volume
}

export async function POST(request: NextRequest) {
	try {
		const { volume } = await request.json();

		if (typeof volume !== "number" || volume < 0 || volume > 100) {
			return NextResponse.json(
				{ error: "Volume must be a number between 0 and 100" },
				{ status: 400 },
			);
		}

		// Store the current volume level
		global.currentVolume = volume;

		// In a real implementation, the actual volume change would happen client-side
		// The actual audio player's volume would be set to volume/100

		return NextResponse.json({
			status: "volume_changed",
			volume,
			trackId: global.currentTrackId,
		});
	} catch (error) {
		console.error("Volume change error:", error);
		return NextResponse.json(
			{ error: "Failed to change volume" },
			{ status: 500 },
		);
	}
}
