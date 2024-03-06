import { call, put, takeEvery } from "redux-saga/effects"

import { DOWNLOAD_MOVING_PLAN, GET_COMPANY_CODE_LIST, GET_MOVING_PLAN_LIST } from "./actionTypes"

import { respGetCompanyCodeList, respGetMovingPlanList } from "./actions"

import { downloadExcelMovingPlanBE, getCompanyCodeList, getMovingPlanList } from "helpers/backend_helper"

function* fetchGetCompanyCodeList({ payload: req }) {
  try {
    const response = yield call(getCompanyCodeList, req)
    if (response.status == 1) {
      yield put(respGetCompanyCodeList(response))
    } else {
      yield put(respGetCompanyCodeList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCompanyCodeList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMovingPlanList({ payload: req }) {
  try {
    const response = yield call(getMovingPlanList, req)
    if (response.status == 1) {
      yield put(respGetMovingPlanList(response))
    } else {
      yield put(respGetMovingPlanList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMovingPlanList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDownloadMovingPlan({ payload: req }) {
  try {
    yield call(downloadExcelMovingPlanBE, req)
  } catch (error) {
    console.log(error);
  }
}

function* kpiSaga() {
  yield takeEvery(GET_COMPANY_CODE_LIST, fetchGetCompanyCodeList)
  yield takeEvery(GET_MOVING_PLAN_LIST, fetchGetMovingPlanList)
  yield takeEvery(DOWNLOAD_MOVING_PLAN, fetchDownloadMovingPlan)
}

export default kpiSaga