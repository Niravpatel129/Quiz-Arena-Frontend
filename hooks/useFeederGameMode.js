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
  const [userAnswers, setUserAnswers] = useState([]);
  const [showPickPercentage, setShowPickPercentage] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);

  useEffect(() => {
    if (gameActive) {
      fetchQuestions(10).then((qs) => setQuestions(qs));
    }
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowPickPercentage(false);
    setWaitingForNext(false);
  };

  const submitUserAnswers = async () => {
    try {
      if (userAnswers.length === 0) return;
      await newRequest.post('/feeder/user-answers', userAnswers);
      console.log('User answers submitted successfully');
    } catch (error) {
      console.error('Error submitting user answers:', error);
    }
  };

  const answerQuestion = useCallback(
    (answer) => {
      const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;

      setUserAnswers((prevUserAnswers) => [
        ...prevUserAnswers,
        {
          question: questions[currentQuestionIndex]._id,
          answer: answer,
          isCorrect: isCorrect,
        },
      ]);
      setShowPickPercentage(true);
      setWaitingForNext(true);

      if (!isCorrect) {
      } else {
        setScore((prevScore) => prevScore + 1);
      }
    },
    [questions, currentQuestionIndex],
  );

  const continueGame = useCallback(() => {
    console.log('🚀  continueGame');
    const isCorrect =
      questions[currentQuestionIndex]?.correctAnswer === userAnswers[currentQuestionIndex]?.answer;
    if (!isCorrect && gameActive) {
      setGameActive(false);
      submitUserAnswers();
    } else {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        fetchQuestions(5, questions[questions.length - 1].order + 1).then((newQuestions) => {
          setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
          setCurrentQuestionIndex(nextIndex);
        });
      }
    }
    setShowPickPercentage(false);
    setWaitingForNext(false);
  }, [currentQuestionIndex, questions, userAnswers, gameActive]);

  return {
    questions,
    currentQuestionIndex,
    gameActive,
    score,
    startGame,
    answerQuestion,
    showPickPercentage,
    continueGame,
    waitingForNext,
  };
};

export default useFeederGameMode;
