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
  const [vsSound, setVsSound] = useState(null);
  const [gameWin, setGameWin] = useState(null);
  const [gameLose, setGameLose] = useState(null);

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
      vsSound?.unloadAsync();
      gameWin?.unloadAsync();
      gameLose?.unloadAsync();
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

      const { sound: inGame } = await Audio.Sound.createAsync(
        require('../../assets/sounds/in_game.mp3'),
      );
      const { sound: gameWin } = await Audio.Sound.createAsync(
        require('../../assets/sounds/game_win.wav'),
      );

      const { sound: gameLose } = await Audio.Sound.createAsync(
        require('../../assets/sounds/game_lose.wav'),
      );

      const { sound: vs } = await Audio.Sound.createAsync(require('../../assets/sounds/vs.wav'));

      await inGame.setVolumeAsync(0.5);
      await correctAnswer.setVolumeAsync(0.5);
      await buttonPress.setVolumeAsync(0.5);
      await soloCorrect.setVolumeAsync(0.5);
      await keyboardPress.setVolumeAsync(0.5);
      await soloFail.setVolumeAsync(0.5);
      await fast.setVolumeAsync(0.5);
      await chop.setVolumeAsync(0.5);
      await vs.setVolumeAsync(0.5);
      await gameWin.setVolumeAsync(0.5);
      await gameLose.setVolumeAsync(0.5);

      setButtonPressSound(buttonPress);
      setCorrectAnswerSound(correctAnswer);
      setSoloCorrectSound(soloCorrect);
      setKeyboardPressSound(keyboardPress);
      setSoloFailSound(soloFail);
      setInGameSound(inGame);
      setFastSound(fast);
      setChopSound(chop);
      setVsSound(vs);
      setGameWin(gameWin);
      setGameLose(gameLose);
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
      await fastSound.replayAsync();
    }

    if (soundType === 'chop' && chopSound) {
      await chopSound.replayAsync();
    }

    if (soundType === 'in_game' && inGameSound) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await inGameSound.setVolumeAsync(0.5, { durationMillis: 2000 });
      await inGameSound.replayAsync();
    }

    if (soundType === 'vs' && vsSound) {
      await vsSound.replayAsync();
    }

    if (soundType === 'game_win' && gameWin) {
      await gameWin.replayAsync();
    }

    if (soundType === 'game_lose' && gameLose) {
      await gameLose.replayAsync();
    }
  };

  const stopSound = async (soundType) => {
    if (soundType === 'fast' && fastSound) {
      await fastSound.stopAsync();
    }

    if (soundType === 'chop' && chopSound) {
      await chopSound.replayAsync();
    }

    if (soundType === 'in_game' && inGameSound) {
      // fade out the sound
      await inGameSound.setVolumeAsync(0, { durationMillis: 2000 });
      await inGameSound.stopAsync();
    }

    if (soundType === 'vs' && vsSound) {
      await vsSound.stopAsync();
    }

    if (soundType === 'game_win' && gameWin) {
      await gameWin.replayAsync();
    }
  };

  return <SoundContext.Provider value={{ playSound, stopSound }}>{children}</SoundContext.Provider>;
};

export const useSound = () => {
  return React.useContext(SoundContext);
};

// play woosh sound without the hook useSound
