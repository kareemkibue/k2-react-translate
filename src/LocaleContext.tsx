import * as React from 'react';
import { Translations, Translate, TranslateAndParse, UpdateLanguage } from './types';

import { create } from 'zustand';

interface ILocalizerContext<TLanguage> {
	language: TLanguage;
	translations: Translations;
	updateLanguage: UpdateLanguage;
	performTranslation: Translate;
	performTranslationAndParse: TranslateAndParse;
}

interface ILocaleStore {
	language: string;
	translations: Record<string, any>;
	changeLanguage: UpdateLanguage;
	// performTranslation: Translate;
	// performTranslationAndParse: TranslateAndParse;
}

const useLocaleStore = create((set) => ({
	translations: {},
	changeLanguage: (language: string) => set((state: ILocaleStore) => ({ ...state, language })),
	// performTranslationAndParse: () => {},
	// performTranslation: () => {},
	// increasePopulation: () => set((state: ILocaleStore) => ({ bears: state.bears + 1 })),
	// removeAllBears: () => set({ bears: 0 }),
}));

// ff

const LocaleContext = React.createContext<ILocalizerContext<any>>({} as ILocalizerContext<any>);

export { LocaleContext, ILocalizerContext, useLocaleStore, ILocaleStore };
