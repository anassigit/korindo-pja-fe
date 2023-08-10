import {

  SAVE_MEMBERS,
  EDIT_MEMBERS,
  DELETE_MEMBERS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,
  EDIT_GENERAL_SETTING,
  GET_GENERAL_SETTING,
  RESP_GET_GENERAL_SETTING,
  GET_SETTING,
  RESP_GET_SETTING,
  GET_MEMBERS,
  RESP_GET_MEMBERS,
  GET_RANK_LIST,
  RESP_GET_RANK_LIST,

} from "./actionTypes"

const INIT_STATE = {
  respGetSetting: {},
  respGetMembers: {},
  respGetRankList: {},
  msgAdd: "",
  msgEdit: "",
  msgDelete: "",
  msgDownload: "",
}

const settingReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    /* GET ALL SETTING */

    case GET_SETTING:
      return {
        ...state,
      }
    case RESP_GET_SETTING:
      return {
        ...state,
        respGetSetting: action.payload,
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

    /* GENERAL SETTING */

    case EDIT_GENERAL_SETTING:
      return {
        ...state,
      }

    /* MEMBERS */

    case GET_MEMBERS:
      return {
        ...state,
      }
    case RESP_GET_MEMBERS:
      return {
        ...state,
        respGetMembers: action.payload,
      }


    /* RANK LIST */

    case GET_RANK_LIST:
      return {
        ...state,
      }
    case RESP_GET_RANK_LIST:
      return {
        ...state,
        respGetRankList: action.payload,
      }

    default:
      return state
  }
}

export default settingReducer