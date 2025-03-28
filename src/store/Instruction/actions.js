import {

    GET_INSTRUCTIONS,
    RESP_GET_INSTRUCTIONS,
    GET_MANAGER,
    RESP_GET_MANAGER,
    GET_OWNER,
    RESP_GET_OWNER,
    GET_SELECTED_MANAGER,
    RESP_SELECTED_MANAGER,
    GET_STATUS,
    RESP_GET_STATUS,
    GET_INSTRUCTIONS2,
    RESP_GET_INSTRUCTIONS2,
    SAVE_INSTRUCTIONS,
    EDIT_INSTRUCTIONS,
    DELETE_INSTRUCTIONS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE,
    // GET_USER_LIST,
    // RESP_GET_USER_LIST,
    GET_DETAIL_INSTRUCTION,
    RESP_GET_DETAIL_INSTRUCTION,
    SAVE_DESCRIPTION,
    SAVE_REPLY,
    MSGADDREPLY,
    DOWNLOAD_FILES,
    MSGDOWNLOAD,
    DELETE_REPLY,
    MSGDELETEREPLY,
    GET_REPLY,
    RESP_GET_REPLY,
    GET_ATTACHMENT,
    RESP_GET_ATTACHMENT,
    EDIT_REPLY,
    MSGEDITREPLY,
    GET_LOGS,
    RESP_GET_LOGS,
    GET_CHECK_DOWNLOAD,
    RESP_GET_CHECK_DOWNLOAD,
    GET_SELECTED_REPLY,
    RESP_GET_SELECTED_REPLY,
    GET_GROUP_LIST_INST,
    RESP_GET_GROUP_LIST_INST,
    GET_ALL_STATUS,
    RESP_GET_ALL_STATUS

} from "./actionTypes"

export const getInstructionsData = (req) => ({
  type: GET_INSTRUCTIONS,
  payload: req,
})

export const respGetInstructions = resp => ({
  type: RESP_GET_INSTRUCTIONS,
  payload: resp,
})

export const getGroupListData = (req) => ({
  type: GET_GROUP_LIST_INST,
  payload: req,
})

  export const getAllStatusData = (req) => ({
    type: GET_ALL_STATUS,
    payload: req,
  })

  export const respGetAllStatus = resp => ({
    type: RESP_GET_ALL_STATUS,
    payload: resp,
  })

export const respGetGroupList = resp => ({
  type: RESP_GET_GROUP_LIST_INST,
  payload: resp,
})

  export const getManager = (req) => ({
    type: GET_MANAGER,
    payload: req,
  })

  export const respGetManager = resp => ({
    type: RESP_GET_MANAGER,
    payload: resp,
  })

  export const getOwner = (req) => ({
    type: GET_OWNER,
    payload: req,
  })

  export const respGetOwner = resp => ({
    type: RESP_GET_OWNER,
    payload: resp,
  })

  export const getStatus = (req) => ({
    type: GET_STATUS,
    payload: req,
  })

  export const respGetStatus = resp => ({
    type: RESP_GET_STATUS,
    payload: resp,
  })

  export const getSelectedManager = (req) => ({
    type: GET_SELECTED_MANAGER,
    payload: req,
  })

  export const respGetSelectedManager = resp => ({
    type: RESP_SELECTED_MANAGER,
    payload: resp,
  })

  export const getInstructionsData2 = (req) => ({
    type: GET_INSTRUCTIONS2,
    payload: req,
  })
  
  export const respGetInstructions2 = resp => ({
    type: RESP_GET_INSTRUCTIONS2,
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

  // export const getUserList = (req) => ({
  //   type: GET_USER_LIST,
  //   payload: req,
  // })

  // export const respGetUserList = resp => ({
  //   type: RESP_GET_USER_LIST,
  //   payload: resp,
  // })

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

  export const downloadFile = (req) => ({
    type: DOWNLOAD_FILES,
    payload: req,
  })

  export const msgDownload = (req) => ({
    type: MSGDOWNLOAD,
    payload: req,
  })

  export const getCheckDownloadData = (req) => ({
    type: GET_CHECK_DOWNLOAD,
    payload: req,
  })
  
  export const respGetCheckDownload = resp => ({
    type: RESP_GET_CHECK_DOWNLOAD,
    payload: resp,
  })
  /*** REPLIES HERE ***/

  export const getReply = (req) => ({
    type: GET_REPLY,
    payload: req,
  })

  export const respGetReply = resp => ({
    type: RESP_GET_REPLY,
    payload: resp,
  })
  

  export const getSelectedReply = (req) => ({
    type: GET_SELECTED_REPLY,
    payload: req,
  })

  export const respGetSelectedReply = resp => ({
    type: RESP_GET_SELECTED_REPLY,
    payload: resp,
  })
  
  export const saveReply = (req) => ({
    type: SAVE_REPLY,
    payload: req,
  })

  export const msgAddReply = resp => ({
    type: MSGADDREPLY,
    payload: resp,
  })  

  export const editReply = (req) => ({
    type: EDIT_REPLY,
    payload: req,
  })

  export const msgEditReply = resp => ({
    type: MSGEDITREPLY,
    payload: resp,
  })

  export const deleteReply = (req) => ({
    type: DELETE_REPLY,
    payload: req,
  })

  export const msgDeleteReply = (req) => ({
    type: MSGDELETEREPLY,
    payload: req,
  })

  /*** ENDS HERE ***/

  
  export const getAttachmentData = (req) => ({
    type: GET_ATTACHMENT,
    payload: req,
  })

  export const respGetAttachment = resp => ({
    type: RESP_GET_ATTACHMENT,
    payload: resp,
  })
  

  /***** LOGS HERE *****/

  export const getLogs = (req) => ({
    type: GET_LOGS,
    payload: req,
  })

  export const respGetLogs = resp => ({
    type: RESP_GET_LOGS,
    payload: resp,
  })