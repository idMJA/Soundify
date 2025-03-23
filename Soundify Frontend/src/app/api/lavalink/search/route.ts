import { type NextRequest, NextResponse } from 'next/server';
import { lavalinkManager } from '../../../lib/lavalink';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Search for tracks via Lavalink
    const results = await lavalinkManager.search(query);

    return NextResponse.json({
      status: 'success',
      tracks: results.tracks,
      playlistInfo: results.playlistInfo,
      loadType: results.loadType,
    });
  } catch (error) {
    console.error('Lavalink search error:', error);
    return NextResponse.json(
      { error: 'Failed to search for tracks' },
      { status: 500 }
    );
  }
} 