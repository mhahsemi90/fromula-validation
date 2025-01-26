import {Box, Button, Paper} from "@mui/material";
import EditBlock from "../../EditBlock.jsx";
import {v4 as uuidv4} from "uuid";
import * as Icons from "@mui/icons-material";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import '../../../../i18n.js'

const DownSection = ({
                         editLine,
                         setEditLine,
                         linesOfBlocks,
                         setLinesOfBlocks,
                         setEditedLine,
                         clear,
                         statementType,
                         blinkIndex,
                         setBlinkIndex,
                         setActiveLineIndex,
                         t,
                         lang
                     }) => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '40%',
                padding: '5px',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    padding: '5px',
                    margin: '5px',
                }}
            >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: 'wrap',
                        overflowY: 'auto',
                    }}>
                    {editLine.blockList && editLine.blockList.map((block, index) =>
                        (<EditBlock block={block} editLine={editLine} setEditLine={setEditLine} index={index}
                                    setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} lang={lang}
                                    key={uuidv4()}/>)
                    )}
                </Box>
                <Box sx={{boxSizing: 'border-box', display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Send/>}
                        onClick={() => setEditedLine(editLine, linesOfBlocks, setLinesOfBlocks, statementType,setActiveLineIndex)}
                    >{t(B.F_SEND)}</Button>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Clear/>}
                        onClick={() => clear(setEditLine, statementType, setBlinkIndex, setActiveLineIndex)}
                    >{t(B.F_CLEAR)}</Button>
                </Box>
            </Paper>
        </Box>
    );
}
DownSection.propTypes = {
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setEditedLine: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    statementType: PropTypes.string.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default DownSection;