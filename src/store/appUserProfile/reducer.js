import {

    GET_PROFILE,
    RESP_GET_PROFILE,
    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    UPDATE_USER_PASSWORD,
    MSGUPPASSWORD,
    EMAIL_FORGOT_PASSWORD,
    UPDATE_FORGOT_PASSWORD

} from "./actionTypes"

const INIT_STATE = {

    respGetProfile: {},
    msgEdit: "",
    msgUpdatePassword: "",
    msgForgotPassword: "",
}

const userProfileReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    case GET_PROFILE:
      return {
        ...state,
      }
    case RESP_GET_PROFILE:
      return {
        ...state,
        respGetProfile: action.payload,
      }
    case MSGEDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
      case MSGEDIT:
        return {
          ...state,
          msgEdit: action.payload,
        }
      case MSGUPPASSWORD:
      return {
        ...state,
        msgUpdatePassword: action.payload,
      }
    case RESET_MESSAGE :
        return {
           ...state,
           msgEdit: "",
        }
    case EDIT_USER_PROFILE:
      return {
        ...state,
      }
      case UPDATE_USER_PASSWORD:
      return {
        ...state,
      }
      case EMAIL_FORGOT_PASSWORD:
      return {
        ...state,
      }
      case UPDATE_FORGOT_PASSWORD:
      return {
        ...state,
      }
     
    default:
      return state
  }
  }
  
  export default userProfileReducer