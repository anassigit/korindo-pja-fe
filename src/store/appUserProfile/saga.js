import { call, put, takeEvery, all} from "redux-saga/effects"

import { GET_USER_PROFILE, SAVE_USER_PROFILE, EDIT_USER_PROFILE, DELETE_USER_PROFILE } from "./actionTypes"

import { respGetUserProfile, msgAdd, msgEdit, msgDelete } from "./actions"

import { getUserProfile, saveUserProfile, editUserProfile, deleteUserProfile } from "helpers/backend_helper"

function* fetchGetUserProfile({ payload: req }) {
    try {
      const response = yield call(getUserProfile, req)
      if(response.status == 1){
        yield put(respGetUserProfile(response))
      }else{
        yield put(respGetUserProfile(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetUserProfile({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchSaveUserProfile({ payload: req }) {
    try {
      const response = yield call(saveUserProfile, req)
      yield put(msgAdd(response))
    } catch (error) {
      console.log(error);
      yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchEditUserProfile({ payload: req }) {
    try {
      const response = yield call(editUserProfile, req)
      yield put(msgEdit(response))
    } catch (error) {
      console.log(error);
      yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchDeleteUserProfile({ payload: req }) {
    try {
      const response = yield call(deleteUserProfile, req)
      yield put(msgDelete(response))
    } catch (error) {
      console.log(error);
      yield put(msgDelete({"status" : 0, "data" : "Error Delete Data"}))
    }
  }

  function* userProfileSaga() {
    
    yield takeEvery(GET_USER_PROFILE, fetchGetUserProfile)
    yield takeEvery(SAVE_USER_PROFILE, fetchSaveUserProfile)
    yield takeEvery(EDIT_USER_PROFILE, fetchEditUserProfile)
    yield takeEvery(DELETE_USER_PROFILE, fetchDeleteUserProfile)
  
  }

  export default userProfileSaga
