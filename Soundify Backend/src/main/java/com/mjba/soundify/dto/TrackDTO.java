package com.mjba.soundify.dto;

import lombok.Builder;
import lombok.Data;

/**
 * Data Transfer Object for track information
 */
@Data
@Builder
public class TrackDTO {
    private String identifier;
    private String title;
    private String author;
    private long length;
    private String uri;
    private boolean isStream;
    
    // Optional fields for enhanced UI display
    @Builder.Default
    private String artworkUrl = null;
} 