import { call, put, takeEvery} from "redux-saga/effects"

import { GET_DASHBOARD } from "./actionTypes"

import { respGetDashboard } from "./actions"

import { getDashboard } from "helpers/backend_helper"

function* fetchgetDashboard ({ payload: req }) {
    try {
      const response = yield call(getDashboard, req)
      if(response.status == 1){
        yield put(respGetDashboard(response))
      }else{
        yield put(respGetDashboard(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetDashboard({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  
  function* DashboardSaga() {
    
    yield takeEvery(GET_DASHBOARD, fetchgetDashboard)
  
  }

  export default DashboardSaga