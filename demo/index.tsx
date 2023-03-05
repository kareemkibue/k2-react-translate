import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocaleProvider } from '../src';
import { localizedHistory } from '../src/localizedHistory';
import { App } from './App';
import { Home } from './pages/Home';
import translations from './translations.json';

const localizeUrls = true;

ReactDOM.render(
    <LocaleProvider
        translations={translations}
        languages={['en', 'fr', 'sw']}
        defaultLanguage="en"
        localizeUrls={localizeUrls}
        history={localizedHistory}>
        {localizeUrls ? <App /> : <Home />}
    </LocaleProvider>,
    document.getElementById('root')
);
