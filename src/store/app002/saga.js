import { call, put, takeEvery, all} from "redux-saga/effects"

// Crypto Redux StatesgetMenuSuccess
import { GET_MENU, GET_MENU_ALL, EDIT_MENU, SAVE_MENU, DELETE_MENU } from "./actionTypes"
import { respGetMenus, msgEdit, msgAdd, msgDelete} from "./actions"

//Include Both Helper File with needed methods
import { getMenu, getMenuAll, editMenu, saveMenu, deleteMenu} from "helpers/backend_helper"

function* fetchGetMenu() {
  try {
    const response = yield call(getMenu)
    if(response.status == 1){
      yield put(respGetMenus(response))
    }else{
      yield put(respGetMenus(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenus({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetMenuAll({ payload: req }) {
  try {
    const response = yield call(getMenuAll, req)
    if(response.status == 1){
      yield put(respGetMenus(response))
    }else{
      yield put(respGetMenus(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenus({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchEditMenu({ payload: req }) {
  try {
    const response = yield call(editMenu, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Edit Data"}))
  }
}

function* fetchSaveMenu({ payload: req }) {
  try {
    const response = yield call(saveMenu, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({"status" : 0, "message" : "Error Save Data"}))
  }
}

function* fetchDeleteMenu({ payload: req }) {
  try {
    const response = yield call(deleteMenu, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({"status" : 0, "message" : "Error Delete Data"}))
  }
}

function* menuSaga() {
    
  yield takeEvery(GET_MENU, fetchGetMenu)
  yield takeEvery(GET_MENU_ALL, fetchGetMenuAll)
  yield takeEvery(EDIT_MENU, fetchEditMenu)
  yield takeEvery(SAVE_MENU, fetchSaveMenu)
  yield takeEvery(DELETE_MENU, fetchDeleteMenu)

}

export default menuSaga
