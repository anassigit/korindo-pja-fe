import {

    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    UPDATE_USER_PASSWORD,
    MSGUPPASSWORD

} from "./actionTypes"


  export const msgEdit = resp => ({
    type: MSGEDIT,
    payload: resp,
  })

  export const msgUpdatePassword = resp => ({
    type: MSGUPPASSWORD,
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

  export const updateUserPassword = (req) => ({
    type: UPDATE_USER_PASSWORD,
    payload: req,
  })

