import { call, put, takeEvery, all} from "redux-saga/effects"

import { EDIT_USER_PROFILE, SAVE_USER_PASSWORD } from "./actionTypes"

import {  msgEdit, msgAdd } from "./actions"

import { editUserProfile, updateUserPassword } from "helpers/backend_helper"



  function* fetchEditUserProfile({ payload: req }) {
    try {
      const response = yield call(editUserProfile, req)
      yield put(msgEdit(response))
    } catch (error) {
      console.log(error);
      yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchUpdateUserPassword({ payload: req }) {
    try {
      const response = yield call(updateUserPassword, req)
      yield put(msgAdd(response))
    } catch (error) {
      console.log(error);
      yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* userProfileSaga() {
    
    yield takeEvery(EDIT_USER_PROFILE, fetchEditUserProfile)
    yield takeEvery(SAVE_USER_PASSWORD, fetchUpdateUserPassword)
   
  }

  export default userProfileSaga
