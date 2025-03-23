package com.mjba.soundify;

import com.mjba.soundify.audio.SoundifyPlayerManager;
import com.mjba.soundify.audio.SoundifySearchManager;
import com.mjba.soundify.audio.GuildMusicManager;
import com.mjba.soundify.audio.TrackScheduler;
import com.sedmelluq.discord.lavaplayer.player.AudioLoadResultHandler;
import com.sedmelluq.discord.lavaplayer.player.AudioPlayer;
import com.sedmelluq.discord.lavaplayer.tools.FriendlyException;
import com.sedmelluq.discord.lavaplayer.track.AudioPlaylist;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;
import com.github.topi314.lavasearch.result.AudioSearchResult;
import com.github.topi314.lavasearch.result.TrackSearchResult;

import java.util.List;

/**
 * Soundify Backend Application
 */
public class App {
    public static void main(String[] args) {
        System.out.println("Starting Soundify Backend with LavaPlayer!");
        
        // Initialize the audio player manager
        SoundifyPlayerManager playerManager = new SoundifyPlayerManager();
        
        // Create a guild music manager (in a real application, you'd have multiple of these)
        GuildMusicManager musicManager = new GuildMusicManager(playerManager.getPlayerManager());
        
        // Initialize the search manager
        SoundifySearchManager searchManager = new SoundifySearchManager(playerManager);
        
        // Example: Perform a search
        performSearch(searchManager, "ytmsearch:Never Gonna Give You Up");
        
        // Example: Load and play a track
        loadAndPlay(playerManager, musicManager, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        
        // Keep the application running
        try {
            Thread.sleep(60000); // Run for 1 minute as an example
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Example of performing a search using LavaSearch
     * 
     * @param searchManager The search manager to use
     * @param query The search query
     */
    private static void performSearch(SoundifySearchManager searchManager, String query) {
        System.out.println("Searching for: " + query);
        
        // Only search for tracks
        List<AudioSearchResult.Type> types = List.of(AudioSearchResult.Type.TRACK);
        AudioSearchResult searchResult = searchManager.search(query, types);
        
        if (searchResult != null) {
            // Get the tracks from the search result
            List<TrackSearchResult> tracks = searchResult.getTracks();
            
            System.out.println("Found " + tracks.size() + " tracks:");
            
            // Print the first 5 tracks (or fewer if less than 5 are found)
            int count = Math.min(5, tracks.size());
            for (int i = 0; i < count; i++) {
                TrackSearchResult track = tracks.get(i);
                System.out.println((i + 1) + ". " + track.getInfo().getTitle() + " - " + track.getInfo().getAuthor());
            }
        } else {
            System.out.println("No results found or search failed");
        }
    }
    
    private static void loadAndPlay(SoundifyPlayerManager playerManager, GuildMusicManager musicManager, final String trackUrl) {
        playerManager.getPlayerManager().loadItemOrdered(musicManager, trackUrl, new AudioLoadResultHandler() {
            @Override
            public void trackLoaded(AudioTrack track) {
                System.out.println("Track loaded: " + track.getInfo().title);
                musicManager.scheduler.queue(track);
            }

            @Override
            public void playlistLoaded(AudioPlaylist playlist) {
                AudioTrack firstTrack = playlist.getSelectedTrack();

                if (firstTrack == null) {
                    firstTrack = playlist.getTracks().get(0);
                }

                System.out.println("Adding to queue: " + firstTrack.getInfo().title + " (first track of playlist " + playlist.getName() + ")");
                musicManager.scheduler.queue(firstTrack);
            }

            @Override
            public void noMatches() {
                System.out.println("Nothing found for: " + trackUrl);
            }

            @Override
            public void loadFailed(FriendlyException exception) {
                System.out.println("Could not play: " + exception.getMessage());
            }
        });
    }
}
