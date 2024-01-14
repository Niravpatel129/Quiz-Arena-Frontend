import { Share } from 'react-native';

const useShareMessage = () => {
  const shareMessage = async (message) => {
    Share.share(
      {
        message: `${message} \n\nDownload the app here: https://www.quizarena.gg`,
        title: `Quiz Arena - where knowledge is power 🤓!!`,
      },
      {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  return shareMessage;
};

export default useShareMessage;
