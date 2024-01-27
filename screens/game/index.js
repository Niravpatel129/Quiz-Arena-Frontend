import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import Toast from 'react-native-toast-message';
import HighlightEffect from '../../components/HighlightEffect';
import PreGame from '../../components/PreGame/PreGame';
import checkIfBot from '../../helpers/checkIfBot';
import socketService from '../../services/socketService';
import Ingame2 from '../ingame2';

function PreloadImages({ imagesToPreload }) {
  return (
    <>
      {imagesToPreload.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={{ width: 0, height: 0, opacity: 0 }} />
      ))}
    </>
  );
}

const defaultCountdown = 12;

const GameScreen = ({ navigation, route }) => {
  const [highlightTrigger, setHighlightTrigger] = React.useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [timer, setTimer] = React.useState(defaultCountdown);
  const [appState, setAppState] = React.useState(AppState.currentState);
  const [round, setRound] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [sendBotAnswer, setSendBotAnswer] = React.useState(false);
  const [gameInProgress, setGameInProgress] = React.useState(false);
  const [imagesToPreload, setImagesToPreload] = React.useState([]);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!route.params?.gameSessionId) return;
    if (!route.params?.players) return;

    socketService.emit('ready', {
      gameSessionId: route.params?.gameSessionId,
      players: route.params?.players,
    });
  }, [route.params?.gameSessionId]);

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
  }, []);

  const giveBotAnswer = (botPlayer, sessionId, correctAnswer) => {
    if (sendBotAnswer) return;

    // random between 0.5 and 2 seconds

    const giveCorrectAnswer = Math.floor(Math.random() * 4) + 1 > 1;
    // only send 1 bot answer per round

    socketService.emit('bot_answer', {
      sessionId: sessionId,
      botPlayer: botPlayer,
      correctAnswer: giveCorrectAnswer ? correctAnswer : 'wrong answer',
      timeRemaining: Math.floor(Math.random() * 10) + 1,
      currentRound: round,
    });

    setSendBotAnswer(true);
  };

  useEffect(() => {
    startTimer();

    // check if you have disconnected
    socketService.on('disconnect', (reason) => {
      console.log('Disconnected from server', reason);

      if (gameInProgress) {
        Toast.show({
          type: 'error',
          text1: 'Connection lost',
          text2: 'You have been disconnected from the server',
          position: 'bottom',
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 40,
        });
      }

      navigation.navigate('Categories');
    });
    socketService.on('new_round', (roundData) => {
      if (roundData.roundNumber === 1) {
        console.log('preload data');
        setImagesToPreload(roundData.rounds.map((round) => round.helperImage));
      }

      // setCountdown(0);
      setTimer(defaultCountdown);
      setRound((prevRound) => prevRound + 1);
      setSendBotAnswer(false);
      if (roundData) setData(roundData);

      const opponentData = roundData.gameSession.players.find(
        (player) => player.socketId !== socketService?.socket?.id,
      );

      const isBot = checkIfBot(opponentData.socketId);
      const correctAnswer = roundData.options.find((option) => option.isCorrect);

      if (isBot) {
        giveBotAnswer(opponentData, roundData.sessionId, correctAnswer.optionText);
      }

      setHighlightTrigger(false);
    });

    socketService.on('game_over', (results) => {
      console.log(' rocket game over');
      setGameInProgress(false);

      if (hasNavigated.current) {
        return;
      }

      hasNavigated.current = true;
      const mySocketId = socketService?.socket?.id;

      // find my data
      const myData = results.gameSession.players.find((player) => player.socketId === mySocketId);
      const opponentData = results.gameSession.players.find(
        (player) => player.socketId !== mySocketId,
      );

      // only do it once
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
                  didWin: myData.score > opponentData.score,
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
                  userId: myData.id,
                },
                opponentData: {
                  didWin: opponentData.score > myData.score,
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
                  userId: opponentData.id,
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
      setIsCorrectAnswer(result.isCorrect);
      setHighlightTrigger(!highlightTrigger);
    });
  }, []);

  useEffect(() => {
    setGameInProgress(true);

    setTimeout(() => setShowAnimation(false), 2000);
  }, []);

  if (showAnimation) {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 100,
        }}
      >
        <PreGame opponentData={opponentData} myData={myData} />
      </View>
    );
  }

  return (
    <>
      <PreloadImages imagesToPreload={imagesToPreload} />
      {!showAnimation && !opponentData?.socketId.includes('BOT') && (
        <HighlightEffect isCorrect={isCorrectAnswer} trigger={highlightTrigger} />
      )}
      {data && (
        <Ingame2
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
