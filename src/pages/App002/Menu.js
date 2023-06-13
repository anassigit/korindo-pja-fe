import React, { useState, useEffect } from "react";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import DeleteModal from "../../common/DeleteModal";
import '../../config';
import RootPageCustom from '../../common/RootPageCustom';
import TableCustom from '../../common/TableCustom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  UncontrolledTooltip,
  CardHeader,
} from "reactstrap";

import { getMenuAlldata, resetMessage, deleteMenu } from "../../store/app002/actions"

import { useSelector, useDispatch } from "react-redux"
import MenuAdd from "./MenuAdd";
import MenuEdit from "./MenuEdit";

const Menu = () => {

  const dispatch = useDispatch();
  const [app002p01Page, setApp002p01Page] = useState(true)
  const [app002p02Page, setApp002p02Page] = useState(false)
  const [app002p03Page, setApp002p03Page] = useState(false)
  const [app002Msg, setApp002setMsg] = useState("")
  const [app002deleteModal, setApp002DeleteModal] = useState(false);
  const [app002p03Data, setApp002p03Data] = useState()

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch])

  //p01
  const [app002p01TabelSearch, setApp002p01TabelSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "menuid", order: "asc", search: { any: "" } });

  const app002p01MenuData = useSelector(state => {
    return state.MenuReduce.respGetMenus;
  });

  useEffect(() => {
    if (app002p01MenuData.status == "0") {
      setApp002setMsg(app002p01MenuData)
    }
  }, [app002p01MenuData])

  const app002p01TabelMenuColumns = [
    {
      dataField: "menuid",
      text: "ID Menu",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "title",
      text: "Nama Menu",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "moduleName",
      text: "ID Modul",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "parent",
      text: "Parent ID Menu",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "path",
      text: "URL",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "icon",
      text: "Icon",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "orderNo",
      text: "Order No",
      sort: true,
      hidden: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "bHide",
      text: "SHOW/HIDE",
      sort: true,
      hidden: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Aksi",
      headerStyle: { textAlign: 'center' },
      formatter: (cellContent, app002p01MenuData) => (
        <>
          <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
            <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app002p01PreEdit(app002p01MenuData)} />
            <UncontrolledTooltip placement="top" target="edittooltip">
              Ubah
            </UncontrolledTooltip>

            <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app002p01Delete(app002p01MenuData)} />
            <UncontrolledTooltip placement="top" target="deletetooltip">
              Hapus
            </UncontrolledTooltip>

          </div>
        </>
      ),
    },
  ]

  const app002p01PreAdd = () => {
    setApp002setMsg("")
    setApp002p01Page(false)
    setApp002p02Page(true)
  }

  const app002p01PreEdit = (app002p01MenuData) => {
    setApp002setMsg("")
    setApp002p03Data(app002p01MenuData)
    setApp002p01Page(false)
    setApp002p03Page(true)
  }

  const [app002p01MenuDelete, setApp002p01MenuDelete] = useState(null);

  const app002p01Delete = (app002p01MenuData) => {
    setApp002setMsg("")
    setApp002p01MenuDelete(app002p01MenuData);
    setApp002DeleteModal(true)
  }

  const app002HandleDeleteMenu = () => {
    if (app002p01MenuDelete.menuid) {
      dispatch(deleteMenu(app002p01MenuDelete));
      setApp002DeleteModal(false);
      setApp002p01MenuDelete(null)
    }
  }

  const app002p04Message = useSelector(state => {
    return state.MenuReduce.msgDelete;
  });

  useEffect(() => {
    if (app002p04Message.status == "1") {
      dispatch(getMenuAlldata(app002p01TabelSearch))
    }
    setApp002setMsg(app002p04Message);
  }, [app002p04Message])

  return (
    <RootPageCustom msgStateGet={app002Msg} msgStateSet={setApp002setMsg}
      componentJsx={
        <>
          <DeleteModal
            show={app002deleteModal}
            onDeleteClick={app002HandleDeleteMenu}
            onCloseClick={() => setApp002DeleteModal(false)}
          />

          <Container style={{ display: app002p01Page ? 'block' : 'none' }} fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Maintain Menu" />

            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="bx bx-list-check font-size-18 align-middle me-2"></i>List Menu
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
                                value={app002p01TabelSearch.any}
                                onChange={e => {
                                  setApp002p01TabelSearch({
                                    page: app002p01TabelSearch.page, limit: app002p01TabelSearch.limit, offset: app002p01TabelSearch.offset,
                                    sort: app002p01TabelSearch.sort, order: app002p01TabelSearch.order, search: { any: e.target.value }
                                  })
                                }}
                              />
                              <div className="input-group-append">
                                <button className="btn btn-dark" type="button"
                                  onClick={() => {
                                    dispatch(getMenuAlldata(app002p01TabelSearch))
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
                              onClick={() => { app002p01PreAdd() }}
                            >
                              <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                              Tambah
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <TableCustom
                          keyField={"menuid"}
                          columns={app002p01TabelMenuColumns}
                          redukResponse={app002p01MenuData}
                          appdata={app002p01MenuData.data != null ? app002p01MenuData.data.menu : []}
                          appdataTotal={app002p01MenuData.data != null ? app002p01MenuData.data.menutotal : 0}
                          searchSet={setApp002p01TabelSearch}
                          searchGet={app002p01TabelSearch}
                          redukCall={getMenuAlldata}
                        />
                      </Row>
                    </React.Fragment>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          <MenuAdd
            app002p02Page={app002p02Page}
            setApp002p02Page={setApp002p02Page}
            setApp002setMsg={setApp002setMsg}
            setApp002p01Page={setApp002p01Page}
            app002p01TabelSearch={app002p01TabelSearch} />

          <MenuEdit
            app002p03Page={app002p03Page}
            setApp002p03Page={setApp002p03Page}
            setApp002setMsg={setApp002setMsg}
            setApp002p01Page={setApp002p01Page}
            app002p03Data={app002p03Data}
            app002p01TabelSearch={app002p01TabelSearch} />


        </>


      }
    />
  );
};

export default Menu  
