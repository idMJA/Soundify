import { NextResponse } from "next/server";

// Define a type for queue tracks
interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
}

declare global {
  var currentAudioPlayer: HTMLAudioElement | null;
  var currentTrackId: string | null;
  var currentQueue: Track[];
}

// Initialize queue if needed
if (typeof global.currentQueue === 'undefined') {
  global.currentQueue = [];
}

export async function POST() {
  try {
    if (!global.currentTrackId || !global.currentQueue || global.currentQueue.length === 0) {
      return NextResponse.json(
        { error: "No active track or empty queue" }, 
        { status: 400 }
      );
    }
    
    // Find the current track in the queue
    const currentIndex = global.currentQueue.findIndex(track => track.id === global.currentTrackId);
    
    // If there's a next track, make it the current track
    if (currentIndex !== -1 && currentIndex < global.currentQueue.length - 1) {
      const nextTrack = global.currentQueue[currentIndex + 1];
      global.currentTrackId = nextTrack.id;
      
      return NextResponse.json({ 
        status: "skipped",
        nextTrack
      });
    }
    
    // If we're at the end of the queue, clear the current track
    global.currentTrackId = null;
    
    return NextResponse.json({ 
      status: "skipped",
      endOfQueue: true
    });
  } catch (error) {
    console.error("Skip error:", error);
    return NextResponse.json(
      { error: "Failed to skip track" }, 
      { status: 500 }
    );
  }
} 