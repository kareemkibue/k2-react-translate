import * as React from 'react';
// import { ILocalizerContext, LocaleContext } from './LocaleContext';
import { TranslationVariables, Translations, UpdateLanguage } from './types';
import { useStore } from './store';

// const { useContext } = React;

// interface IUseTranslate<TLanguage> {
//     language: TLanguage;
//     translate: Translate;
//     translateAndParse: TranslateAndParse;
//     changeLanguage: (language: string) => void;
// }

{
	/* <TLanguage = string> */
}

const useTranslate = () => {
	const language = useStore<string>((state) => state.language);
	const updateLanguage = useStore<UpdateLanguage>((state) => state.updateLanguage);
	// const changeLanguage = useStore<ChangeLanguage>((state) => state.changeLanguage);
	const translations = useStore<Translations>((state) => state.translations);
	const updateTranslations = useStore<(translations: Translations) => void>(
		(state) => state.updateTranslations
	);
	// const { language, changeLanguage, performTranslation, performTranslationAndParse }: ILocalizerContext<TLanguage> =
	//     useContext(LocaleContext);

	const handleError = (
		errorCode: 'NO_KEY' | 'NO_VAL' | 'NO_VAR' | 'NO_CONFIG',
		language: string,
		id: string,
		varKey: string = ''
	): void => {
		const errorMap = {
			NO_CONFIG: '⛔ Translations not found!',
			NO_KEY: `⛔ Missing Translation key: ${id.toUpperCase()}"`,
			NO_VAL: `⛔ Missing Translation to: ${id.toUpperCase()}"`,
			NO_VAR: `⛔ Missing Variable { ${varKey} : string } in: ${id.toUpperCase()}"`,
		};
		const errorMessage: string = errorMap[errorCode];

		// eslint-disable-next-line no-console
		console.error(errorMessage, { language });
	};

	const compareSearchedAndReplacedString = (
		searchedString: string,
		replacedString: string
	): boolean => {
		return searchedString.toLowerCase() === replacedString.toLowerCase();
	};

	/**
	 * * Perfroms variables search/replace of vars on the set translation
	 * @param textToReplaceVars
	 * @param searchValue
	 * @param replaceValue
	 * @param varKey
	 */
	const replaceVars = (
		textToReplaceVars: string,
		searchValue: string,
		replaceValue: string,
		id: string,
		varKey: string
	): string => {
		const searchRegex = new RegExp(searchValue, 'gi');
		const textWithReplacedVars: string = textToReplaceVars.replace(searchRegex, replaceValue);

		// * Checks if variable is missing from the translation doc
		const isVarReplacementSuccessful: boolean = !compareSearchedAndReplacedString(
			textToReplaceVars,
			textWithReplacedVars
		);

		if (isVarReplacementSuccessful === false) {
			handleError('NO_VAR', varKey, id);
		}

		return textWithReplacedVars;
	};

	/**
	 * Process variables provided as props
	 * @param translatedText
	 */
	const processVars = (
		id: string,
		translatedText: string,
		vars: TranslationVariables = {}
	): string => {
		const varKeys: string[] = Object.keys(vars) || [];
		let parsedText: string = translatedText;

		varKeys.forEach((varKey: string) => {
			// * Trim key to allow for consistency when translating
			const searchValue: string = `{${varKey.trim()}}`;
			// * Needs to be converted into a string becauase input can either be a string/number
			const replaceValue: string = vars[varKey].toString().trim();

			parsedText = replaceVars(parsedText, searchValue, replaceValue, varKey, id);
		});

		return parsedText;
	};

	const performTranslation = (
		id: string | null | undefined | false,
		vars?: TranslationVariables
	): string => {
		// const { language } = this.state;
		// const { translations } = this.props;

		if (!id) {
			return `⛔ Missing translation key`;
		}

		if (!translations) {
			handleError('NO_CONFIG', language, id);
			return `⛔ ${id.toUpperCase()}`;
		} else if (!translations[id]) {
			handleError('NO_KEY', language, id);
			return `⛔ ${id.toUpperCase()}`;
		} else if (!translations[id][language]) {
			handleError('NO_KEY', language, id);
			return `⛔ ${id.toUpperCase()} - ${language.toUpperCase()}`;
		} else {
			const translatedText: string = translations[id][language];

			if (vars) {
				return processVars(id, translatedText, vars);
			}

			return translatedText;
		}
	};

	const performTranslationAndParse = (
		id: string,
		vars?: TranslationVariables
	): React.ReactNode => {
		const translatedText: string = performTranslation(id, vars);
		// const isHtml: boolean = this.checkIfStringIsHtml(translatedText);
		// * If parseText is false, the don't parseHTML. Otherwise parseHTML by default
		// const parseTranslatedText: boolean = !parseHtml ? false : isHtml;

		return <span dangerouslySetInnerHTML={{ __html: translatedText }} />;
	};

	return {
		language: language,
		updateLanguage,
		translate: performTranslation,
		updateTranslations,
		translateAndParse: performTranslationAndParse,
	};
};

export { useTranslate };
