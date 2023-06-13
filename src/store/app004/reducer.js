import {
    GET_RO_AKSES,
    RESP_RO_AKSES,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    MSGADD1,
    MSGADD2,
    EDIT_RO_AKSES,
    SAVE_RO_AKSES,
    RESET_MESSAGE,
    DELETE_RO_AKSES,
    GET_RO_AKSES_USER,
    RESP_RO_AKSES_USER,
    SAVE_RO_AKSES_USER,
    DELETE_RO_AKSES_USER,
    GET_RO_AKSES_PLANT,
    RESP_RO_AKSES_PLANT,
    SAVE_RO_AKSES_PLANT,
    DELETE_RO_AKSES_PLANT,
  } from "./actionTypes"

  const INIT_STATE = {
    respGetRoAkses: {},
    respGetRoAksesUser: {},
    respGetRoAksesPlant: {},
    msgEdit: "",
    msgAdd: "",
    msgAdd1: "",
    msgAdd2: "",
    msgDelete: "",
  }

  const roAksesReduce = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_RO_AKSES:
        return {
          ...state,
        }
      case RESP_RO_AKSES:
        return {
          ...state,
          respGetRoAkses: action.payload,
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

      case MSGADD1:
        return {
          ...state,
          msgAdd1: action.payload,
      }

      case MSGADD2:
        return {
          ...state,
          msgAdd2: action.payload,
      }
      case RESET_MESSAGE :
          return {
             ...state,
             msgEdit: "",
             msgAdd: "",
             msgAdd1: "",
             msgAdd2: "",
             msgDelete: "",
          }
      case EDIT_RO_AKSES:
        return {
          ...state,
        }
      case SAVE_RO_AKSES:
        return {
          ...state,
      }
      case DELETE_RO_AKSES:
        return {
          ...state,
      }
      case GET_RO_AKSES_USER:
        return {
          ...state,
      }
      case RESP_RO_AKSES_USER:
        return {
          ...state,
          respGetRoAksesUser: action.payload,
      }
      case SAVE_RO_AKSES_USER:
          return {
            ...state,
      }
      case DELETE_RO_AKSES_USER:
        return {
          ...state,
      }
      case GET_RO_AKSES_PLANT:
        return {
          ...state,
      }
      case RESP_RO_AKSES_PLANT:
        return {
          ...state,
          respGetRoAksesPlant: action.payload,
      }
      case SAVE_RO_AKSES_PLANT:
          return {
            ...state,
      }
      case DELETE_RO_AKSES_PLANT:
        return {
          ...state,
      }
      default:
        return state
    }
  }
  
  export default roAksesReduce