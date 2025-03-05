import {Tabs} from 'antd';
import B from "../../../BundleConst/B.js";
import LineType from "../../../CommonCode/LineType.js";
import Line from "../../../ProjectObject/Line.js";
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../MainContext.jsx";
import {OperatorsMainList} from "../../../CommonCode/OperatorsMainList.js";
import StatementTabPanel from "../../../CommonCode/StatementTabPanel/StatementTabPanel.jsx";

const AllTabs = () => {
    const {linesOfBlocks, setLinesOfBlocks, t} = useContext(MainFrameContext);
    const {
        type,
        setType,
        lineToEdit,
        setLineToEdit,
        setActiveLineToEditRow
    } = useContext(IntermediateFrameContext);
    const sendChange = (lineType) => {
        const newLinesOfBlocks = [];
        let activeLineToEditRow;
        setType(lineType);
        lineToEdit.lineType = lineType;
        if (lineToEdit.row === 0 || lineToEdit.row) {
            linesOfBlocks.forEach((l, i) => {
                if (i === lineToEdit.row)
                    newLinesOfBlocks.push(lineToEdit);
                else
                    newLinesOfBlocks.push(l);
            });
            activeLineToEditRow = lineToEdit.row;
        } else {
            lineToEdit.row = linesOfBlocks.length;
            lineToEdit.lineLevel = 0;
            if (!lineToEdit.blockList)
                lineToEdit.blockList = [];
            newLinesOfBlocks.push(...linesOfBlocks);
            newLinesOfBlocks.push(lineToEdit);
            activeLineToEditRow = linesOfBlocks.length;
        }
        setLinesOfBlocks(newLinesOfBlocks);
        setActiveLineToEditRow(activeLineToEditRow);
    }
    const cancel = (lineType) => {
        setType(lineType);
        setLineToEdit(new Line());
        setActiveLineToEditRow(-1);
    }
    return (
        <div className={'flex box-border size-full p-1 shadow-e-1 rounded'}>
            <Tabs
                className={'size-full'}
                tabPosition='left'
                activeKey={type}
                onChange={setType}
                items={[
                    {
                        key: LineType.EXPRESSION_STATEMENT,
                        label: t(B.F_EXPRESSION_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children:
                            <StatementTabPanel
                                sendChange={() => sendChange(LineType.EXPRESSION_STATEMENT)}
                                cancel={() => cancel(LineType.EXPRESSION_STATEMENT)}
                                editLine={lineToEdit}
                                setEditLine={setLineToEdit}
                                operators={OperatorsMainList}
                            />,
                    },
                    {
                        key: LineType.IF_STATEMENT,
                        label: t(B.F_IF_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children:
                            <StatementTabPanel
                                sendChange={() => sendChange(LineType.IF_STATEMENT)}
                                cancel={() => cancel(LineType.IF_STATEMENT)}
                                editLine={lineToEdit}
                                setEditLine={setLineToEdit}
                                operators={OperatorsMainList}
                            />,
                    },
                    {
                        key: LineType.FOR_STATEMENT,
                        label: t(B.F_FOR_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children:
                            <StatementTabPanel
                                sendChange={() => sendChange(LineType.FOR_STATEMENT)}
                                cancel={() => cancel(LineType.FOR_STATEMENT)}
                                editLine={lineToEdit}
                                setEditLine={setLineToEdit}
                                operators={OperatorsMainList}
                            />,
                    },
                ]}
            />
        </div>
    )
}
export default AllTabs;