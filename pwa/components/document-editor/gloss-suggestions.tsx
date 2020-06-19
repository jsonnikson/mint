import React from 'react';
import { styled } from '@material-ui/core/styles';
import { GlossSuggestion } from '../../lib/autosuggest';

export type GlossSuggestionProps = {
    className?: string
    suggestions?: GlossSuggestion[]
    onSelect?: (value: string) => void
}

const StyledGlossSuggestions = styled('div')({
    backgroundColor: 'lightgray',
    boxShadow: '0px 3px 13px 0px rgba(0, 0, 0, 0.28)'
})

const SuggestionGroup = styled('div')({
    '&>header': {
        display: 'flex',
        justifyContent: 'space-between'    
    }
});

const DictLabel = styled('div')({
    backgroundColor: 'gray'
})

const TypeLabel = styled('div')({
    backgroundColor: 'gray'
})

const Suggestion = styled('button')({
    border: 'solid black 1px',
    cursor: 'pointer'
})

export const GlossSuggestions = (props: GlossSuggestionProps) => {
    let groupedSuggestions: GlossSuggestion[][] = [];
    if (props.suggestions) for (const x of props.suggestions) {
        const group = groupedSuggestions[groupedSuggestions.length-1];
        if (group && x.dictionary===group[0].dictionary && x.type===group[0].type)
            group.push(x);
        else
            groupedSuggestions.push([x])
    }
    
    return (
        <StyledGlossSuggestions className={props.className}>
            {!props.suggestions ? null : groupedSuggestions.map(group =>
                <SuggestionGroup>
                    <header>
                        <DictLabel>{group[0].dictionary}</DictLabel>
                        <TypeLabel>{group[0].type}</TypeLabel>
                    </header>
                    {group.map(suggestion => (
                        <Suggestion key={Object.values(suggestion).join('\n')}
                                    onClick={() => { if (props.onSelect) props.onSelect(suggestion.gloss) }}>
                            {suggestion.gloss}
                        </Suggestion>
                    ))}
                </SuggestionGroup>
            )}
        </StyledGlossSuggestions>
    )
    
    ;
}