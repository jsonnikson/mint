import React from 'react'
import { IntlProvider } from 'react-intl';
import { UIState } from '../lib/ui-state';
import { Observer } from 'mobx-react'
import {container, injectable, inject} from "tsyringe";
import { SupportedLocales } from '../lib/supported-locales';
import { computed, autorun, action } from 'mobx';
import { HomeController } from "./index";
import type { Theme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'
import '../lib/theme'

@injectable()
class AppController {
  constructor(
    private supportedLocales: SupportedLocales,
    private homeController: HomeController,
    private uiState: UIState,
    @inject('Theme') private theme: Theme
  ) {}
  render = ({ Component, pageProps, locale, messages }) => {
    React.useEffect(() => {
      // Remove the SSR injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
      // Initialize locale info from server
      action(() => this.uiState.locale = locale)
    }, []);
    return (
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
  }
  @computed private get messagesForLocale() {
    return this.supportedLocales.messagesForLocale(this.uiState.locale);
  }
}

const render: any = container.resolve(AppController).render
render.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  const { req } = ctx
  const locale = req?.locale ?? ''
  const messages = req?.messages ?? {}

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx))
  }

  return { pageProps, locale, messages }
}

export default render