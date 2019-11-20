const path = require('path');
const findInFiles = require('find-in-files')
const fs = require('fs')

const TRANSLATION_NEEDED = "TRANSLATION NEEDED"
const BASE_DIR = path.resolve(__dirname, '../../..')
let PARSE_DIRS = [ 'src' ]
let EXCLUDE_REGEX = /^$/
let TRANSLATIONS_DIR = './translations'

process.argv.forEach(option => {
  const [ flag, value ] = option.split(/=/)
  if(!value) return

  switch(flag) {
    case '--parse-dirs': {
      PARSE_DIRS = value.split(/[ ,]/g).filter(Boolean)
      break
    }
    case '--parse-exclude-regex': {
      EXCLUDE_REGEX = new RegExp(value)
      break
    }
    case '--translations-dir': {
      TRANSLATIONS_DIR = value
      break
    }
  }
})

/*

  Example json translation file:

    {
      "default": {
        "Library here!": "TRANSLATION NEEDED",
        "Library {{here}}!": "TRANSLATION NEEDED",
        "Back": {
          "i.e. go back": "TRANSLATION NEEDED",
          "i.e. the back of the book": "TRANSLATION NEEDED"
        }
      },
      "Books": {
        "Genesis": "TRANSLATION NEEDED",
        "Exodus": "TRANSLATION NEEDED",
      }
    }

  The i18n/i18nReact function parameters: str, desc, category, swaps, options

*/

console.log('')
console.log('Preparing to create translations needed files...')
console.log('')

const langsGettingNewFile = []
const langsNotGettingNewFile = []
let defaultTranslationObj = {}

