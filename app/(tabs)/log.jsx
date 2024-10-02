import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchInput from "../../components/CustomSearchInput";
import EmptyState from "../../components/EmptyState";
import LogCard from "../../components/LogCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllLogs } from "../../lib/appwrite";
import useApprite from "../../lib/useAppwrite";

const Log = () => {
  const { user } = useGlobalContext();
  const { data: logs, refetch } = useApprite(() => getAllLogs(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [query, setQuery] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!logs) return;
    const lowerCaseQuery = query.toLowerCase();
    const filtered = logs.filter((log) =>
      log.transcript.toLowerCase().includes(lowerCaseQuery),
    );
    setFilteredLogs(filtered);
  }, [logs, query]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="my-6 space-y-6 px-4">
        <CustomSearchInput
          placeholder="Search through logs"
          value={query}
          handleChangeText={(text) => setQuery(text)}
        />
        <FlatList
          data={filteredLogs}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <LogCard log={item} query={query} />}
          ListEmptyComponent={() => (
            <EmptyState title="No Logs Found" subtitle="Make your first log" />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Log;
