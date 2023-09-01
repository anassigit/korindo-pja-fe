import { call, put, takeEvery, all } from "redux-saga/effects"

import { GET_MEMBERS, SAVE_MEMBERS, EDIT_MEMBERS, DELETE_MEMBERS, EDIT_GENERAL_SETTING, GET_SETTING, GET_RANK_LIST, GET_PERMISSION_LIST, GET_GROUP_LIST, GET_RELATION_LIST, SAVE_GROUP_MAPPING, EDIT_GROUP_MAPPING, DELETE_GROUP_MAPPING, GET_MEMBERS_MAPPING, GET_MEMBERS2 } from "./actionTypes"

import { msgAdd, msgEdit, msgDelete, respGetSetting, respGetMembers, respGetRankList, respGetPermissionList, respGetGroupList, respGetRelationList, respGetMembersMapping, respGetMembers2 } from "./actions"

import { deleteGroupMapping, deleteMembers, getGroupList, getMembers, getMembersForMapping, getPermissionList, getRankList, getRelationList, getSetting, saveGroupMapping, saveMembers, updateGeneralSetting, updateGroupMapping, updateMembers } from "helpers/backend_helper"

function* fetchGetAllSetting({ payload: req }) {
  try {
    const response = yield call(getSetting, req)
    if (response.status == 1) {
      yield put(respGetSetting(response))
    } else {
      yield put(respGetSetting(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSetting({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveMembers({ payload: req }) {
  try {
    const response = yield call(saveMembers, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditMembers({ payload: req }) {
  try {
    const response = yield call(updateMembers, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteMembers({ payload: req }) {
  try {
    const response = yield call(deleteMembers, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
  }
}

/* GENERAL SETTING */

function* fetchEditGeneralSetting({ payload: req }) {
  try {
    const response = yield call(updateGeneralSetting, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

/* MEMBERS */

function* fetchGetAllMembers({ payload: req }) {
  try {
    const response = yield call(getMembers, req)
    if (response.status == 1) {
      yield put(respGetMembers(response))
    } else {
      yield put(respGetMembers(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMembers({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetAllMembers2({ payload: req }) {
  try {
    const response = yield call(getMembers, req)
    if (response.status == 1) {
      yield put(respGetMembers2(response))
    } else {
      yield put(respGetMembers2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMembers2({ "status": 0, "message": "Error Get Data" }))
  }
}

/* RANK LIST */

function* fetchGetAllRankList({ payload: req }) {
  try {
    const response = yield call(getRankList, req)
    if (response.status == 1) {
      yield put(respGetRankList(response))
    } else {
      yield put(respGetRankList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRankList({ "status": 0, "message": "Error Get Data" }))
  }
}

/* PERMISSION LIST */

function* fetchGetAllPermissionList({ payload: req }) {
  try {
    const response = yield call(getPermissionList, req)
    if (response.status == 1) {
      yield put(respGetPermissionList(response))
    } else {
      yield put(respGetPermissionList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetPermissionList({ "status": 0, "message": "Error Get Data" }))
  }
}

/* PERMISSION LIST */

function* fetchGetAllGroupList({ payload: req }) {
  try {
    const response = yield call(getGroupList, req)
    if (response.status == 1) {
      yield put(respGetGroupList(response))
    } else {
      yield put(respGetGroupList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetGroupList({ "status": 0, "message": "Error Get Data" }))
  }
}

/* RELATION LIST */

function* fetchGetAllRelationList({ payload: req }) {
  try {
    const response = yield call(getRelationList, req)
    if (response.status == 1) {
      yield put(respGetRelationList(response))
    } else {
      yield put(respGetRelationList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRelationList({ "status": 0, "message": "Error Get Data" }))
  }
}

/* GROUP MAPPING */

function* fetchSaveGroupMapping({ payload: req }) {
  try {
    const response = yield call(saveGroupMapping, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditGroupMapping({ payload: req }) {
  try {
    const response = yield call(updateGroupMapping, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteGroupMapping({ payload: req }) {
  try {
    const response = yield call(deleteGroupMapping, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
  }
}


function* fetchGetAllMembersMapping({ payload: req }) {
  try {
    const response = yield call(getMembersForMapping, req)
    if (response.status == 1) {
      yield put(respGetMembersMapping(response))
    } else {
      yield put(respGetMembersMapping(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMembersMapping({ "status": 0, "message": "Error Get Data" }))
  }
}


function* settingSaga() {

  yield takeEvery(GET_SETTING, fetchGetAllSetting)
  yield takeEvery(SAVE_MEMBERS, fetchSaveMembers)
  yield takeEvery(EDIT_MEMBERS, fetchEditMembers)
  yield takeEvery(DELETE_MEMBERS, fetchDeleteMembers)
  yield takeEvery(EDIT_GENERAL_SETTING, fetchEditGeneralSetting)
  
  yield takeEvery(GET_MEMBERS, fetchGetAllMembers)
  yield takeEvery(GET_MEMBERS2, fetchGetAllMembers2)
  yield takeEvery(GET_RANK_LIST, fetchGetAllRankList)
  yield takeEvery(GET_PERMISSION_LIST, fetchGetAllPermissionList)
  
  yield takeEvery(GET_GROUP_LIST, fetchGetAllGroupList)
  
  yield takeEvery(GET_RELATION_LIST, fetchGetAllRelationList)
  yield takeEvery(SAVE_GROUP_MAPPING, fetchSaveGroupMapping)
  yield takeEvery(EDIT_GROUP_MAPPING, fetchEditGroupMapping)
  yield takeEvery(DELETE_GROUP_MAPPING, fetchDeleteGroupMapping)
  yield takeEvery(GET_MEMBERS_MAPPING, fetchGetAllMembersMapping)

}

export default settingSaga