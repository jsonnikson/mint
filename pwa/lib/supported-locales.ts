import { injectable } from "tsyringe";
import { IntlConfig } from "react-intl/lib/types";

export interface ISupportedLocale {
    locale: string
    text: string,
    messages: IntlConfig['messages']
}

export const supportedLocales: ISupportedLocale[] = [
    {
        locale: 'en',
        text: 'English',
        messages: require('../lang/en')
      
    },
    {
        locale: 'zh',
        text: '中文',
        messages: require('../lang/zh'),
    }
]

@injectable()
export class SupportedLocales {
    readonly locales = supportedLocales
    messagesForLocale(locale: string) {
        return this.locales.find(x=>x.locale===locale)?.messages || {}
    }
}

