import {Box, Button, Paper} from "@mui/material";
import * as Icons from "@mui/icons-material";
import {useContext, useId} from "react";
import EditBlock from "./EditBlock.jsx";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import B from "../../../BundleConst/B.js";

const DownSection = () => {
    const {t} = useContext(MainFrameContext);
    const {editLine, sendChange, cancel} = useContext(StatementTabPanelContext);
    const blockList = editLine && editLine.blockList;
    const id = useId();
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '40%',
                padding: '5px',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    padding: '5px',
                    margin: '5px',
                }}
            >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: 'wrap',
                        overflowY: 'auto',
                    }}>
                    {blockList && blockList.map((block, index) =>
                        (<EditBlock block={block} index={index} key={`${id}-${index}`}/>)
                    )}
                </Box>
                <Box sx={{boxSizing: 'border-box', display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Send/>}
                        onClick={sendChange}
                    >{t(B.F_SEND)}</Button>
                    <Button
                        variant={'contained'}
                        endIcon={<Icons.Cancel/>}
                        onClick={cancel}
                    >{t(B.F_CANCEL)}</Button>
                </Box>
            </Paper>
        </Box>
    );
}
export default DownSection;