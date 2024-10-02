import { useState } from "react";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import { images } from "../../constants";
import CustomFormField from "../../components/CustomFormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser, signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    pasword: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.pasword || !form.email) {
      Alert.alert("Error", "please fill in all the fields");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.pasword);

      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="text-semibold mt-10 font-psemibold text-2xl text-white">
            Sign in to Vocalog
          </Text>
          <CustomFormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
            keyboardType="email-adress"
          />
          <CustomFormField
            title="Password"
            value={form.pasword}
            handleChangeText={(e) => setForm({ ...form, pasword: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Don't have an account?
            </Text>
            <Link
              className="font-psemibold text-lg text-secondary-100"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
