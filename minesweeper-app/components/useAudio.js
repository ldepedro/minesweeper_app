// components/useAudio.js
import { useRef } from "react";

export default function useAudio() {
  const bgAudio = useRef(null);
  const endAudio = useRef(null);

  // Play background music
  const playBackground = () => {
    if (!bgAudio.current) {
      bgAudio.current = new Audio("/sounds/background.mp3");
      bgAudio.current.loop = true;
      bgAudio.current.volume = 0.4;
    }
    bgAudio.current.play().catch(() => {}); // ignore autoplay errors
  };

  // Stop background music
  const stopBackground = () => {
    if (bgAudio.current) {
      bgAudio.current.pause();
      bgAudio.current.currentTime = 0;
    }
  };

  // Play win or lose sound
  const playEnd = (type) => {
    stopBackground();

    if (!endAudio.current) {
      endAudio.current = new Audio();
      endAudio.current.loop = false;
      endAudio.current.volume = 0.5;
    }

    endAudio.current.pause();
    endAudio.current.currentTime = 0;

    if (type === "win") {
      endAudio.current.src = "/sounds/win.mp3";
    } else if (type === "lose") {
      endAudio.current.src = "/sounds/lose.mp3";
    }

    endAudio.current.play().catch(() => {});
  };

  return { playBackground, stopBackground, playEnd };
}
