import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Form, Input, FormFeedback, Spinner, UncontrolledAlert } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { ReactSession } from 'react-client-session'
import { emailForgotPassword } from "../../store/Profile/actions"
import { useHistory } from "react-router-dom"
import { withTranslation } from "react-i18next"

const FindPassword = props => {

    const dispatch = useDispatch()
    let history = useHistory()

    const [emailPasswordSpinner, setEmailPasswordSpinner] = useState(false)
    const [appUserProfileMsg, setAppUserProfileMsg] = useState("")

    const errorMsg = useSelector(state => {
        return state.userProfileReducer.msgEmailForgotPassword
    })

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: ''
        },
        validationSchema: Yup.object({
            id: Yup.string().required(props.t("Please enter your ID"))
        }),
        onSubmit: (values) => {
            setEmailPasswordSpinner(true)
            ReactSession.set('emailMsg', '')
            dispatch(emailForgotPassword(values))
        }
    })

    useEffect(() => {
        let sessionMsg = ReactSession.get('emailMsg')
        if (errorMsg.status == "1" && sessionMsg !== 'goLogin') {
            ReactSession.set('emailMsg', errorMsg)
            history.push('/login')
        }
        setAppUserProfileMsg(errorMsg)
        setEmailPasswordSpinner(false)
    }, [errorMsg])

    const appUserProfileCloseAllert = () => {
        setAppUserProfileMsg("")
        ReactSession.set('emailMsg', '')
    }

    return (
        <React.Fragment>
            <MetaTags>
                <title>DMLS</title>
            </MetaTags>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="fas fa-home h2" />
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className=" text-white">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="text-primary p-4">
                                                <h2 className="text-primary text-left" >{props.t("Please enter your ID")}</h2>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    {appUserProfileMsg.status == "0" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
                                        {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}

                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                validation.handleSubmit()
                                                return false
                                            }}
                                        >
                                            <div className="mb-3">
                                                <Input
                                                    name="id"
                                                    className="form-control"
                                                    placeholder={props.t("Please enter your ID")}
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

                                            <div className="mt-2 d-grid">
                                                <button
                                                    className="btn btn-success btn-block"
                                                    type="submit"
                                                >
                                                    {props.t("Send by email")}
                                                </button>
                                            </div>
                                            <div className="mt-2 d-grid">
                                                <button
                                                    className="btn btn-light btn-block"
                                                    type="button"
                                                    onClick={() => {

                                                        ReactSession.set('emailMsg', 'goLogin')
                                                        history.push({
                                                            pathname: '/login',
                                                        })
                                                    }
                                                    }
                                                >
                                                    {props.t("Back")}
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                                <div className="mt-3 text-center">
                                    <p>
                                        {props.t("AddressKorindo")} {new Date().getFullYear()}.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <div className="spinner-wrapper" style={{ display: emailPasswordSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

FindPassword.propTypes = {
    history: PropTypes.object,
    t: PropTypes.any
}

export default withRouter(withTranslation()(FindPassword))