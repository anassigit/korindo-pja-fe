import React from "react"
import { Redirect } from "react-router-dom"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import EmailVerPassword from "../pages/Authentication/EmailVerPassword"
import UpdatePassword from "../pages/Authentication/UpdatePassword"
import Instructions from "../pages/Instruction/Instructions"
import UserProfile from "../pages/Profile/UserProfile"
import ChangePassword from "../pages/Profile/ChangePassword"
import GeneralSetting from "pages/Setting/GeneralSetting"
import EditInstruction from "pages/Instruction/EditInstruction"
import DataInquiry from "pages/FileManagement/DataInquiry"
import FirstLogin from "pages/Authentication/FirstLogin"
import EnterMonthlyData from "pages/FileManagement/EnterMonthlyData"
import Rule from "pages/Rule/Rule"
import KPIDashboard from "pages/KPI/KPIDashboard"
import KPIDashboardDetail from "pages/KPI/KPIDashboardDetail"
import MovingPlanDashboard from "pages/MovingPlan/MovingPlanDashboard"
import KPIInputResult from "pages/KPI/KPIInputResult"
import MemberSetting from "pages/Setting/MemberSetting"
import OrganizationSetting from "pages/Setting/OrganizationSetting"
import MenuSetting from "pages/Setting/MenuSetting"
import RoleSetting from "pages/Setting/RoleSetting"
import LanguageSetting from "pages/Setting/LanguageSetting"
import KPISetting from "pages/KPI/KPISetting"
import KPICategorySetting from "pages/Setting/KPICategorySetting"
import KPIUnitSetting from "pages/Setting/KPIUnitSetting"
import KPIItemSetting from "pages/Setting/KPIItemSetting"
import MovingPlanInputResult from "pages/MovingPlan/MovingPlanInputResult"

const authProtectedRoutes = [
    { path: "/AppInstructions", component: Instructions },
    { path: "/AppEditInstruction", component: EditInstruction },
    { path: "/AppGeneralSetting", component: GeneralSetting },
    { path: "/AppMemberSetting", component: MemberSetting },
    { path: "/AppOrganizationSetting", component: OrganizationSetting },
    { path: "/AppMenuSetting", component: MenuSetting },
    { path: "/AppUserProfile", component: UserProfile },
    { path: "/changePassword", component: ChangePassword },
    { path: "/AppFileManagement", component: DataInquiry },
    { path: "/FirstLogin", component: FirstLogin },
    { path: "/EnterMonthlyData", component: EnterMonthlyData },
    { path: "/AppRule", component: Rule },
    { path: "/AppKPISetting", component: KPISetting },
    { path: "/AppKPIDashboard", component: KPIDashboard },
    { path: "/AppKPIDashboardDetail", component: KPIDashboardDetail },
    { path: "/AppKPIInputResult", component: KPIInputResult },
    { path: "/AppMovingPlanDashboard", component: MovingPlanDashboard },
    { path: "/AppMovingPlanInputResult", component: MovingPlanInputResult },
    { path: "/AppRoleSetting", component: RoleSetting },
    { path: "/AppLanguageSetting", component: LanguageSetting },
    { path: "/AppKPICategorySetting", component: KPICategorySetting },
    { path: "/AppKPIUnitSetting", component: KPIUnitSetting },
    { path: "/AppKPIItemSetting", component: KPIItemSetting },
    { path: "/", exact: true, component: () => <Redirect to="/AppInstructions" /> }
]

const publicRoutes = [
    { path: "/logout", component: Logout },
    { path: "/login", component: Login },
    { path: "/emailPassword", component: EmailVerPassword },
    { path: "/updatePassword", component: UpdatePassword }
]

export { publicRoutes, authProtectedRoutes }