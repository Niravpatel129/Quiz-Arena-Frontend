import * as StoreReview from 'expo-store-review';
import { useCallback } from 'react';

const useInAppReview = () => {
  const requestInAppReview = useCallback(async () => {
    // Check if the StoreReview API is available on the current device
    if (await StoreReview.hasAction()) {
      try {
        // Request an in-app review
        await StoreReview.requestReview();
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('In-App Review failed:', error);
      }
    } else {
      console.log('StoreReview API is not available on this device.');
    }
  }, []);

  return requestInAppReview;
};

export default useInAppReview;
