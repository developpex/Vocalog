import React from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constants";

const LogCard = ({ log: { transcript, $createdAt }, query }) => {
  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={{ fontWeight: "bold", color: "#FF9C01" }}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={{ color: "white" }}>
          {part}
        </Text>
      ),
    );
  };

  return (
    <View className="m-2 mb-2 flex-col items-center rounded-xl border border-secondary p-4">
      <View className="flex-row items-start gap-3">
        <View className="flex-1 flex-row items-center justify-center">
          <View className="ml-3 flex-1 justify-center gap-y-1">
            <Text
              className="font-pmedium text-sm text-secondary-100"
              numberOfLines={1}
            >
              {$createdAt}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image className="h-5 w-5" source={icons.menu} resizeMode="contain" />
        </View>
      </View>

      <Text className="text-xl text-white">
        {highlightText(transcript, query)}
      </Text>
    </View>
  );
};

export default LogCard;
