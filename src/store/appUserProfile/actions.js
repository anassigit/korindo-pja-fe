import {

    GET_USER_PROFILE,
    RESP_GET_USER_PROFILE,
    SAVE_USER_PROFILE,
    EDIT_USER_PROFILE,
    DELETE_USER_PROFILE,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE

} from "./actionTypes"

export const getUserProfilData = (req) => ({
    type: GET_USER_PROFILE,
    payload: req,
  })
  
  export const respGetUserProfile = resp => ({
    type: RESP_GET_USER_PROFILE,
    payload: resp,
  })
  
  export const msgAdd = resp => ({
    type: MSGADD,
    payload: resp,
  })

  export const msgEdit = resp => ({
    type: MSGEDIT,
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
  
  export const saveUserProfile = (req) => ({
    type: SAVE_USER_PROFILE,
    payload: req,
  })

  export const editUserProfile = (req) => ({
    type: EDIT_USER_PROFILE,
    payload: req,
  })

  export const deleteUserProfile = (req) => ({
    type: DELETE_USER_PROFILE,
    payload: req,
  })