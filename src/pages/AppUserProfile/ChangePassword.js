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
  UncontrolledAlert,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import { updateUserPassword, editUserProfile } from "../../store/appUserProfile/actions"
import { useHistory } from "react-router-dom";
import RootPageCustom from '../../common/RootPageCustom';


const ChangePassword = (props) => {

  const dispatch = useDispatch();
  const [changePasswordSpinner, setChangePasswordSpinner] = useState(false);
  const [changePasswordMsg, setChangePasswordMsg] = useState("")
  const history = useHistory();

  const appChangePassCloseAllert = () => {
    setChangePasswordMsg("")
  }

  const u = JSON.parse(ReactSession.get("user") || null)

  const userProfilePasswordValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      currentPassword: '',
      Password1: '',
      Password2: '',
    },

    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Please Enter Your Current Password"),
      Password1: Yup.string().required("Please Enter Your New Password"),
      Password2: Yup.string().required("Please Re-Enter Your New Password"),
    }),


    onSubmit: (val) => {
      if (val.Password1 !== val.Password2) {
        userProfilePasswordValidation.setFieldError('Password1', 'Passwords do not match');
        userProfilePasswordValidation.setFieldError('Password2', 'Passwords do not match');
      } else {
        dispatch(updateUserPassword(val));
      }

    }


  });

  const updatePass = async () => {
    debugger
    if (userProfilePasswordValidation.values.currentPassword !== "" || null) {
      try {
        debugger

        var map = {
          "currentPassword": userProfilePasswordValidation.values.currentPassword,
          "newPassword": userProfilePasswordValidation.values.Password2
        };
        await dispatch(updateUserPassword(map));

      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    if (changePasswordMsg.status == "1") {
      //props.setUserProfilePage(true);
      props.setUserProfilePassword(true);
    }
    setChangePasswordMsg(changePasswordMsg)
    setChangePasswordSpinner(false);
  }, [changePasswordMsg])

  return (
    <>
      {changePasswordMsg !== "" ? <UncontrolledAlert toggle={appChangePassCloseAllert} color={changePasswordMsg.status == "1" ? "success" : "danger"}>
        {typeof changePasswordMsg == 'string' ? null : changePasswordMsg}</UncontrolledAlert> : null}

      <Container style={{ display: props.userProfilePassword ? 'block' : 'none' }} fluid={true} >

        <Row>
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
                      name="currentPassword"
                      type="password"
                      placeholder="Enter Current Password"
                      maxLength={50}
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
                      name="Password1"
                      type="password"
                      placeholder="Enter New Password"
                      maxLength={50}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.Password1 || ""}
                      invalid={
                        userProfilePasswordValidation.touched.Password1 && userProfilePasswordValidation.errors.Password1 ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.Password2 && userProfilePasswordValidation.errors.Password2 ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.Password2}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3 col-sm-3">

                    <Input
                      name="Password2"
                      type="password"
                      placeholder="Confirm New Password"
                      maxLength={50}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.Password2 || ""}
                      invalid={
                        userProfilePasswordValidation.touched.Password2 && userProfilePasswordValidation.errors.Password2 ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.Password2 && userProfilePasswordValidation.errors.Password2 ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.Password2}</FormFeedback>
                    ) : null}
                  </div>

                  <Button type="submit" color="primary" className="ms-1">

                    Save
                    <Spinner style={{ display: changePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  {/* <Button  color="primary" className="ms-1" onClick={() => { updatePass() }}>
                   
                    Simpan
                    <Spinner style={{ display: changePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp; */}

                  <Button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => { props.setUserProfilePage(true); props.setUserProfilePassword(false); props.setAppUserProfileMsg("") }}
                  >

                    Back
                  </Button>
                </FormGroup>

              </Form>

            </CardBody>
          </Card>

        </Row>
      </Container>
    </>
  );
};

ChangePassword.propTypes = {
  userProfilePassword: PropTypes.any,
  setUserProfilePassword: PropTypes.any,
  setUserProfilePage: PropTypes.any,
  setAppUserProfileMsg: PropTypes.any,
};

export default ChangePassword

