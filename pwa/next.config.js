const withTM = require('next-transpile-modules')([
  '@formatjs/intl-relativetimeformat',
  '@formatjs/intl-utils',
  'react-intl',
  'intl-format-cache',
  'intl-messageformat-parser',
  'intl-messageformat',
  'reflect-metadata'
])

module.exports = withTM({
  webpack: function (cfg, {isServer}) {
    const shouldAddReflect = (entry) => isServer ? true : entry==='main.js'
    const addReflect = (entry) => ['reflect-metadata', ...(Array.isArray(entry) ? entry : [entry])]

    return {
      ...cfg,
      entry: cfg.entry().then(entries =>
        Object.fromEntries(Object.entries(entries).map(([key, entry]) => {
          if (shouldAddReflect) return [key, addReflect(entry)]
          else return [key, entry]
        }))
      )
    }
  }
})