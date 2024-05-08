import React, { useState, useEffect } from "react"
import RootPageCustom from '../../common/RootPageCustom'
import { useFormik, } from "formik"
import * as Yup from "yup"
import '../../config'
import {
    Row,
    Col,
    Card,
    CardBody,
    Container,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
    Spinner,
    FormGroup,
    CardHeader,
    UncontrolledAlert
} from "reactstrap"

import { editUserProfile, resetMessage } from "../../store/Profile/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session'
import ChangePassword from "./ChangePassword"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

const UserProfile = (props) => {

    let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : ""
    const dispatch = useDispatch()

    const [userProfilePage, setUserProfilePage] = useState(true)
    const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
    const [userProfilePassword, setUserProfilePassword] = useState(false)
    const [userProfilePageData, setUserProfilePageData] = useState()
    const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [])

    const getProfileData = useSelector(state => {
        return state.userProfileReducer.respGetProfile
    })

    const editMsg = useSelector(state => {
        return state.userProfileReducer.msgEdit
    })

    useEffect(() => {
        if (userId == getProfileData?.data?.member?.id || getProfileData !== null) {
            appUserProfilepValidInput.setFieldValue("name", getProfileData?.data?.member?.name)
            appUserProfilepValidInput.setFieldValue("pname", getProfileData?.data?.member?.pname)
            appUserProfilepValidInput.setFieldValue("gname", getProfileData?.data?.member?.gname)
            appUserProfilepValidInput.setFieldValue("hp", getProfileData?.data?.member?.hp)
            appUserProfilepValidInput.setFieldValue("id", getProfileData?.data?.member?.id)
            appUserProfilepValidInput.setFieldValue("email", getProfileData?.data?.member?.email)
        }
    }, [getProfileData])

    const appUserProfilepValidInput = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            pname: '',
            gname: '',
            hp: '',
            id: '',
            email: ''
        },
        validationSchema: Yup.object().shape({
            hp: Yup.string()
                .matches(/^(08[0-9]{8,10})$/, props.t('Invalid mobile phone number'))
                .required(props.t('Please enter a mobile phone number')),
        }),
        onSubmit: () => {
            dispatch(editUserProfile({
                hp: appUserProfilepValidInput.values.hp
            }))
            setAppUserProfileMsg("")
            setAppUserProfileSpinner(true)
        }
    })

    useEffect(() => {
        if (editMsg.status == "1") {
            setUserProfilePage(true)
        }
        setAppUserProfileMsg(editMsg)
        setAppUserProfileSpinner(false)
        setAppUserProfileMsg
    }, [editMsg])

    const changePassPage = () => {
        setAppUserProfileMsg("")
        setUserProfilePageData(userProfilePageData)
        setUserProfilePage(false)
        setUserProfilePassword(true)
    }

    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode
        if (keyCode < 48 || keyCode > 57) event.preventDefault()
    }

    return (
        <RootPageCustom
            componentJsx={
                <>
                    {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={setAppUserProfileMsg("")} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
                        {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}
                    <Container style={{ display: userProfilePage ? 'block' : 'none' }} fluid="true">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="mdi mdi-account fs-5 align-middle me-2"></i>{props.t("Change profile")}</CardHeader>
                                    <CardBody>
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                appUserProfilepValidInput.handleSubmit()
                                                return false
                                            }}>
                                            <FormGroup className="mb-0">
                                                <Row>
                                                    <Col md="5">
                                                        <div className="mb-3 col-sm-10">
                                                            <Label>{props.t("Name")}</Label>
                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                disabled
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                value={appUserProfilepValidInput.values.name || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.name && appUserProfilepValidInput.errors.name ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.name && appUserProfilepValidInput.errors.name ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.name}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-10">
                                                            <Label>{props.t("Position")}</Label>
                                                            <Input
                                                                name="pname"
                                                                type="text"
                                                                disabled
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                value={appUserProfilepValidInput.values.pname || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.pname && appUserProfilepValidInput.errors.pname ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.pname && appUserProfilepValidInput.errors.pname ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.pname}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-10">
                                                            <Label>{props.t("Group")}</Label>
                                                            <Input
                                                                name="gname"
                                                                type="text"
                                                                disabled
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                value={appUserProfilepValidInput.values.gname || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.gname && appUserProfilepValidInput.errors.gname ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.gname && appUserProfilepValidInput.errors.gname ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.gname}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col md="5">
                                                        <div className="mb-3 col-sm-8">
                                                            <Label>{props.t("HP")}<span style={{ color: "red" }}>* </span></Label>
                                                            <Input
                                                                name="hp"
                                                                type="text"
                                                                maxLength={12}
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                onKeyPress={handleKeyPress}
                                                                value={appUserProfilepValidInput.values.hp || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.hp && appUserProfilepValidInput.errors.hp ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.hp && appUserProfilepValidInput.errors.hp ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.hp}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-8">
                                                            <Label>{props.t("ID")}</Label>
                                                            <Input
                                                                name="id"
                                                                type="text"
                                                                disabled
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                value={appUserProfilepValidInput.values.id || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.id && appUserProfilepValidInput.errors.id ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.id && appUserProfilepValidInput.errors.id ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.id}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-8">
                                                            <Label>{props.t("Email")}</Label>
                                                            <Input
                                                                name="email"
                                                                type="email"
                                                                disabled
                                                                onChange={appUserProfilepValidInput.handleChange}
                                                                value={appUserProfilepValidInput.values.email || ""}
                                                                invalid={
                                                                    appUserProfilepValidInput.touched.email && appUserProfilepValidInput.errors.email ? true : false
                                                                }
                                                            />
                                                            {appUserProfilepValidInput.touched.email && appUserProfilepValidInput.errors.email ? (
                                                                <FormFeedback type="invalid">{appUserProfilepValidInput.errors.email}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-8">
                                                            <Label>{props.t("Password")}</Label>
                                                            <Button onClick={() => { changePassPage() }} className="ms-5" style={{ background: "#7BAE40" }}>
                                                                <i className="mdi mdi-lock fs-6 align-middle" />{" "}{props.t("Change Password")}
                                                            </Button>
                                                        </div>
                                                        <span style={{ fontStyle: "italic" }}> {props.t("Please click button 'Change Password' for change the password")}</span>
                                                    </Col>
                                                </Row>
                                                <Button type="submit" color="primary" className="ms-1">
                                                    <i className="mdi mdi-check fs-5 align-middle" />{" "}{props.t("Save")}
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <div className="spinner-wrapper" style={{ display: appUserProfileSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                    <ChangePassword
                        userProfilePassword={userProfilePassword}
                        setUserProfilePassword={setUserProfilePassword}
                        setUserProfilePage={setUserProfilePage}
                        setAppUserProfileMsg={setAppUserProfileMsg}
                    />
                </>
            }
        />
    )
}

UserProfile.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(UserProfile)