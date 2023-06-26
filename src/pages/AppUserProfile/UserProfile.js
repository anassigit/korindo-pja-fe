import React, { useState, useEffect, useCallback } from "react"
import MetaTags from 'react-meta-tags';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik, } from "formik";
import * as Yup from "yup";
import '../../config';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Spinner,
  FormGroup,
  CardHeader,
  UncontrolledAlert,
} from "reactstrap"

import { editUserProfile, resetMessage } from "../../store/appUserProfile/actions"
import { useSelector, useDispatch } from "react-redux"

// import Lovv2 from "../../common/Lovv2";
// import { getPlant, getPosition, getWilayah } from "../../store/lov/actions"
// import { getCombo } from "../../store/combo/actions"
import { ReactSession  } from 'react-client-session';


const UserProfile = () => {

  const dispatch = useDispatch();
  const [appUserProfilep01Page, setAppUserProfilep01Page] = useState(true)
  const [appUserProfileMsg, setAppUserProfilesetMsg] = useState("")

  useEffect(() => {
    dispatch(resetMessage());
    // dispatch(getCombo({ "name": "combo-akse-apps" }))
  }, [dispatch])


  const appUserProfileCloseAllert = () => {
    setAppUserProfilesetMsg("")
  }

  const [appUserProfilep01Spinner, setAppUserProfilep01Spinner] = useState(false);
  const u = JSON.parse(ReactSession.get("user"))

  const appUserProfilep01ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
    //   userId: u != null ? u.userId : '',
      hp: u != null ? u.hp : ''
    //   userLastNm: u != null ? u.userLastNm : '',
    //   password: '',
    //   rePassword: '',
    //   plantNm: u != null ? u.plantNm : '',
    //   plantCd: u != null ? u.plantCd : null,
    //   wilayahNm: u != null ? u.wilayahNm : '',
    //   wilayahCd: u != null ? u.wilayahCd : null,
    //   positionNm: u != null ? u.positionNm : '',
    //   positionId: u != null ? u.positionId : null,
    //   aksesApps: u != null ? u.aksesApps.toString() : null
    },

    validationSchema: Yup.object().shape({
    //   userId: Yup.string()
    //     .required("Wajib diisi"),
      hp: Yup.string()
        .required("Wajib diisi")
    //   userLastNm: Yup.string()
    //     .required("Wajib diisi"),
    //   plantNm: Yup.string()
    //     .required("Wajib diisi"),
    //   wilayahNm: Yup.string()
    //     .required("Wajib diisi"),
    //   positionNm: Yup.string()
    //     .required("Wajib diisi"),
    //   aksesApps: Yup.string()
    //     .required("Wajib diisi"),
    }),

    onSubmit: (values) => {
      setAppUserProfilep01Spinner(true);
      setAppUserProfilesetMsg("")
      dispatch(editUserProfile(values));
    }
  });

  const appUserProfilep01Message = useSelector(state => {
    return state.userProfileReducer.msgEdit;
  });


  useEffect(() => {
    if (appUserProfilep01Message.status == "1") {
      setAppUserProfilep01Page(true);
      const u = JSON.parse(ReactSession.get("user"))
      u.name = appUserProfilep01ValidInput.values.name
      u.pName = appUserProfilep01ValidInput.values.pName
      u.gName = appUserProfilep01ValidInput.values.gName
      u.hp = appUserProfilep01ValidInput.values.hp
      u.id = appUserProfilep01ValidInput.values.id
      ReactSession.set("user", JSON.stringify(u))
    }
    setAppUserProfilesetMsg(appUserProfilep01Message)
    setAppUserProfilep01Spinner(false);
  }, [appUserProfilep01Message])

//   const [appUserProfilep01SearchLovPlant, setAppUserProfilep01SearchLovPlant] = useState(u != null ? u.plantNm : '')


//   const appUserProfilep01LovPlantColumns = [
//     {
//       dataField: "plantCd",
//       text: "Kode Plant",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//     {
//       dataField: "plantNm",
//       text: "Nama Plant",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//   ]

//   function appUserProfilep01callBackLovPlant(row) {
//     appUserProfilep01ValidInput.setFieldValue("plantCd", row.plantCd)
//   }

  // function appUserProfilep01ChangeLovPlant(val) {
  //     if(appUserProfilep01SearchLovPlant == ""){
  //       setAppUserProfilep01SearchLovWilayah("");
  //       appUserProfilep01ValidInput.setFieldValue("plantCd", "")
  //     }
  //     // else if (val != appUserProfilep01SearchLovPlant  ){
  //     //   setAppUserProfilep01SearchLovWilayah("");
  //     //   appUserProfilep01ValidInput.setFieldValue("plantCd", "")
  //     // }
  // }

