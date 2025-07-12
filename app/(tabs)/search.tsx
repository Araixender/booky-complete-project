import SearchArea from "@/components/SearchArea";
import VocabularyCard from "@/components/VocabularyCard";
import { icons } from "@/constraints/icons";
import { DictinaryObject } from "@/interface/meaning";
import { fetchSelectedWordFromDictionaryApi } from "@/services/meaning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const search = () => {
  const router = useRouter();
  const [data, setData] = useState<DictinaryObject | null>(null);

  const handleEnterPress = async (search: string) => {
    try {
      const fetchedData = await fetchSelectedWordFromDictionaryApi(search);
      settingHistory(search);
      // console.log(fetchedData);
      fetchedData && setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  const settingHistory = async (word: string) => {
    try {
      const savedHistorys = await AsyncStorage.getItem("history");
      if (savedHistorys === null)
        return await AsyncStorage.setItem("history", word);
      const savedHistoryArray = savedHistorys?.split(",");
      savedHistoryArray?.push(word);
      console.log(savedHistoryArray);
      const uniqueHistoryArr = [...new Set(savedHistoryArray)];
      console.log(uniqueHistoryArr);
      const settingArrStr = uniqueHistoryArr?.join(",");
      console.log(settingArrStr);
      await AsyncStorage.setItem("history", settingArrStr as string);
      //   await AsyncStorage.removeItem("history");
    } catch (e: any) {
      //   console.error("Saving error", e);
      if (
        e.message.includes("Passing null/undefined as value is not supported")
      ) {
        try {
          console.log("code # 1");
          await AsyncStorage.setItem("history", word);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <View className="min-h-24 bg-primary flex flex-row justify-between items-center gap-3 px-4 pt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.back} />
        </TouchableOpacity>
        <Text className="font-imp text-xl text-varient font-bold">Search</Text>
        <View className="w-7"></View>
      </View>
      <View className="bg-primary pb-5">
        <View className="mx-auto ">
          <SearchArea handleEnter={handleEnterPress} />
        </View>
      </View>
      {data === null ? (
        <View className="min-h-screen bg-background ">
          <Text className="text-gray-600 text-center pt-10 text-sm">
            Start searching a word
          </Text>
        </View>
      ) : (
        <React.Fragment>
          {!data.word ? (
            <View className="min-h-screen bg-background ">
              <Text className="text-gray-600 text-center pt-10 text-sm">
                No Word Found
              </Text>
            </View>
          ) : (
            <View className="bg-background h-full py-4 w-full">
              <VocabularyCard word={data.word} />
            </View>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default search;
