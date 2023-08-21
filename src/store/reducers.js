import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import ComboReducer from "./combo/reducer"
import LovReducer from "./lov/reducer"
import Login from "./auth/login/reducer"
import ReportJasper from "./jasper/reducer"
import MenuReduce from "./app002/reducer"
import RoleReducer from "./app003/reducer"
import RoleAksesReducer from "./app004/reducer"
import MUserReducer from "./app008/reducer"
import instructionsReducer from "./appInstructions/reducer"
import userProfileReducer from "./appUserProfile/reducer"
import settingReducer from "./appSetting/reducer"
import fileManagementReducer from "./appFileManagement/reducer"
// import langReducer from "./language/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  MenuReduce,
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
  // langReducer,
})

export default rootReducer
