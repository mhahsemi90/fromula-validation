import {Box} from "@mui/material";
import AddNext from "../AddNext/index.jsx";
import LineComponnentItem from "../LineComponnentItem/index.jsx";
import PropTypes from "prop-types";

const LineComponnent = ({lineObjects}) => {
    return (
        <Box
            sx={{
                marginX: '5px',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}>
            <LineComponnentItem lineObjects={lineObjects}/>
            <AddNext/>
        </Box>
    )
}
LineComponnent.propTypes = {
    lineObjects: PropTypes.array.isRequired,
}
export default LineComponnent;