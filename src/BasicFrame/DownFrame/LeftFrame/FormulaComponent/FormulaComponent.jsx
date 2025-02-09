import LineOfViewBlocks from "./LineOfViewBlocks.jsx";
import {v4 as uuidv4} from 'uuid';
import {Box} from "@mui/material";
import {MainFrameContext} from "../../../../MainContext.jsx";
import {useContext} from "react";

const FormulaComponent = () => {
    const {linesOfBlocks} = useContext(MainFrameContext);
    return (
        <Box
            sx={{
                direction: 'ltr',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
            }}
        >
            {linesOfBlocks.map((line) =>
                (<LineOfViewBlocks line={line} key={uuidv4()}/>)
            )}
        </Box>
    );
}
export default FormulaComponent;