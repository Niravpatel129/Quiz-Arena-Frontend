import { useEffect, useState } from 'react';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7342852291876571/2789459022';

export const useTransitionalInterstitialAd = () => {
  const [ad, setAd] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const newAd = InterstitialAd.createForAdRequest(adUnitId);
    const loadListener = newAd.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    newAd.load();
    setAd(newAd);

    return () => {
      loadListener.remove?.();
      newAd.remove?.();
    };
  }, []);

  const showAd = () => {
    return new Promise((resolve) => {
      if (loaded && ad) {
        ad.addAdEventListener(AdEventType.CLOSED, () => {
          setAd(null);
          setLoaded(false);
          resolve();
        });
        ad.show();
      } else {
        resolve();
      }
    });
  };

  return [showAd];
};
