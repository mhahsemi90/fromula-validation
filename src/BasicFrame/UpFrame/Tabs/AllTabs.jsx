import {Tabs} from 'antd';
import B from "../../../BundleConst/B.js";
import LineType from "../../../CommonCode/LineType.js";
import ExpressionStatementTabPanel from "./ExpressionStatementTabPanel/ExpressionStatementTabPanel.jsx";
import {useContext, useEffect, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../MainContext.jsx";
import IfStatementTabPanel from "./IfStatementTabPanel/IfStatementTabPanel.jsx";
import ForStatementTabPanel from "./ForStatementTabPanel/ForStatementTabPanel.jsx";


const AllTabs = () => {
    const {t} = useContext(MainFrameContext);
    const {blockToEdit} = useContext(BasicFrameContext);
    const [type, setType] = useState(LineType.EXPRESSION_STATEMENT)
    useEffect(() => {
            if (blockToEdit.lineType) {
                if (blockToEdit.lineType === LineType.RETURN_STATEMENT ||
                    blockToEdit.lineType === LineType.CHANGE_VALUE_STATEMENT)
                    setType(LineType.EXPRESSION_STATEMENT);
                else
                    setType(blockToEdit.lineType);
            } else {
                setType(LineType.EXPRESSION_STATEMENT);
            }
        }, [blockToEdit]
    );
    return (
        <div className={'flex box-border size-full p-1 shadow-e-1 rounded'}>
            <Tabs
                className={'size-full'}
                tabPosition='left'
                activeKey={type}
                onChange={setType}
                items={[
                    {
                        key: LineType.EXPRESSION_STATEMENT,
                        label: t(B.F_EXPRESSION_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children: <ExpressionStatementTabPanel/>,
                        disabled: blockToEdit.lineType && blockToEdit.lineType !== LineType.EXPRESSION_STATEMENT
                    },
                    {
                        key: LineType.IF_STATEMENT,
                        label: t(B.F_IF_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children: <IfStatementTabPanel/>,
                        disabled: blockToEdit.lineType && blockToEdit.lineType !== LineType.IF_STATEMENT
                    },
                    {
                        key: LineType.FOR_STATEMENT,
                        label: t(B.F_FOR_STATEMENT),
                        className: 'size-full !pl-1.5',
                        children: <ForStatementTabPanel/>,
                        disabled: blockToEdit.lineType && blockToEdit.lineType !== LineType.FOR_STATEMENT
                    },
                ]}
            />
        </div>
    )
}
export default AllTabs;