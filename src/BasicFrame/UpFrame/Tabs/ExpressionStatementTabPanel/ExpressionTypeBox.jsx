import {FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
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
        <div
            className={'flex flex-row box-border w-full h-1/5'}
        >
            <div
                className={'box-border w-[12%] h-full'}
            >
            </div>
            <div
                className={'box-border w-[70%] h-full'}
            >
                <div
                    className={'flex flex-row box-border size-full'}
                >
                    <div
                        className={'flex flex-col box-border w-[30%] h-full'}
                    >
                        <RadioGroup value={expressionType} onChange={handleRadioChange}>
                            <FormControlLabel label={'Return value'} control={<Radio/>} value={'return'}/>
                            <FormControlLabel label={'Change value'} control={<Radio/>} value={'change'}/>
                        </RadioGroup>
                    </div>
                    <div
                        className={'flex flex-row box-border w-[70%] h-full'}
                    >
                        <div
                            className={'flex box-border w-1/2 h-full m-2.5'}
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
                        </div>
                        <div
                            className={'flex box-border w-1/2 h-full m-2.5'}
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
                        </div>
                    </div>
                </div>


            </div>
            <div
                className={'box-border w-[18%] h-full'}
            >
            </div>
        </div>
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