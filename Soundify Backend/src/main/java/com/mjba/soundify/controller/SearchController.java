package com.mjba.soundify.controller;

import com.mjba.soundify.audio.SoundifySearchManager;
import com.mjba.soundify.dto.TrackDTO;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;
import com.sedmelluq.discord.lavaplayer.track.AudioTrackInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    private final SoundifySearchManager searchManager;

    @Autowired
    public SearchController(SoundifySearchManager searchManager) {
        this.searchManager = searchManager;
    }

    @GetMapping
    public ResponseEntity<List<TrackDTO>> search(@RequestParam("query") String query) {
        List<AudioTrack> tracks = searchManager.searchTracks(query);
        
        List<TrackDTO> trackDTOs = tracks.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
            
        return ResponseEntity.ok(trackDTOs);
    }
    
    private TrackDTO convertToDTO(AudioTrack track) {
        AudioTrackInfo info = track.getInfo();
        
        return TrackDTO.builder()
            .identifier(info.identifier)
            .title(info.title)
            .author(info.author)
            .length(info.length)
            .uri(info.uri)
            .isStream(info.isStream)
            .build();
    }
} 