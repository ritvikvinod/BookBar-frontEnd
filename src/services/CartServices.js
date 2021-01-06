import {BACKEND_API} from "../common/constants";
import _ from 'lodash';


export const addToCart = async(item, user) => {
    let results = await(await fetch(`${BACKEND_API}/api/cart/addToCart/${user}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
            'content-type': 'application/json'
        }
    })).json();

    return results;
}


export const getCartItemsForUser = async (user) => {
     let response = await fetch(`${BACKEND_API}/api/cart/getCartItems/${user}`)
        .then(response => response.json())

    return _.get(response, ['items'],[])
}


export const clearCartForUser = (user) => {
    fetch(`${BACKEND_API}/api/cart/delete/${user}`, {
        method: 'DELETE'
    })
}
