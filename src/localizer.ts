import { LocationDescriptorObject } from 'history';

const getLocalizedUrl = (language: string, url: string): string => {
    return `/${language + url}`;
};

const getLocalizedRoute = (language: string | null, location: string | LocationDescriptorObject<any>): any => {
    const languagePrefix: string = language === null ? ':language' : language;

    if (typeof location === 'undefined') {
        return location;
    }

    if (typeof location === 'string') {
        return getLocalizedUrl(languagePrefix, location);
    }

    // * if the history push arg is an object, ie { pathname: sting, search: query, state: someState}
    return {
        ...location,
        pathname: getLocalizedUrl(languagePrefix, location.pathname || ''),
    };
};

const concatenateLanguageParam = (path: string): string => {
    return '/:language' + path;
};

const getLocalizedPath = (path: string | string[]): string | string[] | undefined => {
    if (Array.isArray(path)) {
        return path.map((singlePath: string) => concatenateLanguageParam(singlePath));
    }
    if (typeof path === 'string') {
        return concatenateLanguageParam(path);
    }

    return undefined;
};

const getLanguageFromUrl = (languages: string[], url: string): string | null => {
    return (
        languages.find((language: string) => {
            const regExp = new RegExp(`^/${language}`, 'i');
            return url.search(regExp) >= 0;
        }) || null
    );
};

export { getLocalizedRoute, getLocalizedPath, getLanguageFromUrl };
