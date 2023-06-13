import {
    GET_MENU,
    GET_MENU_SUCCESS,
    GET_MENU_ERROR,
  } from "./actionTypes"

  export const getMenuData = () => ({
    type: GET_MENU,
    payload: {},
  })
  
  export const getMenuSuccess = resp => ({
    type: GET_MENU_SUCCESS,
    payload: resp,
  })
  
  export const getMenuFail = error => ({
    type: GET_MENU_ERROR,
    payload: error,
  })
