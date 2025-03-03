import {Typography} from "@mui/material";
import {Button} from "antd";
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
    const {linesOfBlocks, getOperandFromMainList, t} = useContext(MainFrameContext);
    const {blockToEdit, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualBodyLine, setVisualBodyLine] = useState([]);
    const id = useId()
    useEffect(() => {
        bodyLineToEdit.blockList ? setVisualBodyLine(
            generateLine(bodyLineToEdit, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
                /*<GenerateBlock block={block} key={`${id}-${index}`}/>*/
            )
        ) : setVisualBodyLine([]);
    }, [bodyLineToEdit, getOperandFromMainList, id]);
    return (
        <div
            className={'flex items-center box-border w-full h-1/2'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-[20%]'}
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(bodyLineToEdit, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-[20%]'}
                >
                    <label>BODY</label>
                </div>
                <div
                    className={'flex items-center box-border w-4/5 h-1/5 border p-5 shadow-inner'}
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
                </div>
                <div
                    className={'w-[5%] h-1/5'}
                ></div>
            </div>
            <div
                className={'flex items-center box-border w-[15%] h-1/5'}
            >
                <Button
                    type={'primary'}
                    onClick={() => deleteBodyLine(bodyLineToEdit, setBodyLineToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </div>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(blockToEdit, setBodyLineToEdit, setOpen)}
                sendChange={() => setOpen(false)}
                editLine={bodyLineToEdit}
                setEditLine={setBodyLineToEdit}
                operators={ArithmeticOperatorList}
            />
        </div>
    )
}
BodyBox.propTypes = {
    bodyLineToEdit: PropTypes.object.isRequired,
    setBodyLineToEdit: PropTypes.func.isRequired,
}
export default BodyBox;