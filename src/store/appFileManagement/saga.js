import { call, put, takeEvery, all } from "redux-saga/effects";

import {

    GET_SELECT

} from "./actionTypes"

import {

    respGetSelect

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

  function* fileManagementSaga() {

    yield takeEvery(GET_SELECT, fetchGetSelectFolder)

  }

  export default fileManagementSaga
