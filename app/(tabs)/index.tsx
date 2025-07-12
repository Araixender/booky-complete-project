import SearchArea from "@/components/SearchArea";
import VocabularyCard from "@/components/VocabularyCard";
import { fetchWord } from "@/services/word";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const App = () => {
  const [wordArray, setWordArray] = useState<string[] | null>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setWordArray(await fetchWord());
        // console.log(wordArray);
      })();
    }, [])
  );

  return (
    <>
      <View className="min-h-36 bg-primary flex justify-center items-center gap-3 pt-10">
        <Text className="font-imp text-xl text-varient font-bold">BOOKY</Text>
        <Link href={"/(tabs)/search"}>
          <SearchArea disable={false} />
        </Link>
      </View>
      <ScrollView className="bg-background h-full pt-4 w-full">
        <View className="h-full w-full pb-6">
          {wordArray == null ? (
            <ActivityIndicator />
          ) : (
            wordArray.map((e) => (
              <VocabularyCard
                key={Date.now() + (Math.random() + 1).toString(36).substring(7)}
                word={e}
              />
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default App;
