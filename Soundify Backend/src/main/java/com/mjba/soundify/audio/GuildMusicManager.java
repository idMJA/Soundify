package com.mjba.soundify.audio;

import com.sedmelluq.discord.lavaplayer.player.AudioPlayer;
import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager;

/**
 * Manages audio players for a specific "guild" or instance.
 * In a real-world scenario, you might have multiple audio players for different channels or users.
 */
public class GuildMusicManager {
    /**
     * Audio player for the guild.
     */
    public final AudioPlayer player;
    
    /**
     * Track scheduler for the player.
     */
    public final TrackScheduler scheduler;

    /**
     * Creates a player and a track scheduler.
     * @param manager Audio player manager to use for creating the player.
     */
    public GuildMusicManager(AudioPlayerManager manager) {
        player = manager.createPlayer();
        scheduler = new TrackScheduler(player);
        player.addListener(scheduler);
    }
} 