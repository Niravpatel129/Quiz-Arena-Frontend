import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { newRequest } from "../../../api/newRequest";
import CustomButton from "./CustomButton";
import RenderKing from "./RenderKing";

export default function FeederHome({ categoryName, handleEnter }) {
  const navigation = useNavigation();
  const [currentFeederKing, setCurrentFeederKing] = React.useState(undefined);

  useEffect(() => {
    const fetchFeederKing = async () => {
      try {
        const response = await newRequest.get(
          `/feeder/king/${categoryName.replace(/ /g, "-")}`
        );
        setCurrentFeederKing(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFeederKing();
  }, [categoryName]);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#0074da",
        justifyContent: "space-between", // This will help in positioning items correctly
        padding: 30, // Adding padding for better spacing
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ position: "absolute", top: 30, left: 30, zIndex: 1 }} // Adjusted position to be inside padding
      >
        <Ionicons name="close" size={30} color="#9f9f9f" />
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 30,
            textAlign: "center",
            color: "#fff",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Secret Feeder Mode
        </Text>
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 22,
            textAlign: "center",
            color: "#fff",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
            textTransform: "capitalize",
            marginTop: 10,
          }}
        >
          {categoryName || "General Knowledge"}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {currentFeederKing && (
          <RenderKing
            currentFeederKing={currentFeederKing}
            categoryName={categoryName}
          />
        )}
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 50, // Adjust this value as needed
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleEnter();
          }}
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="play"
            size={20}
            color="#0074da"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 18,
              color: "#0074da",
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
