import {

    EDIT_USER_PROFILE,
    MSGEDIT,
      RESET_MESSAGE

} from "./actionTypes"

const INIT_STATE = {

    msgEdit: "",
    msgDelete: "",
}

const userProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MSGEDIT:
      return {
        ...state,
        msgEdit: action.payload,
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
    default:
      return state
  }
  }
  
  export default userProfileReducer