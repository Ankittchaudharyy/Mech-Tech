import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const STORAGE_KEY = 'mechtech_ambient_music_preference';
const AUDIO_SRC = '/audio/ambient.mp3';
const DEFAULT_VOLUME = 0.22; // Low, soft ambient volume

export const AudioToggle: React.FC = () => {
  // STRICT REQUIREMENT: Music must be OFF by default and NEVER autoplay.
  // Play soft looping ambient track at low volume ONLY when visitor clicks the button.
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio object once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    // Handle ended or paused events
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    return () => {
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Toggle playback on explicit visitor button click
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      try {
        localStorage.setItem(STORAGE_KEY, 'disabled');
      } catch {
        // Ignore localStorage error if cookies disabled
      }
    } else {
      audio.volume = DEFAULT_VOLUME;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          try {
            localStorage.setItem(STORAGE_KEY, 'enabled');
          } catch {
            // Ignore localStorage error if cookies disabled
          }
        })
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 pointer-events-auto">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute background ambient music' : 'Play soft background ambient music'}
        title={isPlaying ? 'Mute background music' : 'Play soft ambient music'}
        className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-xl transition-all duration-300 cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-gradient-to-br from-[#06234B] to-[#0084D6] text-[#66B821] ring-2 ring-[#66B821]/60 shadow-[0_4px_20px_rgba(102,184,33,0.35)]'
            : 'bg-[#06234B]/90 hover:bg-[#06234B] text-slate-300 hover:text-white border border-white/15 backdrop-blur-md'
        }`}
      >
        {/* Subtle Animated Pulsing Sound Waves Ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-[#66B821]/20 animate-ping pointer-events-none" />
        )}

        {/* Small Speaker Icon */}
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#66B821] transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-transform group-hover:scale-110" />
        )}

        {/* Equalizer Wave Indicator Bars when active */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex items-end gap-0.5 h-3 px-1 py-0.5 bg-[#06234B] rounded-full border border-[#66B821]/40 shadow-sm">
            <span className="w-0.5 bg-[#66B821] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
            <span className="w-0.5 bg-[#66B821] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s] h-3" />
            <span className="w-0.5 bg-[#66B821] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
          </span>
        )}

        {/* Hover Tooltip */}
        <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#06234B] text-white text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-white/10 hidden sm:block">
          {isPlaying ? 'Ambient Music: ON' : 'Ambient Music: OFF (Click to play)'}
        </span>
      </button>
    </div>
  );
};
