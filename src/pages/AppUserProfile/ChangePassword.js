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

  const changePasswordMessage = useSelector(state => {
    return state.userProfileReducer.msgUpdatePassword;
  });

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
      newPassword: '',
    },

    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("현재 비밀번호를 입력하세요."),
      Password1: Yup.string()
        .required("새로운 비밀번호를 입력하세요.")
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .test(
          "has-at-least-two-different-characters",
          "비밀번호는 적어도 두 가지 다른 문자를 포함해야 합니다.",
          value => {
            const uniqueCharacters = new Set(value);
            return uniqueCharacters.size >= 2;
          }
        ),
      newPassword: Yup.string()
        .required("새 비밀번호를 다시 입력하세요.")
        .oneOf([Yup.ref('Password1')], '비밀번호가 일치하지 않습니다.'),
    }),


    onSubmit: (val) => {
      dispatch(updateUserPassword(val))
      setChangePasswordMsg("")
    }
  });
  
  useEffect(() => {
    userProfilePasswordValidation.resetForm({
      values: {
        currentPassword: '',
        Password1: '',
        newPassword: '',
      },
    });
  }, [props.userProfilePassword]);
  


  const updatePass = async () => {
    if (userProfilePasswordValidation.values.currentPassword !== "" || null) {
      try {
        var map = {
          "currentPassword": userProfilePasswordValidation.values.currentPassword,
          "newPassword": userProfilePasswordValidation.values.newPassword
        };
        await dispatch(updateUserPassword(map));

      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    if (changePasswordMessage.status == "1") {
      setChangePasswordMsg("")
      props.setUserProfilePage(true);
      props.setAppUserProfileMsg(changePasswordMessage);
      props.setUserProfilePassword(false);
    }
    
    if (changePasswordMessage.message != undefined && changePasswordMessage?.status === "0") {
      setChangePasswordMsg(changePasswordMessage.message)
    }

    setChangePasswordSpinner(false);
  }, [changePasswordMessage])

  return (

    <React.Fragment>

      {changePasswordMsg !== "" && (
        <UncontrolledAlert
          toggle={appChangePassCloseAllert}
          color={changePasswordMessage?.status === "1" ? "success" : "danger"}
        >
          {typeof changePasswordMsg === 'string'
            ? changePasswordMsg
            : changePasswordMsg?.message?.map((msg, key) => <p key={key}>{"* " + msg}</p>)}
        </UncontrolledAlert>
      )}


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
                    {userProfilePasswordValidation.touched.Password1 && userProfilePasswordValidation.errors.Password1 ? (
                      <FormFeedback type="invalid">{userProfilePasswordValidation.errors.Password1}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3 col-sm-3">

                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      maxLength={50}
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
                    onClick={() => {
                      props.setUserProfilePage(true);
                      props.setUserProfilePassword(false);
                      props.setAppUserProfileMsg("");
                    }}
                  >

                    Back
                  </Button>
                </FormGroup>

              </Form>

            </CardBody>
          </Card>

        </Row>
      </Container>
    </React.Fragment>

  );
};

ChangePassword.propTypes = {
  userProfilePassword: PropTypes.any,
  setUserProfilePassword: PropTypes.any,
  setUserProfilePage: PropTypes.any,
  setAppUserProfileMsg: PropTypes.any,
};

export default ChangePassword

