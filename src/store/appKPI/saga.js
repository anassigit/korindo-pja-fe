import { call, put, takeEvery } from "redux-saga/effects"

import { GET_COLUMN_LIST, GET_CORPORATION_LIST, GET_DASHBOARD_KPI, GET_GROUP_LIST_KPI, GET_ITEM_LIST, GET_PLAN, GET_UNIT_LIST, GET_YEAR_LIST } from "./actionTypes"

import { respGetColumnList, respGetCorporationList, respGetDashboardKPI, respGetGroupListKpi, respGetItemList, respGetPlan, respGetUnitList, respGetYearList } from "./actions"

import { getColumnListKPI, getCorporationListKPI, getDashboardKPIBE, getGroupListKPI, getItemBE, getPlanBE, getUnitBE, getYearListKPI } from "helpers/backend_helper"

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

function* fetchGetCorporationList({ payload: req }) {
  try {
    const response = yield call(getCorporationListKPI, req)
    if (response.status == 1) {
      yield put(respGetCorporationList(response))
    } else {
      yield put(respGetCorporationList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCorporationList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetColumnList({ payload: req }) {
  try {
    const response = yield call(getColumnListKPI, req)
    if (response.status == 1) {
      yield put(respGetColumnList(response))
    } else {
      yield put(respGetColumnList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetColumnList({ "status": 0, "message": "Error Get Data" }))
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

function* fetchGetItem({ payload: req }) {
  try {
    const response = yield call(getItemBE, req)
    if (response.status == 1) {
      yield put(respGetItemList(response))
    } else {
      yield put(respGetItemList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetItemList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetUnit({ payload: req }) {
  try {
    const response = yield call(getUnitBE, req)
    if (response.status == 1) {
      yield put(respGetUnitList(response))
    } else {
      yield put(respGetUnitList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetUnitList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDashboardKPI({ payload: req }) {
  try {
    const response = yield call(getDashboardKPIBE, req)
    if (response.status == 1) {
      yield put(respGetDashboardKPI(response))
    } else {
      yield put(respGetDashboardKPI(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDashboardKPI({ "status": 0, "message": "Error Get Data" }))
  }
}

  function* kpiSaga() {
    
    yield takeEvery(GET_YEAR_LIST, fetchGetYearList)
    yield takeEvery(GET_GROUP_LIST_KPI, fetchGetGroupListKPI)
    yield takeEvery(GET_CORPORATION_LIST, fetchGetCorporationList)
    yield takeEvery(GET_COLUMN_LIST, fetchGetColumnList)
    yield takeEvery(GET_PLAN, fetchGetPlan)
    yield takeEvery(GET_ITEM_LIST, fetchGetItem)
    yield takeEvery(GET_UNIT_LIST, fetchGetUnit)
    yield takeEvery(GET_DASHBOARD_KPI, fetchGetDashboardKPI)
   
  }

  export default kpiSaga