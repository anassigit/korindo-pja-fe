import {

    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    UPDATE_USER_PASSWORD,
    MSGUPPASSWORD,
    EMAIL_FORGOT_PASSWORD,
    UPDATE_FORGOT_PASSWORD

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

  export const emailForgotPassword = (req) => ({
    type: EMAIL_FORGOT_PASSWORD,
    payload: req,
  })

  export const updateForgotPassword = (req) => ({
    type: UPDATE_FORGOT_PASSWORD,
    payload: req,
  })

