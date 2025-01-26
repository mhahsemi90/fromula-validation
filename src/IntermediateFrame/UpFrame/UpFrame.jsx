import {Box} from "@mui/material";
import PropTypes from "prop-types";
import AllTabs from "./Tabs/AllTabs.jsx";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";

const UpFrame = ({
                     editLine,
                     setEditLine,
                     linesOfBlocks,
                     setLinesOfBlocks,
                     blinkIndex,
                     setBlinkIndex,
                     setActiveLineIndex,
                     type,
                     setType,
                     operators,
                     operands,
                     t,
                     lang,
                     cache,
                     theme
                 }) => {
    return (

        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '47%',
                boxSizing: 'border-box',
                margin: '5px',
                padding: '5px',
            }}
        >
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <AllTabs
                        setLinesOfBlocks={setLinesOfBlocks}
                        editLine={editLine}
                        setEditLine={setEditLine}
                        linesOfBlocks={linesOfBlocks}
                        blinkIndex={blinkIndex}
                        setBlinkIndex={setBlinkIndex}
                        setActiveLineIndex={setActiveLineIndex}
                        type={type}
                        setType={setType}
                        operators={operators}
                        operands={operands}
                        t={t}
                        lang={lang}/>
                </ThemeProvider>
            </CacheProvider>
        </Box>

    )
}
UpFrame.propTypes = {
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setType: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    operands: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    cache: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default UpFrame;