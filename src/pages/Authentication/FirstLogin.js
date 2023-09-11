import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

import { ReactSession } from 'react-client-session';

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, updateUserPassword } from "../../store/actions";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logotitle.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { withTranslation } from "react-i18next"

const FirstLogin = (props) => {
  console.log(props.t("Enter your new password"))
  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = ReactSession.get('firstTime_Login')
    if (!localStorage.getItem("I18N_LANGUAGE")) {
      localStorage.setItem("I18N_LANGUAGE", "eng")
    }
    if (temp !== "true") {
      history.push('/')
    }
    validation.setFieldValue('currentPassword', '1111')
  }, [])

  const langType = localStorage.getItem("I18N_LANGUAGE") || "eng";
  const validationMessages = {
    eng: {
      currentPassword: "Please enter your current password.",
      password1: {
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
      password1: {
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
      password1: {
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

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      currentPassword: '',
      password1: '',
      newPassword: '',
    },

    validationSchema: Yup.object().shape({
      password1: Yup.string()
        .required(validationMessages[langType]?.password1?.required || 'Password is required')
        .min(8, validationMessages[langType]?.password1?.min || 'Password must be at least 8 characters')
        .test(
          "has-at-least-two-different-types",
          validationMessages[langType]?.password1?.test || 'Password must have at least two different character types',
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
        .required('Enter your new password again')
        .oneOf([Yup.ref('password1')], validationMessages[langType]?.newPassword?.oneOf || 'Passwords must match'),
    }),

    onSubmit: (values) => {
      dispatch(updateUserPassword(values))
      history.push('/')
      window.location.reload()
      ReactSession.set('firstTime_Login', 'false')
    }
  });


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));


  return (
    <React.Fragment>
      <MetaTags>
        <title>DMLS</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} xl={6}>
              <Card className="overflow-hidden">
                <div className="bg-success text-white">
                  <Row>
                    <Col xs={12}>
                      <div className="text-primary p-4">
                        <h2 className="text-primary text-center text-white" >DMLS</h2>
                        <h5 className="text-primary text-center text-white" >(Digital Meeting Log System)</h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="pt-3 pb-2 text-center" style={{ fontSize: "18px" }}>
                    {props.t("Change your password for security reasons")}
                  </div>
                  <div className="py-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      {/* <div className="mb-3">
                        <Input
                          name="currentPassword"
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          placeholder={props.t("Enter your current password")}
                          maxLength={50}
                          onChange={validation.handleChange}
                          value={validation.values.currentPassword || ''}
                          invalid={
                            validation.touched.currentPassword && validation.errors.currentPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.currentPassword && validation.errors.currentPassword ? (
                          <FormFeedback type="invalid">{validation.errors.currentPassword}</FormFeedback>
                        ) : null}
                      </div> */}

                      <div className="mb-3">
                        <Input
                          name="password1"
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          placeholder={props.t("Enter a new password")}
                          maxLength={50}
                          onChange={validation.handleChange}
                          value={validation.values.password1 || ""}
                          invalid={
                            validation.touched.password1 && validation.errors.password1 ? true : false
                          }
                        />
                        {validation.touched.password1 && validation.errors.password1 ? (
                          <FormFeedback type="invalid">{validation.errors.password1}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Input
                          name="newPassword"
                          value={validation.values.newPassword || ""}
                          type={showPassword ? 'text' : 'password'}
                          placeholder={props.t("Re-enter your new password")}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.newPassword && validation.errors.newPassword ? true : false
                          }
                        />
                        {validation.touched.newPassword && validation.errors.newPassword ? (
                          <FormFeedback type="invalid">{validation.errors.newPassword}</FormFeedback>
                        ) : null}
                      </div>

                      <Row className="row-cols-gap">
                        <Col>
                          <div className="d-grid">
                            <button className="btn btn-success btn-block" style={{ width: "102.5%" }} type="submit">
                              {props.t("Confirm")}
                            </button>
                          </div>
                        </Col>
                        <Col>
                          <div className="d-grid" style={{ width: "102.5%", marginLeft: "-5%" }}>
                            <button className="btn btn-light btn-block" style={{ width: "102.5%" }} onClick={() => {
                              ReactSession.set('firstTime_Login', 'false')
                              history.push('/')
                            }}
                            >
                              {props.t("Skip")}
                            </button>
                          </div>
                        </Col>
                      </Row>

                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

FirstLogin.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}
//vin commit
export default withTranslation()(FirstLogin)
