type Translate = (id: string, vars?: { [field: string]: string | number }) => string
type TranslateAndParse = (
    id: string,
    vars?: { [field: string]: string | number }
) => React.ReactNode

type ChangeLanguage = (language: string) => void

interface ITranslations {
    [field: string]: any
}

export { Translate, TranslateAndParse, ITranslations, ChangeLanguage }