import { Audio } from 'expo-av';
import React, { createContext, useEffect, useState } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [buttonPressSound, setButtonPressSound] = useState(null);
  const [correctAnswerSound, setCorrectAnswerSound] = useState(null);
  const [soloCorrectSound, setSoloCorrectSound] = useState(null);
  const [keyboardPressSound, setKeyboardPressSound] = useState(null);
  const [soloFailSound, setSoloFailSound] = useState(null);

  useEffect(() => {
    loadSounds();
    return () => {
      // Unload sounds when the provider is unmounted
      buttonPressSound?.unloadAsync();
      correctAnswerSound?.unloadAsync();
      keyboardPressSound?.unloadAsync();
      soloCorrectSound?.unloadAsync();
    };
  }, []);

  const loadSounds = async () => {
    try {
      const { sound: buttonPress } = await Audio.Sound.createAsync(
        require('../../assets/sounds/button_press.mp3'),
      );
      const { sound: correctAnswer } = await Audio.Sound.createAsync(
        require('../../assets/sounds/correct_answer.mp3'),
      );

      const { sound: soloCorrect } = await Audio.Sound.createAsync(
        require('../../assets/sounds/solo_correct.mp3'),
      );

      const { sound: keyboardPress } = await Audio.Sound.createAsync(
        require('../../assets/sounds/keyboard_press.mp3'),
      );

      const { sound: soloFail } = await Audio.Sound.createAsync(
        require('../../assets/sounds/solo_fail.mp3'),
      );

      await correctAnswer.setVolumeAsync(0.5);
      await buttonPress.setVolumeAsync(0.5);
      await soloCorrect.setVolumeAsync(0.5);
      await keyboardPress.setVolumeAsync(0.5);
      await soloFail.setVolumeAsync(0.5);

      setButtonPressSound(buttonPress);
      setCorrectAnswerSound(correctAnswer);
      setSoloCorrectSound(soloCorrect);
      setKeyboardPressSound(keyboardPress);
      setSoloFailSound(soloFail);
    } catch (error) {
      console.log('error loading sounds', error);
    }
  };

  const playSound = async (soundType) => {
    if (soundType === 'button_press' && buttonPressSound) {
      await buttonPressSound.replayAsync();
    }

    if (soundType === 'correct_answer' && correctAnswerSound) {
      await correctAnswerSound.replayAsync();
    }

    if (soundType === 'solo_correct' && soloCorrectSound) {
      await soloCorrectSound.replayAsync();
    }

    if (soundType === 'keyboard_press' && keyboardPressSound) {
      await keyboardPressSound.replayAsync();
    }

    if (soundType === 'solo_fail' && soloFailSound) {
      await soloFailSound.replayAsync();
    }
  };

  return <SoundContext.Provider value={{ playSound }}>{children}</SoundContext.Provider>;
};

export const useSound = () => {
  return React.useContext(SoundContext);
};
