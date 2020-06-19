export interface WikipaliDocument {
    title: string
    blocks: Block[]
}

export type WikipaliDocumentChanges = unknown;

export interface Block {
    id: string
    headings: BlockHeading[]
    tokens: Token[]
    // sentences: Sentence[]
}

export interface BlockHeading {}

// export interface Sentence {
//     words: Word[]
//     freeTranslation: string
// }

export type Token = {
    word?: Word,
    punc?: Punctuation
};

export type Word = {
    id: string
    text: string
    analysis: Analysis
}

export type Punctuation = {
    id: string
    text: string
}

export interface Analysis {
    gloss: string;
    morphemes: string;
    morphemeGlosses: string
    grammar: string
}


// export interface Document {
//     paragraphs: () => id[]
//     tokens: (paragraph: id) => id[]
//     source: () => void
//     wordText: (word: id) => string;
//     punctuationText: (punctuation: id) => string;
//     isWord: (token: id) => boolean;
//     isPunctuation: (token: id) => boolean;  
//     analysis: (word: id) => WordAnalysis
// }


// export enum WordDeclension {
//     Nominative = 'nom',
//     Vocative = 'voc',
//     Accusative = 'acc',
//     Instrumental = 'inst',
//     Ablative = 'abl',
//     Dative = 'dat',
//     Genitive = 'gen',
//     Locative = 'loc'
// }

// export enum WordPartOfSpeech {

// }

// export enum WordGender {
//     Male = 'm',
//     Female = 'f',
//     Neuter = 'nt'
// }

// export enum WordNumber {

// }
