import { NextResponse } from "next/server";

// Environment variables for Spotify credentials
// Add these to your .env.local file
const CLIENT_ID =
	process.env.SPOTIFY_CLIENT_ID || "0bdba0a53936422c95cb4b5663836ce8";
const CLIENT_SECRET =
	process.env.SPOTIFY_CLIENT_SECRET || "db4f127c6e4e429d906f2256b8de9cce";

export async function GET(request: Request) {
	try {
		console.log("Spotify token request started");

		// URL for Spotify token endpoint
		const url = "https://accounts.spotify.com/api/token";

		// Create Base64 encoded Authorization string
		const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
		const base64Auth = Buffer.from(authString).toString("base64");

		// Headers for the request
		const headers = {
			Authorization: `Basic ${base64Auth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		};

		// Body data for the request
		const body = new URLSearchParams({
			grant_type: "client_credentials",
			// Client credentials flow doesn't support scopes
		}).toString();

		console.log("Requesting Spotify token...");

		// Make the POST request to Spotify
		const tokenResponse = await fetch(url, {
			method: "POST",
			headers: headers,
			body: body,
		});

		if (!tokenResponse.ok) {
			const errorText = await tokenResponse.text();
			console.error("Failed to fetch token:", errorText);
			return NextResponse.json(
				{
					error: `Failed to fetch Spotify token: ${tokenResponse.status}`,
					details: errorText,
				},
				{ status: tokenResponse.status },
			);
		}

		// Parse the response
		const tokenData = await tokenResponse.json();
		console.log("Token received successfully", tokenData);

		// Return the access token and expiration
		return NextResponse.json({
			accessToken: tokenData.access_token,
			expiresIn: tokenData.expires_in || 3600,
			tokenType: tokenData.token_type,
		});
	} catch (error) {
		console.error("Error getting Spotify token:", error);
		return NextResponse.json(
			{
				error: "Internal Server Error",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
