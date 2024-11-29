import {Box} from "@mui/material";

const KeyWordItem = ({lineObject})=>{
    return (
        <Box sx={{marginX: '2px', color: 'blue'}}>{lineObject.title}</Box>
    )
}

export default KeyWordItem;