package com.mjba.soundify.audio;

import com.sedmelluq.discord.lavaplayer.player.AudioPlayer;
import com.sedmelluq.discord.lavaplayer.player.event.AudioEventAdapter;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;
import com.sedmelluq.discord.lavaplayer.track.AudioTrackEndReason;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * This class schedules tracks for the audio player. It contains a queue of tracks.
 */
public class TrackScheduler extends AudioEventAdapter {
    private final AudioPlayer player;
    private final BlockingQueue<AudioTrack> queue;

    /**
     * @param player The audio player this scheduler uses
     */
    public TrackScheduler(AudioPlayer player) {
        this.player = player;
        this.queue = new LinkedBlockingQueue<>();
    }

    /**
     * Add the next track to queue or play right away if nothing is in the queue.
     *
     * @param track The track to play or add to queue.
     */
    public void queue(AudioTrack track) {
        // Calling startTrack with the noInterrupt set to true will start the track only if nothing is currently playing. If
        // something is playing, it returns false and does nothing. In that case, we add the track to the queue instead.
        if (!player.startTrack(track, true)) {
            queue.offer(track);
            System.out.println("Track added to queue: " + track.getInfo().title);
        } else {
            System.out.println("Starting playback: " + track.getInfo().title);
        }
    }

    /**
     * Start the next track, stopping the current one if it is playing.
     */
    public void nextTrack() {
        // Start the next track, regardless of if something is already playing or not. In case queue is empty, we are
        // giving null to startTrack, which is a valid argument and will simply stop the player.
        AudioTrack nextTrack = queue.poll();
        if (nextTrack != null) {
            System.out.println("Playing next track: " + nextTrack.getInfo().title);
            player.startTrack(nextTrack, false);
        } else {
            System.out.println("Queue is empty, stopping playback.");
            player.stopTrack();
        }
    }

    @Override
    public void onTrackEnd(AudioPlayer player, AudioTrack track, AudioTrackEndReason endReason) {
        // Only start the next track if the end reason is suitable for it (FINISHED or LOAD_FAILED)
        if (endReason.mayStartNext) {
            nextTrack();
        }
    }
} 