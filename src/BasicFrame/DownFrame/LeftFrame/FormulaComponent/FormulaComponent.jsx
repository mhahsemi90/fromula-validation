import LineOfViewBlocks from "./LineOfViewBlocks.jsx";
import {MainFrameContext} from "../../../../MainContext.jsx";
import {useContext, useId} from "react";

const FormulaComponent = () => {
    const {linesOfBlocks} = useContext(MainFrameContext);
    const id = useId();
    return (
        <div
            style={{
                direction: 'ltr',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
            }}
        >
            {linesOfBlocks.map((line, index) =>
                (<LineOfViewBlocks line={line} key={`${id}-${index}`}/>)
            )}
        </div>
    );
}
export default FormulaComponent;