import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import LovReducer from "./lov/reducer"

import ssoReducer from "./sso/reducer"

const rootReducer = combineReducers({
  Layout,
  LovReducer,
  ssoReducer,
  // langReducer,
})

export default rootReducer
