import { NextResponse } from "next/server";

const INVIDIOUS_API = "https://id.420129.xyz";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const region = searchParams.get("region") || "US";

		const response = await fetch(
			`${INVIDIOUS_API}/api/v1/trending?region=${region}`,
		);
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching trending videos:", error);
		return NextResponse.json(
			{ error: "Failed to fetch trending videos" },
			{ status: 500 },
		);
	}
}
