import { call, put, takeEvery } from "redux-saga/effects"
import { GET_CORPORATION_LIST, GET_DASHBOARD_KPI, DOWNLOAD_KPI_TEMPLATE, GET_GROUP_LIST_KPI, GET_ITEM_LIST, GET_KPI_MASTER, GET_UNIT_LIST, UPLOAD_KPI, GET_KPI_INPUT_DATA, SET_KPI_NOTE, GET_DASHBOARD_DETAIL_KPI, DOWNLOAD_DASHBOARD_DETAIL, GET_GROUP_LIST_KPI_INPUT, GET_KPI_FILE, UPLOAD_KPI_RESULT, DOWNLOAD_KPI_EXCEL, SET_KPI_NOTE_TO_DELETE, GET_TEST_RUN, GET_PROMPT_ANSWER } from "./actionTypes"
import { msgUpload, respGetKPIInputData, respGetCorporationList, respGetDashboardKPI, respGetGroupListKpi, respGetItemList, respGetKPIMaster, respGetUnitList, msgEdit, respGetDashboardDetailKPI, respGetGroupListKpiInput, respGetKPIFile, msgDelete, respGetPromptAnswer } from "./actions"
import { getItemListBE, getCorporationListKPIBE, getDashboardKPIBE, getGroupListKPIBE, getKPIMasterBE, getUnitBE, getDownloadKPITemplateBE, uploadKPIBE, getKPIInputDataBE, setKPINoteBE, getDownloadDashboardDetailBE, getKPIFileBE, uploadKPIResultBE, getDownloadKPIExcelBE, testRunBE, getPromptAnswerBE } from "helpers/backend_helper"

function* fetchGetGroupListKPI({ payload: req }) {
    try {
        const response = yield call(getGroupListKPIBE, req)
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
        const response = yield call(getGroupListKPIBE, req)
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
        const response = yield call(getCorporationListKPIBE, req)
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

function* fetchGetItemList({ payload: req }) {
    try {
        const response = yield call(getItemListBE, req)
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
        const response = yield call(getDashboardKPIBE, req)
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

function* fetchGetKPIInputData({ payload: req }) {
    try {
        const response = yield call(getKPIInputDataBE, req)
        if (response.status == 1) {
            yield put(respGetKPIInputData(response))
        } else {
            yield put(respGetKPIInputData(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIInputData({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPIFile({ payload: req }) {
    try {
        const response = yield call(getKPIFileBE, req)
        if (response.status == 1) {
            yield put(respGetKPIFile(response))
        } else {
            yield put(respGetKPIFile(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIFile({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetDownloadDashboardDetail({ payload: req }) {
    try {
        yield call(getDownloadDashboardDetailBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchGetDownloadKPITemplate({ payload: req }) {
    try {
        yield call(getDownloadKPITemplateBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchGetDownloadKPIExcel({ payload: req }) {
    try {
        yield call(getDownloadKPIExcelBE, req)
    } catch (error) {
        console.log(error);
    }
}

function* fetchUploadKPI({ payload: req }) {
    try {
        const response = yield call(uploadKPIBE, req)
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

function* fetchUploadKPIResult({ payload: req }) {
    try {
        const response = yield call(uploadKPIResultBE, req)
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

function* fetchSetKPINote({ payload: req }) {
    try {
        const response = yield call(setKPINoteBE, req)
        yield put(msgEdit(response))
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchSetKPINoteToDelete({ payload: req }) {
    try {
        const response = yield call(setKPINoteBE, req)
        yield put(msgDelete(response))
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetPromptAnswer({ payload: req }) {
    try {
        const response = yield call(getPromptAnswerBE, req)
        yield put(respGetPromptAnswer(response))
    } catch (error) {
        console.log(error);
        yield put(respGetPromptAnswer({ "status": 0, "message": "Error Get Data" }))
    }
}

function* kpiSaga() {
    yield takeEvery(GET_GROUP_LIST_KPI, fetchGetGroupListKPI)
    yield takeEvery(GET_GROUP_LIST_KPI_INPUT, fetchGetGroupListKPIInput)
    yield takeEvery(GET_CORPORATION_LIST, fetchGetCorporationList)
    yield takeEvery(GET_ITEM_LIST, fetchGetItemList)
    yield takeEvery(GET_KPI_MASTER, fetchGetKPIMaster)
    yield takeEvery(GET_UNIT_LIST, fetchGetUnit)
    yield takeEvery(GET_DASHBOARD_KPI, fetchGetDashboardKPI)
    yield takeEvery(GET_DASHBOARD_DETAIL_KPI, fetchGetDashboardDetailKPI)
    yield takeEvery(GET_KPI_INPUT_DATA, fetchGetKPIInputData)
    yield takeEvery(GET_KPI_FILE, fetchGetKPIFile)
    yield takeEvery(DOWNLOAD_DASHBOARD_DETAIL, fetchGetDownloadDashboardDetail)
    yield takeEvery(DOWNLOAD_KPI_TEMPLATE, fetchGetDownloadKPITemplate)
    yield takeEvery(DOWNLOAD_KPI_EXCEL, fetchGetDownloadKPIExcel)
    yield takeEvery(UPLOAD_KPI, fetchUploadKPI)
    yield takeEvery(UPLOAD_KPI_RESULT, fetchUploadKPIResult)
    yield takeEvery(SET_KPI_NOTE, fetchSetKPINote)
    yield takeEvery(SET_KPI_NOTE_TO_DELETE, fetchSetKPINoteToDelete)
    yield takeEvery(GET_PROMPT_ANSWER, fetchGetPromptAnswer)
}

export default kpiSaga