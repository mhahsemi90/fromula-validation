import {Box, Button, Typography} from "@mui/material";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {useContext, useEffect, useId, useState} from "react";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {ArithmeticOperatorList} from "../../../../CommonCode/OperatorsMainList.js";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const cancel = (blockToEdit, setBodyLineToEdit, setOpen) => {
    blockToEdit.body && setBodyLineToEdit(blockToEdit.body);
    setOpen(false);
}

const deleteBodyLine = (bodyLineToEdit, setBodyLineToEdit) => {
    if (bodyLineToEdit.blockList) {
        bodyLineToEdit.blockList = [];
        setBodyLineToEdit({...bodyLineToEdit});
    }
};
const BodyBox = ({bodyLineToEdit, setBodyLineToEdit}) => {
    const {linesOfBlocks, t} = useContext(MainFrameContext);
    const {blockToEdit, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualBodyLine, setVisualBodyLine] = useState([]);
    const id = useId()
    useEffect(() => {
        bodyLineToEdit.blockList ? setVisualBodyLine(
            generateLine(bodyLineToEdit).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
                /*<GenerateBlock block={block} key={`${id}-${index}`}/>*/
            )
        ) : setVisualBodyLine([]);
    }, [bodyLineToEdit, id]);
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '50%',
                alignItems: 'center',
            }}
        >
            <Box
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(bodyLineToEdit, linesOfBlocks, setHoverBlockIdList)}
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
                    <label>BODY</label>
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
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}
                    >
                        {visualBodyLine}
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
                    onClick={() => deleteBodyLine(bodyLineToEdit, setBodyLineToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </Box>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(blockToEdit, setBodyLineToEdit, setOpen)}
                sendChange={() => setOpen(false)}
                editLine={bodyLineToEdit}
                setEditLine={setBodyLineToEdit}
                operators={ArithmeticOperatorList}
            />
        </Box>
    )
}
BodyBox.propTypes = {
    bodyLineToEdit: PropTypes.object.isRequired,
    setBodyLineToEdit: PropTypes.func.isRequired,
}
export default BodyBox;