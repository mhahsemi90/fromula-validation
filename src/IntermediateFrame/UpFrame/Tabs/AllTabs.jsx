import {AppBar, Tab, Tabs} from "@mui/material";
import B from "../../../BundleConst/B.js";
import LineType from "../../../CommonCode/LineType.js";
import Line from "../../../ProjectObject/Line.js";
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../MainContext.jsx";
import TabPanel from "../../../CommonCode/TabPanel/TabPanel.jsx";
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
        <div className={'flex size-full direction-ltr p-1 shadow-e-1'}>
            <div className={'border-r border-r-gray-50 h-full position-relative'}>
                <AppBar position="static"
                        sx={{height: '100%'}}>
                    <Tabs
                        value={type}
                        onChange={(event, newValue) => setType(newValue)}
                        orientation="vertical"
                        sx={{
                            '& .MuiTab-root': {
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#1060a8',
                                },
                            },
                            '& .Mui-selected': {
                                color: 'white !important',
                            },
                        }}>
                        <Tab label={t(B.F_EXPRESSION_STATEMENT)} value={LineType.EXPRESSION_STATEMENT}/>
                        <Tab label={t(B.F_IF_STATEMENT)} value={LineType.IF_STATEMENT}/>
                        <Tab label={t(B.F_FOR_STATEMENT)} value={LineType.FOR_STATEMENT}/>
                    </Tabs>
                </AppBar>
            </div>
            <TabPanel value={type} label={LineType.EXPRESSION_STATEMENT}>
                <StatementTabPanel
                    sendChange={() => sendChange(LineType.EXPRESSION_STATEMENT)}
                    cancel={() => cancel(LineType.EXPRESSION_STATEMENT)}
                    editLine={lineToEdit}
                    setEditLine={setLineToEdit}
                    operators={OperatorsMainList}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.IF_STATEMENT}>
                <StatementTabPanel
                    sendChange={() => sendChange(LineType.IF_STATEMENT)}
                    cancel={() => cancel(LineType.IF_STATEMENT)}
                    editLine={lineToEdit}
                    setEditLine={setLineToEdit}
                    operators={OperatorsMainList}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.FOR_STATEMENT}>
                <StatementTabPanel
                    sendChange={() => sendChange(LineType.FOR_STATEMENT)}
                    cancel={() => cancel(LineType.FOR_STATEMENT)}
                    editLine={lineToEdit}
                    setEditLine={setLineToEdit}
                    operators={OperatorsMainList}
                />
            </TabPanel>
        </div>
    )
}
export default AllTabs;