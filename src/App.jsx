import FormulaComponent from "./FormulaComponent/index.jsx";
import {
    Box, Button,
    FormControl, Input, InputLabel
} from "@mui/material";
import {useState} from "react";
import QueryResult from "./QueryResult/index.jsx";

const App = () => {
    const [lineOfBlocksList, setLineOfBlocksList] = useState([]);
    const [value, setValue] = useState('');
    return (<>
            <Box
                sx={{
                    border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        border: '1px solid pink',
                        width: '100%',
                        height: '100vh',
                        boxSizing: 'border-box',
                    }}
                >
                </Box>
                <Box
                    sx={{
                        border: '1px solid blue',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: '100vh',
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            border: '1px solid red',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            width: '100%',
                            boxSizing: 'border-box',
                            overflowX: 'hidden',
                        }}
                    >
                        <FormulaComponent lineOfBlocksList={lineOfBlocksList}/>
                    </Box>
                    <Box
                        sx={{
                            border: '1px solid yellow',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        <FormControl sx={{
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                        }}>
                            <InputLabel htmlFor="my-input">آدرس ایمیل</InputLabel>
                            <Input id="my-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                            <Button variant="outlined" onClick={() => QueryResult(value, setLineOfBlocksList)}>ارسال</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

/**/
export default App
