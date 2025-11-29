import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const HeaderBackButton = ({ onPress }: { onPress: () => undefined | void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name="arrow-back-ios-new" size={21} color="#017FC6" />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "rgba(1,127,198,0.5)",
    borderRadius: 8,
    padding: 6,
  },
});
