import {Box} from "@mui/material";
import PropTypes from "prop-types";
import getComponnentItem from "../GetLineObject/getComponnentItem.js";

const LineComponnentItem = ({lineObjects}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
            }}>
            {lineObjects.map((lineObject) =>
                getComponnentItem(lineObject)
            )}
        </Box>
    )
}
LineComponnentItem.propTypes = {
    lineObjects: PropTypes.array.isRequired,
}
export default LineComponnentItem;