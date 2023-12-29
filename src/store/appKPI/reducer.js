import {
  GET_COORPORATION_LIST,
  GET_GROUP_LIST_KPI,
  GET_PLAN,
  GET_YEAR_LIST,
  RESET_MESSAGE,
  RESP_GET_COORPORATION_LIST,
  RESP_GET_GROUP_LIST_KPI,
  RESP_GET_PLAN,
  RESP_GET_YEAR_LIST
} from "./actionTypes"

const INIT_STATE = {

  respGetYearList: {},
  respGetGroupListKpi: {},
  respGetCoorporationList: {},
  respGetPlan: {},
  msgEdit: "",
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
    case GET_COORPORATION_LIST:
      return {
        ...state,
      }
    case RESP_GET_COORPORATION_LIST:
      return {
        ...state,
        respGetCoorporationList: action.payload,
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
    case RESET_MESSAGE:
      return {
        ...state,
        msgEdit: "",
      }
    default:
      return state
  }
}

export default kpiReducer