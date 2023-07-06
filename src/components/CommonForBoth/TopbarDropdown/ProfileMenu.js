import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/circle-user.png"
import { ReactSession } from 'react-client-session';

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    if (ReactSession.get("user")) {
        const u = JSON.parse(ReactSession.get("user"))
        setusername(u.name)
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          // style={{borderLeft : "2px solid rgb(243 103 4)"}}
          tag="button"
        >
          <img
            height={25}
            width={25}
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username} TEST </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/AppUserProfile" className="dropdown-item">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
            <span>{props.t("Profile")}</span>
          </Link>
          <div className="dropdown-divider"/>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withTranslation()(ProfileMenu)
// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// )
