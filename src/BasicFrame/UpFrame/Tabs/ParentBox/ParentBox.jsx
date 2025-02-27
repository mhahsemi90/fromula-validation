import ParentList from "./ParentList.jsx";
import {Box} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {BasicFrameContext} from "../../../../MainContext.jsx";
import PropTypes from "prop-types";

const ParentBox = ({acceptChange}) => {
    const {blockToEdit} = useContext(BasicFrameContext);
    const [parentList, setParentList] = useState([]);
    useEffect(() => {
        blockToEdit.parentList ? setParentList(blockToEdit.parentList) : setParentList([]);
    }, [blockToEdit]);
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '20%',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '15%',
                        height: '100%',
                        alignItems: 'center',
                    }}
                ><label>PARENT</label>
                </Box>
                <Box sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '100%',
                    alignItems: 'center',
                }}
                ><ParentList parentList={parentList} acceptChange={acceptChange}/>
                </Box>
            </Box>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '15%',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
            </Box>
        </Box>
    );
}
ParentBox.propTypes = {
    acceptChange: PropTypes.func.isRequired,
}
export default ParentBox;