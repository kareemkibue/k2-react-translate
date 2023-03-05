import * as React from 'react';
// import { Router } from 'react-router-dom';
import { History } from 'history';
import { LocaleContext } from './LocaleContext';
import { getLanguageFromUrl } from './localizer';
import { ITranslations } from './types';

interface IProps {
    defaultLanguage?: string;
    languages: string[];
    translations: ITranslations;
    localizeUrls?: boolean; // * Manage languageCode in URL upon navigation, default=false
    history?: History;
}

interface IState {
    language: string;
}

type TranslationVariables = { [field: string]: string | number };

class LocaleProvider extends React.Component<IProps, IState> {
    state = {
        language: '',
    };

    componentDidMount() {
        this.getIntialLanguage();
    }

    /**
     * * Resolve the initiale language setting from hard setting or from the browser setting
     */
    private getIntialLanguage(): string {
        const { defaultLanguage, languages, localizeUrls = false } = this.props;
        const urlLanguageSetting: string | null = this.getLanguageFromUrl();
        const browserLanguageSetting = this.getBrowserLanguage(); // * language without region code
        const resolvedLanguage: string =
            this.getLanguageFromLocationState() || defaultLanguage || browserLanguageSetting || languages[0];

        if (localizeUrls && urlLanguageSetting === null) {
            this.insertLanguageToUrl(resolvedLanguage);
        }

        this.setLanguage(resolvedLanguage);

        return resolvedLanguage;
    }

    private getBrowserLanguage(): string | null {
        if (typeof window === undefined) {
            return null;
        }

        return window.navigator.language.split(/[-_]/)[0];
    }

    private getLanguageFromLocationState(): string | null {
        const { localizeUrls = false } = this.props;

        if (typeof window === 'undefined') {
            return null;
        }

        if (localizeUrls) {
            window.localStorage.removeItem('k2-lang');
            return this.getLanguageFromUrl();
        } else {
            return window.localStorage.getItem('k2-lang') || '';
        }
    }

    private setLanguage = (language: string): void => {
        const { languages, localizeUrls } = this.props;
        const doesLanguageExist = languages.indexOf(language.toLowerCase()) > -1;

        if (doesLanguageExist) {
            this.setState(
                {
                    language: language.toLowerCase(),
                },
                () => {
                    if (localizeUrls) {
                        this.updateUrl();
                    } else {
                        this.updateBrowserStorage();
                    }
                }
            );
        } else {
            console.error('⛔ Selected language does not exist in the initial <LocaleProvider/> configuration!');
        }
    };

    private getLanguageFromUrl = (): string | null => {
        const { languages } = this.props;

        if (typeof window === 'undefined') {
            return null;
        }

        return getLanguageFromUrl(languages, window.location.pathname);
    };

    private insertLanguageToUrl(language: string): void {
        const { history } = this.props;
        const pathName: string = window.location.pathname + window.location.search;
        const url: string = `/${language + pathName}`;
        history?.push(url);
    }

    private updateUrl = (): void => {
        const { languages, defaultLanguage, history } = this.props;
        const { language: currentLanguage } = this.state;
        const currentUrl: string = location.pathname + location.search;
        let searchString: string = defaultLanguage || languages[0];

        // TODO Adapt to languages set via Provider props
        for (const language of languages) {
            if (currentUrl.includes(language)) {
                searchString = language;
                break;
            }
        }

        const updatedUrl: string = currentUrl.replace(`/${searchString}/`, `/${currentLanguage}/`);
        history?.push(updatedUrl);
    };

    private updateBrowserStorage(): void {
        const { language } = this.state;
        window.localStorage.setItem('k2-lang', language);
    }

    private handleError(
        errorCode: 'NO_KEY' | 'NO_VAL' | 'NO_VAR' | 'NO_CONFIG',
        language: string,
        id: string,
        varKey: string = ''
    ): void {
        const errorMap = {
            NO_CONFIG: '⛔ Translations not found!',
            NO_KEY: `⛔ Missing Translation key: ${id.toUpperCase()}`,
            NO_VAL: `⛔ Missing Translation to: ${id.toUpperCase()} => ${language.toUpperCase()}`,
            NO_VAR: `⛔ Missing Variable { ${varKey} : string } in: ${id.toUpperCase()} => ${language.toUpperCase()}`,
        };
        const errorMessage: string = errorMap[errorCode];

        // eslint-disable-next-line no-console
        console.error(errorMessage);
    }

    /**
     * Check if searchedString and replaced string as the same
     * If the text is the same, then return true
     * @param searchedString
     * @param replacedString
     */
    private compareSearchedAndReplacedString(searchedString: string, replacedString: string): boolean {
        return searchedString.toLowerCase() === replacedString.toLowerCase();
    }

