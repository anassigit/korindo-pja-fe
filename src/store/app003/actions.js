import {
    GET_ROLE,
    RESP_GET_ROLE,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    RESET_MESSAGE,
    EDIT_ROLE,
    SAVE_ROLE,
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

  export const getroleData = (req) => ({
    type: GET_ROLE,
    payload: req,
  })
  
  export const respGetrole = resp => ({
    type: RESP_GET_ROLE,
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
  
  export const editRole = (req) => ({
    type: EDIT_ROLE,
    payload: req,
  })

  export const saveRole = (req) => ({
    type: SAVE_ROLE,
    payload: req,
  })

  export const deleteRole = (req) => ({
    type: DELETE_ROLE,
    payload: req,
  })

  export const getRoleMenuData = (req) => ({
    type: GET_ROLE_MENU,
    payload: req,
  })
  
  export const respGetRoleMenu = resp => ({
    type: RESP_ROLE_MENU,
    payload: resp,
  })

  export const saveRoleMenu = (req) => ({
    type: SAVE_ROLE_MENU,
    payload: req,
  })

  export const deleteRoleMenu = (req) => ({
    type: DELETE_ROLE_MENU,
    payload: req,
  })

  export const getRoleUserData = (req) => ({
    type: GET_ROLE_USER,
    payload: req,
  })
  
  export const respGetRoleUser = resp => ({
    type: RESP_ROLE_USER,
    payload: resp,
  })

  export const saveRoleUser = (req) => ({
    type: SAVE_ROLE_USER,
    payload: req,
  })

  export const deleteRoleUser = (req) => ({
    type: DELETE_ROLE_USER,
    payload: req,
  })
