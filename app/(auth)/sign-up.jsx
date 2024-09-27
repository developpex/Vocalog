import { useState } from "react";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import { images } from "../../constants";
import CustomFormField from "../../components/CustomFormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    pasword: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.pasword || !form.email) {
      Alert.alert("Error", "please fill in all the fields");
      return;
    }

    setSubmitting(true);

    try {
      const user = await createUser(form.email, form.pasword, form.username);

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
            Sign up to Vocalog
          </Text>
          <CustomFormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <CustomFormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-adress"
          />
          <CustomFormField
            title="Password"
            value={form.pasword}
            handleChangeText={(e) => setForm({ ...form, pasword: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link
              className="font-psemibold text-lg text-secondary-100"
              href="/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
