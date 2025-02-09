import {AppBar, Box, Paper, Tab, Tabs} from "@mui/material";
import TabPanel from "./TabPanel.jsx";
import B from "../../../BundleConst/B.js";
import '../../../i18n.js'
import LineType from "../../../CommonCode/LineType.js";
import StatementTabPanel from "./StatementTabPanel.jsx";
import {useContext} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../MainContext.jsx";


const AllTabs = () => {
    const {type, setType} = useContext(BasicFrameContext);
    const {t} = useContext(MainFrameContext);
    const updateEditedBasicLine = () => {
    }
    const clear = () => {
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
                    updateEditedBasicLine={updateEditedBasicLine}
                    clear={clear}
                    lineType={LineType.EXPRESSION_STATEMENT}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.IF_STATEMENT}>
                <StatementTabPanel
                    updateEditedBasicLine={updateEditedBasicLine}
                    clear={clear}
                    lineType={LineType.IF_STATEMENT}
                />
            </TabPanel>
            <TabPanel value={type} label={LineType.FOR_STATEMENT}>
                <StatementTabPanel
                    updateEditedBasicLine={updateEditedBasicLine}
                    clear={clear}
                    lineType={LineType.FOR_STATEMENT}
                />
            </TabPanel>
        </Paper>
    )
}
export default AllTabs;