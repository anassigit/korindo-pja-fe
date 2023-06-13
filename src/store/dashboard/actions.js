import {
  GET_DASHBOARD,
  RESP_DASHBOARD,
} from "./actionTypes";

export const getDashboardData = (req) => ({
    type: GET_DASHBOARD,
    payload: req,
  })
  
  export const respGetDashboard = resp => ({
    type: RESP_DASHBOARD,
    payload: resp,
  })


  