import * as React from 'react';
import { LocaleContext } from './LocaleContext';
import { ChangeLanguage } from './types';

interface IProps {
	onClick: (switchLanguage: ChangeLanguage) => void;
}

const LanguageSwitcher: React.FunctionComponent<IProps> = (props) => {
	const { onClick, children } = props;

	const handleClick = (changeLanguage: ChangeLanguage): void => {
		onClick(changeLanguage);
	};

	return (
		<LocaleContext.Consumer>
			{({ changeLanguage }) => {
				return (
					<div style={{ display: 'flex' }}>
						<button
							type="button"
							onClick={() => handleClick(changeLanguage)}
							style={{
								border: 0,
								outline: 0,
								appearance: 'none',
								background: 'transparent',
								color: 'inherit',
							}}>
							{children}
						</button>
					</div>
				);
			}}
		</LocaleContext.Consumer>
	);
};

export { LanguageSwitcher };
