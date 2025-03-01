import {Typography} from "@mui/material";
import {Button} from "antd";
import EditLineDialog from "../EditLineDialog/EditLineDialog.jsx";
import {useContext, useEffect, useId, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {handleClickForEditLine, highlightChild} from "../../../CommonBasicFrameMethod.js";
import PropTypes from "prop-types";
import B from "../../../../BundleConst/B.js";
import {ComparisonOperatorList, LogicalOperatorList} from "../../../../CommonCode/OperatorsMainList.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const cancel = (blockToEdit, setTestLineToEdit, setOpen) => {
    blockToEdit.test && setTestLineToEdit(blockToEdit.test);
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
    const {blockToEdit, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [visualTestLine, setVisualTestLine] = useState([]);
    const id = useId()
    useEffect(() => {
        testLineToEdit.blockList ? setVisualTestLine(
            generateLine(testLineToEdit, getOperandFromMainList).map((block, index) =>
                generateBlock(block, `${id}-${index}`)
            )
        ) : setVisualTestLine([]);
    }, [testLineToEdit, id, getOperandFromMainList]);
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
                onMouseEnter={() => highlightChild(testLineToEdit, linesOfBlocks, setHoverBlockIdList)}
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
                    <label>TEST</label>
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
                        {visualTestLine}
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
                    onClick={() => deleteTestLine(testLineToEdit, setTestLineToEdit)}
                >{t(B.F_DELETE)}
                </Button>
            </div>
            <EditLineDialog
                open={open}
                setOpen={setOpen}
                cancel={() => cancel(blockToEdit, setTestLineToEdit, setOpen)}
                sendChange={() => setOpen(false)}
                editLine={testLineToEdit}
                setEditLine={setTestLineToEdit}
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