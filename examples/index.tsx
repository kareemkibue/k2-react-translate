import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocaleProvider } from '../src'
import { App } from './App';
import translations from'./translations.json' 

ReactDOM.render(
	<LocaleProvider translations={translations} languages={['en','fr']}>
	<App />
	 </LocaleProvider>,
	document.getElementById('root')
);
