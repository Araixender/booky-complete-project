export interface Definitions {
    definition: string;
}


export interface Meaning {
    partOfSpeech: string;
    definitions: Definitions[];
}


export interface DictinaryObject {
    word: string;
    phonetic?: string;
    audio?: string;
    meanings: Meaning[];
}