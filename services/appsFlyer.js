import appsFlyer from 'react-native-appsflyer';

const startAppFlyer = () => {
  try {
    appsFlyer.initSdk(
      {
        devKey: 'fpg8Qxro3LWTbpdamF9s77',
        isDebug: false,
        appId: '6474947179',
        onInstallConversionDataListener: true, //Optional
        onDeepLinkListener: true, //Optional
        timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
      },
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      },
    );
  } catch (e) {
    console.log(e);
  }
};

export default startAppFlyer;
