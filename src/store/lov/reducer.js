import {
  LOV_MENU_PARENT,
  LOV_USER,
  LOV_DIV,
  LOV_MENU,
  LOV_COMPANY,
  MSG_LOV,
  LOV_MENU_PARENT_LIST
} from "./actionTypes"

const INIT_STATE = {
  resp: { data: [] },
}

const getLovData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case LOV_MENU_PARENT:
      return {
        ...state,
      }
    case LOV_USER:
      return {
        ...state,
      }
    case LOV_DIV:
      return {
        ...state,
      }
    case LOV_MENU:
      return {
        ...state,
      }
    case LOV_COMPANY:
      return {
        ...state,
      }
    case LOV_MENU_PARENT_LIST:
      return {
        ...state,
      }
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

export default getLovData