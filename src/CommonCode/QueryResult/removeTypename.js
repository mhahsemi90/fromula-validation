import Block from "../../ProjectObject/Block.js";
import ChangeValueLine from "../../ProjectObject/ChangeValueLine.js";

const removeTypename = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(removeTypename);
    } else if (obj !== null && typeof obj === 'object') {
        const {__typename, ...rest} = obj;
        Object.keys(rest).forEach((key) => {
            rest[key] = removeTypename(rest[key]);
        });
        let finalObject = {};
        if (__typename === 'Line') {
            finalObject = new ChangeValueLine(
                rest.row, rest.lineLevel, rest.blockList, rest.id, rest.parentId, rest.assignmentOperator, rest.resultVar
            )
            finalObject.lineType = rest.lineType;
        }
        if (__typename === 'Block') {
            finalObject = new Block(
                rest.type, rest.title, rest.enTitle, rest.code, rest.blockList
            )
        }
        return finalObject;
    }
    return obj;
}
export default removeTypename;