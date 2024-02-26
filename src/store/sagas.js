import { all, fork } from "redux-saga/effects"

//public
import fileManagementSaga from "./appFileManagement/saga"
import instructionsSaga from "./appInstructions/saga"
import kpiSaga from "./appKPI/saga"
import movingPlanSaga from "./appMovingPlan/saga"
import ruleSaga from "./appRule/saga"
import settingSaga from "./appSetting/saga"
import userProfileSaga from "./appUserProfile/saga"
import AuthSaga from "./auth/login/saga"
import ComboSaga from "./combo/saga"
import ReportJasperSaga from "./jasper/saga"
import LayoutSaga from "./layout/saga"
import LovSaga from "./lov/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(LovSaga),
    fork(ComboSaga),
    fork(ReportJasperSaga),
    fork(instructionsSaga),
    fork(userProfileSaga),
    fork(settingSaga),
    fork(fileManagementSaga),
    fork(ruleSaga),
    fork(kpiSaga),
    fork(movingPlanSaga)
  ])
}
