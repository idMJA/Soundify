# Soundify Backend

A modern audio streaming backend built with LavaPlayer to support various audio sources.

## Features

- Play audio from YouTube, SoundCloud, HTTP URLs, and local files
- Queue management for tracks
- Event-based architecture for track playback
- Simple API to control audio playback

## Requirements

- Java 8 or higher
- Gradle for building the project

## Getting Started

1. Clone the repository
2. Build the project:
   ```
   ./gradlew build
   ```
3. Run the application:
   ```
   ./gradlew run
   ```

## Project Structure

- `src/main/java/com/mjba/App.java` - Main application entry point
- `src/main/java/com/mjba/audio/` - Audio player implementation
  - `SoundifyPlayerManager.java` - Manages the LavaPlayer configuration
  - `GuildMusicManager.java` - Manages audio players and track schedulers
  - `TrackScheduler.java` - Handles track queue and playback events

## Usage Example

```java
// Initialize player manager
SoundifyPlayerManager playerManager = new SoundifyPlayerManager();

// Create a music manager instance
GuildMusicManager musicManager = new GuildMusicManager(playerManager.getPlayerManager());

// Load and play a track
playerManager.getPlayerManager().loadItemOrdered(musicManager, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", new AudioLoadResultHandler() {
    @Override
    public void trackLoaded(AudioTrack track) {
        musicManager.scheduler.queue(track);
    }
    
    // Other handler methods...
});
```

## License

MIT

## Credits

- Uses [LavaPlayer](https://github.com/lavalink-devs/lavaplayer) for audio playback 