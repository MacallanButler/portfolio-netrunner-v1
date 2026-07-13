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
  
  // Track active synthesized nodes so we can stop them on mute
  const synthNodesRef = useRef<{
    ctx: AudioContext;
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    lfo: OscillatorNode;
    gain: GainNode;
  } | null>(null);

  // Synthesize background ambient cyberpunk drone/music loop
  const startSynthLoop = useCallback(() => {
    if (synthNodesRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();

      // Resume context if suspended (crucial for iOS Safari user gesture unlock)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Main volume node (keep it quiet in background)
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      // Lowpass filter for warm, dark analog synth atmosphere
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);

      // LFO for slow ambient sweep
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // sweep once every 12 seconds
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(100, ctx.currentTime);

      // Two detuned sawtooth oscillators to create a rich chorus drone
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1

      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(55.25, ctx.currentTime); // detuned A1

      // Wire LFO sweep to filter frequency
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Wire signal path: oscillators -> filter -> gain -> speakers
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Start oscillators
      osc1.start();
      osc2.start();
      lfo.start();

      synthNodesRef.current = { ctx, osc1, osc2, lfo, gain };
    } catch (e) {
      console.warn("Failed to initialize synth loop:", e);
    }
  }, []);

  const stopSynthLoop = useCallback(() => {
    if (!synthNodesRef.current) return;
    try {
      synthNodesRef.current.osc1.stop();
      synthNodesRef.current.osc2.stop();
      synthNodesRef.current.lfo.stop();
      synthNodesRef.current.ctx.close();
    } catch (e) {}
    synthNodesRef.current = null;
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => {
      const next = !prev;
      sessionStorage.setItem("audioEnabled", next ? "true" : "false");
      if (next) {
        startSynthLoop();
      } else {
        stopSynthLoop();
      }
      return next;
    });
  }, [startSynthLoop, stopSynthLoop]);

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
