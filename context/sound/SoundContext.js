import { Audio } from 'expo-av';
import React, { createContext, useEffect, useState } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [buttonPressSound, setButtonPressSound] = useState(null);
  const [correctAnswerSound, setCorrectAnswerSound] = useState(null);

  useEffect(() => {
    // Load sounds when the provider is mounted
    loadSounds();
    return () => {
      // Unload sounds when the provider is unmounted
      buttonPressSound?.unloadAsync();
      correctAnswerSound?.unloadAsync();
    };
  }, []);

  const loadSounds = async () => {
    const { sound: buttonPress } = await Audio.Sound.createAsync(
      require('../../assets/sounds/button_press.mp3'),
    );
    const { sound: correctAnswer } = await Audio.Sound.createAsync(
      require('../../assets/sounds/correct_answer.mp3'),
    );

    await correctAnswer.setVolumeAsync(0.5);
    await buttonPress.setVolumeAsync(0.5);

    setButtonPressSound(buttonPress);
    setCorrectAnswerSound(correctAnswer);
  };

  const playSound = async (soundType) => {
    if (soundType === 'button_press' && buttonPressSound) {
      await buttonPressSound.replayAsync();
    } else if (soundType === 'correct_answer' && correctAnswerSound) {
      await correctAnswerSound.replayAsync();
    }
  };

  return <SoundContext.Provider value={{ playSound }}>{children}</SoundContext.Provider>;
};

export const useSound = () => {
  return React.useContext(SoundContext);
};
