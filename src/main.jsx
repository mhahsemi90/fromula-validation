import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import IntermediateFrame from './IntermediateFrame/IntermediateFrame.jsx'
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({direction: 'rtl'})


createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*<CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>*/}
                <IntermediateFrame/>
            {/*</ThemeProvider>
        </CacheProvider>*/}
    </StrictMode>,
)
