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


const FirstLogin = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = ReactSession.get('firstTime_Login')
    if (temp !== "true") {
      history.push('/')
    }
    validation.setFieldValue('currentPassword', '1111')
  }, [])

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      currentPassword: '',
      password1: '',
      newPassword: '',
    },

    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("현재 비밀번호를 입력하세요."),
      password1: Yup.string()
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
        .oneOf([Yup.ref('password1')], '비밀번호가 일치하지 않습니다.'),
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
        <title>Korindo App</title>
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
                        <h2 className="text-primary text-center text-white" style={{ marginBottom: "-1px" }}>PROJECT A</h2>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="pt-3 pb-2 text-center" style={{ fontSize: "18px" }}>
                    보안상의 이유로 비밀번호를 변경하십시오
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

                      <div className="mb-3">
                        <Input
                          name="currentPassword"
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="현재 비밀번호 입력"
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
                      </div>

                      <div className="mb-3">
                        <Input
                          name="password1"
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="새로운 비밀번호 입력"
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
                          placeholder="새 비밀번호를 다시 입력하세요"
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
                      <Label style={{ cursor: "pointer", userSelect: "none" }} check>
                        <Input
                          type="checkbox"
                          onChange={togglePasswordVisibility}
                        />{' '}
                        비밀번호 표시하기
                      </Label>
                      <div className="mt-2 d-grid">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                        >
                          확인
                        </button>
                      </div>

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

export default FirstLogin
