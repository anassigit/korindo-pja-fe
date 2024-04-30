import {
    RESET_MESSAGE,
    GET_GROUP_LIST_KPI,
    RESP_GET_GROUP_LIST_KPI,
    GET_CORPORATION_LIST,
    RESP_GET_CORPORATION_LIST,
    GET_UNIT_LIST,
    RESP_GET_UNIT_LIST,
    GET_ITEM_LIST,
    RESP_GET_ITEM_LIST,
    GET_KPI_ITEM_LIST,
    RESP_GET_KPI_ITEM_LIST,
    GET_DASHBOARD_KPI,
    RESP_GET_DASHBOARD_KPI,
    GET_DASHBOARD_DETAIL_KPI,
    RESP_GET_DASHBOARD_DETAIL_KPI,
    GET_KPI_MASTER,
    RESP_GET_KPI_MASTER,
    DOWNLOAD_KPI_TEMPLATE,
    UPLOAD_KPI,
    MSG_UPLOAD,
    MSG_EDIT,
    GET_KPI_INPUT_DATA,
    RESP_GET_KPI_INPUT_DATA,
    SET_KPI_NOTE,
    DOWNLOAD_DASHBOARD_DETAIL,
    GET_GROUP_LIST_KPI_INPUT,
    RESP_GET_GROUP_LIST_KPI_INPUT,
    GET_KPI_FILE,
    RESP_GET_KPI_FILE,
    UPLOAD_KPI_RESULT,
    DOWNLOAD_KPI_EXCEL,
    SET_KPI_NOTE_TO_DELETE,
    MSG_DELETE
} from "./actionTypes"

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

export const getKPIInputData = (req) => ({
    type: GET_KPI_INPUT_DATA,
    payload: req,
})

export const respGetKPIInputData = resp => ({
    type: RESP_GET_KPI_INPUT_DATA,
    payload: resp,
})

export const getKPIFile = (req) => ({
    type: GET_KPI_FILE,
    payload: req,
})

export const respGetKPIFile = resp => ({
    type: RESP_GET_KPI_FILE,
    payload: resp,
})

export const setKPINote = (req) => ({
    type: SET_KPI_NOTE,
    payload: req,
})

export const setKPINoteToDelete = (req) => ({
    type: SET_KPI_NOTE_TO_DELETE,
    payload: req,
})

export const getDownloadDashboardDetail = (req) => ({
    type: DOWNLOAD_DASHBOARD_DETAIL,
    payload: req,
})

export const getDownloadKPITemplate = (req) => ({
    type: DOWNLOAD_KPI_TEMPLATE,
    payload: req,
})

export const getDownloadKPIExcel = (req) => ({
    type: DOWNLOAD_KPI_EXCEL,
    payload: req,
})

export const uploadKPI = (req) => ({
    type: UPLOAD_KPI,
    payload: req,
})

export const uploadKPIResult = (req) => ({
    type: UPLOAD_KPI_RESULT,
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

export const msgDelete = resp => ({
    type: MSG_DELETE,
    payload: resp,
})

export const resetMessage = (req) => ({
    type: RESET_MESSAGE,
    payload: req,
})