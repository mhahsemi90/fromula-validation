import {AppBar, Paper, Tab, Tabs} from "@mui/material";
import TabPanel from "../../../CommonCode/TabPanel/TabPanel.jsx";
import B from "../../../BundleConst/B.js";
import LineType from "../../../CommonCode/LineType.js";
import ExpressionStatementTabPanel from "./ExpressionStatementTabPanel/ExpressionStatementTabPanel.jsx";
import {useContext, useEffect, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../MainContext.jsx";
import IfStatementTabPanel from "./IfStatementTabPanel/IfStatementTabPanel.jsx";
import ForStatementTabPanel from "./ForStatementTabPanel/ForStatementTabPanel.jsx";


const AllTabs = () => {
    const {t} = useContext(MainFrameContext);
    const {blockToEdit} = useContext(BasicFrameContext);
    const [type, setType] = useState(LineType.EXPRESSION_STATEMENT)
    useEffect(() => {
            if (blockToEdit.lineType) {
                if (blockToEdit.lineType === LineType.RETURN_STATEMENT ||
                    blockToEdit.lineType === LineType.CHANGE_VALUE_STATEMENT)
                    setType(LineType.EXPRESSION_STATEMENT);
                else
                    setType(blockToEdit.lineType);
            } else {
                setType(LineType.EXPRESSION_STATEMENT);
            }
        }, [blockToEdit]
    );
    return (
        <Paper
            sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                direction: 'ltr',
                padding: '5px'
            }}>
            <div style={{borderRight: 1, borderColor: 'blue', height: '100%'}}>
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
                        <Tab
                            label={t(B.F_EXPRESSION_STATEMENT)}
                            value={LineType.EXPRESSION_STATEMENT}
                            disabled={blockToEdit.lineType && blockToEdit.lineType !== LineType.EXPRESSION_STATEMENT}
                        />
                        <Tab
                            label={t(B.F_IF_STATEMENT)}
                            value={LineType.IF_STATEMENT}
                            disabled={blockToEdit.lineType && blockToEdit.lineType !== LineType.IF_STATEMENT}
                        />
                        <Tab
                            label={t(B.F_FOR_STATEMENT)}
                            value={LineType.FOR_STATEMENT}
                            disabled={blockToEdit.lineType && blockToEdit.lineType !== LineType.FOR_STATEMENT}
                        />
                    </Tabs>
                </AppBar>
            </div>
            <TabPanel value={type} label={LineType.EXPRESSION_STATEMENT}>
                <ExpressionStatementTabPanel/>
            </TabPanel>
            <TabPanel value={type} label={LineType.IF_STATEMENT}>
                <IfStatementTabPanel/>
            </TabPanel>
            <TabPanel value={type} label={LineType.FOR_STATEMENT}>
                <ForStatementTabPanel/>
            </TabPanel>
        </Paper>
    )
}
export default AllTabs;