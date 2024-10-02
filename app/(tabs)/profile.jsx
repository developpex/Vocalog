import React from "react";

import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import InfoBox from "../../components/InfoBox";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "./../../lib/appwrite";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="px4 mb-12 mt-6 w-full items-center justify-center">
        <TouchableOpacity
          className="mb-10 mr-4 w-full items-end"
          onPress={logout}
        >
          <Image
            className="h-6 w-6"
            source={icons.logout}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="h-16 w-16 items-center justify-center">
          <Image
            className="h-[90%] w-[90%] rounded-lg"
            source={{ uri: user?.avatar }}
            resizeMode="contain"
          />
        </View>
        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
        <View className="mt-5 flex-row">
          <InfoBox
            //title={logs.length || 0}
            title="3"
            subtitle="Logs"
            containerStyles="mr-10"
            titleStyles="text-xl"
          />
          <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
        </View>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
