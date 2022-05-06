# Translation Files Import and Export
## This document explains the process to export i18n tags that need to be translated, how to re-import the translated files and then how to update the existing translated code.

### Part 1: Insert i18n tags into your code
* Please see `i18n.js` for full instructions on how to use the i18n tags.

### Part 2: Create the JSON file for translation

### Part 3: Export translation file (creating a Google spreadsheet of i18n messages that still need translation)
1. **before running translate, make sure that any existing csv files, and -incomplete.json ARE DELETED (both `{{language}}.csv` and `{{language}}-incomplete.csv` and `{{language}}-incomplete.json`), for ALL the langauges, whether there have been new translations or not.**
2. in terminal: `npm run translate`
3. you will now have new `{{language}}-incomplete.csv` files for each language json file.
4. all of the new files need to imported to spreadsheets, because there are always code changes happening that can affect the translation sheets, so they should always be updated to make sure they are accurate.
5. to import: in given spreadsheet, `file -> import -> upload -> (drag file in) -> replace sheet/spreadsheet`
6. you may need to adjust text wrap if text is overflowing the column `format -> text wrapping -> wrap`
7. The left column will have the original phrase with any tags (For example: `"Yes, make me an accountability partner for {{name}}"`).
  The translator will write in the right-hand column the translation for everything NOT IN tags.
  For our example, the translation into Spanish would look like: `"Sí, conviértase en socio de responsabilidad para {{name}}"`
  (note that the tage {{name}} is not translated)
8. NOTE! Delete all rows that are for the category 'gp', we do not need translations for these.


### Part 4: Import the completed translations 
* #### Once translation is complete, the spreadsheet will need to be converted back to a csv file, and then brought in and added to the json file.
1. Delete incomplete rows in spreadsheet. Importing the translation overwrites existing data, so an incomplete translation will overwrite was was previously there, including previous translations.
    * NOTE! Be aware that there are things that may be left blank on purpose (for example, "-" used as a word separator may not have a translation as such in a given language, but simply be a blank space). If in the middle of a translated file there is an empty translation, check to make sure it is not one of these. If there is a large section of untranslated work and some of these are within the section, assume they have not been translated yet.
2. download the translated and edited-for-incomple-rows spreadsheet as a csv file (`file -> download -> comma separated values(.csv, current sheet)`)
3. change the csv file name to {{language}}.csv, for example, `es.csv` (for Spanish) or `fr.csv` (for French)
4. import the language csv file to your code base (can just drag it in)
5. prepare csv files for all languages you wish to convert (the translate-convert command will do multiple at once)
6. in terminal: `npm run translate-convert-csv-to-json`
  output in terminal will indicate which files were run, as well as any invalid translations (which are ignored).
  The new translations will autmatically be brought into the existing {{language}}.json file.
7. review the affected json files to make sure that everything was copied/edited correctly.
8. delete the new {{language}}.csv files that you just brought in, and commit the new json files.


#### NOTE: Though written in the order of first exporting to a spreadsheet and then importing from the spreadsheet, after the initial creation of the json files and exporting to a spreadsheet, the process will generally run opposite. As translators do their work, you will start by bringing in newly translated messages (Part 4), then creating new incomplete.csv files to export so that translation can continue (Part 3).
