import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Input,
  FormFeedback,
  Form,
  Spinner,
  FormGroup,
  CardHeader,
  NavLink,
  PaginationLink,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import { updateUserPassword, editUserProfile } from "../../store/appUserProfile/actions"



const ChangePassword = (props) => {

  const dispatch = useDispatch();
  const [changePasswordSpinner, setChangePasswordSpinner] = useState(false);
  const [id, setId] = useState("")
  const [changePasswordMsg, setChangePasswordMsg] = useState("")

  useEffect(() => {
    if (props.userProfilePassword) {

      userProfilePasswordValidation.resetForm()
      const u = JSON.parse(localStorage.getItem("user"))
      u.id = userProfilePasswordValidation.values.id
      localStorage.getItem("user", JSON.stringify(u))
   
    }
  }, [props.userProfilePassword])

  const u = JSON.parse(localStorage.getItem("user") || null)

  const userProfilePasswordValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: u != null ? u.id : '',
      currentPassword: '',
      newPassword: '',
      Password: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter Your Current Password"),
      currentPassword: Yup.string().required("Please Enter Your Current Password"),
      newpassword: Yup.string().required("Please Enter Your New Password"),
      newPassword: Yup.string().required("Please Re-Enter Your New Password"),
    }),

    onSubmit: (values) => {
      setChangePasswordSpinner(true);
      props.setAppUserProfileMsg("")
      dispatch(updateUserPassword(values));
    }
  });

  // const changePasswordMsg = useSelector(state => ({
  //   error: state.userProfileReducer.msgAdd,
  // }));

  

  const updatePass = async () => {
    try {
      // debugger
        var map = {
            "currentPassword":  userProfilePasswordValidation.values.currentPassword,
            "newPassword": userProfilePasswordValidation.values.newPassword
        };
        // console.log('map : ', map)
        // debugger
        await dispatch(updateUserPassword(map));
        props.setAppUserProfileMsg("")
    } catch (error) {
        console.log(error)
    }
};

useEffect(() => {
  if (changePasswordMsg.status == "1") {
    props.setUserProfilePage(true);
    props.setUserProfilePassword(false);
  }
  props.setAppUserProfileMsg(changePasswordMsg)
  setChangePasswordSpinner(false);
}, [changePasswordMsg])

  return (
    <Container style={{ display: props.userProfilePassword ? 'block' : 'none' }} fluid={true} >
      {/* <Breadcrumbs title="Forms" breadcrumbItem="Master Jarak Tanam" pageNow={props.setApp052p02Page} pageBefore={props.setApp052p01Page} message={props.setApp052setMsg}/> */}

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Change Password</CardHeader>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  userProfilePasswordValidation.handleSubmit();
                  return false;
                }}>

                <FormGroup className="mb-0">
                <div className="mb-3 col-sm-3">
                    
                    <Input
                      name="id"
                      type="text"
                      hidden
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.id || ""}
                      invalid={
                        userProfilePasswordValidation.touched.id && userProfilePasswordValidation.errors.id ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.id && userProfilePasswordValidation.errors.id ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.id}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3 col-sm-3">

                    <Input
                      name="currentPassword"
                      type="password"
                      placeholder="Enter Current Password"
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.currentPassword || ""}
                      invalid={
                        userProfilePasswordValidation.touched.currentPassword && userProfilePasswordValidation.errors.currentPassword ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.currentPassword && userProfilePasswordValidation.errors.currentPassword ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.currentPassword}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3 col-sm-3">
                    
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Enter New Password"
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.newPassword || ""}
                      invalid={
                        userProfilePasswordValidation.touched.newPassword && userProfilePasswordValidation.errors.newPassword ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.newPassword && userProfilePasswordValidation.errors.newPassword ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.newPassword}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3 col-sm-3">
                    
                    <Input
                      name="Password"
                      type="password"
                      placeholder="Confirm New Password"
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.Password || ""}
                      invalid={
                        userProfilePasswordValidation.touched.Password && userProfilePasswordValidation.errors.Password ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.Password && userProfilePasswordValidation.errors.Password ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.Password}</FormFeedback>
                    ) : null}
                  </div>

                  <Button  color="primary" className="ms-1" onClick={() => { updatePass() }}>
                   
                    Simpan
                    <Spinner style={{ display: changePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  <Button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => { props.setUserProfilePage(true); props.setUserProfilePassword(false); props.setAppUserProfileMsg("") }}
                  >
                   
                    Kembali
                  </Button>
                </FormGroup>

              </Form>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

ChangePassword.propTypes = {
  userProfilePassword: PropTypes.any,
  setUserProfilePassword: PropTypes.any,
  setUserProfilePage: PropTypes.any,
  setAppUserProfileMsg: PropTypes.any,
};

export default ChangePassword

