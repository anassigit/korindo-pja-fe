import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import MenuSaga from "./app002/saga"
import LayoutSaga from "./layout/saga"
import LovSaga from "./lov/saga"
import ReportJasperSaga from "./jasper/saga"
import ComboSaga from "./combo/saga"
import RoleSaga from "./app003/saga"
import RoleAksesSaga from "./app004/saga"
import instructionsSaga from "./appInstructions/saga"
import userProfileSaga from "./appUserProfile/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(MenuSaga),
    fork(LayoutSaga),
    fork(LovSaga),
    fork(RoleSaga),
    fork(RoleAksesSaga),
    fork(ComboSaga),
    fork(ReportJasperSaga),
    fork(instructionsSaga),
    fork(userProfileSaga),
  ])
}
