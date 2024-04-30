import {
    GET_SELECT,
    RESP_GET_SELECT,
    GET_SELECT2,
    RESP_GET_SELECT2,
    RESP_GET_SELECT_FILE,
    DELETE_FILE_FOLDER,
    RENAME_FILE_FOLDER,
    DOWNLOAD_FILES,
    DOWNLOAD_CHECK,
    RESP_DOWNLOAD_CHECK,
    UPLOAD_FILES,
    MOVE_FILES,
    CREATE_FOLDER,
    SEARCH_FILE,
    RESP_SEARCH_FILE,
    GET_MONTHLY_DATA,
    RESP_GET_MONTHLY_DATA,
    GET_MONTH,
    RESP_GET_MONTH,
    GET_YEAR,
    RESP_GET_YEAR,
    MSGDOWNLOADCHECK,
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

  export const getSelectFile2 = (req) => ({
    type: GET_SELECT2,
    payload: req,
  })
  
  export const respGetSelect2 = resp => ({
    type: RESP_GET_SELECT2,
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

  export const downloadCheckFile = (req) => ({
    type: DOWNLOAD_CHECK,
    payload: req,
  })

  export const respGetDownloadCheckFile = resp => ({
    type: RESP_DOWNLOAD_CHECK,
    payload: resp,
  })

  export const createFolder = (req) => ({
    type: CREATE_FOLDER,
    payload: req,
  })

  export const getMonthlyData = (req) => ({
    type: GET_MONTHLY_DATA,
    payload: req,
  })
  
  export const respGetMonthlyData = resp => ({
    type: RESP_GET_MONTHLY_DATA,
    payload: resp,
  })

  export const getMonth = (req) => ({
    type: GET_MONTH,
    payload: req,
  })
  
  export const respGetMonth = resp => ({
    type: RESP_GET_MONTH,
    payload: resp,
  })

  export const getYear = (req) => ({
    type: GET_YEAR,
    payload: req,
  })
  
  export const respGetYear = resp => ({
    type: RESP_GET_YEAR,
    payload: resp,
  })

  export const msgCreate = (req) => ({
    type: MSGCREATE,
    payload: req,
  })

  export const msgDownload = (req) => ({
    type: MSGDOWNLOAD,
    payload: req,
  })

  export const msgDownloadCheck = (req) => ({
    type: MSGDOWNLOADCHECK,
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