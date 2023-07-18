import {

    GET_INSTRUCTIONS,
    RESP_GET_INSTRUCTIONS,
    SAVE_INSTRUCTIONS,
    EDIT_INSTRUCTIONS,
    DELETE_INSTRUCTIONS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE,
    GET_USER_LIST,
    RESP_GET_USER_LIST,
    GET_DETAIL_INSTRUCTION,
    RESP_GET_DETAIL_INSTRUCTION,
    SAVE_DESCRIPTION,
    SAVE_REPLY,
    DOWNLOAD_FILES,
    MSGDOWNLOAD

} from "./actionTypes"

export const getInstructionsData = (req) => ({
    type: GET_INSTRUCTIONS,
    payload: req,
  })
  
  export const respGetInstructions = resp => ({
    type: RESP_GET_INSTRUCTIONS,
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
  
  export const saveInstructions = (req) => ({
    type: SAVE_INSTRUCTIONS,
    payload: req,
  })

  export const editInstructions = (req) => ({
    type: EDIT_INSTRUCTIONS,
    payload: req,
  })

  export const deleteInstructions = (req) => ({
    type: DELETE_INSTRUCTIONS,
    payload: req,
  })

  export const getUserList = (req) => ({
    type: GET_USER_LIST,
    payload: req,
  })

  export const respGetUserList = resp => ({
    type: RESP_GET_USER_LIST,
    payload: resp,
  })

  export const getDetailInstruction = (req) => ({
    type: GET_DETAIL_INSTRUCTION,
    payload: req,
  })
  
  export const respGetDetailInstruction = resp => ({
    type: RESP_GET_DETAIL_INSTRUCTION,
    payload: resp,
  })

  export const saveDescription = (req) => ({
    type: SAVE_DESCRIPTION,
    payload: req,
  })

  export const saveReply = (req) => ({
    type: SAVE_REPLY,
    payload: req,
  })

  export const downloadFile = (req) => ({
    type: DOWNLOAD_FILES,
    payload: req,
  })

  export const msgDownload = (req) => ({
    type: MSGDOWNLOAD,
    payload: req,
  })
