import React from 'react';
import { Word, Block, WikipaliDocument, Punctuation } from '../../lib/wikipali-document'
import { GlossInput } from './gloss-input'
import { WordAnalysisComponent, BlockView, PunctuationAnalysisComponent, DocumentEditor } from './document-editor.views';
import { observable, computed, action } from 'mobx'
import { Observer } from 'mobx-react'
import { injectable } from 'tsyringe';

const getGlossSuggestions = (word: string) => []

class State {
    @observable selectedWordId: string|null
    @observable loadedDocument: WikipaliDocument
    isWordSelected = (word: Word) => computed(() => this.selectedWordId===word.id).get()
    glossSuggestions = (word: Word) => {
        if (this.isWordSelected(word)) return getGlossSuggestions(word.text);
        else return
    }
}

@injectable()
export class DocumentEditorController {
    render = (doc: WikipaliDocument) => {
        const state = Object.assign(new State(), {
            selectedWordId: null,
            loadedDocument: doc
        })

        return (
            <DocumentEditor
                doc={state.loadedDocument}
                renderBlock={this.renderBlock(state)}
            />
        )
    }

    private renderBlock = (state: State) => (block: Block) => (
        <BlockView
            key={block.id}
            block={block}
            renderWord={this.renderWord(state)}
            renderPunctuation={this.renderPunctuation}
        />
    )

    private renderWord = (state: State) => (word: Word) => (
        <Observer render={() => 
            <WordAnalysisComponent
                key={word.id}
                word={word}
                isActive={state.isWordSelected(word)}
                onFocus={() => state.selectedWordId = word.id}
                onClick={() => state.selectedWordId = word.id}
                glossInput={this.renderGlossInput(state, word)}
                morphemesInput={this.renderMorphemesInput}
                morphemeGlossesInput={this.renderMorphemeGlossesInput}
                grammarInput={this.renderGrammarInput}
            />
        }/>
    )

    private renderPunctuation = (punc: Punctuation) => (
        <PunctuationAnalysisComponent
            key={punc.id}
            punctuation={punc}
        />
    )

    private renderGlossInput = (state: State, word: Word) => () => (
        <Observer render={() => 
            <GlossInput
                gloss={word.analysis.gloss}
                onChange={(value: string) => {word.analysis.gloss = value}}
                suggestions={state.glossSuggestions(word)}
            />
        }/>
    )

    private renderMorphemesInput = () => <div />
    private renderMorphemeGlossesInput = () => <div />
    private renderGrammarInput = () => <div />
}
