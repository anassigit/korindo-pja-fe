import { call, put, takeEvery, all} from "redux-saga/effects"

import { EDIT_USER_PROFILE } from "./actionTypes"

import {  msgEdit } from "./actions"

import { editUserProfile } from "helpers/backend_helper"



  function* fetchEditUserProfile({ payload: req }) {
    try {
      const response = yield call(editUserProfile, req)
      yield put(msgEdit(response))
    } catch (error) {
      console.log(error);
      yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* userProfileSaga() {
    
    yield takeEvery(EDIT_USER_PROFILE, fetchEditUserProfile)
   
  }

  export default userProfileSaga
