import React from 'react';
import { action } from '@storybook/addon-actions';
import { WikipaliFrameView } from './wikipali-frame.views';
import { FormattedMessage } from 'react-intl';
import { container } from 'tsyringe';
import { SupportedLocales } from '../../lib/supported-locales';

export default {
  title: 'Application Frame',
  component: WikipaliFrameView,
};

export const Basic = () => (
    <WikipaliFrameView locale="en"
                       supportedLocales={container.resolve(SupportedLocales).locales}
                       onChangeLocale={action("change local")}
                       loggedInUser={null}>
        <FormattedMessage id="hello-world" />
    </WikipaliFrameView>
)