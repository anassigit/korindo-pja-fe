import { call, put, takeEvery, all } from "redux-saga/effects";

import {
  GET_INSTRUCTIONS,
  GET_MANAGER,
  GET_OWNER,
  GET_SELECTED_MANAGER,
  GET_INSTRUCTIONS2,
  SAVE_INSTRUCTIONS,
  EDIT_INSTRUCTIONS,
  DELETE_INSTRUCTIONS,
  GET_DETAIL_INSTRUCTION,
  SAVE_DESCRIPTION,
  SAVE_REPLY,
  DOWNLOAD_FILES,
  DELETE_REPLY,
  GET_REPLY,
  GET_ATTACHMENT,
  EDIT_REPLY,
  GET_STATUS,
  GET_LOGS,
  GET_CHECK_DOWNLOAD, // Added this import
} from "./actionTypes";

import {
  respGetInstructions,
  respGetManager,
  respGetOwner,
  respGetSelectedManager,
  respGetInstructions2,
  msgAdd,
  msgEdit,
  msgDelete,
  respGetDetailInstruction,
  msgDownload,
  msgDeleteReply,
  msgAddReply,
  respGetReply,
  respGetAttachment,
  msgEditReply,
  respGetLogs,
  respGetStatus,
  respGetCheckDownload,
} from "./actions";

import {
  getInstructions,
  getManagerList,
  getOwnerList,
  getSelectedManager,
  getInstructions2,
  saveInstructions,
  editInstructions,
  deleteInstructions,
  getDetailInstruction,
  saveDescriptions,
  saveReply,
  downloadFiles,
  deleteReply,
  getReply,
  getAttachment,
  editReply,
  getStatusList,
  getLogsList,
  checkFileDownload, // Added this import
} from "helpers/backend_helper";

function* fetchGetInstructions({ payload: req }) {
  try {
    const response = yield call(getInstructions, req)
    if (response.status == 1) {
      yield put(respGetInstructions(response))
    } else {
      yield put(respGetInstructions(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetInstructions({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetManager({ payload: req }) {
  try {
    const response = yield call(getManagerList, req)
    if (response.status == 1) {
      yield put(respGetManager(response))
    } else {
      yield put(respGetManager(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetManager({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetOwner({ payload: req }) {
  try {
    const response = yield call(getOwnerList, req)
    if (response.status == 1) {
      yield put(respGetOwner(response))
    } else {
      yield put(respGetOwner(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetOwner({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetSelectedManager({ payload: req }) {
  try {
    const response = yield call(getSelectedManager, req)
    if (response.status == 1) {
      yield put(respGetSelectedManager(response))
    } else {
      yield put(respGetSelectedManager(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSelectedManager({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetInstructions2({ payload: req }) {
  try {
    const response = yield call(getInstructions2, req)
    if (response.status == 1) {
      yield put(respGetInstructions2(response))
    } else {
      yield put(respGetInstructions2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetInstructions2({ "status": 0, "message": "Error Get Data" }))
  }
}


function* fetchSaveInstructions({ payload: req }) {
  try {
    const response = yield call(saveInstructions, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditInstructions({ payload: req }) {
  try {
    const response = yield call(editInstructions, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteInstructions({ payload: req }) {
  try {
    const response = yield call(deleteInstructions, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
  }
}

// function* fetchGetUserList({ payload: req }) {
//   try {
//     const response = yield call(getUserList, req)
//     if(response.status == 1){
//       yield put(respGetUserList(response))
//     }else{
//       yield put(respGetUserList(response))
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(respGetUserList({"status" : 0, "message" : "Error Get Data"}))
//   }
// }

function* fetchGetDetailInstruction({ payload: req }) {
  try {
    const response = yield call(getDetailInstruction, req)
    if (response.status == 1) {
      yield put(respGetDetailInstruction(response))
    } else {
      yield put(respGetDetailInstruction(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDetailInstruction({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveDescriptions({ payload: req }) {
  try {
    const response = yield call(saveDescriptions, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetStatus({ payload: req }) {
  try {
    const response = yield call(getStatusList, req)
    if (response.status == 1) {
      yield put(respGetStatus(response))
    } else {
      yield put(respGetStatus(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetStatus({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetCheckDownload({ payload: req }) {
  try {
    const response = yield call(checkFileDownload, req)
    if (response.status == 1) {
      yield put(respGetCheckDownload(response))
    } else {
      yield put(respGetCheckDownload(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCheckDownload({ "status": 0, "message": "Error Get Data" }))
  }
}
/************ REPLIES HERE ************/

function* fetchGetReply({ payload: req }) {
  try {
    const response = yield call(getReply, req)
    if (response.status == 1) {
      yield put(respGetReply(response))
    } else {
      yield put(respGetReply(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveReply({ payload: req }) {
  try {
    const response = yield call(saveReply, req)
    yield put(msgAddReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgAddReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditReply({ payload: req }) {
  try {
    const response = yield call(editReply, req)
    yield put(msgEditReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgEditReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDownloadfiles({ payload: req }) {
  try {
    yield call(downloadFiles, req)
  } catch (error) {
    yield put(msgDownload({ "status": 0, "message": "Error Download Data" }))
  }
}

function* fetchDeleteReply({ payload: req }) {
  try {
    const response = yield call(deleteReply, req)
    yield put(msgDeleteReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgDeleteReply({ "status": 0, "data": "Error Delete Data" }))
  }
}

function* fetchGetAttachment({ payload: req }) {
  try {
    const response = yield call(getAttachment, req)
    if (response.status == 1) {
      yield put(respGetAttachment(response))
    } else {
      yield put(respGetAttachment(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetAttachment({ "status": 0, "message": "Error Get Data" }))
  }
}


function* fetchGetLogs({ payload: req }) {
  try {
    const response = yield call(getLogsList, req)
    if (response.status == 1) {
      yield put(respGetLogs(response))
    } else {
      yield put(respGetLogs(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLogs({ "status": 0, "message": "Error Get Data" }))
  }
}


function* instructionsSaga() {

  yield takeEvery(GET_INSTRUCTIONS, fetchGetInstructions)
  yield takeEvery(GET_MANAGER, fetchGetManager)
  yield takeEvery(GET_OWNER, fetchGetOwner)
  yield takeEvery(GET_SELECTED_MANAGER, fetchGetSelectedManager)
  yield takeEvery(GET_STATUS, fetchGetStatus)
  yield takeEvery(GET_INSTRUCTIONS2, fetchGetInstructions2)
  yield takeEvery(SAVE_INSTRUCTIONS, fetchSaveInstructions)
  yield takeEvery(EDIT_INSTRUCTIONS, fetchEditInstructions)
  yield takeEvery(DELETE_INSTRUCTIONS, fetchDeleteInstructions)
  // yield takeEvery(GET_USER_LIST, fetchGetUserList)
  yield takeEvery(GET_DETAIL_INSTRUCTION, fetchGetDetailInstruction)
  yield takeEvery(SAVE_DESCRIPTION, fetchSaveDescriptions)
  yield takeEvery(GET_CHECK_DOWNLOAD, fetchGetCheckDownload)
  yield takeEvery(GET_REPLY, fetchGetReply)
  yield takeEvery(SAVE_REPLY, fetchSaveReply)
  yield takeEvery(DOWNLOAD_FILES, fetchDownloadfiles)
  yield takeEvery(DELETE_REPLY, fetchDeleteReply)
  yield takeEvery(GET_ATTACHMENT, fetchGetAttachment)
  yield takeEvery(EDIT_REPLY, fetchEditReply)
  yield takeEvery(GET_LOGS, fetchGetLogs)

}

export default instructionsSaga