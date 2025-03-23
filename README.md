# Soundify

Soundify is a music streaming application with a Spring Boot backend and Next.js frontend.

## Project Structure

This project consists of two main components:

1. **Soundify Backend** - A Java Spring Boot application that uses LavaPlayer for audio processing
2. **Soundify Frontend** - A Next.js web application with React components

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- npm or bun

### Setting Up and Running the Backend

1. Navigate to the backend directory:

```bash
cd "Soundify Backend"
```

2. Build the application:

```bash
./gradlew build
```

3. Run the application:

```bash
./gradlew bootRun
```

The backend API will be available at `http://localhost:8080/api`.

### Setting Up and Running the Frontend

1. Navigate to the frontend directory:

```bash
cd "Soundify Frontend"
```

2. Install dependencies:

```bash
# Using npm
npm install

# Or using bun
bun install
```

3. Create a `.env.local` file with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. Run the development server:

```bash
# Using npm
npm run dev

# Or using bun
bun dev
```

The frontend will be available at `http://localhost:3000`.

## Testing the Integration

1. Start both the backend and frontend applications
2. Open your browser and navigate to `http://localhost:3000/test`
3. Use the search functionality to find tracks
4. Click on a track to play it through the Soundify backend

## API Endpoints

### Search API

- **GET** `/api/search?query={searchQuery}`
  - Search for tracks with the given query
  - Returns track information including title, artist, and metadata

### Player API

- **POST** `/api/player/play?uri={trackUri}`
  - Play a track with the given URI
- **POST** `/api/player/pause`
  - Pause the currently playing track
- **POST** `/api/player/resume`
  - Resume playback of a paused track
- **POST** `/api/player/skip`
  - Skip to the next track in the queue
- **POST** `/api/player/volume?volume={volumeLevel}`
  - Set the player volume (0-100)
- **GET** `/api/player/status`
  - Get the current player status including track info and playback state

## Troubleshooting

- **Backend Connection Issues**: Make sure the Spring Boot backend is running on port 8080
- **Frontend API Calls Failing**: Check that the `.env.local` file is set up correctly
- **Audio Playback Issues**: Ensure your browser supports the audio formats being played

## License

This project is licensed under the MIT License - see the LICENSE file for details. 