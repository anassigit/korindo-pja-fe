import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser } from "../../store/actions";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logotitle.png";


const Login = props => {
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      pw: '',
      langType: 'ENG',
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter Your Email"),
      pw: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {

      dispatch(loginUser(values, props.history));
    }
  });

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
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Input
                          name="id"
                          className="form-control"
                          placeholder="Enter Email"
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
                          placeholder="Enter Password"
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
                          Login
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/emailPassword" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
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
