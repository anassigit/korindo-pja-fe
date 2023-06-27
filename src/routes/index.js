import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ChangePassword from "../pages/Authentication/ChangePassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import Menu from "../pages/App002/Menu"
import Role from "../pages/App003/Role"
import RoleAkses from "../pages/App004/RoleAkses"
import User from "../pages/App008/User"
import Instructions from "../pages/AppInstructions/Instructions"
import UserProfile from "../pages/AppUserProfile/UserProfile"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/app002", component: Menu },
  { path: "/app003", component: Role },
  { path: "/app004", component: RoleAkses },
  { path: "/app008", component: User },
  { path: "/AppInstructions", component: Instructions },
  { path: "/AppUserProfile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/AppInstructions" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/changePassword", component: ChangePassword },
]

export { publicRoutes, authProtectedRoutes }
