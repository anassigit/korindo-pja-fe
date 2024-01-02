import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Lovv2 from "../../common/Lovv2";
import * as Yup from "yup";
import RootPageCustom from '../../common/RootPageCustom';
import classnames from "classnames"
import TableCustom from '../../common/TableCustom';
import DeleteModal from "../../common/DeleteModal";
import PropTypes from "prop-types";
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
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledTooltip,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux"
import { getRoAksesUserData, getRoAksesPlantData, deleteRoAksesUser, deleteRoAksesPlant } from "../../store/app004/actions"

import RoleAksesUserAdd from "./RoleAksesUserAdd";

const RoleAksesDetail = (props) => {

    const dispatch = useDispatch();
    const [app004p05Page, setApp004p05Page] = useState(false)
    const [app004p06Page, setApp004p06Page] = useState(false)

    const [app004p04ActiveTab, setApp004p04ActiveTab] = useState("1");
    const app004p04ClickTab = tab => {
        if (app004p04ActiveTab !== tab) {
            setApp004p04ActiveTab(tab);
        }
    };

    // ================================ ROLE AKSES PLANT ================================
    const [app004p04TabelRoAksesPlantReq, setApp004p04TabelRoAksesPlantReq] = useState({
        page: 1, limit: 10, offset: 0, sort: "roleAksesId", order: "asc", search: {
            any: "",
            roleAksesId: props.app004p04Data == undefined ? '' : props.app004p04Data.roleAksesId
        }
    });

    const app004p04RoAksesPlantData = useSelector(state => {
        return state.RoleAksesReducer.respGetRoAksesPlant;
    });

    useEffect(() => {
        if (props.appDetailPage) {
            if (props.app004p04Page) {
                setApp004p04TabelRoAksesPlantReq({
                    page: app004p04TabelRoAksesPlantReq.page, limit: app004p04TabelRoAksesPlantReq.limit, offset: app004p04TabelRoAksesPlantReq.offset,
                    sort: app004p04TabelRoAksesPlantReq.sort, order: app004p04TabelRoAksesPlantReq.order, search: { any: '', "roleAksesId": props.app004p04Data == undefined ? '' : props.app004p04Data.roleAksesId }
                })
                setApp004p04TabelRoAksesUserReq({
                    page: app004p04TabelRoAksesUserReq.page, limit: app004p04TabelRoAksesUserReq.limit, offset: app004p04TabelRoAksesUserReq.offset,
                    sort: app004p04TabelRoAksesUserReq.sort, order: app004p04TabelRoAksesUserReq.order, search: { any: '', "roleAksesId": props.app004p04Data == undefined ? '' : props.app004p04Data.roleAksesId }
                })
            }
        } else {
            props.setApp004p01Page(true)
            props.setApp004p04Page(false)
        }
    }, [props.app004p04Page])

    const app004p02TabelTabelRoAksesPlantColumns = [
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
            hidden: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "plantCd",
            text: "Kode Plant",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "plantNm",
            text: "Nama Plant",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "action",
            isDummyField: true,
            text: "Aksi",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, app004p04RoAksesPlantData) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">

                        <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app004p04DeletePlant(app004p04RoAksesPlantData)} />
                        <UncontrolledTooltip placement="top" target="deletetooltip">
                            Hapus
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
    ]

    const app004p04PreAddPlant = () => {
        props.setApp004setMsg("")
        props.setApp004p04Page(false)
        setApp004p05Page(true)
    }

    const [app004p01RoleAksesPlantDelete, setApp004p01RoleAksesPlantDelete] = useState(null);

    const app004p04DeletePlant = (app004p04RoAksesPlantData) => {
        props.setApp004setMsg("")
        setApp004p01RoleAksesPlantDelete(app004p04RoAksesPlantData);
        props.setApp004DeleteRoleAksesPlant(true)
    }

    const app004HandleDeleteRoleAksesPlant = () => {
        if (app004p01RoleAksesPlantDelete.plantCd) {
            dispatch(deleteRoAksesPlant(app004p01RoleAksesPlantDelete));
            props.setApp004DeleteRoleAksesPlant(false);
            setApp004p01RoleAksesPlantDelete(null)
        }
    }

    const app004p04Message = useSelector(state => {
        return state.RoleAksesReducer.msgDelete;
    });

    useEffect(() => {
        if (app004p04Message.status == "1") {
            dispatch(getRoAksesPlantData(app004p04TabelRoAksesPlantReq))
        }
        props.setApp004setMsg(app004p04Message);
    }, [app004p04Message])


    // ================================ ROLE AKSES USER ================================
    const [app004p04TabelRoAksesUserReq, setApp004p04TabelRoAksesUserReq] = useState({
        page: 1, limit: 10, offset: 0, sort: "roleAksesId", order: "asc", search: {
            any: "",
            roleAksesId: props.app004p04Data
        }
    });

    const app004p04RoAksesUserData = useSelector(state => {
        return state.RoleAksesReducer.respGetRoAksesUser;
    });

    const app004p02TabelTabelRoAksesUserColumns = [
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
            hidden: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "userId",
            text: "ID User",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "userFisrtNm",
            text: "Nama User",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "action",
            isDummyField: true,
            text: "Aksi",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, app004p04RoAksesUserData) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">

                        <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app004p04DeleteUser(app004p04RoAksesUserData)} />
                        <UncontrolledTooltip placement="top" target="deletetooltip">
                            Hapus
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
    ]

    const app004p04PreAddUser = () => {
        props.setApp004setMsg("")
        props.setApp004p04Page(false)
        props.setApp004p01Page(false)
        setApp004p06Page(true)
    }

    const [app004p01RoleAksesUserDelete, setApp004p01RoleAksesUserDelete] = useState(null);

    const app004p04DeleteUser = (app004p04RoAksesUserData) => {
        props.setApp004setMsg("")
        setApp004p01RoleAksesUserDelete(app004p04RoAksesUserData);
        props.setApp004DeleteRoleAksesUser(true)
    }

    const app004HandleDeleteRoleAksesUser = () => {
        if (app004p01RoleAksesUserDelete.userId) {
            dispatch(deleteRoAksesUser(app004p01RoleAksesUserDelete));
            props.setApp004DeleteRoleAksesUser(false);
            setApp004p01RoleAksesUserDelete(null)
        }
    }

    const app004p06Message = useSelector(state => {
        return state.RoleAksesReducer.msgDelete;
    });

    useEffect(() => {
        console.log('app004p06Message : ', app004p06Message)
        if (app004p06Message.status == "1") {
            dispatch(getRoAksesUserData(app004p04TabelRoAksesUserReq))
        }
        props.setApp004setMsg(app004p06Message);
    }, [app004p06Message])



    return (

        <>
            <DeleteModal
                show={props.app004DeleteRoleAksesPlant}
                onDeleteClick={app004HandleDeleteRoleAksesPlant}
                onCloseClick={() => setApp004DeleteModal(false)}
            />

            <DeleteModal
                show={props.app004DeleteRoleAksesUser}
                onDeleteClick={app004HandleDeleteRoleAksesUser}
                onCloseClick={() => setApp004DeleteModal(false)}
            />

            <Container style={{ display: props.app004p04Page ? 'block' : 'none' }} fluid="true">
                <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Akses" />

                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i>Detail Role Akses</CardHeader>
                            <CardBody>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: app004p04ActiveTab === "1",
                                            })}
                                            onClick={() => {
                                                app004p04ClickTab("1");
                                            }}
                                        >
                                            <span className="d-none d-sm-block">
                                                <i className="fas fa-landmark"></i> Role Akses Plant
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: app004p04ActiveTab === "2",
                                            })}
                                            onClick={() => {
                                                app004p04ClickTab("2");
                                            }}
                                        >
                                            <span className="d-none d-sm-block">
                                                <i className="fas fa-user"></i> Role Akses User
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={app004p04ActiveTab} className="p-3 text-muted">

                                    {/* ============================ TAB 1 ============================ */}
                                    <TabPane tabId="1">
                                        <Row className="mb-2">
                                            <Col sm="2">
                                                <div className="form-group m-0">
                                                    <div className="input-group mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search ..."
                                                            value={app004p04TabelRoAksesPlantReq.any}
                                                            onChange={e => {
                                                                setApp004p04TabelRoAksesPlantReq({
                                                                    page: app004p04TabelRoAksesPlantReq.page, limit: app004p04TabelRoAksesPlantReq.limit, offset: app004p04TabelRoAksesPlantReq.offset,
                                                                    sort: app004p04TabelRoAksesPlantReq.sort, order: app004p04TabelRoAksesPlantReq.order, search: { any: e.target.value, roleAksesId: props.app004p04Data.roleAksesId }
                                                                })

                                                            }
                                                            }
                                                        />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-dark" type="button"
                                                                onClick={() => {
                                                                    dispatch(getRoAksesPlantData(app004p04TabelRoAksesPlantReq))
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
                                                        onClick={() => { app004p04PreAddPlant() }}
                                                    >
                                                        <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                                        Tambah
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <TableCustom
                                                keyField={"id"}
                                                columns={app004p02TabelTabelRoAksesPlantColumns}
                                                redukResponse={app004p04RoAksesPlantData}
                                                appdata={app004p04RoAksesPlantData.data != null ? app004p04RoAksesPlantData.data.roleaksesplant : []}
                                                appdataTotal={app004p04RoAksesPlantData.data != null ? app004p04RoAksesPlantData.data.roleaksesplanttotal : 0}
                                                searchSet={setApp004p04TabelRoAksesPlantReq}
                                                searchGet={app004p04TabelRoAksesPlantReq}
                                                redukCall={getRoAksesPlantData}
                                            />
                                        </Row>
                                    </TabPane>

                                    {/* ============================ TAB 2 ============================ */}
                                    <TabPane tabId="2">
                                        <Row className="mb-2">
                                            <Col sm="2">
                                                <div className="form-group m-0">
                                                    <div className="input-group mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search ..."
                                                            value={app004p04TabelRoAksesUserReq.any}
                                                            onChange={e => {
                                                                setApp004p04TabelRoAksesUserReq({
                                                                    page: app004p04TabelRoAksesUserReq.page, limit: app004p04TabelRoAksesUserReq.limit, offset: app004p04TabelRoAksesUserReq.offset,
                                                                    sort: app004p04TabelRoAksesUserReq.sort, order: app004p04TabelRoAksesUserReq.order, search: { any: e.target.value, roleAksesId: props.app004p04Data.roleAksesId }
                                                                })

                                                            }
                                                            }
                                                        />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-dark" type="button"
                                                                onClick={() => {
                                                                    dispatch(getRoAksesUserData(app004p04TabelRoAksesUserReq))
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
                                                        onClick={() => { app004p04PreAddUser() }}
                                                    >
                                                        <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                                        Tambah
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <TableCustom
                                                keyField={"id"}
                                                columns={app004p02TabelTabelRoAksesUserColumns}
                                                redukResponse={app004p04RoAksesUserData}
                                                appdata={app004p04RoAksesUserData.data != null ? app004p04RoAksesUserData.data.roleaksesuser : []}
                                                appdataTotal={app004p04RoAksesUserData.data != null ? app004p04RoAksesUserData.data.roleaksesusertotal : 0}
                                                searchSet={setApp004p04TabelRoAksesUserReq}
                                                searchGet={app004p04TabelRoAksesUserReq}
                                                redukCall={getRoAksesUserData}
                                            />
                                        </Row>
                                    </TabPane>

                                </TabContent>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <div className="text-sm-end">
                    <button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => { props.setApp004p01Page(true); props.setApp004p04Page(false); props.setApp004setMsg(""); props.setAppDetailPage(false); }}
                    >
                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                        Back
                    </button>
                </div>
            </Container>

            <RoleAksesUserAdd
                app004p06Page={app004p06Page}
                setApp004p06Page={setApp004p06Page}
                setApp004setMsg={props.setApp004setMsg}
                setApp004p04Page={props.setApp004p04Page}
                app004p01RoAksesId={props.app004p01RoAksesId}
                setApp004p01Page={props.setApp004p01Page}
                app004p04TabelRoAksesUserReq={app004p04TabelRoAksesUserReq}
                appDetailPage={props.appDetailPage}
                setAppDetailPage={props.setAppDetailPage}
            />

        </>

    );

}
RoleAksesDetail.propTypes = {
    app004p04Page: PropTypes.any,
    setApp004p04Page: PropTypes.any,
    app004Msg: PropTypes.any,
    setApp004setMsg: PropTypes.any,
    setApp004p01Page: PropTypes.any,
    app004p04Data: PropTypes.any,
    app004p01RoAksesId: PropTypes.any,
    app004p04TabelRoAksesPlantReq: PropTypes.any,
    app004DeleteRoleAksesPlant: PropTypes.any,
    setApp004DeleteRoleAksesPlant: PropTypes.any,
    app004DeleteRoleAksesUser: PropTypes.any,
    setApp004DeleteRoleAksesUser: PropTypes.any,
    appDetailPage: PropTypes.any,
    setAppDetailPage: PropTypes.any
}

export default RoleAksesDetail