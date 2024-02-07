import { call, put, takeEvery, all } from "redux-saga/effects"

import { GET_MEMBERS, SAVE_MEMBERS, EDIT_MEMBERS, DELETE_MEMBERS, EDIT_GENERAL_SETTING, GET_SETTING, GET_RANK_LIST, GET_PERMISSION_LIST, GET_GROUP_LIST, GET_RELATION_LIST, SAVE_GROUP_MAPPING, EDIT_GROUP_MAPPING, DELETE_GROUP_MAPPING, GET_MEMBERS_MAPPING, GET_MEMBERS2, GET_LIST_MENU, GET_MENU2, SAVE_MENU, EDIT_MENU, DELETE_MENU } from "./actionTypes"

import { msgAdd, msgEdit, msgDelete, respGetSetting, respGetMembers, respGetRankList, respGetPermissionList, respGetGroupList, respGetRelationList, respGetMembersMapping, respGetMembers2, respGetMenuList, respGetMenu2 } from "./actions"

import { deleteGroupMapping, deleteMembers, getGroupList, getMembers, getMembersForMapping, getPermissionList, getRankList, getRelationList, getGeneralSetting, saveGroupMapping, saveMembers, updateGeneralSetting, updateGroupMapping, updateMembers, getMaintainMenuListBE, getMaintainMenuBE, saveMenuBE, editMenuBE, deleteMenuBE } from "helpers/backend_helper"

function* fetchGetGeneralSetting({ payload: req }) {
  try {
    const response = yield call(getGeneralSetting, req)
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

//MENU

function* fetchGetMenuList({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuListBE, req)
    if (response.status == 1) {
      yield put(respGetMenuList(response))
    } else {
      yield put(respGetMenuList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenuList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuBE, req)
    if (response.status == 1) {
      yield put(respGetMenu2(response))
    } else {
      yield put(respGetMenu2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddMenu({ payload: req }) {
  try {
    const response = yield call(saveMenuBE, req)
    if (response.status == 1) {
      yield put(msgAdd(response))
    } else {
      yield put(msgAdd(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* fetchEditMenu({ payload: req }) {
  try {
    const response = yield call(editMenuBE, req)
    if (response.status == 1) {
      yield put(msgEdit(response))
    } else {
      yield put(msgEdit(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
  }
}

function* fetchDeleteMenu({ payload: req }) {
  try {
    const response = yield call(deleteMenuBE, req)
    if (response.status == 1) {
      yield put(msgDelete(response))
    } else {
      yield put(msgDelete(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
  }
}

function* settingSaga() {
  yield takeEvery(GET_SETTING, fetchGetGeneralSetting)
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
  yield takeEvery(GET_LIST_MENU, fetchGetMenuList)
  yield takeEvery(GET_MENU2, fetchGetMenu)
  yield takeEvery(SAVE_MENU, fetchAddMenu)
  yield takeEvery(EDIT_MENU, fetchEditMenu)
  yield takeEvery(DELETE_MENU, fetchDeleteMenu)
}

export default settingSaga