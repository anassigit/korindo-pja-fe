import { call, put, takeEvery} from "redux-saga/effects"

import { GET_RO_AKSES, GET_RO_AKSES_USER, EDIT_RO_AKSES, SAVE_RO_AKSES, DELETE_RO_AKSES, SAVE_RO_AKSES_USER, DELETE_RO_AKSES_USER, GET_RO_AKSES_PLANT, SAVE_RO_AKSES_PLANT, DELETE_RO_AKSES_PLANT } from "./actionTypes"
import { respGetRoAkses, respGetRoAksesUser, respGetRoAksesPlant, msgEdit, msgAdd1,msgAdd, msgAdd2, msgDelete} from "./actions"

import { getRoAkses, getRoAksesUser, getRoAksesPlant, editRoAkses, deleteRoAkses, saveRoAkses, saveRoAksesUser, deleteRoAksesUser, saveRoAksesPlant, deleteRoAksesPlant} from "helpers/backend_helper"

function* fetchGetRoAkses({ payload: req }) {
  try {
    const response = yield call(getRoAkses, req)
    if(response.status == 1){
      yield put(respGetRoAkses(response))
    }else{
      yield put(respGetRoAkses(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoAkses({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchEditRoAkses({ payload: req }) {
  try {
    const response = yield call(editRoAkses, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Edit Data"}))
  }
}

function* fetchSaveRoAkses({ payload: req }) {
  try {
    const response = yield call(saveRoAkses, req)
    yield put(msgAdd(response))
  } catch (error) {
    yield put(msgAdd({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteRoAkses({ payload: req }) {
  try {
    const response = yield call(deleteRoAkses, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

function* fetchGetRoAksesUser({ payload: req }) {
  try {
    console.log(req);
    const response = yield call(getRoAksesUser, req)
    if(response.status == 1){
      yield put(respGetRoAksesUser(response))
    }else{
      yield put(respGetRoAksesUser(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoAksesUser({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveRoAksesUser({ payload: req }) {
  try {
    const response = yield call(saveRoAksesUser, req)
    yield put(msgAdd2(response))
  } catch (error) {
    yield put(msgAdd2({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteRoAksesUser({ payload: req }) {
  try {
    const response = yield call(deleteRoAksesUser, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

function* fetchGetRoAksesPlant({ payload: req }) {
  try {
    console.log(req);
    const response = yield call(getRoAksesPlant, req)
    if(response.status == 1){
      yield put(respGetRoAksesPlant(response))
    }else{
      yield put(respGetRoAksesPlant(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoAksesPlant({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveRoAksesPlant({ payload: req }) {
  try {
    const response = yield call(saveRoAksesPlant, req)
    yield put(msgAdd1(response))
  } catch (error) {
    yield put(msgAdd1({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteRoAksesPlant({ payload: req }) {
  try {
    const response = yield call(deleteRoAksesPlant, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

function* roAksesSaga() {
    
  yield takeEvery(GET_RO_AKSES, fetchGetRoAkses)
  yield takeEvery(EDIT_RO_AKSES, fetchEditRoAkses)
  yield takeEvery(SAVE_RO_AKSES, fetchSaveRoAkses)
  yield takeEvery(DELETE_RO_AKSES, fetchDeleteRoAkses)
  yield takeEvery(GET_RO_AKSES_USER, fetchGetRoAksesUser)
  yield takeEvery(SAVE_RO_AKSES_USER, fetchSaveRoAksesUser)
  yield takeEvery(DELETE_RO_AKSES_USER, fetchDeleteRoAksesUser)
  yield takeEvery(GET_RO_AKSES_PLANT, fetchGetRoAksesPlant)
  yield takeEvery(SAVE_RO_AKSES_PLANT, fetchSaveRoAksesPlant)
  yield takeEvery(DELETE_RO_AKSES_PLANT, fetchDeleteRoAksesPlant)

}

export default roAksesSaga
