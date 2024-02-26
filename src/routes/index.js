import React from "react"
import { Redirect } from "react-router-dom"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import EmailVerPassword from "../pages/Authentication/EmailVerPassword"
import UpdatePassword from "../pages/Authentication/UpdatePassword"
import Dashboard from "../pages/Dashboard/index"
import Instructions from "../pages/AppInstructions/Instructions"
import UserProfile from "../pages/AppUserProfile/UserProfile"
import ChangePassword from "../pages/AppUserProfile/ChangePassword"
import GeneralSetting from "pages/AppSetting/GeneralSetting"
import EditInstructions from "pages/AppInstructions/EditInstructions"
import FileManagement from "pages/AppFileManagement/FileManagement"
import FirstLogin from "pages/Authentication/FirstLogin"
import EnterMonthlyData from "pages/AppFileManagement/EnterMonthlyData"
import Rule from "pages/AppRule/Rule"
import KPIDashboard from "pages/AppKPI/KPIDashboard"
import KPIDashboardDetail from "pages/AppKPI/KPIDashboardDetail"
import KPIMasterSetting from "pages/AppKPI/KPIMasterSetting"
import MovingPlan from "pages/AppMovingPlan/MovingPlan"
import KPIInputResult from "pages/AppKPI/KPIInputResult"
import KPIPlanSetting from "pages/AppKPI/KPIPlanSetting"
import MemberSetting from "pages/AppSetting/MemberSetting"
import OrganizationSetting from "pages/AppSetting/OrganizationSetting"
import MenuSetting from "pages/AppSetting/MenuSetting"
import RoleSetting from "pages/AppSetting/RoleSetting"

const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/AppInstructions", component: Instructions },
    { path: "/AppEditInstruction", component: EditInstructions },
    { path: "/AppGeneralSetting", component: GeneralSetting },
    { path: "/AppMemberSetting", component: MemberSetting },
    { path: "/AppOrganizationSetting", component: OrganizationSetting },
    { path: "/AppMenuSetting", component: MenuSetting },
    { path: "/AppUserProfile", component: UserProfile },
    { path: "/changePassword", component: ChangePassword },
    { path: "/AppFileManagement", component: FileManagement },
    { path: "/FirstLogin", component: FirstLogin },
    { path: "/EnterMonthlyData", component: EnterMonthlyData },
    { path: "/AppRule", component: Rule },
    { path: "/AppKPIPlanSetting", component: KPIPlanSetting },
    { path: "/AppKPIMasterSetting", component: KPIMasterSetting },
    { path: "/AppKPIDashboard", component: KPIDashboard },
    { path: "/AppKPIDashboardDetail", component: KPIDashboardDetail },
    { path: "/AppKPIInputResult", component: KPIInputResult },
    { path: "/AppMovingPlan", component: MovingPlan },
    { path: "/AppRoleSetting", component: RoleSetting },
    { path: "/", exact: true, component: () => <Redirect to="/AppInstructions" /> }
]

const publicRoutes = [
    { path: "/logout", component: Logout },
    { path: "/login", component: Login },
    { path: "/emailPassword", component: EmailVerPassword },
    { path: "/updatePassword", component: UpdatePassword }
]

export { publicRoutes, authProtectedRoutes }