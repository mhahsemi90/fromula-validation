import {useContext, useEffect, useId, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const cancel = (blockToEdit, setLoopVarToEdit, setOpen) => {
    blockToEdit.loopVar && setLoopVarToEdit(blockToEdit.loopVar);
    setOpen(false);
}
const deleteLoopVarLine = (loopVarToEdit, setLoopVarToEdit) => {
    if (loopVarToEdit.blockList) {
        loopVarToEdit.blockList = [];
        setLoopVarToEdit({...loopVarToEdit});
    }
};

const LoopVarBox = ({loopVarToEdit, setLoopVarToEdit}) => {
    const {linesOfBlocks, t} = useContext(MainFrameContext);
    const {blockToEdit, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualLoopVarLine, setVisualLoopVarLine] = useState([]);
    const id = useId()
    useEffect(() => {
        loopVarToEdit.blockList ? setVisualLoopVarLine(
            generateLine(loopVarToEdit).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
                /*<GenerateBlock block={block} key={`${id}-${index}`}/>*/
            )
        ) : setVisualLoopVarLine([]);
    }, [loopVarToEdit, id]);
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '60%',
                alignItems: 'center',
            }}
        >
            <Box
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(loopVarToEdit, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '15%',
                        height: '20%',
                        alignItems: 'center',
                    }}
                >
                    <label>LOOP VAR</label>
                </Box>
                <Box sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '80%',
                    height: '20%',
                    alignItems: 'center',
                    border: '1px solid',
                    padding: 2,
                    boxShadow: '1px 1px 2px inset',
                }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}
                    >
                        {visualLoopVarLine}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '5%',
                        height: '20%',
                    }}
                ></Box>
            </Box>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '15%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => deleteLoopVarLine(loopVarToEdit, setLoopVarToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </Box>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(blockToEdit, setLoopVarToEdit, setOpen)}
                sendChange={() => setOpen(false)}
                editLine={loopVarToEdit}
                setEditLine={setLoopVarToEdit}
                operators={[]}
            />
        </Box>
    );
}
LoopVarBox.propTypes = {
    loopVarToEdit: PropTypes.object.isRequired,
    setLoopVarToEdit: PropTypes.func.isRequired,
}
export default LoopVarBox;