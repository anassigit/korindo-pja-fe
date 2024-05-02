import { call, put, takeEvery, all } from "redux-saga/effects"

import { GET_PROFILE, EDIT_USER_PROFILE, UPDATE_USER_PASSWORD, EMAIL_FORGOT_PASSWORD, UPDATE_FORGOT_PASSWORD, GET_MENU } from "./actionTypes"

import { respGetProfile, msgEdit, msgUpdatePassword, msgEmailForgotPassword, respGetMenuList } from "./actions"

import { ReactSession } from 'react-client-session';
import { getProfileBE, editUserProfileBE, updateUserPasswordBE, emailForgotPasswordBE, updateForgotPasswordBE, getMenuListBE, getGroupRuleMenuListBE } from "helpers/backend_helper"

function* fetchGetProfile({ payload: req }) {
  try {
    const response = yield call(getProfileBE, req)
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
    const response = yield call(editUserProfileBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchUpdateUserPassword({ payload: req }) {
  try {
    const response = yield call(updateUserPasswordBE, req)
    yield put(msgUpdatePassword(response))
  } catch (error) {
    console.log(error);
    yield put(msgUpdatePassword({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEmailForgetPassword({ payload: req }) {
  try {
    const response = yield call(emailForgotPasswordBE, req)
    yield put(msgEmailForgotPassword(response))
  } catch (error) {
    console.log(error);
    yield put(msgEmailForgotPassword({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchUpdateForgotPassword({ payload: req }) {
  try {
    const response = yield call(updateForgotPasswordBE, req)
    yield put(msgUpdatePassword(response))
  } catch (error) {
    console.log(error);
    yield put(msgUpdatePassword({ "status": 0, "message": "Error Update Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMenuListBE, req)
    if (response.status == 1) {
      if (response.status == '1') {
        const menuData = {
          menu: response.data.result,
          menuType: 'pja'
        }
        localStorage.setItem("menu", JSON.stringify(menuData))
        const menuRule = yield call(getGroupRuleMenuListBE, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
      }
      yield put(respGetMenuList(response))
    } else {
      yield put(respGetMenuList(response))
    }
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
