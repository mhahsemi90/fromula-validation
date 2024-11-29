import LineComponnent from "../LineComponnent/index.jsx";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import {Box} from "@mui/material";

const FormulaComponent = ({lineObjectsList}) => {
    return (
        <Box
            sx={{
                margin: '5px',
            }}
        >
            {lineObjectsList.map((lineObjects) =>
                (
                    <LineComponnent lineObjects={lineObjects} key={uuidv4()}/>
                )
            )}
        </Box>
    );
}
FormulaComponent.propTypes = {
    lineObjectsList: PropTypes.array.isRequired,
}
export default FormulaComponent;