import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const LeftFrame = () => {
    const {cache, theme} = useContext(MainFrameContext);
    return (
        <div
            className={'flex flex-col flex-wrap items-start box-border w-1/2 h-full m-1 p-1 overflow-auto shadow-e-3 rounded'}
        >
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <FormulaComponent/>
                </ThemeProvider>
            </CacheProvider>
        </div>
    );
}
export default LeftFrame;