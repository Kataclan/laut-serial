import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Button = ({
  touchableStyle,
  viewStyle,
  textStyle,
  text,
  onPress,
  icon,
  iconColor,
  iconSize,
  contained,
}) => (
  <TouchableOpacity
    style={{
      width: 250,
      padding: 20,
      ...touchableStyle,
    }}
    onPress={onPress}
  >
    <View
      style={{
        border: contained ? "1px solid white" : "",
        ...viewStyle,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={textStyle}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
