import {useContext, useEffect, useId, useState} from "react";
import {Typography} from "@mui/material";
import {Button} from "antd";
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
    const {linesOfBlocks, getOperandFromMainList, t} = useContext(MainFrameContext);
    const {blockToEdit, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualLoopVarLine, setVisualLoopVarLine] = useState([]);
    const id = useId()
    useEffect(() => {
        loopVarToEdit.blockList ? setVisualLoopVarLine(
            generateLine(loopVarToEdit, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
                /*<GenerateBlock block={block} key={`${id}-${index}`}/>*/
            )
        ) : setVisualLoopVarLine([]);
    }, [loopVarToEdit, id, getOperandFromMainList]);
    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '60%',
                alignItems: 'center',
            }}
        >
            <div
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(loopVarToEdit, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '15%',
                        height: '20%',
                        alignItems: 'center',
                    }}
                >
                    <label>LOOP VAR</label>
                </div>
                <div
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '80%',
                        height: '20%',
                        alignItems: 'center',
                        border: '1px solid',
                        padding: '20px',
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
                </div>
                <div
                    style={{
                        width: '5%',
                        height: '20%',
                    }}
                ></div>
            </div>
            <div
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '15%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <Button
                    type={'primary'}
                    onClick={() => deleteLoopVarLine(loopVarToEdit, setLoopVarToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </div>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(blockToEdit, setLoopVarToEdit, setOpen)}
                sendChange={() => setOpen(false)}
                editLine={loopVarToEdit}
                setEditLine={setLoopVarToEdit}
                operators={[]}
            />
        </div>
    );
}
LoopVarBox.propTypes = {
    loopVarToEdit: PropTypes.object.isRequired,
    setLoopVarToEdit: PropTypes.func.isRequired,
}
export default LoopVarBox;