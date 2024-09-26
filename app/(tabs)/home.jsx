import React, { useRef, useState } from "react";

import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { record } from "../../functions/record";
import { transcribe } from "../../functions/transcribe";

const Home = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const audioRecordingRef = useRef(new Audio.Recording());

  const startRecording = async () => {
    setIsRecording(true);
    await record(audioRecordingRef);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsTranscribing(true);

    try {
      const transcript = await transcribe(audioRecordingRef);
      setTranscribedText(transcript || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="p-4">
        <View className="items-center justify-center">
          <Text className="font-psemibold text-3xl text-white">Home</Text>
          <View
            className={`m-4 mt-5 h-[300px] w-full flex-row items-start justify-start rounded-xl border border-secondary bg-gray-800 p-4 ${isTranscribing ? "items-center justify-center" : "items-start justify-start"}`}
          >
            {isTranscribing ? (
              <ActivityIndicator size="medium" color="white" />
            ) : (
              <Text
                className={`p-2 font-pregular ${transcribedText ? "text-white" : "text-gray-500"}`}
              >
                {transcribedText ||
                  "Your transcribed text Your transcribed text Your transcribed text Your transcribed text Your transcribed text Your transcribed text Your transcribed text Your transcribed text Your transcribed text"}
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPressIn={startRecording}
            onPressOut={stopRecording}
            className={`mt-20 h-20 w-20 items-center justify-center rounded-full bg-secondary`}
          >
            {isRecording ? (
              <ActivityIndicator size="medium" color="white" />
            ) : (
              <FontAwesome name="microphone" size={40} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
