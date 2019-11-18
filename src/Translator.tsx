import * as React from 'react';
import { LocaleContext } from './LocaleContext';

interface IProps {
  id?: string;
  vars?: {
    [field: string]: string | number;
  };
  render?: (language: string) => React.ReactNode;
  parseHtml?: boolean;
}

const Translator: React.FunctionComponent<IProps> = (props) => {
  const { render, id, vars, parseHtml = false } = props;

  if (render) {
    return (
      <LocaleContext.Consumer>
        {({ language, performTranslation, performTranslationAndParse }) => {
          if (id) {
            if (parseHtml) {
              return <> {performTranslationAndParse(id, vars)}</>;
            }

            return <>{performTranslation(id, vars)}</>;
          }

          return render(language);
        }}
      </LocaleContext.Consumer>
    );
  }
  if (id) {
    return (
      <LocaleContext.Consumer>
        {({ performTranslation, performTranslationAndParse }) => {
          if (parseHtml) {
            return <> {performTranslationAndParse(id, vars)}</>;
          }

          return <>{performTranslation(id, vars)}</>;
        }}
      </LocaleContext.Consumer>
    );
  }

  console.error('Missing both translationKey or renderProp');
  return null;
};

export { Translator };
