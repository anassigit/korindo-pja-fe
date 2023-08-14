import {

    GET_SELECT,
    RESP_GET_SELECT,
    GET_SELECT_FILE,
    RESP_GET_SELECT_FILE,
    DELETE_FILE_FOLDER,
    RENAME_FILE_FOLDER,
    DOWNLOAD_FILES,
    UPLOAD_FILES,
    MOVE_FILES,
    CREATE_FOLDER,
    SEARCH_FILE,
    RESP_SEARCH_FILE,
    MSGCREATE,
    MSGDOWNLOAD,
    MSGUPLOAD,
    MSGMOVE,
    RESET_MESSAGE,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    MSGRENAME

} from "./actionTypes"

export const getSelectFile = (req) => ({
    type: GET_SELECT,
    payload: req,
  })
  
  export const respGetSelect = resp => ({
    type: RESP_GET_SELECT,
    payload: resp,
  })

  export const getSearch = (req) => ({
    type: SEARCH_FILE,
    payload: req,
  })
  
  export const respSearchFile = resp => ({
    type: RESP_SEARCH_FILE,
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

  export const renameFileFolder = (req) => ({
    type: RENAME_FILE_FOLDER,
    payload: req,
  })

  export const downloadFile = (req) => ({
    type: DOWNLOAD_FILES,
    payload: req,
  })

  export const createFolder = (req) => ({
    type: CREATE_FOLDER,
    payload: req,
  })

  export const msgCreate = (req) => ({
    type: MSGCREATE,
    payload: req,
  })

  export const msgDownload = (req) => ({
    type: MSGDOWNLOAD,
    payload: req,
  })

  export const uploadFile = (req) => ({
    type: UPLOAD_FILES,
    payload: req,
  })

  export const msgUpload = (req) => ({
    type: MSGUPLOAD,
    payload: req,
  })

  export const moveFile = (req) => ({
    type: MOVE_FILES,
    payload: req,
  })

  export const msgMove = (req) => ({
    type: MSGMOVE,
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

  export const msgRename = (req) => ({
    type: MSGRENAME,
    payload: req,
  })