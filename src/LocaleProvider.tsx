import * as React from 'react';
import { Router } from 'react-router-dom';
import { LocaleContext } from './LocaleContext';
import { localizedHistory } from './localizedHistory';

interface IProps {
	defaultLanguage?: string;
	translations: { [field: string]: any };

	languages: string[];
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
		this.resolveIntialialLanguage();
	}

	/**
	 * * Resolve the initiale language setting from hard setting or from the browser setting
	 */
	private resolveIntialialLanguage(): void {
		const { defaultLanguage } = this.props;
		const urlLanguageSetting: string | null = this.getLanguageFromUrl();
		const browserLanguageSetting: string = navigator.language.split(/[-_]/)[0]; // * language without region code
		const resolvedLanguage: string =
			urlLanguageSetting || defaultLanguage || browserLanguageSetting || 'en';

		if (urlLanguageSetting === null) {
			this.insertLanguageToUrl(resolvedLanguage);
		}

		this.setLanguage(resolvedLanguage);
	}

	private setLanguage = (language: string): void => {
		this.setState({ language }, () => {
			this.updateUrl();
		});
	};

	private getLanguageFromUrl = (): string | null => {
		const url: string = location.pathname;

		if (url.match(/\/en\//g)) {
			return 'en';
		} else if (url.match(/\/fr\//g)) {
			return 'fr';
		}

		return null;
	};

	private insertLanguageToUrl(language: string): void {
		const pathName: string = location.pathname + location.search;
		const url: string = `/${language + pathName}`;
		localizedHistory.push(url);
	}

	private updateUrl = (): void => {
		const { language } = this.state;
		const currentUrl: string = location.pathname + location.search;
		// TODO Adapt to languages set via Provider props
		const searchString: string = language !== 'fr' ? '/fr/' : '/en/';
		const replaceString: string = `/${language}/`;
		const updatedUrl: string = currentUrl.replace(searchString, replaceString);

		// TODO Sync with <LocalizedRoute/>
		localizedHistory.push(updatedUrl);
	};

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
	private compareSearchedAndReplacedString(
		searchedString: string,
		replacedString: string
	): boolean {
		return searchedString.toLowerCase() === replacedString.toLowerCase();
	}

	/**
	 * Perfroms variables search/replace of vars on the set translation
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
		const textWithReplacedVars: string = textToReplaceVars.replace(searchValue, replaceValue);
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
	private processVars(
		id: string,
		translatedText: string,
		vars: TranslationVariables = {}
	): string {
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

	private performTranslation = (id: string, vars?: TranslationVariables): string => {
		const { language } = this.state;
		const { translations } = this.props;

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

	private performTranslationAndParse = (
		id: string,
		vars?: TranslationVariables
	): React.ReactNode => {
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

	render() {
		const { translations, children } = this.props;
		const { language } = this.state;

		// * Only init app after language has been resolved
		if (language && translations) {
			return (
				<LocaleContext.Provider
					value={{
						language,
						translations,
						changeLanguage: this.setLanguage,
						performTranslation: this.performTranslation,
						performTranslationAndParse: this.performTranslationAndParse,
					}}>
					{/* // * https://reacttraining.com/react-router/web/api/Router/history-object */}
					<Router history={localizedHistory}>{children}</Router>
				</LocaleContext.Provider>
			);
		}

		return null;
	}
}

export { LocaleProvider };
