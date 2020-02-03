import * as React from 'react';
import { ChangeLanguage, ITranslations, Translate, TranslateAndParse } from './types';

interface ILocalizerContext<TLanguage> {
	language: TLanguage;
	translations: ITranslations;
	changeLanguage: ChangeLanguage;
	performTranslation: Translate;
	performTranslationAndParse: TranslateAndParse;
}

const LocaleContext = React.createContext<ILocalizerContext<any>>({} as ILocalizerContext<any>);

export { LocaleContext, ILocalizerContext };
