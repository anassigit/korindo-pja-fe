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

export const getMenuParent = req => ({
  type: LOV_MENU_PARENT,
  payload: req,
})

export const getUser = req => ({
  type: LOV_USER,
  payload: req,
})

export const getMenu = req => ({
  type: LOV_MENU,
  payload: req,
})

export const getDiv = req => ({
  type: LOV_DIV,
  payload: req,
})

export const getCompany = req => ({
  type: LOV_COMPANY,
  payload: req,
})

export const getPlant = req => ({
  type: LOV_PLANT,
  payload: req,
})

export const getPosition = req => ({
  type: LOV_POSITION,
  payload: req,
})

export const getWilayah = req => ({
  type: LOV_WILAYAH,
  payload: req,
})

export const getPekerjaan = req => ({
  type: LOV_PEKERJAAN,
  payload: req,
})

export const getVendor = req => ({
  type: LOV_VENDOR,
  payload: req,
})

export const getPetak = req => ({
  type: LOV_PETAK,
  payload: req,
})

export const getPohon = req => ({
  type: LOV_POHON,
  payload: req,
})

export const msgLov = (resp) => ({
  type: MSG_LOV,
  payload: resp,
})

export const getPekerjaanHeader = (resp) => ({
  type: LOV_PEKERJAANHEADER,
  payload: resp,
})

export const getQc = (resp) => ({
  type: LOV_QC,
  payload: resp,
})

export const getQc2 = (resp) => ({
  type: LOV_QC2,
  payload: resp,
})

export const getKriteria = (resp) => ({
  type: LOV_KRITERIA,
  payload: resp,
})

