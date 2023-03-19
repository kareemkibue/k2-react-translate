import * as React from 'react';
import { ChangeLanguage, ITranslations, Translate, TranslateAndParse } from './types';

import { create } from 'zustand';

interface ILocalizerContext<TLanguage> {
    language: TLanguage;
    translations: ITranslations;
    changeLanguage: ChangeLanguage;
    performTranslation: Translate;
    performTranslationAndParse: TranslateAndParse;
}

interface ILocaleStore {
    language: string;
    translations: Record<string, any>;
    changeLanguage: ChangeLanguage;
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

// function BearCounter() {
//     const bears = useBearStore((state) => state.bears);
//     return <h1>{bears} around here ...</h1>;
// }

const LocaleContext = React.createContext<ILocalizerContext<any>>({} as ILocalizerContext<any>);

export { LocaleContext, ILocalizerContext, useLocaleStore, ILocaleStore };
