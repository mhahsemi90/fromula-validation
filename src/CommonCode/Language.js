import {ltrCache, ltrTheme, rtlCache, rtlTheme} from "./Theme.js";

const changeLanguage = (lang,setLang,i18n,setCache,setTheme,setFrame) => {
    const newLang = lang === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang)
        .then(() => {
            console.log(`Language changed to ${newLang}`);
        }).catch((error) => {
        console.error('Error changing language:', error);
    });
    setLang(newLang);
    setCache(newLang === 'en' ? ltrCache : rtlCache);
    setTheme(newLang === 'en' ? ltrTheme : rtlTheme);
    setFrame(newLang === 'en' ? "Intermediate" : "Basic");
};
export {changeLanguage};