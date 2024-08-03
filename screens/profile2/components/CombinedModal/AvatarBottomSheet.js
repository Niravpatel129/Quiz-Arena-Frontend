import React, { forwardRef, useState, useEffect } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import ColorPicker from "./ColorPicker";
import { freeAvatars, lockedAvatars } from "./optimizedAvatars";
import { hsvToHex } from "./utils";

const AvatarBottomSheet = forwardRef(
  (
    {
      snapPoints,
      onChange,
      renderBackdrop,
      selectedAvatar,
      setSelectedAvatar,
      onSaveChanges,
    },
    ref
  ) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [tempAvatar, setTempAvatar] = useState(selectedAvatar);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    const [isChanged, setIsChanged] = useState(false);
    const [avatarBackground, setAvatarBackground] = useState("#ffffff");
    const [dynamicSnapPoints, setDynamicSnapPoints] = useState(["50%"]);

    useEffect(() => {
      setTempAvatar(selectedAvatar);
    }, [selectedAvatar]);

    const handleSetBackground = () => {
      setShowColorPicker(true);
      setDynamicSnapPoints(["75%"]);
      ref.current?.expand();
    };

    const handleSaveBackground = () => {
      if (
        typeof selectedColor === "object" &&
        selectedColor.h !== undefined &&
        selectedColor.s !== undefined &&
        selectedColor.v !== undefined
      ) {
        const colorString = hsvToHex(
          selectedColor.h / 360,
          selectedColor.s,
          selectedColor.v
        );
        console.log(
          "Set background button pressed. Selected color:",
          colorString
        );
        setAvatarBackground(colorString);
        setIsChanged(true);
        setShowColorPicker(false);
        setDynamicSnapPoints(["50%"]);
        ref.current?.collapse();
      } else {
        console.error("Invalid color format:", selectedColor);
      }
    };

    const handleDismiss = () => {
      console.log("Bottom sheet is dismissing");
      if (isChanged) {
        Alert.alert(
          "Save Changes",
          "Would you like to save changes to your avatar?",
          [
            {
              text: "No",
              onPress: () => {
                setTempAvatar(selectedAvatar);
                setIsChanged(false);
                console.log("Changes discarded");
                ref.current?.dismiss();
              },
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                setSelectedAvatar(tempAvatar);
                onSaveChanges(tempAvatar, avatarBackground);
                setIsChanged(false);
                console.log("Changes saved");
                ref.current?.dismiss();
              },
            },
          ]
        );
      } else {
        ref.current?.dismiss();
      }
    };

    const handleAvatarSelection = (avatar) => {
      setTempAvatar(avatar);
      setIsChanged(true);
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={dynamicSnapPoints}
        onChange={(index) => {
          onChange(index);
          if (index === -1) {
            setShowColorPicker(false);
            setDynamicSnapPoints(["50%"]);
          }
        }}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
      >
        <BottomSheetView style={{ flex: 1, alignItems: "center", padding: 16 }}>
          <View
            style={{
              marginBottom: 20,
              alignItems: "center",
              borderRadius: 50,
              backgroundColor: avatarBackground,
            }}
          >
            <Image
              cachePolicy="memory-disk"
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: tempAvatar }}
            />
          </View>
          <ScrollView
            style={{ maxHeight: 240 }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              Unlocked Avatars
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {freeAvatars.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAvatarSelection(avatar)}
                >
                  <View style={{ alignItems: "center", margin: 10 }}>
                    <Image
                      cachePolicy="memory-disk"
                      source={{ uri: avatar }}
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              Locked Avatars
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {lockedAvatars.map((avatar, index) => (
                <View key={index} style={{ alignItems: "center", margin: 10 }}>
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      opacity: 0.5,
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          {showColorPicker ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                paddingTop: 60,
              }}
            >
              <ColorPicker
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#007AFF",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                  alignItems: "center",
                }}
                onPress={handleSaveBackground}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Set Background
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                alignItems: "center",
              }}
              onPress={handleSetBackground}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                Change Background
              </Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AvatarBottomSheet;
