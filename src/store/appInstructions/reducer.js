import {

    GET_INSTRUCTIONS,
    RESP_GET_INSTRUCTIONS,
    SAVE_INSTRUCTIONS,
    EDIT_INSTRUCTIONS,
    DELETE_INSTRUCTIONS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE,
    GET_USER_LIST,
    RESP_GET_USER_LIST,
    GET_DETAIL_INSTRUCTION,
    RESP_GET_DETAIL_INSTRUCTION,
    SAVE_DESCRIPTION,
    SAVE_REPLY,
    MSGDOWNLOAD,
    DOWNLOAD_FILES

} from "./actionTypes"

const INIT_STATE = {
    respGetInstructions: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",
    respGetUserList: {},
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
      case GET_USER_LIST:
        return {
          ...state,
      }
      case RESP_GET_USER_LIST:
        return {
          ...state,
          respGetUserList: action.payload,
      }
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
        case SAVE_REPLY:
          return {
            ...state,
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
      default:
        return state
    }
  }
  
  export default instructionsReducer