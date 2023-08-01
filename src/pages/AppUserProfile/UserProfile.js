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

import { editUserProfile, resetMessage, msgEdit } from "../../store/appUserProfile/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import ChangePassword from "pages/Authentication/ChangePassword";
import MsgModal from "components/Common/MsgModal";


const UserProfile = () => {

  const dispatch = useDispatch();
  const [userProfilePage, setUserProfilePage] = useState(true)
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
  const [userProfilePassword, setUserProfilePassword] = useState(false)
  //const [id, setId] = useState("")
  const [userProfilePageData, setUserProfilePageData] = useState()

    const [generalMsgModal, setGeneralMsgModal] = useState(false)
    const [generalContentModal, setGeneralContentModal] = useState("")

const respMsg = useSelector(state => {
  return state.userProfileReducer.msgEdit;
});

    const toggleMsgModal = () => {
        setGeneralMsgModal(!generalMsgModal)
    }

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch])


  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
  }

  const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false);

  const u = JSON.parse(ReactSession.get("user") || null)

  const appUserProfilepValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: u != null ? u.name : '',
      pname: u != null ? u.pname : '',
      gname: u != null ? u.gname : '',
      hp: u != null ? u.hp : '',
      id: u != null ? u.id : '',

    },

    validationSchema: Yup.object().shape({

      hp: Yup.string()
        .required("Wajib diisi")

    }),

  });


  const updateHp = async () => {
    try {
debugger
        
        var map = {
            "hp":  appUserProfilepValidInput.values.hp
        };
        await dispatch(editUserProfile(map));
        if (respMsg != "Fail") {
            setGeneralContentModal("Update HP success")
        } else {
            setGeneralContentModal("Update Failed")
        }
        toggleMsgModal()

    } catch (error) {
        console.log(error)
    }
};


  useEffect(() => {
    if (respMsg.status == "1") {
      setUserProfilePage(true);
      const u = JSON.parse(ReactSession.get("user"))
      u.name = appUserProfilepValidInput.values.name
      u.pname = appUserProfilepValidInput.values.pname
      u.gname = appUserProfilepValidInput.values.gname
      u.hp = appUserProfilepValidInput.values.hp
      u.id = appUserProfilepValidInput.values.id
      ReactSession.get("user", JSON.stringify(u))
    }
    setAppUserProfileMsg(respMsg)
    setAppUserProfileSpinner(false);
  }, [respMsg])

  const ChangePassPage = () => {
    setUserProfilePage(false)
    setUserProfilePageData(userProfilePageData)
    setUserProfilePassword(true)
    setAppUserProfileMsg("")
    // setId(userProfilePageData.id)
    // console.log("wow",userProfilePageData )
  }

  return (
    <RootPageCustom msgStateGet={appUserProfileMsg} msgStateSet={setAppUserProfileMsg}
            componentJsx={
                <>
                        <MsgModal
                        modal={generalMsgModal}
                        toggle={toggleMsgModal}
                        message={generalContentModal}
                    />
      
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
                              name="pname"
                              type="text"
                              maxLength={50}
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
                              maxLength={50}
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
