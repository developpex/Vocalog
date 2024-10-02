import React from "react";

import { StatusBar } from "expo-status-bar";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signOut } from "./../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

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
      <View className="flex h-full items-center justify-center">
        <Text className="text-3xl text-white">Profile</Text>
        <CustomButton title="Log out" handlePress={() => logout()} />
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
