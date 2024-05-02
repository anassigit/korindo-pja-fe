import { call, put, takeEvery } from "redux-saga/effects"

import { GET_MENU_RULE, GET_RULE } from "./actionTypes"

import { respGetMenuRule, respGetRule } from "./actions"

import { getGroupRuleMenuListBE, getGroupRuleBE } from "helpers/backend_helper"

function* fetchGetRule({ payload: req }) {
  try {
    const response = yield call(getGroupRuleBE, req)
    if (response.status == 1) {
      yield put(respGetRule(response))
    } else {
      yield put(respGetRule(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRule({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getGroupRuleMenuListBE, req)
    if (response.status == 1) {
      yield put(respGetMenuRule(response))
    } else {
      yield put(respGetMenuRule(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenuRule({ "status": 0, "message": "Error Get Data" }))
  }
}


  function* ruleSaga() {
    
    yield takeEvery(GET_RULE, fetchGetRule)
    yield takeEvery(GET_MENU_RULE, fetchGetMenu)
   
  }

  export default ruleSaga
