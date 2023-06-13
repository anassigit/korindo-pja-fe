import {
    GET_RO_AKSES,
    RESP_RO_AKSES,
    MSGEDIT,
    MSGDELETE,
    MSGADD,
    MSGADD1,
    MSGADD2,
    RESET_MESSAGE,
    EDIT_RO_AKSES,
    SAVE_RO_AKSES,
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

  export const getRoAksesData = (req) => ({
    type: GET_RO_AKSES,
    payload: req,
  })
  
  export const respGetRoAkses = resp => ({
    type: RESP_RO_AKSES,
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

  export const msgAdd1 = resp => ({
    type: MSGADD1,
    payload: resp,
  })

  export const msgAdd2 = resp => ({
    type: MSGADD2,
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
  
  export const editRoAkses = (req) => ({
    type: EDIT_RO_AKSES,
    payload: req,
  })

  export const saveRoAkses = (req) => ({
    type: SAVE_RO_AKSES,
    payload: req,
  })

  export const deleteRoAkses = (req) => ({
    type: DELETE_RO_AKSES,
    payload: req,
  })

  export const getRoAksesUserData = (req) => ({
    type: GET_RO_AKSES_USER,
    payload: req,
  })
  
  export const respGetRoAksesUser = resp => ({
    type: RESP_RO_AKSES_USER,
    payload: resp,
  })

  export const saveRoAksesUser = (req) => ({
    type: SAVE_RO_AKSES_USER,
    payload: req,
  })

  export const deleteRoAksesUser = (req) => ({
    type: DELETE_RO_AKSES_USER,
    payload: req,
  })

  export const getRoAksesPlantData = (req) => ({
    type: GET_RO_AKSES_PLANT,
    payload: req,
  })

  export const respGetRoAksesPlant = resp => ({
    type: RESP_RO_AKSES_PLANT,
    payload: resp,
  })

  export const saveRoAksesPlant = (req) => ({
    type: SAVE_RO_AKSES_PLANT,
    payload: req,
  })

  export const deleteRoAksesPlant = (req) => ({
    type: DELETE_RO_AKSES_PLANT,
    payload: req,
  })
