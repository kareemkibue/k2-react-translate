import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocaleProvider } from '../src';
import { App } from './App';
import translations from './translations.json';

ReactDOM.render(
  <LocaleProvider
    translations={translations}
    languages={["en", "fr", "sw"]}
    defaultLanguage="en"
    localizeUrls={true}
  >
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);
