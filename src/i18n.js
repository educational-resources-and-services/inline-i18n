const namespaces = {}

const getI18nByNamespace = namespace => {
  if(!namespace || typeof namespace !== 'string') {
    throw new Error("You must pass a single string parameter to getI18nByNamespace. Use “default” for the base set.")
  }
  if(!namespaces[namespace]) {
    namespaces[namespace] = getI18nSandbox()
  }
  return namespaces[namespace]
}

const getI18nSandbox = () => {

  const textToHtml = textString => {
    let htmlEncoded = textString
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>")
      .replace(/  /g, '&nbsp; ')

    return htmlEncoded
  }

  const allTranslations = {}
  let globalLocale = 'en'
  const fetchAttemptedLocales = ['en']
  const categorySpecificLocales = {}
  let fetchLocale, localesUrl, determineLocaleFromOptions, translationsToDump
  let translationModifier = str => str

  // get determineUILanguageId and setUpI18n from elsewhere, when I develop it

  const i18nSetup = ({ locales, translations, prepDump, hydrate, ...params }) => new Promise(resolve => {
    fetchLocale = params.fetchLocale
    localesUrl = params.localesUrl
    determineLocaleFromOptions = params.determineLocaleFromOptions
    translationModifier = params.translationModifier || translationModifier

    if(prepDump && !translationsToDump) {
      translationsToDump = {}
    }

    if(translations) {
      Object.keys(translations).forEach(locale => {
        allTranslations[locale] = getTranslationsWithoutCategories(translations[locale])
      })
    }

    if(hydrate) {
      Object.keys(hydrate).forEach(locale => {
        if(!allTranslations[locale]) {
          allTranslations[locale] = JSON.parse(JSON.stringify(hydrate[locale]))
        }
      })
    }

    if((locales || []).length > 0) {
      return Promise.all(locales.map(locale => setLocale({ locale })))
        .then(() => {
          setLocale({ locale: locales[0] }).then(resolve)
        })
    }

    resolve()
  })

  const getLocale = category => (categorySpecificLocales[category] || globalLocale)

  const isRTL = locale => [ 'he', 'ar', 'dv', 'ku', 'fa', 'ur' ].includes(locale || globalLocale)

  const getRTLAdjustedRight = locale => isRTL(locale) ? 'left' : 'right'
  const getRTLAdjustedLeft = locale => isRTL(locale) ? 'right' : 'left'

  const getTranslationsWithoutCategories = translationsInCategories => Object.assign({}, ...Object.values(translationsInCategories))

  const setLocale = ({ locale, category }) => {

    if(category) {
      categorySpecificLocales[category] = locale
    } else {
      globalLocale = locale
    }

    return i18nPrefetch(locale)

  }

  const i18nPrefetch = locale => new Promise(resolve => {

    if(!fetchAttemptedLocales.includes(locale)) {

      fetchAttemptedLocales.push(locale)

      try {

        if(fetchLocale) {
          return fetchLocale(locale)
            .then(translationsInCategories => {
              allTranslations[locale] = getTranslationsWithoutCategories(translationsInCategories)
              resolve()
            })
    
        } else if(localesUrl) {
          return fetch(`${localesUrl}/${locale}.json`)
            .then(result => result.json()
              .then(translationsInCategories => {
                allTranslations[locale] = getTranslationsWithoutCategories(translationsInCategories)
                resolve()
              })
            )
        }

      } catch(err) {
        console.log(`Failed to get translations for ${locale}`, err)
      }
      
    }

    resolve()

  })

  const i18nDump = () => {
    const dump = JSON.stringify(translationsToDump || {})
    return dump
  }

  const getPreSwapTranslation = params => translationModifier(getPreModifiedTranslation(params), { ...params, locale: getLocale(params.category) })

  const getPreModifiedTranslation = ({ str="", desc="", category="default", options={} }) => {
    const localeToUse = (
      options.locale
      || (
        determineLocaleFromOptions
        && determineLocaleFromOptions(options)
      )
      || categorySpecificLocales[category]
      || globalLocale
    )
    const translations = allTranslations[localeToUse] || {}
    const translationSet = translations[str]
    
    if(translationSet === undefined) {
      return str

    } else {
      if(translationsToDump && !translationsToDump[localeToUse]) {
        translationsToDump[localeToUse] = {}
      }

      if(translationSet[desc] === undefined) {
        if(translationsToDump) {
          translationsToDump[localeToUse][str] = translationSet
        }
        return translationSet

      } else {
        if(translationsToDump && !translationsToDump[localeToUse][str]) {
          translationsToDump[localeToUse][str] = {}
        }

        if(translationsToDump) {
          translationsToDump[localeToUse][str][desc] = translationSet[desc]
        }
        return translationSet[desc]
      }
    }
  }

  const i18n = (...params) => {

    if(params.length === 0) return ""

    const str = params.shift()
    const desc = typeof params[0] === 'string' ? params.shift() : undefined
    const category = typeof params[0] === 'string' ? params.shift() : undefined
    const swaps = typeof params[0] === 'object' ? params.shift() : {}
    const options = typeof params[0] === 'object' ? params.shift() : {}

    let translatedText = getPreSwapTranslation({ str, desc, category, options })

    if(options.textToHtml) {
      translatedText = textToHtml(translatedText)
    }

    translatedText = translatedText.replace(/{{([^}]+)}}/g, (x, swapVar) => swaps[swapVar]!==undefined ? swaps[swapVar] : "")

    return translatedText
  }

  const hebrewNums = Array(200)
    .fill(0)
    .map((x, idx) => {
      let num = idx
      let letters = ''

      if(num >= 100) {
        letters += 'ק'
        num -= 100
      }

      if(num === 15) {
        letters += 'טו'
        num = 0
      }

      if(num === 16) {
        letters += 'טז'
        num = 0
      }

      if(num >= 10) {
        letters += 'יכלמנסעפצ'.substr(parseInt(num / 10) - 1, 1)
        num %= 10
      }

      if(num >= 1) {
        letters += 'אבגדהוזחט'.substr(num - 1, 1)
        num = 0
      }

      return letters
    })

  const i18nNumber = ({ num, type, category }) => {

    switch(getLocale(category)) {
      case 'he': {

        if([ 'formal', 'chapter' ].includes(type)) {
          return hebrewNums[num]
        }

        break
      }
    }

    return num
  }

  return {
    i18n,
    i18nSetup,
    getLocale,
    isRTL,
    getRTLAdjustedRight,
    getRTLAdjustedLeft,
    setLocale,
    i18nPrefetch,
    i18nDump,
    getPreSwapTranslation,
    textToHtml,
    i18nNumber,
  }

}

const defaultI18n = getI18nByNamespace('default')

for(let key in defaultI18n) {
  getI18nByNamespace[key] = defaultI18n[key]
}

module.exports = getI18nByNamespace