import { call, put, takeEvery } from "redux-saga/effects"
import { DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL, GET_COMPANY_LIST, GET_GROUP_LIST_MOVING_PLAN, GET_MOVING_PLAN_DASHBOARD_LIST, GET_MOVING_PLAN_INPUT_RESULT_LIST } from "./actionTypes"
import { respGetCompanyList, respGetMovingPlanDashboardList, respGetMovingPlanInputResultList } from "./actions"
import { downloadExcelMovingPlanBE, getCompanyListBE, getGroupListMovingPlanBE, getMovingPlanDashboardListBE, getMovingPlanInputResultListBE } from "helpers/backend_helper"
import { respGetGroupListMovingPlan } from "store/actions"

function* fetchGetGroupListMovingPlan({ payload: req }) {
    try {
        const response = yield call(getGroupListMovingPlanBE, req)
        if (response.status == 1) {
            yield put(respGetGroupListMovingPlan(response))
        } else {
            yield put(respGetGroupListMovingPlan(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetGroupListMovingPlan({ "status": 0, "message": "Error Get Data" }))
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
    yield takeEvery(GET_GROUP_LIST_MOVING_PLAN, fetchGetGroupListMovingPlan)
    yield takeEvery(GET_COMPANY_LIST, fetchGetCompanyList)
    yield takeEvery(GET_MOVING_PLAN_DASHBOARD_LIST, fetchGetMovingPlanDashboardList)
    yield takeEvery(GET_MOVING_PLAN_INPUT_RESULT_LIST, fetchGetMovingPlanInputResultList)
    yield takeEvery(DOWNLOAD_MOVING_PLAN_DASHBOARD_EXCEL, fetchDownloadMovingPlanDashboardExcel)
}

export default kpiSaga