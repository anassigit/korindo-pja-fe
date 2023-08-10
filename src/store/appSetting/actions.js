import {

  GET_SETTING,
  RESP_GET_SETTING,
  SAVE_MEMBERS,
  EDIT_MEMBERS,
  DELETE_MEMBERS,
  MSGADD,
  MSGEDIT,
  MSGDELETE,
  RESET_MESSAGE,
  EDIT_GENERAL_SETTING,
  GET_GENERAL_SETTING,
  RESP_GET_GENERAL_SETTING,
  GET_MEMBERS,
  RESP_GET_MEMBERS,
  GET_RANK_LIST,
  RESP_GET_RANK_LIST,
} from "./actionTypes"

/* GET ALL SETTING */

export const getSettingData = (req) => ({
  type: GET_SETTING,
  payload: req,
})

export const respGetSetting = resp => ({
  type: RESP_GET_SETTING,
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


/* GENERAL SETTINGS */

export const editGeneralSetting = (req) => ({
  type: EDIT_GENERAL_SETTING,
  payload: req,
})

/* GET ALL MEMBERS */

export const getMembersData = (req) => ({
  type: GET_MEMBERS,
  payload: req,
})

export const respGetMembers = resp => ({
  type: RESP_GET_MEMBERS,
  payload: resp,
})

/* GET ALL RANK LIST */

export const getRankListData = (req) => ({
  type: GET_RANK_LIST,
  payload: req,
})

export const respGetRankList = resp => ({
  type: RESP_GET_RANK_LIST,
  payload: resp,
})
