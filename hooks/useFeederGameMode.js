import { useCallback, useEffect, useState } from 'react';
import { newRequest } from '../api/newRequest';

const fetchQuestions = async (numQuestions, startOrder = 0) => {
  try {
    const response = await newRequest.get(
      `/feeder/questions?numQuestions=${numQuestions}&startOrder=${startOrder}&category=logos`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

const useFeederGameMode = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // State to store user answers

  useEffect(() => {
    if (gameActive) {
      fetchQuestions(10).then((qs) => setQuestions(qs));
    }
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]); // Reset answers when game starts
  };

  const submitUserAnswers = async () => {
    try {
      await newRequest.post('/feeder/user-answers', userAnswers);
      console.log('User answers submitted successfully');
    } catch (error) {
      console.error('Error submitting user answers:', error);
    }
  };

  const answerQuestion = useCallback(
    (answer) => {
      console.log('🚀  answer:', answer);
      const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;
      const nextIndex = currentQuestionIndex + 1;

      // Save user answer
      const userAnswer = {
        question: questions[currentQuestionIndex]._id,
        answer: answer,
        isCorrect: isCorrect,
      };
      setUserAnswers([...userAnswers, userAnswer]);

      if (isCorrect) {
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
        } else {
          const startOrder = questions[questions.length - 1].order + 1;
          fetchQuestions(5, startOrder).then((newQuestions) => {
            setQuestions([...questions, ...newQuestions]);
            setCurrentQuestionIndex(nextIndex);
          });
        }
        setScore(score + 1);
      } else {
        setGameActive(false);
        submitUserAnswers(); // Submit answers when game is over
      }
    },
    [questions, currentQuestionIndex, userAnswers],
  );

  return { questions, currentQuestionIndex, gameActive, score, startGame, answerQuestion };
};

export default useFeederGameMode;
