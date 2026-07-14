"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface AudioContextValue {
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  playClick: () => void;
  playChime: () => void;
  playKeypress: () => void;
  playGlitch: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize standard HTML5 Audio element for maximum cross-device compatibility
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/audio/cyberpunk_theme.mp3");
      audio.loop = true;
      audio.volume = 0.20; // Soft volume for background ambience
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => {
      const next = !prev;
      sessionStorage.setItem("audioEnabled", next ? "true" : "false");
      
      if (audioRef.current) {
        if (next) {
          // Play synchronously inside the user click thread to satisfy iOS/Safari user gesture policies
          audioRef.current.play().catch((err) => {
            console.warn("Audio playback failed (check if silent switch is on or file exists):", err);
          });
        } else {
          audioRef.current.pause();
        }
      }
      return next;
    });
  }, []);

  // Globally mute transient sound effects (clicks, glitches, typing) to avoid client annoyance
  const playClick = useCallback(() => {}, []);
  const playChime = useCallback(() => {}, []);
  const playKeypress = useCallback(() => {}, []);
  const playGlitch = useCallback(() => {}, []);

  return (
    <AudioContext.Provider value={{
      isAudioEnabled,
      toggleAudio,
      playClick,
      playChime,
      playKeypress,
      playGlitch
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
