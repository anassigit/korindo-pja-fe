import {

    GET_PROFILE,
    RESP_GET_PROFILE,
    EDIT_USER_PROFILE,
    MSGEDIT,
    RESET_MESSAGE,
    UPDATE_USER_PASSWORD,
    MSGUPPASSWORD,
    EMAIL_FORGOT_PASSWORD,
    UPDATE_FORGOT_PASSWORD,
    MSG_EMAIL_FORGOT_PASSWORD,
    GET_YEAR_LIST,
    RESP_GET_YEAR_LIST,
    GET_GROUP_LIST_KPI,
    RESP_GET_GROUP_LIST_KPI,
    GET_COORPORATION_LIST,
    RESP_GET_COORPORATION_LIST,
    RESP_GET_PLAN,
    GET_PLAN

} from "./actionTypes"

  export const getYearList = (req) => ({
    type: GET_YEAR_LIST,
    payload: req,
  })

  export const respGetYearList = resp => ({
    type: RESP_GET_YEAR_LIST,
    payload: resp,
  })

  export const getGroupListKPI = (req) => ({
    type: GET_GROUP_LIST_KPI,
    payload: req,
  })

  export const respGetGroupListKpi = resp => ({
    type: RESP_GET_GROUP_LIST_KPI,
    payload: resp,
  })

  export const getCoorporationList = (req) => ({
    type: GET_COORPORATION_LIST,
    payload: req,
  })

  export const respGetCoorporationList = resp => ({
    type: RESP_GET_COORPORATION_LIST,
    payload: resp,
  })

  export const getPlan = (req) => ({
    type: GET_PLAN,
    payload: req,
  })

  export const respGetPlan = resp => ({
    type: RESP_GET_PLAN,
    payload: resp,
  })

  export const resetMessage = (req) => ({
    type: RESET_MESSAGE,
    payload: req,
  })