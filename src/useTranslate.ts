import * as React from 'react';
import { ILocalizerContext, LocaleContext } from './LocaleContext';
import { Translate, TranslateAndParse } from './types';

const { useContext } = React;


interface IUseTranslate<TLanguage> {
    language: TLanguage;
    translate: Translate;
    translateAndParse: TranslateAndParse;
    changeLanguage: (language: string) => void;
}

const useTranslate = <TLanguage = string>(): IUseTranslate<TLanguage> => {
    const { language, changeLanguage, performTranslation, performTranslationAndParse }: ILocalizerContext<TLanguage> = useContext(LocaleContext);

    return {
        language,
        changeLanguage,
        translate: performTranslation,
        translateAndParse: performTranslationAndParse,
    };
};

export { useTranslate };
