import { call, put, takeEvery} from "redux-saga/effects"

// Crypto Redux States
import { GET_MENU } from "./actionTypes"
import { getMenuSuccess, getMenuFail } from "./actions"

//Include Both Helper File with needed methods
import { getMenu} from "helpers/backend_helper"

function* fetchGetMenu() {
  try {
    //console.log("Melakukan CALL MENU RESP");
    const response = yield call(getMenu)
    //console.log(response);
    if(response.status == 1){
      //console.log("DATA : "+JSON.stringify(response.data))
      yield put(getMenuSuccess(response))
    }else{
      yield put(getMenuFail(response))
    }
  } catch (error) {
    console.log(error);
    yield put(getMenuFail("Error Get Menu Data"))
  }
}


function* getMenuSaga() {
    
  yield takeEvery(GET_MENU, fetchGetMenu)

}


export default getMenuSaga
