package com.mjba.soundify.controller;

import com.mjba.soundify.audio.GuildMusicManager;
import com.mjba.soundify.audio.SoundifyPlayerManager;
import com.sedmelluq.discord.lavaplayer.player.AudioLoadResultHandler;
import com.sedmelluq.discord.lavaplayer.tools.FriendlyException;
import com.sedmelluq.discord.lavaplayer.track.AudioPlaylist;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/player")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final SoundifyPlayerManager playerManager;
    private final GuildMusicManager musicManager;
    
    @Autowired
    public PlayerController(SoundifyPlayerManager playerManager) {
        this.playerManager = playerManager;
        // Create a single music manager for simplicity - in a real app with multiple users
        // you would have a manager per user/session
        this.musicManager = new GuildMusicManager(playerManager.getPlayerManager());
    }
    
    @PostMapping("/play")
    public ResponseEntity<Map<String, Object>> playTrack(@RequestParam String uri) {
        CompletableFuture<Map<String, Object>> future = new CompletableFuture<>();
        
        playerManager.getPlayerManager().loadItemOrdered(musicManager, uri, new AudioLoadResultHandler() {
            @Override
            public void trackLoaded(AudioTrack track) {
                musicManager.scheduler.queue(track);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("track", track.getInfo().title);
                response.put("author", track.getInfo().author);
                response.put("duration", track.getDuration());
                
                future.complete(response);
            }

            @Override
            public void playlistLoaded(AudioPlaylist playlist) {
                AudioTrack firstTrack = playlist.getSelectedTrack();
                if (firstTrack == null) {
                    firstTrack = playlist.getTracks().get(0);
                }
                
                musicManager.scheduler.queue(firstTrack);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("track", firstTrack.getInfo().title);
                response.put("author", firstTrack.getInfo().author);
                response.put("duration", firstTrack.getDuration());
                response.put("playlist", playlist.getName());
                response.put("trackCount", playlist.getTracks().size());
                
                future.complete(response);
            }

            @Override
            public void noMatches() {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("error", "No matches found for: " + uri);
                
                future.complete(response);
            }

            @Override
            public void loadFailed(FriendlyException exception) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("error", "Failed to load: " + exception.getMessage());
                
                future.complete(response);
            }
        });
        
        try {
            return ResponseEntity.ok(future.get());
        } catch (InterruptedException | ExecutionException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Error processing request: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    
    @PostMapping("/pause")
    public ResponseEntity<Map<String, Object>> pauseTrack() {
        musicManager.player.setPaused(true);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("status", "paused");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/resume")
    public ResponseEntity<Map<String, Object>> resumeTrack() {
        musicManager.player.setPaused(false);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("status", "playing");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/skip")
    public ResponseEntity<Map<String, Object>> skipTrack() {
        musicManager.scheduler.nextTrack();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("action", "skipped");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/volume")
    public ResponseEntity<Map<String, Object>> setVolume(@RequestParam int volume) {
        // Clamp volume between 0 and 100
        int clampedVolume = Math.max(0, Math.min(100, volume));
        musicManager.player.setVolume(clampedVolume);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("volume", clampedVolume);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> response = new HashMap<>();
        
        AudioTrack playingTrack = musicManager.player.getPlayingTrack();
        boolean isPaused = musicManager.player.isPaused();
        int volume = musicManager.player.getVolume();
        
        response.put("isPlaying", playingTrack != null);
        response.put("isPaused", isPaused);
        response.put("volume", volume);
        
        if (playingTrack != null) {
            response.put("track", playingTrack.getInfo().title);
            response.put("author", playingTrack.getInfo().author);
            response.put("duration", playingTrack.getDuration());
            response.put("position", playingTrack.getPosition());
        }
        
        return ResponseEntity.ok(response);
    }
} 