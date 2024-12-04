import FormulaComponent from "./FormulaComponent/index.jsx";
import {Box, Button, FormControl, Input, InputLabel} from "@mui/material";
import {useState} from "react";
import QueryResult from "./QueryResult/index.jsx";
import EditBlock from "./EditBlock/index.jsx";
import {v4 as uuidv4} from "uuid";
import Line from "./ProjectObject/Line.js";
import SendIcon from '@mui/icons-material/Send';

function sendEditedLine(line, linesOfBlocks, setLinesOfBlocks) {
    const newLinesOfBlocks = [];
    linesOfBlocks.forEach((l, i) => {
        if (i === line.row)
            newLinesOfBlocks.push(line);
        else
            newLinesOfBlocks.push(l);
    });
    setLinesOfBlocks(newLinesOfBlocks);
}

const App = () => {
    const [linesOfBlocks, setLinesOfBlocks] = useState([]);
    const [line, setLine] = useState(new Line());
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
                    {line.blockList && line.blockList.map((block, index) =>
                        (<EditBlock block={block} line={line} setLine={setLine} index={index} key={uuidv4()}/>)
                    )}
                    <Button
                        variant={'contained'}
                        endIcon={<SendIcon/>}
                        onClick={() => sendEditedLine(line, linesOfBlocks, setLinesOfBlocks)}
                    >ارسال</Button>
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
                        <FormulaComponent linesOfBlocks={linesOfBlocks} setEditBlocks={setLine}/>
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
                            <Button variant="outlined"
                                    onClick={() => QueryResult(value, setLinesOfBlocks)}>ارسال</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

/**/
export default App
