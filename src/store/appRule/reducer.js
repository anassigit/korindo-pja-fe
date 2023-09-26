import {
  GET_MENU,
  GET_MENU_RULE,
  GET_RULE,
  RESET_MESSAGE,
  RESP_GET_MENU,
  RESP_GET_MENU_RULE,
  RESP_GET_RULE
} from "./actionTypes"

const INIT_STATE = {

  respGetRule: {},
  respGetMenuRule: {},

}

const ruleReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    case GET_RULE:
      return {
        ...state,
      }
    case RESP_GET_RULE:
      return {
        ...state,
        respGetRule: action.payload,
      }
    case GET_MENU_RULE:
      return {
        ...state,
      }
    case RESP_GET_MENU_RULE:
      return {
        ...state,
        respGetMenuRule: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respGetRule: {},
        respGetMenuRule: {},
      }
    default:
      return state
  }
}

export default ruleReducer