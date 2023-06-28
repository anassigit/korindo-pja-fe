import {

    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    SAVE_USER_PASSWORD,
    MSGADD

} from "./actionTypes"


  export const msgEdit = resp => ({
    type: MSGEDIT,
    payload: resp,
  })

  export const msgAdd = resp => ({
    type: MSGADD,
    payload: resp,
  })

  export const resetMessage = (resp) => ({
    type: RESET_MESSAGE,
    payload: resp,
  })

  export const editUserProfile = (req) => ({
    type: EDIT_USER_PROFILE,
    payload: req,
  })

  export const saveUserPassword = (req) => ({
    type: SAVE_USER_PASSWORD,
    payload: req,
  })

