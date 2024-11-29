import KeyWordItem from "../ComponnentItems/KeyWordItem/index.jsx";
import CommonItem from "../ComponnentItems/CommonItem/index.jsx";
import {v4 as uuidv4} from "uuid";

const getComponnentItem = (lineObject) => {
    if (lineObject.type === "KEYWORD") {
        return <KeyWordItem key={uuidv4()} lineObject={lineObject}/>
    }
    return <CommonItem key={uuidv4()} lineObject={lineObject}/>
}
export default getComponnentItem;