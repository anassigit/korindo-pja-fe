import { call, put, takeEvery } from "redux-saga/effects"
import { DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL, GET_COMPANY_LIST, GET_GROUP_LIST, GET_MOVING_PLAN_DASHBOARD_LIST, GET_MOVING_PLAN_INPUT_RESULT_LIST } from "./actionTypes"
import { respGetCompanyList, respGetMovingPlanDashboardList, respGetMovingPlanInputResultList } from "./actions"
import { downloadExcelMovingPlanBE, getCompanyListBE, getGroupListBE, getMovingPlanDashboardListBE, getMovingPlanInputResultListBE } from "helpers/backend_helper"
import { respGetGroupList } from "store/actions"

function* fetchGetGroupList({ payload: req }) {
    try {
        const response = yield call(getGroupListBE, req)
        if (response.status == 1) {
            yield put(respGetGroupList(response))
        } else {
            yield put(respGetGroupList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetGroupList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetCompanyList({ payload: req }) {
    try {
        const response = yield call(getCompanyListBE, req)
        if (response.status == 1) {
            yield put(respGetCompanyList(response))
        } else {
            yield put(respGetCompanyList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetCompanyList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetMovingPlanDashboardList({ payload: req }) {
    try {
        const response = yield call(getMovingPlanDashboardListBE, req)
        if (response.status == 1) {
            yield put(respGetMovingPlanDashboardList(response))
        } else {
            yield put(respGetMovingPlanDashboardList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMovingPlanDashboardList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetMovingPlanInputResultList({ payload: req }) {
    try {
        const response = yield call(getMovingPlanInputResultListBE, req)
        if (response.status == 1) {
            yield put(respGetMovingPlanInputResultList(response))
        } else {
            yield put(respGetMovingPlanInputResultList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMovingPlanInputResultList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchDownloadMovingPlanDashboardExcel({ payload: req }) {
    try {
        yield call(downloadExcelMovingPlanBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* kpiSaga() {
    yield takeEvery(GET_GROUP_LIST, fetchGetGroupList)
    yield takeEvery(GET_COMPANY_LIST, fetchGetCompanyList)
    yield takeEvery(GET_MOVING_PLAN_DASHBOARD_LIST, fetchGetMovingPlanDashboardList)
    yield takeEvery(GET_MOVING_PLAN_INPUT_RESULT_LIST, fetchGetMovingPlanInputResultList)
    yield takeEvery(DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL, fetchDownloadMovingPlanDashboardExcel)
}

export default kpiSaga