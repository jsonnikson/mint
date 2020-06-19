import React from 'react';
import {GlossSuggestions} from './gloss-suggestions';
import { action } from '@storybook/addon-actions';
import { Observer } from 'mobx-react';

export default {
  title: 'Document Editor/Gloss Suggestions',
  component: GlossSuggestions,
};

export const Basic = () => <Observer render={() => {
  if (!suggestions) return <p>Loading...</p>
  return (
    <GlossSuggestions 
      suggestions={suggestions}
      onSelect={action('Gloss changed')}
    />
  )
}} />

const suggestions = [
  {
    "dictionary": "user",
    "gloss": "這",
    "type": ".pron.",
  },
  {
    "dictionary": "user",
    "gloss": "這個",
    "type": ".pron.",
  },
  {
    "dictionary": "user",
    "gloss": "此",
    "type": ".pron.",
  },
  {
    "dictionary": "user",
    "gloss": "此",
    "type": ".part.",
  },
  {
    "dictionary": "user",
    "gloss": "这",
    "type": ".pron.",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這",
    "type": "",
  },
  {
    "dictionary": "shuihan",
    "gloss": "此",
    "type": "",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這個",
    "type": "",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這樣",
    "type": "",
  },
  {
    "dictionary": "shuihan",
    "gloss": "",
    "type": "",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這",
    "type": ".n.",
  },
  {
    "dictionary": "shuihan",
    "gloss": "此",
    "type": ".n.",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這個",
    "type": ".n.",
  },
  {
    "dictionary": "shuihan",
    "gloss": "這樣",
    "type": ".n.",
  }
]