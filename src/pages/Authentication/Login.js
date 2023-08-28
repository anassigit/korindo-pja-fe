import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label, UncontrolledAlert } from "reactstrap";

import { ReactSession } from 'react-client-session';

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, resetMessage } from "../../store/actions";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logotitle.png";

const Login = props => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      pw: '',
      langType: 'KOR', // 언어 유형: 한국어
    },
    validationSchema: Yup.object({
      id: Yup.string().required("이메일을 입력해주세요"),
      pw: Yup.string().required("비밀번호를 입력해주세요"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
      setErrorMsg('')
    }
  });

  useEffect(() => {
    let isAuth = ReactSession.get('authUser')
    if (isAuth) {
      props.history.push('/')
    }
  }, [])

  useEffect(() => {
    if (error) {
      setErrorMsg(error)
    }
  }, [error, errorMsg])

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
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-success text-white">
                  <Row>
                    <Col xs={12}>
                      <div className="text-primary p-4">
                        <h2 className="text-primary text-center text-white" >PROJECT A</h2>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}

                      <div className="mb-3">
                        <Input
                          name="id"
                          className="form-control"
                          placeholder="아이디를 입력해주세요"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.id || ""}
                          invalid={
                            validation.touched.id && validation.errors.id ? true : false
                          }
                        />
                        {validation.touched.id && validation.errors.id ? (
                          <FormFeedback type="invalid">{validation.errors.id}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Input
                          name="pw"
                          value={validation.values.pw || ""}
                          type="password"
                          placeholder="비밀번호를 입력해주세요"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.pw && validation.errors.pw ? true : false
                          }
                        />
                        {validation.touched.pw && validation.errors.pw ? (
                          <FormFeedback type="invalid">{validation.errors.pw}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-2 d-grid">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                        >
                          로그인
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/emailPassword" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          비밀번호를 잊으셨나요?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>

                <div className="mt-3 text-center">
                  <p>
                    ©Korindo {new Date().getFullYear()}.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};