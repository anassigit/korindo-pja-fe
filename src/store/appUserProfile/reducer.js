import {

    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    SAVE_USER_PASSWORD,
    MSGADD

} from "./actionTypes"

const INIT_STATE = {

    msgEdit: "",
    msgAdd: "",
}

const userProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MSGEDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
      case MSGADD:
      return {
        ...state,
        msgAdd: action.payload,
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
      case SAVE_USER_PASSWORD:
      return {
        ...state,
      }
    default:
      return state
  }
  }
  
  export default userProfileReducer