import {
  GET_DASHBOARD,
  RESP_DASHBOARD,
}from "./actionTypes"

const INIT_STATE = {

    respGetDashboard: {},

  }

  const dashboardReduce = (state = INIT_STATE, action) => {

    switch (action.type) {
        case GET_DASHBOARD:
          return {
            ...state,
          }
        case RESP_DASHBOARD:
          return {
            ...state,
            respGetDashboard: action.payload,
          }
        default:
          return state
      }

  } 
  export default dashboardReduce