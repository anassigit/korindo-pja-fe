import {
    GET_MENU,
    GET_MENU_ALL,
    RESP_GET_MENU,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    RESET_MESSAGE,
    EDIT_MENU,
    SAVE_MENU,
    DELETE_MENU
  } from "./actionTypes"

  export const getMenuData = () => ({
    type: GET_MENU,
    payload: {},
  })

  export const getMenuAlldata = (req) => ({
    type: GET_MENU_ALL,
    payload: req,
  })

  
  export const respGetMenus = resp => ({
    type: RESP_GET_MENU,
    payload: resp,
  })

  
  export const msgEdit = resp => ({
    type: MSGEDIT,
    payload: resp,
  })

  export const msgAdd = resp => ({
    type: MSGADD,
    payload: resp,
  })

  export const msgDelete = resp => ({
    type: MSGDELETE,
    payload: resp,
  })

  export const resetMessage = (resp) => ({
    type: RESET_MESSAGE,
    payload: resp,
  })
  
  export const editMenu = (req) => ({
    type: EDIT_MENU,
    payload: req,
  })

  export const saveMenu = (req) => ({
    type: SAVE_MENU,
    payload: req,
  })

  export const deleteMenu = (req) => ({
    type: DELETE_MENU,
    payload: req,
  })
