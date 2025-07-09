import SearchArea from "@/components/SearchArea";
import VocabularyCard from "@/components/VocabularyCard";
import { icons } from "@/constraints/icons";
import { DictinaryObject } from "@/interface/meaning";
import { fetchSelectedWordFromDictionaryApi } from "@/services/meaning";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const search = () => {
  const router = useRouter();
  const [data, setData] = useState<DictinaryObject | null>(null);

  const handleEnterPress = async (search: string) => {
    try {
      const fetchedData = await fetchSelectedWordFromDictionaryApi(search);
      // console.log(fetchedData);
      fetchedData && setData(fetchedData);
    } catch (error) {
      console.log(error);
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
