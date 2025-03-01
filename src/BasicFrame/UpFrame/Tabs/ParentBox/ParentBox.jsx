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
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '20%',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '15%',
                        height: '100%',
                        alignItems: 'center',
                    }}
                ><label>PARENT</label>
                </div>
                <div
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '85%',
                        height: '100%',
                        alignItems: 'center',
                    }}
                ><ParentList parentList={parentList} acceptChange={acceptChange}/>
                </div>
            </div>
            <div
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '15%',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
            </div>
        </div>
    );
}
ParentBox.propTypes = {
    acceptChange: PropTypes.func.isRequired,
}
export default ParentBox;