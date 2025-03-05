const changeLanguage = (lang, setLang, i18n, setTheme) => {
    const newLang = lang === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang)
        .then(() => {
            console.log(`Language changed to ${newLang}`);
        }).catch((error) => {
        console.error('Error changing language:', error);
    });
    setLang(newLang);
    setTheme(newLang === 'en' ? 'direction-ltr' : 'direction-rtl');
};
export {changeLanguage};