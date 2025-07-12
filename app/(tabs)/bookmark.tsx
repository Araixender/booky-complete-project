import VocabularyCard from "@/components/VocabularyCard";
import { icons } from "@/constraints/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const bookmark = () => {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<String[]>([]);

  const bookmarkGetter = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("bookmark");
      const savedBookmarkArray = savedBookmarks?.split(",");
      savedBookmarkArray !== undefined &&
        setBookmarks(savedBookmarkArray.reverse());
      // console.log(savedBookmarkArray/);
    } catch (error) {}
  };

  const clearBookMark = async () => {
    try {
      await AsyncStorage.removeItem("bookmark");
      // bookmarkGetter();
      setBookmarks([]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (word: string) => {
    try {
      const listOfBookmarks: String[] = (
        (await AsyncStorage.getItem("bookmark")) || ""
      ).split(",");
      const listOffilteredBookmarks = listOfBookmarks.filter(
        (item) => item !== word
      );

      await AsyncStorage.setItem(
        "bookmark",
        listOffilteredBookmarks.toString()
      );
      setBookmarks(listOffilteredBookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      bookmarkGetter();
    }, [])
  );

  return (
    <React.Fragment>
      <View className="min-h-28 bg-primary flex flex-row justify-between items-center gap-3 px-4 pt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.back} />
        </TouchableOpacity>
        <Text className="font-imp text-xl text-varient font-bold">
          Bookmark
        </Text>
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
          {bookmarks.length !== 0 ? (
            <React.Fragment>
              {bookmarks.map((e) => (
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

export default bookmark;
