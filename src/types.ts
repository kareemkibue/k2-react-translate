type TranslationVariables = Record<string, string | number>;

type Translate = (id: string, vars?: TranslationVariables) => string;

type TranslateAndParse = (id: string, vars?: TranslationVariables) => React.ReactNode;

type UpdateLanguage = (language: string) => void;

type Translations = Record<string, Record<string, string>>;

interface Store {
	language: string;
	translations: Translations;
	updateTranslations: (translations: Translations) => void;
	updateLanguage: (language: string) => void;
	// translate: Translate;
	// translateAndParse: TranslateAndParse;
	// changeLanguage: (language: string) => void;
}

export { Translate, TranslateAndParse, Store, Translations, TranslationVariables, UpdateLanguage };
