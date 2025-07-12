import VocabularyCard from "@/components/VocabularyCard";
import { icons } from "@/constraints/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const history = () => {
  const router = useRouter();
  const [historys, setHistorys] = useState<String[]>([]);

  const historyGetter = async () => {
    try {
      const savedHistorys = await AsyncStorage.getItem("history");
      const savedHistoryArray = savedHistorys?.split(",");
      savedHistoryArray !== undefined &&
        setHistorys(savedHistoryArray.reverse());
      // console.log(savedHistoryArray);
    } catch (error) {}
  };

  const clearBookMark = async () => {
    try {
      await AsyncStorage.removeItem("history");
      // historyGetter();
      setHistorys([]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (word: string) => {
    try {
      const listOfHistorys: String[] = (
        (await AsyncStorage.getItem("history")) || ""
      ).split(",");
      const listOffilteredHistorys = listOfHistorys.filter(
        (item) => item !== word
      );

      await AsyncStorage.setItem("history", listOffilteredHistorys.toString());
      setHistorys(listOffilteredHistorys);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      historyGetter();
    }, [])
  );

  return (
    <React.Fragment>
      <View className="min-h-28 bg-primary flex flex-row justify-between items-center gap-3 px-4 pt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.back} />
        </TouchableOpacity>
        <Text className="font-imp text-xl text-varient font-bold">History</Text>
        <View className="w-7"></View>
      </View>
      <ScrollView className="min-h-screen bg-background py-4">
        <View className="mx-auto">
          <TouchableOpacity
            onPress={clearBookMark}
            className="w-48 flex justify-center items-center rounded-lg flex-row gap-2 px-4 py-4 border-2 border-primary bg-white"
          >
            <Image source={icons.historyButton} />
            <Text className="font-medium text-lg text-primary">
              Clear History
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pb-44">
          {historys.length !== 0 ? (
            <React.Fragment>
              {historys.map((e) => (
                <VocabularyCard
                  word={e}
                  key={Math.random()}
                  trush={true}
                  delfunction={removeItem}
                />
              ))}
            </React.Fragment>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default history;
