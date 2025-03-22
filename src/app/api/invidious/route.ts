import { NextResponse } from "next/server";

// Define interfaces for Invidious API responses
interface InvidiousVideo {
  videoId: string;
  title: string;
  author: string;
  authorId: string;
  lengthSeconds: number;
  videoThumbnails: Array<{
    quality: string;
    url: string;
    width: number;
    height: number;
  }>;
}

interface InvidiousSearchResult {
  videos?: InvidiousVideo[];
}

// Define interfaces for stream formats
interface InvidiousFormat {
  url: string;
  itag: number;
  type: string;
  quality: string;
  audioQuality?: string;
  container: string;
  encoding: string;
  bitrate: number;
}

interface InvidiousStreamInfo {
  title: string;
  videoId: string;
  author: string;
  adaptiveFormats: InvidiousFormat[];
  formatStreams: InvidiousFormat[];
}

// You can configure a list of Invidious instances to use
// If one fails, the system will try another
const INVIDIOUS_INSTANCES = [
  "https://id.420129.xyz",
];

// Function to search for videos
export async function searchVideos(query: string): Promise<InvidiousVideo[]> {
  let lastError: Error | null = null;
  
  // Try each instance until one works
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      console.log(`Searching using Invidious instance: ${instance}`);
      const response = await fetch(`${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`, {
        cache: 'no-store',
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        console.warn(`Instance ${instance} returned status: ${response.status}`);
        lastError = new Error(`Instance ${instance} returned status: ${response.status}`);
        continue; // Try the next instance
      }
      
      const data = await response.json() as InvidiousVideo[];
      return data;
    } catch (error) {
      console.warn(`Search with instance ${instance} failed:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      // Continue to next instance
    }
  }
  
  // If we reach here, all instances failed
  console.error("All Invidious instances failed for search");
  throw lastError || new Error("All Invidious instances failed");
}

// Function to get streaming URLs for a video
export async function getVideoStreams(videoId: string): Promise<InvidiousStreamInfo> {
  let lastError: Error | null = null;
  
  // Try each instance until one works
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      console.log(`Getting video stream from Invidious instance: ${instance}`);
      const response = await fetch(`${instance}/api/v1/videos/${videoId}`, {
        cache: 'no-store',
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        console.warn(`Instance ${instance} returned status: ${response.status}`);
        lastError = new Error(`Instance ${instance} returned status: ${response.status}`);
        continue; // Try the next instance
      }
      
      const data = await response.json() as InvidiousStreamInfo;
      return data;
    } catch (error) {
      console.warn(`Get video stream with instance ${instance} failed:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      // Continue to next instance
    }
  }
  
  // If we reach here, all instances failed
  console.error("All Invidious instances failed for video streams");
  throw lastError || new Error("All Invidious instances failed");
}

// Function to get the best audio stream URL
export function getBestAudioStream(streamInfo: InvidiousStreamInfo): string | null {
  // First try to get an audio-only stream from adaptive formats
  const audioStreams = streamInfo.adaptiveFormats.filter(format => 
    format.type.startsWith('audio/') || format.audioQuality
  );
  
  // Sort by bitrate (highest first)
  const sortedStreams = [...audioStreams].sort((a, b) => b.bitrate - a.bitrate);
  
  // Return the URL of the highest quality audio stream, or null if none found
  return sortedStreams.length > 0 ? sortedStreams[0].url : null;
}

// Check if our service is available (for health check)
export async function GET() {
  // Try each instance until one works
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      console.log(`Checking health of Invidious instance: ${instance}`);
      const response = await fetch(`${instance}/api/v1/stats`, {
        cache: 'no-store',
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      
      if (!response.ok) {
        console.warn(`Instance ${instance} health check failed with status: ${response.status}`);
        continue; // Try the next instance
      }
      
      const stats = await response.json();
      return NextResponse.json({ 
        status: "ok",
        instance,
        stats: {
          version: stats.version,
          software: stats.software
        }
      });
    } catch (error) {
      console.warn(`Health check for instance ${instance} failed:`, error);
      // Continue to next instance
    }
  }
  
  // If we reach here, all instances failed
  console.error("All Invidious instances failed health check");
  return NextResponse.json(
    { error: "All Invidious API instances are not responding" }, 
    { status: 503 }
  );
} 