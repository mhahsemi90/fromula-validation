import {Button, Typography} from "antd";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {useContext, useEffect, useId, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import {ComparisonOperatorList, LogicalOperatorList} from "../../../../CommonCode/OperatorsMainList.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const {Text} = Typography;
const cancel = (testLineToEdit, setModalTestLine, setOpen) => {
    setModalTestLine({...testLineToEdit});
    setOpen(false);
}
const sendChange = (modalTestLine, setTestLineToEdit, setOpen) => {
    setTestLineToEdit({...modalTestLine});
    setOpen(false);
}
const deleteTestLine = (testLineToEdit, setTestLineToEdit) => {
    if (testLineToEdit.blockList) {
        testLineToEdit.blockList = [];
        setTestLineToEdit({...testLineToEdit});
    }
};
const TestBox = ({testLineToEdit, setTestLineToEdit}) => {
    const {linesOfBlocks, getOperandFromMainList, t} = useContext(MainFrameContext);
    const {setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualTestLine, setVisualTestLine] = useState([]);
    const [modalTestLine, setModalTestLine] = useState({...testLineToEdit});
    const id = useId()
    useEffect(() => {
        testLineToEdit.blockList ? setVisualTestLine(
            generateLine(testLineToEdit, getOperandFromMainList).map((block, index) =>
                generateBlock(block, `${id}-${index}`)
            )
        ) : setVisualTestLine([]);
        setModalTestLine({...testLineToEdit});
    }, [testLineToEdit, id, getOperandFromMainList]);
    return (
        <div
            className={'flex items-center box-border w-full h-3/5'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-1/5'}
                onClick={() => handleClickForEditLine(setOpen, setHoverBlockIdList)}
                onMouseEnter={() => highlightChild(testLineToEdit, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-1/5'}
                >
                    <label>TEST</label>
                </div>
                <div
                    className={'flex items-center box-border w-4/5 h-1/5 border p-5 shadow-inner'}
                >
                    <Text
                        className={'flex flex-row items-center whitespace-nowrap overflow-hidden overflow-ellipsis w-full'}
                    >
                        {visualTestLine}
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
                    onClick={() => deleteTestLine(testLineToEdit, setTestLineToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </div>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(testLineToEdit, setModalTestLine, setOpen)}
                sendChange={() => sendChange(modalTestLine, setTestLineToEdit, setOpen)}
                editLine={modalTestLine}
                setEditLine={setModalTestLine}
                operators={[...ComparisonOperatorList, ...LogicalOperatorList]}
            />
        </div>
    );
}
TestBox.propTypes = {
    testLineToEdit: PropTypes.object.isRequired,
    setTestLineToEdit: PropTypes.func.isRequired,
}
export default TestBox;