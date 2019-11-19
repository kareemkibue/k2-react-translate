import * as React from 'react';
import { ILocalizerContext, LocaleContext } from './LocaleContext';

const { useContext } = React;

interface IUseTranslate<TLanguage> {
    language: TLanguage;
    translate: (
        id: string,
        vars?: { [field: string]: string | number }
    ) => string;
    translateAndParse: (
        id: string,
        vars?: { [field: string]: string | number }
    ) => React.ReactNode;
    changeLanguage: (language: string) => void;
}

const useTranslate = <TLanguage = string>(): IUseTranslate<TLanguage> => {
    const context: ILocalizerContext<TLanguage> = useContext(LocaleContext);

    return {
        language: context.language,
        changeLanguage: context.changeLanguage,
        translate: context.performTranslation,
        translateAndParse: context.performTranslationAndParse,
    };
};

export { useTranslate };
