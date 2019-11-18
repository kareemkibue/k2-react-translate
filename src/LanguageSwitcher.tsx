import * as React from 'react';
import { default as styled } from 'styled-components';
import { LocaleContext } from './LocaleContext';

interface IProps {
  onSwitch?: (language: string) => void; // * Raise the current state back to the parent component
  onClick: (switchLanguage: (language: string) => void) => void;
}

const LanguageSwitcher: React.FunctionComponent<IProps> = (props) => {
  const { onClick, children } = props;

  const handleClick = (changeLanguage: (language: string) => void): void => {
    onClick(changeLanguage);
  };

  return (
    <LocaleContext.Consumer>
      {({ changeLanguage }) => {
        return (
          <LanguageSwitcherWrapper>
            <ButtonWrapper
              type="button"
              onClick={() => handleClick(changeLanguage)}>
              {children}
            </ButtonWrapper>
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
