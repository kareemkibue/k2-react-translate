/*eslint no-redeclare: "off" */

import * as React from 'react';
import { Link, LinkProps as ILinkProps } from 'react-router-dom';
import { localizer } from './localizer';
import { Translator } from './Translator';

interface IProps {
  localize?: boolean; // * default true
}

const LocalizedLink: React.FunctionComponent<ILinkProps & IProps> = (props) => {
  const { to, localize = true, ...rest } = props;

  const getLocalizedUrl = (language: string, url: any): string => {
    return localizer.getLocalizedRoute(language, url);
  };

  if (!localize) {
    return <Link to={to} {...rest} />;
  }

  return (
    <Translator
      render={(language: string) => {
        return <Link to={getLocalizedUrl(language, to)} {...rest} />;
      }}
    />
  );
};

export { LocalizedLink };
