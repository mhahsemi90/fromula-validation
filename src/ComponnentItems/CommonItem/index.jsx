import {Box} from "@mui/material";

const CommonItem = ({lineObject})=>{
    return (
        <Box sx={{marginX: '2px'}}>{lineObject.title}</Box>
    )
}

export default CommonItem;