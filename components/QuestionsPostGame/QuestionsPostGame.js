import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

const fakeQuestionsData = [
  {
    Question: 'What is the capital of France?',
    Answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    CorrectAnswer: 'Paris',
    PlayerAnswers: {
      you: {
        playerName: 'Player1',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'Paris',
      },
      opponent: {
        playerName: 'Player2',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'London',
      },
    },
  },
  {
    Question: 'What is the capital of France?',
    Answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    CorrectAnswer: 'Paris',
    PlayerAnswers: {
      you: {
        playerName: 'Player1',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'Paris',
      },
      opponent: {
        playerName: 'Player2',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'Paris',
      },
    },
  },
  {
    Question: 'What is the capital of France?',
    Answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    CorrectAnswer: 'Paris',
    PlayerAnswers: {
      you: {
        playerName: 'Player1',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'Paris',
      },
      opponent: {
        playerName: 'Player2',
        playerAvatar:
          'https://img.freepik.com/premium-photo/imagine-cat-comfortably-nestled-reading-nook-8_640251-865.jpg',
        answer: 'Paris',
      },
    },
  },
];

export default function QuestionsPostGame({ questions }) {
  const QuestionsData = questions || fakeQuestionsData;

  const [thumbsStatus, setThumbsStatus] = useState(
    QuestionsData.map(() => ({ thumbsUp: false, thumbsDown: false })),
  );

  const handleThumbsClick = async (index, thumbType) => {
    // dont allow undoing of thumbs up or down

    if (thumbsStatus[index].thumbsUp || thumbsStatus[index].thumbsDown) return;

    // Toggle the status of the specific thumb for the question
    const newThumbsStatus = [...thumbsStatus];
    newThumbsStatus[index] = {
      ...newThumbsStatus[index],
      [thumbType]: !newThumbsStatus[index][thumbType],
    };
    setThumbsStatus(newThumbsStatus);

    // Dummy console log function
    console.log(`Thumbs ${thumbType} clicked for question ${index + 1}`);

    if (thumbType === 'thumbsUp') {
      await newRequest.put(`/question/${QuestionsData[index].QuestionId}/upvote`);
    }

    if (thumbType === 'thumbsDown') {
      await newRequest.put(`/question/${QuestionsData[index].QuestionId}/downvote`);
    }
  };

  const renderQuestionBubble = (question, index) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: '#1c2141',
          borderRadius: 10,
          padding: 2,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            marginVertical: 10,
            width: 300,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          {question.Question}
        </Text>
        {question.QuestionImage ? (
          <View>
            <Image
              resizeMode='contain'
              source={{
                uri: question.QuestionImage,
                headers: {
                  Accept: '*/*',
                },
              }}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={{}}>
          {question.Answers.map((answer) => {
            return (
              <View
                key={answer.optionText}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: 25,
                  }}
                >
                  {question.PlayerAnswers.you.answer === answer.optionText && (
                    <>
                      <Image
                        resizeMode='stretch'
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#fff',
                        }}
                        source={{
                          uri: question?.PlayerAnswers?.you?.playerAvatar,
                          headers: {
                            Accept: '*/*',
                          },
                        }}
                      />
                    </>
                  )}
                </View>
                {answer.optionText && (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      marginRight: 10,
                      fontWeight: question.CorrectAnswer === answer.optionText ? 'bold' : 'normal',
                      color: question.CorrectAnswer === answer.optionText ? '#adf2bc' : '#f2adad',
                      maxWidth: '80%',
                    }}
                  >
                    {answer.optionText}
                  </Text>
                )}
                <View
                  style={{
                    width: 25,
                  }}
                >
                  {question.PlayerAnswers.opponent.answer === answer.optionText && (
                    <>
                      <Image
                        style={{ width: 25, height: 25, borderRadius: 50 }}
                        source={{
                          uri: question?.PlayerAnswers?.opponent?.playerAvatar,
                          headers: {
                            Accept: '*/*',
                          },
                        }}
                      />
                    </>
                  )}
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            margin: 10,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              padding: 2,
            }}
            onPress={() => handleThumbsClick(index, 'thumbsUp')}
          >
            <Ionicons
              name={thumbsStatus[index].thumbsUp ? 'thumbs-up' : 'thumbs-up-outline'}
              size={28}
              color='#adf2bc'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 2,
            }}
            onPress={() => handleThumbsClick(index, 'thumbsDown')}
          >
            <Ionicons
              name={thumbsStatus[index].thumbsDown ? 'thumbs-down' : 'thumbs-down-outline'}
              size={28}
              color='#f2adad'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '95%',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Questions
        </Text>
        {QuestionsData.map((question, index) => renderQuestionBubble(question, index))}
      </View>
    </View>
  );
}
