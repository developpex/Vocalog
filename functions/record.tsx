import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import { Alert, Platform } from "react-native";
import { PermissionStatus } from "expo-av/build/Audio";

export const record = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const recordingIsDone = audioRecordingRef?.current?._isDoneRecording;
    if (recordingIsDone) {
      audioRecordingRef.current = new Audio.Recording();
    }

    const permissionResponse = await Audio.requestPermissionsAsync();
    if (permissionResponse.status === PermissionStatus.GRANTED) {
      const recordingStatus =
        await audioRecordingRef?.current?.getStatusAsync();
      if (!recordingStatus?.canRecord) {
        const recordingOptions = {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          android: {
            extension: ".amr",
            outputFormat: Audio.AndroidOutputFormat.AMR_WB,
            audioEncoder: Audio.AndroidAudioEncoder.AMR_WB,
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };

        await audioRecordingRef?.current
          ?.prepareToRecordAsync(recordingOptions)
          .then(() => console.log("prepared recording instance"))
          .catch((error) =>
            console.error("failed to prepare recording instance", error),
          );
      }

      await audioRecordingRef?.current?.startAsync();
    } else {
      console.error("Permisson to record audio is required!");
      return;
    }
  } catch (error) {
    Alert.alert("Failed to start recording: ", error.message);
    console.error("Failed to start recording: ", error);
  }
};
