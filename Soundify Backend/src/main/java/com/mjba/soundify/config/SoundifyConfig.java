package com.mjba.soundify.config;

import com.mjba.soundify.audio.SoundifyPlayerManager;
import com.mjba.soundify.audio.SoundifySearchManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SoundifyConfig {

    @Bean
    public SoundifyPlayerManager soundifyPlayerManager() {
        return new SoundifyPlayerManager();
    }
    
    @Bean
    public SoundifySearchManager soundifySearchManager(SoundifyPlayerManager playerManager) {
        return new SoundifySearchManager(playerManager);
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
} 