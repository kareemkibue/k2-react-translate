/*eslint no-redeclare: "off" */

import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { getLocalizedRoute } from './localizer';
import { Translator } from './Translator';

interface IProps extends NavLinkProps {
	localize?: boolean; // * default true
}

const LocalizedNavLink: React.FunctionComponent<IProps> = (props) => {
	const { to, localize = true, ...rest } = props;

	const getLocalizedUrl = (language: string, url: any): string => {
		return getLocalizedRoute(language, url);
	};

	if (!localize) {
		return <NavLink to={to} {...rest} />;
	}

	return (
		<Translator
			render={(language: string) => {
				return <NavLink to={getLocalizedUrl(language, to)} {...rest} />;
			}}
		/>
	);
};

export { LocalizedNavLink, IProps as ILocalizedNavLinkProps };
