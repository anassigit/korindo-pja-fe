import { call, put, takeEvery } from "redux-saga/effects"
import { GET_COLUMN_LIST, GET_CORPORATION_LIST, GET_DASHBOARD_KPI, DOWNLOAD_MASTER_TEMPLATE, GET_GROUP_LIST_KPI, GET_ITEM_LIST, GET_KPI_MASTER, GET_PLAN, GET_UNIT_LIST, GET_YEAR_LIST, UPLOAD_MASTER_KPI, UPLOAD_PLAN_KPI, GET_ACTUAL_INPUT_DATA, SET_ACTUAL_INPUT_DATA, GET_DASHBOARD_DETAIL_KPI, DOWNLOAD_PLAN_TEMPLATE, DOWNLOAD_PLAN, DOWNLOAD_DASHBOARD_DETAIL, GET_GROUP_LIST_KPI_INPUT } from "./actionTypes"
import { msgUpload, respGetActualInputData, respGetColumnList, respGetCorporationList, respGetDashboardKPI, respGetGroupListKpi, respGetItemList, respGetKPIMaster, respGetPlan, respGetUnitList, respGetYearList, msgEdit, respGetDashboardDetailKPI, respGetGroupListKpiInput } from "./actions"
import { getColumnListKPI, getCorporationListKPI, getDashboardKPIBE, getGroupListKPI, getItemBE, getKPIMasterBE, getPlanBE, getUnitBE, getYearListKPI, getDownloadMasterTemplateBE, uploadMasterKPIBE, uploadPlanKPIBE, getDownloadPlanTemplateBE, getActualInputDataBE, setActualInputDataBE, getDashboardDetailKPIBE, getDownloadPlanBE, getDownloadDashboardDetailBE, getGroupListKPIInputBE } from "helpers/backend_helper"

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

function* fetchGetGroupListKPIInput({ payload: req }) {
    try {
        const response = yield call(getGroupListKPIInputBE, req)
        if (response.status == 1) {
            yield put(respGetGroupListKpiInput(response))
        } else {
            yield put(respGetGroupListKpiInput(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetGroupListKpiInput({ "status": 0, "message": "Error Get Data" }))
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

function* fetchGetKPIMaster({ payload: req }) {
    try {
        const response = yield call(getKPIMasterBE, req)
        if (response.status == 1) {
            yield put(respGetKPIMaster(response))
        } else {
            yield put(respGetKPIMaster(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIMaster({ "status": 0, "message": "Error Get Data" }))
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

function* fetchGetDashboardDetailKPI({ payload: req }) {
    try {
        const response = yield call(getDashboardDetailKPIBE, req)
        if (response.status == 1) {
            yield put(respGetDashboardDetailKPI(response))
        } else {
            yield put(respGetDashboardDetailKPI(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetDashboardDetailKPI({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetActualInputData({ payload: req }) {
    try {
        const response = yield call(getActualInputDataBE, req)
        if (response.status == 1) {
            yield put(respGetActualInputData(response))
        } else {
            yield put(respGetActualInputData(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetActualInputData({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetDownloadDashboardDetail({ payload: req }) {
    try {
        yield call(getDownloadDashboardDetailBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchGetDownloadMasterTemplate({ payload: req }) {
    try {
        yield call(getDownloadMasterTemplateBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchGetDownloadPlanTemplate({ payload: req }) {
    try {
        yield call(getDownloadPlanTemplateBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchGetDownloadPlan({ payload: req }) {
    try {
        yield call(getDownloadPlanBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchUploadMasterKPI({ payload: req }) {
    try {
        const response = yield call(uploadMasterKPIBE, req)
        if (response.status == 1) {
            yield put(msgUpload(response))
        } else {
            yield put(msgUpload(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgUpload({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchUploadPlanKPI({ payload: req }) {
    try {
        const response = yield call(uploadPlanKPIBE, req)
        if (response.status == 1) {
            yield put(msgUpload(response))
        } else {
            yield put(msgUpload(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgUpload({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchSetActualInputData({ payload: req }) {
    try {
        const response = yield call(setActualInputDataBE, req)
        yield put(msgEdit(response))
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
    }
}

function* kpiSaga() {
    yield takeEvery(GET_YEAR_LIST, fetchGetYearList)
    yield takeEvery(GET_GROUP_LIST_KPI, fetchGetGroupListKPI)
    yield takeEvery(GET_GROUP_LIST_KPI_INPUT, fetchGetGroupListKPIInput)
    yield takeEvery(GET_CORPORATION_LIST, fetchGetCorporationList)
    yield takeEvery(GET_COLUMN_LIST, fetchGetColumnList)
    yield takeEvery(GET_KPI_MASTER, fetchGetKPIMaster)
    yield takeEvery(GET_PLAN, fetchGetPlan)
    yield takeEvery(GET_ITEM_LIST, fetchGetItem)
    yield takeEvery(GET_UNIT_LIST, fetchGetUnit)
    yield takeEvery(GET_DASHBOARD_KPI, fetchGetDashboardKPI)
    yield takeEvery(GET_DASHBOARD_DETAIL_KPI, fetchGetDashboardDetailKPI)
    yield takeEvery(GET_ACTUAL_INPUT_DATA, fetchGetActualInputData)
    yield takeEvery(DOWNLOAD_DASHBOARD_DETAIL, fetchGetDownloadDashboardDetail)
    yield takeEvery(DOWNLOAD_MASTER_TEMPLATE, fetchGetDownloadMasterTemplate)
    yield takeEvery(DOWNLOAD_PLAN_TEMPLATE, fetchGetDownloadPlanTemplate)
    yield takeEvery(DOWNLOAD_PLAN, fetchGetDownloadPlan)
    yield takeEvery(UPLOAD_MASTER_KPI, fetchUploadMasterKPI)
    yield takeEvery(UPLOAD_PLAN_KPI, fetchUploadPlanKPI)
    yield takeEvery(SET_ACTUAL_INPUT_DATA, fetchSetActualInputData)
}

export default kpiSaga