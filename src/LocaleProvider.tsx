import * as React from 'react';
import { useEffect, FC } from 'react';
// import { Router } from 'react-router-dom';
import { History } from 'history';
// import { LocaleContext } from './LocaleContext';
import { getLanguageFromUrl } from './localizer';
import { Translations } from './types';
import { useTranslate } from './useTranslate';

interface IProps {
	defaultLanguage?: string;
	languages: string[];
	translations: Translations;
	localizeUrls?: boolean; // * Manage languageCode in URL upon navigation, default=false
	history?: History;
}

// interface IState {
//     language: string;
// }

const LocaleProvider: FC<IProps> = (props) => {
	const {
		defaultLanguage,
		translations,
		children,
		languages = [],
		localizeUrls = false,
		history,
	} = props;
	const { updateTranslations, updateLanguage: updateLanguageInStore, language } = useTranslate();
	React.useMemo(() => {
		updateTranslations(translations);
	}, [translations]);
	// const [language, setLanguage] = useState<string>('');
	// class LocaleProvider extends React.Component<IProps, IState> {
	// state = {
	//     language: '',
	// };

	useEffect(() => {
		console.log({ ...props });

		getIntialLanguage();
	}, []);

	// componentDidMount() {
	//     this.getIntialLanguage();
	// }

	/**
	 * * Resolve the initiale language setting from hard setting or from the browser setting
	 */
	const getIntialLanguage = (): string => {
		const urlLanguageSetting: string | null = getLanguageFromPageUrl();
		const browserLanguageSetting = getBrowserLanguage(); // * language without region code
		const resolvedLanguage: string =
			getLanguageFromLocationState() ||
			defaultLanguage ||
			browserLanguageSetting ||
			languages[0];

		if (localizeUrls && urlLanguageSetting === null) {
			insertLanguageToUrl(resolvedLanguage);
		}

		updateLanguage(resolvedLanguage);

		return resolvedLanguage;
	};

	const getBrowserLanguage = (): string | null => {
		if (typeof window === 'undefined') {
			return null;
		}

		return window.navigator.language.split(/[-_]/)[0];
	};

	const getLanguageFromLocationState = (): string | null => {
		// const { localizeUrls = false } = this.props;

		if (typeof window === 'undefined') {
			return null;
		}

		if (localizeUrls) {
			window.localStorage.removeItem('k2-lang');
			return getLanguageFromPageUrl();
		} else {
			return window.localStorage.getItem('k2-lang') || '';
		}
	};

	const updateLanguage = (updatedLanguage: string): void => {
		// const { languages, localizeUrls } = this.props;
		const doesLanguageExist = languages.indexOf(language.toLowerCase()) > -1;

		if (doesLanguageExist) {
			updateLanguageInStore(updatedLanguage.toLowerCase());

			if (localizeUrls) {
				updateUrl();
			} else {
				updateBrowserStorage();
			}
			// this.setState(
			//     {
			//         language: language.toLowerCase(),
			//     },
			//     () => {
			//         if (localizeUrls) {
			//             this.updateUrl();
			//         } else {
			//             this.updateBrowserStorage();
			//         }
			//     }
			// );
		} else {
			console.error(
				'⛔ Selected language does not exist in the initial <LocaleProvider/> configuration!'
			);
		}
	};

	const getLanguageFromPageUrl = (): string | null => {
		// const { languages } = this.props;

		if (typeof window === 'undefined') {
			return null;
		}

		return getLanguageFromUrl(languages, window.location.pathname);
	};

	const insertLanguageToUrl = (language: string): void => {
		// const { history } = this.props;
		const pathName: string = window.location.pathname + window.location.search;
		const url: string = `/${language + pathName}`;
		history?.push(url);
	};

	const updateUrl = (): void => {
		// const { languages, defaultLanguage, history } = this.props;
		// const { language: currentLanguage } = this.state;
		const currentUrl: string = location.pathname + location.search;
		let searchString: string = defaultLanguage || languages[0];

		// TODO Adapt to languages set via Provider props
		for (const language of languages) {
			if (currentUrl.includes(language)) {
				searchString = language;
				break;
			}
		}

		// const updatedUrl: string = currentUrl.replace(`/${searchString}/`, `/${currentLanguage}/`);
		const updatedUrl: string = currentUrl.replace(`/${searchString}/`, `/${language}/`);
		history?.push(updatedUrl);
	};

	const updateBrowserStorage = (): void => {
		// const { language } = this.state;
		window.localStorage.setItem('k2-lang', language);
	};

	/**
	 * Check if searchedString and replaced string as the same
	 * If the text is the same, then return true
	 * @param searchedString
	 * @param replacedString
	 */

	// const performTranslation = (id: string | null | undefined | false, vars?: TranslationVariables): string => {
	//     // const { language } = this.state;
	//     // const { translations } = this.props;

	//     if (!id) {
	//         return `⛔ Missing translation key`;
	//     }

	//     if (!translations) {
	//         handleError('NO_CONFIG', language, id);
	//         return `⛔ ${id.toUpperCase()}`;
	//     } else if (!translations[id]) {
	//         handleError('NO_KEY', language, id);
	//         return `⛔ ${id.toUpperCase()}`;
	//     } else if (!translations[id][language]) {
	//         handleError('NO_KEY', language, id);
	//         return `⛔ ${id.toUpperCase()} - ${language.toUpperCase()}`;
	//     } else {
	//         const translatedText: string = translations[id][language];

	//         if (vars) {
	//             return processVars(id, translatedText, vars);
	//         }

	//         return translatedText;
	//     }
	// };

	// const performTranslationAndParse = (id: string, vars?: TranslationVariables): React.ReactNode => {
	//     const translatedText: string = performTranslation(id, vars);
	//     // const isHtml: boolean = this.checkIfStringIsHtml(translatedText);
	//     // * If parseText is false, the don't parseHTML. Otherwise parseHTML by default
	//     // const parseTranslatedText: boolean = !parseHtml ? false : isHtml;

	//     return <span dangerouslySetInnerHTML={{ __html: translatedText }} />;
	// };

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

	// render() {
	// const { translations, localizeUrls = false, history, children } = this.props;
	// const { language } = this.state;
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
			<>
				<Router history={history}>{children}</Router>
			</>
		);
	}
	if (!localizeUrls) {
		return <>{children}</>;
	}

	return null;
};
// }

export { LocaleProvider };
