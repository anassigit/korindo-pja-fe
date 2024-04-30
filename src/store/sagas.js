import { all, fork } from "redux-saga/effects"

//public
import fileManagementSaga from "./FileManagement/saga"
import instructionsSaga from "./Instruction/saga"
import kpiSaga from "./KPI/saga"
import movingPlanSaga from "./MovingPlan/saga"
import ruleSaga from "./Rule/saga"
import settingSaga from "./Setting/saga"
import userProfileSaga from "./Profile/saga"
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
