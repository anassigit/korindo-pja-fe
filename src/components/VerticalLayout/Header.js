import PropTypes from 'prop-types'
import React from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { Form, Label, Input, Alert, FormFeedback } from "reactstrap"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import { reloginUser } from "../../store/actions"
import { withTranslation } from "react-i18next"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
} from "../../store/actions"
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"

const Header = props => {
    const dispatch = useDispatch()

    function tToggle() {
        var body = document.body
        if (window.screen.width <= 998) {
            body.classList.toggle("sidebar-enable")
        } else {
            body.classList.toggle("vertical-collpsed")
            body.classList.toggle("sidebar-enable")
        }
    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "" || '',
            pw: "" || '',
        },
        validationSchema: Yup.object({
            id: Yup.string().required("아이디를 입력해주세요"),
            pw: Yup.string().required("비밀번호를 입력해주세요"),
        }),
        onSubmit: (values) => {
            dispatch(reloginUser(values, props.history))
        }
    })

    const error = useSelector(state => {
        return (typeof state.Login !== "undefined" && typeof state.Login.error !== "undefined" ? state.Login.error : "")
    })

    return (
        <React.Fragment>
            <header id="page-topbar">
                <div style={{ borderBottom: "2px solid #D9D1D1" }} className="navbar-header">
                    <div className="d-flex">
                        <button
                            type="button"
                            onClick={() => {
                                tToggle()
                            }}
                            className="btn btn-sm px-3 font-size-16 header-item "
                            id="vertical-menu-btn"
                        >
                            <i className="fas fa-bars" style={{ color: "#7BAE40" }} />
                        </button>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault()
                                validation.handleSubmit()
                                return false
                            }} id="reloginForm" className="form-horizontal modal" style={{ backgroundColor: 'rgb(159 159 159)', border: '2px solid rgb(85 110 230)', margin: 'auto', padding: '20px', marginLeft: '0%', width: '100%', height: '100%' }}>
                            <div style={{ backgroundColor: '#fefefe', border: '2px solid rgb(0 0 0 / 22%)', margin: 'auto', padding: '50px', width: '450px', height: '480px' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">
                                        재로그인
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    {error ? <Alert color="danger">{error}</Alert> : null}
                                    <div className="mb-3">
                                        <Label className="form-label">아이디</Label>
                                        <Input
                                            name="id"
                                            className="form-control"
                                            placeholder="아이디를 입력해주세요"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.id || ""}
                                            invalid={
                                                validation.touched.id && validation.errors.id ? true : false
                                            }
                                        />
                                        {validation.touched.id && validation.errors.id ? (
                                            <FormFeedback type="invalid">{validation.errors.id}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <Label className="form-label">비밀번호</Label>
                                        <Input
                                            name="pw"
                                            value={validation.values.pw || ""}
                                            type="password"
                                            placeholder="비밀번호를 입력해주세요"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.pw && validation.errors.pw ? true : false
                                            }
                                        />
                                        {validation.touched.pw && validation.errors.pw ? (
                                            <FormFeedback type="invalid">{validation.errors.pw}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <br />
                                    <div className="mt-3 d-grid">
                                        <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                        >
                                            로그인하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="d-flex">
                        <LanguageDropdown />
                        <ProfileMenu />
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

Header.propTypes = {
    changeSidebarType: PropTypes.func,
    leftMenu: PropTypes.any,
    leftSideBarType: PropTypes.any,
    showRightSidebar: PropTypes.any,
    showRightSidebarAction: PropTypes.func,
    t: PropTypes.any,
    toggleLeftmenu: PropTypes.func,
    history: PropTypes.object,
}

const mapStatetoProps = state => {
    const {
        layoutType,
        showRightSidebar,
        leftMenu,
        leftSideBarType,
    } = state.Layout
    return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
})(withTranslation()(Header))