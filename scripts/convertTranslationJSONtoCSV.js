const path = require('path');
const fs = require('fs')

const TRANSLATION_NEEDED = "TRANSLATION NEEDED"
const BASE_DIR = path.resolve(__dirname, '../../..')
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

console.log('')
console.log('Preparing to create csv translation files from json...')
console.log('')

let defaultTranslationObj = {}

fs.readdir(`${BASE_DIR}/${TRANSLATIONS_DIR}`, (err, files) => {
  if(!err) {
    files.forEach((file, index) => {
      if(!/-incomplete\.json$/.test(file)) return
      if(files.includes(file.replace(/\.json$/, '.csv'))) return

      // initialize with a header row
      const csvRows = [[
        `CATEGORY (do NOT modify)`,
        `TEXT TO TRANSLATE (do NOT modify)`,
        `TRANSLATION (edit this column)`,
        `NOTES (do NOT modify)`,
      ]]

      const translationObj = JSON.parse(fs.readFileSync(`${BASE_DIR}/${TRANSLATIONS_DIR}/${file}`, 'utf8'))
      
      for(let category in translationObj) {
        for(let engText in translationObj[category]) {

          const addRow = ({ desc="", translationText }) => {

            if(translationText !== TRANSLATION_NEEDED) {
              return
            }

            csvRows.push([
              category,
              engText,
              "",
              desc,
            ])

          }

          if(typeof translationObj[category][engText] === 'object') {
            for(let desc in translationObj[category][engText]) {
              addRow({ desc, translationText: translationObj[category][engText][desc] })
            }
          } else {
            addRow({ translationText: translationObj[category][engText] })
          }
        }
      }

      const csvContent = csvRows
        .map(csvRow => csvRow
          .map(cell => `"${cell.replace(/"/g, '""')}"`)
          .join(",")
        )
        .join("\n")

      fs.writeFileSync(`${BASE_DIR}/${TRANSLATIONS_DIR}/${file.replace(/\.json$/, '.csv')}`, csvContent)
      console.log(`Created csv file: ${file.replace(/\.json$/, '.csv')}.`)
    })
  } 

  console.log('')
  console.log('Done.')
  console.log('')

  process.exit()
})