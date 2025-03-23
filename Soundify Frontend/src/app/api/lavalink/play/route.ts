import { type NextRequest, NextResponse } from 'next/server';
import { lavalinkManager } from '../../../lib/lavalink';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, volume = 100 } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Get or create a session ID for this user
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      sessionId = uuidv4();
      // In a production app, you would set this cookie properly
      // with an appropriate expiration and security settings
    }

    // Play the track via Lavalink
    const { track, player } = await lavalinkManager.play(sessionId, query, {
      volume: Number(volume),
      noReplace: false,
    });

    return NextResponse.json({
      status: 'playing',
      sessionId,
      trackInfo: {
        title: track.info.title,
        author: track.info.author,
        length: track.info.length,
        identifier: track.info.identifier,
        isStream: track.info.isStream,
        uri: track.info.uri,
        artworkUrl: track.info.artworkUrl,
      },
    }, {
      headers: {
        'Set-Cookie': `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Strict`
      }
    });
  } catch (error) {
    console.error('Lavalink play error:', error);
    return NextResponse.json(
      { error: 'Failed to play track' },
      { status: 500 }
    );
  }
} 