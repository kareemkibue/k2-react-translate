# k2-react-translate

[![npm](https://img.shields.io/npm/v/k2-react-translate?flat)](https://www.npmjs.com/package/k2-react-translate)
<br/>
[![npm](https://img.shields.io/npm/dm/k2-react-translate?flat)](https://www.npmjs.com/package/k2-react-translate)
[![npm](https://img.shields.io/npm/dw/k2-react-translate?flat)](https://www.npmjs.com/package/k2-react-translate)
<br/>
[![GitHub issues](https://img.shields.io/github/issues/kareemkibue/k2-react-translate?flat)](https://github.com/kareemkibue/k2-react-translate/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/kareemkibue/k2-react-translate?flat)](https://github.com/kareemkibue/k2-react-translate/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc)
<br/>
[![GitHub](https://img.shields.io/github/license/kareemkibue/k2-react-translate?flat)](https://github.com/kareemkibue/k2-react-translate/blob/master/LICENSE)
<br/>
![GitHub stars](https://img.shields.io/github/stars/kareemkibue/k2-react-translate?style=social)
![GitHub stars](https://img.shields.io/github/forks/kareemkibue/k2-react-translate?style=social)
![GitHub stars](https://img.shields.io/github/watchers/kareemkibue/k2-react-translate?style=social)

A simple, easy-to-use translation library based on React's Context API, with optional localized `react-router` routing.

See demo on [CodeSandbox](https://codesandbox.io/s/confident-microservice-l0een).

[![image](https://user-images.githubusercontent.com/6430272/69345005-61690680-0c3e-11ea-9d1b-d82a16567e8e.png)](https://codesandbox.io/s/confident-microservice-l0een)

## Table of Contents

- [Problem Statement](#problem-statement)
- [Setup](#setup)
- [Documentation (Translation)](#documentation-translation)
- [Documentation (Localized Routing)](#documentation-localized-routing)
- [Development](#development)
- [Known Issues](#known-issues)
- [Changelog](#changelog)

## Problem Statement

TBD

## Setup

This ES5 module is distributed via [npm](https://www.npmjs.com/package/k2-react-translate) and should be installed as a production dependency.

Note: TypeScript syntax is used throughout the docs, but the library should run without issue on a `babel/react` setup.

Using _yarn_ (preferred)

```
yarn add -E k2-react-translate
```

or via _npm_

```
npm i -S -E k2-react-translate
```

### `peerDependencies`

- [`react@^16.2.0`](https://github.com/facebook/react)
  - `react@^16.2.0` would have to be installed to use the `useTranslate` hook.
- [`react-dom@^16.2.0`](https://github.com/facebook/react/tree/master/packages/react-dom)
- [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [`history`](https://github.com/ReactTraining/history)

<!-- ### `optionalDependencies` -->

Typescirpt type definitions come bundled in.

### Project Setup

If using TypeScript in VS Code, add the following configuration to your `tsconfig.json` to allow for importing json files into your modules:

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    // other config options ...
    "resolveJsonModule": true
  }
}
```

Setup your translations:

If using VS Code, the richie5um2's [Sort JSON objects](https://marketplace.visualstudio.com/items?itemName=richie5um2.vscode-sort-json) marketplace extension may help to keep your translations file organized.

```jsonc
// translations.json
{
  "HELLO": {
    "en": "Hello",
    "fr": "Bonjour"
  },
  "HELLO_NAME": {
    "en": "Hello, {firstName}",
    "fr": "Bonjour, {firstName}"
  },
  "AVAILABLE_IN_COUNTRY": {
    "en": "Available in {countryName}",
    "fr": "Disponsible en {countryName}"
  },
  "PRIVACY_POLICY": {
    "en": "<a href='{link}'>Privacy Policy</a>",
    "fr": "<a href='{link}'>Politique de Confidentialité</a>"
  }
}
```

Entry point:

```tsx
// index.tsx
import * as React from "react"; // standard TypeScript syntax
import * as ReactDOM from "react-dom"; // standard TypeScript syntax
import { LocaleProvider } from "k2-react-translate";
import { App } from "./App";
import translations from "./translations.json";

ReactDOM.render(
  <LocaleProvider
    translations={translations}
    languages={["en", "fr"]}
    localizeUrls={false}
  >
    <App />
  </LocaleProvider>,
  document.getElementById("app")
);
```

## Documentation (Translation)

`k2-react-translate` barrels (re-exports) the following sub-modules as named exports:

### `<LocaleProvider/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LocaleProvider.tsx)

A Context API wrapper to `<LocaleContext.Provider/>`. This wrapper is required to apply `k2-react-translate` translations.

| Props             | Type                                | Description                                                                                                                                                                                        |
| ----------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations`    | Object (required)                   | See [translations under Project Setup](#Project-Setup)                                                                                                                                             |
| `languages`       | Array<string> (required)            | An array of language codes. Used as [`params`](https://scotch.io/courses/using-react-router-4/route-params) to `react-router` if you choose to incorporate localized routing into your app.        |
| `defaultLanguage` | string (optional)                   | Default language, Must be included in the `languages` array above                                                                                                                                  |
| `localizedUrls`   | boolean (optional), default={false} | Option to localize URLs with every route change, page reload or language change. Additionally, add a `<Router/>` wrapper from `react-router`, meaning this need not be done in your `RouterConfig` |

#### Usage

See [Project Setup](Project-Setup) above.

---

### `useTranslate` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/useTranslate.ts)

A custom hook for use in Function Components.

**Dependencies:** `react@^16.8.0`, `react-dom@^16.8.0`

#### Usage

```tsx
// MyComponent.tsx
import * as React from "react"; // standard TypeScript syntax
import { useTranslate } from "k2-react-translate";

const links = {
  en: "/en/privacy-policy",
  fr: "/fr/privacy-policy"
};

const MyComponent: React.FunctionComponent<{}> = () => {
  const {
    translate,
    translateAndParse,
    language,
    changeLanguage
  } = useTranslate<string>();

  const handleClick = (): void => {
    // change language to French
    changeLanguage("fr");
  };

  return (
    <div>
      {translate("HELLO")}
      // "Hello" (en) - string // "Bonjour" (fr) - string
      {translate("HELLO_NAME", { firstName: "Jaqen" })}
      // "Hello, Jaqen" (en) - string // "Bonjour, Jaqen" (fr) - string
      {translateAndParse("PRIVACY_POLICY", { link: links[language] })}
      // <a href="/en/privacy-policy">Privacy Policy</a> (en) - ReactElement // <a href="/fr/privacy-policy">
        Politique de Confidentialité
      </a> (fr) - ReactElement
      <button onClick={handleClick}>Change Language</button>
    </div>
  );
};
```

---

### `<Translator/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/Translator.tsx)

A React component that wraps `<LocaleContext.Consumer/>` that performs translations, given translation keys as prop arguments.

If using `react v16.8.0+`, I'd strongly recommend using the `useTranslate` hook [above](#usetranslate---source) instead. `useTranslate` works in the same way but provides for cleaner and less verbose use.

| Props       | Type                                | Description                                                                  |
| ----------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| `id`        | string (optional)                   | translation key                                                              |
| `vars`      | object (optional)                   | dynamic translation variables, set outside the `translations.json`           |
| `render`    | function (optional)                 | render prop, returning `(language:string)=>ReactNode`                        |
| `parseHtml` | boolean (optional), `default=false` | option to sanitize and parse stringified HTML set in the `translations.json` |

#### Usage

```tsx
// MyComponent.tsx
import * as React from "react"; // standard TypeScript syntax
import { Translator } from "k2-react-translate";

const links = {
  en: "/en/privacy-policy",
  fr: "/fr/privacy-policy"
};

const MyComponent: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <Translator id="HELLO" />
      // "Hello" (en) - string // "Bonjour" (fr) - string
      <Translator id="HELLO_NAME" vars={{ firstName: "Jaqen" }} />
      // "Hello, Jaqen" (en) - string // "Bonjour, Jaqen" (fr) - string
      <Translator id="PRIVACY_POLICY" vars={{ link: links[language] }} />
      // <a href="/en/privacy-policy">Privacy Policy</a> (en) - ReactElement // <a href="/fr/privacy-policy">
        Politique de Confidentialité
      </a> (fr) - ReactElement
    </div>
  );
};
```

---

### `<LanguageSwitcher />` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LanguageSwitcher.tsx)

A button wrapped React component that provides the ability to set languages.

Switching languages can alternatively be performed under an exposed function in the `useTranslate` hook documented [here](#usetranslate---source).

| Props     | Type     | Description      |
| --------- | -------- | ---------------- |
| `onClick` | Function | Synthentic event |

#### Usage

```tsx
// MyComponent.tsx
import * as React from 'react'; // standard TypeScript syntax
import { LanguageSwitcher } from 'k2-react-translate';

const MyComponent: React.FunctionComponent<{}>=()=>{

    const handleClick:(changeLanguage: (language:string)=> void ): void=>{
        // change language to French
        changeLanguage('fr');
    }

    return <div>
        <LanguageSwitcher onClick={handleClick} />
    </div>;
}
```

## Documentation (Localized Routing)

Localized routing is optional. If used, `react-router-dom` would need to be installed as a production dependency.

### `<LocalizedRoutes/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LocalizedRoutes.tsx)

Provides a simple, non-intrusive way of setting up localized routes. Returns localized `<Route/>`s or `<Redirect/>`s components given the `routes` prop config.

If `<LocalizedRoutes/>` is used, you need not wrap your RouterConfig with `<Router/>` or `<BrowserRouter/>` as this is done within `<LocaleProvider/>`.

`<LocalizedRoutes/>` is not recursive.

| Props         | Type                                | Description                                                                |
| ------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| `routes`      | Array (required)                    | Based on `react-router-dom`'s props                                        |
| `localize`    | Boolean (optional), default=`true`  | Option to localize URLs (prepend the language code in the URL)             |
| `applySwitch` | Boolean (optional), default=`false` | Wrap the Route config with `<Switch/>` components. Required in most cases. |

#### Usage

```tsx
// RouteConfig.tsx
import * as React from "react"; // standard TypeScript syntax
import { LocalizedRoutes, Route } from "k2-react-translate";

const RouteConfig: React.FunctionComponent<{}> = () => {
  const routes: Route[] = [
    {
      path: "/", // resolves to /:language/, unless localize={false}
      exact: true,
      component: Home
    },
    {
      path: "/about", // resolves to /:language/about, unless localize={false}
      component: About,
      localize: true // should override <LocalizedRoutes localize={[true|false]} />
    },
    {
      // Redirect props
      to: "/page-not-found" // resolves to /:language/page-not-found, unless localize={false}
    }
  ];

  return (
    <div>
      <LocalizedRoutes applySwitch={true} routes={routes} />
    </div>
  );
};
```

---

### `<LocalizedRoute/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LocalizedRoute.tsx)

A localized wrapper to `react-router-dom`'s `Route`.

You wouldn't need to use `<LocalizedRoute/>` if [`<LocalizedRoutes/>`](#localizedroutes---source) is configured.

| Props      | Type                               | Description                                                                                 |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| ...props   | Object                             | Standard `<Route/>` component [props](https://reacttraining.com/react-router/web/api/Route) |
| `localize` | Boolean (optional), default=`true` | Option to localize URLs (prepend the language code in the URL)                              |

#### Usage

```tsx
// MyComponent.tsx
import * as React from "react"; // standard TypeScript syntax
import { LocalizedRoute } from "k2-react-translate";
import { Home } from "./Home";
import { About } from "./About";

const MyComponent: React.FunctionComponent<{}> = () => {
  return (
    <div>
      // automatically resolves to the "/:language" // if "en" is active, then
      "/en"
      <LocalizedRoute path="/" exact component={Home} />
      // automatically resolves to the "/:language/about-us" // if "en" is
      active, then "/en/about-us"
      <LocalizedRoute path="/about" component={About} />
    </div>
  );
};
```

---

### `<LocalizedLink/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LocalizedLink.tsx)

A localized wrapper to `react-router-dom`'s `<Link/>`.

| Props      | Type                               | Description                                                                               |
| ---------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| ...props   | Object                             | Standard `<Link/>` component [props](https://reacttraining.com/react-router/web/api/Link) |
| `localize` | Boolean (optional), default=`true` | Option to localize URLs (prepend the language code in the URL)                            |

#### Usage

```tsx
// MyComponent.tsx
import * as React from "react"; // standard TypeScript syntax
import { LocalizedLink } from "k2-react-translate";

const MyComponent: React.FunctionComponent<{}> = () => {
  return (
    <div>
      // automatically resolves to the "/:language/about-us" // if "en" is
      active, then "/en/about-us"
      <LocalizedLink to="/about-us">About Us</LocalizedLink>
    </div>
  );
};
```

---

### `<LocalizedRedirect/>` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/LocalizedRedirect.tsx)

A localized wrapper to `react-router-dom`'s `<Redirect/>`.

| Props      | Type                               | Description                                                                                       |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| ...props   | Object                             | Standard `<Redirect/>` component [props](https://reacttraining.com/react-router/web/api/Redirect) |
| `localize` | Boolean (optional), default=`true` | Option to localize URLs (prepend the language code in the URL)                                    |

#### Usage

```tsx
// MyComponent.tsx
import * as React from "react"; // standard TypeScript syntax
import { LocalizedRedirect } from "k2-react-translate";

const MyComponent: React.FunctionComponent<{}> = () => {
  // automatically resolves to the "/:language/page-not-found"
  // if "en" is active, then "/en/page-not-found"
  if (someCondition) {
    return <LocalizedRedirect to="/page-not-found">About Us</LocalizedRedirect>;
  }

  // alternatively, `props.history.push` would also resolve URLs by current langauge

  return <div />;
};
```

<!--
### `localizedHistory` - [source](https://github.com/kareemkibue/k2-react-translate/blob/master/src/localizedHistory.ts)

A localized instance of

Props | Type | Description
---|---|---
...props | Object | Standard `<Route/>` component [props](https://reacttraining.com/react-router/web/api/Redirect)
`localize` | Boolean (optional), default=`true`  | Option to localize URLs (prepend the language code in the URL)

#### Usage
```tsx
// MyComponent.tsx
import * as React from 'react'; // standard TypeScript syntax
import { LocalizedRedirect } from 'k2-react-translate';

const MyComponent: React.FunctionComponent<{}>=()=>{

    // automatically resolves to the "/:language/page-not-found"
    // if "en" is active, then "/en/page-not-found"
    if (someCondition){
        return <LocalizedRedirect to="/page-not-found">
            About Us
        </LocalizedRedirect>;
    }

    // alternatively, the `props.history` function would resolve URLs from current langauge

    return <div/>;
}
```

-->

## Development

- Run `yarn` on the root of the repository.
- Run `yarn start` to start the project.
- Run `yarn test:watch` to ammend tests.

## Known Issues

- Routing works with `<BrowserRouter/>` for now
- `<LocalizedNavLink/>` is yet to be adapted from `<NavLink/>`. `<LocalizedLink>` works equally as well, with the exception of the `activeClassName` prop.

<!--
## Changelog

| Version | Log                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------- |
| 0.5.0   | - Add `localizeUrl` LocaleProvider _prop_<br>- Add optional save language to LocalStorage if `localizeUrl` is false |
| 0.4.1   | - Add missing TypeScript declarations                                                                               |
| 0.4.0   | - Cleanup static LocaleProvider language codes<br>- Add examples<br>- Update docs                                   |
| 0.3.0   | - Update docs                                                                                                       |
| 0.2.0   | - Publish missing sub-modules                                                                                       |
| 0.1.0   | - Initial publishd                                                                                                  |

-->