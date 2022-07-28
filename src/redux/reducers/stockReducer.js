import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function stockReducer(state=initialState.stock, action){

    switch (action.type) {
        case actionTypes.BUY_PRODUCT:
            const newState = state.filter(cartItem=>cartItem.product.id!==action.payload.id)
            return newState; // BURAYI SOR
        default:
            return state;
    }

}