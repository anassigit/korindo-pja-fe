import {

  SAVE_MEMBERS,
  EDIT_MEMBERS,
  DELETE_MEMBERS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,
  EDIT_GENERAL_SETTING,
  GET_SETTING,
  RESP_GET_SETTING,
  GET_MEMBERS,
  RESP_GET_MEMBERS,
  GET_RANK_LIST,
  RESP_GET_RANK_LIST,
  GET_PERMISSION_LIST,
  RESP_GET_PERMISSION_LIST,
  GET_GROUP_LIST,
  RESP_GET_GROUP_LIST,
  GET_RELATION_LIST,
  RESP_GET_RELATION_LIST,
  SAVE_GROUP_MAPPING,
  EDIT_GROUP_MAPPING,
  DELETE_GROUP_MAPPING,
  GET_MEMBERS_MAPPING,
  RESP_GET_MEMBERS_MAPPING,
  GET_MEMBERS2,
  RESP_GET_MEMBERS2
} from "./actionTypes"

const INIT_STATE = {
  respGetSetting: {},
  respGetMembers: {},
  respGetMembers2: {},
  respGetRankList: {},
  respGetPermissionList: {},
  respGetGroupList: {},
  respGetRelationList: {},
  respGetMembersMapping: {},
  msgAdd: "",
  msgEdit: "",
  msgDelete: "",
  msgDownload: ""
}

const settingReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
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
    case EDIT_GENERAL_SETTING:
      return {
        ...state,
      }
    case GET_MEMBERS:
      return {
        ...state,
      }
    case RESP_GET_MEMBERS:
      return {
        ...state,
        respGetMembers: action.payload,
      }

    case GET_MEMBERS2:
      return {
        ...state,
      }
    case RESP_GET_MEMBERS2:
      return {
        ...state,
        respGetMembers2: action.payload,
      }
    case GET_RANK_LIST:
      return {
        ...state,
      }
    case RESP_GET_RANK_LIST:
      return {
        ...state,
        respGetRankList: action.payload,
      }
    case GET_PERMISSION_LIST:
      return {
        ...state,
      }
    case RESP_GET_PERMISSION_LIST:
      return {
        ...state,
        respGetPermissionList: action.payload,
      }
    case GET_GROUP_LIST:
      return {
        ...state,
      }
    case RESP_GET_GROUP_LIST:
      return {
        ...state,
        respGetGroupList: action.payload,
      }
    case GET_RELATION_LIST:
      return {
        ...state,
      }
    case RESP_GET_RELATION_LIST:
      return {
        ...state,
        respGetRelationList: action.payload,
      }
    case SAVE_GROUP_MAPPING:
      return {
        ...state,
      }
    case EDIT_GROUP_MAPPING:
      return {
        ...state,
      }
    case DELETE_GROUP_MAPPING:
      return {
        ...state,
      }
    case GET_MEMBERS_MAPPING:
      return {
        ...state,
      }
    case RESP_GET_MEMBERS_MAPPING:
      return {
        ...state,
        respGetMembersMapping: action.payload,
      }
    default:
      return state
  }
}

export default settingReducer