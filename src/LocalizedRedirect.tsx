/*eslint no-redeclare: "off" */

import * as React from 'react';
import { Redirect, RedirectProps as IRedirectProps } from 'react-router-dom';
import { localizer } from './localizer';
import { Translator } from './Translator';

interface IProps {
  localize?: boolean; // * default true
}

const LocalizedRedirect: React.FunctionComponent<IRedirectProps & IProps> = (
  props
) => {
  const { from, to, localize = true, ...rest } = props;

  const getLocalizedUrl = (language: string, url: any): string => {
    return localizer.getLocalizedRoute(language, url);
  };

  if (!localize) {
    return <Redirect from={from} to={to} {...rest} />;
  }

  return (
    <Translator
      render={(language: string) => {
        return (
          <Redirect
            from={getLocalizedUrl(language, from)}
            to={getLocalizedUrl(language, to)}
            {...rest}
          />
        );
      }}
    />
  );
};

export { LocalizedRedirect };
