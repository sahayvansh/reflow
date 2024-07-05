import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { ImVolumeMedium } from 'react-icons/im';

const AudioPlayer: React.FC = () => {
  const playlist = ['/music/track1.mp3', '/music/track2.mp3', '/music/track3.mp3'];
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);

  const handleToggle = () => setPlaying(!playing);
  
  const handleNext = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prevTrack) => (prevTrack - 1 + playlist.length) % playlist.length);
  };

  const handleEnd = () => {
    handleNext();
  };

  const currentFileName = playlist[currentTrack].split('/').pop() || 'No track';

  return (
    <div className="bg-accent text-slate-600 font-mono rounded-lg flex flex-col gap-2 p-3 max-w-[250px] flex-shrink-0">
      <ReactHowler
        src={playlist[currentTrack]}
        playing={playing}
        onEnd={handleEnd}
        volume={volume}
      />
      <div className="text-center text-sm">
        <p>Now Playing:</p>
        <p className="truncate">{currentFileName}</p>
      </div>
      <div className="flex justify-center text-xl gap-3">
        <button onClick={handlePrevious}>
          <FaBackward />
        </button>
        <button onClick={handleToggle}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext}>
          <FaForward />
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <ImVolumeMedium className="text-sm" />
        <input
          type="range"
          min="0"
          max="1"
          step=".05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;