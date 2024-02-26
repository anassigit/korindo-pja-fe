import {
  LOV_MENU_PARENT,
  LOV_USER,
  LOV_DIV,
  LOV_MENU,
  LOV_COMPANY,
  MSG_LOV,
  LOV_MENU_PARENT_LIST,
  LOV_MENU_ROLE_LIST
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

export const getMenuParentListLov = (req) => ({
  type: LOV_MENU_PARENT_LIST,
  payload: req,
})

export const msgLov = (resp) => ({
  type: MSG_LOV,
  payload: resp,
})

export const getRoleParentListLov = (req) => ({
  type: LOV_MENU_ROLE_LIST,
  payload: req,
})