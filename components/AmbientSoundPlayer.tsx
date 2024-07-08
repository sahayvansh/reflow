import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Play, Pause, Power, PowerOff } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";

interface Sound {
  id: string;
  name: string;
  file: string;
}

const sounds: Sound[] = [
  { id: 'rain', name: 'Rain', file: '/music/rain.mp3' },
  { id: 'chatting', name: 'Café Chatter', file: '/music/chatting.mp3' },
  { id: 'coffee', name: 'Coffee Machine', file: '/music/coffee-machine.mp3' },
];

const AmbientSoundPlayer: React.FC = () => {
  const [playingSounds, setPlayingSounds] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAnyPlaying, setIsAnyPlaying] = useState<boolean>(false);

  useEffect(() => {
    const initialPlayingState: Record<string, boolean> = {};
    const initialVolumes: Record<string, number> = {};
    sounds.forEach(sound => {
      initialPlayingState[sound.id] = false;
      initialVolumes[sound.id] = 0.5;
    });
    setPlayingSounds(initialPlayingState);
    setVolumes(initialVolumes);
  }, []);

  useEffect(() => {
    setIsAnyPlaying(Object.values(playingSounds).some(isPlaying => isPlaying));
  }, [playingSounds]);

  const toggleSound = (soundId: string) => {
    setPlayingSounds(prev => ({
      ...prev,
      [soundId]: !prev[soundId]
    }));
  };

  const handleVolumeChange = (soundId: string, newVolume: number[]) => {
    setVolumes(prev => ({
      ...prev,
      [soundId]: newVolume[0]
    }));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleAllSounds = () => {
    const newState = !isAnyPlaying;
    const updatedPlayingSounds = { ...playingSounds };
    Object.keys(updatedPlayingSounds).forEach(key => {
      updatedPlayingSounds[key] = newState;
    });
    setPlayingSounds(updatedPlayingSounds);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-[#e7d4b5] p-6 rounded-lg shadow-lg">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Ambient Café</h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleAllSounds}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary-dark text-white"
            >
              {isAnyPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button
              onClick={toggleMute}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {sounds.map((sound: Sound) => (
            <div key={sound.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSound(sound.id)}
                    className={`w-8 h-8 rounded-full ${
                      playingSounds[sound.id] ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {playingSounds[sound.id] ? <Power size={16} /> : <PowerOff size={16} />}
                  </Button>
                </motion.div>
                <span className="text-sm font-medium text-slate-700">{sound.name}</span>
              </div>
              <div className="flex items-center space-x-2 w-1/2">
                <Slider
                  value={[volumes[sound.id] || 0]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => handleVolumeChange(sound.id, value)}
                  disabled={!playingSounds[sound.id]}
                  className="w-full"
                />
              </div>
              <ReactHowler
                src={sound.file}
                playing={playingSounds[sound.id] && !isMuted}
                loop={true}
                volume={volumes[sound.id] || 0}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbientSoundPlayer;