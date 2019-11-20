import React from 'react'
import { getPreSwapTranslation, textToHtml } from './i18n'

const i18nReact = (...params) => {

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


export default i18nReact