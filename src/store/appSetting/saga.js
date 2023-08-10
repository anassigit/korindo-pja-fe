import { call, put, takeEvery, all } from "redux-saga/effects"

import { GET_MEMBERS, SAVE_MEMBERS, EDIT_MEMBERS, DELETE_MEMBERS, EDIT_GENERAL_SETTING, GET_SETTING, GET_RANK_LIST } from "./actionTypes"

import { msgAdd, msgEdit, msgDelete, respGetSetting, respGetMembers, respGetRankList } from "./actions"

import { deleteMembers, getMembers, getRankList, getSetting, saveMembers, updateGeneralSetting, updateMembers } from "helpers/backend_helper"

function* fetchGetAllSetting({ payload: req }) {
  try {
    const response = yield call(getSetting, req)
    if (response.status == 1) {
      yield put(respGetSetting(response))
    } else {
      yield put(respGetSetting(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSetting({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveMembers({ payload: req }) {
  try {
    const response = yield call(saveMembers, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditMembers({ payload: req }) {
  try {
    const response = yield call(updateMembers, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteMembers({ payload: req }) {
  try {
    const response = yield call(deleteMembers, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
  }
}

/* GENERAL SETTING */

function* fetchEditGeneralSetting({ payload: req }) {
  try {
    const response = yield call(updateGeneralSetting, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

/* MEMBERS */

function* fetchGetAllMembers({ payload: req }) {
  try {
    const response = yield call(getMembers, req)
    if (response.status == 1) {
      yield put(respGetMembers(response))
    } else {
      yield put(respGetMembers(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMembers({ "status": 0, "message": "Error Get Data" }))
  }
}

/* RANK LIST */

function* fetchGetAllRankList({ payload: req }) {
  try {
    const response = yield call(getRankList, req)
    if (response.status == 1) {
      yield put(respGetRankList(response))
    } else {
      yield put(respGetRankList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRankList({ "status": 0, "message": "Error Get Data" }))
  }
}


function* settingSaga() {

  yield takeEvery(GET_SETTING, fetchGetAllSetting)
  yield takeEvery(SAVE_MEMBERS, fetchSaveMembers)
  yield takeEvery(EDIT_MEMBERS, fetchEditMembers)
  yield takeEvery(DELETE_MEMBERS, fetchDeleteMembers)
  yield takeEvery(EDIT_GENERAL_SETTING, fetchEditGeneralSetting)

  yield takeEvery(GET_MEMBERS, fetchGetAllMembers)
  yield takeEvery(GET_RANK_LIST, fetchGetAllRankList)
}

export default settingSaga