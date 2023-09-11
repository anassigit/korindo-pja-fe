import React, { useState, useEffect, useCallback } from "react";
import MetaTags from "react-meta-tags";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik, } from "formik";
import * as Yup from "yup";
import '../../config';
import Lov from "../../common/Lov";
import { getUser, getMenu } from "../../store/lov/actions"
import DeleteModal from "../../common/DeleteModal";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";


import { getroleData, editRole, resetMessage, saveRole, deleteRole, getRoleMenuData, saveRoleMenu, deleteRoleMenu, getRoleUserData, saveRoleUser, deleteRoleUser } from "../../store/app003/actions"
import { getCombo } from "../../store/combo/actions"
import { useSelector, useDispatch } from "react-redux"
import classnames from "classnames"

const Role = () => {

  const dispatch = useDispatch();
  const [app003p01firstRenderDone, setApp003p01firstRenderDone] = useState(false);
  const [app003p01Page, setApp003p01Page] = useState(true)
  const [app003p02Page, setApp003p02Page] = useState(false)
  const [app003p03Page, setApp003p03Page] = useState(false)
  const [app003p04Page, setApp003p04Page] = useState(false)
  const [app003p05Page, setApp003p05Page] = useState(false)
  const [app003p06Page, setApp003p06Page] = useState(false)
  const [app003Msg, setApp003setMsg] = useState("")
  const [app003deleteModal, setApp003DeleteModal] = useState(false);
  const [app003p04deleteModal, setApp003p04DeleteModal] = useState(false);
  const [app003p04deleteModalUser, setApp003p04DeleteModalUser] = useState(false);
  const [app003p01RoleId, setApp003p01RoleId] = useState('');
  const [appDetailPage, setAppDetailPage] = useState(false)

  //const [app003SelectedAksesApp, setApp003SelectedAksesApp] = useState({dtlsetting: []});

  useEffect(() => {
    dispatch(resetMessage());

  }, [dispatch])

  const app003CloseAllert = () => {
    setApp003setMsg("")
  }

  //p01
  const [app003p01TabelSearch, setApp003p01TabelSearch] = useState('');

  const [app003p01TabelRoleReq, setApp003p01TabelRoleReq] = useState({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p01TabelSearch } });

  const app003p01hendleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setApp003p01TabelRoleReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: { any: app003p01TabelSearch } });
    }
    if (type === "pagination") {
      setApp003p01TabelRoleReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: { any: app003p01TabelSearch } });
    }
  };

  useEffect(() => {
    setApp003p01firstRenderDone(true);
    dispatch(getCombo({ "name": "combo-akse-apps" }))
  }, [])

  const {
    app003SelectedAksesApp
  } = useSelector(state => ({
    app003SelectedAksesApp: state.ComboReducer.respRoleAksesType.data != null ? state.ComboReducer.respRoleAksesType.data : []
  }));

  useEffect(() => {
    setApp003p01TabelRoleReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p01TabelSearch } });
  }, [app003p01TabelSearch])


  const app003p01RoleData = useSelector(state => {
    return state.RoleReducer.respGetrole;
  });

  useEffect(() => {
    if (app003p01RoleData.status == "0") {
      setApp003setMsg(app003p01RoleData)
    }
  }, [app003p01RoleData])


  useEffect(() => {
    if (app003p01firstRenderDone) {
      dispatch(getroleData(app003p01TabelRoleReq))
    }
  }, [app003p01TabelRoleReq])

  const app003p01TabelRoleColumns = [
    {
      dataField: "roleid",
      text: "ID Role",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "rolename",
      text: "Nama Role",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    // {
    //   dataField: "aksesApps",
    //   text: "Akses Apps",
    //   sort: true,
    //   hidden: true,
    //   headerStyle: {textAlign: 'center'},
    // },
    // {
    //   dataField: "aksesAppsNm",
    //   text: "Akses Apps",
    //   sort: false,
    //   headerStyle: {textAlign: 'center'},
    // },
    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app003p01RoleData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app003p01PreEdit(app003p01RoleData)} />
            <UncontrolledTooltip placement="top" target="edittooltip">
              Ubah
            </UncontrolledTooltip>

            <i className="mdi mdi-file-check-outline font-size-18 text-info" id="detailtooltip" onClick={() => app003p01PreDetail(app003p01RoleData)} />
            <UncontrolledTooltip placement="top" target="detailtooltip">
              Detil
            </UncontrolledTooltip>

            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app003p01Delete(app003p01RoleData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>

          </div>
        </>
      ),
    },
  ]

  const app003p01PreAdd = () => {
    app003p02ValidInput.setFieldValue("roleid", "")
    app003p02ValidInput.setFieldValue("rolename", "")
    // app003p02ValidInput.setFieldValue("aksesApps", "")
    setApp003setMsg("")
    setApp003p01Page(false)
    setApp003p02Page(true)
    setAppDetailPage(false)
  }

  const app003p01PreDetail = (app003p01RoleData) => {
    setApp003setMsg("")
    setApp003p01Page(false)
    setApp003p04Page(true)
    setApp003p01RoleId(app003p01RoleData.roleid)
    setAppDetailPage(true)
  }

  const app003p01PreEdit = (app003p01RoleData) => {
    setApp003setMsg("")
    app003p03ValidInput.setFieldValue("roleid", app003p01RoleData.roleid)
    app003p03ValidInput.setFieldValue("rolename", app003p01RoleData.rolename)
    // app003p03ValidInput.setFieldValue( "aksesApps", app003p01RoleData.aksesApps.toString())
    setApp003p01Page(false)
    setApp003p03Page(true)
  }

  const [app003p01RoleDelete, setApp003p01RoleDelete] = useState(null);

  const app003p01Delete = (app003p01RoleData) => {
    setApp003setMsg("")
    setApp003p01RoleDelete(app003p01RoleData);
    setApp003DeleteModal(true)
  }

  const app003HandleDeleteMenu = () => {
    if (app003p01RoleDelete.roleid) {
      dispatch(deleteRole(app003p01RoleDelete));
      setApp003DeleteModal(false);
      setApp003p01RoleDelete(null)
    }
  }

  const app003p01Message = useSelector(state => {
    return state.MenuReduce.msgDelete;
  });

  useEffect(() => {
    if (app003p01Message.status == "1") {
      dispatch(getroleData(app003p01TabelRoleReq))
      setApp003setMsg(app003p01Message);
    }
  }, [app003p01Message])


  //p02
  const [app003p02Spinner, setApp003p02Spinner] = useState(false);

  const app003p02ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      roleid: '',
      rolename: '',
      // aksesApps: '',
    },

    validationSchema: Yup.object().shape({
      roleid: Yup.string().required("Wajib diisi"),
      rolename: Yup.string().required("Wajib diisi"),
      //aksesApps: Yup.string().required("Wajib dipilih"),
    }),


    onSubmit: (values) => {
      setApp003p02Spinner(true);
      setApp003setMsg("")
      dispatch(saveRole(values));
    }
  });

  const app003p02Message = useSelector(state => {
    return state.RoleReducer.msgAdd;
  });

  useEffect(() => {
    if (app003p02Message.status == "1") {
      app003p02ValidInput.resetForm;
      setApp003p01Page(true);
      setApp003p02Page(false);
      dispatch(getroleData(app003p01TabelRoleReq))
      app003p02ValidInput.setFieldValue("roleid", "")
      app003p02ValidInput.setFieldValue("rolename", "")
      // app003p02ValidInput.setFieldValue( "aksesApps", "")
    }
    setApp003setMsg(app003p02Message)
    setApp003p02Spinner(false);
    setAppDetailPage(false);
  }, [app003p02Message])

  //p03
  const [app003p03Spinner, setApp003p03Spinner] = useState(false);
  const app003p03ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      roleid: '',
      rolename: '',
      // aksesApps : '',
    },
    validationSchema: Yup.object().shape({
      roleid: Yup.string()
        .required("Wajib diisi"),
      rolename: Yup.string()
        .required("Wajib diisi"),
      // aksesApps: Yup.string()
      //   .required("Wajib dipilih"),
    }),


    onSubmit: (values) => {
      setApp003p03Spinner(true);
      setApp003setMsg("")
      dispatch(editRole(values));
    }
  });

  const app003p03Message = useSelector(state => {
    return state.RoleReducer.msgEdit;
  });

  useEffect(() => {
    if (app003p03Message.status == "1") {
      setApp003p01Page(true);
      setApp003p03Page(false);
      dispatch(getroleData(app003p01TabelRoleReq))
    }
    setApp003setMsg(app003p03Message)
    setApp003p03Spinner(false);
  }, [app003p03Message])

  //p04

  const [app003p04ActiveTab, setApp003p04ActiveTab] = useState("1");
  const app003p04ClickTab = tab => {
    if (app003p04ActiveTab !== tab) {
      setApp003p04ActiveTab(tab);
    }
  };

  const [app003p04TabelSearch, setApp003p04TabelSearch] = useState('');
  const [app003p04TabelSearchUser, setApp003p04TabelSearchUser] = useState('');
  const [app003p04RoleMenuDelete, setApp003p04RoleMenuDelete] = useState(null);
  const [app003p04RoleUserDelete, setApp003p04RoleUserDelete] = useState(null);
  const [app003p04TabelRoleMenuReq, setApp003p04TabelRoleMenuReq] = useState({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
  const [app003p04TabelRoleUserReq, setApp003p04TabelRoleUserReq] = useState({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });

  const app003p04hendleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setApp003p04TabelRoleMenuReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
    }
    if (type === "pagination") {
      setApp003p04TabelRoleMenuReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
    }
  };

  const app003p04hendleTableChangeUser = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setApp003p04TabelRoleUserReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });
    }
    if (type === "pagination") {
      setApp003p04TabelRoleUserReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });
    }
  };

  useEffect(() => {
    setApp003p04TabelRoleMenuReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
  }, [app003p01RoleId])

  useEffect(() => {
    setApp003p04TabelRoleUserReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });
  }, [app003p01RoleId])

  const app003p04RoleMenuData = useSelector(state => {
    //console.log(state)
    return state.RoleReducer.respGetRoleMenu;
  });

  const app003p04RoleUserData = useSelector(state => {
    //console.log(state)
    return state.RoleReducer.respGetRoleUser;
  });

  useEffect(() => {
    if (app003p04RoleMenuData.status == "0") {
      setApp003setMsg(app003p04RoleMenuData)
    }
  }, [app003p04RoleMenuData])

  useEffect(() => {
    if (app003p04RoleUserData.status == "0") {
      setApp003setMsg(app003p04RoleUserData)
    }
  }, [app003p04RoleUserData])

  useEffect(() => {
    setApp003p04TabelRoleMenuReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
  }, [app003p04TabelSearch])

  useEffect(() => {
    setApp003p04TabelRoleUserReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });
  }, [app003p04TabelSearchUser])

  useEffect(() => {
    if (app003p01firstRenderDone) {
      dispatch(getRoleMenuData(app003p04TabelRoleMenuReq))
    }
  }, [app003p04TabelRoleMenuReq])


  useEffect(() => {
    if (app003p01firstRenderDone) {
      dispatch(getRoleUserData(app003p04TabelRoleUserReq))
    }
  }, [app003p04TabelRoleUserReq])

  const app003p04Delete = (app003p04RoleMenuData) => {
    setApp003setMsg("")
    setApp003p04RoleMenuDelete(app003p04RoleMenuData);
    setApp003p04DeleteModal(true)
  }

  const app003p04HandleDeleteMenu = () => {
    if (app003p04RoleMenuDelete.roleid) {
      dispatch(deleteRoleMenu(app003p04RoleMenuDelete));
      setApp003p04DeleteModal(false);
      setApp003p04RoleMenuDelete(null)
    }
  }

  const app003p04DeleteUser = (app003p04RoleUserData) => {
    setApp003setMsg("")
    setApp003p04RoleUserDelete(app003p04RoleUserData);
    setApp003p04DeleteModalUser(true)
  }

  const app003p04HandleDeleteUser = () => {
    if (app003p04RoleUserDelete.roleid) {
      dispatch(deleteRoleUser(app003p04RoleUserDelete));
      setApp003p04DeleteModalUser(false);
      setApp003p04RoleUserDelete(null)
    }
  }

  const app003Message = useSelector(state => {
    return state.RoleReducer.msgDelete;
  });

  useEffect(() => {
    if (app003Message.status == "1") {
      dispatch(getRoleMenuData(app003p04TabelRoleMenuReq))
      setApp003setMsg(app003Message);
    }
  }, [app003Message])

  useEffect(() => {
    if (app003Message.status == "1") {
      dispatch(getRoleUserData(app003p04TabelRoleUserReq))
      setApp003setMsg(app003Message);
    }
  }, [app003Message])

  const app003p04TabelRoleMenuColumns = [
    {
      dataField: "roleid",
      text: "ID Role",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "menuId",
      text: "ID Menu",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "menuNm",
      text: "Menu / Nama Aplikasi",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "moduleNm",
      text: "Nama Modul",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app003p04RoleMenuData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app003p04Delete(app003p04RoleMenuData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>

          </div>
        </>
      ),
    },
  ]

  const app003p04TabelRoleUserColumns = [
    {
      dataField: "roleid",
      text: "ID Role",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "roleDesc",
      text: "Role Deskripsi",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "userId",
      text: "ID User",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "userFisrtNm",
      text: "Nama User",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app003p04RoleUserData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app003p04DeleteUser(app003p04RoleUserData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>

          </div>
        </>
      ),
    },
  ]


  const app003p04PreAdd = () => {
    app003p05ValidInput.setFieldValue("roleid", app003p01RoleId)
    app003p05ValidInput.setFieldValue("menuId", "")
    setApp003p05LovMenu("")
    setApp003setMsg("")
    setApp003p04Page(false)
    setApp003p05Page(true)
    setAppDetailPage(true)
  }

  const app003p05PreAdd = () => {
    app003p06ValidInput.setFieldValue("roleid", app003p01RoleId)
    app003p06ValidInput.setFieldValue("userId", "")
    setapp003p06LovUser("")
    setApp003setMsg("")
    setApp003p04Page(false)
    setApp003p06Page(true)
    setAppDetailPage(true)
  }

  //p05
  const [app003p05Spinner, setApp003p05Spinner] = useState(false);

  const app003p05ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      roleid: '',
      menuId: '',
    },
    validationSchema: Yup.object().shape({
      roleid: Yup.string()
        .required("Wajib diisi"),
      menuId: Yup.string()
        .required("Wajib diisi"),
    }),


    onSubmit: (values) => {
      setApp003p05Spinner(true);
      setApp003setMsg("")
      dispatch(saveRoleMenu(values));
    }
  });

  const app003p05Message = useSelector(state => {
    return state.RoleReducer.msgAdd;
  });

  useEffect(() => {
    if (app003p05Message.status == "1") {
      dispatch(getRoleMenuData(app003p04TabelRoleMenuReq))
      setApp003p04Page(true);
      setApp003p05Page(false);
      setApp003p01Page(false);
    } else {
      setAppDetailPage(true);
    }
    setApp003setMsg(app003p05Message)
    setApp003p05Spinner(false);
  }, [app003p05Message])

  const [app003p05LovMenu, setApp003p05LovMenu] = useState('');

  const app003p05LovMenuColumns = [
    {
      dataField: "menuId",
      text: "ID Menu",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "menuNm",
      text: "Menu / Nama Aplikasi",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "moduleNm",
      text: "Nama Module",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  //p06
  const [app003p06Spinner, setApp003p06Spinner] = useState(false);

  const app003p06ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      roleid: '',
      userId: '',
    },
    validationSchema: Yup.object().shape({
      roleid: Yup.string().required("Wajib diisi"),
      userId: Yup.string().required("Wajib diisi"),
    }),


    onSubmit: (values) => {
      setApp003p06Spinner(true);
      setApp003setMsg("")
      dispatch(saveRoleUser(values));
    }
  });

  const app003p06Message = useSelector(state => {
    return state.RoleReducer.msgAdd;
  });

  useEffect(() => {
    if (app003p06Message.status == "1") {
      dispatch(getRoleUserData(app003p04TabelRoleUserReq))
      if (appDetailPage) {
        setApp003p01Page(false);
        setApp003p04Page(true);
      } else {
        setApp003p01Page(true);
        setApp003p04Page(false);
      }
      setApp003p06Page(false);
    }
    setApp003setMsg(app003p06Message)
    setApp003p06Spinner(false);
  }, [app003p06Message])

  const [app003p06LovUser, setapp003p06LovUser] = useState('');

  const app003p06LovUserColumns = [
    {
      dataField: "userId",
      text: "ID User",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "userFisrtNm",
      text: "Nama User",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  return (
    <React.Fragment>

      <div className="page-content">
        <MetaTags>
          <title>
            DMLS
          </title>
        </MetaTags>

        <DeleteModal
          show={app003deleteModal}
          onDeleteClick={app003HandleDeleteMenu}
          onCloseClick={() => setApp003DeleteModal(false)}
        />

        {app003Msg !== "" ? <UncontrolledAlert toggle={app003CloseAllert} color={app003Msg.status == "1" ? "success" : "danger"}>
          {typeof app003Msg == 'string' ? app003Msg : app003Msg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null}

        <Container style={{ display: app003p01Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col>
              <Card>
                <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i>List Role</CardHeader>
                <CardBody>
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col sm="2">
                        <div className="form-group m-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search ..."
                              value={app003p01TabelSearch}
                              onChange={(e) => setApp003p01TabelSearch(e.target.value)}
                            />
                            <div className="input-group-append">
                              <button className="btn btn-dark" type="button"
                                onClick={() => {
                                  dispatch(getroleData(app003p01TabelRoleReq))
                                }}>
                                <i className="mdi mdi-magnify" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col sm="10">
                        <div className="text-sm-end">
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => { app003p01PreAdd() }}
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
                        keyField="roleid"
                        rowClasses="text-nowrap"
                        remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                        data={app003p01RoleData.data != null ? app003p01RoleData.data.role : []}
                        columns={app003p01TabelRoleColumns}
                        pagination={paginationFactory({
                          page: app003p01TabelRoleReq.page,
                          sizePerPage: app003p01TabelRoleReq.limit,
                          sizePerPageList: [5, 10, 20],
                          totalSize: app003p01RoleData.data != null ? app003p01RoleData.data.roletotal : 0,
                          showTotal: true,
                        })}
                        classes={
                          "table align-middle table-nowrap"
                        }
                        onTableChange={app003p01hendleTableChange}
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
        <Container style={{ display: app003p02Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>Tambah Role</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app003p02ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">

                      <div className="mb-3 col-sm-3">
                        <Label>ID Role <span style={{ color: "red" }}>* </span></Label>
                        <Input
                          name="roleid"
                          type="text"
                          maxLength={50}
                          onChange={app003p02ValidInput.handleChange}
                          value={app003p02ValidInput.values.roleid || ""}
                          invalid={
                            app003p02ValidInput.touched.roleid && app003p02ValidInput.errors.roleid ? true : false
                          }
                        />
                        {app003p02ValidInput.touched.roleid && app003p02ValidInput.errors.roleid ? (
                          <FormFeedback type="invalid">{app003p02ValidInput.errors.roleid}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-sm-3">
                        <Label>Nama Role <span style={{ color: "red" }}>* </span></Label>
                        <Input
                          name="rolename"
                          type="text"
                          maxLength={50}
                          onChange={app003p02ValidInput.handleChange}
                          value={app003p02ValidInput.values.rolename || ""}
                          invalid={
                            app003p02ValidInput.touched.rolename && app003p02ValidInput.errors.rolename ? true : false
                          }
                        />
                        {app003p02ValidInput.touched.rolename && app003p02ValidInput.errors.rolename ? (
                          <FormFeedback type="invalid">{app003p02ValidInput.errors.rolename}</FormFeedback>
                        ) : null}
                      </div>

                      {/* <div className="mb-3 col-sm-3">
                          <Label>Akses App</Label>
                          <Input
                                  type="select"
                                  name="aksesApps"
                                  onChange= {app003p02ValidInput.handleChange}
                                  onBlur={app003p02ValidInput.handleBlur}
                                  value={app003p02ValidInput.values.aksesApps || ""}
                                  invalid={
                                    app003p02ValidInput.touched.aksesApps && app003p02ValidInput.errors.aksesApps ? true : false
                                  }
                                >
                                  <option></option>
                                  {
                                    app003SelectedAksesApp.dtlsetting?.map((value, key) =>
                                    <option key={key} value={value.id}>{value.desc}</option>) 
                                  }
                                </Input>
                                {app003p02ValidInput.touched.aksesApps && app003p02ValidInput.errors.aksesApps ? (
                                  <FormFeedback type="invalid">{app003p02ValidInput.errors.aksesApps}</FormFeedback>
                                ) : null}
                    </div> */}
                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app003p02Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp003p01Page(true); setApp003p02Page(false); setApp003setMsg("") }}
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
        <Container style={{ display: app003p03Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Ubah Role</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app003p03ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">

                      <div className="mb-3 col-sm-3">
                        <Label>ID Role</Label>
                        <Input
                          name="roleid"
                          type="text"
                          disabled
                          maxLength={50}
                          onChange={app003p03ValidInput.handleChange}
                          value={app003p03ValidInput.values.roleid || ""}
                          invalid={
                            app003p03ValidInput.touched.roleid && app003p03ValidInput.errors.roleid ? true : false
                          }
                        />
                        {app003p03ValidInput.touched.roleid && app003p03ValidInput.errors.roleid ? (
                          <FormFeedback type="invalid">{app003p03ValidInput.errors.roleid}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-sm-3">
                        <Label>Nama Role</Label>
                        <Input
                          name="rolename"
                          type="text"
                          maxLength={50}
                          onChange={app003p03ValidInput.handleChange}
                          value={app003p03ValidInput.values.rolename || ""}
                          invalid={
                            app003p03ValidInput.touched.rolename && app003p03ValidInput.errors.rolename ? true : false
                          }
                        />
                        {app003p03ValidInput.touched.rolename && app003p03ValidInput.errors.rolename ? (
                          <FormFeedback type="invalid">{app003p03ValidInput.errors.rolename}</FormFeedback>
                        ) : null}
                      </div>


                      {/* <div className="mb-3 col-sm-3">
                          <Label>Akses App</Label>
                          <Input
                                  type="select"
                                  name="aksesApps"
                                  onChange= {app003p03ValidInput.handleChange}
                                  onBlur={app003p03ValidInput.handleBlur}
                                  value={app003p03ValidInput.values.aksesApps || ""}
                                  invalid={
                                    app003p03ValidInput.touched.aksesApps && app003p03ValidInput.errors.aksesApps ? true : false
                                  }
                                >
                                  <option></option>
                                  {
                                    app003SelectedAksesApp.dtlsetting?.map((value, key) =>
                                    <option key={key} value={value.id}>{value.desc}</option>) 
                                  }
                                </Input>
                                {app003p03ValidInput.touched.aksesApps && app003p03ValidInput.errors.aksesApps ? (
                                  <FormFeedback type="invalid">{app003p03ValidInput.errors.aksesApps}</FormFeedback>
                                ) : null}
                          {app003p03ValidInput.errors.aksesApps ? <div className='error'>{app003p03ValidInput.errors.aksesApps}</div> : null}
                    </div>  */}

                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app003p03Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp003p01Page(true); setApp003p03Page(false); setApp003setMsg("") }}
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

        {/* //p04 */}

        <DeleteModal
          show={app003p04deleteModal}
          onDeleteClick={app003p04HandleDeleteMenu}
          onCloseClick={() => setApp003p04DeleteModal(false)}
        />

        <DeleteModal
          show={app003p04deleteModalUser}
          onDeleteClick={app003p04HandleDeleteUser}
          onCloseClick={() => setApp003p04DeleteModalUser(false)}
        />

        <Container style={{ display: app003p04Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i>Detil Role Akses</CardHeader>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: app003p04ActiveTab === "1",
                        })}
                        onClick={() => {
                          app003p04ClickTab("1");
                        }}
                      >
                        <span className="d-none d-sm-block">
                          <i className="fas fa-landmark"></i> Role Aplikasi
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: app003p04ActiveTab === "2",
                        })}
                        onClick={() => {
                          app003p04ClickTab("2");
                        }}
                      >
                        <span className="d-none d-sm-block">
                          <i className="fas fa-user"></i> Role User
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={app003p04ActiveTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Row className="mb-2">
                            <Col sm="2">
                              <div className="form-group m-0">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search ..."
                                    value={app003p04TabelSearch}
                                    onChange={(e) => setApp003p04TabelSearch(e.target.value)}
                                  />
                                  <div className="input-group-append">
                                    <button className="btn btn-dark" type="button"
                                      onClick={() => {
                                        setApp003p04TabelRoleMenuReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearch, "roleid": app003p01RoleId } });
                                      }}>
                                      <i className="mdi mdi-magnify" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm="10">
                              <div className="text-sm-end">
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                  onClick={() => { app003p04PreAdd() }}
                                >
                                  <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                  Tambah
                                </button>
                              </div>
                            </Col>
                          </Row>
                          <BootstrapTable
                            wrapperClasses="table-responsive"
                            keyField="menuId"
                            rowClasses="text-nowrap"
                            remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                            data={app003p04RoleMenuData.data != null ? app003p04RoleMenuData.data.rolemenu : []}
                            columns={app003p04TabelRoleMenuColumns}
                            pagination={paginationFactory({
                              page: app003p04TabelRoleMenuReq.page,
                              sizePerPage: app003p04TabelRoleMenuReq.limit,
                              sizePerPageList: [5, 10, 20],
                              totalSize: app003p04RoleMenuData.data != null ? app003p04RoleMenuData.data.rolemenutotal : 0,
                              showTotal: true,
                            })}
                            classes={
                              "table align-middle table-nowrap"
                            }
                            onTableChange={app003p04hendleTableChange}
                            striped
                            hover
                            condensed
                          />

                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <Row className="mb-2">
                            <Col sm="2">
                              <div className="form-group m-0">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search ..."
                                    value={app003p04TabelSearchUser}
                                    onChange={(e) => setApp003p04TabelSearchUser(e.target.value)}
                                  />
                                  <div className="input-group-append">
                                    <button className="btn btn-dark" type="button"
                                      onClick={() => {
                                        setApp003p04TabelRoleUserReq({ page: 1, limit: 10, offset: 0, sort: "roleid", order: "asc", search: { any: app003p04TabelSearchUser, "roleid": app003p01RoleId } });
                                      }}>
                                      <i className="mdi mdi-magnify" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm="10">
                              <div className="text-sm-end">
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                  onClick={() => { app003p05PreAdd() }}
                                >
                                  <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                  Tambah
                                </button>
                              </div>
                            </Col>
                          </Row>
                          <BootstrapTable
                            wrapperClasses="table-responsive"
                            keyField="userId"
                            rowClasses="text-nowrap"
                            remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                            data={app003p04RoleUserData.data != null ? app003p04RoleUserData.data.roleuser : []}
                            columns={app003p04TabelRoleUserColumns}
                            pagination={paginationFactory({
                              page: app003p04TabelRoleUserReq.page,
                              sizePerPage: app003p04TabelRoleUserReq.limit,
                              sizePerPageList: [5, 10, 20],
                              totalSize: app003p04RoleUserData.data != null ? app003p04RoleUserData.data.roleusertotal : 0,
                              showTotal: true,
                            })}
                            classes={
                              "table align-middle table-nowrap"
                            }
                            onTableChange={app003p04hendleTableChangeUser}
                            striped
                            hover
                            condensed
                          />
                        </Col>
                      </Row>
                    </TabPane>


                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="text-sm-end">
            <button
              type="button" className="btn btn-danger "
              onClick={() => { setApp003p01Page(true); setApp003p04Page(false); setApp003setMsg(""); setAppDetailPage(false); }}>
              <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
              Kembali
            </button>
          </div>
        </Container>

        {/* //p05 */}

        <Container style={{ display: app003p05Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i> Tambah Role Menu</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app003p05ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">

                      <div className="mb-3 col-sm-3">
                        <Label>ID Role</Label>
                        <Input
                          name="roleid"
                          type="text"
                          disabled
                          maxLength={50}
                          onChange={app003p05ValidInput.handleChange}
                          value={app003p05ValidInput.values.roleid || ""}
                          invalid={
                            app003p05ValidInput.touched.roleid && app003p05ValidInput.errors.roleid ? true : false
                          }
                        />
                        {app003p05ValidInput.touched.roleid && app003p05ValidInput.errors.roleid ? (
                          <FormFeedback type="invalid">{app003p05ValidInput.errors.roleid}</FormFeedback>
                        ) : null}
                      </div>

                      <div>
                        <Lov title="ID Menu"

                          LenghtLabel=""
                          LenghtDiv="mb-3 col-sm-3"
                          columns={app003p05LovMenuColumns}
                          getData={getMenu}
                          pageSize={10}
                          // callbackFunc = {null}
                          // onChangeFunc = {null}
                          defaultSetInput="menuId"
                          invalidData={app003p05ValidInput}
                          fieldValue="menuId"
                          stateSearchInput={app003p05LovMenu}
                          stateSearchInputSet={setApp003p05LovMenu}
                          touchedLovField={app003p05ValidInput.touched.menuId}
                          errorLovField={app003p05ValidInput.errors.menuId}
                        />
                      </div>

                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app003p05Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp003p04Page(true); setApp003p05Page(false); setApp003setMsg("") }}
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

        {/* //p06 */}

        <Container style={{ display: app003p06Page ? 'block' : 'none' }} fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Menu" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i> Tambah Role User</CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      app003p06ValidInput.handleSubmit();
                      return false;
                    }}>
                    <FormGroup className="mb-0">

                      <div className="mb-3 col-sm-3">
                        <Label>ID Role</Label>
                        <Input
                          name="roleid"
                          type="text"
                          disabled
                          maxLength={50}
                          onChange={app003p06ValidInput.handleChange}
                          value={app003p06ValidInput.values.roleid || ""}
                          invalid={
                            app003p06ValidInput.touched.roleid && app003p06ValidInput.errors.roleid ? true : false
                          }
                        />
                        {app003p06ValidInput.touched.roleid && app003p06ValidInput.errors.roleid ? (
                          <FormFeedback type="invalid">{app003p06ValidInput.errors.roleid}</FormFeedback>
                        ) : null}
                      </div>

                      <div>
                        <Lov title="User"
                          LenghtLabel=""
                          LenghtDiv="mb-3 col-sm-3"
                          columns={app003p06LovUserColumns}
                          getData={getUser}
                          pageSize={10}
                          // callbackFunc = {null}
                          // onChangeFunc = {null}
                          defaultSetInput="userId"
                          invalidData={app003p06ValidInput}
                          fieldValue="userId"
                          stateSearchInput={app003p06LovUser}
                          stateSearchInputSet={setapp003p06LovUser}
                          touchedLovField={app003p06ValidInput.touched.userId}
                          errorLovField={app003p06ValidInput.errors.userId}
                        />
                      </div>

                      <Button type="submit" color="primary" className="ms-1">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: app003p06Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                      </Button>&nbsp;

                      <Button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { setApp003p04Page(true); setApp003p06Page(false); setApp003setMsg("") }}
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

export default Role
