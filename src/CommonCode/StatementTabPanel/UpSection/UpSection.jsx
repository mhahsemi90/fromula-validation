import {Box} from "@mui/material";
import Operands from "./Operands.jsx";
import Operators from "./Operators.jsx";

const UpSection = () => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '60%',
                padding: '5px',
            }}
        >
            <Operands/>
            <Operators/>
        </Box>
    );
}
export default UpSection;