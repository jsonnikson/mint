import React, { ReactElement, HTMLAttributes } from 'react';
import { Block, Punctuation, Word, WikipaliDocument } from '../../lib/wikipali-document';
import styles from './document-editor.styles'
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(styles);

export type DocumentEditorProps = {
    doc: WikipaliDocument,
    renderBlock: (block: Block) => ReactElement
}

export const DocumentEditor = ({doc, renderBlock}: DocumentEditorProps) => {
    return (
        <div>{doc.blocks.map(renderBlock)}</div>
    )
}

export type BlockViewProps = {
    block: Block
    renderPunctuation: (punc: Punctuation) => ReactElement
    renderWord: (word: Word) => ReactElement
}

export const BlockView = (props: BlockViewProps) => {
    const classes = useStyles();
    return (
        <div className={classes.blockContainer}>
            {props.block.tokens.map(token => {
                if (token.punc) return props.renderPunctuation(token.punc);
                else if (token.word) return props.renderWord(token.word);
            })}
        </div>
    ) 
}

export interface WordAnalysisProps extends HTMLAttributes<any> {
    isActive?: boolean
    word: Word,
    glossInput: () => ReactElement
    morphemesInput: () => ReactElement
    morphemeGlossesInput: () => ReactElement
    grammarInput: () => ReactElement
}
  
export const WordAnalysisComponent = ({
    isActive = false, word, glossInput, morphemesInput, morphemeGlossesInput, grammarInput, ...props
}: WordAnalysisProps) => {
    const classes = useStyles();
    const containerClass = clsx(
        classes.tokenContainer,
        classes.wordToken,
        {
            [classes.activeToken]:isActive
        }
    );
    return (
        <div className={containerClass} {...props}>
            <div className={classes.tokenText}>{word.text}</div>
            {glossInput()}
            {morphemesInput()}
            {morphemeGlossesInput()}
            {grammarInput()}
        </div>
    )
};

export interface PunctuationAnalysisProps extends HTMLAttributes<any> {
    punctuation: Punctuation,
}

export const PunctuationAnalysisComponent = (props: PunctuationAnalysisProps) => {
    const classes = useStyles();
    return (
        <div className={classes.tokenContainer}>
            <div className={classes.tokenText}>{props.punctuation.text}</div>
        </div>
    )
}