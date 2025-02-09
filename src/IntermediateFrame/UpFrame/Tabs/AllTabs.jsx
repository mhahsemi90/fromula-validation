import {AppBar, Box, Paper, Tab, Tabs} from "@mui/material";
import TabPanel from "./TabPanel.jsx";
import B from "../../../BundleConst/B.js";
import '../../../i18n.js'
import LineType from "../../../CommonCode/LineType.js";
import StatementTabPanel from "./StatementTabPanel.jsx";
import Line from "../../../ProjectObject/Line.js";
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../MainContext.jsx";

const AllTabs = () => {
    const {type, setType} = useContext(IntermediateFrameContext);
    const {t} = useContext(MainFrameContext);
    const confirmChangeLineToEdit = (lineToEdit, linesOfBlocks, setLinesOfBlocks, lineType, setActiveLineToEditRow) => {
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
    const clear = (setLineToEdit, lineType, setBlinkIndex, setActiveLineToEditRow) => {
        setType(lineType);
        setLineToEdit(new Line());
        setBlinkIndex(-1);
        setActiveLineToEditRow(-1);
    }
    return (
        <Paper
            sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                direction: 'ltr',
                padding: '5px'
            }}>
            <Box sx={{borderRight: 1, borderColor: 'divider', height: '100%'}} position="relative">
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
            </Box>
            <TabPanel value={type} label={LineType.EXPRESSION_STATEMENT}>
                <StatementTabPanel
                    confirmChangeLineToEdit={confirmChangeLineToEdit}
                    clear={clear}
                    lineType={LineType.EXPRESSION_STATEMENT}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.IF_STATEMENT}>
                <StatementTabPanel
                    confirmChangeLineToEdit={confirmChangeLineToEdit}
                    clear={clear}
                    lineType={LineType.IF_STATEMENT}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.FOR_STATEMENT}>
                <StatementTabPanel
                    confirmChangeLineToEdit={confirmChangeLineToEdit}
                    clear={clear}
                    lineType={LineType.FOR_STATEMENT}
                />
            </TabPanel>
        </Paper>
    )
}
export default AllTabs;