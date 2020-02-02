
import { History, LocationDescriptorObject } from 'history';
import { localizedHistory } from './localizedHistory';
import { getLocalizedRoute } from './localizer';
import { useTranslate } from './useTranslate';

const useHistory = (): History => {
    const { language } = useTranslate();

    const push = (location: string | LocationDescriptorObject<any>): string | LocationDescriptorObject<any> => {
        if (typeof location === 'string') {
            return getLocalizedRoute(language, location)
        }

        return {
            ...location,
            pathname: getLocalizedRoute(language, location)
        }
    };

    const history: History = {
        ...localizedHistory,
        push,
    };

    return history;
};

export { useHistory };
