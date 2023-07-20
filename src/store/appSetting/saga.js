import { call, put, takeEvery, all} from "redux-saga/effects"

import { GET_MEMBERS, SAVE_MEMBERS, EDIT_MEMBERS, DELETE_MEMBERS } from "./actionTypes"

import { respGetMembers, msgAdd, msgEdit, msgDelete } from "./actions"

import { deleteMembers, getMembers, saveMembers, updateMembers } from "helpers/backend_helper"

function* fetchGetMembers({ payload: req }) {
    try {
      const response = yield call(getMembers, req)
      if(response.status == 1){
        yield put(respGetMembers(response))
      }else{
        yield put(respGetMembers(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetMembers({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchSaveMembers({ payload: req }) {
    try {
      const response = yield call(saveMembers, req)
      yield put(msgAdd(response))
    } catch (error) {
      console.log(error);
      yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchEditMembers({ payload: req }) {
    try {
      const response = yield call(updateMembers, req)
      yield put(msgEdit(response))
    } catch (error) {
      console.log(error);
      yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchDeleteMembers({ payload: req }) {
    try {
      const response = yield call(deleteMembers, req)
      yield put(msgDelete(response))
    } catch (error) {
      console.log(error);
      yield put(msgDelete({"status" : 0, "data" : "Error Delete Data"}))
    }
  }

  function* settingSaga() {
    
    yield takeEvery(GET_MEMBERS, fetchGetMembers)
    yield takeEvery(SAVE_MEMBERS, fetchSaveMembers)
    yield takeEvery(EDIT_MEMBERS, fetchEditMembers)
    yield takeEvery(DELETE_MEMBERS, fetchDeleteMembers)
  }

  export default settingSaga