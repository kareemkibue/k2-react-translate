import * as React from 'react';

interface ILocalizerContext<TLanguage> {
	language: TLanguage;
	translations: { [field: string]: any };
	changeLanguage: (language: string) => void;
	performTranslation: (id: string, vars?: { [field: string]: string | number }) => string;
	performTranslationAndParse: (
		id: string,
		vars?: { [field: string]: string | number }
	) => React.ReactNode;
}

const LocaleContext = React.createContext<ILocalizerContext<any>>({
	language: 'en',
	translations: {},
	changeLanguage: () => {},
	performTranslation: () => '',
	performTranslationAndParse: () => '',
});

export { LocaleContext, ILocalizerContext };
