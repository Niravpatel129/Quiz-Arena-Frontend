import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const QuestionBody = ({ question }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 60, // Added padding to ensure the content is not too wide
      }}
    >
      <Text
        style={{
          fontSize: question.question.length > 40 ? RFValue(18) : RFValue(20),
          fontWeight: "bold",
          fontFamily: "poppins-regular",
          textAlign: "center",
          color: "white",
          marginBottom: 20, // Added margin bottom to create space between text and image
        }}
      >
        {question.question}
      </Text>
      {question.helperImage && question.helperImage !== "" && (
        <View
          style={{
            width: "90%",
            aspectRatio: 1.5, // Maintain aspect ratio to ensure proper spacing
            marginBottom: 10,
            borderColor: "white", // Added border color
            borderWidth: 2, // Added border width
            borderRadius: 10, // Optional: adds rounded corners to the border
            overflow: "hidden", // Ensures the image does not overflow the border
            justifyContent: "center",
            alignItems: "center",
            padding: 15, // Added padding to create space between the border and the image
          }}
        >
          <Image
            contentFit="contain"
            source={{
              uri: question.helperImage || "",
            }}
            style={{
              width: "90%",
              height: "90%",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default QuestionBody;
