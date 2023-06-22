import PropTypes from 'prop-types';
import React, { useState } from "react";

import { connect, useSelector, useDispatch } from "react-redux";

// Reactstrap
import { Form, Label, Input, Alert, FormFeedback } from "reactstrap";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";


// actions
import { reloginUser } from "../../store/actions";

//i18n
import { withTranslation } from "react-i18next";

import { useFormik } from "formik";

import * as Yup from "yup";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";




const Header = props => {
  const dispatch = useDispatch();
  // const [search, setsearch] = useState(false);
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      nik: "20202567" || '',
      password: "" || '',
    },
    validationSchema: Yup.object({
      nik: Yup.string().required("Input NIK anda"),
      password: Yup.string().required("Input Password"),
    }),
    onSubmit: (values) => {
      dispatch(reloginUser(values, props.history));
    }
  });

  const error = useSelector(state => {
    return (typeof state.Login !== "undefined" && typeof state.Login.error !== "undefined" ? state.Login.error : "");
  });

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(reloginUser(values, props.history));
  };



  return (
    <React.Fragment>
      <header id="page-topbar">
        <div style={{ borderBottom: "2px solid #D9D1D1" }} className="navbar-header">
          <div className="d-flex">

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fas fa-bars" style={{ color: "#7BAE40" }} />
            </button>

            {/* <form id="reloginForm" className="form-horizontal" style={{display: "none", marginTop: '300px', marginLeft: '500px'}}> */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }} id="reloginForm" className="form-horizontal modal" style={{ backgroundColor: 'rgb(159 159 159)', border: '2px solid rgb(85 110 230)', margin: 'auto', padding: '20px', marginLeft: '0%', width: '100%', height: '100%' }}>
              <div style={{ backgroundColor: '#fefefe', border: '2px solid rgb(0 0 0 / 22%)', margin: 'auto', padding: '50px', width: '450px', height: '480px' }}>
                <div className="modal-header">
                  <h5 className="modal-title mt-0">
                    Re - Login
                  </h5>
                </div>
                <div className="modal-body">
                  {error ? <Alert color="danger">{error}</Alert> : null}
                  <div className="mb-3">
                    <Label className="form-label">Nik</Label>
                    <Input
                      name="nik"
                      className="form-control"
                      placeholder="Enter Nik"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.nik || ""}
                      invalid={
                        validation.touched.nik && validation.errors.nik ? true : false
                      }
                    />
                    {validation.touched.nik && validation.errors.nik ? (
                      <FormFeedback type="invalid">{validation.errors.nik}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label className="form-label">Password</Label>
                    <Input
                      name="password"
                      value={validation.values.password || ""}
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password && validation.errors.password ? true : false
                      }
                    />
                    {validation.touched.password && validation.errors.password ? (
                      <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                    ) : null}
                  </div>
                  <br />
                  <div className="mt-3 d-grid">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </Form>


          </div>
          <div className="d-flex">
            {/* <form style={{boxShadow: '1px 1px 2px #fffefe'}} className="p-3">
                        <div className="form-group m-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search ..."
                            />
                            <div className="input-group-append">
                              <button className="btn btn-dark" type="submit">
                                <i className="mdi mdi-magnify" />
                              </button>
                            </div>
                          </div>
                        </div>
              </form> */}

            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <LanguageDropdown /> */}

            {/* <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <i className="bx bx-customize" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="px-lg-2">
                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown> */}

            <select className="selectpicker" data-width="fit">
              <option data-content='<span class="flag-icon flag-icon-us"></span> English'>English</option>
              <option data-content='<span class="flag-icon flag-icon-mx"></span> Español'>Español</option>
            </select>

            <div className="dropdown d-none d-lg-inline-block ms-2">
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="btn header-item noti-icon "
                data-toggle="reload"
              >
                <i className="bx bx-sync" style={{ color: "#7BAE40" }} />
              </button>
            </div>


            {/* <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div> */}

            {/* <NotificationDropdown /> */}
            <ProfileMenu />


          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  history: PropTypes.object,
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
