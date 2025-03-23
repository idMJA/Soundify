package com.mjba.soundify.audio;

import com.sedmelluq.discord.lavaplayer.player.AudioLoadResultHandler;
import com.sedmelluq.discord.lavaplayer.tools.FriendlyException;
import com.sedmelluq.discord.lavaplayer.track.AudioPlaylist;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * Manages music search functionality for Soundify
 */
public class SoundifySearchManager {
    private final SoundifyPlayerManager playerManager;

    /**
     * Creates a new instance of the search manager
     * @param playerManager The player manager containing audio sources 
     */
    public SoundifySearchManager(SoundifyPlayerManager playerManager) {
        this.playerManager = playerManager;
    }

    /**
     * Searches for tracks using the given query
     * 
     * @param query The search query (e.g. "ytsearch:song name")
     * @return List of AudioTracks matching the query
     */
    public List<AudioTrack> searchTracks(String query) {
        // Ensure the query has a search prefix
        if (!query.startsWith("ytsearch:") && !query.contains("ytmsearch:")) {
            query = "ytsearch:" + query;
        }
        
        CompletableFuture<List<AudioTrack>> future = new CompletableFuture<>();
        
        playerManager.getPlayerManager().loadItem(query, new AudioLoadResultHandler() {
            @Override
            public void trackLoaded(AudioTrack track) {
                future.complete(Collections.singletonList(track));
            }

            @Override
            public void playlistLoaded(AudioPlaylist playlist) {
                future.complete(playlist.getTracks());
            }

            @Override
            public void noMatches() {
                future.complete(Collections.emptyList());
            }

            @Override
            public void loadFailed(FriendlyException exception) {
                exception.printStackTrace();
                future.complete(Collections.emptyList());
            }
        });
        
        try {
            return future.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
} 