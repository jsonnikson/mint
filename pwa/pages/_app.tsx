import "reflect-metadata"

import React from 'react'
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { UIState } from '../lib/ui-state';
import { Observer } from 'mobx-react'

import {container, injectable, inject} from "tsyringe";
import { SupportedLocales } from '../lib/supported-locales';
import { computed, autorun } from 'mobx';
import { HomeController } from "./index";
import { Theme, ThemeProvider } from '@material-ui/core';
import '../lib/theme'

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
      <IntlProvider
      locale={this.uiState.locale} 
      messages={this.messagesForLocale}>
        <ThemeProvider theme={this.theme}>
          {this.homeController.render()}
        </ThemeProvider>
      </IntlProvider>
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