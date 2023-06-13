import {
  LOV_MENU_PARENT,
  LOV_USER,
  LOV_DIV,
  LOV_MENU,
  LOV_COMPANY,
  LOV_PLANT,
  LOV_POSITION,
  LOV_WILAYAH,
  LOV_PEKERJAAN,
  LOV_VENDOR,
  LOV_PETAK,
  LOV_POHON,
  MSG_LOV,
  LOV_PEKERJAANHEADER,
  LOV_QC,
  LOV_QC2,
  LOV_KRITERIA,
} from "./actionTypes"

const INIT_STATE = {
  resp: { data: [] },
}

const getLovData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case LOV_MENU_PARENT:
      return {
        ...state,
      }
    case LOV_USER:
      return {
        ...state,
      }
    case LOV_DIV:
      return {
        ...state,
      }
    case LOV_MENU:
      return {
        ...state,
      }
    case LOV_COMPANY:
      return {
        ...state,
      }
    case LOV_PLANT:
      return {
        ...state,
      }
    case LOV_POSITION:
      return {
        ...state,
      }
    case LOV_WILAYAH:
      return {
        ...state,
      }
    case LOV_PEKERJAAN:
      return {
        ...state,
      }
    case LOV_VENDOR:
      return {
        ...state,
      }
    case LOV_PETAK:
      return {
        ...state,
      }
    case LOV_POHON:
      return {
        ...state,
      }
    case LOV_PEKERJAANHEADER:
      return {
        ...state,
      }
    case LOV_QC:
      return {
        ...state,
      }
    case LOV_QC2:
      return {
        ...state,
      }
    case LOV_KRITERIA:
      return {
        ...state,
      }
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

export default getLovData