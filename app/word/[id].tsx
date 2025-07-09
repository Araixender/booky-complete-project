import DefinitionArea from "@/components/DefinitionArea";
import { icons } from "@/constraints/icons";
import { DictinaryObject } from "@/interface/meaning";
import { fetchSelectedWordFromDictionaryApi } from "@/services/meaning";
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const WordMeaning = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<DictinaryObject | null>(null);
  
  useEffect(() => {
    (async () => {
      setData((await fetchSelectedWordFromDictionaryApi(id)) || null);
    })();
  }, []);

  const playSound  = async () => {
    const {sound} = await Audio.Sound.createAsync({ uri: data?.audio || "" })
    await sound.playAsync();
  }
  
  return (
    <>
      <View className="min-h-32 bg-primary flex flex-row justify-between items-center gap-3 px-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.back} />
        </TouchableOpacity>
        <Text className="font-imp text-xl text-varient font-bold">BOOKY</Text>
        <View className="w-7"></View>
      </View>
      <View className="bg-primary min-h-20 flex justify-start items-center">
        <Text className="text-4xl font-semibold text-background">
          {id[0].toUpperCase() + id.slice(1)}
        </Text>
        <Text className="mt-4 text-secondary ">{data && data.phonetic}</Text>
      </View>
      <View className="bg-primary min-h-20 items-center pt-4 pb-4 flex justify-center flex-row gap-2">
        <TouchableOpacity className="bg-secondary w-14 h-14 flex justify-center items-center rounded-lg" onPress={() => data?.word && Clipboard.setString(data?.word)}>
          <Image source={icons.copy} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-secondary w-14 h-14 flex justify-center items-center rounded-lg">
          <Image source={icons.bookmark} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-secondary w-14 h-14 flex justify-center items-center rounded-lg">
          <Image source={icons.share} />
        </TouchableOpacity>
        <TouchableOpacity
          className={`${data?.audio ? "bg-secondary" : "bg-gray-300"} w-14 h-14 flex justify-center items-center rounded-lg`}
          onPress={playSound}
          disabled={data?.audio ? false: true}
        >
          <Image source={icons.sound} />
        </TouchableOpacity>
      </View>
      <SafeAreaProvider>
        <SafeAreaView className="bg-primary">
          <ScrollView className="bg-background my-2 pb-20 h-full">
            {data &&
              data.meanings.map((d) => (
                <DefinitionArea key={Math.random().toString(36).substring(2, 10) + Date.now()} {...d} />
              ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default WordMeaning;
