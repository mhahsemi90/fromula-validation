import {Box, Paper, Tab, Tabs} from "@mui/material";
import {useContext, useState} from "react";
import OperandsTabPanel from "./OperandsTabPanel.jsx";
import {MainFrameContext} from "../../../MainContext.jsx";


const Operands = () => {
    const {mainOperands, lang} = useContext(MainFrameContext);
    const [index, setIndex] = useState(0)
    return (
        <Paper
            elevation={5}
            sx={{
                display: 'flex',
                height: '100%',
                width: '50%',
            }}
        >
            <Box sx={{display: 'flex', borderRight: 1, borderColor: 'divider', height: '100%'}}>
                <Tabs
                    value={index}
                    onChange={(event, newValue) => setIndex(newValue)}
                    orientation="vertical"
                    variant="scrollable">
                    {mainOperands.map((object, i) => {
                        return (<Tab label={lang === 'en' ? object.enTitle : object.title} value={i} key={i}/>)
                    })}
                </Tabs>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    margin: '5px',
                    padding: '10px',
                    width: '100%',
                }}
            >
                {mainOperands.map((object, i) => {
                    return (
                        <OperandsTabPanel object={object} index={index} i={i} key={i}/>)
                })}
            </Paper>
        </Paper>
    );
}
export default Operands;