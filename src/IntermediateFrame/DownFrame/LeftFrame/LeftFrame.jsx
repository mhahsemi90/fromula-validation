import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {Paper} from "@mui/material";
import PropTypes from "prop-types";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";

const LeftFrame = ({
                       linesOfBlocks,
                       setLinesOfBlocks,
                       setEditLine,
                       setType,
                       setBlinkIndex,
                       activeLineIndex,
                       setActiveLineIndex,
                       cache,
                       theme,
                       t,
                       lang
                   }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '50%',
                height: '100%',
                boxSizing: 'border-box',
                overflowX: 'auto',
                margin: '5px',
                padding: '5px',
            }}
        >
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <FormulaComponent
                        linesOfBlocks={linesOfBlocks}
                        setLinesOfBlocks={setLinesOfBlocks}
                        setEditLine={setEditLine}
                        setType={setType}
                        setBlinkIndex={setBlinkIndex}
                        activeLineIndex={activeLineIndex}
                        setActiveLineIndex={setActiveLineIndex}
                        t={t}
                        lang={lang}/>
                </ThemeProvider>
            </CacheProvider>
        </Paper>
    );
}
LeftFrame.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    activeLineIndex: PropTypes.number.isRequired,
    cache: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default LeftFrame;