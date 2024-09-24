import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text className="text-center text-3xl text-red-800">Vocalog</Text>
			<Link href="/home">Home</Link>
			<StatusBar style="auto" />
		</View>
	);
}
