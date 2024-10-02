import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

import { router, usePathname } from "expo-router";
import { icons } from "../constants";

const CustomSearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  initialQuery,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-base text-white"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => {
          setQuery(text);
          handleChangeText(text); // This will pass the search query to the parent component
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input a search");
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          className="h-5 w-5"
          source={icons.search}
          resizeMethod="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchInput;
