import * as React from 'react';
import styled from 'styled-components';
import { LocalizedLink, LocalizedRoutes, Route, useTranslate } from '../src';
import { AppStyles } from './appStyles';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';

const App: React.FunctionComponent<{}> = () => {
  const routes: Route[] = [
    {
      path: "/",
      exact: true,
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/contact",
      component: Contact
    },
    {
      path: "/page-not-found",
      component: PageNotFound
    },
    {
      to: "/page-not-found"
    }
  ];

  return (
    <Grid>
      <AppStyles />
      <Header />
      <LocalizedRoutes localize={false} applySwitch={true} routes={routes} />
      <Footer />
    </Grid>
  );
};

const Grid = styled.div`
  width: 1200px;
  margin: auto;
  padding: 0 15px;
`;

const Header: React.FunctionComponent<{}> = () => {
  const { language: currentLanguage, changeLanguage, translate } = useTranslate<
    string
  >();
  const languages: string[] = ["en", "fr", "sw"];

  const handleLanguageChange = (e: any): void => {
    const selectedLanguage: string = e.target.value;
    changeLanguage(selectedLanguage);
  };

  return (
    <HeaderWrapper>
      <LocalizedLink localize={false} to="/">
        {translate("LOGO")}
      </LocalizedLink>
      <nav>
        <LocalizedLink localize={false} to="/">
          {translate("HOME")}
        </LocalizedLink>
        <LocalizedLink localize={false} to="/about">
          {translate("ABOUT_US")}
        </LocalizedLink>
        <LocalizedLink localize={false} to="/contact">
          {translate("CONTACT_US")}
        </LocalizedLink>
        <select
          name="changeLanguage"
          onChange={handleLanguageChange}
          value={currentLanguage}
        >
          {languages.map((language: string) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  a {
    display: inline-block;
  }

  nav a {
    padding: 30px;
  }
`;

const Footer: React.FunctionComponent<{}> = () => {
  const { translateAndParse } = useTranslate<string>();

  return (
    <FooterWrapper>
      {translateAndParse("COPYRIGHT", { year: new Date().getFullYear() })}
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  margin: 100px 0 50px;
`;

export { App };
