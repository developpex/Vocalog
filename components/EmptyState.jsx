import React from "react";
import { Image, Text, View } from "react-native";

import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        className="h-[215px] w-[270px]"
        source={images.empty}
        resizeMethod="contain"
      />
      <Text className="mt-2 font-psemibold text-xl text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title="Create Log"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
