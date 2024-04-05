import {
    GET_KPI_ITEM_LIST,
    GET_CORPORATION_LIST,
    GET_DASHBOARD_KPI,
    GET_GROUP_LIST_KPI,
    GET_ITEM_LIST,
    GET_KPI_MASTER,
    GET_UNIT_LIST,
    DOWNLOAD_KPI_TEMPLATE,
    RESET_MESSAGE,
    RESP_GET_KPI_ITEM_LIST,
    RESP_GET_CORPORATION_LIST,
    RESP_GET_DASHBOARD_KPI,
    RESP_GET_GROUP_LIST_KPI,
    RESP_GET_ITEM_LIST,
    RESP_GET_KPI_MASTER,
    RESP_GET_UNIT_LIST,
    UPLOAD_KPI,
    MSG_UPLOAD,
    GET_KPI_INPUT_DATA,
    RESP_GET_KPI_INPUT_DATA,
    SET_KPI_NOTE,
    MSG_EDIT,
    GET_DASHBOARD_DETAIL_KPI,
    RESP_GET_DASHBOARD_DETAIL_KPI,
    DOWNLOAD_DASHBOARD_DETAIL,
    GET_GROUP_LIST_KPI_INPUT,
    RESP_GET_GROUP_LIST_KPI_INPUT,
    GET_KPI_FILE,
    RESP_GET_KPI_FILE,
    UPLOAD_KPI_RESULT
} from "./actionTypes"

const INIT_STATE = {
    respGetGroupListKpi: {},
    respGetGroupListKpiInput: {},
    respGetCorporationList: {},
    respGetKPIItemList: {},
    respGetKPIMaster: {},
    respGetPlan: {},
    respGetItemList: {},
    respGetUnitList: {},
    respGetDashboardKPI: {},
    respGetDashboardDetailKPI: {},
    respGetKPIInputData: {},
    msgEdit: "",
    msgUpload: ""
}

const kpiReducer = (state = INIT_STATE, action) => {

    switch (action.type) {
        case GET_GROUP_LIST_KPI:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST_KPI:
            return {
                ...state,
                respGetGroupListKpi: action.payload,
            }
        case GET_GROUP_LIST_KPI_INPUT:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST_KPI_INPUT:
            return {
                ...state,
                respGetGroupListKpiInput: action.payload,
            }
        case GET_CORPORATION_LIST:
            return {
                ...state,
            }
        case RESP_GET_CORPORATION_LIST:
            return {
                ...state,
                respGetCorporationList: action.payload,
            }
        case GET_KPI_ITEM_LIST:
            return {
                ...state,
            }
        case RESP_GET_KPI_ITEM_LIST:
            return {
                ...state,
                respGetKPIItemList: action.payload,
            }
        case GET_KPI_MASTER:
            return {
                ...state,
            }
        case RESP_GET_KPI_MASTER:
            return {
                ...state,
                respGetKPIMaster: action.payload,
            }
        case GET_ITEM_LIST:
            return {
                ...state,
            }
        case RESP_GET_ITEM_LIST:
            return {
                ...state,
                respGetItemList: action.payload,
            }
        case GET_UNIT_LIST:
            return {
                ...state,
            }
        case RESP_GET_UNIT_LIST:
            return {
                ...state,
                respGetUnitList: action.payload,
            }
        case GET_DASHBOARD_KPI:
            return {
                ...state,
            }
        case RESP_GET_DASHBOARD_KPI:
            return {
                ...state,
                respGetDashboardKPI: action.payload,
            }
        case GET_DASHBOARD_DETAIL_KPI:
            return {
                ...state,
            }
        case RESP_GET_DASHBOARD_DETAIL_KPI:
            return {
                ...state,
                respGetDashboardDetailKPI: action.payload,
            }
        case DOWNLOAD_KPI_TEMPLATE:
            return {
                ...state,
            }
        case DOWNLOAD_DASHBOARD_DETAIL:
            return {
                ...state,
            }
        case GET_KPI_INPUT_DATA:
            return {
                ...state,
            }
        case RESP_GET_KPI_INPUT_DATA:
            return {
                ...state,
                respGetKPIInputData: action.payload,
            }
        case GET_KPI_FILE:
            return {
                ...state,
            }
        case RESP_GET_KPI_FILE:
            return {
                ...state,
                respGetKPIFile: action.payload,
            }
        case SET_KPI_NOTE:
            return {
                ...state,
            }
        case UPLOAD_KPI:
            return {
                ...state,
            }
        case UPLOAD_KPI_RESULT:
            return {
                ...state,
            }
        case MSG_UPLOAD:
            return {
                ...state,
                msgUpload: action.payload,
            }
        case MSG_EDIT:
            return {
                ...state,
                msgEdit: action.payload,
            }
        case RESET_MESSAGE:
            return {
                ...state,
                msgEdit: "",
                msgUpload: "",
            }
        default:
            return state
    }
}

export default kpiReducer