import { call, put, takeEvery, all} from "redux-saga/effects"

// Crypto Redux StatesgetMenuSuccess
import { GET_ROLE, EDIT_ROLE, SAVE_ROLE, DELETE_ROLE,GET_ROLE_MENU,SAVE_ROLE_MENU,DELETE_ROLE_MENU,GET_ROLE_USER,SAVE_ROLE_USER,DELETE_ROLE_USER } from "./actionTypes"
import { respGetrole, msgEdit, msgAdd,msgDelete,respGetRoleMenu,respGetRoleUser } from "./actions"

//Include Both Helper File with needed methods
import { getRole, editRole, saveRole,deleteRole, getRoleMenu,saveRoleMenu,deleteRoleMenu,getRoleUser,saveRoleUser,deleteRoleUser} from "helpers/backend_helper"

// role
function* fetchGetRole({ payload: req }) {
  try {
    const response = yield call(getRole, req)
    if(response.status == 1){
      yield put(respGetrole(response))
    }else{
      yield put(respGetrole(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetrole({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchEditRole({ payload: req }) {
  try {
    const response = yield call(editRole, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveRole({ payload: req }) {
  try {
    const response = yield call(saveRole, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchDeleteRole({ payload: req }) {
  try {
    const response = yield call(deleteRole, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "data" : "Error Delete Data"}))
  }
}

// role-menu
function* fetchGetRoleMenu({ payload: req }) {
  try {
    //console.log(req);
    const response = yield call(getRoleMenu, req)
    if(response.status == 1){
      yield put(respGetRoleMenu(response))
    }else{
      yield put(respGetRoleMenu(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoleMenu({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveRoleMenu({ payload: req }) {
  try {
    const response = yield call(saveRoleMenu, req)
    yield put(msgAdd(response))
  } catch (error) {
    yield put(msgAdd({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteRoleMenu({ payload: req }) {
  try {
    const response = yield call(deleteRoleMenu, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

// role-user
function* fetchGetRoleUser({ payload: req }) {
  try {
    //console.log(req);
    const response = yield call(getRoleUser, req)
    if(response.status == 1){
      yield put(respGetRoleUser(response))
    }else{
      yield put(respGetRoleUser(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoleUser({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchSaveRoleUser({ payload: req }) {
  try {
    const response = yield call(saveRoleUser, req)
    yield put(msgAdd(response))
  } catch (error) {
    yield put(msgAdd({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteRoleUser({ payload: req }) {
  try {
    const response = yield call(deleteRoleUser, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

function* roleSaga() {
    
  yield takeEvery(GET_ROLE, fetchGetRole)
  yield takeEvery(EDIT_ROLE, fetchEditRole)
  yield takeEvery(SAVE_ROLE, fetchSaveRole)
  yield takeEvery(DELETE_ROLE, fetchDeleteRole)
  yield takeEvery(GET_ROLE_MENU, fetchGetRoleMenu)
  yield takeEvery(SAVE_ROLE_MENU, fetchSaveRoleMenu)
  yield takeEvery(DELETE_ROLE_MENU, fetchDeleteRoleMenu)
  yield takeEvery(GET_ROLE_USER, fetchGetRoleUser)
  yield takeEvery(SAVE_ROLE_USER, fetchSaveRoleUser)
  yield takeEvery(DELETE_ROLE_USER, fetchDeleteRoleUser)
}

export default roleSaga
