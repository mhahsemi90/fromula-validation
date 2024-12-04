import {Box} from "@mui/material";
import AddNext from "../AddNext/index.jsx";
import ViewBlock from "../ViewBlock/index.jsx";
import PropTypes from "prop-types";

const LineOfBlocks = ({line,setEditBlocks}) => {
    const margin = line.lineLevel * 10 + 'px';
    return (
        <Box
            sx={{
                marginRight: margin,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}
        onClick={()=>setEditBlocks(line)}>
            <ViewBlock blocks={line.blockList}/>
            <AddNext/>
        </Box>
    )
}
LineOfBlocks.propTypes = {
    line: PropTypes.object.isRequired,
    setEditBlocks: PropTypes.func.isRequired,
}
export default LineOfBlocks;