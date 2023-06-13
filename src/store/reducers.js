import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import ComboReducer from "./combo/reducer"
import LovReducer from "./lov/reducer"
import Login from "./auth/login/reducer"
import GetData from "./donwloaddata/reducer"
import ReportJasper from "./jasper/reducer"
import MenuReduce from "./app002/reducer"
import RoleReducer from "./app003/reducer"
import RoleAksesReducer from "./app004/reducer"


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  GetData,
  MenuReduce,
  LovReducer,
  RoleReducer,
  RoleAksesReducer,
  ComboReducer,
  ReportJasper,
})

export default rootReducer
