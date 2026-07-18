import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, ChevronUp, ChevronDown, Minimize2, Maximize2, Music } from 'lucide-react';
import { Song, Album } from '../types';

interface AudioPlayerProps {
  currentSong: Song | null;
  currentAlbum: Album | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function AudioPlayer({
  currentSong,
  currentAlbum,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious
}: AudioPlayerProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio lifecycle sync
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked by browser policy:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // When song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.previewUrl;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  // Volume sync
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekValue = parseFloat(e.target.value);
    audioRef.current.currentTime = seekValue;
    setCurrentTime(seekValue);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong || !currentAlbum) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-earth-moss/95 border-t border-earth-moss-light/80 backdrop-blur-xl transition-all duration-300 ${
      isMinimized ? 'h-14 overflow-hidden' : 'h-auto py-3 md:py-4'
    }`} id="floating-audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Track Information */}
        <div className="flex items-center space-x-3 w-full md:w-1/4 min-w-0 justify-between md:justify-start">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={currentAlbum.coverUrl}
              alt={currentAlbum.title}
              className={`h-10 w-10 md:h-12 md:w-12 rounded border border-earth-moss-light/50 flex-shrink-0 object-cover ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="font-serif text-sm font-semibold text-earth-linen truncate">{currentSong.title}</p>
              <p className="font-sans text-[11px] text-earth-gold truncate tracking-wider uppercase">{currentAlbum.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-earth-terracotta text-earth-linen hover:bg-earth-terracotta-light"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-earth-linen-dark hover:text-earth-linen"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Center: Playback Controls and Track Progress */}
        <div className={`flex-1 flex flex-col items-center gap-1.5 w-full md:w-1/2 ${isMinimized ? 'hidden md:flex' : ''}`}>
          <div className="flex items-center space-x-5">
            <button
              onClick={onPrevious}
              className="p-1 text-earth-linen-dark hover:text-earth-linen transition-colors"
              title="Previous Track"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen transition-all duration-200 transform hover:scale-105 shadow-md shadow-earth-moss-dark"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current pl-0.5" />}
            </button>
            <button
              onClick={onNext}
              className="p-1 text-earth-linen-dark hover:text-earth-linen transition-colors"
              title="Next Track"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Slider */}
          <div className="w-full flex items-center space-x-3 text-[10px] font-mono text-earth-linen-dark px-2 md:px-0">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-earth-moss-light rounded-lg appearance-none cursor-pointer accent-earth-terracotta focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Sound Adjustments and Lyrics Trigger */}
        <div className={`w-full md:w-1/4 flex items-center justify-end space-x-4 ${isMinimized ? 'hidden md:flex' : 'flex'}`}>
          {currentSong.lyrics && (
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-1.5 rounded transition-all text-xs flex items-center space-x-1 ${
                showLyrics
                  ? 'bg-earth-terracotta text-earth-linen'
                  : 'text-earth-linen-dark hover:text-earth-linen hover:bg-earth-moss-light'
              }`}
              title="Show Lyrics"
            >
              <ListMusic className="h-4 w-4" />
              <span className="hidden lg:inline text-[11px] font-mono uppercase tracking-wider">Lyrics</span>
            </button>
          )}

          {/* Volume Control */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 text-earth-linen-dark hover:text-earth-linen transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-earth-terracotta" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 bg-earth-moss-light rounded-lg appearance-none cursor-pointer accent-earth-gold"
            />
          </div>

          {/* Min/Max Controls */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hidden md:block p-1 text-earth-linen-dark hover:text-earth-linen"
            title={isMinimized ? "Expand Player" : "Minimize Player"}
          >
            {isMinimized ? <Maximize2 className="h-4.5 w-4.5" /> : <Minimize2 className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Lyrics Panel Overlay */}
      {showLyrics && !isMinimized && currentSong.lyrics && (
        <div className="bg-earth-moss-dark/95 border-t border-earth-moss-light py-6 px-4 max-h-[250px] overflow-y-auto animate-fade-in">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-earth-moss-light/30">
              <span className="font-serif text-sm font-semibold text-earth-gold uppercase tracking-widest">{currentSong.title} Lyrics</span>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-earth-linen-dark hover:text-earth-linen font-mono text-xs"
              >
                CLOSE
              </button>
            </div>
            <p className="font-serif italic text-sm md:text-base text-earth-linen-light leading-relaxed whitespace-pre-line leading-7">
              {currentSong.lyrics}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
