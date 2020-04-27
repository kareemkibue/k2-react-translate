
import { History, LocationDescriptorObject } from 'history';
import { localizedHistory } from './localizedHistory';
import { getLocalizedRoute } from './localizer';
import { useTranslate } from './useTranslate';

const useHistory = (): History => {
    const { language } = useTranslate();

    const push = (location: string | LocationDescriptorObject<any>): void => {
        const localizedUrl = getLocalizedRoute(language, location);
        localizedHistory.push(localizedUrl);
    };

    const history: History = {
        ...localizedHistory,
        push,
    };

    return history;
};

export { useHistory };
