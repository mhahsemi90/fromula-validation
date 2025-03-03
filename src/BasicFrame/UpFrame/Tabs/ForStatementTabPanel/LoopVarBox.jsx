import {useContext, useEffect, useId, useState} from "react";
import {Button, Typography} from "antd";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const {Paragraph} = Typography;
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
            className={'flex items-center box-border w-full h-3/5'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-1/5'}
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(loopVarToEdit, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-1/5'}
                >
                    <label>LOOP VAR</label>
                </div>
                <div
                    className={'flex items-center box-border w-4/5 h-1/5 border p-5 shadow-inner'}
                >
                    <Paragraph
                        className={'flex flex-row'}
                    >
                        {visualLoopVarLine}
                    </Paragraph>
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