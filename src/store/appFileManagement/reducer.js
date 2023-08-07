import {

    GET_SELECT,
    RESP_GET_SELECT

} from "./actionTypes"

const INIT_STATE = {

    respGetSelect: {},

}

const fileManagementReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case GET_SELECT:
            return {
              ...state,
            }
        case RESP_GET_SELECT:
            return {
              ...state,
              respGetSelect: action.payload,
            }

    default:
    return state
    }

}

export default fileManagementReducer