import {Box} from "@mui/material";
import AllTabs from "./Tabs/AllTabs.jsx";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {MainFrameContext} from "../../MainContext.jsx";

const UpFrame = () => {
    const {theme} = useContext(MainFrameContext);
    const {cache} = useContext(MainFrameContext);

    return (

        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '47%',
                boxSizing: 'border-box',
                margin: '5px',
                padding: '5px',
            }}
        >
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <AllTabs/>
                </ThemeProvider>
            </CacheProvider>
        </Box>

    )
}
export default UpFrame;