import {
  RESET_MESSAGE,
  GET_COMPANY_CODE_LIST,
  RESP_GET_COMPANY_CODE_LIST,
  GET_MOVING_PLAN_LIST,
  RESP_GET_MOVING_PLAN_LIST,
  DOWNLOAD_MOVING_PLAN

} from "./actionTypes"

export const getCompanyCodeList = (req) => ({
  type: GET_COMPANY_CODE_LIST,
  payload: req,
})

export const respGetCompanyCodeList = resp => ({
  type: RESP_GET_COMPANY_CODE_LIST,
  payload: resp,
})

export const getMovingPlantList = (req) => ({
  type: GET_MOVING_PLAN_LIST,
  payload: req,
})

export const respGetMovingPlanList = resp => ({
  type: RESP_GET_MOVING_PLAN_LIST,
  payload: resp,
})

export const downloadExcelMovingPlan = (req) => ({
  type: DOWNLOAD_MOVING_PLAN,
  payload: req,
})

export const resetMessage = (req) => ({
  type: RESET_MESSAGE,
  payload: req,
})