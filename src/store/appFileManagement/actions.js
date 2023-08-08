import {

    GET_SELECT,
    RESP_GET_SELECT,
    GET_SELECT_FILE,
    RESP_GET_SELECT_FILE,
    DELETE_FILE_FOLDER,
    RESET_MESSAGE,
    MSGADD,
    MSGEDIT,
    MSGDELETE

} from "./actionTypes"

export const getSelectFile = (req) => ({
    type: GET_SELECT,
    payload: req,
  })
  
  export const respGetSelect = resp => ({
    type: RESP_GET_SELECT,
    payload: resp,
  })

  export const getSelectFile2 = (req) => ({
    type: GET_SELECT_FILE,
    payload: req,
  })

  export const respGetSelectFile = resp => ({
    type: RESP_GET_SELECT_FILE,
    payload: resp,
  })

  export const deleteFileFolder = (req) => ({
    type: DELETE_FILE_FOLDER,
    payload: req,
  })

  export const resetMessage = (resp) => ({
    type: RESET_MESSAGE,
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