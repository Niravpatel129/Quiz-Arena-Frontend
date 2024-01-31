import { useCallback, useEffect, useState } from 'react';
import { newRequest } from '../api/newRequest';

// Function to fetch questions from your backend
const fetchQuestions = async (numQuestions, startOrder = 0) => {
  try {
    const response = await newRequest.get(
      `/feeder/questions?numQuestions=${numQuestions}&startOrder=${startOrder}`,
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

  useEffect(() => {
    if (gameActive) {
      fetchQuestions(10).then((qs) => setQuestions(qs));
    }
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentQuestionIndex(0);
  };

  const answerQuestion = useCallback(
    (answer) => {
      console.log('🚀  answer:', answer);

      if (questions[currentQuestionIndex].correctAnswer === answer) {
        const nextIndex = currentQuestionIndex + 1;

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
      }
    },
    [questions, currentQuestionIndex],
  );

  return { questions, currentQuestionIndex, gameActive, score, startGame, answerQuestion };
};

export default useFeederGameMode;
