import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container, Form, Input, FormFeedback, UncontrolledAlert } from "reactstrap"
import { ReactSession } from 'react-client-session'
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { loginUser, resetMessage } from "../../store/actions"
import { withTranslation } from "react-i18next"

const Login = props => {

    const dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const { error } = useSelector(state => ({
        error: state.Login.error,
    }))

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: '',
            pw: '',
            langType: 'KOR',
        },
        validationSchema: Yup.object({
            id: Yup.string().required(props.t("Please enter your ID")),
            pw: Yup.string().required(props.t("Please enter your Password")),
        }),
        onSubmit: values => {
            dispatch(loginUser(values, props.history))
            setErrorMsg('')
        }
    })

    useEffect(() => {
        let emailMsg = ReactSession.get("emailMsg")
        if (emailMsg) {
            setErrorMsg(emailMsg)
        }
        let isAuth = localStorage.getItem("authUser")
        if (isAuth) {
            props.history.push('/')
        }
        ReactSession.set('emailMsg', '')
    }, [])

    useEffect(() => {
        setErrorMsg('')
        if (error) {
            ReactSession.set("emailMsg", '')
            setErrorMsg(error)
        }
    }, [error, errorMsg])

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
                                <div className="bg-success text-white">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="text-primary p-4">
                                                <h2 className="text-primary text-center text-white" >DMLS</h2>
                                                <h5 className="text-primary text-center text-white" >(Digital Meeting Log System)</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                validation.handleSubmit()
                                                return false
                                            }}
                                        >
                                            {errorMsg !== '' ? (
                                                <UncontrolledAlert
                                                    toggle={() => {
                                                        ReactSession.set("emailMsg", '')
                                                        setErrorMsg('')
                                                    }}
                                                    color={errorMsg.status === '1' ? "success" : "danger"}
                                                >
                                                    {errorMsg?.message ? errorMsg?.message : errorMsg}
                                                </UncontrolledAlert>
                                            ) : null}

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

                                            <div className="mb-3">
                                                <Input
                                                    name="pw"
                                                    value={validation.values.pw || ""}
                                                    type="password"
                                                    placeholder={props.t("Please enter your Password")}
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

                                            <div className="mt-2 d-grid">
                                                <button
                                                    className="btn btn-success btn-block"
                                                    type="submit"
                                                >
                                                    {props.t("Submit")}
                                                </button>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    ReactSession.set('emailMsg', 'goLogin')
                                                    setErrorMsg('')
                                                }}
                                                className="mt-4 text-center">
                                                <Link to="/emailPassword" className="text-muted">
                                                    <i
                                                        className="mdi mdi-lock me-1"
                                                    />
                                                    {props.t("Find Password")}
                                                </Link>
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
                </Container>
            </div>
        </React.Fragment>
    )
}

Login.propTypes = {
    history: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(withRouter(Login))