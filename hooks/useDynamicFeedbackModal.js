import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { newRequest } from '../api/newRequest';

const useDynamicFeedbackModal = () => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const user = await AsyncStorage.getItem('userToken');
      return user !== null;
    };

    const checkIfShouldShowModal = async () => {
      try {
        const feedbackRes = await newRequest.get('/feedback/current-question');
        const question = feedbackRes.data.question; // Assuming the question text is what uniquely identifies it

        // Use the question itself as the unique identifier
        const lastQuestionSeen = await AsyncStorage.getItem('lastQuestionSeen');
        const hasAnswered = await AsyncStorage.getItem(`hasAnswered_${question}`);

        if (question !== lastQuestionSeen || hasAnswered === null) {
          setShouldShowModal(true);
          setCurrentQuestion(question);
        }
      } catch (error) {
        console.error('Failed to check if should show feedback modal:', error);
      }
    };

    // delay 1 second
    setTimeout(async () => {
      const shouldContinue = await isUserLoggedIn();
      if (shouldContinue) {
        checkIfShouldShowModal();
      }

      // checkIfShouldShowModal();
    }, 1000);
  }, []);

  const handleFeedback = async (feedback) => {
    try {
      await newRequest.post('/feedback/submit-feedback', {
        question: currentQuestion,
        feedback,
      });

      await AsyncStorage.setItem(`hasAnswered_${currentQuestion}`, 'true');
      await AsyncStorage.setItem('lastQuestionSeen', currentQuestion);

      setShouldShowModal(false);

      Toast.show({
        type: 'success',
        text1: 'Feedback submitted!',
        position: 'bottom',
      });
    } catch (error) {
      console.error('Failed to handle feedback:', error);
    }
  };

  const handleDismiss = () => {
    setShouldShowModal(false);
  };

  return { shouldShowModal, handleFeedback, handleDismiss, question: currentQuestion };
};

export default useDynamicFeedbackModal;
