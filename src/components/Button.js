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
}) => (
  <TouchableOpacity style={touchableStyle} onPress={onPress}>
    <View style={viewStyle}>
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
