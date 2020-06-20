import React from 'react';
import { UIState } from '../../lib/ui-state';
import { injectable } from 'tsyringe';
import { WikipaliFrameView } from './wikipali-frame.views';
import { action } from 'mobx';
import { Observer } from 'mobx-react';
import { SupportedLocales } from '../../lib/supported-locales';

@injectable()
export class WikipaliFrameController {
  constructor(
    private uiState: UIState,
    private supportedLocales: SupportedLocales
  ) {}
  render = (children: React.ReactNode) => (
    <Observer render={() =>
      <WikipaliFrameView
        locale={this.uiState.locale}
        supportedLocales={this.supportedLocales.locales}
        loggedInUser={this.uiState.loggedInUser}
        onChangeLocale={this.onChangeLocale}
        children={children}
      />
    } />
  )
  @action.bound
  private onChangeLocale(locale: string) {
    this.uiState.locale = locale
  }
}

