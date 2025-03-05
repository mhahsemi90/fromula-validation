import {useContext, useEffect, useState} from "react";
import {MainFrameContext} from "../../../../MainContext.jsx";
import PropTypes from "prop-types";
import {getOperatorFromMainList} from "../../../../CommonCode/getElementFromMainList.js";
import LineType from "../../../../CommonCode/LineType.js";
import {Radio, Select, Typography} from "antd";

const {Title} = Typography;
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
    const handleAssignmentChange = (value) => {
        setAssignmentOperator(getOperatorFromMainList(value));
    };
    const handleVariableChange = (value) => {
        setResultVarName(getOperandFromMainList(value));
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
    }, [assignmentOperator, expressionType, resultVarName, setBodyLineToEdit]);
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
                        <Radio.Group
                            className={'flex flex-col gap-5'}
                            value={expressionType}
                            onChange={handleRadioChange}
                            options={[
                                {
                                    value: 'return',
                                    label: 'Return value',
                                },
                                {
                                    value: 'change',
                                    label: 'Change value',
                                }
                            ]}
                        />
                    </div>
                    <div
                        className={'flex flex-row box-border w-[70%] h-full'}
                    >
                        <div
                            className={'flex box-border w-1/2 h-full m-2.5'}
                        >
                            {/*<Title>AssignmentOperator</Title>*/}
                            <Select
                                className={'flex box-border w-full'}
                                value={assignmentOperator.code ? assignmentOperator.code : '+='}
                                onChange={handleAssignmentChange}
                                disabled={disable}
                                options={[
                                    {
                                        value: '+=',
                                        label: '+=',
                                    },
                                    {
                                        value: '-=',
                                        label: '-=',
                                    },
                                    {
                                        value: '*=',
                                        label: '*=',
                                    },
                                    {
                                        value: '/=',
                                        label: '/=',
                                    },
                                    {
                                        value: '%=',
                                        label: '%=',
                                    },
                                ]}
                            />
                        </div>
                        <div
                            className={'flex box-border w-1/2 h-full m-2.5'}
                        >
                            {/*<Title>ResultVarName</Title>*/}
                            <Select
                                className={'flex box-border w-full'}
                                value={resultVarName.code ? resultVarName.code : ''}
                                onChange={handleVariableChange}
                                disabled={disable}
                                options={localOperands.map((item) => {
                                    return {
                                        value: item.code,
                                        label: lang === 'en' ? item.enTitle : item.title,
                                    }
                                })
                                }
                            />
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