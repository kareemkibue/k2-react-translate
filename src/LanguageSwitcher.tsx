import { Text } from 'components/presentational';

import * as React from 'react';
import { default as styled } from 'styled-components';
import { LocaleContext } from './LocaleContext';

interface ILanguage {
  id: string; // * Unique abreviation, example "en"
  text: React.ReactNode; // * Full Langugae name, example "English", "🇬🇧 English"
  srText?: string; // * Screenreader only text
}

interface IProps {
  onSwitch?: (language: string) => void; // * Raise the current state back to the parent component
  languages: ILanguage[];
  showActiveLanguage?: boolean; // * Display the current set language
}

const LanguageSwitcher: React.FunctionComponent<IProps> = (props) => {
  const { languages = [], onSwitch, showActiveLanguage = true } = props;
  const handleClick = (
    chosenLanguage: string,
    changeLanguage: (language: string) => void
  ): void => {
    changeLanguage(chosenLanguage); // * Change the language via callback via Context API
    onSwitch && onSwitch(chosenLanguage);
  };

  return (
    <LocaleContext.Consumer>
      {({ language: currentLanguage, changeLanguage }) => {
        return (
          <LanguageSwitcherWrapper>
            {languages.map((language: ILanguage, index: number) => {
              const isLanguageActive: boolean =
                language.id.toLowerCase() === currentLanguage.toLowerCase();
              const activeClassName: string = isLanguageActive ? 'active' : ''; // * Setup className for external styling

              // * If the Active language is set, and we don't want to display the option
              if (showActiveLanguage === false && isLanguageActive) {
                return null;
              }

              return (
                <ButtonWrapper
                  key={index}
                  type="button"
                  className={activeClassName}
                  onClick={() => handleClick(language.id, changeLanguage)}>
                  <Text srText={language.srText}>{language.text}</Text>
                </ButtonWrapper>
              );
            })}
          </LanguageSwitcherWrapper>
        );
      }}
    </LocaleContext.Consumer>
  );
};

const LanguageSwitcherWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.button`
  border: 0;
  outline: 0;
  appearance: none;
  background: transparent;
  color: inherit;
`;

export { LanguageSwitcher };
