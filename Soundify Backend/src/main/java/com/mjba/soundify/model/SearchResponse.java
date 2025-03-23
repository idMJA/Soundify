package com.mjba.soundify.model;

import java.util.List;

/**
 * Response model for search results
 */
public class SearchResponse {
    private List<Track> tracks;
    private String service;
    private String playbackService;
    
    public SearchResponse() {
    }
    
    public SearchResponse(List<Track> tracks, String service, String playbackService) {
        this.tracks = tracks;
        this.service = service;
        this.playbackService = playbackService;
    }
    
    public List<Track> getTracks() {
        return tracks;
    }
    
    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }
    
    public String getService() {
        return service;
    }
    
    public void setService(String service) {
        this.service = service;
    }
    
    public String getPlaybackService() {
        return playbackService;
    }
    
    public void setPlaybackService(String playbackService) {
        this.playbackService = playbackService;
    }
} 