//   const [appUserProfilep01SearchLovWilayah, setAppUserProfilep01SearchLovWilayah] = useState(u != null ? u.wilayahNm : '')


//   const appUserProfilep01LovWilayahColumns = [
//     {
//       dataField: "wilayahCd",
//       text: "Kode Wilayah",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//     {
//       dataField: "wilayahNm",
//       text: "Nama Wilayah",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//   ]

//   function appUserProfilep01callBackLovWilayah(row) {
//     appUserProfilep01ValidInput.setFieldValue("wilayahCd", row.wilayahCd)
//   }

//   const [appUserProfilep01SearchLovPosition, setAppUserProfilep01SearchLovPosition] = useState(u != null ? u.positionNm : '')

//   const appUserProfilep01LovPositionColumns = [
//     {
//       dataField: "positionId",
//       text: "ID Jabatan",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//     {
//       dataField: "positionNm",
//       text: "Nama Jabatan",
//       sort: true,
//       headerStyle: { textAlign: 'center' },
//     },
//   ]

//   function appUserProfilep01callBackLovPosition(row) {
//     appUserProfilep01ValidInput.setFieldValue("positionId", row.positionId)
//   }

//   const {
//     appUserProfileSelectedAksesApp
//   } = useSelector(state => ({
//     appUserProfileSelectedAksesApp: state.ComboReducer.respRoleAksesType.data != null ? state.ComboReducer.respRoleAksesType.data : []
//   }));

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Project A</title>
        </MetaTags>

        {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
          {typeof appUserProfileMsg == 'string' ? appUserProfileMsg : appUserProfileMsg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null}

        <Container style={{ display: appUserProfilep01Page ? 'block' : 'none' }} fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Change User Profile" /> */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Change Profile Info</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      appUserProfilep01ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">
                      <Row>
                        <Col md="5">
                          <div className="mb-3 col-sm-10">
                          <Label>Name<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="name"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.name || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.name && appUserProfilep01ValidInput.errors.name ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.name && appUserProfilep01ValidInput.errors.name ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.name}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-10">
                            <Label>Position<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="pName"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.pName || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.pName && appUserProfilep01ValidInput.errors.pName ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.pName && appUserProfilep01ValidInput.errors.pName ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.pName}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-10">
                            <Label>Group<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="gName"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.gName || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.gName && appUserProfilep01ValidInput.errors.gName ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.gName && appUserProfilep01ValidInput.errors.gName ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.gName}</FormFeedback>
                            ) : null}
                          </div>
                          
                        </Col>


                        <Col md="5">

                        <div className="mb-3 col-sm-8">
                            <Label>HP<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="hp"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.hp || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.hp && appUserProfilep01ValidInput.errors.hp ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.hp && appUserProfilep01ValidInput.errors.hp ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.hp}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-10">
                            <Label>ID<span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="id"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.id || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.id && appUserProfilep01ValidInput.errors.id ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.id && appUserProfilep01ValidInput.errors.id ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.id}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Password</Label>
                            {/* <Input
                              name="password"
                              type="text"
                              maxLength={50}
                              onChange={appUserProfilep01ValidInput.handleChange}
                              value={appUserProfilep01ValidInput.values.id || ""}
                              invalid={
                                appUserProfilep01ValidInput.touched.id && appUserProfilep01ValidInput.errors.id ? true : false
                              }
                            />
                            {appUserProfilep01ValidInput.touched.id && appUserProfilep01ValidInput.errors.id ? (
                              <FormFeedback type="invalid">{appUserProfilep01ValidInput.errors.id}</FormFeedback>
                            ) : null} */}
                          </div>
                          <span style={{ color: "red" }}> Input ulang jika ingin merubah password !!!</span>
                        </Col>
                      </Row>
                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Ubah
                      </Button>
                      <Spinner style={{ display: appUserProfilep01Spinner ? "block" : "none", marginTop: '-35px' }} className="ms-4" color="danger" />
                    </FormGroup>

                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

      </div>
    </React.Fragment>
  );
};

export default UserProfile
