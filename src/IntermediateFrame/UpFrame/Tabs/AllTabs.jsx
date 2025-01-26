import {AppBar, Box, Paper, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import TabPanel from "./TabPanel.jsx";
import B from "../../../BundleConst/B.js";
import '../../../i18n.js'
import StatementType from "../../../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";
import StatementTabPanel from "./StatementTabPanel.jsx";
import Line from "../../../ProjectObject/Line.js";


const AllTabs = ({
                     editLine,
                     setEditLine,
                     linesOfBlocks,
                     setLinesOfBlocks,
                     blinkIndex,
                     setBlinkIndex,
                     setActiveLineIndex,
                     type,
                     setType,
                     operands,
                     operators,
                     t,
                     lang
                 }) => {
    const setEditedLine = (editLine, linesOfBlocks, setLinesOfBlocks, statementType, setActiveLineIndex) => {
        const newLinesOfBlocks = [];
        let activeLineIndex;
        setType(statementType);
        editLine.statementType = statementType;
        if (editLine.row === 0 || editLine.row) {
            linesOfBlocks.forEach((l, i) => {
                if (i === editLine.row)
                    newLinesOfBlocks.push(editLine);
                else
                    newLinesOfBlocks.push(l);
            });
            activeLineIndex = editLine.row;
        } else {
            editLine.row = linesOfBlocks.length;
            editLine.lineLevel = 0;
            if (!editLine.blockList)
                editLine.blockList = [];
            newLinesOfBlocks.push(...linesOfBlocks);
            newLinesOfBlocks.push(editLine);
            activeLineIndex = linesOfBlocks.length;
        }
        setLinesOfBlocks(newLinesOfBlocks);
        setActiveLineIndex(activeLineIndex);
    }
    const clear = (setEditLine, statementType, setBlinkIndex) => {
        setType(statementType);
        setEditLine(new Line());
        setBlinkIndex(-1);
        setActiveLineIndex(-1);
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
                        <Tab label={t(B.F_EXPRESSION_STATEMENT)} value={StatementType.EXPRESSION_STATEMENT}/>
                        <Tab label={t(B.F_IF_STATEMENT)} value={StatementType.IF_STATEMENT}/>
                        <Tab label={t(B.F_FOR_STATEMENT)} value={StatementType.FOR_STATEMENT}/>
                    </Tabs>
                </AppBar>
            </Box>
            <TabPanel value={type} label={StatementType.EXPRESSION_STATEMENT}>
                <StatementTabPanel
                    editLine={editLine}
                    setEditLine={setEditLine}
                    linesOfBlocks={linesOfBlocks}
                    setLinesOfBlocks={setLinesOfBlocks}
                    setEditedLine={setEditedLine}
                    clear={clear}
                    blinkIndex={blinkIndex}
                    setBlinkIndex={setBlinkIndex}
                    setActiveLineIndex={setActiveLineIndex}
                    statementType={StatementType.EXPRESSION_STATEMENT}
                    operands={operands}
                    operators={operators}
                    t={t}
                    lang={lang}
                />
            </TabPanel>
            <TabPanel value={type} label={StatementType.IF_STATEMENT}>
                <StatementTabPanel
                    editLine={editLine}
                    setEditLine={setEditLine}
                    linesOfBlocks={linesOfBlocks}
                    setLinesOfBlocks={setLinesOfBlocks}
                    setEditedLine={setEditedLine}
                    clear={clear}
                    blinkIndex={blinkIndex}
                    setBlinkIndex={setBlinkIndex}
                    setActiveLineIndex={setActiveLineIndex}
                    statementType={StatementType.IF_STATEMENT}
                    operands={operands}
                    operators={operators}
                    t={t}
                    lang={lang}
                />
            </TabPanel>
            <TabPanel value={type} label={StatementType.FOR_STATEMENT}>
                <StatementTabPanel
                    editLine={editLine}
                    setEditLine={setEditLine}
                    linesOfBlocks={linesOfBlocks}
                    setLinesOfBlocks={setLinesOfBlocks}
                    setEditedLine={setEditedLine}
                    clear={clear}
                    blinkIndex={blinkIndex}
                    setBlinkIndex={setBlinkIndex}
                    setActiveLineIndex={setActiveLineIndex}
                    statementType={StatementType.FOR_STATEMENT}
                    operands={operands}
                    operators={operators}
                    t={t}
                    lang={lang}
                />
            </TabPanel>
        </Paper>
    )
}
AllTabs.propTypes = {
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    setType: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    operands: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default AllTabs;