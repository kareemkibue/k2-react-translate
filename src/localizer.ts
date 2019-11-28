const getLocalizedUrl = (language: string, url: string): string => {
    return `/${language + url}`;
};

// TODO Resolve types, eliminate any - @kareemkibue
const getLocalizedRoute = (language: string | null, url: any): any => {
    const languagePrefix: string = language === null ? ':language' : language;

    if (typeof url === 'undefined') {
        return url;
    }
    // TODO Fix to allow for external linking - @kareemkibue
    // if (url.indexOf('http') > -1 || url.indexOf('//') > -1) {
    //     console.log(url)
    //     return url;
    // }
    if (typeof url === 'string') {
        return getLocalizedUrl(languagePrefix, url);
    }

    // * if the history push arg is an object, ie { pathname: sting, search: query, state: someState}
    return {
        ...url,
        pathname: getLocalizedUrl(languagePrefix, url.pathname),
    };
};

const concatenateLanguageParam = (path: string): string => {
    return '/:language' + path;
};

const getLocalizedPath = (
    path: string | string[]
): string | string[] | undefined => {
    if (Array.isArray(path)) {
        return path.map((singlePath: string) =>
            concatenateLanguageParam(singlePath)
        );
    }
    if (typeof path === 'string') {
        return concatenateLanguageParam(path);
    }

    return undefined;
};

const getLanguageFromUrl = (languages: string[], url: string = window.location.pathname): string | null => {
    return languages.find((language: string) => {

        return url.toLowerCase().includes(language.toLowerCase());
    }) || ''
}

const localizer = {
    getLocalizedRoute,
    getLocalizedPath,
    getLanguageFromUrl
};

export { localizer };
