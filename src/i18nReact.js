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
    .map((piece, idx) => {

      const [ x, swapVar ] = piece.match(/^{{([^}]+)}}$/) || []

      if(swapVar) {
        return (
          swaps[swapVar] !== undefined
            ? (
              <React.Fragment key={idx}>
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

export const i18nReact = getI18nReactByNamespace('default')

export default getI18nReactByNamespace

/*

  This does not work. Instead, create a i18nReact file in the codebase of the react app with the following code:

  import React from 'react'
  import { getPreSwapTranslation } from 'inline-i18n'

  const i18nReact = (...params) => {	

    if(params.length === 0) return ""

    const str = params.shift()
    const desc = typeof params[0] === 'string' ? params.shift() : undefined
    const category = typeof params[0] === 'string' ? params.shift() : undefined
    const swaps = typeof params[0] === 'object' ? params.shift() : {}
    const options = typeof params[0] === 'object' ? params.shift() : {}

    let translatedText = getPreSwapTranslation({ str, desc, category, options })

    const translatedPieces = translatedText
      .split(/({{(?:[^}]+)}})/g)
      .map((piece, idx) => {

        const [ x, swapVar ] = piece.match(/^{{([^}]+)}}$/) || []

        if(swapVar) {
          return (
            swaps[swapVar] !== undefined
              ? (
                <React.Fragment key={idx}>
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

  export default i18nReact

*/