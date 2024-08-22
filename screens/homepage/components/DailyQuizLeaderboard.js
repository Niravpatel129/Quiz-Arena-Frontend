import React from "react";
import { Image } from "expo-image";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import CountryFlag from "react-native-country-flag";

export default function DailyQuizLeaderboard() {
  const placeholderLeaderboard = [
    {
      userDetails: {
        profile: {
          avatar: "https://path-to-avatar1.png",
          country: "US",
        },
        username: "PlayerOne",
      },
      scoreAchieved: 1500,
      _id: "1",
    },
    {
      userDetails: {
        profile: {
          avatar: "https://path-to-avatar2.png",
          country: "CA",
        },
        username: "PlayerTwo",
      },
      scoreAchieved: 1400,
      _id: "2",
    },
    {
      userDetails: {
        profile: {
          avatar: "https://path-to-avatar3.png",
          country: "GB",
        },
        username: "PlayerThree",
      },
      scoreAchieved: 1300,
      _id: "3",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "transparent",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#DCEDFD",
              padding: 10,
              borderRadius: 14,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 16,
                color: "#0074da",
              }}
            >
              Daily Quiz Leaderboard
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  fontFamily: "poppins-semiBold",
                  fontSize: 11,
                  color: "#2CC672",
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {placeholderLeaderboard.map((player, index) => {
            const { userDetails, scoreAchieved } = player;
            const { profile, username } = userDetails || {};
            const { avatar, country } = profile || {};

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#f9f9f9",
                  borderWidth: 1,
                  borderColor:
                    index === 0
                      ? "#FFD700"
                      : index === 1
                      ? "#C0C0C0"
                      : "#CD7F32",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      fontSize: 14,
                      color: "#0074da",
                      marginRight: 10,
                    }}
                  >
                    {index + 1}
                  </Text>
                  <Image
                    cachePolicy="memory-disk"
                    source={{
                      uri:
                        avatar ||
                        "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-thinking-wout-bg.png?alt=media&token=89e08dcf-7983-4805-9b39-978f86ae3d0b",
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: "poppins-semiBold",
                          fontSize: 13,
                          color: "#000",
                          marginRight: 5,
                        }}
                      >
                        {username || "Unknown"}
                      </Text>
                      <CountryFlag isoCode={country || "US"} size={12} />
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: "poppins-semiBold",
                    fontSize: 13,
                    color: "#0074da",
                  }}
                >
                  {scoreAchieved || 0}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: "#32CD32",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
        }}
        onPress={() => {
          /* Handle daily quiz */
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
          Play Daily Quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
}
