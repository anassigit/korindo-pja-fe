import { call, put, takeEvery } from "redux-saga/effects"
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes"
import { apiError, loginSuccess, reloginSuccess } from "./actions"
import { ReactSession } from 'react-client-session'
import { loginBE, getMenuListBE, getGroupRuleMenuListBE } from "helpers/backend_helper"

window.onpopstate = function (event) {
  if (event?.currentTarget?.location?.pathname === '/login' && localStorage.getItem("authUser") !== null) {
    history.go(1)
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(loginBE, user)
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      const menu = yield call(getMenuListBE, '')
      if (menu.status == '1') {
        const menuData = {
          menu: menu.data.result,
          menuType: 'pja'
        }

        localStorage.setItem("menu", JSON.stringify(menuData))
        const menuRule = yield call(getGroupRuleMenuListBE, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
      }
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("firstTime_Login", JSON.stringify(response.data.firstTime_Login))
      localStorage.setItem('appFileManagementData', '')
      ReactSession.remove("appInstructionsTabelSearch")
      ReactSession.remove('selected')
      ReactSession.remove('dateFrom')
      ReactSession.remove('dateTo')
      ReactSession.remove('searchValue')
      if (!localStorage.getItem("I18N_LANGUAGE")) {
        localStorage.setItem("I18N_LANGUAGE", "eng")
      }
      history.push({ pathname: '/' })
      window.location.reload()
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
    const response = yield call(loginBE, user)
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      const menu = yield call(getMenuListBE, '')
      if (menu.status == '1') {

        const menuData = {
          menu: menu.data.result,
          menuType: 'pja'
        }

        localStorage.setItem("menu", JSON.stringify(menuData))

        const menuRule = yield call(getGroupRuleMenuListBE, '')
        if (menuRule.status == '1') {
          const menuString2 = JSON.stringify(menuRule)
          localStorage.setItem('menuRule', menuString2)
        }
      }

      localStorage.setItem("user", JSON.stringify(response.data.user))
      yield put(reloginSuccess(response))
      document.getElementById("reloginForm").style.display = "none"
      if (!localStorage.getItem("I18N_LANGUAGE")) {
        localStorage.setItem("I18N_LANGUAGE", "eng")
      }
      window.location.reload()
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
    localStorage.removeItem('menuType')
    localStorage.removeItem('firstTime_Login')
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
