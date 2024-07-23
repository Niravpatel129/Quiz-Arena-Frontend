import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { ColorPicker } from "react-native-color-picker";
import Slider from "@react-native-community/slider";

const CombinedModal = ({
  visible,
  onClose,
  onSave,
  defaultUsername,
  defaultAvatar,
  defaultColor,
}) => {
  const [newUsername, setNewUsername] = useState(defaultUsername);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [selectedColor, setSelectedColor] = useState(defaultColor || "#ffffff");
  const [usernameInputVisible, setUsernameInputVisible] = useState(false);
  const [error, setError] = useState("");

  const avatars = [
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263752058801229944/axolotl-teacher-wout-bg-2.png?ex=669ffd92&is=669eac12&hm=9936613749b09be89261d0e660e6bff65b56f00d4d5c48440ab660d0f17f808d&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263752058448777246/axolotl-clown-wout-bg.png?ex=669ffd92&is=669eac12&hm=d94c808ebaa0b69fc41ffd4e1bf80ad922cc07af12ebac04e7bc0856646bc4c5&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263752058801229944/axolotl-teacher-wout-bg-2.png?ex=669ffd92&is=669eac12&hm=9936613749b09be89261d0e660e6bff65b56f00d4d5c48440ab660d0f17f808d&",
    "https://media.discordapp.net/attachments/1200130684010909737/1263752059216199781/axolotl-teacher-wout-bg.png?ex=669ffd92&is=669eac12&hm=140f9a2598a70ccf5f28e5cc6aeb587bf647b2d0cc1338272f6e85f79ebed9a4&=&format=webp&quality=lossless&width=1066&height=1066",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263886288335933460/axolotl-labcoat-wout-bg.png?ex=669fd1d5&is=669e8055&hm=1acbaed28ff4ba0a036d48d22866d47a3e36a543eae704a72042fe6fdaf625af&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263886289183445074/axolotl-clown-wout-bg-3.png?ex=669fd1d5&is=669e8055&hm=3b0cc6867b2d81023b57bc6397c81cfeb9d579ecf511eaa5eb1b32813c30e413&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263886287988068522/axolotl-soccer-wout-bg.png?ex=669fd1d4&is=669e8054&hm=32dd7d3fd61582caecfc263cfda05d625798f71099838b5abd341dd5d4766948&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1264107047893598278/axolotl-gladiator-2-wout-bg.png?ex=669ff6ae&is=669ea52e&hm=3485a77b9ceb813445781cf0fa7260cf03e4dead38cd591f470473854b16dfe6&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1264107048434532393/axolotl-gladiator-wout-bg.png?ex=669ff6ae&is=669ea52e&hm=a110238a14a468f0947d1970bb9b704b3c55d99bc5e8334b5654508481837cb9&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1264112156270399488/axolotl-in-a-suit-wout-bg-1.png?ex=669ffb70&is=669ea9f0&hm=31f7ced605b99fbd7dd2ee81a74022942bfa6beca8c5f91589f5efbb74a1c2d0&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1264114916118233108/axolotl-jumping-in-air-wout-bg.png?ex=669ffe02&is=669eac82&hm=b2da35b6d8194e58b106d70bf4d99acde1e9a090316c402cf8ff6051b6e73266&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263886288663216150/axolotl-football-wout-bg.png?ex=669fd1d5&is=669e8055&hm=97f8616692ad677d86d9524691b4f84d11f6afbab33f42c1f74efcf5eff99076&",
    "https://cdn.discordapp.com/attachments/1200130684010909737/1263886289183445074/axolotl-clown-wout-bg-3.png?ex=669fd1d5&is=669e8055&hm=3b0cc6867b2d81023b57bc6397c81cfeb9d579ecf511eaa5eb1b32813c30e413&",
  ];

  useEffect(() => {
    if (visible) {
      setNewUsername(defaultUsername);
      setSelectedAvatar(defaultAvatar);
      setSelectedColor(defaultColor || "#ffffff");
      setError("");
    }
  }, [visible, defaultUsername, defaultAvatar, defaultColor]);

  const handleSave = async () => {
    try {
      await onSave(selectedAvatar, newUsername, selectedColor);
      setUsernameInputVisible(false);
      setError("");
    } catch (e) {
      setError("This username is already taken.");
    }
  };

  const handleCancel = () => {
    setNewUsername(defaultUsername);
    setSelectedAvatar(defaultAvatar);
    setSelectedColor(defaultColor || "#ffffff");
    setUsernameInputVisible(false);
    setError("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalView}>
            <Image source={{ uri: selectedAvatar }} style={styles.avatar} />
            <TextInput
              editable={usernameInputVisible}
              maxLength={8}
              style={styles.modalTextInput}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholderTextColor="#C7C7CD"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {usernameInputVisible ? (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.changeUsernameButton}
                onPress={() => setUsernameInputVisible(true)}
              >
                <Text style={styles.changeUsernameButtonText}>
                  Change Username
                </Text>
              </TouchableOpacity>
            )}
            <ScrollView contentContainerStyle={styles.avatarContainer}>
              {avatars.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAvatar(avatar)}
                >
                  <Image source={{ uri: avatar }} style={styles.avatarOption} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.colorPickerContainer}>
              <Text style={styles.colorPickerLabel}>
                Select Background Color:
              </Text>
              <ColorPicker
                onColorSelected={(color) => setSelectedColor(color)}
                style={styles.colorPicker}
                defaultColor={selectedColor}
                sliderComponent={Slider}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalViewContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40, // Add padding to the bottom to avoid cutting off
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "70%",
  },
  modalView: {
    width: "100%",
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: -10,
  },
  modalTextInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: "#C7C7CD",
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
  changeUsernameButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  changeUsernameButtonText: {
    color: "white",
    fontSize: 14,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
  },
  saveButton: {
    backgroundColor: "#5cb85c",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  colorPickerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  colorPickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorPicker: {
    width: 100,
    height: 100,
  },
});

export default CombinedModal;
