
import { History, LocationDescriptorObject } from 'history';
import { localizedHistory } from './localizedHistory';
import { getLocalizedRoute } from './localizer';
import { useTranslate } from './useTranslate';

const useHistory = (): History => {
    const { language } = useTranslate();

    const push = (location: string | LocationDescriptorObject<any>) => {
        if (typeof location === 'string') {
            const localizedLocation: string = getLocalizedRoute(language, location);
            history.push(localizedLocation)
        }
        else {
            const localizedLocation: LocationDescriptorObject<any> = {
                ...location,
                pathname: getLocalizedRoute(language, location)
            };

            history.push(localizedLocation)

        }

    };

    const history: History = {
        ...localizedHistory,
        push,
    };

    return history;
};

export { useHistory };
