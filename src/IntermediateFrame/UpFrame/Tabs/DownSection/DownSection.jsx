import {Box, Button, Paper} from "@mui/material";
import EditBlock from "../../EditBlock.jsx";
import {v4 as uuidv4} from "uuid";
import * as Icons from "@mui/icons-material";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import '../../../../i18n.js'
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";

const DownSection = ({confirmChangeLineToEdit, clear, lineType,}) => {
    const {linesOfBlocks, setLinesOfBlocks, t} = useContext(MainFrameContext);
    const {lineToEdit, setLineToEdit, setActiveLineToEditRow, setBlinkIndex} = useContext(IntermediateFrameContext);
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
                    {lineToEdit.blockList && lineToEdit.blockList.map((block, index) =>
                        (<EditBlock block={block} index={index} key={uuidv4()}/>)
                    )}
                </Box>
                <Box sx={{boxSizing: 'border-box', display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Send/>}
                        onClick={() => confirmChangeLineToEdit(lineToEdit, linesOfBlocks, setLinesOfBlocks, lineType, setActiveLineToEditRow)}
                    >{t(B.F_SEND)}</Button>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Clear/>}
                        onClick={() => clear(setLineToEdit, lineType, setBlinkIndex, setActiveLineToEditRow)}
                    >{t(B.F_CLEAR)}</Button>
                </Box>
            </Paper>
        </Box>
    );
}
DownSection.propTypes = {
    confirmChangeLineToEdit: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    lineType: PropTypes.string.isRequired,
}
export default DownSection;