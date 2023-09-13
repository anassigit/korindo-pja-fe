import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Row,
    Table,
    UncontrolledTooltip
} from "reactstrap";

import Pagination from "react-js-pagination"

import RootPageCustom from '../../common/RootPageCustom';
import '../../config';
import { deleteGroupMapping, deleteMembers, editGeneralSetting, getGroupListData, getMembersData, getRankListData, getRelationListData, getSettingData, msgEdit, resetMessage } from "store/appSetting/actions";
import TableCustom2 from "common/TableCustom2";
import MsgModal from "components/Common/MsgModal";
import AddMember from "./AddMember";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import EditMember from "./EditMember";
import ConfirmModal from "components/Common/ConfirmModal";
import TableCustomNoPagination from "common/TableCustomNoPagination";
import AddGroupMapping from "./AddGroupMapping";
import EditGroupMapping from "./EditGroupMapping";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

const Setting = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const history = useHistory()
    let memberId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
    let pId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).pname : "";


    const dispatch = useDispatch();
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [appSettingPage, setAppSettingPage] = useState(true)

    const [selectedMemberData, setSelectedMemberData] = useState()

    /* MODALS */
    const [confirmModal, setConfirmModal] = useState(false)
    const [confirmModal2, setConfirmModal2] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [isYes2, setIsYes2] = useState(false)

    const [generalMsgModal, setGeneralMsgModal] = useState(false)
    const [generalContentModal, setGeneralContentModal] = useState("")

    const [addMemberModal, setAddMemberModal] = useState(false)
    const [editMemberModal, setEditMemberModal] = useState(false)

    const [addGroupMappingModal, setAddGroupMappingModal] = useState(false)
    const [editGroupMappingModal, setEditGroupMappingModal] = useState(false)

    const [successClose, setSuccessClose] = useState(false)

    const appSettingData = useSelector(state => {
        return state.settingReducer.respGetSetting;
    });

    const appMembersData = useSelector(state => {
        return state.settingReducer.respGetMembers;
    });

    const appGroupListData = useSelector(state => {
        return state.settingReducer.respGetGroupList;
    });

    const appRelationListData = useSelector(state => {
        return state.settingReducer.respGetRelationList;
    });

    const appDeleteMessage = useSelector(state => {
        return state.settingReducer.msgDelete;
    });

    const toggleMsgModal = () => {
        setGeneralMsgModal(!generalMsgModal)
    }

    const toggleAddMemberModal = () => {
        setAddMemberModal(!addMemberModal)
    }

    const toggleEditMemberModal = () => {
        setEditMemberModal(!editMemberModal)
    }

    const toggleAddGroupMappingModal = () => {
        setAddGroupMappingModal(!addGroupMappingModal)
    }

    const toggleEditGroupMappingModal = () => {
        setEditGroupMappingModal(!editGroupMappingModal)
    }

    /* ENDS OF MODAL */

    const [appMembersTabelSearch, setAppMembersTabelSearch] = useState({
        page: 1, limit: 10, offset: 0, sort: "id", order: "desc", search: {
            any: "", langType: langType
        }
    })
    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroupListData({ search: {langType: langType}}))
        dispatch(getSettingData(appMembersTabelSearch))
        dispatch(getRelationListData())
    }, [])


    useEffect(() => {
        setAppMembersTabelSearch({
            page: appMembersTabelSearch.page, limit: appMembersTabelSearch.limit, offset: appMembersTabelSearch.offset, sort: appMembersTabelSearch.sort, order: appMembersTabelSearch.order, search: {
                any: appMembersTabelSearch.search, langType: langType
            }
        })
        dispatch(getGroupListData({ search: {langType: langType}}))
    }, [props.t, langType])

    useEffect(() => {
        dispatch(getSettingData(appMembersTabelSearch))
    }, [appMembersTabelSearch])


    const [radioValue1, setRadioValue1] = useState("")
    const [radioValue2, setRadioValue2] = useState("")
    const [radioValue3, setRadioValue3] = useState("")

    const [generalSetting, setGeneralSetting] = useState([radioValue1, radioValue2, radioValue3])

    const appMembersp01Tabel = [
        {
            dataField: "name",
            text: props.t("Name"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "id",
            text: props.t("ID"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "email",
            text: props.t("Email"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "hp",
            text: "HP",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "rname",
            text: props.t("Rank"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "pname",
            text: props.t("Permission"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "bgcolor",
            text: props.t("Background Color"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i style={{
                            width: "120px",
                            height: "16px",
                            borderRadius: "3px",
                            backgroundColor: cellContent,
                            display: "block",
                        }}
                        />
                    </div>
                </>
            ),
        },
        {
            dataField: "edit",
            isDummyField: true,
            text: props.t("Edit"),
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => appSettingPreEdit(data)} />
                        <UncontrolledTooltip placement="top" target="edittooltip">
                            {props.t("Edit")}
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
        {
            dataField: "delete",
            isDummyField: true,
            text: props.t("Delete"),
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => confirmToggle(data)} />
                        <UncontrolledTooltip placement="top" target="deletetooltip">
                            {props.t("Delete")}
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
    ]

    const handleRadioChange1 = (event) => {
        setRadioValue1(event.target.value)
        setGeneralSetting([event.target.value, radioValue2, radioValue3])
    };

    const handleRadioChange2 = (event) => {
        setRadioValue2(event.target.value)
        setGeneralSetting([radioValue1, event.target.value, radioValue3])
    };

    const handleRadioChange3 = (event) => {
        setRadioValue3(event.target.value)
        setGeneralSetting([radioValue1, radioValue2, event.target.value])
    };

    const handleSaveGeneral = () => {
        dispatch(editGeneralSetting({ ins_display_setting: radioValue1, ins_notice_setting: radioValue2, ins_notice2_setting: radioValue3 }))
        if (appSettingData.message != "Fail") {
            setSuccessClose(true)
            setGeneralContentModal("Success")
        } else {
            setSuccessClose(false)
            setGeneralContentModal("Failed")
        }
        toggleMsgModal()
    }

    const appSettingPreEdit = (e) => {
        setSelectedMemberData(e)
        toggleEditMemberModal()
    }

    const appGroupMappingPreEdit = (e) => {
        setSelectedMemberData(e)
        toggleEditGroupMappingModal()
    }

    useEffect(() => {
        if (appSettingData?.data?.setting && Array.isArray(appSettingData.data.setting)) {
            appSettingData.data.setting.forEach((setting) => {
                if (setting.id === "ins_display_setting") {
                    setRadioValue1(setting.value.toString())
                } else if (setting.id === "ins_notice_setting") {
                    setRadioValue2(setting.value.toString())
                } else if (setting.id === "ins_notice2_setting") {
                    setRadioValue3(setting.value.toString())
                }
            });
        }
        setGeneralSetting([radioValue1, radioValue2, radioValue3])
    }, [appSettingData])

    /* TABLE FROM HERE */

    const [currentPage, setCurrentPage] = useState(1);

    const groupList = appGroupListData?.data?.groupList || [];
    const totalItems = groupList.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const confirmToggle = (val) => {
        if (val) {
            setSelectedMemberData(val)
        }
        setConfirmModal(!confirmModal)
    }

    const confirmToggle2 = (val) => {
        if (val) {
            setSelectedMemberData(val)
        }
        setConfirmModal2(!confirmModal2)
    }

    useEffect(() => {
        if (isYes === true) {
            let id = selectedMemberData?.id.toString()
            dispatch(deleteMembers({ id }))
            setAppMembersTabelSearch(
                {
                    page: 1, limit: 10, offset: 0, sort: "id", order: "desc", search: {
                        any: "", langType: "eng"
                    }
                }
            )
        }
    }, [isYes])

    useEffect(() => {
        if (isYes2 === true) {
            let num = selectedMemberData?.num.toString()
            dispatch(deleteGroupMapping({ num }))
        }
    }, [isYes2])

    useEffect(() => {
        if (appDeleteMessage.status === '1') {
            window.location.reload()
        }
    }, [appDeleteMessage])

    /* ENDED HERE */

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setAppSettingMsg}
            componentJsx={
                <>
                    {/* DELETE MEMBER */}
                    <ConfirmModal
                        modal={confirmModal}
                        toggle={confirmToggle}
                        message={props.t("Are you sure to delete this?")}
                        setIsYes={setIsYes}
                    />
                    {/* DELETE RELATION */}
                    <ConfirmModal
                        modal={confirmModal2}
                        toggle={confirmToggle2}
                        message={props.t("Are you sure to delete this?")}
                        setIsYes={setIsYes2}
                    />
                    <MsgModal
                        modal={generalMsgModal}
                        toggle={toggleMsgModal}
                        message={generalContentModal}
                        successClose={successClose}
                    />
                    <AddMember
                        modal={addMemberModal}
                        toggle={toggleAddMemberModal}
                        appMembersTabelSearch={appMembersTabelSearch}
                    />
                    <EditMember
                        modal={editMemberModal}
                        toggle={toggleEditMemberModal}
                        data={selectedMemberData}
                        appMembersTabelSearch={appMembersTabelSearch}
                    />
                    <AddGroupMapping
                        modal={addGroupMappingModal}
                        toggle={toggleAddGroupMappingModal}
                    />
                    <EditGroupMapping
                        modal={editGroupMappingModal}
                        toggle={toggleEditGroupMappingModal}
                        data={selectedMemberData}
                    />

                    <Container style={{ display: appSettingPage ? 'block' : 'none' }} fluid={true}>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>{props.t("General Settings")}</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <Col md="12" lg="4" >
                                                    <Row className="mb-2">
                                                        <b>{props.t("Instruction Display Settings")}</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_display_setting"
                                                                value="0"
                                                                checked={radioValue1 === "0"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            <span> </span>{props.t("Show Your Own Instruction")}
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_display_setting"
                                                                value="1"
                                                                checked={radioValue1 === "1"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            <span> </span>{props.t("Show All Instruction")}
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>{props.t("Notification Settings")}</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice_setting"
                                                                value="0"
                                                                checked={radioValue2 === "0"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            <span> </span>{props.t("Send Notifications")}
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice_setting"
                                                                value="1"
                                                                checked={radioValue2 === "1"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            <span> </span>{props.t("Don't Send Notifications")}
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>{props.t("Notification Settings 2")}</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="0"
                                                                checked={radioValue3 === "0"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>WhatsApp
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="1"
                                                                checked={radioValue3 === "1"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>{props.t("Email")}
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="2"
                                                                checked={radioValue3 === "2"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>{props.t("Both")}
                                                        </label>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col className="d-flex justify-content-end">
                                                    <div className="col-12 col-lg-2">
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            onClick={handleSaveGeneral}
                                                        >
                                                            {props.t("Apply")}
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>

                                <Row className="my-3 mt-5">
                                    <Col className="d-flex justify-content-end">
                                        <div className="col-12 col-lg-2">
                                            <button className="btn btn-primary w-100" onClick={toggleAddMemberModal}>
                                                <i className="fas fa-plus font-size-14  me-2"></i> {props.t("Add Member")}
                                            </button>
                                        </div>
                                    </Col>
                                </Row>

                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>{props.t("Members")}</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <TableCustom2
                                                    keyField={"id"}
                                                    columns={appMembersp01Tabel}
                                                    redukResponse={appMembersData}
                                                    appdata={appMembersData?.data?.memberList != null ? appMembersData?.data?.memberList : []}
                                                    appdataTotal={appMembersData?.data?.count != null ? appMembersData?.data?.count : 0}
                                                    searchSet={setAppMembersTabelSearch}
                                                    searchGet={appMembersTabelSearch}
                                                    redukCall={getMembersData}
                                                />
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>

                                <Row className="my-3 mt-5">
                                    <Col className="col-xl-9 d-flex justify-content-end">
                                        <div className="col-12 col-lg-3">
                                            <button className="btn btn-primary w-100" onClick={toggleAddGroupMappingModal}>
                                                <i className="fas fa-plus font-size-14"></i> {props.t("Add Group Mapping")}
                                            </button>
                                        </div>
                                    </Col>
                                </Row>

                                <Card className="col-xl-9">
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>{props.t("Group Mapping")}</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <Row className="mb-2">

                                            {appGroupListData && appGroupListData?.data?.groupList ? (
                                                appGroupListData?.data?.groupList.map((item, index) => {
                                                    // Filter the members based on groupName matching item.name
                                                    const filteredMembers = appRelationListData?.data?.relationList.filter(
                                                        (member) => member.groupId === item.num
                                                    );

                                                    return (
                                                        <div className="table-responsive table-secondary" key={index}>
                                                            <h2 className="pt-3"><strong>{item.name}</strong></h2>
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="text-center" scope="col">{props.t("Name (ID)")}</th>
                                                                        <th className="text-center" scope="col">{props.t("Edit")}</th>
                                                                        <th className="text-center" scope="col">{props.t("Delete")}</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {filteredMembers?.map((member) => (
                                                                        <tr key={member.memberId}>
                                                                            <td style={{ minWidth: "300px" }}>{member.memberName + " (" + member.memberId + ")"}</td>
                                                                            <td>
                                                                                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                                                                                    <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => appGroupMappingPreEdit(member)} />
                                                                                    <UncontrolledTooltip placement="top" target="edittooltip">
                                                                                        {props.t("Edit")}
                                                                                    </UncontrolledTooltip>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                                                                                    <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => confirmToggle2(member)} />
                                                                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                                                                        {props.t("Delete")}
                                                                                    </UncontrolledTooltip>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p>No group data available.</p>
                                            )}

                                        </Row>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>


                </>
            }
        />
    );


}

Setting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}
export default withTranslation()(Setting)