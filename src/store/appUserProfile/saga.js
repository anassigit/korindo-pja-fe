import { call, put, takeEvery, all } from "redux-saga/effects"

import { GET_PROFILE, EDIT_USER_PROFILE, UPDATE_USER_PASSWORD, EMAIL_FORGOT_PASSWORD, UPDATE_FORGOT_PASSWORD, GET_MENU } from "./actionTypes"

import { respGetProfile, msgEdit, msgUpdatePassword, msgEmailForgotPassword, respGetMenuList } from "./actions"

import { ReactSession } from 'react-client-session';
import { getProfile, editUserProfile, updateUserPassword, emailForgotPassword, updateForgotPassword, getMenuBE, getSelectMenu } from "helpers/backend_helper"

function* fetchGetProfile({ payload: req }) {
  try {
    const response = yield call(getProfile, req)
    if (response.status == 1) {
      yield put(respGetProfile(response))
    } else {
      yield put(respGetProfile(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetProfile({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditUserProfile({ payload: req }) {
  try {
    const response = yield call(editUserProfile, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
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
    yield put(msgEmailForgotPassword(response))
  } catch (error) {
    console.log(error);
    yield put(msgEmailForgotPassword({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchUpdateForgotPassword({ payload: req }) {
  try {
    const response = yield call(updateForgotPassword, req)
    yield put(msgUpdatePassword(response))
  } catch (error) {
    console.log(error);
    yield put(msgUpdatePassword({ "status": 0, "message": "Error Update Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMenuBE, req)
    if (response.status == 1) {
      if (response.status == '1') {
        const menuData = {
          menu: response.data.result,
          menuType: 'pja'
        }
        const menuRule = yield call(getSelectMenu, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
      }
      yield put(respGetMenuList(response))
    } else {
      yield put(respGetMenuList(response))
    }
    console.log(localStorage.getItem('menuType'));
  } catch (error) {
    console.log(error);
    yield put(respGetMenuList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* userProfileSaga() {

  yield takeEvery(GET_PROFILE, fetchGetProfile)
  yield takeEvery(EDIT_USER_PROFILE, fetchEditUserProfile)
  yield takeEvery(UPDATE_USER_PASSWORD, fetchUpdateUserPassword)
  yield takeEvery(EMAIL_FORGOT_PASSWORD, fetchEmailForgetPassword)
  yield takeEvery(UPDATE_FORGOT_PASSWORD, fetchUpdateForgotPassword)
  yield takeEvery(GET_MENU, fetchGetMenu)

}

export default userProfileSaga
