import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages


// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Sso from "pages/AppSso/Sso"


const authProtectedRoutes = [
  { path: "/", component: Sso },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/" /> },
]

const publicRoutes = [

]

export { publicRoutes, authProtectedRoutes }
