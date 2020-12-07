import { OBTNER_PRODUCTOS_EXITO } from "../types";

export default (state, action) => {
    switch(action.type){
        case OBTNER_PRODUCTOS_EXITO:
            return{
                ...state,
                menu: action.payload,
            }
        default:
            return state;
    }
}