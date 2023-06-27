// import PropTypes from "prop-types";
// import MetaTags from "react-meta-tags";
// import React, { useState, useEffect } from "react";

// import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

// //redux
// import { useSelector, useDispatch } from "react-redux";

// import { withRouter, Link } from "react-router-dom";

// // Formik validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// // actions
// import { loginUser } from "../../store/actions";

// // import images
// import profile from "assets/images/profile-img.png";
// import logo from "assets/images/logotitle.png";


// const ChangePassword = props => {
//   const dispatch = useDispatch();

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       nik: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       nik: Yup.string().required("Please Enter Your Email"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     // onSubmit: (values) => {
//     //   dispatch(loginUser(values, props.history));
//     // }
//   });

//   const { error } = useSelector(state => ({
//     error: state.Login.error,
//   }));

//   // handleValidSubmit
// //   const handleValidSubmit = (event, values) => {
// //     dispatch(loginUser(values, props.history));
// //   };

//   return (
//     <React.Fragment>
//       <MetaTags>
//         <title>Korindo App</title>
//       </MetaTags>
//       <div className="home-btn d-none d-sm-block">
//         <Link to="/" className="text-dark">
//           <i className="fas fa-home h2" />
//         </Link>
//       </div>
//       <div className="account-pages my-5 pt-sm-5">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={6} lg={6} xl={5}>
//               <Card className="overflow-hidden">
//                 <div >
//                   <Row>
//                     <Col xs={12}>
//                       <div className="text-primary p-4">
//                         <h2 style={{color: "#3F4031"}}>Change Password</h2>
//                         {/* <p>Login untuk melanjutkan.</p> */}
//                       </div>
//                     </Col>
//                     {/* <Col className="col-5 align-self-end">
//                       <img src={profile} alt="" className="img-fluid" />
//                     </Col> */}
//                   </Row>
//                 </div>
//                 <CardBody className="pt-0">
//                   <div>
//                     <Link to="/" className="auth-logo-light">
//                       {/* <div className="avatar-md profile-user-wid mb-4">
//                         <span className="avatar-title rounded-circle bg-light">
//                           <img
//                             src={logo}
//                             alt=""
//                             className="rounded-circle"
//                             height="34"
//                           />
//                         </span>
//                       </div> */}
//                     </Link>
//                   </div>
//                   <div className="p-2">
//                     <Form
//                       className="form-horizontal"
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         validation.handleSubmit();
//                         return false;
//                       }}
//                     >
//                       {error ? <Alert color="danger">{error}</Alert> : null}

//                       <div className="mb-3">
//                         {/* <Label className="form-label">Email</Label> */}
//                         <Input
//                           name="password"
//                           value={validation.values.password || ""}
//                           type="password"
//                           placeholder="Enter New Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           invalid={
//                             validation.touched.password && validation.errors.password ? true : false
//                           }
//                         />
//                         {validation.touched.password && validation.errors.password ? (
//                           <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//                         ) : null}
//                       </div>
//                         <br/>
//                       <div className="mb-3">
//                         {/* <Label className="form-label">Password</Label> */}
//                         <Input
//                           name="password"
//                           value={validation.values.password || ""}
//                           type="password"
//                           placeholder="Enter New Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           invalid={
//                             validation.touched.password && validation.errors.password ? true : false
//                           }
//                         />
//                         {validation.touched.password && validation.errors.password ? (
//                           <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mb-3">
//                         {/* <Label className="form-label">Password</Label> */}
//                         <Input
//                           name="password"
//                           value={validation.values.password || ""}
//                           type="password"
//                           placeholder="Enter New Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           invalid={
//                             validation.touched.password && validation.errors.password ? true : false
//                           }
//                         />
//                         {validation.touched.password && validation.errors.password ? (
//                           <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//                         ) : null}
//                       </div>
//                       <div className="mt-2 d-grid">
//                         <button
//                           className="btn btn-success btn-block"
//                           type="submit"
//                         >
//                           Confirm
//                         </button>
//                       </div>
//                       <div className="mt-2 d-grid">
//                         <button
//                           className="btn btn-light btn-block"
//                           type="submit"
//                         >
//                           Cancel
//                         </button>
//                       </div>

                      
//                     </Form>
//                   </div>
//                 </CardBody>

//                 <div className="mt-3 text-center">
//                   {/* <p>
//                     Don&#39;t have an account ?{" "}
//                     <Link to="/register" className="fw-medium text-primary">
//                       {" "}
//                       Signup now{" "}
//                     </Link>{" "}
//                   </p> */}
//                   <p>
//                     ©Korindo {new Date().getFullYear()}.
//                   </p>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default withRouter(ChangePassword);

// // Login.propTypes = {
// //   history: PropTypes.object,
// // };
