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
import { withTranslation } from "react-i18next"


const ChangePassword = (props) => {

  const dispatch = useDispatch();

  const langType = localStorage.getItem("I18N_LANGUAGE") || "eng";
  const validationMessages = {
    eng: {
      currentPassword: "Please enter your current password.",
      Password1: {
        required: "Please enter a new password.",
        min: "Password must be at least 8 characters long.",
        test: "Password must include at least two different characters.",
      },
      newPassword: {
        required: "Please re-enter the new password.",
        oneOf: "Passwords do not match.",
      },
    },
    kor: {
      currentPassword: "현재 비밀번호를 입력하세요.",
      Password1: {
        required: "새로운 비밀번호를 입력하세요.",
        min: "비밀번호는 최소 8자 이상이어야 합니다.",
        test: "비밀번호는 적어도 두 가지 다른 문자를 포함해야 합니다.",
      },
      newPassword: {
        required: "새 비밀번호를 다시 입력하세요.",
        oneOf: "비밀번호가 일치하지 않습니다.",
      },
    },
    idr: {
      currentPassword: "Silakan masukkan kata sandi saat ini.",
      Password1: {
        required: "Silakan masukkan kata sandi baru.",
        min: "Kata sandi harus terdiri dari setidaknya 8 karakter.",
        test: "Kata sandi harus mengandung setidaknya dua karakter yang berbeda.",
      },
      newPassword: {
        required: "Silakan masukkan kembali kata sandi baru.",
        oneOf: "Kata sandi tidak cocok.",
      },
    },
  }

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(validationMessages[langType].currentPassword),
    Password1: Yup.string()
      .required(validationMessages[langType].Password1.required)
      .min(8, validationMessages[langType].Password1.min)
      .test(
        "has-at-least-two-different-types",
        validationMessages[langType].Password1.test,
        (value) => {
          const characterTypes = {
            digit: /\d/,
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            special: /[\W_]/, 
          };

          const typeCount = Object.values(characterTypes).reduce(
            (count, regex) => (regex.test(value) ? count + 1 : count),
            0
          );

          return typeCount >= 2;
        }
      ),
    newPassword: Yup.string()
      .required(validationMessages[langType].newPassword.required)
      .oneOf([Yup.ref('Password1')], validationMessages[langType].newPassword.oneOf),
  });

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

    validationSchema: validationSchema,


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
            <CardHeader><i className="mdi mdi-lock fs-6 align-baseline" />{" "}{props.t("Change Password")}</CardHeader>
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
                      placeholder={props.t("Enter current password")}
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
                      placeholder={props.t("Enter new password")}
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
                      placeholder={props.t("Confirm new password")}
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

                    <i className="mdi mdi-check fs-5 align-middle" />{" "}{props.t("Save")}
                    <Spinner style={{ display: changePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  <Button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => {
                      props.setUserProfilePage(true);
                      props.setUserProfilePassword(false);
                      props.setAppUserProfileMsg("");
                    }}
                  >

                    <i className="mdi mdi-keyboard-backspace fs-5 align-middle" />{" "}{props.t("Back")}
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
  location: PropTypes.object,
  t: PropTypes.any
};

export default withTranslation()(ChangePassword)

