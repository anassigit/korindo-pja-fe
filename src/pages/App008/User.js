import React, { useState, useEffect, useCallback } from "react";
import MetaTags from "react-meta-tags";
import Select from "react-select";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik, } from "formik";
import * as Yup from "yup";
import '../../config';
import DeleteModal from "../../common/DeleteModal";
import Lov from "../../common/Lov";

// import { getPlant, getPosition, getWilayah } from "../../store/lov/actions"
import { getCombo } from "../../store/combo/actions"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  UncontrolledTooltip,
  Label,
  Input,
  FormFeedback,
  Form,
  Spinner,
  FormGroup,
  CardHeader,
  UncontrolledAlert,
} from "reactstrap";

import Lovv2 from "../../common/Lovv2";
import { getmuserData, editMuser, resetMessage, saveMuser, deleteMuser, getrolecomboData } from "../../store/app008/actions"
import { useSelector, useDispatch } from "react-redux"


const User = () => {

  const dispatch = useDispatch();
  const [app008p01firstRenderDone, setApp008p01firstRenderDone] = useState(false);
  const [app008p01Page, setApp008p01Page] = useState(true)
  const [app008p02Page, setApp008p02Page] = useState(false)
  const [app008p03Page, setApp008p03Page] = useState(false)
  const [app008Msg, setApp008setMsg] = useState("")
  const [app008deleteModal, setApp008DeleteModal] = useState(false);

  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);

  useEffect(() => {
    dispatch(resetMessage());

  }, [dispatch])

  const app008CloseAllert = () => {
    setApp008setMsg("")
  }


  //p01
  const [app008p01TabelSearch, setApp008p01TabelSearch] = useState('');

  const [app008p01TabelUserReq, setApp008p01TabelUserReq] = useState({ page: 1, limit: 10, offset: 0, sort: "userId", order: "asc", search: { any: app008p01TabelSearch } });

  const app008p01handleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setApp008p01TabelUserReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: { any: app008p01TabelSearch } });
    }
    if (type === "pagination") {
      setApp008p01TabelUserReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: { any: app008p01TabelSearch } });
    }
  };

  useEffect(() => {
    setApp008p01firstRenderDone(true);
    dispatch(getCombo({ "name": "combo-akse-apps" }))
    dispatch(getrolecomboData({}))
  }, [])

  useEffect(() => {
    setApp008p01TabelUserReq({ page: 1, limit: 10, offset: 0, sort: "userId", order: "asc", search: { any: app008p01TabelSearch } });
  }, [app008p01TabelSearch])

  const app008p01UserRole = useSelector(state => {
    return state.MUserReducer.respGetrolecombo;
  });

  const app008p01UserData = useSelector(state => {
    return state.MUserReducer.respGetmuser;
  });

  useEffect(() => {
    if (app008p01UserData.status == "0") {
      setApp008setMsg(app008p01UserData)
    }
  }, [app008p01UserData])

  useEffect(() => {
    if (app008p01firstRenderDone) {
      dispatch(getmuserData(app008p01TabelUserReq))
    }
  }, [app008p01TabelUserReq])

  const app008p01TabelUserColumns = [

    {
      dataField: "userId",
      text: "ID User",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "userFisrtNm",
      text: "Nama Depan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "userLastNm",
      text: "Nama Belakang",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "positionId",
      text: "positionId",
      hidden: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "plantCd",
      text: "plantCd",
      hidden: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "plantNm",
      text: "Plant",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "wilayahCd",
      text: "wilayahCd",
      hidden: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "wilayahNm",
      text: "Wilayah",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "positionNm",
      text: "Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "aksesApps",
      text: "Akses Aplikasi",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "ltsRole",
      text: "Role",
      sort: false,
      hidden: true,
    },

    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app008p01UserData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app008p01PreEdit(app008p01UserData)} />
            <UncontrolledTooltip placement="top" target="edittooltip">
              Ubah
            </UncontrolledTooltip>

            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app008p01Delete(app008p01UserData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>

          </div>
        </>
      ),
    },
  ]

  const [app008p02LovPlant, setApp008p02LovPlant] = useState('')

  const app008p02LovPlantColumns = [
    {
      dataField: "plantCd",
      text: "Kode Plant",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "plantNm",
      text: "Nama Plant",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p02callBackLovPlant(row) {
    app008p02ValidInput.setFieldValue("plantCd", row.plantCd)
  }

  const [app008p02LovWilayah, setApp008p02LovWilayah] = useState('')

  const app008p02LovWilayahColumns = [
    {
      dataField: "wilayahCd",
      text: "Kode Wilayah",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "wilayahNm",
      text: "Nama Wilayah",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p02callBackLovWilayah(row) {
    app008p02ValidInput.setFieldValue("wilayahCd", row.wilayahCd)
  }

  const [app008p02LovPosition, setApp008p02LovPosition] = useState('')

  const app008p02LovPositionColumns = [
    {
      dataField: "positionId",
      text: "ID Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "positionNm",
      text: "Nama Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p02callBackLovPosition(row) {
    app008p02ValidInput.setFieldValue("positionId", row.positionId)
  }

  const app008p01PreAdd = () => {
    setApp008setMsg("")
    app008p02ValidInput.setFieldValue("userId", "")
    app008p02ValidInput.setFieldValue("userFisrtNm", "")
    app008p02ValidInput.setFieldValue("userLastNm", "")
    app008p02ValidInput.setFieldValue("password", "")
    app008p02ValidInput.setFieldValue("plantCd", "")
    app008p02ValidInput.setFieldValue("plantNm", "")
    app008p02ValidInput.setFieldValue("wilayahCd", "")
    app008p02ValidInput.setFieldValue("wilayahNm", "")
    app008p02ValidInput.setFieldValue("positionId", "")
    app008p02ValidInput.setFieldValue("positionNm", "")
    app008p02ValidInput.setFieldValue("aksesApps", "")
    app008p02ValidInput.setFieldValue("rePassword", "")
    setselectedMulti(null)
    setApp008p02LovPlant("");
    setApp008p02LovWilayah("");
    setApp008p02LovPosition("");
    setApp008p01Page(false)
    setApp008p02Page(true)
  }

  const app008p01PreEdit = (app008p01UserData) => {
    setApp008setMsg("")
    app008p03ValidInput.setFieldValue("userId", app008p01UserData.userId)
    app008p03ValidInput.setFieldValue("userFisrtNm", app008p01UserData.userFisrtNm)
    app008p03ValidInput.setFieldValue("userLastNm", app008p01UserData.userLastNm)
    app008p03ValidInput.setFieldValue("plantCd", app008p01UserData.plantCd)
    app008p03ValidInput.setFieldValue("wilayahCd", app008p01UserData.wilayahCd)
    app008p03ValidInput.setFieldValue("positionId", app008p01UserData.positionId)
    app008p03ValidInput.setFieldValue("password", '')
    app008p03ValidInput.setFieldValue("rePassword", '')

    setApp008p03LovPlant(app008p01UserData.plantNm);
    setApp008p03LovWilayah(app008p01UserData.wilayahNm);
    setApp008p03LovPosition(app008p01UserData.positionNm);

    let a = 0;
    if (app008p01UserData.aksesApps === "Web") {
      a = 1;
    } else if (app008p01UserData.aksesApps === "Mobile") {
      a = 2;
    }
    app008p03ValidInput.setFieldValue("aksesApps", a.toString());

    setselectedMulti2(app008p01UserData.ltsRole)


    setApp008p01Page(false)
    setApp008p03Page(true)
  }

  const [app008p01UserDelete, setApp008p01UserDelete] = useState(null);

  const app008p01Delete = (app008p01UserData) => {
    setApp008setMsg("")
    setApp008p01UserDelete(app008p01UserData);
    setApp008DeleteModal(true)
  }

  const app008HandleDeleteMenu = () => {
    if (app008p01UserDelete.userId) {
      dispatch(deleteMuser(app008p01UserDelete));
      setApp008DeleteModal(false);
      setApp008DeleteModal(null)
    }
  }

  const app008p01Message = useSelector(state => {
    return state.MUserReducer.msgDelete;
  });

  useEffect(() => {
    if (app008p01Message.status == "1") {
      dispatch(getmuserData(app008p01TabelUserReq))
    }
    setApp008setMsg(app008p01Message);
  }, [app008p01Message])

  //p02
  const [app008p02Spinner, setApp008p02Spinner] = useState(false);

  const {
    app008SelectedAksesApp
  } = useSelector(state => ({
    app008SelectedAksesApp: state.ComboReducer.respRoleAksesType.data != null ? state.ComboReducer.respRoleAksesType.data : []
  }))

  const app008p02ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      userId: '',
      userFisrtNm: '',
      userLastNm: '',
      password: '',
      rePassword: '',
      plantCd: '',
      plantNm: '',
      wilayahCd: '',
      wilayahNm: '',
      positionId: '',
      positionNm: '',
      aksesApps: '',
    },

    validationSchema: Yup.object().shape({
      userId: Yup.string().required("Wajib diisi"),
      userFisrtNm: Yup.string().required("Wajib diisi"),
      userLastNm: Yup.string().required("Wajib diisi"),
      password: Yup.string().required("Wajib diisi"),
      rePassword: Yup.string().required("Wajib diisi"),
      plantCd: Yup.string().required("Wajib diisi"),
      plantNm: Yup.string().required("Wajib diisi"),
      wilayahCd: Yup.string().required("Wajib diisi"),
      wilayahNm: Yup.string().required("Wajib diisi"),
      positionId: Yup.string().required("Wajib diisi"),
      positionNm: Yup.string().required("Wajib diisi"),
      aksesApps: Yup.string().required("Wajib diisi"),
    }),


    onSubmit: (values) => {
      values.ltsRole = selectedMulti;
      setApp008p02Spinner(true);
      setApp008setMsg("")
      dispatch(saveMuser(values));
    }
  });

  const app008p02Message = useSelector(state => {
    return state.MUserReducer.msgAdd;
  });

  useEffect(() => {
    if (app008p02Message.status == "1") {
      app008p02ValidInput.resetForm();
      setApp008p01Page(true);
      setApp008p02Page(false);
      dispatch(getmuserData(app008p01TabelUserReq))

    }
    setApp008setMsg(app008p02Message)
    setApp008p02Spinner(false);
  }, [app008p02Message])


  //p03
  const [app008p03Spinner, setApp008p03Spinner] = useState(false);
  const app008p03ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      userId: '',
      userFisrtNm: '',
      userLastNm: '',
      plantCd: '',
      plantNm: '',
      wilayahCd: '',
      wilayahNm: '',
      positionId: '',
      positionNm: '',
      aksesApps: '',
      rePassword: '',

    },

    validationSchema: Yup.object().shape({
      userId: Yup.string().required("Wajib diisi"),
      userFisrtNm: Yup.string().required("Wajib diisi"),
      userLastNm: Yup.string().required("Wajib diisi"),
      plantCd: Yup.string().required("Wajib diisi"),
      plantNm: Yup.string().required("Wajib diisi"),
      wilayahCd: Yup.string().required("Wajib diisi"),
      wilayahNm: Yup.string().required("Wajib diisi"),
      positionId: Yup.string().required("Wajib diisi"),
      positionNm: Yup.string().required("Wajib diisi"),
      aksesApps: Yup.string().required("Wajib diisi"),
    }),

    onSubmit: (values) => {
      setApp008p03Spinner(true);
      setApp008setMsg("")
      values.ltsRole = selectedMulti2;
      dispatch(editMuser(values));
    }
  });

  const app008p03Message = useSelector(state => {
    return state.MUserReducer.msgEdit;
  });

  useEffect(() => {
    if (app008p03Message.status == "1") {
      setApp008p01Page(true);
      setApp008p03Page(false);
      dispatch(getmuserData(app008p01TabelUserReq))
      // app008p03ValidInput.setFieldValue("password", "")
    }
    setApp008setMsg(app008p03Message)
    setApp008p03Spinner(false);
  }, [app008p03Message])

  const [app008p03LovPlant, setApp008p03LovPlant] = useState('');

  const app008p03LovPlantColumns = [
    {
      dataField: "plantCd",
      text: "ID Plant",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "plantNm",
      text: "Nama Plant",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p03callBackLovPlant(row) {
    app008p03ValidInput.setFieldValue("plantCd", row.plantCd)
  }

  const [app008p03LovWilayah, setApp008p03LovWilayah] = useState('')

  const app008p03LovWilayahColumns = [
    {
      dataField: "wilayahCd",
      text: "Kode Wilayah",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "wilayahNm",
      text: "Nama Wilayah",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p03callBackLovWilayah(row) {
    app008p03ValidInput.setFieldValue("wilayahCd", row.wilayahCd)
  }

  const [app008p03LovPosition, setApp008p03LovPosition] = useState('')

  const app008p03LovPositionColumns = [
    {
      dataField: "positionId",
      text: "ID Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "positionNm",
      text: "Nama Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  function app008p03callBackLovPosition(row) {
    app008p03ValidInput.setFieldValue("positionId", row.positionId)
  }

  function handleMulti(s) {
    setselectedMulti(s);
  }

  function handleMulti2(s) {
    setselectedMulti2(s);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Korindo App
          </title>
        </MetaTags>

        <DeleteModal
          show={app008deleteModal}
          onDeleteClick={app008HandleDeleteMenu}
          onCloseClick={() => setApp008DeleteModal(false)}
        />

        {app008Msg !== "" ? <UncontrolledAlert toggle={app008CloseAllert} color={app008Msg.status == "1" ? "success" : "danger"}>
          {typeof app008Msg == 'string' ? app008Msg : app008Msg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null}

        <Container style={{ display: app008p01Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain User" />

          <Row>
            <Col>
              <Card>
                <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i>List User</CardHeader>
                <CardBody>
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col sm="8">
                        <div className="input-group">
                          <label className="col-sm-1" style={{ marginTop: "8px" }}>Search : </label>
                          <div className="col-sm-3">
                            <input
                              type="text"
                              className="form-control"
                              value={app008p01TabelSearch}
                              onChange={(e) => setApp008p01TabelSearch(e.target.value)}
                            />
                            {/* <div className="input-group-append">
                              <button className="btn btn-dark" type="button"
                                onClick={() => {
                                  dispatch(getmuserData(app008p01TabelUserReq))
                                }}>
                                <i className="mdi mdi-magnify" />
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </Col>
                      <Col sm="12">
                        <div className="text-sm-end">
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => { app008p01PreAdd() }}
                          >
                            <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                            Tambah
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <BootstrapTable
                        wrapperClasses="table-responsive"
                        keyField="userId"
                        rowClasses="text-nowrap"
                        remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                        data={app008p01UserData.data != null ? app008p01UserData.data.user : []}
                        columns={app008p01TabelUserColumns}
                        pagination={paginationFactory({
                          page: app008p01TabelUserReq.page,
                          sizePerPage: app008p01TabelUserReq.limit,
                          sizePerPageList: [5, 10, 20],
                          totalSize: app008p01UserData.data != null ? app008p01UserData.data.managementusertotal : 0,
                          showTotal: true,
                        })}
                        classes={
                          "table align-middle table-nowrap"
                        }
                        onTableChange={app008p01handleTableChange}
                        striped
                        hover
                        condensed
                      />
                    </Row>
                  </React.Fragment>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* //p02 */}
        <Container style={{ display: app008p02Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain User" pageNow={setApp008p02Page} pageBefore={setApp008p01Page} message={setApp008setMsg}/>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>Tambah User</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app008p02ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">
                      <Row>
                        <Col md="5">
                          <div className="mb-3 col-sm-8">
                            <Label>ID User <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="userId"
                              type="text"
                              maxLength={50}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.userId || ""}
                              invalid={
                                app008p02ValidInput.touched.userId && app008p02ValidInput.errors.userId ? true : false
                              }
                            />
                            {app008p02ValidInput.touched.userId && app008p02ValidInput.errors.userId ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.userId}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Nama Depan <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="userFisrtNm"
                              type="text"
                              maxLength={50}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.userFisrtNm || ""}
                              invalid={
                                app008p02ValidInput.touched.userFisrtNm && app008p02ValidInput.errors.userFisrtNm ? true : false
                              }
                            />
                            {app008p02ValidInput.touched.userFisrtNm && app008p02ValidInput.errors.userFisrtNm ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.userFisrtNm}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Nama Belakang <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="userLastNm"
                              type="text"
                              maxLength={50}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.userLastNm || ""}
                              invalid={
                                app008p02ValidInput.touched.userLastNm && app008p02ValidInput.errors.userLastNm ? true : false
                              }
                            />
                            {app008p02ValidInput.touched.userLastNm && app008p02ValidInput.errors.userLastNm ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.userLastNm}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Password <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="password"
                              type="password"
                              maxLength={50}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.password || ""}
                              invalid={
                                app008p02ValidInput.touched.password && app008p02ValidInput.errors.password ? true : false
                              }
                            />
                            {app008p02ValidInput.touched.password && app008p02ValidInput.errors.password ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Ulangi Password <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="rePassword"
                              type="password"
                              maxLength={50}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.rePassword || ""}
                              invalid={
                                app008p02ValidInput.touched.rePassword && app008p02ValidInput.errors.rePassword ? true : false
                              }
                            />
                            {app008p02ValidInput.touched.rePassword && app008p02ValidInput.errors.rePassword ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.rePassword}</FormFeedback>
                            ) : null}
                          </div>


                        </Col>
                        <Col md="5">
                          <div className="mb-3 col-sm-8">
                            <Input
                              name="wilayahCd"
                              type="text"
                              hidden={true}
                              onChange={app008p02ValidInput.handleChange}
                              value={app008p02ValidInput.values.wilayahCd || ""}
                              invalid={
                                app008p02ValidInput.touched.wilayahCd && app008p02ValidInput.errors.wilayahCd ? true : false
                              }
                            />
                          </div>

                          <div className="mb-3 col-sm-8">
                            <label className="control-label">
                              Role <span style={{ color: "red" }}>* </span>
                            </label>
                            <Select
                              value={selectedMulti}
                              isMulti={true}
                              onChange={(e) => {
                                handleMulti(e);
                              }}
                              options={
                                app008p01UserRole.data != null ? app008p01UserRole.data.options : null
                              }
                              className="select2-selection"
                            />
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Akses Aplikasi <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              type="select"
                              name="aksesApps"
                              onChange={app008p02ValidInput.handleChange}
                              onBlur={app008p02ValidInput.handleBlur}
                              value={app008p02ValidInput.values.aksesApps || ""}
                              invalid={
                                app008p02ValidInput.touched.aksesApps && app008p02ValidInput.errors.aksesApps ? true : false
                              }
                            >
                              <option></option>
                              {
                                app008SelectedAksesApp.dtlsetting?.map((value, key) =>
                                  <option key={key} value={value.id}>{value.desc}</option>)
                              }
                            </Input>
                            {app008p02ValidInput.touched.aksesApps && app008p02ValidInput.errors.aksesApps ? (
                              <FormFeedback type="invalid">{app008p02ValidInput.errors.aksesApps}</FormFeedback>
                            ) : null}
                          </div>


                        </Col>
                      </Row>
                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app008p02Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp008p01Page(true); setApp008p02Page(false); setApp008setMsg("") }}
                      >
                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                        Kembali
                      </Button>

                    </FormGroup>

                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* //p03 */}
        <Container style={{ display: app008p03Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain User" pageNow={setApp008p03Page} pageBefore={setApp008p01Page} message={setApp008setMsg}/>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Ubah User</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app008p03ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">
                      <Row>
                        <Col md="5">
                          <div className="mb-3 col-sm-8">
                            <Label>ID User</Label>
                            <Input
                              name="userId"
                              type="text"
                              disabled
                              maxLength={50}
                              onChange={app008p03ValidInput.handleChange}
                              value={app008p03ValidInput.values.userId || ""}
                              invalid={
                                app008p03ValidInput.touched.userId && app008p03ValidInput.errors.userId ? true : false
                              }
                            />
                            {app008p03ValidInput.touched.userId && app008p03ValidInput.errors.userId ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.userId}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Nama Depan <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="userFisrtNm"
                              type="text"
                              maxLength={50}
                              onChange={app008p03ValidInput.handleChange}
                              value={app008p03ValidInput.values.userFisrtNm || ""}
                              invalid={
                                app008p03ValidInput.touched.userFisrtNm && app008p03ValidInput.errors.userFisrtNm ? true : false
                              }
                            />
                            {app008p03ValidInput.touched.userFisrtNm && app008p03ValidInput.errors.userFisrtNm ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.userFisrtNm}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Nama Belakang <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              name="userLastNm"
                              type="text"
                              maxLength={50}
                              onChange={app008p03ValidInput.handleChange}
                              value={app008p03ValidInput.values.userLastNm || ""}
                              invalid={
                                app008p03ValidInput.touched.userLastNm && app008p03ValidInput.errors.userLastNm ? true : false
                              }
                            />
                            {app008p03ValidInput.touched.userLastNm && app008p03ValidInput.errors.userLastNm ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.userLastNm}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Password Baru</Label>
                            <Input
                              name="password"
                              type="password"
                              maxLength={50}
                              onChange={app008p03ValidInput.handleChange}
                              value={app008p03ValidInput.values.password || ""}
                              invalid={
                                app008p03ValidInput.touched.password && app008p03ValidInput.errors.password ? true : false
                              }
                            />
                            {app008p03ValidInput.touched.password && app008p03ValidInput.errors.password ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.password}</FormFeedback>
                            ) : null}
                            <Label style={{ color: 'red' }}>Input ulang jika ingin merubah password !!!</Label>
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Ulangi Password</Label>
                            <Input
                              name="rePassword"
                              type="password"
                              maxLength={50}
                              onChange={app008p03ValidInput.handleChange}
                              value={app008p03ValidInput.values.rePassword || ""}
                              invalid={
                                app008p03ValidInput.touched.rePassword && app008p03ValidInput.errors.rePassword ? true : false
                              }
                            />
                            {app008p03ValidInput.touched.rePassword && app008p03ValidInput.errors.rePassword ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.rePassword}</FormFeedback>
                            ) : null}
                            {/* <Label style={{ color: 'red' }}>Input ulang jika ingin merubah password !!!</Label> */}
                          </div>
                        </Col>

                        <Col md="5">
                        {/* <div className="mb-3 col-sm-8">
                        <label> Plant <span style={{ color: "red" }}>* </span></label>
                          <Lovv2 
                            title="Plant"
                            keyFieldData="plantNm"
                            columns={app008p03LovPlantColumns}
                            getData={getPlant}
                            pageSize={10}
                            callbackFunc={app008p03callBackLovPlant}
                            // onChangeFunc = {null}
                            defaultSetInput="plantNm"
                            invalidData={app008p03ValidInput}
                            fieldValue="plantNm"
                            stateSearchInput={app008p03LovPlant}
                            stateSearchInputSet={setApp008p03LovPlant}
                            touchedLovField={app008p03ValidInput.touched.plantNm}
                            errorLovField={app008p03ValidInput.errors.plantNm}
                          />
                          </div> */}

                          <div className="mb-3 col-sm-8">
                          <Input
                            name="wilayahCd"
                            type="text"
                            hidden={true}
                            onChange={app008p03ValidInput.handleChange}
                            value={app008p03ValidInput.values.wilayahCd || ""}
                            invalid={
                              app008p03ValidInput.touched.wilayahCd && app008p03ValidInput.errors.wilayahCd ? true : false
                            }
                          />
                          </div>
                          
                          {/* <div className="mb-3 col-sm-8">
                          <label> Wilayah <span style={{ color: "red" }}>* </span></label>
                          <Lovv2 
                            title="Wilayah"
                            keyFieldData="wilayahNm"
                            columns={app008p03LovWilayahColumns}
                            getData={getWilayah}
                            pageSize={10}
                            callbackFunc={app008p03callBackLovWilayah}
                            //onChangeFunc={}
                            defaultSetInput="wilayahNm"
                            invalidData={app008p03ValidInput}
                            fieldValue="wilayahNm"
                            stateSearchInput={app008p03LovWilayah}
                            stateSearchInputSet={setApp008p03LovWilayah}
                            touchedLovField={app008p03ValidInput.touched.wilayahCd}
                            errorLovField={app008p03ValidInput.errors.wilayahCd}
                            pParam={app008p03ValidInput.values.plantCd}
                          />
                          </div> */}

                          {/* <div className="mb-3 col-sm-8">
                          <label> Jabatan <span style={{ color: "red" }}>* </span></label>
                          <Lovv2 
                            title="Jabatan"
                            keyFieldData="positionNm"
                            columns={app008p03LovPositionColumns}
                            getData={getPosition}
                            pageSize={10}
                            callbackFunc={app008p03callBackLovPosition}
                            // onChangeFunc = {null}
                            defaultSetInput="positionNm"
                            invalidData={app008p03ValidInput}
                            fieldValue="positionNm"
                            stateSearchInput={app008p03LovPosition}
                            stateSearchInputSet={setApp008p03LovPosition}
                            touchedLovField={app008p03ValidInput.touched.positionNm}
                            errorLovField={app008p03ValidInput.errors.positionNm}
                          />
                          </div> */}

                          <div className="mb-3 col-sm-8">
                            <label className="control-label">
                              Role <span style={{ color: "red" }}>* </span>
                            </label>
                            <Select
                              value={selectedMulti2}
                              isMulti={true}
                              onChange={(e) => {
                                handleMulti2(e);
                              }}
                              options={
                                app008p01UserRole.data != null ? app008p01UserRole.data.options : null
                              }
                              className="select2-selection"
                            />
                          </div>

                          <div className="mb-3 col-sm-8">
                            <Label>Akses Aplikasi <span style={{ color: "red" }}>* </span></Label>
                            <Input
                              type="select"
                              name="aksesApps"
                              onChange={app008p03ValidInput.handleChange}
                              onBlur={app008p03ValidInput.handleBlur}
                              value={app008p03ValidInput.values.aksesApps || ""}
                              invalid={
                                app008p03ValidInput.touched.aksesApps && app008p03ValidInput.errors.aksesApps ? true : false
                              }
                            >
                              <option></option>
                              {
                                app008SelectedAksesApp.dtlsetting?.map((value, key) =>
                                  <option key={key} value={value.id}>{value.desc}</option>)
                              }
                            </Input>
                            {app008p03ValidInput.touched.aksesApps && app008p03ValidInput.errors.aksesApps ? (
                              <FormFeedback type="invalid">{app008p03ValidInput.errors.aksesApps}</FormFeedback>
                            ) : null}
                          </div>


                        </Col>
                      </Row>
                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app008p03Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp008p01Page(true); setApp008p03Page(false); setApp008setMsg("") }}
                      >
                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                        Kembali
                      </Button>

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

export default User