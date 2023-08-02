import {

    GET_INSTRUCTIONS,
    RESP_GET_INSTRUCTIONS,

    GET_MANAGER,
    RESP_GET_MANAGER,

    GET_OWNER,
    RESP_GET_OWNER,

    GET_SELECTED_MANAGER,
    RESP_SELECTED_MANAGER,

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
    MSGDELETEREPLY

} from "./actionTypes"

const INIT_STATE = {
    respGetInstructions: {},
    respGetManager: {},
    respGetOwner: {},
    respGetSelectedManager: {},
    respGetInstructions2: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",
    // respGetUserList: {},
    respGetDetailInstruction: {},
    msgDownload: "",
    msgDeleteReply: "",
    msgAddReply: "",
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
      case RESET_MESSAGE :
          return {
             ...state,
             msgAdd: "",
             msgEdit: "",
             msgDelete: "",
             msgAddReply: "",
             msgDeleteReply: "",
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
        case SAVE_REPLY:
          return {
            ...state,
          }
        case MSGADDREPLY:
          return {
              ...state,
            msgAddReply: action.payload,
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
        
      default:
        return state
    }
  }
  
  export default instructionsReducer