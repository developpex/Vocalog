import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
	return (
		<SafeAreaView className="h-full bg-primary">
			<View className="h-full flex justify-center items-center">
				<Text className="text-white text-3xl">Profile</Text>
			</View>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Profile;
