import React from 'react';
import { UIState } from '../../lib/ui-state';
import { injectable } from 'tsyringe';
import { createObserver } from '../../lib/utils';
import { WikipaliFrameView } from './wikipali-frame.views';

@injectable()
export class WikipaliFrameController {
  constructor(
    private uiState: UIState
  ) {}
  render(children: React.ReactNode) {
    const {
      locale,
      loggedInUser
    } = this.uiState
    return createObserver(WikipaliFrameView, () => ({
      locale,
      onChangeLocale: locale => {
        this.uiState.locale = locale
      },
      loggedInUser,
      children
    }))
  }
}

