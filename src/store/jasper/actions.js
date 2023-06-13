import {
    GET_REPORT,
    GET_REPORT_RESPONSE
  } from "./actionTypes"

  export const getReportJasper = (req) => ({
    type: GET_REPORT,
    payload: req,
  })
  
  export const getReportJasperResponse = resp => ({
    type: GET_REPORT_RESPONSE,
    payload: resp,
  })
  