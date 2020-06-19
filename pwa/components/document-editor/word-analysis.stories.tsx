import React from 'react';
import {WordAnalysisComponent} from './document-editor.views';
import { Word } from '../../lib/wikipali-document';
import { styled, Box } from '@material-ui/core';

export default {
  title: 'Document Editor/Word Analysis',
  component: WordAnalysisComponent,
};

const word: Word = {
  id: 'some-word',
  text: "ārabbha",
  analysis: {
    gloss: "不好習誦的污垢",
    morphemes: "asajjhāya+mala+ā",
    morphemeGlosses: "不習誦+垢+[等]",
    grammar: "n.a.#m.pl.nom.",  
  }  
}

const StyledPlaceholder = styled('div')({
  border: 'solid lightgray 1px'
})

function placeholder(name: string) {
  return () => <StyledPlaceholder>{name}</StyledPlaceholder>
}

export const Inactive = () => (
  <WordAnalysisComponent
    isActive={false}
    word={word}
    glossInput={placeholder('gloss')}
    morphemesInput={placeholder('morphemes')}
    morphemeGlossesInput={placeholder('morpheme glosses')}
    grammarInput={placeholder('grammar')}
  />
);

export const Active = () => (
  <WordAnalysisComponent
    isActive={true}
    word={word}
    glossInput={placeholder('gloss')}
    morphemesInput={placeholder('morphemes')}
    morphemeGlossesInput={placeholder('morpheme glosses')}
    grammarInput={placeholder('grammar')}
  />
);

export const SideBySide = () => (
  <Box display="flex">
    <WordAnalysisComponent
      isActive={false}
      word={word}
      glossInput={placeholder('gloss')}
      morphemesInput={placeholder('morphemes')}
      morphemeGlossesInput={placeholder('morpheme glosses')}
      grammarInput={placeholder('grammar')}
    />
    <WordAnalysisComponent
      isActive={true}
      word={word}
      glossInput={placeholder('gloss')}
      morphemesInput={placeholder('morphemes')}
      morphemeGlossesInput={placeholder('morpheme glosses')}
      grammarInput={placeholder('grammar')}
    />
  </Box>
)