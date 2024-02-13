import { Audio } from 'expo-av';

// Function to load and return a sound object
async function loadNavigationSound() {
  try {
    // Load the sound file
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/click.wav'), {
      shouldPlay: false,
    });
    return sound;
  } catch (error) {
    console.error('Failed to load the sound', error);
  }
}

let navigationSound = null;

loadNavigationSound().then((sound) => (navigationSound = sound));

export const playNavigationSound = async () => {
  if (navigationSound) {
    try {
      await navigationSound.replayAsync();
    } catch (error) {
      console.error('Sound playback failed', error);
    }
  }
};
