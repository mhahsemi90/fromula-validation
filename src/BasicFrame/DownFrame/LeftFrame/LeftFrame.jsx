import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {Paper} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const LeftFrame = () => {
    const {cache, theme} = useContext(MainFrameContext);
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '50%',
                height: '100%',
                boxSizing: 'border-box',
                overflowX: 'auto',
                margin: '5px',
                padding: '5px',
            }}
        >
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <FormulaComponent/>
                </ThemeProvider>
            </CacheProvider>
        </Paper>
    );
}
export default LeftFrame;