import {
  GET_COMBO,
  MSG_COMBO_GYS_AREA_TYPE,
  MSG_COMBO_ROLE_AKSES_TYPE,
  MSG_COMBO_SATUAN,
  MSG_COMBO_SATUAN_MATERIAL,
  MSG_COMBO_TYPE,
  MSG_COMBO_JENIS_APPROVAL,
  MSG_COMBO_USER_LIST

} from "./actionTypes"


export const getCombo = req => ({
  type: GET_COMBO,
  payload: req,
})

export const msgComboGysAreaType = (resp) => ({
  type: MSG_COMBO_GYS_AREA_TYPE,
  payload: resp,
})

export const msgComboRoleAksesType = (resp) => ({
  type: MSG_COMBO_ROLE_AKSES_TYPE,
  payload: resp,
})

export const msgComboSatuan = (resp) => ({
  type: MSG_COMBO_SATUAN,
  payload: resp,
})

export const msgComboSatMaterial = (resp) => ({
  type: MSG_COMBO_SATUAN_MATERIAL,
  payload: resp,
})

export const msgComboType = (resp) => ({
  type: MSG_COMBO_TYPE,
  payload: resp,
})

export const msgComboJenisApproval = (resp) => ({
  type: MSG_COMBO_JENIS_APPROVAL,
  payload: resp,
})

export const msgUserList = (resp) => ({
  type: MSG_COMBO_USER_LIST,
  payload: resp,
})
