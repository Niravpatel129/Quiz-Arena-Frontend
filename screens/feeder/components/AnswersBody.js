import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const AnswersBody = ({ question, onAnswer }) => {
  const [userSelected, setUserSelected] = React.useState(null);

  React.useEffect(() => {
    setUserSelected(null);
  }, [question]);

  const renderAnswersBody = ({ answer }) => {
    console.log('🚀  answer:', answer);
    const didUserPickCorrectAnswer = answer.isCorrect && userSelected === answer.optionText;

    return (
      <TouchableOpacity
        onPress={() => {
          // if its not null return
          if (userSelected) return;

          setUserSelected(answer.optionText);
          onAnswer(answer.optionText);
        }}
        style={{
          backgroundColor: didUserPickCorrectAnswer ? 'green' : 'white',
          borderWidth: 2,
          padding: 20,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: didUserPickCorrectAnswer ? 'white' : 'black',
            fontSize: RFValue(16),
            fontWeight: 'bold',
            fontFamily: 'poppins-regular',
          }}
        >
          {answer.optionText}
        </Text>
        {userSelected && <Text>{answer.pickPercentage}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 10,
      }}
    >
      {question.answers.map((answer, index) => {
        return <React.Fragment key={index}>{renderAnswersBody({ answer })}</React.Fragment>;
      })}
    </View>
  );
};

export default AnswersBody;
