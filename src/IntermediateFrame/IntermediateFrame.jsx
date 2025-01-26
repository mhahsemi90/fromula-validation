import {Box, Button, Input, InputLabel} from "@mui/material";
import {useState} from "react";
import Line from "../ProjectObject/Line.js";
import UpFrame from "./UpFrame/UpFrame.jsx";
import DownFrame from "./DownFrame/DownFrame.jsx";
import {useTranslation} from "react-i18next";
import StatementType from "../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";
import * as Icons from "@mui/icons-material";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme} from "@mui/material/styles";
import B from "../BundleConst/B.js";
import "../../public/fonts.css"
import OperandsMainList from "./OperandsMainList.js";
import OperatorsMainList from "./OperatorsMainList.js";
import QueryResultFromTokenList from "../QueryResult/QueryResultFromTokenList.jsx";

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
const IntermediateFrame = () => {
    const [value, setValue] = useState('');
    const [linesOfBlocks, setLinesOfBlocks] = useState([]);
    const [editLine, setEditLine] = useState(new Line());
    const [lang, setLang] = useState('en');
    const [cache, setCache] = useState(ltrCache);
    const [theme, setTheme] = useState(ltrTheme);
    const {t, i18n} = useTranslation();
    const [blinkIndex, setBlinkIndex] = useState(-1);
    const [activeLineIndex, setActiveLineIndex] = useState(-1);
    const [operands, setOperands] = useState(OperandsMainList);
    const [operators, setOperators] = useState(OperatorsMainList);
    const [type, setType] = useState(
        editLine.statementType ?
            editLine.statementType :
            StatementType.EXPRESSION_STATEMENT);
    const changeLanguage = () => {
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
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    height: '6%',
                }}
            >
                <InputLabel htmlFor="my-input">تست</InputLabel>
                <Input id="my-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button variant="outlined"
                        onClick={() => QueryResultFromTokenList(value, setLinesOfBlocks)}
                >{t(B.F_SEND)}</Button>
                <Button
                    variant={'contained'}
                    endIcon={<Icons.Language/>}
                    onClick={changeLanguage}
                >{t(B.F_LANGUAGE)}</Button>
            </Box>
            <UpFrame
                editLine={editLine}
                setEditLine={setEditLine}
                linesOfBlocks={linesOfBlocks}
                setLinesOfBlocks={setLinesOfBlocks}
                blinkIndex={blinkIndex}
                setBlinkIndex={setBlinkIndex}
                setActiveLineIndex={setActiveLineIndex}
                type={type}
                setType={setType}
                operators={operators}
                operands={operands}
                cache={cache}
                theme={theme}
                t={t}
                lang={lang}/>
            <DownFrame
                linesOfBlocks={linesOfBlocks}
                setEditLine={setEditLine}
                setLinesOfBlocks={setLinesOfBlocks}
                setType={setType}
                setBlinkIndex={setBlinkIndex}
                activeLineIndex={activeLineIndex}
                setActiveLineIndex={setActiveLineIndex}
                cache={cache}
                theme={theme}
                t={t}
                lang={lang}/>
        </Box>
    )
}

export default IntermediateFrame
