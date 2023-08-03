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


const UserProfile = () => {

  let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [userProfilePage, setUserProfilePage] = useState(true)
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
  const [userProfilePassword, setUserProfilePassword] = useState(false)
  const [userProfilePageData, setUserProfilePageData] = useState()



  useEffect(() => {
    dispatch(resetMessage());
  }, [])

  const getDetailProfile = useSelector(state => {
    return state.userProfileReducer.respGetProfile;
  })

  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
  }

  const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false);

  useEffect(() => {
    if (userId == getDetailProfile?.data?.member?.id || getDetailProfile !== null) {
      appUserProfilepValidInput.setFieldValue("name", getDetailProfile?.data?.member?.name)
      appUserProfilepValidInput.setFieldValue("pname", getDetailProfile?.data?.member?.pname)
      appUserProfilepValidInput.setFieldValue("gname", getDetailProfile?.data?.member?.gname)
      appUserProfilepValidInput.setFieldValue("hp", getDetailProfile?.data?.member?.hp)
      appUserProfilepValidInput.setFieldValue("id", getDetailProfile?.data?.member?.id)
    }
}, [getDetailProfile])

useEffect(() => {
  dispatch(getProfile({
    "search": {
      "langType": "eng"
    }
  }))
}, [])


  //const u = JSON.parse(ReactSession.get("user") || null)

  const appUserProfilepValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {

      name: '',
      pname: '',
      gname: '',
      hp: '',
      id: '',

    },

    validationSchema: Yup.object().shape({

      hp: Yup.string().required("Please enter mobile phone number.")

    }),

  });


  const updateHp = async () => {
    try {
    debugger   
        var map = {
            "hp":  appUserProfilepValidInput.values.hp
        };
        await dispatch(editUserProfile(map));

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
  }, [respMsg])

  const ChangePassPage = () => {
    setAppUserProfileMsg("")
    setUserProfilePageData(userProfilePageData)
    setUserProfilePage(false)
    setUserProfilePassword(true)  
  }

  return (
    <RootPageCustom
            componentJsx={
                <>
                       
          {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
          {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}
      
          <Container style={{ display: userProfilePage ? 'block' : 'none' }} fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Change profile</CardHeader>
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
                            <Label>Name</Label>
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
                            <Label>Position</Label>
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
                            <Label>Group</Label>
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
                            <Label>HP<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="hp"
                              type="number"
                              maxLength={12}
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
                      <Button color="primary" className="ms-1" onClick={(e) => { updateHp() }}>
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
        </>
      }
/>
 
  );
};
export default UserProfile
