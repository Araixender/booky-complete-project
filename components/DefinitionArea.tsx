import { icons } from "@/constraints/icons";
import { Meaning } from "@/interface/meaning";
import * as Clipboard from 'expo-clipboard';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function DefinitionArea({ partOfSpeech, definitions }: Meaning) {
  return (
    <View className="bg-white mx-3 rounded-md my-2">
      <View className="flex py-4 px-6 flex-row justify-between items-center border-b-2 border-secondary">
        <Text className="text-2xl font-semibold text-primary">
          Definitions({partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)})
        </Text>
        <TouchableOpacity onPress={() => Clipboard.setString(definitions[0].definition) }>
          <Image source={icons.copy} />
        </TouchableOpacity>
      </View>
      <View className="px-6 py-4 ">
        {definitions.map((def, index) => (
          <React.Fragment
            key={Math.random().toString(36).substring(2, 100) + Date.now()}
          >
            <Text className="text-[#343635] leading-6">{def.definition}</Text>
            {index !== definitions.length - 1 ? (
              <View className="border-[.4px] border-gray-400 my-4 mx-9"></View>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
