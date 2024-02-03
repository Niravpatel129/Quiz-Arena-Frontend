import requestTrackingPermissionsAsync from 'expo-tracking-transparency';
import React, { createContext, useEffect, useState } from 'react';

export const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
  const [trackingStatus, setTrackingStatus] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Yay! I have user permission to track data');
          setTrackingStatus(true);
        } else {
          console.log('Boo! I do not have user permission to track data');
          setTrackingStatus(false);
        }
      } catch (e) {
        // console.log(e);
      }
    })();
  }, []);

  return <TrackingContext.Provider value={{ trackingStatus }}>{children}</TrackingContext.Provider>;
};

export const useTracking = () => {
  return React.useContext(TrackingContext);
};
