import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import UsernameInput from "./UsernameInput";
import AvatarSelection from "./AvatarSelection";
import ColorPicker from "./ColorPicker";
import { hsvToHex } from "./utils"; // Import the utility function

const ModalContainer = ({
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
  const [iconInputVisible, setIconInputVisible] = useState(false);
  const [error, setError] = useState("");
  const [avatarBackground, setAvatarBackground] = useState(
    defaultColor || "#ffffff"
  );

  const freeAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2FFree-fighting-axolotl-wout-bg.png?alt=media&token=647452aa-1a33-4e3d-b43c-793484ed80d5",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-thinking-wout-bg.png?alt=media&token=89e08dcf-7983-4805-9b39-978f86ae3d0b",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-singing-wout-bg.png?alt=media&token=ac70949c-09b8-4a20-a19c-65040c1ea5c9",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-laying-wout-bg.png?alt=media&token=5d450f0b-426e-483e-827c-cfdf4a0c9039",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-angry-wout-bg.png?alt=media&token=160ffcfe-e558-4137-9358-09b98a6b1e0f",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-floating-wout-bg.png?alt=media&token=15741842-42aa-4277-9e09-952c0b6483ee",
  ];

  const lockedAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-wizard.png?alt=media&token=9fe71f84-ec70-491b-9d2b-85887f0e1b51",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-viking-2.png?alt=media&token=13ed55a1-e9b8-48cc-953b-9ca9180360a5",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-soccer-wout-bg.png?alt=media&token=6ccb55aa-1fb3-41b6-b851-c67b9be8b5e7",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-sailor.png?alt=media&token=d9f6d0e4-8b12-43ac-9c4a-c37ecb9dd88c",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-rapper.png?alt=media&token=58edb211-398b-429c-b883-30333d43f6ef",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-racer.png?alt=media&token=6dc45b01-e784-4b17-a029-f4300537dc83",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-pharoah.png?alt=media&token=66b8c221-9f63-4a43-b56e-e20fcda4b4a0",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-jumping-in-air-wout-bg.png?alt=media&token=82811efc-ba1e-4bed-b37f-a3cc09bc1dbb",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-fisherman.png?alt=media&token=cda11b42-1601-42d4-9a7d-6120e76604ed",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-fire-fighter.png?alt=media&token=c9aed6b5-7627-46ea-85d3-072feac5a9fa",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-explorer.png?alt=media&token=c806c2d7-87bf-4639-ac45-3137a9cd9fa7",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-cop.png?alt=media&token=0a1fe3b9-fc4e-499a-9aab-cf5f9d4b0116",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-clown-wout-bg.png?alt=media&token=2c06147d-6904-4099-a1a9-68b5a1174862",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-artist-1.png?alt=media&token=ea41e290-b626-4ba5-b2fe-cd7f508f9677",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2FAxolotl-pirate.png?alt=media&token=d3ce5fe9-3074-43ec-b778-d4bcc8f7b1b6",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-artist.png?alt=media&token=84edd532-cb33-48bb-a188-92c1ec6e990b",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-astronaut-1.png?alt=media&token=1eaec453-e78d-4f23-95bc-78bd01be878a",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-astronaut.png?alt=media&token=eea665cd-7d34-4f05-8a3c-99c6ab7348e5",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-clown-wout-bg-2.png?alt=media&token=47dcd66f-f82e-43ca-8a0d-1c628098f9f0",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-clown-wout-bg-3.png?alt=media&token=c5e72f3e-3f54-4b2a-b02b-72c9d0f9b47f",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-detective-wout-bg-1.png?alt=media&token=88448c8a-a7f8-4aff-9e01-65a04c60faa5",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-explorer-1.png?alt=media&token=09c6749d-6a75-4ff1-85a3-6ae87e87e809",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-fire-fighter-1.png?alt=media&token=ec792da2-a5ad-4caf-8bd1-79a41ffaf9e6",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-football-wout-bg.png?alt=media&token=e1b46f55-a5fd-4ae2-8e65-a813a8635cc0",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-gladiator-wout-bg.png?alt=media&token=8679a1e6-1dd7-4801-a3d2-40918c6ad7b0",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-in-a-suit-wout-bg-1.png?alt=media&token=60d11665-566d-45f0-92db-cc944c7b797b",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-kight.png?alt=media&token=f7c25488-d6bc-4a06-bc00-529332294b30",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-labcoat-wout-bg.png?alt=media&token=ef8156af-286e-42ec-82f5-4fb2abe4394c",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-lifeguard-1.png?alt=media&token=36d2c378-207a-4971-81ce-9ff007451f2c",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-ninja-1.png?alt=media&token=7fbb9fff-85b6-4504-950b-2981493ae440",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-nurse.png?alt=media&token=88326598-70bd-4eb0-bbe0-c7553b8516b0",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-pilot-1.png?alt=media&token=8be2cd59-5e0e-4856-9f03-948ae4c47304",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-rapper-1.png?alt=media&token=f1be9fea-88be-4cb0-8e59-432939f417db",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-robot-1.png?alt=media&token=12a95c14-11eb-4f47-9957-68a775adf8ed",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-robot.png?alt=media&token=14ce8624-e14a-4d55-a4d7-89c71a647bfc",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-sailor-1.png?alt=media&token=1590e2ba-f98e-40ef-b3c4-5bfebd6f22ba",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-samurai.png?alt=media&token=ebf17826-dd47-42b7-9c25-74077651326b",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-steam-punk.png?alt=media&token=73714afd-03f3-4910-8a91-3a3d0b95764f",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-surfer.png?alt=media&token=489c3224-76f7-4dd7-801d-6e93ab799c8b",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-teacher-wout-bg-2.png?alt=media&token=80285f10-d985-4b18-b82f-c4cc53d030f9",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-teacher-wout-bg.png?alt=media&token=1354117e-135f-4b06-a62c-2b126f4de3e2",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-you-lost.png?alt=media&token=6777d007-9afa-4046-8aba-013cdc673910",
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxoltol-you-won.png?alt=media&token=c79e7629-3625-4541-bd1f-2472ef258be4",
  ];

  useEffect(() => {
    if (visible) {
      setNewUsername(defaultUsername);
      setSelectedAvatar(defaultAvatar);
      setSelectedColor(defaultColor || "#ffffff");
      setAvatarBackground(defaultColor || "#ffffff");
      setError("");
    }
  }, [visible, defaultUsername, defaultAvatar, defaultColor]);

  const handleSave = async () => {
    try {
      await onSave(selectedAvatar, newUsername, avatarBackground);

      setUsernameInputVisible(false);
      setIconInputVisible(false);
      setError("");
    } catch (e) {
      setError("This username is already taken.");
    }
  };

  const handleCancel = () => {
    setNewUsername(defaultUsername);
    setSelectedAvatar(defaultAvatar);
    setSelectedColor(defaultColor || "#ffffff");
    setAvatarBackground(defaultColor || "#ffffff");
    setUsernameInputVisible(false);
    setIconInputVisible(false);
    setError("");
  };

  const handleSetBackground = () => {
    const color = selectedColor;
    const colorString = hsvToHex(color.h / 360, color.s, color.v); // Adjust HSV to the 0-1 range for conversion
    console.log("Set background button pressed. Selected color:", colorString);
    setAvatarBackground(colorString);
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
        <TouchableWithoutFeedback>
          <View style={styles.modalViewContainer}>
            <View style={styles.modalView}>
              <View
                style={[styles.avatar, { backgroundColor: avatarBackground }]}
              >
                <Image
                  source={{ uri: selectedAvatar }}
                  style={styles.avatarImage}
                />
              </View>
              <UsernameInput
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                usernameInputVisible={usernameInputVisible}
                error={error}
              />
              <View style={styles.buttonRow}>
                {usernameInputVisible || iconInputVisible ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => setUsernameInputVisible(true)}
                    >
                      <Text style={styles.changeButtonText}>
                        Change Username
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => setIconInputVisible(true)}
                    >
                      <Text style={styles.changeButtonText}>Change Icon</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <ScrollView style={styles.scrollViewContainer}>
                <AvatarSelection
                  freeAvatars={freeAvatars}
                  lockedAvatars={lockedAvatars}
                  selectedAvatar={selectedAvatar}
                  setSelectedAvatar={setSelectedAvatar}
                />
              </ScrollView>
              <View style={styles.colorPickerContainer}>
                <ColorPicker
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <TouchableOpacity
                  style={styles.setButton}
                  onPress={handleSetBackground}
                >
                  <Text style={styles.buttonText}>Set Background</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  changeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  changeButtonText: {
    color: "white",
    fontSize: 14,
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
  scrollViewContainer: {
    maxHeight: "50%", // Adjust this value as needed
    marginVertical: 10,
  },
  colorPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  setButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default ModalContainer;
