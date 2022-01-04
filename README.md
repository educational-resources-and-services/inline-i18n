# inline-i18n

## Goals

* Make i18n setup unintrusive to coding
* Give programmers the ability to directly find where English text is used

## Assumptions

* Most of the time, the exact same English text should be translated the same. 

## Notes about parameters

* English is written inline with i18n wrapper around it.
* Any optional string parameters must precede swaps and options parameters
* All string parameters must be simple string literals using " or '

## Usage examples

```js
i18n("Library")  // The first string parameter is the English text
i18n("{{num_results}} results!", { num_results: this.props.numResults })  // The first object parameter is the optional swaps
i18n("Back", "i.e. go back")  // The second string parameter is an optional clarifying description 
i18n("Back", "i.e. the back of the book")  // Differing descriptions create separate variables to translate
i18n("John", "", "book")  // The third string parameter is an optional category, which can be useful to help translators or to mix translation sets
i18n("John", {}, { textToHtml: true })  // The second object is the options. Options include: textToHtml [boolean], locale (an override, particularly useful on the backend)
```

## Libraries and modules

Any codebase which may be imported into another must import i18n with a namespace so as to avoid conflicts. Do this by calling the default export as a function for both i18n and i18nReact.

```js
// Normal import examples:
import { i18n } from 'inline-i18n'
import i18nReact from 'inline-i18n/build/i18nReact'

// Import examples for a library named `my-library`:
const { i18n } = require('inline-i18n')('my-library')
const i18nReact = require('inline-i18n/build/i18nReact')('my-library')
```