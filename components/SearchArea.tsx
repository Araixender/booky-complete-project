import { icons } from "@/constraints/icons";
import { useState } from "react";
import { Image, TextInput, View } from "react-native";

const SearchArea = ({ handleEnter, disable = true }: any) => {
  const [search, setSearch] = useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="flex flex-row justify-center items-center gap-3 bg-white w-96 rounded-md px-3">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor={"#1c1b1b"}
      />
      <TextInput
        editable={disable}
        placeholder="Search a word"
        className="text-slate-700 flex-1"
        value={search}
        onChangeText={handleSearch}
        onSubmitEditing={() => handleEnter(search)}
      />
    </View>
  );
};

export default SearchArea;
