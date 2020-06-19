import React from 'react';
import { action } from '@storybook/addon-actions';
import { WikipaliFrameView } from './wikipali-frame.views';
import { FormattedMessage } from 'react-intl';

export default {
  title: 'Application Frame',
  component: WikipaliFrameView,
};

export const Basic = () => (
    <WikipaliFrameView locale="en"
                       onChangeLocale={action("change local")}
                       loggedInUser={null}>
        <FormattedMessage id="hello-world" />
    </WikipaliFrameView>
)