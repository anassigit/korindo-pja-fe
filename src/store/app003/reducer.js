import {
    GET_ROLE,
    RESP_GET_ROLE,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    EDIT_ROLE,
    SAVE_ROLE,
    RESET_MESSAGE,
    DELETE_ROLE,
    GET_ROLE_MENU,
    RESP_ROLE_MENU,
    SAVE_ROLE_MENU,
    DELETE_ROLE_MENU,
    GET_ROLE_USER,
    RESP_ROLE_USER,
    SAVE_ROLE_USER,
    DELETE_ROLE_USER,
  } from "./actionTypes"

  const INIT_STATE = {
    respGetrole: {},
    respGetRoleMenu: {},
    respGetRoleUser: {},
    msgEdit: "",
    msgAdd: "",
    msgDelete: "",
  }

  const roleReducer = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_ROLE:
        return {
          ...state,
        }
      case RESP_GET_ROLE:
        return {
          ...state,
          respGetrole: action.payload,
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
      case EDIT_ROLE:
        return {
          ...state,
        }
      case SAVE_ROLE:
        return {
          ...state,
      }
      case DELETE_ROLE:
        return {
          ...state,
      }
      case GET_ROLE_MENU:
        return {
          ...state,
      }
      case RESP_ROLE_MENU:
        return {
          ...state,
          respGetRoleMenu: action.payload,
      }
      case SAVE_ROLE_MENU:
          return {
            ...state,
      }
      case DELETE_ROLE_MENU:
        return {
          ...state,
      }
      case GET_ROLE_USER:
        return {
          ...state,
      }
      case RESP_ROLE_USER:
        return {
          ...state,
          respGetRoleUser: action.payload,
      }
      case SAVE_ROLE_USER:
          return {
            ...state,
      }
      case DELETE_ROLE_MENU:
        return {
          ...state,
      }
      case DELETE_ROLE_USER:
        return {
          ...state,
      }
      
      default:
        return state
    }
  }
  
  export default roleReducer