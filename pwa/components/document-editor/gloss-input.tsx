import React, { useState, HTMLAttributes } from 'react';
import { ButtonToInput } from '../button-to-input';
import { GlossSuggestions } from './gloss-suggestions';
import { GlossSuggestion } from '../../lib/autosuggest';

export interface GlossInputProps {
    gloss: string,
    suggestions?: GlossSuggestion[],
    onChange?: (value: string) => void
}

const PopupBox = (props: HTMLAttributes<HTMLDivElement>) => {
    const {children, ...divProps} = props;
    const containerStyle: React.CSSProperties = {
        position: 'relative'
    };
    const innerStyle: React.CSSProperties = {
        position: 'absolute',
        maxWidth: 300,
        cursor: 'default'    
    }
    return (
        <div {...divProps} style={containerStyle}>
            <div style={innerStyle}>
                {children}
            </div>
        </div>
    )
}

export const GlossInput = (props: GlossInputProps) => {
    if (props.suggestions) console.log(props.suggestions);
    const [isActive, setIsActive] = useState(false)
    const onSelect = (value: string) => {
        setIsActive(false);
        if (props.onChange) props.onChange(value);
    }
    console.log(isActive, props.suggestions)
    return (
        <ButtonToInput
            value={props.gloss}
            placeholder="?"
            onChange={props.onChange}
            onIsActive={setIsActive}>
            {!isActive ? null : <PopupBox>
                <GlossSuggestions 
                suggestions={props.suggestions}
                onSelect={onSelect}
                />
            </PopupBox>}
        </ButtonToInput>
    )
}

