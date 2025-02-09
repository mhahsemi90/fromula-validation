import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme} from "@mui/material/styles";
import "../../public/fonts.css"

const rtlCache = () => createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = () => createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
});
const ltrTheme = () => createTheme({
    direction: 'ltr',
    typography: {
        fontFamily: 'Arial, sans-serif',
    }
});
const rtlTheme = () => createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'B-Titr',
    }
});
export {rtlCache, ltrCache, rtlTheme, ltrTheme};