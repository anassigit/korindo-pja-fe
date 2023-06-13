import { call, put, takeEvery, all} from "redux-saga/effects"

// Crypto Redux StatesgetMenuSuccess
import { GET_MUSER, EDIT_MUSER, SAVE_MUSER, DELETE_MUSER, GET_ROLE_COMBO } from "./actionTypes"
import { respGetmuser, msgEdit, msgAdd, msgDelete, respGetrolecombo } from "./actions"

//Include Both Helper File with needed methods
import { getMuser, editMuser, saveMuser,deleteMuser, getRoleCombo} from "helpers/backend_helper"

function* fetchGetMuser({ payload: req }) {
  try {
    const response = yield call(getMuser, req)
    if(response.status == 1){
      yield put(respGetmuser(response))
    }else{
      yield put(respGetmuser(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetmuser({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchEditMuser({ payload: req }) {
  try {
    const response = yield call(editMuser, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveMuser({ payload: req }) {
  try {
    const response = yield call(saveMuser, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchDeleteMuser({ payload: req }) {
  try {
    const response = yield call(deleteMuser, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "data" : "Error Delete Data"}))
  }
}

function* fetchGetRoleCombo({ payload: req }) {
  try {
    const response = yield call(getRoleCombo, req)
    if(response.status == 1){
      yield put(respGetrolecombo(response))
    }else{
      yield put(respGetrolecombo(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetrolecombo({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* mUserSaga() {
    
  yield takeEvery(GET_MUSER, fetchGetMuser)
  yield takeEvery(EDIT_MUSER, fetchEditMuser)
  yield takeEvery(SAVE_MUSER, fetchSaveMuser)
  yield takeEvery(DELETE_MUSER, fetchDeleteMuser)
  yield takeEvery(GET_ROLE_COMBO, fetchGetRoleCombo)

}

export default mUserSaga
