import {BACKEND_API} from "../common/constants";



export const addToOrder = async(items, user) => {
    let results = await(await fetch(`${BACKEND_API}/api/order/addToOrder/${user}`, {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
            'content-type': 'application/json'
        }
    })).json();

    return results;
}


export const getAllOrdersForUser = (user) => {
    return fetch(`${BACKEND_API}/api/order/allOrders/${user}`)
        .then(response => response.json())
}

export const getAllOrdersForSeller = (user) => {
    return fetch(`${BACKEND_API}/api/order/allOrdersForSeller/${user}`)
        .then(response => response.json())
}
