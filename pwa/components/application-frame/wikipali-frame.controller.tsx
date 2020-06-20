import React from 'react';
import { UIState } from '../../lib/ui-state';
import { injectable } from 'tsyringe';
import { WikipaliFrameView } from './wikipali-frame.views';
import { action } from 'mobx';
import { Observer } from 'mobx-react';

@injectable()
export class WikipaliFrameController {
  constructor(
    private uiState: UIState
  ) {}
  render = (children: React.ReactNode) => (
    <Observer render={() =>
      <WikipaliFrameView
      locale={this.uiState.locale}
      loggedInUser={this.uiState.loggedInUser}
      onChangeLocale={this.onChangeLocale}
      children={children} />
    } />
  )
  @action.bound
  private onChangeLocale(locale: string) {
    this.uiState.locale = locale
  }
}

