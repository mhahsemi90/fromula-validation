import {useContext, useState} from 'react';
import {Box, Fab, Paper} from '@mui/material';
import {ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, Delete} from '@mui/icons-material';
import {
    handleAddAfter,
    handleAddBefore,
    handleChangeLevel,
    handleDelete
} from "../../../../IntermediateFrame/DownFrame/LeftFrame/FormulaComponent/ActionButtonHandleEvent.js";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import PropTypes from "prop-types";

const CircularMenu = ({actions}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Box sx={{position: 'relative', width: 100, height: 100}}>
            <Fab onClick={handleToggle} sx={{position: 'absolute', top: 0, left: 0}}>
                {isOpen ? 'Close' : 'Open'}
            </Fab>
            {isOpen && actions.map((action, index) => {
                const angle = (index * (360 / actions.length)) * (Math.PI / 180);
                const radius = 80;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                    <Fab
                        key={action.name}
                        sx={{
                            position: 'absolute',
                            top: y + 50,
                            left: x + 50,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClick={action.onClick}
                    >
                        {action.icon}
                    </Fab>
                );
            })}
        </Box>
    );
};
CircularMenu.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
const MyComponent = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks} = useContext(MainFrameContext);
    const {
        activeLineToEditRow,
        setActiveLineToEditRow,
        setLineToEdit,
        setBlinkIndex,
        setType
    } = useContext(IntermediateFrameContext);
    const actions = [
        {
            icon: <ArrowUpward/>,
            name: 'Add Before',
            onClick: () => handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow),
        },
        {
            icon: <ArrowDownward/>,
            name: 'Add After',
            onClick: () => handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow)
        },
        {
            icon: <ArrowForward/>,
            name: 'Add Level',
            onClick: () => handleChangeLevel(line, 1, linesOfBlocks, setLinesOfBlocks)
        },
        {
            icon: <ArrowBack/>,
            name: 'Remove Level',
            onClick: () => handleChangeLevel(line, -1, linesOfBlocks, setLinesOfBlocks)
        },
        {
            icon: <Delete/>,
            name: 'Delete line',
            onClick: () => handleDelete(line, linesOfBlocks, setLinesOfBlocks, setLineToEdit, setType, setBlinkIndex, activeLineToEditRow, setActiveLineToEditRow)
        },
    ];

    return (
        <Paper elevation={4} sx={{padding: 2}}>
            <CircularMenu actions={actions}/>
        </Paper>
    );
};

MyComponent.propTypes = {
    line: PropTypes.object.isRequired,
}

export default MyComponent;