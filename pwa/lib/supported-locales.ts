export interface ISupportedLocale {
    locale: string
    text: string
}
export const supportedLocales: ISupportedLocale[] = [
    {
        locale: 'en',
        text: 'English'
    },
    {
        locale: 'zh',
        text: '中文'
    }
]