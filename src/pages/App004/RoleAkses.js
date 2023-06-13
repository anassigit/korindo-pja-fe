import React, { useState, useEffect } from "react";
import DeleteModal from "../../common/DeleteModal";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import '../../config';
import RootPageCustom from '../../common/RootPageCustom';
import TableCustom from '../../common/TableCustom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  UncontrolledTooltip,
} from "reactstrap";

import { getRoAksesData, getRoAksesUserData, getRoAksesPlantData, editRoAkses, resetMessage, saveRoAkses, deleteRoAkses, saveRoAksesUser, deleteRoAksesUser, saveRoAksesPlant, deleteRoAksesPlant } from "../../store/app004/actions"
import { useSelector, useDispatch } from "react-redux"
import Lovv2 from "../../common/Lovv2";
import { getUser, getDiv } from "../../store/lov/actions"

import RoleAksesAdd from "./RoleAksesAdd";
import RoleAksesEdit from "./RoleAksesEdit";
import RoleAksesDetail from "./RoleAksesDetail";

const RoleAkses = () => {

  const dispatch = useDispatch();
  const [app004p01Page, setApp004p01Page] = useState(true)
  const [app004p02Page, setApp004p02Page] = useState(false)
  const [app004p03Page, setApp004p03Page] = useState(false)
  const [app004p04Page, setApp004p04Page] = useState(false)
  const [appDetailPage, setAppDetailPage] = useState(false)

  const [app004p01RoAksesId, setApp004p01RoAksesId] = useState('');

  const [app004Msg, setApp004setMsg] = useState("")
  const [app004DeleteRoleAkses, setApp004DeleteRoleAkses] = useState(false)

  const [app004DeleteRoleAksesPlant, setApp004DeleteRoleAksesPlant] = useState(false)
  const [app004DeleteRoleAksesUser, setApp004DeleteRoleAksesUser] = useState(false)

  const [app004p03Data, setApp004p03Data] = useState()
  const [app004p04Data, setApp004p04Data] = useState()
  const [app004p05Data, setApp004p05Data] = useState()

  useEffect(() => {
    dispatch(resetMessage());

  }, [dispatch])

  const [app004p01TabelSearch, setApp004p01TabelSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "roleAksesId", order: "asc", search: { any: "" } });

  const app004p01RoleAksesData = useSelector(state => {
    return state.RoleAksesReducer.respGetRoAkses;
  });

  useEffect(() => {
    if (app004p01RoleAksesData.status == "0") {
      setApp004setMsg(app004p01RoleAksesData)
    }
  }, [app004p01RoleAksesData])

  const app004p01TabelRoleAksesColumns = [
    {
      dataField: "roleAksesId",
      text: "Role Akses ID",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "roleAksesNm",
      text: "Nama Role Akses",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app004p01RoleAksesData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app004p01PreEdit(app004p01RoleAksesData)} />
            <UncontrolledTooltip placement="top" target="edittooltip">
              Ubah
            </UncontrolledTooltip>

            <i className="mdi mdi-file-check-outline font-size-18 text-info" id="detailtooltip" onClick={() => app004p01PreDetail(app004p01RoleAksesData)} />
            <UncontrolledTooltip placement="top" target="detailtooltip">
              Detil
            </UncontrolledTooltip>

            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app004p01Delete(app004p01RoleAksesData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>
          </div>
        </>
      ),
    },
  ]

  const app004p01PreAdd = () => {
    setApp004setMsg("")
    setApp004p01Page(false)
    setApp004p02Page(true)
    setAppDetailPage(false)
  }

  const app004p01PreEdit = (app004p01RoleAksesData) => {
    setApp004setMsg("")
    setApp004p03Data(app004p01RoleAksesData)
    setApp004p01Page(false)
    setApp004p03Page(true)
    setAppDetailPage(false)
  }

  const app004p01PreDetail = (app004p01RoleAksesData) => {
    setApp004setMsg("")
    setApp004p04Data(app004p01RoleAksesData)
    setApp004p01RoAksesId(app004p01RoleAksesData.roleAksesId)
    setApp004p01Page(false)
    setApp004p04Page(true)
    setAppDetailPage(true)
  }

  const [app004p01RoleAksesDelete, setApp004p01RoleAksesDelete] = useState(null);

  const app004p01Delete = (app004p01RoleAksesData) => {
    setApp004setMsg("")
    setApp004p01RoleAksesDelete(app004p01RoleAksesData);
    setApp004DeleteRoleAkses(true)
  }

  const app004HandleDeleteRoleAkses = () => {
    if (app004p01RoleAksesDelete.roleAksesId) {
      dispatch(deleteRoAkses(app004p01RoleAksesDelete));
      setApp004DeleteRoleAkses(false);
      setApp004p01RoleAksesDelete(null)
    }
  }

  const app004p04Message = useSelector(state => {
    return state.RoleAksesReducer.msgDelete;
  });

  useEffect(() => {
    if (app004p04Message.status == "1") {
      dispatch(getRoAksesData(app004p01TabelSearch))
      console.log('1');
    } else {
      console.log('2');
      if (appDetailPage) {
        console.log('2 - 1');
      } else {
        console.log('2 - 0');
      }
    }
    setApp004setMsg(app004p04Message);
  }, [app004p04Message])


  return (
    <RootPageCustom msgStateGet={app004Msg} msgStateSet={setApp004setMsg}
      componentJsx={
        <>

          <DeleteModal
            show={app004DeleteRoleAkses}
            onDeleteClick={app004HandleDeleteRoleAkses}
            onCloseClick={() => setApp004DeleteModal(false)}
          />


          <Container style={{ display: app004p01Page ? 'block' : 'none' }} fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Master Role Akses" />

            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="bx bx-list-check font-size-18 align-middle me-2"></i>List Role Akses
                  </CardHeader>
                  <CardBody>
                    <React.Fragment>
                      <Row className="mb-2">
                        <Col sm="2">
                          <div className="form-group m-0">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search ..."
                                value={app004p01TabelSearch.any}
                                onChange={e => {
                                  setApp004p01TabelSearch({
                                    page: app004p01TabelSearch.page, limit: app004p01TabelSearch.limit, offset: app004p01TabelSearch.offset,
                                    sort: app004p01TabelSearch.sort, order: app004p01TabelSearch.order, search: { any: e.target.value }
                                  })

                                }
                                }
                              />
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="button"
                                  onClick={() => {
                                    dispatch(getRoAksesData(app004p01TabelSearch))
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
                              onClick={() => { app004p01PreAdd() }}
                            >
                              <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                              Tambah
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <TableCustom
                          keyField={"roleAksesId"}
                          columns={app004p01TabelRoleAksesColumns}
                          redukResponse={app004p01RoleAksesData}
                          appdata={app004p01RoleAksesData.data != null ? app004p01RoleAksesData.data.roleakses : []}
                          appdataTotal={app004p01RoleAksesData.data != null ? app004p01RoleAksesData.data.roleaksestotal : 0}
                          searchSet={setApp004p01TabelSearch}
                          searchGet={app004p01TabelSearch}
                          redukCall={getRoAksesData}
                        />
                      </Row>
                    </React.Fragment>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          <RoleAksesAdd
            app004p02Page={app004p02Page}
            setApp004p02Page={setApp004p02Page}
            setApp004setMsg={setApp004setMsg}
            setApp004p01Page={setApp004p01Page}
            app004p01TabelSearch={app004p01TabelSearch}
            setAppDetailPage={setAppDetailPage}
          />

          <RoleAksesEdit
            app004p03Page={app004p03Page}
            setApp004p03Page={setApp004p03Page}
            setApp004setMsg={setApp004setMsg}
            setApp004p01Page={setApp004p01Page}
            app004p03Data={app004p03Data}
            app004p01TabelSearch={app004p01TabelSearch} />

          <RoleAksesDetail
            app004p04Page={app004p04Page}
            setApp004p04Page={setApp004p04Page}
            app004Msg={app004Msg}
            setApp004setMsg={setApp004setMsg}
            setApp004p01Page={setApp004p01Page}
            app004p04Data={app004p04Data}
            app004p01TabelSearch={app004p01TabelSearch}
            app004p01RoAksesId={app004p01RoAksesId}
            app004DeleteRoleAksesPlant={app004DeleteRoleAksesPlant}
            setApp004DeleteRoleAksesPlant={setApp004DeleteRoleAksesPlant}
            app004DeleteRoleAksesUser={app004DeleteRoleAksesUser}
            setApp004DeleteRoleAksesUser={setApp004DeleteRoleAksesUser}
            appDetailPage={appDetailPage}
            setAppDetailPage={setAppDetailPage}
          />
        </>
      }
    />
  );
};

export default RoleAkses  
