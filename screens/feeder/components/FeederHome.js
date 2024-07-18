import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { newRequest } from "../../../api/newRequest";
import CustomButton from "./CustomButton";
import RenderKing from "./RenderKing";
import Leaderboard from "./Leaderboard";
// import LinearGradient from "react-native-linear-gradient";

export default function FeederHome({ categoryName, handleEnter }) {
  const navigation = useNavigation();
  const [currentFeederKing, setCurrentFeederKing] = React.useState([]);

  useEffect(() => {
    const fetchFeederKing = async () => {
      try {
        const response = await newRequest.get(
          `/feeder/king/${categoryName.replace(/ /g, "-")}`
        );
        setCurrentFeederKing(response.data);
      } catch (error) {
        console.log("error", error);
        setCurrentFeederKing([]); // Set to empty array if there is an error
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
        backgroundColor: "linear-gradient(90deg, #2978E7 0%, #EC80B4 100%)",
        justifyContent: "space-between",
        padding: 30,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ position: "absolute", top: 60, left: 30, zIndex: 1 }}
      >
        <Ionicons name="arrow-back-outline" size={30} color="#9f9f9f" />
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 30,
            textAlign: "center",
            color: "#182C53",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Secret Solo Mode
        </Text>
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 22,
            textAlign: "center",
            color: "#204688",
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
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: "105%",
            alignItems: "center",
          }}
        >
          <RenderKing
            currentFeederKing={currentFeederKing}
            categoryName={categoryName}
          />
          <Leaderboard />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleEnter();
          }}
          style={{
            backgroundColor: "#3F95F2",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 25,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            backgroundColor: "#3F95F2",
            // background: "radial-gradient(circle, #71B5FF 0%, #3898FF 100%)",
            shadowColor: "#3F95F2",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.6,
            shadowRadius: 0,
            elevation: 10,
          }}
        >
          <Ionicons
            name="play"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 22,
              color: "white",
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
