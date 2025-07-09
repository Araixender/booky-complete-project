import SearchArea from '@/components/SearchArea';
import VocabularyCard from '@/components/VocabularyCard';
import { icons } from '@/constraints/icons';
import { fetchWord } from '@/services/word';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [wordArray, setWordArray] = useState<string[] | null>()
useEffect(() => {
  (async () => {
    setWordArray(await fetchWord())

  })()
}, [])

  return (
    <>
      <View className='min-h-36 bg-primary flex justify-center items-center gap-3 pt-10'>
        <Text className='font-imp text-xl text-varient font-bold' >BOOKY</Text>
        <SearchArea />
      </View>
      <ScrollView className='bg-background h-full py-4 w-full'>
        {wordArray == null ? <ActivityIndicator />: 
        wordArray.map(e => (
          <VocabularyCard key={Date.now() + (Math.random() + 1).toString(36).substring(7)} word={e}/>

        ))
        
        }
      </ScrollView>
    </>
  );
};

export default App;