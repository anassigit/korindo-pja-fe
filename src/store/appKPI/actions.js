import {
    RESET_MESSAGE,
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
    RESP_GET_DASHBOARD_KPI,
    GET_DASHBOARD_DETAIL_KPI,
    RESP_GET_DASHBOARD_DETAIL_KPI,
    GET_KPI_MASTER,
    RESP_GET_KPI_MASTER,
    DOWNLOAD_MASTER_TEMPLATE,
    UPLOAD_MASTER_KPI,
    MSG_UPLOAD,
    MSG_EDIT,
    UPLOAD_PLAN_KPI,
    DOWNLOAD_PLAN_TEMPLATE,
    GET_ACTUAL_INPUT_DATA,
    RESP_GET_ACTUAL_INPUT_DATA,
    SET_ACTUAL_INPUT_DATA,
    DOWNLOAD_PLAN,
    DOWNLOAD_DASHBOARD_DETAIL,
    GET_GROUP_LIST_KPI_INPUT,
    RESP_GET_GROUP_LIST_KPI_INPUT

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

export const getGroupListKPIInput = (req) => ({
    type: GET_GROUP_LIST_KPI_INPUT,
    payload: req,
})

export const respGetGroupListKpiInput = resp => ({
    type: RESP_GET_GROUP_LIST_KPI_INPUT,
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

export const getKPIMaster = (req) => ({
    type: GET_KPI_MASTER,
    payload: req,
})

export const respGetKPIMaster = resp => ({
    type: RESP_GET_KPI_MASTER,
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

export const getDashboardDetailKPI = (req) => ({
    type: GET_DASHBOARD_DETAIL_KPI,
    payload: req,
})

export const respGetDashboardDetailKPI = resp => ({
    type: RESP_GET_DASHBOARD_DETAIL_KPI,
    payload: resp,
})

export const getActualInputData = (req) => ({
    type: GET_ACTUAL_INPUT_DATA,
    payload: req,
})

export const respGetActualInputData = resp => ({
    type: RESP_GET_ACTUAL_INPUT_DATA,
    payload: resp,
})

export const setActualInputData = (req) => ({
    type: SET_ACTUAL_INPUT_DATA,
    payload: req,
})

export const getDownloadDashboardDetail = (req) => ({
    type: DOWNLOAD_DASHBOARD_DETAIL,
    payload: req,
})

export const getDownloadMasterTemplate = (req) => ({
    type: DOWNLOAD_MASTER_TEMPLATE,
    payload: req,
})

export const getDownloadPlanTemplate = (req) => ({
    type: DOWNLOAD_PLAN_TEMPLATE,
    payload: req,
})
export const getDownloadPlan = (req) => ({
    type: DOWNLOAD_PLAN,
    payload: req,
})

export const uploadMasterKPI = (req) => ({
    type: UPLOAD_MASTER_KPI,
    payload: req,
})

export const uploadPlanKPI = (req) => ({
    type: UPLOAD_PLAN_KPI,
    payload: req,
})

export const msgUpload = resp => ({
    type: MSG_UPLOAD,
    payload: resp,
})

export const msgEdit = resp => ({
    type: MSG_EDIT,
    payload: resp,
})

export const resetMessage = (req) => ({
    type: RESET_MESSAGE,
    payload: req,
})