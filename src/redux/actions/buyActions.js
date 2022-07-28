import * as actionTypes from "./actionTypes"

export function buyFromCart(cartItem){
    return {type:actionTypes.BUY_PRODUCT,payload:cartItem}
}