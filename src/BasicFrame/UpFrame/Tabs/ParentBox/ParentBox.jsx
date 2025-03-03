import ParentList from "./ParentList.jsx";
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
        <div
            className={'flex items-center box-border w-full h-1/5'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-full'}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-full'}
                ><label>PARENT</label>
                </div>
                <div
                    className={'flex items-center box-border w-[85%] h-full'}
                ><ParentList parentList={parentList} acceptChange={acceptChange}/>
                </div>
            </div>
            <div
                className={'flex items-center box-border w-[15%] h-full'}
            >
            </div>
        </div>
    );
}
ParentBox.propTypes = {
    acceptChange: PropTypes.func.isRequired,
}
export default ParentBox;