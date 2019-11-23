import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from '../src';
import { App } from './App';
import translations from './translations.json';

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider
      translations={translations}
      languages={["en", "fr", "sw"]}
      defaultLanguage="en"
      localizeUrls={false}
    >
      <App />
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
