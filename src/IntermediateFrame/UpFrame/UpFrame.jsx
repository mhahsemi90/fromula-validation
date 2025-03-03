import AllTabs from "./Tabs/AllTabs.jsx";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {MainFrameContext} from "../../MainContext.jsx";

const UpFrame = () => {
    const {theme} = useContext(MainFrameContext);
    const {cache} = useContext(MainFrameContext);

    return (

        <div className={'flex box-border w-full h-[48%] m-1 p-1'}>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <AllTabs/>
                </ThemeProvider>
            </CacheProvider>
        </div>

    )
}
export default UpFrame;