// go through all files in src and extract calls to i18n()/i18nReact, building out the default json
let allResults = {}
Promise.all(PARSE_DIRS.map(dir => new Promise(resolve => {
  findInFiles.find(`i18n(?:React)?\\((?:[\\s\\n,]|\`(?:\\\\.|[^\`])*\`|"(?:\\\\.|[^"])*"|'(?:\\\\.|[^'])*')*`, dir, '\\.js$')
    .then(results => {
      allResults = {
        ...allResults,
        ...results,
      }
      resolve()
    })
}))).then(() => {

  for(let path in allResults) {
    if(/(?:^|\/)i18n(?:React)?\.js$/.test(path)) continue
    if(EXCLUDE_REGEX.test(path)) continue

    const res = allResults[path]
    res.matches.forEach(match => {
      const parts = match.match(/^i18n(?:React)?\([\s\n]*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')(?:[\s\n]*,[\s\n]*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'))?(?:[\s\n]*,[\s\n]*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'))?[\s\n,]*$/)

      if(!parts) {
        // report bad i18n in the code and exit
        console.log(`Bad i18n form in ${path}: ${match}`, parts)
        process.exit()
      }

      const engText = parts[1].replace(/^["'](.*)["']$/, '$1').replace(/\\(.)/g, '$1')
      const desc = (parts[2] || "").replace(/^["'](.*)["']$/, '$1').replace(/\\(.)/g, '$1')
      let category = (parts[3] || "default").replace(/^["'](.*)["']$/, '$1').replace(/\\(.)/g, '$1')

      for(let c in defaultTranslationObj) {
        if(typeof defaultTranslationObj[c][engText] !== 'undefined') {
          category = c
          break
        }
      }

      if(!defaultTranslationObj[category]) {
        defaultTranslationObj[category] = {}
      }

      if(!desc) {
        if(typeof defaultTranslationObj[category][engText] === 'object') {
          defaultTranslationObj[category][engText][""] = TRANSLATION_NEEDED
        } else if(typeof defaultTranslationObj[category][engText] === 'undefined') {
          defaultTranslationObj[category][engText] = TRANSLATION_NEEDED
        }

      } else {
        if(typeof defaultTranslationObj[category][engText] === 'string') {
          defaultTranslationObj[category][engText] = {
            "": defaultTranslationObj[category][engText],
          }
        } else if(typeof defaultTranslationObj[category][engText] !== 'object') {
          defaultTranslationObj[category][engText] = {}
        }

        if(typeof defaultTranslationObj[category][engText][desc] === 'undefined') {
          defaultTranslationObj[category][engText][desc] = TRANSLATION_NEEDED
        }
      }

    })
  }

  // for each translation file (except English)
  fs.readdir(`${BASE_DIR}/${TRANSLATIONS_DIR}`, (err, files) => {
    if(!err) {
      files.forEach((file, index) => {
        if(['en.json'].includes(file)) return
        if(files.includes(file.replace(/\.json$/, '-incomplete.json'))) return

        const lang = file.replace(/(?:\-incomplete)?\.json$/, '')
        const translationObj = JSON.parse(fs.readFileSync(`${BASE_DIR}/${TRANSLATIONS_DIR}/${file}`, 'utf8'))
        const newTranslationObj = JSON.parse(JSON.stringify(defaultTranslationObj))
        
        // fill in the default json where language variables are missing
        for(let category in translationObj) {
          for(let engText in translationObj[category]) {
            if(newTranslationObj[category]) {
              if(typeof translationObj[category][engText] === 'object') {
                if(typeof newTranslationObj[category][engText] === 'object') {
                  for(let desc in translationObj[category][engText]) {
                    if(newTranslationObj[category][engText][desc] !== undefined) {
                      newTranslationObj[category][engText][desc] = translationObj[category][engText][desc]
                    }
                  }
                } else if(newTranslationObj[category][engText] !== undefined) {
                  if(translationObj[category][engText][""] !== undefined) {
                    newTranslationObj[category][engText] = translationObj[category][engText][""]
                  }
                } else {  // can we put it in a different category?
                  Object.keys(newTranslationObj).forEach(alternateCategory => {
                    if(translationObj[alternateCategory][engText] !== undefined) return  // that category already translates this eng text
                    if(newTranslationObj[alternateCategory][engText] === 'object') {
                      for(let desc in translationObj[category][engText]) {
                        if(newTranslationObj[alternateCategory][engText][desc] !== undefined) {
                          newTranslationObj[alternateCategory][engText][desc] = translationObj[category][engText][desc]
                        }
                      }
                    } else if(newTranslationObj[category][engText] !== undefined && translationObj[category][engText][""] !== undefined) {
                      newTranslationObj[category][engText] = translationObj[category][engText][""]
                    }
                  })
                }
              } else {
                if(typeof newTranslationObj[category][engText] === 'object') {
                  if(newTranslationObj[category][engText][""] !== undefined) {
                    newTranslationObj[category][engText][""] = translationObj[category][engText]
                  }
                } else if(newTranslationObj[category][engText] !== undefined) {
                  newTranslationObj[category][engText] = translationObj[category][engText]
                } else {  // can we put it in a different category?
                  Object.keys(newTranslationObj).forEach(alternateCategory => {
                    if(translationObj[alternateCategory][engText] !== undefined) return  // that category already translates this eng text
                    if(newTranslationObj[alternateCategory][engText] === 'object') {
                      if(newTranslationObj[alternateCategory][engText][""] !== undefined) {
                        newTranslationObj[alternateCategory][engText][""] = translationObj[category][engText]
                      }
                    } else if(newTranslationObj[alternateCategory][engText] !== undefined) {
                      newTranslationObj[alternateCategory][engText] = translationObj[category][engText]
                    }
                  })
                }
              }
            }
          }
        }

        const incompleteFileContent = JSON.stringify(newTranslationObj, null, '\t')

        if(incompleteFileContent.indexOf(TRANSLATION_NEEDED) !== -1) {
          fs.writeFileSync(`${BASE_DIR}/${TRANSLATIONS_DIR}/${lang}-incomplete.json`, incompleteFileContent)
          langsGettingNewFile.push(lang)
        } else {
          langsNotGettingNewFile.push(lang)
        }
      })
    } 

    langsGettingNewFile.length && console.log(`Created translation file(s) for ${langsGettingNewFile.join(', ')}.`)
    langsNotGettingNewFile.length && console.log(`Full translations already provided for ${langsNotGettingNewFile.join(', ')}.`)
    console.log('')
    console.log('Done.')
    console.log('')

    process.exit()
  })

})
