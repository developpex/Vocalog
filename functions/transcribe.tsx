import { MutableRefObject } from "react";

import { Audio } from "expo-av";
import * as Device from "expo-device";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export const transcribe = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
) => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: false,
  });

  const isPrepared = audioRecordingRef?.current?._canRecord;
  if (isPrepared) {
    await audioRecordingRef?.current?.stopAndUnloadAsync();

    const recordingUri = audioRecordingRef?.current?.getURI() || "";
    const base64Uri = await FileSystem.readAsStringAsync(recordingUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (recordingUri && base64Uri) {
      const audioConfig = {
        encoding: Platform.OS === "ios" ? "LINEAR16" : "AMR_WB",
        sampleRateHertz: Platform.OS === "ios" ? 44100 : 16000,
        languageCode: "en-US",
      };

      const rootOrigin =
        Platform.OS === "android"
          ? //todo: check when on => ? "10.0.2.2"
            "192.168.1.51" // now im using my local network
          : Device.isDevice
            ? process.env.LOCAL_DEV_IP || "localhost"
            : "localhost";

      const serverUrl = `http://${rootOrigin}:4000`;

      const serverResponse = await fetch(`${serverUrl}/speech-to-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioUrl: base64Uri,
          config: audioConfig,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Network error: ", error.message);
        });

      const results = serverResponse?.results || [];

      if (results) {
        const transcript = results?.[0].alternatives?.[0].transcript;
        if (!transcript) {
          console.error("No transcript found");
          return undefined;
        }

        return transcript;
      } else {
        console.error("No transcript found");
        return undefined;
      }
    } else {
      console.error("Something went wrong with unloading the recording");
      return;
    }
  }
};
