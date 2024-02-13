import { Audio } from 'expo-av';
import React, { createContext, useEffect, useState } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [buttonPressSound, setButtonPressSound] = useState(null);
  const [correctAnswerSound, setCorrectAnswerSound] = useState(null);
  const [soloCorrectSound, setSoloCorrectSound] = useState(null);
  const [keyboardPressSound, setKeyboardPressSound] = useState(null);
  const [soloFailSound, setSoloFailSound] = useState(null);
  const [inGameSound, setInGameSound] = useState(null);
  const [fastSound, setFastSound] = useState(null);
  const [chopSound, setChopSound] = useState(null);

  useEffect(() => {
    loadSounds();
    return () => {
      // Unload sounds when the provider is unmounted
      buttonPressSound?.unloadAsync();
      correctAnswerSound?.unloadAsync();
      keyboardPressSound?.unloadAsync();
      soloCorrectSound?.unloadAsync();
      soloFailSound?.unloadAsync();
      inGameSound?.unloadAsync();
      fastSound?.unloadAsync();
      chopSound?.unloadAsync();
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

      const { sound: fast } = await Audio.Sound.createAsync(
        require('../../assets/sounds/fast.mp3'),
      );

      const { sound: chop } = await Audio.Sound.createAsync(
        require('../../assets/sounds/chop.mp3'),
      );

      await inGame.setVolumeAsync(0.5);
      await correctAnswer.setVolumeAsync(0.5);
      await buttonPress.setVolumeAsync(0.5);
      await soloCorrect.setVolumeAsync(0.5);
      await keyboardPress.setVolumeAsync(0.5);
      await soloFail.setVolumeAsync(0.5);
      await fast.setVolumeAsync(0.5);
      await chop.setVolumeAsync(0.5);

      setButtonPressSound(buttonPress);
      setCorrectAnswerSound(correctAnswer);
      setSoloCorrectSound(soloCorrect);
      setKeyboardPressSound(keyboardPress);
      setSoloFailSound(soloFail);
      setInGameSound(inGame);
      setFastSound(fast);
      setChopSound(chop);
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

    if (soundType === 'fast' && fastSound) {
      // delay the sound by 2 seconds
      await fastSound.replayAsync();
    }

    if (soundType === 'chop' && chopSound) {
      await chopSound.replayAsync();
    }
  };

  const stopSound = async (soundType) => {
    if (soundType === 'fast' && fastSound) {
      await fastSound.stopAsync();
    }

    if (soundType === 'chop' && chopSound) {
      await chopSound.replayAsync();
    }
  };

  return <SoundContext.Provider value={{ playSound, stopSound }}>{children}</SoundContext.Provider>;
};

export const useSound = () => {
  return React.useContext(SoundContext);
};

// play woosh sound without the hook useSound
