import LeftFrame from "./LeftFrame/LeftFrame.jsx";
import {ApolloProvider} from "@apollo/client";
import Client from "../../Client.js";
import FinalScriptFrame from "../../CommonCode/FinalScriptFrame/FinalScriptFrame.jsx";
import {useContext} from "react";
import {MainFrameContext} from "../../MainContext.jsx";

const DownFrame = () => {
    const {linesOfBlocks} = useContext(MainFrameContext);
    return (
        <div className={'flex box-border flex-row w-full h-[48%] m-1 p-1'}>
            <LeftFrame/>
            <ApolloProvider client={Client}>
                <FinalScriptFrame linesOfBlocks={linesOfBlocks}/>
            </ApolloProvider>
        </div>
    )
}
export default DownFrame;