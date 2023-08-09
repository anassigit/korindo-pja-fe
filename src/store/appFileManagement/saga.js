import { call, put, takeEvery, all } from "redux-saga/effects";

import {

    GET_SELECT,
    GET_SELECT_FILE,
    DELETE_FILE_FOLDER,
    RENAME_FILE_FOLDER,
    DOWNLOAD_FILES,
    UPLOAD_FILES,
    MOVE_FILES

} from "./actionTypes"

import {

    respGetSelect,
    respGetSelectFile,
    msgAdd,
    msgEdit,
    msgDelete,
    msgDownload,
    msgUpload,
    msgMove

} from "./actions"

import {

    selectFolder,
    deleteFileFolder,
    renameFileFolder,
    downloadFileFolder,
    uploadFileFolder,
    moveFileFolder

} from "helpers/backend_helper"

function* fetchGetSelectFolder({ payload: req }) {
    try {
      const response = yield call(selectFolder, req)
      if (response.status == 1) {
        yield put(respGetSelect(response))
      } else {
        yield put(respGetSelect(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetSelect({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fetchGetSelectFolder2({ payload: req }) {
    try {
      
      const response = yield call(selectFolder, req)
      if (response.status == 1) {
        yield put(respGetSelectFile(response))
      } else {
        yield put(respGetSelectFile(response))
      }
    } catch (error) {
      console.log(error);
      yield put(respGetSelectFile({ "status": 0, "message": "Error Get Data" }))
    }
  }

  function* fetchDeleteFileFolder({ payload: req }) {
    try {
      debugger
      const response = yield call(deleteFileFolder, req)
      yield put(msgDelete(response))
    } catch (error) {
      console.log(error);
      yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
    }
  }

  function* fetchRenameFileFolder({ payload: req }) {
    try {
      debugger
      const response = yield call(renameFileFolder, req)
      yield put(msgAdd(response))
    } catch (error) {
      console.log(error);
      yield put(msgAdd({ "status": 0, "data": "Error Rename Data" }))
    }
  }

  function* fetchDownloadfiles({ payload: req }) {
    try {
      debugger
      yield call(downloadFileFolder, req)
    } catch (error) {
      yield put(msgDownload({ "status": 0, "message": "Error Download Data" }))
    }
  }

  function* fetchUploadfiles({ payload: req }) {
    try {
      debugger
      yield call(uploadFileFolder, req)
    } catch (error) {
      yield put(msgUpload({ "status": 0, "message": "Error Upload Data" }))
    }
  }

  function* fetchMovefiles({ payload: req }) {
    try {
      debugger
      yield call(moveFileFolder, req)
    } catch (error) {
      yield put(msgMove({ "status": 0, "message": "Error Move Data" }))
    }
  }

  function* fileManagementSaga() {

    yield takeEvery(GET_SELECT, fetchGetSelectFolder)
    yield takeEvery(GET_SELECT_FILE, fetchGetSelectFolder2)
    yield takeEvery(DELETE_FILE_FOLDER, fetchDeleteFileFolder)
    yield takeEvery(RENAME_FILE_FOLDER, fetchRenameFileFolder)
    yield takeEvery(DOWNLOAD_FILES, fetchDownloadfiles)
    yield takeEvery(UPLOAD_FILES, fetchUploadfiles)
    yield takeEvery(MOVE_FILES, fetchMovefiles)

  }

  export default fileManagementSaga
