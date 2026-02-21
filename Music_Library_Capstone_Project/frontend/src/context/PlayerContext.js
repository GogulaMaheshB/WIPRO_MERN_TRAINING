import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const playNext = () => {
    if (!songs.length) return;

    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === current && songs.length > 1);

      setCurrent(randomIndex);
    } else {
      setCurrent(prev => (prev + 1) % songs.length);
    }

    setPlaying(true);
  };


  const playPrev = () => {
    if (!songs.length) return;

    setCurrent(prev =>
      prev === 0 ? songs.length - 1 : prev - 1
    );

    setPlaying(true);
  };

  
  const handleSongEnd = () => {
    if (!songs.length) return;

    if (repeat) {
      
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      playNext();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        songs,
        setSongs,
        current,
        setCurrent,
        playing,
        setPlaying,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        playNext,
        playPrev,
        handleSongEnd
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
