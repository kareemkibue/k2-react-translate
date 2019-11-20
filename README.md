# k2-react-translate

[![Build Status](https://travis-ci.org/kareemkibue/k2-react-utils.svg?branch=master)](https://travis-ci.org/kareemkibue/k2-react-utils)
[![Coverage Status](https://coveralls.io/repos/github/kareemkibue/k2-react-utils/badge.svg?branch=master)](https://coveralls.io/github/kareemkibue/k2-react-utils?branch=master)

A simple, easy-to-use translation library based on Context API, with optional localized routing.

## Table of Contents
- [Problem Statement](#problem-statement)
- [Setup](#setup)
- [Documentation](#documentation)
- [Development](#development)
- [Changelog](#changelog)

## Problem Statement
TBD


## Setup
This ES5 module is distributed via [npm](https://www.npmjs.com/package/k2-react-translate) and should be installed as a production dependency.

Using _yarn_ (recommended)
```
yarn add -E k2-react-translate
```

or via _npm_
```
npm i -S -E k2-react-translate
```

### `peerDependencies`
- [`react@16.2.0+`](https://github.com/facebook/react)
    - `react@16.8.0+` would have to be installed to use the `useTranslate` hook.
- [`react-dom@16.2.0+`](https://github.com/facebook/react/tree/master/packages/react-dom)

### `optionalDependencies`
- [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

Type definitions come bundled in.

### Project Setup
If using TypeScript in VS Code, add the following configuration to your `tsconfig.json` to allow for importing json files:
```jsonc
// tsconfig.json
{
    "compilerOptions": {
        // other config options ...
        "resolveJsonModule": true,
    }
}
```

Setup your translations
```jsonc
// translations.json
{
    "HELLO":{
        "en":"Hello",
        "fr":"Bonjour"
    },    
    "HELLO_NAME":{
        "en":"Hello, {firstName}",
        "fr":"Bonjour, {firstName}"
    },    
    "AVAILABLE_IN_COUNTRY":{
        "en":"Available in {countryName}",
        "fr":"Disponsible en {countryName}"
    },
     "PRIVACY_POLICY": {
        "en": "<a href='{link}'>Privacy Policy</a>",
        "fr": "<a href='{link}'>Politique de Confidentialité</a>"
    },
}
```


```tsx
// index.tsx
import * as React from 'react'; // standard TypeScript syntax
import * as ReactDOM from 'react-dom'; // standard TypeScript syntax
import { LocaleProvider } from 'k2-react-translate'
import { App } from './App';
import translations from './translations.json';  


ReactDOM.render(
    <LocaleProvider translations={translations} languages={['en','fr']}>
        <App/>
    </LocaleProvider>,
    document.getElementById('app')
);
```

## Documentation 

`k2-react-translate` barrels (re-exports) the following sub-modules as named exports:

### `<LocaleProvider/>` - [source](https://github.com/kareemkibue/k2-react-utils/blob/master/src/LocaleProvider.tsx)

A Context API wrapper to `<LocaleContext.Provider/>`.

Props | Type | Description
---|---|---
`translations` | Object (required) | See [translations under Project Setup](#Project-Setup)
`languages` | Array<string> (required) | An array of language codes. Used as [`params`](https://scotch.io/courses/using-react-router-4/route-params) to `react-router` if you choose to incorporate localized routing into your app.
`defaultLanguage` | string (optional) | Default language, Must be included in the `languages` array above


*Usage*

See [Project Setup](Project-Setup) above.

-----

### `useTranslate` - [source](https://github.com/kareemkibue/k2-react-utils/blob/master/src/useTranslate.ts)

A custom hook for use in Function Components. 

**Dependencies:** `react@16.8.0+`, `react-dom@16.8.0+`

*Usage*
```tsx
// MyComponent.tsx
import * as React from 'react'; // standard TypeScript syntax
import { useTranslate } from 'k2-react-translate';

const links = {
    'en': '/en/privacy-policy',
    'fr': '/fr/privacy-policy'
}

const MyComponent: React.FunctionComponent<{}>=()=>{
    const { translate, translateAndParse, language } = useTranslate();

    return <div>
        {translate('HELLO')}
        {translate('HELLO_NAME', {firstName: 'Jaqen'})}        
        {translateAndParse('PRIVACY_POLICY', {link: links[language] })}
    </div>;
}
```


----

### `<Translator/>` - [source](https://github.com/kareemkibue/k2-react-utils/blob/master/src/Translator.tsx)

A React component that wraps `<LocaleContext.Consumer/>` that performs translations, given translation keys as prop arguments.

If using `react v16.8.0+`, I'd strongly recommend using the `useTranslate` hook [above](#useTranslate) works in the same way but provides for cleaner and less verbose use. 


Props | Type | Description
---|---|---
`id` | string (optional) | translation key
`vars` | object (optional) | dynamic translation variables, set outside the `translations.json`
`render` | function (optional) | render prop, returning `(language:string)=>ReactNode`
`parseHtml` | boolean (optional), `default=false` | option to sanitize and parse stringified HTML set in the `translations.json`

*Usage*
```tsx
// MyComponent.tsx
import * as React from 'react'; // standard TypeScript syntax
import { Translator } from 'k2-react-translate';

const links = {
    'en': '/en/privacy-policy',
    'fr': '/fr/privacy-policy'
}

const MyComponent: React.StatelessComponent<{}>=()=>{
    return <div>
        <Translator id="HELLO" />
        <Translator id="HELLO_NAME" vars={{firstName: 'Jaqen'}} />
        <Translator id="PRIVACY_POLICY" vars={{link: links[language] }} />
    </div>;
}
```


---





## Development
- Run `yarn` on the root of the repository.
- Run `yarn start` to start the project.
- Run `yarn test:watch` to ammend tests.

## Changelog

Version | Log
---|---
0.3.0 | - Update docs
0.2.0 | - Publish missing sub-modules
0.1.0 | - Initial publish