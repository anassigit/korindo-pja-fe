import {

    GET_INSTRUCTIONS,
    RESP_GET_INSTRUCTIONS,
    SAVE_INSTRUCTIONS,
    EDIT_INSTRUCTIONS,
    DELETE_INSTRUCTIONS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE

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
