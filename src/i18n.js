import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from '../public/locales/en/translation.json';
import translationFA from '../public/locales/fa/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    fa: {
        translation: translationFA
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })
    .then(() => {
        console.log('i18n initialized successfully');
    })
    .catch((error) => {
        console.error('Error initializing i18n:', error);
    });
export default i18n;
