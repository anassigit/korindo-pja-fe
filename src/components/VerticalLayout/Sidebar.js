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

const Sidebar = props => {
  return (
    <React.Fragment>
      <div  className="vertical-menu">
        <div style={{borderRight: "2px solid #D9D1D1"}} className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoKorindo2} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoKorindo} alt="" height="30" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoKorindo2} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoKorindo} alt="" height="30" />
            </span>
          </Link>

          
        </div>
        
        <div style={{borderRight: "2px solid #D9D1D1"}} data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent/> : <SidebarContent/>}
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
