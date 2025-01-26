import {Box} from "@mui/material";
import PropTypes from "prop-types";
import LeftFrame from "./LeftFrame/LeftFrame.jsx";
import RightFrame from "./RightFrame/RightFrame.jsx";
import {ApolloProvider} from "@apollo/client";
import Client from "../../Client.js";

const DownFrame = ({
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '47%',
                boxSizing: 'border-box',
                margin: '5px',
                padding: '5px',
            }}
        >
            <LeftFrame
                linesOfBlocks={linesOfBlocks}
                setLinesOfBlocks={setLinesOfBlocks}
                setEditLine={setEditLine}
                setType={setType}
                setBlinkIndex={setBlinkIndex}
                activeLineIndex={activeLineIndex}
                setActiveLineIndex={setActiveLineIndex}
                cache={cache}
                theme={theme}
                t={t}
                lang={lang}/>
            <ApolloProvider client={Client}>
                <RightFrame linesOfBlocks={linesOfBlocks}/>
            </ApolloProvider>
        </Box>
    )
}
DownFrame.propTypes = {
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
export default DownFrame;