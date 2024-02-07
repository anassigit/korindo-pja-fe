import { call, put, takeEvery } from "redux-saga/effects"
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes"
import { apiError, loginSuccess, reloginSuccess } from "./actions"
import { ReactSession } from 'react-client-session'
import { login, getMenuBE, getSelectMenu } from "helpers/backend_helper"

window.onpopstate = function (event) {
  if (event?.currentTarget?.location?.pathname === '/login' && localStorage.getItem("authUser") !== null) {
    history.go(1)
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user)
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      const menu = yield call(getMenuBE, '')
      if (menu.status == '1') {
        const menuString = JSON.stringify(menu.data.result)
        const menuRule = yield call(getSelectMenu, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
        localStorage.setItem('menu', menuString)
        localStorage.setItem('menuType', 'pja')
      }
      localStorage.setItem("user", JSON.stringify(response.data.user))
      ReactSession.set("firstTime_Login", JSON.stringify(response.data.firstTime_Login))
      localStorage.setItem('appFileManagementData', '')
      ReactSession.remove("appInstructionsTabelSearch")
      ReactSession.remove('selected')
      ReactSession.remove('dateFrom')
      ReactSession.remove('dateTo')
      ReactSession.remove('searchValue')
      history.push({ pathname: '/' })
      yield put(loginSuccess(response))
    } else {
      yield put(apiError(response.message))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* reloginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user)
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      const menu = yield call(getMenuBE, '')
      if (menu.status == '1') {
        const menuString = JSON.stringify(menu.data.result)
        const menuRule = yield call(getSelectMenu, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
        localStorage.setItem('menu', menuString)
        localStorage.setItem('menuType', 'pja')
      }

      localStorage.setItem("user", JSON.stringify(response.data.user))
      yield put(reloginSuccess(response))
      window.location.reload()
      document.getElementById("reloginForm").style.display = "none"
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
    localStorage.removeItem("authUser")
    localStorage.removeItem("user")
    localStorage.removeItem('menu')
    ReactSession.remove('menu')
    localStorage.removeItem('menuType')
    localStorage.removeItem('menuRule')
    history.push("/login")
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
