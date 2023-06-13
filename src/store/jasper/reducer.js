import {
  GET_REPORT,
  GET_REPORT_RESPONSE
  } from "./actionTypes"

  const INIT_STATE = {
    resp: {data: []},
    error: "",
  }

  const getReportJasperData = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_REPORT:
        return {
          ...state,
        }
      case GET_REPORT_RESPONSE:
        return {
          ...state,
          resp: action.payload,
        }

      default:
        return state
    }
  }
  
  export default getReportJasperData