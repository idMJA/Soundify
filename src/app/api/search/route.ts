import { type NextRequest, NextResponse } from "next/server";
import { searchVideos as searchInvidiousVideos } from "../invidious/route";
import { searchVideos as searchPipedVideos } from "../piped/route";

// Our local interface to simplify track handling
interface FormattedTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
  uri: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    
    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" }, 
        { status: 400 }
      );
    }
    
    try {
      let tracks: FormattedTrack[] = [];
      let usedService = "invidious";
      
      try {
        // First try Invidious API
        console.log("Trying to search with Invidious API");
        const searchResults = await searchInvidiousVideos(query);
        
        if (searchResults && Array.isArray(searchResults) && searchResults.length > 0) {
          // Format the Invidious results
          tracks = searchResults.map(video => {
            // Get the best thumbnail
            const thumbnail = video.videoThumbnails.find(t => t.quality === 'medium')?.url || 
                              video.videoThumbnails[0]?.url || 
                              `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
                              
            return {
              id: video.videoId,
              title: video.title || 'Unknown Title',
              artist: video.author || 'Unknown Artist',
              thumbnail,
              duration: video.lengthSeconds || 0,
              uri: `https://www.youtube.com/watch?v=${video.videoId}`
            };
          });
        }
      } catch (invidiousError) {
        console.warn("Invidious search failed, falling back to Piped API:", invidiousError);
        
        // If Invidious fails, try Piped API
        try {
          console.log("Trying to search with Piped API");
          const pipedResults = await searchPipedVideos(query);
          
          if (pipedResults && Array.isArray(pipedResults) && pipedResults.length > 0) {
            usedService = "piped";
            
            // Format the Piped results
            tracks = pipedResults.map(video => {
              // Extract the video ID from the URL
              // URL format: /watch?v=VIDEO_ID
              const videoId = new URL(video.url, "https://youtube.com").searchParams.get("v") || "";
              
              return {
                id: videoId,
                title: video.title || 'Unknown Title',
                artist: video.uploaderName || 'Unknown Artist',
                thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                duration: video.duration || 0,
                uri: `https://www.youtube.com/watch?v=${videoId}`
              };
            });
          }
        } catch (pipedError) {
          console.error("Both Invidious and Piped search failed:", pipedError);
          throw new Error("All search services failed");
        }
      }
      
      return NextResponse.json({ 
        tracks,
        service: usedService 
      });
    } catch (error) {
      console.error("Search method error:", error);
      console.error("Error details:", error instanceof Error ? error.stack : String(error));
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      return NextResponse.json(
        { error: `Search failed: ${errorMessage}` }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Search error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to search tracks: ${errorMessage}` }, 
      { status: 500 }
    );
  }
} 