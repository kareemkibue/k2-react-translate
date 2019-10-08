import * as React from 'react';

interface ILocalizerContext {
  language: string;
  translations: { [field: string]: any };
  changeLanguage: (language?: string) => void;
  performTranslation: (
    id?: string,
    vars?: { [field: string]: string | number },
    parseHtml?: boolean
  ) => void;
}

const LocaleContext: React.Context<ILocalizerContext> = React.createContext({
  language: 'en',
  translations: {},
  changeLanguage: () => {},
  performTranslation: () => {},
});

export { LocaleContext, ILocalizerContext };
