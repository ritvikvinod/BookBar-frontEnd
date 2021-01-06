import {BACKEND_API} from "../common/constants";
import _ from 'lodash';


export const addToWishList = async(item, user) => {
    let results = await(await fetch(`${BACKEND_API}/api/wish/addToWish/${user}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
            'content-type': 'application/json'
        }
    })).json();

    return results;
}



export const getWishListItems = async (user) => {
    let response = await fetch(`${BACKEND_API}/api/wish/getWishlist/${user}`)
        .then(response => response.json())

    return _.get(response, ['items'],[])
}

export const clearWishList = async (user) =>{
    let response = await fetch(`${BACKEND_API}/api/wish/delete/${user}`,{
        method: 'DELETE'
    }).then(response => response.json());

    return response;
}

