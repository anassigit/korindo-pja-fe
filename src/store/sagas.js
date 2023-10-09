import { all, fork } from "redux-saga/effects"

//public
import LayoutSaga from "./layout/saga"
import LovSaga from "./lov/saga"
import ReportJasperSaga from "./jasper/saga"
import ComboSaga from "./combo/saga"
import ssoSaga from "./sso/saga"
// import langSaga from "./language/saga"

export default function* rootSaga() {
  yield all([
    fork(LayoutSaga),
    fork(ssoSaga),
    // fork(LovSaga),
    // fork(ComboSaga),
    // fork(ReportJasperSaga),
    // fork(langSaga),
  ])
}
