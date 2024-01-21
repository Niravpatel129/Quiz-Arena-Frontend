import { Share } from 'react-native';

const useShareMessage = () => {
  const shareMessage = async (message) => {
    Share.share(
      {
        message: `${message} \n\nDownload the app here: https://www.quizarena.gg`,
        title: `Quiz Arena - where knowledge is power 🤓!!`,
      },
      {
        dialogTitle: 'Share BAM goodness',
      },
    );
  };

  return shareMessage;
};

export default useShareMessage;
