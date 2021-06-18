import React from "react";
import { View, Text } from "react-native";
import { COLORS, constants, FONTS, SIZES } from "../constants";

const HeaderBar = ({ title }) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.padding,
        justifyContent: "flex-end",
        marginTop: -25,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.largeTitle,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default HeaderBar;
