import { call, put, takeEvery, all } from "redux-saga/effects";

import {

    GET_SELECT,
    GET_SELECT_FILE

} from "./actionTypes"

import {

    respGetSelect,
    respGetSelectFile,
    msgAdd,
    msgEdit,
    msgDelete

} from "./actions"

import {

    selectFolder

} from "helpers/backend_helper"

function* fetchGetSelectFolder({ payload: req }) {
    try {
      const response = yield call(selectFolder, req)
      if (response.status == 1) {
        yield put(respGetSelect(response))
      } else {
        yield put(respGetSelect(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetSelect({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fetchGetSelectFolder2({ payload: req }) {
    try {
      const response = yield call(selectFolder, req)
      if (response.status == 1) {
        yield put(respGetSelectFile(response))
      } else {
        yield put(respGetSelectFile(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetSelectFile({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fileManagementSaga() {

    yield takeEvery(GET_SELECT, fetchGetSelectFolder)
    yield takeEvery(GET_SELECT_FILE, fetchGetSelectFolder2)

  }

  export default fileManagementSaga
