import { icons } from "@/constraints/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const VocabularyCard = ({ word }: any) => {
  const [isCheckedBookmark, setIsCheckedBookMark] = useState(false);
  const settingBookmark = async () => {
    setIsCheckedBookMark(!isCheckedBookmark);
    try {
      const savedBookmarks = await AsyncStorage.getItem("bookmark");
      console.log(savedBookmarks);
      const savedBookmarkArray = savedBookmarks?.split(",");
      savedBookmarkArray?.push(word);
      const settingArrStr = savedBookmarkArray?.join(",");
      console.log(settingArrStr);
      await AsyncStorage.setItem("bookmark", settingArrStr as string);
      //   await AsyncStorage.removeItem("bookmark");
    } catch (e: any) {
      //   console.error("Saving error", e);
      if (
        e.message.includes("Passing null/undefined as value is not supported")
      ) {
        try {
          await AsyncStorage.setItem("bookmark", "bookmark");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const path = `/word/${word}` as any;
  return (
    <View className="max-w-96 bg-white h-20 rounded-lg my-2 mx-auto">
      <Link href={path} asChild>
        <TouchableOpacity className="flex items-center w-full h-full p-3 flex-row">
          <View className="flex items-center flex-row gap-5 flex-1">
            <Image source={icons.asterisk} className="" />
            <Text className="text-xl text-primary font-bold">
              {word[0].toUpperCase() + word.slice(1)}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={settingBookmark}>
              <Image
                source={
                  !isCheckedBookmark ? icons.bookmark : icons.bookmarkBold
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default VocabularyCard;
