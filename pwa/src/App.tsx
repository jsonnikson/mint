import React from 'react'
import { WikipaliFrame } from './wikipali-frame'
import { IntlProvider, FormattedMessage, IntlConfig } from 'react-intl';
import { UIState } from './ui-state';
import { observer } from 'mobx-react'

const messagesForLocale = (locale: string): IntlConfig['messages'] => ({
  en: require('./translations/en'),
  zh: require('./translations/zh')
}[locale] || {})

const uiState = new UIState()

function App() {
  return (
    <IntlProvider locale={uiState.locale}
                  messages={messagesForLocale(uiState.locale)}>
      <WikipaliFrame locale={uiState.locale}
                     onChangeLocale={value => uiState.locale = value}>
        <FormattedMessage id="hello-world" />
      </WikipaliFrame>
    </IntlProvider>
  );
}

export default observer(App);
