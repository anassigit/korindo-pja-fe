import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react"
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";
import logoKorindo from "../../assets/images/Korindo.png";
import logoKorindo2 from "../../assets/images/logotitle.png";
import { ReactSession } from 'react-client-session';

const Sidebar = props => {

  let menuData = localStorage.getItem("menu")

  if (!menuData) {
    window.location.reload()
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div style={{ borderRight: "2px solid #D9D1D1" }} className="navbar-brand-box">
          <a href="/AppInstructions" className="logo logo-dark" onClick={() => {
            ReactSession.remove("appInstructionsTabelSearch")
            ReactSession.remove('selected')
            ReactSession.remove('selected2')
            ReactSession.remove('dateFrom')
            ReactSession.remove('dateTo')
            ReactSession.remove('searchValue')
            ReactSession.remove("submenuKey")
            ReactSession.remove('selectedArray')
            window.location.reload()
          }}>
            <span className="logo-sm">
              <img src={logoKorindo2} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoKorindo} alt="" height="30" />
            </span>
          </a>

          <a href="/AppInstructions" className="logo logo-light" onClick={() => {
            ReactSession.remove("appInstructionsTabelSearch")
            ReactSession.remove('selected')
            ReactSession.remove('selected2')
            ReactSession.remove('dateFrom')
            ReactSession.remove('dateTo')
            ReactSession.remove('searchValue')
            ReactSession.remove("submenuKey")
            ReactSession.remove('selectedArray')
            window.location.reload()
          }}>
            <span className="logo-sm">
              <img src={logoKorindo2} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoKorindo} alt="" height="30" />
            </span>
          </a>


        </div>

        <div style={{ borderRight: "2px solid #D9D1D1" }} data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>

    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
