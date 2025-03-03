import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const LeftFrame = () => {
    const {cache, theme} = useContext(MainFrameContext);
    return (
        <div
            className={'flex flex-col items-start flex-wrap w-1/2 h-full overflow-auto box-border m-1 p-1 shadow-e-5 rounded'}>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <FormulaComponent/>
                </ThemeProvider>
            </CacheProvider>
        </div>
    );
}
export default LeftFrame;