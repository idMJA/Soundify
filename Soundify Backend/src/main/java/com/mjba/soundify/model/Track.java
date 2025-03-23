package com.mjba.soundify.model;

/**
 * Represents a music track in the Soundify application
 */
public class Track {
    private String id;
    private String title;
    private String artist;
    private String thumbnail;
    private long duration;
    private String uri;

    public Track() {
    }

    public Track(String id, String title, String artist, String thumbnail, long duration, String uri) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.thumbnail = thumbnail;
        this.duration = duration;
        this.uri = uri;
    }

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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
} 