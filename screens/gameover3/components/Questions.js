import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { newRequest } from '../../../api/newRequest';
import ReportModal from './ReportModal'; 

export default function Questions({ questions }) {
  const [thumbsStatus, setThumbsStatus] = useState(
    questions.map(() => ({ thumbsUp: false, thumbsDown: false })),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  const handleThumbsClick = async (index, thumbType) => {
    if (thumbsStatus[index].thumbsUp || thumbsStatus[index].thumbsDown) return;

    if (thumbType === 'thumbsDown') {
      setCurrentQuestionId(questions[index].QuestionId);
      setModalVisible(true);
    } else {
      const newThumbsStatus = [...thumbsStatus];
      newThumbsStatus[index] = {
        ...newThumbsStatus[index],
        [thumbType]: !newThumbsStatus[index][thumbType],
      };
      setThumbsStatus(newThumbsStatus);

      if (thumbType === 'thumbsUp') {
        await newRequest.put(`/question/${questions[index].QuestionId}/upvote`);
      }
    }
  };

  const handleReportSubmit = async (questionId, reportData) => {
    await newRequest.post(`/report-question`, {
      questionId,
      data: reportData,
    });
    console.log(`Report submitted for question ${questionId}`, reportData);
  };

  const renderQuestion = (questionData, index) => {
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: '#E3E3E3',
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#181A17',
            textAlign: 'center',
            fontFamily: 'poppins-semiBold',
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          {questionData.Question}
        </Text>
        {questionData.QuestionImage && (
          <Image
            cachePolicy='memory-disk'
            contentFit='contain'
            source={{ uri: questionData.QuestionImage }}
            style={{ width: 150, height: 150, marginBottom: 10 }}
          />
        )}
        <View
          style={{
            width: '100%',
            gap: 12,
          }}
        >
          {questionData.Answers.map((answer, index) =>
            renderQuestionItem(answer, questionData, index),
          )}
        </View>

        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#E3E3E3',
              marginVertical: 20,
            }}
          ></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              disabled={thumbsStatus[index].thumbsUp || thumbsStatus[index].thumbsDown}
              onPress={() => handleThumbsClick(index, 'thumbsUp')}
              style={{
                borderRadius: 10,
                backgroundColor: thumbsStatus[index].thumbsUp ? '#2CC672' : '#fff',
                borderWidth: 1,
                borderColor: '#2CC672',
                paddingVertical: 8,
                paddingHorizontal: 22,
              }}
            >
              <Ionicons
                name='thumbs-up-sharp'
                size={24}
                color={thumbsStatus[index].thumbsUp ? '#fff' : '#2CC672'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={thumbsStatus[index].thumbsUp || thumbsStatus[index].thumbsDown}
              onPress={() => handleThumbsClick(index, 'thumbsDown')}
              style={{
                borderWidth: 1,
                borderColor: '#FF5858',
                paddingVertical: 8,
                backgroundColor: thumbsStatus[index].thumbsDown ? '#FF5858' : '#fff',
                borderRadius: 10,
                paddingHorizontal: 22,
              }}
            >
              <Ionicons
                name='thumbs-down-sharp'
                size={24}
                color={thumbsStatus[index].thumbsDown ? '#fff' : '#FF5858'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderQuestionItem = (answerData, questionData, index) => {
    const showYourAvatar = answerData.optionText === questionData.PlayerAnswers.you.answer;
    const showOpponentAvatar = answerData.optionText === questionData.PlayerAnswers.opponent.answer;

    return (
      <View
        key={index}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
          borderWidth: 1,
          borderColor: answerData.isCorrect ? '#2CC672' : '#D5D5E0',
          borderRadius: 10,
          paddingVertical: 12,
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
          }}
        >
          {showYourAvatar && (
            <Image
              cachePolicy='memory-disk'
              source={{
                uri:
                  questionData.PlayerAnswers.you.playerAvatar ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U8rFMfG5yemq64zE-CvmXIXU6Iozboavd70aWDFtUw&s',
              }}
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: '#EC80B4',
                borderRadius: 100,
              }}
            />
          )}
        </View>
        <View
          style={{
            maxWidth: '70%',
          }}
        >
          <Text
            style={{
              fontFamily: 'poppins-regular',
              fontSize: 14,
              color: answerData.isCorrect ? '#2CC672' : '#262625',
            }}
          >
            {answerData.optionText}
          </Text>
        </View>
        <View
          style={{
            width: 30,
            height: 30,
          }}
        >
          {showOpponentAvatar && (
            <Image
              cachePolicy='memory-disk'
              source={{
                uri:
                  questionData.PlayerAnswers.opponent.playerAvatar ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U8rFMfG5yemq64zE-CvmXIXU6Iozboavd70aWDFtUw&s',
              }}
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: '#EC80B4',
                borderRadius: 100,
              }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        gap: 10,
      }}
    >
      {questions.map((question, index) => renderQuestion(question, index))}
      <ReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleReportSubmit}
        questionId={currentQuestionId}
      />
    </View>
  );
}
