import {
  GET_MUSER,
  RESP_GET_MUSER,
  MSGEDIT,
  MSGDELETE,
  MSGADD,
  RESET_MESSAGE,
  EDIT_MUSER,
  SAVE_MUSER,
  DELETE_MUSER,
  GET_ROLE_COMBO,
  RESP_GET_ROLE_COMBO
  } from "./actionTypes"

  const INIT_STATE = {
    respGetmuser: {},
    respGetrolecombo: {},
    msgEdit: "",
    msgAdd: "",
    msgDelete: "",
  }

  const mUserReducer = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_MUSER:
        return {
          ...state,
        }
      case RESP_GET_MUSER:
        return {
          ...state,
          respGetmuser: action.payload,
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
      case MSGADD:
        return {
          ...state,
          msgAdd: action.payload,
      }
      case RESET_MESSAGE :
          return {
             ...state,
             msgEdit: "",
             msgAdd: "",
             msgDelete: "",
          }
      case EDIT_MUSER:
        return {
          ...state,
        }
      case SAVE_MUSER:
        return {
          ...state,
      }
      case DELETE_MUSER:
        return {
          ...state,
      }
      case GET_ROLE_COMBO:
        return {
          ...state,
        }
      case RESP_GET_ROLE_COMBO:
        return {
          ...state,
          respGetrolecombo: action.payload,
        }
      default:
        return state
    }
  }
  
  export default mUserReducer