    /**
     * * Perfroms variables search/replace of vars on the set translation
     * @param textToReplaceVars
     * @param searchValue
     * @param replaceValue
     * @param varKey
     */
    private replaceVars(
        textToReplaceVars: string,
        searchValue: string,
        replaceValue: string,
        id: string,
        varKey: string
    ): string {
        const searchRegex = new RegExp(searchValue, 'gi');
        const textWithReplacedVars: string = textToReplaceVars.replace(searchRegex, replaceValue);

        // * Checks if variable is missing from the translation doc
        const isVarReplacementSuccessful: boolean = !this.compareSearchedAndReplacedString(
            textToReplaceVars,
            textWithReplacedVars
        );

        if (isVarReplacementSuccessful === false) {
            this.handleError('NO_VAR', varKey, id);
        }

        return textWithReplacedVars;
    }

    /**
     * Process variables provided as props
     * @param translatedText
     */
    private processVars(id: string, translatedText: string, vars: TranslationVariables = {}): string {
        const varKeys: string[] = Object.keys(vars) || [];
        let parsedText: string = translatedText;

        varKeys.forEach((varKey: string) => {
            // * Trim key to allow for consistency when translating
            const searchValue: string = `{${varKey.trim()}}`;
            // * Needs to be converted into a string becauase input can either be a string/number
            const replaceValue: string = vars[varKey].toString().trim();

            parsedText = this.replaceVars(parsedText, searchValue, replaceValue, varKey, id);
        });

        return parsedText;
    }

    private performTranslation = (id: string | null | undefined | false, vars?: TranslationVariables): string => {
        const { language } = this.state;
        const { translations } = this.props;

        if (!id) {
            return `⛔ Missing translation key`;
        }

        if (!translations) {
            this.handleError('NO_CONFIG', language, id);
            return `⛔ ${id.toUpperCase()}`;
        } else if (!translations[id]) {
            this.handleError('NO_KEY', language, id);
            return `⛔ ${id.toUpperCase()}`;
        } else if (!translations[id][language]) {
            this.handleError('NO_KEY', language, id);
            return `⛔ ${id.toUpperCase()} - ${language.toUpperCase()}`;
        } else {
            const translatedText: string = translations[id][language];

            if (vars) {
                return this.processVars(id, translatedText, vars);
            }

            return translatedText;
        }
    };

    private performTranslationAndParse = (id: string, vars?: TranslationVariables): React.ReactNode => {
        const translatedText: string = this.performTranslation(id, vars);
        // const isHtml: boolean = this.checkIfStringIsHtml(translatedText);
        // * If parseText is false, the don't parseHTML. Otherwise parseHTML by default
        // const parseTranslatedText: boolean = !parseHtml ? false : isHtml;

        return <span dangerouslySetInnerHTML={{ __html: translatedText }} />;
    };

    /**
     * * Checks if the translated text is HTML
     * https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not/15458987
     * @param text
     */
    // private checkIfStringIsHtml(text: string): boolean {
    // 	return /<[a-z/][\s\S]*>/i.test(text);
    // }

    // private async getComponent(): Promise<React.ReactNode> {
    //     const { children, localizeUrls = false, history } = this.props;

    //     if (localizeUrls && history) {
    //         // import { Router } from 'react-router-dom';
    //         const { Router } = await import('react-router-dom');
    //         return <Router history={history}>{children}</Router>;
    //     }

    //     return children;
    // }

    // private getLanguage = (): string => {
    //     return '';
    // };

    render() {
        const { translations, localizeUrls = false, history, children } = this.props;
        const { language } = this.state;
        // const language = this.getLanguage();

        if (localizeUrls && !history) {
            throw new Error('Missing history prop from LocaleProvider');
        }

        //

        if (!translations) {
            throw new Error('Missing translations prop from LocaleProvider');
        }

        if (localizeUrls && history && language) {
            const { Router } = require('react-router-dom');

            return (
                <LocaleContext.Provider
                    value={{
                        language,
                        translations,
                        changeLanguage: this.setLanguage,
                        performTranslation: this.performTranslation,
                        performTranslationAndParse: this.performTranslationAndParse,
                    }}>
                    <Router history={history}>{children}</Router>
                </LocaleContext.Provider>
            );
        }
        if (!localizeUrls) {
            return (
                <LocaleContext.Provider
                    value={{
                        language: language || this.getIntialLanguage(),
                        translations,
                        changeLanguage: this.setLanguage,
                        performTranslation: this.performTranslation,
                        performTranslationAndParse: this.performTranslationAndParse,
                    }}>
                    {children}
                </LocaleContext.Provider>
            );
        }

        return null;
    }
}

export { LocaleProvider };
