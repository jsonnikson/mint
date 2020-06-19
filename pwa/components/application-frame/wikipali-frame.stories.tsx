import React from 'react';
import { action } from '@storybook/addon-actions';
import { WikipaliFrame } from './wikipali-frame';
import { FormattedMessage } from 'react-intl';

export default {
  title: 'Application Frame',
  component: WikipaliFrame,
};

export const Basic = () => (
    <WikipaliFrame locale="en"
                   onChangeLocale={action("change local")}
                   loggedInUser={null}>
        <FormattedMessage id="hello-world" />
    </WikipaliFrame>
)