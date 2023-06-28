import React, { useState, useEffect, useCallback } from "react"
import MetaTags from 'react-meta-tags';
import Breadcrumbs from "../../components/Common/Breadcrumb";
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

import { editUserProfile, resetMessage } from "../../store/appUserProfile/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import ChangePassword from "pages/Authentication/ChangePassword";



const UserProfile = () => {

  const dispatch = useDispatch();
  const [userProfilePage, setUserProfilePage] = useState(true)
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
  const [userProfilePassword, setUserProfilePassword] = useState(false)
  //const [id, setId] = useState("")
  const [userProfilePageData, setUserProfilePageData] = useState()

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch])


  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
  }

  const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false);

  const u = JSON.parse(localStorage.getItem("user") || null)

  const appUserProfilepValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: u != null ? u.data[0].name : '',
      pName: u != null ? u.data[0].pName : '',
      gName: u != null ? u.data[0].gName : '',
      hp: u != null ? u.data[0].hp : '',
      id: u != null ? u.data[0].id : '',

    },

    validationSchema: Yup.object().shape({


      hp: Yup.string()
        .required("Wajib diisi")


    }),

    onSubmit: (values) => {
      setAppUserProfileMsg("")
      setAppUserProfileSpinner(true);
      dispatch(editUserProfile(values));
    }
  });

  const appUserProfileMessage = useSelector(state => {
    return state.userProfileReducer.msgEdit;
  });


  useEffect(() => {
    if (appUserProfileMessage.status == "1") {
      setUserProfilePage(true);
      const u = JSON.parse(localStorage.getItem("user"))
      u.name = appUserProfilepValidInput.values.name
      u.pName = appUserProfilepValidInput.values.pName
      u.gName = appUserProfilepValidInput.values.gName
      u.hp = appUserProfilepValidInput.values.hp
      u.id = appUserProfilepValidInput.values.id
      localStorage.getItem("user", JSON.stringify(u))
    }
    setAppUserProfileMsg(appUserProfileMessage)
    setAppUserProfileSpinner(false);
  }, [appUserProfileMessage])

  const ChangePassPage = () => {
    setUserProfilePage(false)
    setUserProfilePageData(userProfilePageData)
    setUserProfilePassword(true)
    setAppUserProfileMsg("")
    // setId(userProfilePageData.id)
    // console.log("wow",userProfilePageData )
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Korindo App</title>
        </MetaTags>

        {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
          {typeof appUserProfileMsg == 'string' ? appUserProfileMsg : appUserProfileMsg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null}

        <Container style={{ display: userProfilePage ? 'block' : 'none' }} fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Ubah User" /> */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Change profile</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app007p01ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">
                      <Row>
                        <Col md="5">
                          <div className="mb-3 col-sm-10">
                            <Label>Name</Label>
                            <Input
                              name="name"
                              type="text"
                              disabled
                              maxLength={50}
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
                            <Label>Position</Label>
                            <Input
                              name="pName"
                              type="text"
                              maxLength={50}
                              disabled
                              onChange={appUserProfilepValidInput.handleChange}
                              value={appUserProfilepValidInput.values.pName || ""}
                              invalid={
                                appUserProfilepValidInput.touched.pName && appUserProfilepValidInput.errors.pName ? true : false
                              }
                            />
                            {appUserProfilepValidInput.touched.pName && appUserProfilepValidInput.errors.pName ? (
                              <FormFeedback type="invalid">{appUserProfilepValidInput.errors.pName}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-10">
                            <Label>Group</Label>
                            <Input
                              name="gName"
                              type="text"
                              maxLength={50}
                              disabled
                              onChange={appUserProfilepValidInput.handleChange}
                              value={appUserProfilepValidInput.values.gName || ""}
                              invalid={
                                appUserProfilepValidInput.touched.gName && appUserProfilepValidInput.errors.gName ? true : false
                              }
                            />
                            {appUserProfilepValidInput.touched.gName && appUserProfilepValidInput.errors.gName ? (
                              <FormFeedback type="invalid">{appUserProfilepValidInput.errors.gName}</FormFeedback>
                            ) : null}
                          </div>

                        </Col>


                        <Col md="5">

                          <div className="mb-3 col-sm-8">
                            <Label>HP<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="hp"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilepValidInput.handleChange}
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
                            <Label>ID</Label>
                            <Input
                              name="id"
                              type="text"
                              maxLength={50}
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
                            <Label>Password</Label>
                            <Button onClick={() => { ChangePassPage() }} className="ms-5" style={{ background: "#7BAE40" }}>
                              Change Password
                            </Button>
                          </div>
                          <span style={{ fontStyle: "italic" }}> * Please click button Change Password for change the password.</span>
                        </Col>
                      </Row>
                      <Button type="submit" color="primary" className="ms-1">
                        SAVE
                      </Button>
                      <Spinner style={{ display: appUserProfileSpinner ? "block" : "none", marginTop: '-35px' }} className="ms-4" color="danger" />
                      </FormGroup>
                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <ChangePassword
          userProfilePassword={userProfilePassword}
          setUserProfilePassword={setUserProfilePassword}
          setUserProfilePage={setUserProfilePage}
          setAppUserProfileMsg={setAppUserProfileMsg}
        />
      </div>
    </React.Fragment>
  );
};
export default UserProfile
