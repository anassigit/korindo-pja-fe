import { call, put, takeEvery} from "redux-saga/effects"

import { GET_REPORT } from "./actionTypes"
import { getReportJasperResponse } from "./actions"

import { getReportJasper, getDataPdf} from "helpers/backend_helper"

function* fetchGetReportJasper({ payload: req }) {
  try {
    const response = yield call(getReportJasper,req)
    //console.log('fetchGetReportJasper : ', req);
    if(response.status == 1){
      //yield put(getReportJasperResponse(response))
      yield call(getDataPdf, {
        "file_name" : response.data.reportname,
        "file_location" : response.data.reportpath
      })
    }else{
      yield put(getReportJasperResponse(response))
    }
  } catch (error) {
    console.log(error);
    yield put(getReportJasperResponse("Error Get Report Jasper Data"))
  }
}


function* getReportJasperSaga() {
    
  yield takeEvery(GET_REPORT, fetchGetReportJasper)

}

export default getReportJasperSaga
