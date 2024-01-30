import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const androidORIOSAdUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-7342852291876571/2789459022'
    : 'ca-app-pub-7342852291876571/7954155798';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : androidORIOSAdUnitId;

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

  const showAd = async () => {
    await new Promise((resolve, reject) => {
      if (loaded && ad) {
        resolve();
      } else if (ad) {
        const loadListener = ad.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
          loadListener.remove?.();
          resolve();
        });
        const errorListener = ad.addAdEventListener(AdEventType.ERROR, (err) => {
          console.error('Ad Load Error: ', err);
          errorListener.remove?.();
          reject(err);
        });
      } else {
        reject(new Error('No ad instance available'));
      }
    });

    if (loaded && ad) {
      return new Promise((resolve) => {
        const closeListener = ad.addAdEventListener(AdEventType.CLOSED, () => {
          setAd(null);
          setLoaded(false);
          closeListener.remove?.();
          resolve();
        });
        ad.show();
      });
    }
  };

  return [showAd];
};
