import {Button, ButtonGroup, ClickAwayListener, Popper} from "@mui/material";
import PropTypes from "prop-types";
import LineType from "../../../../CommonCode/LineType.js";

const PopperForSelectStatementType = ({anchorEl, setAnchorEl, open, setOpen, createStatement}) => {
    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <ButtonGroup variant="outlined">
                    <Button
                        onClick={() => createStatement(LineType.EXPRESSION_STATEMENT)}
                    >One</Button>
                    <Button
                        onClick={() => createStatement(LineType.IF_STATEMENT)}
                    >Two</Button>
                    <Button
                        onClick={() => createStatement(LineType.FOR_STATEMENT)}
                    >Three</Button>
                </ButtonGroup>
            </ClickAwayListener>
        </Popper>
    );
}


PopperForSelectStatementType.propTypes = {
    anchorEl: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null])
    ]),
    setAnchorEl: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    createStatement: PropTypes.func.isRequired,
}
export default PopperForSelectStatementType;