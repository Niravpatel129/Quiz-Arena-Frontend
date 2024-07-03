import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

// const QuestionHeader = ({ question, score, categoryName }) => {
//   const skullColor =
//     question?.stats?.correctAnswers / question?.stats?.totalAnswers > 0.5 ? 'red' : 'black';

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Text
//         style={{
//           flexDirection: 'row',
//         }}
//       >
//         <Ionicons name='rocket' size={32} color='black' />
//         <Text
//           style={{
//             fontSize: 24,
//           }}
//         >
//           {score}
//         </Text>
//       </Text>
//       <Text
//         style={{
//           fontSize: 24,
//           textTransform: 'capitalize',
//         }}
//       >
//         {categoryName || 'General Knowledge'}
//       </Text>
//       <Text>
//         <Ionicons name='skull' size={32} color={skullColor} />
//       </Text>
//     </View>
//   );
// };


const QuestionHeader = ({ score }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: 'white',
        }}
      >
        Question No. {score}
      </Text>
    </View>
  );
};

export default QuestionHeader;
