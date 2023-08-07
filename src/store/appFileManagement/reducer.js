import {

    GET_SELECT,
    RESP_GET_SELECT,
    RESET_MESSAGE,
    MSGADD,
    MSGEDIT,
    MSGDELETE

} from "./actionTypes"

const INIT_STATE = {

    respGetSelect: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",

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
        case RESET_MESSAGE:
            return {
            ...state,
            msgEdit: "",
            msgAdd: "",
            msgDelete: "",
            }
        case MSGADD:
            return {
            ...state,
            msgAdd: action.payload,
            }
        case MSGEDIT:
            return {
            ...state,
            msgEdit: action.payload,
            }         
        case MSGDELETE:
            return {
            ...state,
            msgDelete: action.payload,
            }

    default:
    return state
    }

}

export default fileManagementReducer