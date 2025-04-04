import PropTypes from 'prop-types'
import React from "react"
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import { authProtectedRoutes, publicRoutes } from "./routes"
import Authmiddleware from "./routes/route"
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import "./assets/scss/theme.scss"
import { ReactSession } from 'react-client-session'

const App = () => {

    ReactSession.setStoreType("sessionStorage")

    return (
        <React.Fragment>
            <Router>
                <Switch>
                    {publicRoutes.map((route, idx) => (
                        <Authmiddleware
                            path={route.path}
                            layout={NonAuthLayout}
                            component={route.component}
                            key={idx}
                            isAuthProtected={false}
                            exact
                        />
                    ))}
                    {authProtectedRoutes.map((route, idx) => (
                        <Authmiddleware
                            path={route.path}
                            layout={VerticalLayout}
                            component={route.component}
                            key={idx}
                            isAuthProtected={true}
                            exact
                        />
                    ))}
                </Switch>
            </Router>
        </React.Fragment>
    )
}

App.propTypes = {
    layout: PropTypes.any
}

const mapStateToProps = state => {
    return {
        layout: state.Layout,
    }
}

export default connect(mapStateToProps, null)(App)