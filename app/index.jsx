import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { images } from "../constants";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-[85vh] w-full flex-1 items-center justify-center px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px] justify-start"
            resizeMode="contain"
          />
          <CustomButton
            title="Continue"
            handlePress={() => router.push("/sign-in")}
            containerStyles="mt-10 w-full"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
