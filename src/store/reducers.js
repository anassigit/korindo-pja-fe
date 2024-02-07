import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import RoleReducer from "./app003/reducer"
import RoleAksesReducer from "./app004/reducer"
import MUserReducer from "./app008/reducer"
import fileManagementReducer from "./appFileManagement/reducer"
import instructionsReducer from "./appInstructions/reducer"
import kpiReducer from "./appKPI/reducer"
import movingPlanReducer from "./appMovingPlan/reducer"
import ruleReducer from "./appRule/reducer"
import settingReducer from "./appSetting/reducer"
import userProfileReducer from "./appUserProfile/reducer"
import Login from "./auth/login/reducer"
import ComboReducer from "./combo/reducer"
import ReportJasper from "./jasper/reducer"
import LovReducer from "./lov/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  LovReducer,
  RoleReducer,
  RoleAksesReducer,
  ComboReducer,
  ReportJasper,
  MUserReducer,
  instructionsReducer,
  userProfileReducer,
  settingReducer,
  fileManagementReducer,
  ruleReducer,
  kpiReducer,
  movingPlanReducer
})

export default rootReducer
