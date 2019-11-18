import * as React from 'react';
import { ILocalizerContext, LocaleContext } from './LocaleContext';

const { useContext } = React;

interface IUseTranslate {
  language: string;
  translate: (
    id: string,
    vars?: { [field: string]: string | number },
    parseHtml?: boolean
  ) => void;
  changeLanguage: (language?: string) => void;
}

const useTranslate = (): IUseTranslate => {
  const context: ILocalizerContext = useContext(LocaleContext);
  return {
    language: context.language,
    changeLanguage: context.changeLanguage,
    translate: context.performTranslation,
  };
};

export { useTranslate };
