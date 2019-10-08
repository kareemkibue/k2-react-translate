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
  const { render, id, vars, parseHtml } = props;

  if (render) {
    return (
      <LocaleContext.Consumer>
        {({ language, performTranslation }) => {
          if (id) {
            return <>{performTranslation(id, vars, parseHtml)}</>;
          }

          return render(language);

          // return children;
        }}
      </LocaleContext.Consumer>
    );
  }
  if (id) {
    return (
      <LocaleContext.Consumer>
        {({ performTranslation }) => {
          return <>{performTranslation(id, vars, parseHtml)}</>;
        }}
      </LocaleContext.Consumer>
    );
  }

  console.error('Missing both translationKey or renderProp');
  return null;
};

export { Translator };
