import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BonusOptionButton = ({
  onFiftyFifty,
  onRedo,
  onBonusTime,
  onHint,
  fiftyFiftyCount,
  redoCount,
  bonusTimeCount,
  hintCount,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onFiftyFifty}
        style={[styles.button, fiftyFiftyCount <= 0 && styles.disabledButton]}
        disabled={fiftyFiftyCount <= 0}
      >
        <Icon name="md-remove-circle-outline" size={30} color="#FFF" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{fiftyFiftyCount}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onRedo}
        style={[styles.button, redoCount <= 0 && styles.disabledButton]}
        disabled={redoCount <= 0}
      >
        <Icon name="md-sync" size={30} color="#FFF" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{redoCount}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onBonusTime}
        style={[styles.button, bonusTimeCount <= 0 && styles.disabledButton]}
        disabled={bonusTimeCount <= 0}
      >
        <Icon name="md-time-outline" size={30} color="#FFF" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{bonusTimeCount}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onHint}
        style={[styles.button, hintCount <= 0 && styles.disabledButton]}
        disabled={hintCount <= 0}
      >
        <Icon name="md-bulb-outline" size={30} color="#FFF" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{hintCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Changed to space-evenly
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: -20,
    paddingTop: 10,
    marginBottom: -10,
  },
  button: {
    backgroundColor: "#3F95F2",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9", // Grey out the button when disabled
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default BonusOptionButton;
