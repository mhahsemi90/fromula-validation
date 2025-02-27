import KeyWordViewBlock from "./ViewBlocks/KeyWordViewBlock.jsx";
import CommonViewBlock from "./ViewBlocks/CommonViewBlock.jsx";

const generateBlock = (block, id) => {
    if (block.type === "KEYWORD") {
        return <KeyWordViewBlock key={id} block={block}/>
    }
    return <CommonViewBlock key={id} block={block}/>
}
export default generateBlock;