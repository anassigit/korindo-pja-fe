import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label, Button, Spinner } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { updateForgotPassword } from "../../store/appUserProfile/actions"

import { useHistory } from "react-router-dom";
import { ReactSession } from 'react-client-session';

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logotitle.png";


const UpdatePassword = props => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [updatePasswordSpinner, setUpdatePasswordSpinner] = useState(false);
  const [state = { notLoaded: true }, setState] = useState(null);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {

      newpassword: '',
      newPassword: '',

    },
    validationSchema: Yup.object({

      newpassword: Yup.string().required("Please Enter Your New Password"),
      newPassword: Yup.string().required("Please Re-Enter Your New Password"),
    }),

  });

  const updatePass = async () => {
    try {
      const queryParameters = new URLSearchParams(window.location.search)
      const type = queryParameters.get("KOR_TOKEN")

      localStorage.setItem("authUser", type);
      var map = {
        "newPassword": validation.values.newPassword

      };
      // console.log('map : ', map)

      setUpdatePasswordSpinner(true);
      await dispatch(updateForgotPassword(map));
      // props.setAppUserProfileMsg("")
      history.push("/login");
    } catch (error) {
      console.log(error)
    }
  };

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  // handleValidSubmit
  //   const handleValidSubmit = (event, values) => {
  //     dispatch(loginUser(values, props.history));
  //   };

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
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className=" text-white">
                  <Row>
                    <Col xs={12}>
                      <div className="text-primary p-4">
                        <h2 className="text-primary text-left" >새 비밀번호를 입력해주세요</h2>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">

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
                          type="text"
                          hidden
                          maxLength={100}
                          onChange={validation.handleChange}
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
                          name="currentPassword"
                          type="text"
                          hidden
                          maxLength={100}
                          onChange={validation.handleChange}
                          value={validation.values.currentPassword || ""}
                          invalid={
                            validation.touched.currentPassword && validation.errors.currentPassword ? true : false
                          }
                        />
                        {validation.touched.currentPassword && validation.errors.currentPassword ? (
                          <FormFeedback type="invalid">{validation.errors.currentPassword}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">

                        <Input
                          name="newPassword"
                          type="password"
                          placeholder="새 비밀번호를 입력해주세요"
                          maxLength={100}
                          onChange={validation.handleChange}
                          value={validation.values.newPassword || ""}
                          invalid={
                            validation.touched.newPassword && validation.errors.newPassword ? true : false
                          }
                        />
                        {validation.touched.newPassword && validation.errors.newPassword ? (
                          <FormFeedback type="invalid">{validation.errors.newPassword}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">

                        <Input
                          name="Password"
                          type="password"
                          placeholder="새 비밀번호를 다시 입력해주세요"
                          maxLength={100}
                          onChange={validation.handleChange}
                          value={validation.values.Password || ""}
                          invalid={
                            validation.touched.Password && validation.errors.Password ? true : false
                          }
                        />
                        {validation.touched.Password && validation.errors.Password ? (
                          <FormFeedback type="invalid">{validation.errors.Password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-2 d-grid">
                        <Button color="primary" className="ms-1" onClick={() => { updatePass() }}>

                          변경
                          <Spinner style={{ display: updatePasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                        </Button>
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

export default withRouter(UpdatePassword);

// Login.propTypes = {
//   history: PropTypes.object,
// };
