import { DictinaryObject } from "@/interface/meaning";

export async function fetchSelectedWordFromDictionaryApi(word: string | string[]){
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const data = await res.json();
      return combineAnObjectOfFetchedWord(data);
    } catch (error) {
      console.error(error);
    }
}

export async function combineAnObjectOfFetchedWord(data: any){
  const [{word, phonetic, meanings, phonetics}] = await data;

  const resultData: DictinaryObject= {
    word,
    phonetic: phonetic,
    audio: phonetics[0]?.audio,
    meanings,
  }
  // console.log(resultData)
  return resultData;
}


