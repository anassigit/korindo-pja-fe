import { call, put, takeEvery } from "redux-saga/effects"

import { GET_COORPORATION_LIST, GET_GROUP_LIST_KPI, GET_PLAN, GET_YEAR_LIST } from "./actionTypes"

import { respGetCoorporationList, respGetGroupListKpi, respGetPlan, respGetYearList } from "./actions"

import { getCoorporationListKPI, getGroupListKPI, getPlanBE, getYearListKPI } from "helpers/backend_helper"

function* fetchGetYearList({ payload: req }) {
  try {
    const response = yield call(getYearListKPI, req)
    if (response.status == 1) {
      yield put(respGetYearList(response))
    } else {
      yield put(respGetYearList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetYearList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetGroupListKPI({ payload: req }) {
  try {
    const response = yield call(getGroupListKPI, req)
    if (response.status == 1) {
      yield put(respGetGroupListKpi(response))
    } else {
      yield put(respGetGroupListKpi(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetGroupListKpi({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetCoorporationList({ payload: req }) {
  try {
    const response = yield call(getCoorporationListKPI, req)
    if (response.status == 1) {
      yield put(respGetCoorporationList(response))
    } else {
      yield put(respGetCoorporationList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCoorporationList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetPlan({ payload: req }) {
  try {
    const response = yield call(getPlanBE, req)
    if (response.status == 1) {
      yield put(respGetPlan(response))
    } else {
      yield put(respGetPlan(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetPlan({ "status": 0, "message": "Error Get Data" }))
  }
}

  function* kpiSaga() {
    
    yield takeEvery(GET_YEAR_LIST, fetchGetYearList)
    yield takeEvery(GET_GROUP_LIST_KPI, fetchGetGroupListKPI)
    yield takeEvery(GET_COORPORATION_LIST, fetchGetCoorporationList)
    yield takeEvery(GET_PLAN, fetchGetPlan)
   
  }

  export default kpiSaga