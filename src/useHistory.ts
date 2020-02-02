
import { History as IHistory } from 'history';
import { localizedHistory } from './localizedHistory';
import { getLocalizedRoute } from './localizer';
import { useTranslate } from './useTranslate';

const useHistory = (): IHistory => {
    const { language } = useTranslate();

    const push = (url: string) => {
        const localizedUrl: string = getLocalizedRoute(language, url);
        history.push(localizedUrl)
    };

    const history: IHistory = {
        ...localizedHistory,
        push,
    };

    return history;
};

export { useHistory };
