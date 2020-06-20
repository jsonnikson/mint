import "reflect-metadata"

import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { UIState } from '../lib/ui-state';
import { Observer } from 'mobx-react'

import {container, injectable, inject} from "tsyringe";
import { ISupportedLocale, SupportedLocales } from '../lib/supported-locales';
import { computed, autorun } from 'mobx';
import { HomeController } from "./index";
import { Theme, ThemeProvider } from '@material-ui/core';
import '../lib/theme'

interface IAppViewProps {
  locale: string
  messages: ISupportedLocale['messages'],
  render: () => ReactElement
}

const AppView = (props: IAppViewProps) => {
  const { locale, messages, render } = props
  return (
    <IntlProvider {...{locale, messages}}>
      {render()}
    </IntlProvider>
  );
}

@injectable()
class AppController {
  constructor(
    private supportedLocales: SupportedLocales,
    private homeController: HomeController,
    private uiState: UIState,
    @inject('Theme') private theme: Theme

  ) {}
  render = () => (
    <Observer render={() =>
      <ThemeProvider theme={this.theme}>
        <AppView
          locale={this.uiState.locale} 
          messages={this.messagesForLocale} 
          render={() => this.homeController.render()} 
        />
      </ThemeProvider>
    } />
  )
  @computed private get messagesForLocale() {
    return this.supportedLocales.messagesForLocale(this.uiState.locale);
  }
}

const uiState = container.resolve(UIState)
const appController = container.resolve(AppController)

autorun(() => console.log('locale',uiState.locale))

ReactDOM.render(
  <React.StrictMode>
    {appController.render()}
  </React.StrictMode>,
  document.getElementById('root')
);