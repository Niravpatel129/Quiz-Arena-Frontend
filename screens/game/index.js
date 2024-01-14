import React, { useEffect } from 'react';
import { AppState, Image, View } from 'react-native';
import Challange from '../../components/Challange';
import HighlightEffect from '../../components/HighlightEffect';
import checkIfBot from '../../helpers/checkIfBot';
import socketService from '../../services/socketService';
import InGame from '../ingame';

const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    Image.prefetch(url);
  });
};

const defaultCountdown = 13;

const GameScreen = ({ navigation }) => {
  const [highlightTrigger, setHighlightTrigger] = React.useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [timer, setTimer] = React.useState(defaultCountdown);
  const [countdown, setCountdown] = React.useState(0);
  const [appState, setAppState] = React.useState(AppState.currentState);
  const [round, setRound] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [sendBotAnswer, setSendBotAnswer] = React.useState(false);

  const myData = data?.gameSession?.players?.find(
    (player) => player.socketId === socketService?.socket?.id,
  );

  const opponentData = data?.gameSession?.players?.find(
    (player) => player.socketId !== socketService?.socket?.id,
  );

  const [showAnimation, setShowAnimation] = React.useState(true);

  const startTimer = () => {
    setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    // this is for the animation
    setInterval(() => {
      setCountdown((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        socketService.emit('check_connection', data);
      }

      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const giveBotAnswer = (botPlayer, sessionId, correctAnswer) => {
    const giveCorrectAnswer = Math.floor(Math.random() * 4) + 1 > 1;
    // only send 1 bot answer per round
    if (sendBotAnswer) return;

    socketService.emit('bot_answer', {
      sessionId: sessionId,
      botPlayer: botPlayer,
      correctAnswer: giveCorrectAnswer ? correctAnswer : 'wrong answer',
      timeRemaining: Math.floor(Math.random() * 10) + 1,
      currentRound: round,
    });

    setSendBotAnswer(true);
    //
  };

  useEffect(() => {
    startTimer();

    socketService.on('new_round', (roundData) => {
      if (round === 1) {
        console.log('preload data');

        if (roundData.helperImage) {
          preloadImages([roundData.helperImage]);
        }
      }

      setCountdown(0);
      setTimer(defaultCountdown);
      setRound((prevRound) => prevRound + 1);
      setSendBotAnswer(false);
      if (roundData) setData(roundData);

      const opponentData = roundData.gameSession.players.find(
        (player) => player.socketId !== socketService?.socket?.id,
      );

      const isBot = checkIfBot(opponentData.socketId);
      const correctAnswer = roundData.options.find((option) => option.isCorrect);

      if (isBot) giveBotAnswer(opponentData, roundData.sessionId, correctAnswer.optionText);

      setHighlightTrigger(false);
    });

    socketService.on('game_over', (results) => {
      // my socket id =
      const mySocketId = socketService?.socket?.id;

      // find my data
      const myData = results.gameSession.players.find((player) => player.socketId === mySocketId);
      const opponentData = results.gameSession.players.find(
        (player) => player.socketId !== mySocketId,
      );

      // toggle game off for debugging
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'GameOver',
            params: {
              results: {
                rounds: results.gameSession.rounds,
                playersRoundData: results.gameSession.players,
                category: results.gameSession.category,
                gameSessionId: results.gameSession._id,
                yourData: {
                  username: myData.name,
                  rating: myData.playerInformation.elo.rating,
                  ratingChange: myData.playerInformation?.elo?.ratingChange || -5,
                  result: myData.score > opponentData.score ? 'winner' : 'loser',
                  avatar: myData.playerInformation.avatar,
                  country: myData.playerInformation?.country,
                  gameData: {
                    scores: myData.answers,
                  },
                  socketId: myData.socketId,
                  userId: myData._id,
                },
                opponentData: {
                  username: opponentData.name,
                  rating: opponentData.playerInformation.elo.rating,
                  ratingChange: opponentData?.playerInformation?.elo?.ratingChange || 5,
                  result: opponentData.score > myData.score ? 'winner' : 'loser',
                  avatar: opponentData.playerInformation.avatar,
                  country: opponentData.playerInformation?.country,
                  gameData: {
                    scores: opponentData.answers,
                  },
                  socketId: opponentData.socketId,
                  userId: opponentData._id,
                },
              },
            },
          },
        ],
      });
    });

    socketService.on('connection_lost', () => {
      navigation.navigate('Categories');
    });
    socketService.on('answer_result', (result) => {
      setData((prevData) => ({
        ...prevData,
        gameSession: {
          ...prevData.gameSession,
          players: prevData.gameSession.players.map((player) => {
            const me = prevData?.gameSession?.players?.find(
              (player) => player.socketId === socketService.socket.id,
            );

            if (player.socketId === me.socketId) {
              return {
                ...player,
                score: result.currentScore,
              };
            }
            return player;
          }),
        },
      }));
    });

    socketService.on('opponent_guessed', (result) => {
      console.log('opponent guessed', result);
      setIsCorrectAnswer(result.isCorrect);
      setHighlightTrigger(!highlightTrigger);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 2000);
  }, []);

  if (showAnimation && data) {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 100,
        }}
      >
        <Challange
          category={data.gameSession.category}
          opponentData={opponentData}
          myData={myData}
        />
      </View>
    );
  }

  return (
    <>
      {!showAnimation && !opponentData?.socketId.includes('BOT') && (
        <HighlightEffect isCorrect={isCorrectAnswer} trigger={highlightTrigger} />
      )}
      {data && (
        <InGame
          roundNumber={round}
          timer={timer}
          InGameData={{
            sessionId: data?.sessionId,
            RoundData: {
              questionId: data?.questionId,
              question: data?.question,
              answers: data?.options,
              image: data?.helperImage,
              correctAnswer: 'test',
            },
            PlayerOneInformation: {
              username: myData?.name,
              score: myData?.score,
              elo: myData?.playerInformation.elo.rating,
              avatar: myData?.playerInformation.avatar,
              country: myData?.playerInformation.country,
            },
            PlayerTwoInformation: {
              username: opponentData?.name,
              score: opponentData?.score,
              elo: opponentData?.playerInformation.elo.rating,
              avatar: opponentData?.playerInformation.avatar,
              country: opponentData?.playerInformation.country,
            },
          }}
        />
      )}
    </>
  );
};

export default GameScreen;
