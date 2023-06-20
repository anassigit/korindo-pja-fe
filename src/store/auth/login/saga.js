import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes"
import { apiError, loginSuccess, reloginSuccess } from "./actions"

import { login, getMenu} from "helpers/backend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
      const response = yield call(login, user);
      if(response.status == 1){
        localStorage.setItem("authUser", response.data.KOR_TOKEN);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // const res = yield call(getMenu)
       
        
        // if(res.status == 1){
        //   localStorage.setItem("menu", JSON.stringify(res.data.menu));
        // }
        history.push("/dashboard");
        yield put(loginSuccess(response));
      }else{
        yield put(apiError(response.listmessage))
      }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* reloginUser({ payload: { user, history } }) {
  try {
      const response = yield call(login, user);
      if(response.status == 1){
        localStorage.setItem("authUser", response.data.KOR_TOKEN);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        yield put(reloginSuccess(response));
        document.getElementById("reloginForm").style.display = "none";
        yield put(apiError(''))
      }else{
        yield put(apiError("Username and password tidak sesuai"))
      }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    history.push("/login")
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
