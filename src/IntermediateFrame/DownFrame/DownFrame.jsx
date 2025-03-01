import LeftFrame from "./LeftFrame/LeftFrame.jsx";
import {ApolloProvider} from "@apollo/client";
import Client from "../../Client.js";
import FinalScriptFrame from "../../CommonCode/FinalScriptFrame/FinalScriptFrame.jsx";
import {useContext} from "react";
import {MainFrameContext} from "../../MainContext.jsx";

const DownFrame = () => {
    const {linesOfBlocks} = useContext(MainFrameContext);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '47%',
                boxSizing: 'border-box',
                margin: '5px',
                padding: '5px',
            }}
        >
            <LeftFrame/>
            <ApolloProvider client={Client}>
                <FinalScriptFrame linesOfBlocks={linesOfBlocks}/>
            </ApolloProvider>
        </div>
    )
}
export default DownFrame;