import { call, put, takeEvery, all} from "redux-saga/effects"

import { EDIT_USER_PROFILE, UPDATE_USER_PASSWORD, EMAIL_FORGOT_PASSWORD, UPDATE_FORGOT_PASSWORD } from "./actionTypes"

import {  msgEdit, msgUpdatePassword } from "./actions"

import { editUserProfile, updateUserPassword, emailForgotPassword, updateForgotPassword } from "helpers/backend_helper"



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
      yield put(msgUpdatePassword(response))
    } catch (error) {
      console.log(error);
      yield put(msgUpdatePassword({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fetchEmailForgetPassword({ payload: req }) {
    try {
      const response = yield call(emailForgotPassword, req)
      // yield put(msgUpdatePassword(response))
    } catch (error) {
      // console.log(error);
      // yield put(msgUpdatePassword({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fetchUpdateForgotPassword({ payload: req }) {
    try {
      const response = yield call(updateForgotPassword, req)
      yield put(msgUpdatePassword(response))
    } catch (error) {
      console.log(error);
      yield put(msgUpdatePassword({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* userProfileSaga() {
    
    yield takeEvery(EDIT_USER_PROFILE, fetchEditUserProfile)
    yield takeEvery(UPDATE_USER_PASSWORD, fetchUpdateUserPassword)
    yield takeEvery(EMAIL_FORGOT_PASSWORD, fetchEmailForgetPassword)
    yield takeEvery(UPDATE_FORGOT_PASSWORD, fetchUpdateForgotPassword)
   
  }

  export default userProfileSaga
