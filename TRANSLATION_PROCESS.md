# Translation Files Import and Export
## This document explains the process to export i18n tags that need to be translated, how to re-import the translated files and then how to update the existing translated code.

### Part 1: Insert i18n tags into your code
* Please see `i18n.js` for full instructions on how to use the i18n tags.

### Part 2: Create the JSON file for translation

### Part 3: Export translation file (creating a Google spreadsheet of i18n messages that still need translation)
1. before running translate, make sure that any existing language csv files ARE DELETED (they will not be overwritten))
2. in terminal: `npm run translate`
3. you will have three files now per language, a JSON file, a JSON-incomplete file, and a csv-incomplete file
  for example, after running translate on `es.json`, I gain `es-incomplete.json` and `es-incomplete.csv`. 
4. the csv file can be uploaded to a spreadsheet for translators to use. The left column will have the original
  phrase with any tags (For example: `"Yes, make me an accountability partner for {{name}}"`).
  The translator will write in the right-hand column the translation for everything NOT IN tags.
  For our example, the translation into Spanish would look like: `"Sí, conviértase en socio de responsabilidad para {{name}}"`
  (note that the tage {{name}} is not translated)


### Part 4: Import the completed translations 
* #### Once translation is complete, the spreadsheet will need to be converted back to a csv file, and then brought in and converted to a json file.
1. convert the translated spreadsheet back into a csv file
2. make sure that the name of the csv file is {{language}}.csv, for example, `es.csv` (for Spanish) or `fr.csv` (for French)
3. import the language csv file to your code base
4. in terminal: `npm run translate-convert-csv-to-json`
  output in terminal will indicate which files were run, as well as any invalid translations that need to be fixed.
  The incomplete-json file will contain the new translations and can be copied into the
  langugage json file.
