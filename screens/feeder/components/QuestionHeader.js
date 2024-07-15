import { Text, View } from "react-native";

const QuestionHeader = ({ score }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
          color: "white",
        }}
      >
        Question No. {score}
      </Text>
    </View>
  );
};

export default QuestionHeader;
