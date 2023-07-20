import {

  GET_MEMBERS,
  RESP_GET_MEMBERS,
  SAVE_MEMBERS,
  EDIT_MEMBERS,
  DELETE_MEMBERS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,

} from "./actionTypes"

const INIT_STATE = {
  respGetMembers: {},
  msgAdd: "",
  msgEdit: "",
  msgDelete: "",
  msgDownload: "",
}

const settingReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
      }
    case RESP_GET_MEMBERS:
      return {
        ...state,
        respGetMembers: action.payload,
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
    case RESET_MESSAGE:
      return {
        ...state,
        msgAdd: "",
        msgEdit: "",
        msgDelete: "",
      }
    case SAVE_MEMBERS:
      return {
        ...state,
      }
    case EDIT_MEMBERS:
      return {
        ...state,
      }
    case DELETE_MEMBERS:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default settingReducer