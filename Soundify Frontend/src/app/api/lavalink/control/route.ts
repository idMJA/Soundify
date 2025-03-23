import { type NextRequest, NextResponse } from 'next/server';
import { lavalinkManager } from '../../../lib/lavalink';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, volume } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    // Get session ID from cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'No active session found' },
        { status: 400 }
      );
    }

    let result = false;

    // Perform the requested action
    switch (action) {
      case 'pause':
        result = lavalinkManager.pause(sessionId, true);
        break;
      case 'resume':
        result = lavalinkManager.pause(sessionId, false);
        break;
      case 'stop':
        result = lavalinkManager.stop(sessionId);
        break;
      case 'volume':
        if (typeof volume !== 'number' || volume < 0 || volume > 1000) {
          return NextResponse.json(
            { error: 'Volume must be a number between 0 and 1000' },
            { status: 400 }
          );
        }
        result = lavalinkManager.setVolume(sessionId, volume);
        break;
      case 'destroy':
        result = lavalinkManager.destroyPlayer(sessionId);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: 'No player found for this session' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      action,
      sessionId,
    });
  } catch (error) {
    console.error('Lavalink control error:', error);
    return NextResponse.json(
      { error: 'Failed to control playback' },
      { status: 500 }
    );
  }
} 