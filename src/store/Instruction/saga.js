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
  GET_CHECK_DOWNLOAD,
  GET_SELECTED_REPLY,
  GET_GROUP_LIST_INST,
  GET_ALL_STATUS, // Added this import
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
  getSelectedReply,
  respGetSelectedReply,
  respGetGroupList,
  respGetAllStatus,
} from "./actions";

import {
  getInstructionsListBE,
  getManagerListBE,
  getOwnerListBE,
  getSelectedManagerBE,
  getInstructionsList2BE,
  saveInstructionBE,
  editInstructionBE,
  deleteInstructionBE,
  getDetailInstructionBE,
  saveDescriptionBE,
  saveReplyBE,
  downloadFileBE,
  deleteReplyBE,
  getReplyBE,
  getAttachmentBE,
  editReplyBE,
  getStatusListBE,
  getLogsListBE,
  checkFileDownloadBE,
  getGroupListInstructionsBE,
  getAllStatusBE, // Added this import
} from "helpers/backend_helper";

function* fetchGetInstructions({ payload: req }) {
  try {
    const response = yield call(getInstructionsListBE, req)
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

function* fetchGetGroupList({ payload: req }) {
  try {
    const response = yield call(getGroupListInstructionsBE, req)
    if (response.status == 1) {
      yield put(
        respGetGroupList(response))
    } else {
      yield put(respGetGroupList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetGroupList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetManager({ payload: req }) {
  try {
    const response = yield call(getManagerListBE, req)
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
    const response = yield call(getOwnerListBE, req)
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
    const response = yield call(getSelectedManagerBE, req)
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
    const response = yield call(getInstructionsList2BE, req)
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
    const response = yield call(saveInstructionBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditInstructions({ payload: req }) {
  try {
    const response = yield call(editInstructionBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteInstructions({ payload: req }) {
  try {
    const response = yield call(deleteInstructionBE, req)
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
    const response = yield call(getDetailInstructionBE, req)
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
    const response = yield call(saveDescriptionBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetAllStatus({ payload: req }) {
  try {
    const response = yield call(getAllStatusBE, req)
    if (response.status == 1) {
      yield put(respGetAllStatus(response))
    } else {
      yield put(respGetAllStatus(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetAllStatus({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetStatus({ payload: req }) {
  try {
    const response = yield call(getStatusListBE, req)
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
    const response = yield call(checkFileDownloadBE, req)
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
    const response = yield call(getReplyBE, req)
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

function* fetchGetSelectedReply({ payload: req }) {
  try {
    const response = yield call(getSelectedReply, req)
    if (response.status == 1) {
      yield put(respGetSelectedReply(response))
    } else {
      yield put(respGetSelectedReply(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSelectedReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveReply({ payload: req }) {
  try {
    const response = yield call(saveReplyBE, req)
    yield put(msgAddReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgAddReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditReply({ payload: req }) {
  try {
    const response = yield call(editReplyBE, req)
    yield put(msgEditReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgEditReply({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDownloadfiles({ payload: req }) {
  try {
    yield call(downloadFileBE, req)
  } catch (error) {
    yield put(msgDownload({ "status": 0, "message": "Error Download Data" }))
  }
}

function* fetchDeleteReply({ payload: req }) {
  try {
    const response = yield call(deleteReplyBE, req)
    yield put(msgDeleteReply(response))
  } catch (error) {
    console.log(error);
    yield put(msgDeleteReply({ "status": 0, "data": "Error Delete Data" }))
  }
}

function* fetchGetAttachment({ payload: req }) {
  try {
    const response = yield call(getAttachmentBE, req)
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
    const response = yield call(getLogsListBE, req)
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
  yield takeEvery(GET_GROUP_LIST_INST, fetchGetGroupList)
  yield takeEvery(GET_ALL_STATUS, fetchGetAllStatus)
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
  yield takeEvery(GET_SELECTED_REPLY, fetchGetSelectedReply)
  yield takeEvery(SAVE_REPLY, fetchSaveReply)
  yield takeEvery(DOWNLOAD_FILES, fetchDownloadfiles)
  yield takeEvery(DELETE_REPLY, fetchDeleteReply)
  yield takeEvery(GET_ATTACHMENT, fetchGetAttachment)
  yield takeEvery(EDIT_REPLY, fetchEditReply)
  yield takeEvery(GET_LOGS, fetchGetLogs)

}

export default instructionsSaga