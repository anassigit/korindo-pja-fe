import {

    GET_USER_PROFILE,
    RESP_GET_USER_PROFILE,
    SAVE_USER_PROFILE,
    EDIT_USER_PROFILE,
    DELETE_USER_PROFILE,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE

} from "./actionTypes"

const INIT_STATE = {
    respGetUserProfile: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",
}

const userProfileReducer = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_USER_PROFILE:
        return {
          ...state,
        }
      case RESP_GET_USER_PROFILE:
        return {
          ...state,
          respGetUserProfile: action.payload,
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
      case RESET_MESSAGE :
          return {
             ...state,
             msgAdd: "",
             msgEdit: "",
             msgDelete: "",
          }
      case SAVE_USER_PROFILE:
        return {
          ...state,
        }
      case EDIT_USER_PROFILE:
        return {
          ...state,
      }
      case DELETE_USER_PROFILE:
        return {
          ...state,
      }
      default:
        return state
    }
  }
  
  export default userProfileReducer