import React, { useState, useEffect, useCallback } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import { useFormik, } from "formik";
import * as Yup from "yup";
import '../../config';
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
  UncontrolledAlert,
} from "reactstrap"

import { editUserProfile, resetMessage, msgEdit, getProfile } from "../../store/appUserProfile/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import ChangePassword from "./ChangePassword";
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"


const UserProfile = (props) => {

  let langType = localStorage.getItem("I18N_LANGUAGE")
  let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [userProfilePage, setUserProfilePage] = useState(true)
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
  const [userProfilePassword, setUserProfilePassword] = useState(false)
  const [userProfilePageData, setUserProfilePageData] = useState()
  //const [ t ] = withTranslation();

  const [changePasswordMsg, setChangePasswordMsg] = useState("")

  useEffect(() => {
    dispatch(resetMessage());
  }, [])

  const getDetailProfile = useSelector(state => {
    return state.userProfileReducer.respGetProfile;
  })

  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
  }

  const appChangePassCloseAllert = () => {
    setChangePasswordMsg("")
  }

  const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false);

  useEffect(() => {
    if (userId == getDetailProfile?.data?.member?.id || getDetailProfile !== null) {
      appUserProfilepValidInput.setFieldValue("name", getDetailProfile?.data?.member?.name)
      appUserProfilepValidInput.setFieldValue("pname", getDetailProfile?.data?.member?.pname)
      appUserProfilepValidInput.setFieldValue("gname", getDetailProfile?.data?.member?.gname)
      appUserProfilepValidInput.setFieldValue("hp", getDetailProfile?.data?.member?.hp)
      appUserProfilepValidInput.setFieldValue("id", getDetailProfile?.data?.member?.id)
      appUserProfilepValidInput.setFieldValue("email", getDetailProfile?.data?.member?.email)
    }
  }, [getDetailProfile])

  useEffect(() => {
    dispatch(getProfile({
      "search": {
        "langType": langType
      }
    }))
  }, [])

  useEffect(() => {
    dispatch(getProfile({
      "search": {
        "langType": langType
      }
    }))
  }, [props.t, langType])


  //const u = JSON.parse(ReactSession.get("user") || null)

  const appUserProfilepValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {

      name: '',
      pname: '',
      gname: '',
      hp: '',
      id: '',
      email: '',

    },

    validationSchema: Yup.object().shape({
      hp: Yup.string()
        .matches(/^(08[0-9]{8,10})$/, props.t('Invalid mobile phone number'))
        .required(props.t('Please enter a mobile phone number')),
    }),

    onSubmit : (values) => {
      updateHp()
    }

  });


  const updateHp = async () => {
    try {

      var map = {
        "hp": appUserProfilepValidInput.values.hp
      };
      await dispatch(editUserProfile(map));
      setAppUserProfileMsg("")
      setAppUserProfileSpinner(true)
    } catch (message) {
      console.log(message)
    }
  };

  const respMsg = useSelector(state => {
    return state.userProfileReducer.msgEdit;
  });


  useEffect(() => {
    if (respMsg.status == "1") {
      setUserProfilePage(true);
    }
    setAppUserProfileMsg(respMsg)
    setAppUserProfileSpinner(false);
    setAppUserProfileMsg
  }, [respMsg])

  useEffect(() => {
    if (appUserProfileMsg == "1") {
      console.log(appUserProfileMsg)
    }
  }, [appUserProfileMsg])

  const ChangePassPage = () => {
    setAppUserProfileMsg("")
    setUserProfilePageData(userProfilePageData)
    setUserProfilePage(false)
    setUserProfilePassword(true)
  }

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  return (
    <RootPageCustom
      componentJsx={
        <>

          {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
            {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: userProfilePage ? 'block' : 'none' }} fluid="true">
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader><i className="mdi mdi-account fs-5 align-middle me-2"></i>{props.t("Change profile")}</CardHeader>
                  <CardBody>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        appUserProfilepValidInput.handleSubmit();
                        return false;
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
                              <Button onClick={() => { ChangePassPage() }} className="ms-5" style={{ background: "#7BAE40" }}>
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
            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
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

  );
};

UserProfile.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}

export default withTranslation()(UserProfile)
