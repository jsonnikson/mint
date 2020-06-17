import React from 'react'
import ReactDOM from 'react-dom';
import { IntlProvider, IntlConfig } from 'react-intl';
import { UIState } from '../lib/ui-state';
import { observer } from 'mobx-react'
import Home from './index'

const messagesForLocale = (locale: string): IntlConfig['messages'] => ({
  en: require('../lang/en'),
  zh: require('../lang/zh')
}[locale] || {})

const App = observer((props: {uiState: UIState}) => {
  const { uiState } = props
  return (
    <IntlProvider locale={uiState.locale}
                  messages={messagesForLocale(uiState.locale)}>
      <Home uiState={uiState} />
    </IntlProvider>
  );
})

const uiState = new UIState()

ReactDOM.render(
  <React.StrictMode>
    <App uiState={uiState} />
  </React.StrictMode>,
  document.getElementById('root')
);