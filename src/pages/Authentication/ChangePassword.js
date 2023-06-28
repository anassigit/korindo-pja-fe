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
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import { saveUserPassword, editUserProfile } from "../../store/appUserProfile/actions"


const ChangePassword = (props) => {

  const dispatch = useDispatch();
  const [changePasswordSpinner, setChangePasswordSpinner] = useState(false);
  const [id, setId] = useState("")

  useEffect(() => {
    if (props.userProfilePassword) {
      userProfilePasswordValidation.resetForm()
      // userProfilePasswordValidation.setFieldValue("id", props.userProfilePageData.id)
   
    }
  }, [props.userProfilePassword])

  const userProfilePasswordValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      curentPassword: '',
      newpassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter Your Current Password"),
      curentPassword: Yup.string().required("Please Enter Your Current Password"),
      newpassword: Yup.string().required("Please Enter Your New Password"),
      newPassword: Yup.string().required("Please Re-Enter Your New Password"),
    }),

    onSubmit: (values) => {
      setChangePasswordSpinner(true);
      props.setAppUserProfileMsg("")
      dispatch(saveUserPassword(values));
    }
  });

  const changePasswordMsg = useSelector(state => ({
    error: state.userProfileReducer.msgAdd,
  }));

  // useEffect(() => {
  //   if (changePasswordMsg.status == "1") {
  //     props.setUserProfilePage(true);
  //     props.setUserProfilePassword(false);
  //     dispatch(saveUserPassword(props.userProfilePassword))
  //   }
  //   props.setAppUserProfileMsg(changePasswordMsg)
  //   setChangePasswordSpinner(false);
  // }, [changePasswordMsg])


  return (
    <Container style={{ display: props.userProfilePassword ? 'block' : 'none' }} fluid={true}>
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
                      name="curentPassword"
                      type="password"
                      placeholder="Enter New Password"
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.curentPassword || ""}
                      invalid={
                        userProfilePasswordValidation.touched.curentPassword && userProfilePasswordValidation.errors.curentPassword ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.curentPassword && userProfilePasswordValidation.errors.curentPassword ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.curentPassword}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3 col-sm-3">
                    
                    <Input
                      name="newpassword"
                      type="password"
                      placeholder="Enter New Password"
                      maxLength={100}
                      onChange={userProfilePasswordValidation.handleChange}
                      value={userProfilePasswordValidation.values.newpassword || ""}
                      invalid={
                        userProfilePasswordValidation.touched.newpassword && userProfilePasswordValidation.errors.newpassword ? true : false
                      }
                    />
                    {userProfilePasswordValidation.touched.newpassword && userProfilePasswordValidation.errors.newpassword ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.newpassword}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3 col-sm-3">
                    
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Confirm New Password"
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

                  <Button type="submit" color="primary" className="ms-1">
                    <i className="bx bxs-save align-middle me-2"></i>{" "}
                    Simpan
                    <Spinner style={{ display: changePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  <Button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => { props.setUserProfilePage(true); props.setUserProfilePassword(false); props.setAppUserProfileMsg("") }}
                  >
                    <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
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
  id: PropTypes.any,
  userProfilePageData: PropTypes.any,

};

export default ChangePassword

