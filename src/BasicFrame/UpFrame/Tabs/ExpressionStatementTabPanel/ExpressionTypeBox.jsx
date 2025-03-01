import {Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
import {useContext, useEffect, useId, useState} from "react";
import {MainFrameContext} from "../../../../MainContext.jsx";
import PropTypes from "prop-types";
import {getOperatorFromMainList} from "../../../../CommonCode/getElementFromMainList.js";
import LineType from "../../../../CommonCode/LineType.js";


const ExpressionTypeBox = ({
                               assignmentOperator,
                               setAssignmentOperator,
                               resultVarName,
                               setResultVarName,
                               expressionType,
                               setExpressionType,
                               bodyLineToEdit,
                               setBodyLineToEdit,
                           }) => {
    const {localOperands, getOperandFromMainList, lang} = useContext(MainFrameContext);
    const [disable, setDisabled] = useState(true);
    const id = useId();
    const handleAssignmentChange = (e) => {
        setAssignmentOperator(getOperatorFromMainList(e.target.value));
    };
    const handleVariableChange = (e) => {
        setResultVarName(getOperandFromMainList(e.target.value));
    };
    const handleRadioChange = (e) => {
        setExpressionType(e.target.value);
        if (e.target.value === 'return') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };
    useEffect(() => {
        setDisabled(expressionType === 'return');
        if (expressionType === 'return' && bodyLineToEdit.lineType === LineType.CHANGE_VALUE_STATEMENT) {
            bodyLineToEdit.lineType = LineType.RETURN_STATEMENT;
            setBodyLineToEdit({...bodyLineToEdit});
        } else if (expressionType === 'change' && bodyLineToEdit.lineType === LineType.RETURN_STATEMENT) {
            bodyLineToEdit.lineType = LineType.CHANGE_VALUE_STATEMENT;
            bodyLineToEdit.assignmentOperator = assignmentOperator;
            bodyLineToEdit.resultVar = resultVarName;
            setBodyLineToEdit({...bodyLineToEdit});
        } else if (expressionType === 'change' && bodyLineToEdit.lineType === LineType.CHANGE_VALUE_STATEMENT) {
            bodyLineToEdit.assignmentOperator = assignmentOperator;
            bodyLineToEdit.resultVar = resultVarName;
            setBodyLineToEdit({...bodyLineToEdit});
        }
    }, [assignmentOperator, bodyLineToEdit, expressionType, resultVarName, setBodyLineToEdit]);
    return (
        <Box
            sx={{
                display: "flex",
                boxSizing: 'border-box',
                width: '100%',
                height: '20%',
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '12%',
                    height: '100%',
                }}
            >
            </Box>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '70%',
                    height: '100%',
                }}
            >


                <Box
                    sx={{
                        display: "flex",
                        boxSizing: 'border-box',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            boxSizing: 'border-box',
                            width: '30%',
                            height: '100%',
                            flexDirection: 'column',
                        }}
                    >
                        <RadioGroup value={expressionType} onChange={handleRadioChange}>
                            <FormControlLabel label={'Return value'} control={<Radio/>} value={'return'}/>
                            <FormControlLabel label={'Change value'} control={<Radio/>} value={'change'}/>
                        </RadioGroup>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            boxSizing: 'border-box',
                            width: '70%',
                            height: '100%',
                            flexDirection: 'row',
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                boxSizing: 'border-box',
                                width: '50%',
                                height: '100%',
                                marginX: '10px',
                            }}
                        >
                            <FormControl
                                sx={{
                                    display: "flex",
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    height: '100%',
                                }}
                                disabled={disable}
                            >
                                <InputLabel>AssignmentOperator</InputLabel>
                                <Select
                                    value={assignmentOperator.code ? assignmentOperator.code : ''}
                                    label="Age"
                                    onChange={handleAssignmentChange}
                                    variant={'standard'}>
                                    <MenuItem value={'+='}> += </MenuItem>
                                    <MenuItem value={'-='}> -= </MenuItem>
                                    <MenuItem value={'*='}> *= </MenuItem>
                                    <MenuItem value={'/='}> /= </MenuItem>
                                    <MenuItem value={'%='}> %= </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                boxSizing: 'border-box',
                                width: '50%',
                                height: '100%',
                                marginX: '10px',
                            }}
                        >
                            <FormControl
                                sx={{
                                    display: "flex",
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    height: '100%',
                                }}
                                disabled={disable}
                            >
                                <InputLabel>ResultVarName</InputLabel>
                                <Select
                                    value={resultVarName.code ? resultVarName.code : ''}
                                    label="Age"
                                    onChange={handleVariableChange}
                                    variant={'standard'}>
                                    {localOperands.map((item, index) =>
                                        <MenuItem value={item.code} key={`${id}-${index}`}>
                                            {lang === 'en' ? item.enTitle : item.title}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>


            </Box>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '18%',
                    height: '100%',
                }}
            >
            </Box>
        </Box>
    )
        ;
}
ExpressionTypeBox.propTypes = {
    assignmentOperator: PropTypes.object.isRequired,
    setAssignmentOperator: PropTypes.func.isRequired,
    resultVarName: PropTypes.object.isRequired,
    setResultVarName: PropTypes.func.isRequired,
    expressionType: PropTypes.string.isRequired,
    setExpressionType: PropTypes.func.isRequired,
    bodyLineToEdit: PropTypes.object.isRequired,
    setBodyLineToEdit: PropTypes.func.isRequired,
}
export default ExpressionTypeBox;