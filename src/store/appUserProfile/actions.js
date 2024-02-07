import {

    GET_PROFILE,
    RESP_GET_PROFILE,
    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    UPDATE_USER_PASSWORD,
    MSGUPPASSWORD,
    EMAIL_FORGOT_PASSWORD,
    UPDATE_FORGOT_PASSWORD,
    MSG_EMAIL_FORGOT_PASSWORD,
    GET_MENU,
    RESP_GET_MENU

} from "./actionTypes"

  export const getProfile = (req) => ({
    type: GET_PROFILE,
    payload: req,
  })

  export const respGetProfile = resp => ({
    type: RESP_GET_PROFILE,
    payload: resp,
  })

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

  export const msgEmailForgotPassword = (req) => ({
    type: MSG_EMAIL_FORGOT_PASSWORD,
    payload: req,
  })

  export const updateForgotPassword = (req) => ({
    type: UPDATE_FORGOT_PASSWORD,
    payload: req,
  })

  export const getMenuList = (req) => ({
    type: GET_MENU,
    payload: req,
  })

  export const respGetMenuList = resp => ({
    type: RESP_GET_MENU,
    payload: resp,
  })