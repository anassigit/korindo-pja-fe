import {
    GET_MENU,
    GET_MENU_ALL,
    RESP_GET_MENU,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    EDIT_MENU,
    SAVE_MENU,
    RESET_MESSAGE,
    DELETE_MENU,
  } from "./actionTypes"

  const INIT_STATE = {
    respGetMenus: {},
    msgEdit: "",
    msgAdd: "",
    msgDelete: "",
  }

  const menuReduce = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_MENU:
        return {
          ...state,
        }
      case GET_MENU_ALL:
          return {
            ...state,
          }
      case RESP_GET_MENU:
        return {
          ...state,
          respGetMenus: action.payload,
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
      case EDIT_MENU:
        return {
          ...state,
        }
      case SAVE_MENU:
        return {
          ...state,
      }
      case DELETE_MENU:
        return {
          ...state,
      }
      default:
        return state
    }
  }
  
  export default menuReduce