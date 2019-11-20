let TRANSLATIONS_DIR = './translations'

process.argv.forEach(option => {
  const [ flag, value ] = option.split(/=/)
  if(!value) return

  switch(flag) {
    case '--translations-dir': {
      TRANSLATIONS_DIR = value
      break
    }
  }
})

const fs = require('fs')
const csv = require('csv-parser')

console.log('')
console.log('Preparing to create json translation files from csv...')
console.log('')

let defaultTranslationObj = {}
let filesToParse = []

fs.readdir(TRANSLATIONS_DIR, (err, files) => {
  if(!err) {
    files.forEach((file, index) => {
      if(!/^[a-z]{2}\.csv$/.test(file)) return

      const jsonFilename = file.replace(/\.csv$/, '.json')

      filesToParse.push(file)
      const translationObj = files.includes(jsonFilename)
        ? JSON.parse(fs.readFileSync(`${TRANSLATIONS_DIR}/${jsonFilename}`, 'utf8'))
        : {}

      fs.createReadStream(`${TRANSLATIONS_DIR}/${file}`)
        .pipe(csv())
        .on('data', data => {

          const category = data['CATEGORY (do NOT modify)']
          const textToTranslate = data['TEXT TO TRANSLATE (do NOT modify)']
          let translation = data['TRANSLATION (edit this column)']
          const notes = data['NOTES (do NOT modify)']

          const translationSwaps = translation.match(/\{\{.*?\}\}/g) || []
          const textToTranslateSwaps = textToTranslate.match(/\{\{.*?\}\}/g) || []

          if(
            translationSwaps.length !== textToTranslateSwaps.length
            || (
              translationSwaps.length > 1
              && (
                [...new Set(translationSwaps)].length !== translationSwaps.length
                || translationSwaps.some(swap => !textToTranslateSwaps.includes(swap))
              )
            )
          ) {
            console.log('')
            console.log(`INVALID TRANSLATION (${file}):`)
            console.log(`${textToTranslate} -> ${translation}`)
            console.log('')
            return
          }

          if(translationSwaps.length === 1) {
            // correct for when they translated the swap
            translation = translation.replace(/\{\{.*\}\}/, textToTranslate.match(/\{\{.*\}\}/)[0])
          }

          if(!translationObj[category]) {
            translationObj[category] = {}
          }

          if(notes && !translationObj[category][textToTranslate]) {
            translationObj[category][textToTranslate] = {}
          }
          
          if(notes) {
            translationObj[category][textToTranslate][notes] = translation
          } else {
            translationObj[category][textToTranslate] = translation
          }

        })
        .on('end', () => {

          fs.writeFileSync(`${TRANSLATIONS_DIR}/${jsonFilename}`, JSON.stringify(translationObj, null, 2))
          console.log(`Created json file: ${jsonFilename}.`)
    

          filesToParse = filesToParse.filter(f => f !== file)

          if(filesToParse.length === 0) {
            console.log('')
            console.log('Done.')
            console.log('')
            process.exit()
          }
        })

    })
  } 

})