import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Store, Translations } from './types';

const useStore = create(
	devtools<Store>(
		(set) => ({
			language: '',
			translations: {},
			updateTranslations: (translations: Translations) => set({ translations }),
			updateLanguage: (language: string) => set({ language }),
		}),
		{ store: 'k2-translate' }
	)
);

export { useStore };
