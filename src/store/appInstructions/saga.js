import { call, put, takeEvery, all} from "redux-saga/effects"

import { GET_INSTRUCTIONS, SAVE_INSTRUCTIONS, EDIT_INSTRUCTIONS, DELETE_INSTRUCTIONS, GET_USER_LIST, GET_DETAIL_INSTRUCTION, SAVE_DESCRIPTION, SAVE_REPLY, DOWNLOAD_FILES, DELETE_REPLY } from "./actionTypes"

import { respGetInstructions, msgAdd, msgEdit, msgDelete, respGetUserList, respGetDetailInstruction, msgDownload, msgDeleteReply, msgAddReply } from "./actions"

import { getInstructions, saveInstructions, editInstructions, deleteInstructions, getUserList, getDetailInstruction, saveDescriptions, saveReply, downloadFiles, deleteReply } from "helpers/backend_helper"

function* fetchGetInstructions({ payload: req }) {
    try {
      const response = yield call(getInstructions, req)
      if(response.status == 1){
        yield put(respGetInstructions(response))
      }else{
        yield put(respGetInstructions(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetInstructions({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchSaveInstructions({ payload: req }) {
    try {
      const response = yield call(saveInstructions, req)
      yield put(msgAdd(response))
    } catch (error) {
      console.log(error);
      yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchEditInstructions({ payload: req }) {
    try {
      const response = yield call(editInstructions, req)
      yield put(msgEdit(response))
    } catch (error) {
      console.log(error);
      yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchDeleteInstructions({ payload: req }) {
    try {
      const response = yield call(deleteInstructions, req)
      yield put(msgDelete(response))
    } catch (error) {
      console.log(error);
      yield put(msgDelete({"status" : 0, "data" : "Error Delete Data"}))
    }
  }

  function* fetchGetUserList({ payload: req }) {
    try {
      const response = yield call(getUserList, req)
      if(response.status == 1){
        yield put(respGetUserList(response))
      }else{
        yield put(respGetUserList(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetUserList({"status" : 0, "message" : "Error Get Data"}))
    }
  }

  function* fetchGetDetailInstruction({ payload: req }) {
  try {
    const response = yield call(getDetailInstruction, req)
    if(response.status == 1){
      yield put(respGetDetailInstruction(response))
    }else{
      yield put(respGetDetailInstruction(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDetailInstruction({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveDescriptions({ payload: req }) {
  try {
    const response = yield call(saveDescriptions, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveReply({ payload: req }) {
  try {
    const response = yield call(saveReply, req)
    yield put(msgAddReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgAddReply({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchDownloadfiles({ payload: req }) {
  try {
    yield call(downloadFiles, req)
  } catch (error) {
    yield put(msgDownload({"status" : 0, "message" : "Error Download Data"}))
  }
}

function* fetchDeleteReply({ payload: req }) {
  try {
    const response = yield call(deleteReply, req)
    yield put(msgDeleteReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgDeleteReply({"status" : 0, "data" : "Error Delete Data"}))
  }
}

  function* instructionsSaga() {
    
    yield takeEvery(GET_INSTRUCTIONS, fetchGetInstructions)
    yield takeEvery(SAVE_INSTRUCTIONS, fetchSaveInstructions)
    yield takeEvery(EDIT_INSTRUCTIONS, fetchEditInstructions)
    yield takeEvery(DELETE_INSTRUCTIONS, fetchDeleteInstructions)
    yield takeEvery(GET_USER_LIST, fetchGetUserList)
    yield takeEvery(GET_DETAIL_INSTRUCTION, fetchGetDetailInstruction)
    yield takeEvery(SAVE_DESCRIPTION, fetchSaveDescriptions)
    yield takeEvery(SAVE_REPLY, fetchSaveReply)
    yield takeEvery(DOWNLOAD_FILES, fetchDownloadfiles)
    yield takeEvery(DELETE_REPLY, fetchDeleteReply)
  
  }

  export default instructionsSaga