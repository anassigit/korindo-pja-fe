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

  export const getmuserData = (req) => ({
    type: GET_MUSER,
    payload: req,
  })
  
  export const respGetmuser = resp => ({
    type: RESP_GET_MUSER,
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
  
  export const editMuser = (req) => ({
    type: EDIT_MUSER,
    payload: req,
  })

  export const saveMuser = (req) => ({
    type: SAVE_MUSER,
    payload: req,
  })

  export const deleteMuser = (req) => ({
    type: DELETE_MUSER,
    payload: req,
  })


  export const getrolecomboData = (req) => ({
    type: GET_ROLE_COMBO,
    payload: req,
  })
  
  export const respGetrolecombo = resp => ({
    type: RESP_GET_ROLE_COMBO,
    payload: resp,
  })