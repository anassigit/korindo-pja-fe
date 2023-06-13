import { call, put, takeEvery} from "redux-saga/effects"

import { LOV_MENU_PARENT, LOV_USER, LOV_DIV, LOV_COMPANY, LOV_PLANT, LOV_MENU, LOV_POSITION, LOV_WILAYAH, LOV_PEKERJAAN, LOV_VENDOR, LOV_PETAK, LOV_POHON, LOV_PEKERJAANHEADER, LOV_QC, LOV_QC2, LOV_KRITERIA} from "./actionTypes"
import { msgLov } from "./actions"

import {getMenuParent, getUser, getDiv, getLovMenu, getLovCompany, getLovPlant, getLovPosition, getLovWilayah, getLovPekerjaan, getLovVendor, getLovPetak, getLovPohon, getLovKegiatanHeader, getLovQc, getLovQc2, getLovKriteria} from "helpers/backend_helper"


function* fetchGetMenuParent({ payload: req }) {
  try {
    const response = yield call(getMenuParent, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetUser({ payload: req }) {
  try {
    const response = yield call(getUser, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetDiv({ payload: req }) {
  try {
    const response = yield call(getDiv, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getLovMenu, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetCompany({ payload: req }) {
  try {
    const response = yield call(getLovCompany, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetPlant({ payload: req }) {
  try {
    const response = yield call(getLovPlant, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetPosition({ payload: req }) {
  try {
    const response = yield call(getLovPosition, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetWilayah({ payload: req }) {
  try {
    const response = yield call(getLovWilayah, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetPekerjaan({ payload: req }) {
  try {
    const response = yield call(getLovPekerjaan, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetVendor({ payload: req }) {
  try {
    const response = yield call(getLovVendor, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetPetak({ payload: req }) {
  try {
    const response = yield call(getLovPetak, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetPohon({ payload: req }) {
  try {
    const response = yield call(getLovPohon, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}


function* fetchGetPekerjaanHeader({ payload: req }) {
  try {
    const response = yield call(getLovKegiatanHeader, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetQC({ payload: req }) {
  try {
    const response = yield call(getLovQc, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetQC2({ payload: req }) {
  try {
    const response = yield call(getLovQc2, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetKriteria({ payload: req }) {
  try {
    const response = yield call(getLovKriteria, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* lovSaga() {
    
  yield takeEvery(LOV_MENU_PARENT, fetchGetMenuParent)
  yield takeEvery(LOV_USER, fetchGetUser)
  yield takeEvery(LOV_DIV, fetchGetDiv)
  yield takeEvery(LOV_MENU, fetchGetMenu)
  yield takeEvery(LOV_COMPANY, fetchGetCompany)
  yield takeEvery(LOV_PLANT, fetchGetPlant)
  yield takeEvery(LOV_POSITION, fetchGetPosition)
  yield takeEvery(LOV_WILAYAH, fetchGetWilayah)
  yield takeEvery(LOV_PEKERJAAN, fetchGetPekerjaan)
  yield takeEvery(LOV_VENDOR, fetchGetVendor)
  yield takeEvery(LOV_PETAK, fetchGetPetak)
  yield takeEvery(LOV_POHON, fetchGetPohon)
  yield takeEvery(LOV_PEKERJAANHEADER, fetchGetPekerjaanHeader)
  yield takeEvery(LOV_QC, fetchGetQC)
  yield takeEvery(LOV_QC2, fetchGetQC2)
  yield takeEvery(LOV_KRITERIA, fetchGetKriteria)
}

export default lovSaga
