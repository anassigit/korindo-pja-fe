import {

  GET_MEMBERS,
  RESP_GET_MEMBERS,
  SAVE_MEMBERS,
  EDIT_MEMBERS,
  DELETE_MEMBERS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,
} from "./actionTypes"

export const getMembersData = (req) => ({
  type: GET_MEMBERS,
  payload: req,
})

export const respGetMembers = resp => ({
  type: RESP_GET_MEMBERS,
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

export const saveMembers = (req) => ({
  type: SAVE_MEMBERS,
  payload: req,
})

export const editMembers = (req) => ({
  type: EDIT_MEMBERS,
  payload: req,
})

export const deleteMembers = (req) => ({
  type: DELETE_MEMBERS,
  payload: req,
})

