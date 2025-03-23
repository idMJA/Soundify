package com.mjba.soundify.model;

import java.time.Duration;

/**
 * Model class representing a music track in the Soundify application.
 */
public class Track {
    private String id;
    private String title;
    private String artist;
    private String album;
    private Duration duration;
    private String genre;
    private String coverArtUrl;
    private String audioUrl;

    // Default constructor
    public Track() {
    }

    // Constructor with fields
    public Track(String id, String title, String artist, String album, 
                Duration duration, String genre, String coverArtUrl, String audioUrl) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.genre = genre;
        this.coverArtUrl = coverArtUrl;
        this.audioUrl = audioUrl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getCoverArtUrl() {
        return coverArtUrl;
    }

    public void setCoverArtUrl(String coverArtUrl) {
        this.coverArtUrl = coverArtUrl;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }
} 