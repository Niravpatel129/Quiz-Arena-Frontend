import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { newRequest } from "../api/newRequest";

const fetchQuestions = async (numQuestions, startOrder = 0, category) => {
  try {
    const response = await newRequest.get(
      `/feeder/questions?numQuestions=${numQuestions}&startOrder=${startOrder}&category=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

const useFeederGameMode = (category = "logos") => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showPickPercentage, setShowPickPercentage] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // State variables to track bonus options
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState(2);
  const [redoCount, setRedoCount] = useState(2);
  const [bonusTimeCount, setBonusTimeCount] = useState(3);
  const [hintCount, setHintCount] = useState(1);

  useEffect(() => {
    if (gameActive) {
      fetchQuestions(10, 0, category).then((qs) => setQuestions(qs));
    }
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowPickPercentage(false);
    setWaitingForNext(false);
    setScore(0);
    setFiftyFiftyCount(2); // Reset counts when the game starts
    setRedoCount(2);
    setBonusTimeCount(3);
    setHintCount(1);
  };

  const submitUserAnswers = async () => {
    try {
      if (userAnswers.length === 0) return;
      await newRequest.post("/feeder/user-answers", userAnswers);
      console.log("User answers submitted successfully");
    } catch (error) {
      console.error("Error submitting user answers:", error);
    }
  };

  const answerQuestion = useCallback(
    (answer) => {
      const isCorrect =
        questions[currentQuestionIndex].correctAnswer === answer;

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
    [questions, currentQuestionIndex]
  );

  const uploadFeederResults = async () => {
    try {
      const res = await newRequest.post("/feeder/results", {
        scoreAchieved: score,
        category: category,
      });
      setResults(res.data);
      console.log("Feeder results uploaded successfully");
    } catch (error) {
      console.error("Error uploading feeder results:", error);
    }
  };

  const continueGame = useCallback(() => {
    const isCorrect =
      questions[currentQuestionIndex]?.correctAnswer ===
      userAnswers[currentQuestionIndex]?.answer;
    if (!isCorrect && gameActive) {
      setGameActive(false);
      setGameOver(true); // Mark the game as over
      submitUserAnswers();
      uploadFeederResults();
    } else {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        fetchQuestions(
          5,
          questions[questions.length - 1].order + 1,
          category
        ).then((newQuestions) => {
          setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
          if (newQuestions.length === 0) {
            Toast.show({
              type: "error",
              text1: "No more questions",
              text2: "You have reached the end of the game",
            });

            setGameOver(true);
            setGameActive(false); // End the game if there are no more questions
            submitUserAnswers();
            uploadFeederResults();
          } else {
            setQuestions((prevQuestions) => [
              ...prevQuestions,
              ...newQuestions,
            ]);
            setCurrentQuestionIndex(nextIndex);
          }
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
    results,
    gameOver,
    setGameOver,
    fiftyFiftyCount,
    redoCount,
    bonusTimeCount,
    hintCount,
    setFiftyFiftyCount,
    setRedoCount,
    setBonusTimeCount,
    setHintCount,
  };
};

export default useFeederGameMode;
