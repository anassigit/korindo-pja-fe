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
    GET_CORPORATION_LIST,
    RESP_GET_CORPORATION_LIST,
    RESP_GET_PLAN,
    GET_PLAN,
    GET_UNIT_LIST,
    RESP_GET_UNIT_LIST,
    GET_ITEM_LIST,
    RESP_GET_ITEM_LIST,
    GET_COLUMN_LIST,
    RESP_GET_COLUMN_LIST,
    GET_DASHBOARD_KPI,
    RESP_GET_DASHBOARD_KPI

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

  export const getCorporationList = (req) => ({
    type: GET_CORPORATION_LIST,
    payload: req,
  })

  export const respGetCorporationList = resp => ({
    type: RESP_GET_CORPORATION_LIST,
    payload: resp,
  })

  export const getColumnList = (req) => ({
    type: GET_COLUMN_LIST,
    payload: req,
  })

  export const respGetColumnList = resp => ({
    type: RESP_GET_COLUMN_LIST,
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

  export const getItemList = (req) => ({
    type: GET_ITEM_LIST,
    payload: req,
  })

  export const respGetItemList = resp => ({
    type: RESP_GET_ITEM_LIST,
    payload: resp,
  })

  export const getUnitList = (req) => ({
    type: GET_UNIT_LIST,
    payload: req,
  })

  export const respGetUnitList = resp => ({
    type: RESP_GET_UNIT_LIST,
    payload: resp,
  })

  export const getDashboardKPI = (req) => ({
    type: GET_DASHBOARD_KPI,
    payload: req,
  })

  export const respGetDashboardKPI = resp => ({
    type: RESP_GET_DASHBOARD_KPI,
    payload: resp,
  })

  export const resetMessage = (req) => ({
    type: RESET_MESSAGE,
    payload: req,
  })