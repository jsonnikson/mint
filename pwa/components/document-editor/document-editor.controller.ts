import React from 'react';
import { Word, Block, WikipaliDocument, Punctuation } from '../../lib/wikipali-document'
import { GlossInput } from './gloss-input'
import { WordAnalysisComponent, BlockView, PunctuationAnalysisComponent, DocumentEditor } from './document-editor.views';
import { observable, computed } from 'mobx'
import { createObserver } from '../../lib/utils';

const getGlossSuggestions = (word: string) => []

export class DocumentEditorController {
    render(doc: WikipaliDocument) {
        
        const state = observable({
            selectedWordId: null as string|null,
            loadedDocument: doc,
        });

        const isWordSelected = (word: Word) => computed(() => state.selectedWordId===word.id).get()
        const glossSuggestions = (word: Word) => {
            if (isWordSelected(word)) return getGlossSuggestions(word.text);
            else return
        }

        function renderBlock(block: Block) {
            return React.createElement(BlockView, {
                key: block.id,
                block,
                renderWord,
                renderPunctuation
            });
        }
    
        function renderWord(word: Word) {
            return createObserver(WordAnalysisComponent, () => ({
                key: word.id,
                word: word,
                isActive: isWordSelected(word),
                onFocus: () => state.selectedWordId = word.id,
                onClick: () => state.selectedWordId = word.id,
                glossInput: renderGlossInput(word),
                morphemesInput: renderMorphemesInput,
                morphemeGlossesInput: renderMorphemeGlossesInput,
                grammarInput: renderGrammarInput
            }))
        }
    
        function renderPunctuation(punc: Punctuation){
            return React.createElement(PunctuationAnalysisComponent, {
                key: punc.id,
                punctuation: punc
            })
        }
        function renderGlossInput(word: Word) {
            const onChange = (value: string) => {
                word.analysis.gloss = value;
            }
            return () => createObserver(GlossInput, () => ({
                gloss: word.analysis.gloss,
                onChange,
                suggestions: glossSuggestions(word)
            }))
        }
        function renderMorphemesInput(){
            return React.createElement('div');
        }
        function renderMorphemeGlossesInput(){
            return React.createElement('div');
    
        }
        function renderGrammarInput(){
            return React.createElement('div');
        }

        return React.createElement(DocumentEditor, { doc, renderBlock })
    }

}
