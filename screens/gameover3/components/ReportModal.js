import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Incorrect", value: "incorrect" },
  { label: "Inaccurate", value: "inaccurate" },
  { label: "Too Long", value: "too_long" },
  { label: "Other", value: "other" },
];

export default function ReportModal({ visible, onClose, onSubmit }) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({
      reason: selectedReason,
      comment: comment,
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason(null);
    setComment("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            Report Question
          </Text>
          <Dropdown
            style={{
              width: "100%",
              height: 50,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginBottom: 20,
            }}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={{ fontSize: 16 }}
            inputSearchStyle={{ height: 40, fontSize: 16 }}
            iconStyle={{ width: 20, height: 20 }}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select reason"
            value={selectedReason}
            onChange={(item) => setSelectedReason(item.value)}
            renderLeftIcon={() => (
              <AntDesign
                style={{ marginRight: 5 }}
                color={selectedReason ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginBottom: 20,
            }}
            placeholder="Additional comments / Suggestions"
            value={comment}
            onChangeText={setComment}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#007BFF",
                borderRadius: 5,
                paddingVertical: 10,
                alignItems: "center",
                marginRight: 10,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#6c757d",
                borderRadius: 5,
                paddingVertical: 10,
                alignItems: "center",
              }}
              onPress={handleClose}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
