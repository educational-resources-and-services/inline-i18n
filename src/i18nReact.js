import React from 'react'
import getI18nByNamespace from './i18n'

const getI18nReactByNamespace = namespace => (...params) => {

  const { getPreSwapTranslation, textToHtml } = getI18nByNamespace(namespace)

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

  const translatedPieces = translatedText
    .split(/({{(?:[^}]+)}})/g)
    .map(piece => {

      const [ x, swapVar ] = piece.match(/^{{([^}]+)}}$/) || []

      if(swapVar) {
        return (
          swaps[swapVar] !== undefined
            ? (
              <React.Fragment key={swapVar}>
                {swaps[swapVar]}
              </React.Fragment>
            )
            : ""
        )
      }

      return piece
    })

  return translatedPieces
}

const defaultI18nReact = getI18nReactByNamespace('default')

for(let key in defaultI18nReact) {
  getI18nReactByNamespace[key] = defaultI18nReact[key]
}

export default getI18nReactByNamespace