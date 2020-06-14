import { IntlProvider } from 'react-intl';

const en = require('../../src/translations/en')
const zh = require('../../src/translations/zh')

export const contexts = [
    {
        icon: 'globe',
        title: 'i18n',
        components: [
            IntlProvider
        ],
        params: [
            { name: 'en', props: { locale: 'en', messages: en }},
            { name: 'zh', props: { locale: 'zh', messages: zh }},
        ]
    },
  ];
  