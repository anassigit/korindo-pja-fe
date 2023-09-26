import {
  GET_MENU_RULE,
  GET_RULE,
  RESET_MESSAGE,
  RESP_GET_MENU_RULE,
  RESP_GET_RULE
} from "./actionTypes"

export const getMenuRuleData = (req) => ({
  type: GET_MENU_RULE,
  payload: req,
})

export const respGetMenuRule = resp => ({
  type: RESP_GET_MENU_RULE,
  payload: resp,
})

export const getRuleData = (req) => ({
  type: GET_RULE,
  payload: req,
})

export const respGetRule = resp => ({
  type: RESP_GET_RULE,
  payload: resp,
})

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
})