package com.mjba.soundify.audio;

import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager;
import com.sedmelluq.discord.lavaplayer.player.DefaultAudioPlayerManager;
import com.sedmelluq.discord.lavaplayer.source.AudioSourceManagers;
import com.sedmelluq.discord.lavaplayer.source.http.HttpAudioSourceManager;
import com.sedmelluq.discord.lavaplayer.source.local.LocalAudioSourceManager;
import com.sedmelluq.discord.lavaplayer.source.soundcloud.SoundCloudAudioSourceManager;
import com.sedmelluq.discord.lavaplayer.source.youtube.YoutubeAudioSourceManager;

/**
 * Manages the audio player resources for Soundify
 */
public class SoundifyPlayerManager {
    private final AudioPlayerManager playerManager;
    private final YoutubeAudioSourceManager youtubeSourceManager;

    public SoundifyPlayerManager() {
        this.playerManager = new DefaultAudioPlayerManager();
        
        // Initialize YouTube source manager with search enabled
        this.youtubeSourceManager = new YoutubeAudioSourceManager(true);
        
        // Configure YouTube source
        configureYouTubeSource();
        
        // Register sources for LavaPlayer
        registerSources();
    }

    /**
     * Configures the YouTube source with any needed settings
     */
    private void configureYouTubeSource() {
        // For the simplified version, we'll just use the default configuration
        // You can add custom configuration here if needed in the future
    }

    /**
     * Registers all the audio sources that Soundify will support
     */
    private void registerSources() {
        // YouTube support with the configured source manager
        playerManager.registerSourceManager(youtubeSourceManager);
        
        // SoundCloud support
        playerManager.registerSourceManager(SoundCloudAudioSourceManager.createDefault());
        
        // HTTP support for direct URLs to audio files
        playerManager.registerSourceManager(new HttpAudioSourceManager());
        
        // Local file support
        playerManager.registerSourceManager(new LocalAudioSourceManager());
        
        // Register local sources only (we're manually registering our remote sources)
        AudioSourceManagers.registerLocalSource(playerManager);
    }

    /**
     * Gets the audio player manager instance
     * 
     * @return The audio player manager
     */
    public AudioPlayerManager getPlayerManager() {
        return playerManager;
    }
    
    /**
     * Gets the YouTube audio source manager instance
     * 
     * @return The YouTube audio source manager
     */
    public YoutubeAudioSourceManager getYoutubeSourceManager() {
        return youtubeSourceManager;
    }
} 