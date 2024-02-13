import {
    GET_COLUMN_LIST,
    GET_CORPORATION_LIST,
    GET_DASHBOARD_KPI,
    GET_GROUP_LIST_KPI,
    GET_ITEM_LIST,
    GET_KPI_MASTER,
    GET_PLAN,
    GET_UNIT_LIST,
    GET_YEAR_LIST,
    DOWNLOAD_MASTER_TEMPLATE,
    RESET_MESSAGE,
    RESP_GET_COLUMN_LIST,
    RESP_GET_CORPORATION_LIST,
    RESP_GET_DASHBOARD_KPI,
    RESP_GET_GROUP_LIST_KPI,
    RESP_GET_ITEM_LIST,
    RESP_GET_KPI_MASTER,
    RESP_GET_PLAN,
    RESP_GET_UNIT_LIST,
    RESP_GET_YEAR_LIST,
    UPLOAD_MASTER_KPI,
    MSG_UPLOAD,
    UPLOAD_PLAN_KPI,
    DOWNLOAD_PLAN_TEMPLATE,
    GET_ACTUAL_INPUT_DATA,
    RESP_GET_ACTUAL_INPUT_DATA,
    SET_ACTUAL_INPUT_DATA,
    MSG_EDIT,
    GET_DASHBOARD_DETAIL_KPI,
    RESP_GET_DASHBOARD_DETAIL_KPI,
    DOWNLOAD_PLAN
} from "./actionTypes"

const INIT_STATE = {
    respGetYearList: {},
    respGetGroupListKpi: {},
    respGetCorporationList: {},
    respGetColumnList: {},
    respGetKPIMaster: {},
    respGetPlan: {},
    respGetItemList: {},
    respGetUnitList: {},
    respGetDashboardKPI: {},
    respGetDashboardDetailKPI: {},
    respGetActualInputData: {},
    msgEdit: "",
    msgUpload: ""
}

const kpiReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case GET_YEAR_LIST:
            return {
                ...state,
            }
        case RESP_GET_YEAR_LIST:
            return {
                ...state,
                respGetYearList: action.payload,
            }
        case GET_GROUP_LIST_KPI:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST_KPI:
            return {
                ...state,
                respGetGroupListKpi: action.payload,
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
        case GET_COLUMN_LIST:
            return {
                ...state,
            }
        case RESP_GET_COLUMN_LIST:
            return {
                ...state,
                respGetColumnList: action.payload,
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
        case GET_PLAN:
            return {
                ...state,
            }
        case RESP_GET_PLAN:
            return {
                ...state,
                respGetPlan: action.payload,
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
        case DOWNLOAD_MASTER_TEMPLATE:
            return {
                ...state,
            }
        case DOWNLOAD_PLAN_TEMPLATE:
            return {
                ...state,
            }
        case DOWNLOAD_PLAN:
            return {
                ...state,
            }
        case GET_ACTUAL_INPUT_DATA:
            return {
                ...state,
            }
        case RESP_GET_ACTUAL_INPUT_DATA:
            return {
                ...state,
                respGetActualInputData: action.payload,
            }
        case SET_ACTUAL_INPUT_DATA:
            return {
                ...state,
            }
        case UPLOAD_MASTER_KPI:
            return {
                ...state,
            }
        case UPLOAD_PLAN_KPI:
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