import { call, put, takeEvery } from "redux-saga/effects"
import { LOV_MENU_PARENT, LOV_USER, LOV_DIV, LOV_COMPANY, LOV_MENU, LOV_MENU_PARENT_LIST, LOV_MENU_ROLE_LIST, LOV_GET_KPI_CATEGORY_LIST, LOV_GET_KPI_UNIT_LIST } from "./actionTypes"
import { msgLov } from "./actions"
import { getMenuParent, getUser, getDiv, getLovMenu, getLovParentMenuListBE, getRoleUser, getLovParentRoleListBE, getKPICategoryListForKPIItemBE, getKPIUnitListForKPIItemBE } from "helpers/backend_helper"

function* fetchGetMenuParent({ payload: req }) {
    try {
        const response = yield call(getMenuParent, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetUser({ payload: req }) {
    try {
        const response = yield call(getUser, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetMenuParentList({ payload: req }) {
    try {
        const response = yield call(getLovParentMenuListBE, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetRoleList({ payload: req }) {
    try {
        const response = yield call(getLovParentRoleListBE, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPICategoryList({ payload: req }) {
    try {
        const response = yield call(getKPICategoryListForKPIItemBE, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPIUnitList({ payload: req }) {
    try {
        const response = yield call(getKPIUnitListForKPIItemBE, req)
        if (response.status == 1) {
            yield put(msgLov(response))
        } else {
            yield put(msgLov(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
    }
}

function* lovSaga() {
    yield takeEvery(LOV_MENU_PARENT, fetchGetMenuParent)
    yield takeEvery(LOV_USER, fetchGetUser)
    yield takeEvery(LOV_MENU_PARENT_LIST, fetchGetMenuParentList)
    yield takeEvery(LOV_MENU_ROLE_LIST, fetchGetRoleList)
    yield takeEvery(LOV_GET_KPI_CATEGORY_LIST, fetchGetKPICategoryList)
    yield takeEvery(LOV_GET_KPI_UNIT_LIST, fetchGetKPIUnitList)
}

export default lovSaga