import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const QuestionHeader = ({ score }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
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
