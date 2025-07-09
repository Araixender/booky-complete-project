import { icons } from "@/constraints/icons";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabIcon = ({ focused, title, icon, focusedIcon }: any) => {
  if (focused) {
    return (
      <>
        <View className="size-full justify-center items-center pt-5 h-20  w-20">
          <Image source={focusedIcon} />
          <Text className="text-varient font-semibold">{title}</Text>
        </View>
      </>
    );
  }
  return (
    <View className="size-full justify-center items-center pt-5 h-20  w-20">
      <Image source={icon} />
      <Text className="text-varient font-semibold">{title}</Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#5A827E",
          borderColor: "#B9D4AA",
          borderTopWidth: 3,
          height: 110,
          paddingTop: 5,
          borderTopColor: "#B9D4AA",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              title={"Home"}
              icon={icons.home}
              focusedIcon={icons.homeHighlight}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="search"
        options={{
          title: "search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title={"Search"}
              icon={icons.searchIconNotHighlighted}
              focusedIcon={icons.searchIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "bookmark",
          headerShown: false,
          tabBarIcon: ({focused}) => (
           <TabIcon
              focused={focused}
              title={"Bookmark"}
              icon={icons.save}
              focusedIcon={icons.bookmarkHighlight}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          headerShown: false,
          tabBarIcon: ({focused}) => (
           <TabIcon
              focused={focused}
              title={"History"}
              icon={icons.history}
              focusedIcon={icons.historyHighlight}
            />
          ),
        }}
      />
     
    </Tabs>
  );
}
