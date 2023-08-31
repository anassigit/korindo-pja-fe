import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes"
import { apiError, loginSuccess, reloginSuccess } from "./actions"
import { ReactSession } from 'react-client-session';

import { login, getMenu } from "helpers/backend_helper"
import { useEffect } from "react";

window.onpopstate = function (event) {
  const currentPath = event?.currentTarget?.location?.pathname;
  const authUser = ReactSession.get("authUser");

  if (currentPath === '/login' && authUser !== null) {
    history.go(1);
  }
};

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user);
    if (response.status == 1) {

      ReactSession.set("authUser", response.data.KOR_TOKEN);
      ReactSession.set("user", JSON.stringify(response.data.user));
      ReactSession.set("firstTime_Login", JSON.stringify(response.data.firstTime_Login))
      localStorage.setItem('appFileManagementData', '')

      history.push({ pathname: '/' });
      yield put(loginSuccess(response));
    } else {
      yield put(apiError(response.message))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* reloginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user);
    if (response.status == 1) {
      ReactSession.set("authUser", response.data.KOR_TOKEN);
      ReactSession.set("user", JSON.stringify(response.data.user));
      yield put(reloginSuccess(response))
      window.location.reload()
      document.getElementById("reloginForm").style.display = "none";
      yield put(apiError(''))
    } else {
      yield put(apiError("Id or Password not match"))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    ReactSession.set("authUser", "");
    ReactSession.set("user", "");
    history.push("/login");
    yield put(apiError(""))
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(RELOGIN_USER, reloginUser)
}

export default authSaga
