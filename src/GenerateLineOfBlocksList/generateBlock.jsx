import KeyWordBlock from "../ComponnentBlocks/KeyWordBlock/index.jsx";
import CommonBlock from "../ComponnentBlocks/CommonBlock/index.jsx";
import {v4 as uuidv4} from "uuid";

const generateBlock = (block) => {
    if (block.type === "KEYWORD") {
        return <KeyWordBlock key={uuidv4()} block={block}/>
    }
    return <CommonBlock key={uuidv4()} block={block}/>
}
export default generateBlock;