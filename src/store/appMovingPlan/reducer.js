import {
  RESET_MESSAGE,
  GET_COMPANY_CODE_LIST,
  RESP_GET_COMPANY_CODE_LIST,
  GET_MOVING_PLAN_LIST,
  RESP_GET_MOVING_PLAN_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetCompanyCodeList: {},
  respGetMovingPlanList: {}
}

const kpiReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    case GET_COMPANY_CODE_LIST:
      return {
        ...state,
      }
    case RESP_GET_COMPANY_CODE_LIST:
      return {
        ...state,
        respGetCompanyCodeList: action.payload,
      }
      case GET_MOVING_PLAN_LIST:
      return {
        ...state,
      }
    case RESP_GET_MOVING_PLAN_LIST:
      return {
        ...state,
        respGetMovingPlanList: action.payload,
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