import Client from "../../Client.js";
import {gql} from "@apollo/client";
import removeTypename from "./removeTypename.js";

const GetOperandForTest = (setOperands) => {
    Client
    .query({
        query: gql`query {
            loadOperandForTest{
                type
                code
                title
                enTitle
                blockList{
                    type
                    code
                    title
                    enTitle
                }
            }
        }`,
    })
    .then((result) =>
        setOperands(
            result ?
                removeTypename(result.data.loadOperandForTest) :
                []
        )
    );
}
export default GetOperandForTest;