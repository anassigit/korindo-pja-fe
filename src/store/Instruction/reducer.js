import {

  GET_INSTRUCTIONS,
  RESP_GET_INSTRUCTIONS,

  GET_MANAGER,
  RESP_GET_MANAGER,

  GET_OWNER,
  RESP_GET_OWNER,

  GET_SELECTED_MANAGER,
  RESP_SELECTED_MANAGER,

  GET_STATUS,
  RESP_GET_STATUS,

  GET_ATTACHMENT,
  RESP_GET_ATTACHMENT,

  GET_INSTRUCTIONS2,
  RESP_GET_INSTRUCTIONS2,
  SAVE_INSTRUCTIONS,
  EDIT_INSTRUCTIONS,
  DELETE_INSTRUCTIONS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,
  // GET_USER_LIST,
  // RESP_GET_USER_LIST,
  GET_DETAIL_INSTRUCTION,
  RESP_GET_DETAIL_INSTRUCTION,
  SAVE_DESCRIPTION,
  SAVE_REPLY,
  MSGADDREPLY,
  MSGDOWNLOAD,
  DOWNLOAD_FILES,
  DELETE_REPLY,
  MSGDELETEREPLY,
  GET_REPLY,
  RESP_GET_REPLY,

  MSGEDITREPLY,
  EDIT_REPLY,
  GET_LOGS,
  RESP_GET_LOGS,
  GET_CHECK_DOWNLOAD,
  RESP_GET_CHECK_DOWNLOAD,
  GET_SELECTED_REPLY,
  RESP_GET_SELECTED_REPLY,
  GET_GROUP_LIST_INST,
  RESP_GET_GROUP_LIST_INST,
  GET_ALL_STATUS,
  RESP_GET_ALL_STATUS

} from "./actionTypes"

const INIT_STATE = {
  respGetInstructions: {},
  respGetGroupList: {},
  respGetAllStatus: {},
  respGetManager: {},
  respGetOwner: {},
  respGetStatus: {},
  respGetSelectedManager: {},
  respGetInstructions2: {},
  respGetReply: {},
  respGetSelectedReply: {},
  respGetCheckDownload: {},
  msgEditReply: "",
  msgDeleteReply: "",
  msgAddReply: "",
  respGetAttachment: {},
  respGetLogs: {},
  msgAdd: "",
  msgEdit: "",
  msgDelete: "",
  respGetDetailInstruction: {},
  msgDownload: "",
}

const instructionsReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_INSTRUCTIONS:
      return {
        ...state,
      }
    case RESP_GET_INSTRUCTIONS:
      return {
        ...state,
        respGetInstructions: action.payload,
      }
    case GET_GROUP_LIST_INST:
      return {
        ...state,
      }
    case RESP_GET_GROUP_LIST_INST:
      return {
        ...state,
        respGetGroupList: action.payload,
      }
    case GET_ALL_STATUS:
      return {
        ...state,
      }
    case RESP_GET_ALL_STATUS:
      return {
        ...state,
        respGetAllStatus: action.payload,
      }
    case GET_MANAGER:
      return {
        ...state,
      }
    case RESP_GET_MANAGER:
      return {
        ...state,
        respGetManager: action.payload,
      }
    case GET_OWNER:
      return {
        ...state,
      }
    case RESP_GET_OWNER:
      return {
        ...state,
        respGetOwner: action.payload,
      }
    case GET_SELECTED_MANAGER:
      return {
        ...state,
      }
    case RESP_SELECTED_MANAGER:
      return {
        ...state,
        respGetSelectedManager: action.payload,
      }
    case GET_STATUS:
      return {
        ...state,
      }
    case RESP_GET_STATUS:
      return {
        ...state,
        respGetStatus: action.payload,
      }
    case GET_INSTRUCTIONS2:
      return {
        ...state,
      }
    case RESP_GET_INSTRUCTIONS2:
      return {
        ...state,
        respGetInstructions2: action.payload,
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
        respGetCheckDownload: {},
        msgEditReply: "",
        msgDeleteReply: "",
        msgAddReply: "",
        msgAdd: "",
        msgEdit: "",
        msgDelete: "",
        msgDownload: "",
      }
    case SAVE_INSTRUCTIONS:
      return {
        ...state,
      }
    case EDIT_INSTRUCTIONS:
      return {
        ...state,
      }
    case DELETE_INSTRUCTIONS:
      return {
        ...state,
      }
    // case GET_USER_LIST:
    //   return {
    //     ...state,
    // }
    // case RESP_GET_USER_LIST:
    //   return {
    //     ...state,
    //     respGetUserList: action.payload,
    // }
    case GET_DETAIL_INSTRUCTION:
      return {
        ...state,
      }
    case RESP_GET_DETAIL_INSTRUCTION:
      return {
        ...state,
        respGetDetailInstruction: action.payload,
      }
    case SAVE_DESCRIPTION:
      return {
        ...state,
      }
    case GET_CHECK_DOWNLOAD:
      return {
        ...state,
      }
    case RESP_GET_CHECK_DOWNLOAD:
      return {
        ...state,
        respGetCheckDownload: action.payload,
      }
    /**** REPLIES ****/

    case GET_REPLY:
      return {
        ...state,
      }
    case RESP_GET_REPLY:
      return {
        ...state,
        respGetReply: action.payload,
      }

    case GET_SELECTED_REPLY:
      return {
        ...state,
      }
    case RESP_GET_SELECTED_REPLY:
      return {
        ...state,
        respGetSelectedReply: action.payload,
      }

    case SAVE_REPLY:
      return {
        ...state,
      }
    case MSGADDREPLY:
      return {
        ...state,
        msgAddReply: action.payload,
      }
    case EDIT_REPLY:
      return {
        ...state,
      }
    case MSGEDITREPLY:
      return {
        ...state,
        msgEditReply: action.payload,
      }
    case MSGDOWNLOAD:
      return {
        ...state,
        msgDownload: action.payload,
      }
    case DOWNLOAD_FILES:
      return {
        ...state,
      }
    case DELETE_REPLY:
      return {
        ...state,
      }

    case MSGDELETEREPLY:
      return {
        ...state,
        msgDeleteReply: action.payload,
      }

    /**** ENDS HERE ****/

    case GET_ATTACHMENT:
      return {
        ...state,
      }
    case RESP_GET_ATTACHMENT:
      return {
        ...state,
        respGetAttachment: action.payload,
      }

    /***** LOGS *****/

    case GET_LOGS:
      return {
        ...state,
      }
    case RESP_GET_LOGS:
      return {
        ...state,
        respGetLogs: action.payload,
      }

    default:
      return state
  }
}

export default instructionsReducer