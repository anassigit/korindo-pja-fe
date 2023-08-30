import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Spinner, UncontrolledAlert } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ReactSession } from 'react-client-session';
// actions
import { emailForgotPassword, msgEmailForgotPassword } from "../../store/appUserProfile/actions"

import { useHistory } from "react-router-dom";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logotitle.png";


const EmailVerPassword = props => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [emailPasswordSpinner, setEmailPasswordSpinner] = useState(false);
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")


  const error = useSelector(state => {
    return state.userProfileReducer.msgEmailForgotPassword;
  })

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: ''
    },
    validationSchema: Yup.object({
      id: Yup.string().required("아이디를 입력해주세요"),
    }),
    onSubmit: (values) => {
      ReactSession.set('emailMsg', '')
      dispatch(emailForgotPassword(values));
    }
  })

  useEffect(() => {
    let sessionMsg = ReactSession.get('emailMsg')
    debugger
    if (error.status == "1" && sessionMsg !== 'goLogin') {
      ReactSession.set('emailMsg', error)
      history.push('/login')
    }
    setAppUserProfileMsg(error)
  }, [error])

  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
    ReactSession.set('emailMsg', '')
  }

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
                <div className=" text-white">
                  <Row>
                    <Col xs={12}>
                      <div className="text-primary p-4">
                        <h2 className="text-primary text-left" >아이디를 입력해주세요</h2>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  {appUserProfileMsg.status == "0" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
                    {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}

                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >

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

                      <div className="mt-2 d-grid">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                        >
                          이메일로 전송하기
                          <Spinner style={{ display: emailPasswordSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                        </button>
                      </div>
                      <div className="mt-2 d-grid">
                        <button
                          className="btn btn-light btn-block"
                          type="button"
                          onClick={() => {

                            ReactSession.set('emailMsg', 'goLogin')
                            history.push({
                              pathname: '/login',
                            })
                          }
                          }
                        >
                          뒤로 가기
                        </button>
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

export default withRouter(EmailVerPassword);
// Login.propTypes = {
//   history: PropTypes.object,
// };
