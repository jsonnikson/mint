export interface WordAnalysisSuggestions {
    word: string,
    glossSuggestions: GlossSuggestion[],
    morphemeSuggestions: string[]
}

export interface GlossSuggestion {
    dictionary: string
    type: string
    gloss: string
}
