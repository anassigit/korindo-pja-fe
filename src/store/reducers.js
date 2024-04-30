import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import fileManagementReducer from "./FileManagement/reducer"
import instructionsReducer from "./Instruction/reducer"
import kpiReducer from "./KPI/reducer"
import movingPlanReducer from "./MovingPlan/reducer"
import ruleReducer from "./Rule/reducer"
import settingReducer from "./Setting/reducer"
import userProfileReducer from "./Profile/reducer"
import Login from "./auth/login/reducer"
import ComboReducer from "./combo/reducer"
import ReportJasper from "./jasper/reducer"
import LovReducer from "./lov/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  LovReducer,
  ComboReducer,
  ReportJasper,
  instructionsReducer,
  userProfileReducer,
  settingReducer,
  fileManagementReducer,
  ruleReducer,
  kpiReducer,
  movingPlanReducer
})

export default rootReducer
