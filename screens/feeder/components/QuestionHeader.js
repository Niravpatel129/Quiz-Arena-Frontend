import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const QuestionHeader = ({ question, score }) => {
  const skullColor =
    question.stats?.correctAnswers / question.stats?.totalAnswers > 0.5 ? 'red' : 'black';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          flexDirection: 'row',
        }}
      >
        <Ionicons name='rocket' size={32} color='black' />
        <Text
          style={{
            fontSize: 24,
          }}
        >
          {score}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 24,
        }}
      >
        Music
      </Text>
      <Text>
        <Ionicons name='skull' size={32} color={skullColor} />
      </Text>
    </View>
  );
};

export default QuestionHeader;
