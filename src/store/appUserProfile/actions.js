import {

    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE

} from "./actionTypes"


  export const msgEdit = resp => ({
    type: MSGEDIT,
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
