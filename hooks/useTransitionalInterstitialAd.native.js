// Import necessary modules
import { useEffect, useState } from 'react';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7342852291876571/2789459022';

export const useTransitionalInterstitialAd = () => {
  const [ad, setAd] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Create a new Interstitial Ad
    const newAd = InterstitialAd.createForAdRequest(adUnitId);

    // Event Listener for Ad Loading
    const loadListener = newAd.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Event Listener for Ad Dismissal
    newAd.addAdEventListener(AdEventType.CLOSED, () => {
      setAd(null);
      setLoaded(false);
    });

    newAd.load();

    setAd(newAd);

    // Cleanup
    return () => {
      if (loadListener.remove) {
        loadListener.remove();
      }

      if (newAd.remove) {
        newAd.remove();
      }
    };
  }, []);

  // Function to show the ad
  const showAd = () => {
    if (loaded && ad) {
      ad.show();
    }
  };

  return [showAd];
};
