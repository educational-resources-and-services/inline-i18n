INSERT i18n TAGS INTO CODE
  for example: `formErrors.email = i18n("Please enter a valid email.")`
  for full instructions and information on how to use the i18n tags, see i18n.js

CREATE JSON FILE FOR TRANSLATION

EXPORT FILE TO BE TRANSLATED: This process creates an excell-type spreadsheet of i18n messages that still need translation.
  CONVERT JSON FILE TO CSV
      1- before running translate, make sure that any existing language csv files ARE DELETED (they will not be overwritten))
      2- in terminal: `npm run translate`
      3- you will have three files now per language, a JSON file, a JSON-incomplete file, and a csv-incomplete file
        for example, after running translate on `es.json`, I gain `es-incomplete.json` and `es-incomplete.csv`. 
      4- the csv file can be uploaded to a spreadsheet for translators to use. The left column will have the original
        phrase with any tags. For example: "Yes, make me an accountability partner for {{name}}"
        The translator will write in the right-hand column the translation for everything NOT IN tags.
        For the above example: "Sí, conviértase en socio de responsabilidad para {{name}}"
        (note that the tage {{name}} is not translated)


IMPORT COMPLETED TRANSLATIONS: Once translators are finished with the excell sheet, it will need to be converted back to a
  csv file, and then brought in and converted to a json file.
  CONVERT CSV FILE TO JSON
      1- convert the translated spreadsheet back into a csv file
      2- make sure that the name of the csv file is {{language}}.csv, for example, `es.csv` (for Spanish) or `fr.csv` (for French)
      3- import the language csv file to your code base
      4- in terminal: `npm run translate-convert-csv-to-json`
        output in terminal will indicate which files were run, as well as any invalid translations that need to be fixed.
        The incomplete-json file will contain the new translations and can be copied into the
        langugage json file.
