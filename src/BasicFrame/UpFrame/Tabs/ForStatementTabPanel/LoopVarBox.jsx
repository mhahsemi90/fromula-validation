import {useContext, useEffect, useId, useState} from "react";
import {Button, Typography} from "antd";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const {Text} = Typography;
const cancel = (loopVarToEdit, setModalLoopVarLine, setOpen) => {
    setModalLoopVarLine({...loopVarToEdit});
    setOpen(false);
}
const sendChange = (modalLoopVarLine, setLoopVarToEdit, setOpen) => {
    setLoopVarToEdit({...modalLoopVarLine});
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
    const {setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualLoopVarLine, setVisualLoopVarLine] = useState([]);
    const [modalLoopVarLine, setModalLoopVarLine] = useState({...loopVarToEdit});
    const id = useId()
    useEffect(() => {
        loopVarToEdit.blockList ? setVisualLoopVarLine(
            generateLine(loopVarToEdit, getOperandFromMainList).map((block, index) =>
                generateBlock(block, `${id}-${index}`)
            )
        ) : setVisualLoopVarLine([]);
        setModalLoopVarLine({...loopVarToEdit});
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
                    <Text
                        className={'flex flex-row items-center whitespace-nowrap overflow-hidden overflow-ellipsis w-full'}
                    >
                        {visualLoopVarLine}
                    </Text>
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
                cancel={() => cancel(loopVarToEdit, setModalLoopVarLine, setOpen)}
                sendChange={() => sendChange(modalLoopVarLine, setLoopVarToEdit, setOpen)}
                editLine={modalLoopVarLine}
                setEditLine={setModalLoopVarLine}
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