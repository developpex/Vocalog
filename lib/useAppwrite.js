import { isLoading } from "expo-font";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useApprite = (fn) => {
	const [data, setData] = useState([]);
	const [loading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await fn();
			setData(response);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const refetch = () => fetchData();

	useEffect(() => {
		fetchData();
	}, []);

	return { data, isLoading, refetch };
};

export default useApprite;
