import {
    RESET_MESSAGE,
    GET_COMPANY_LIST,
    RESP_GET_COMPANY_LIST,
    GET_MOVING_PLAN_DASHBOARD_LIST,
    RESP_GET_MOVING_PLAN_DASHBOARD_LIST,
    DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL,
    GET_GROUP_LIST_MOVING_PLAN,
    RESP_GET_GROUP_LIST_MOVING_PLAN,
    GET_MOVING_PLAN_INPUT_RESULT_LIST,
    RESP_GET_MOVING_PLAN_INPUT_RESULT_LIST
} from "./actionTypes"

const INIT_STATE = {
    respGetGroupListMovingPlan: {},
    respGetCompanyList: {},
    respGetMovingPlanDashboardList: {},
    respGetMovingPlanInputResultList: {}
}

const movingPlanReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROUP_LIST_MOVING_PLAN:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST_MOVING_PLAN:
            return {
                ...state,
                respGetGroupListMovingPlan: action.payload,
            }
        case GET_COMPANY_LIST:
            return {
                ...state,
            }
        case RESP_GET_COMPANY_LIST:
            return {
                ...state,
                respGetCompanyList: action.payload,
            }
        case GET_MOVING_PLAN_DASHBOARD_LIST:
            return {
                ...state,
            }
        case RESP_GET_MOVING_PLAN_DASHBOARD_LIST:
            return {
                ...state,
                respGetMovingPlanDashboardList: action.payload,
            }
        case GET_MOVING_PLAN_INPUT_RESULT_LIST:
            return {
                ...state,
            }
        case RESP_GET_MOVING_PLAN_INPUT_RESULT_LIST:
            return {
                ...state,
                respGetMovingPlanInputResultList: action.payload,
            }
        case DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL:
            return {
                ...state,
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

export default movingPlanReducer