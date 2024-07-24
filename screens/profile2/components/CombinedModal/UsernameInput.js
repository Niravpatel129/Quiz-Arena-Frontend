import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const UsernameInput = ({
  newUsername,
  setNewUsername,
  usernameInputVisible,
  error,
}) => {
  return (
    <View>
      <TextInput
        editable={usernameInputVisible}
        maxLength={8}
        style={styles.modalTextInput}
        value={newUsername}
        onChangeText={setNewUsername}
        placeholderTextColor="#C7C7CD"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default UsernameInput;
