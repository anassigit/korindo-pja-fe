import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { ReactSession } from 'react-client-session';

const currentURL = window.location.href;

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        debugger
        if (!currentURL.endsWith('/login')) {
          if (!localStorage.getItem("I18N_LANGUAGE")) {
          localStorage.setItem("I18N_LANGUAGE", "kor")
          }
          localStorage.setItem("currentURL", currentURL)
        }
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
