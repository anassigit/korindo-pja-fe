import {
    GET_MENU,
    GET_MENU_SUCCESS,
    GET_MENU_ERROR,
  } from "./actionTypes"

  const INIT_STATE = {
    resp: {data: []},
    error: "",
  }

  const getMenuData = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_MENU:
        return {
          ...state,
        }
      case GET_MENU_SUCCESS:
        return {
          ...state,
          resp: action.payload,
        }
  
      case GET_MENU_ERROR:
        return {
          ...state,
          error: action.payload,
        }
      default:
        return state
    }
  }
  
  export default getMenuData