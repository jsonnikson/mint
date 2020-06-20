import { IntlProvider } from 'react-intl';
import { SupportedLocales } from '../../lib/supported-locales';
import { container } from 'tsyringe'

const supportedLocales = container.resolve(SupportedLocales)

export const contexts = [
    {
        icon: 'globe',
        title: 'i18n',
        components: [
            IntlProvider
        ],
        params: supportedLocales.locales.map(locale => ({
            name: locale.locale,
            props: {
                locale: locale.locale,
                messages: supportedLocales.messagesForLocale(locale.locale)
            },
        }))
    },
  ];
  