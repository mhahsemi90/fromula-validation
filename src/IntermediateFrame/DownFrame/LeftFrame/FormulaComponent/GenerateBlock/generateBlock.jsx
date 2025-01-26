import {v4 as uuidv4} from "uuid";
import KeyWordViewBlock from "./ViewBlocks/KeyWordViewBlock.jsx";
import CommonViewBlock from "./ViewBlocks/CommonViewBlock.jsx";

const generateBlock = (block,lang) => {
    if (block.type === "KEYWORD") {
        return <KeyWordViewBlock key={uuidv4()} block={block} lang={lang}/>
    }
    return <CommonViewBlock key={uuidv4()} block={block} lang={lang}/>
}
export default generateBlock;