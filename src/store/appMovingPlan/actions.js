import {
    RESET_MESSAGE,
    GET_COMPANY_LIST,
    RESP_GET_COMPANY_LIST,
    GET_MOVING_PLAN_DASHBOARD_LIST,
    RESP_GET_MOVING_PLAN_DASHBOARD_LIST,
    DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL,
    GET_GROUP_LIST,
    RESP_GET_GROUP_LIST,
    GET_MOVING_PLAN_INPUT_RESULT_LIST,
    RESP_GET_MOVING_PLAN_INPUT_RESULT_LIST

} from "./actionTypes"

export const getGroupList = (req) => ({
    type: GET_GROUP_LIST,
    payload: req,
})

export const respGetGroupList = resp => ({
    type: RESP_GET_GROUP_LIST,
    payload: resp,
})

export const getCompanyList = (req) => ({
    type: GET_COMPANY_LIST,
    payload: req,
})

export const respGetCompanyList = resp => ({
    type: RESP_GET_COMPANY_LIST,
    payload: resp,
})

export const getMovingPlanDashboardList = (req) => ({
    type: GET_MOVING_PLAN_DASHBOARD_LIST,
    payload: req,
})

export const respGetMovingPlanDashboardList = resp => ({
    type: RESP_GET_MOVING_PLAN_DASHBOARD_LIST,
    payload: resp,
})

export const getMovingPlanInputResultList = (req) => ({
    type: GET_MOVING_PLAN_INPUT_RESULT_LIST,
    payload: req,
})

export const respGetMovingPlanInputResultList = resp => ({
    type: RESP_GET_MOVING_PLAN_INPUT_RESULT_LIST,
    payload: resp,
})

export const downloadMovingPlanDashboardExcel = (req) => ({
    type: DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL,
    payload: req,
})

export const resetMessage = (req) => ({
    type: RESET_MESSAGE,
    payload: req,
})