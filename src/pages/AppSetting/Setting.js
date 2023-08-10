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
import { editGeneralSetting, getMembersData, getRankListData, getSettingData, msgEdit, resetMessage } from "store/appSetting/actions";
import TableCustom2 from "common/TableCustom2";
import { updateGeneralSetting } from "helpers/backend_helper";
import MsgModal from "components/Common/MsgModal";
import AddMember from "./AddMember";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const Setting = () => {

    const history = useHistory()
    let memberId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
    let pId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).pname : "";

    const dispatch = useDispatch();
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [appSettingPage, setAppSettingPage] = useState(true)

    /* MODALS */
    const [generalMsgModal, setGeneralMsgModal] = useState(false)
    const [generalContentModal, setGeneralContentModal] = useState("")

    const toggleMsgModal = () => {
        setGeneralMsgModal(!generalMsgModal)
    }

    const [addMemberModal, setAddMemberModal] = useState(false)

    const toggleAddMemberModal = () => {
        setAddMemberModal(!addMemberModal)
    }

    /* ENDS OF MODAL */

    const [appMembersTabelSearch, setAppMembersTabelSearch] = useState({
        page: 1, limit: 10, offset: 0, sort: "id", order: "desc", search: {
            any: "", langType: "kor"
        }
    });

    useEffect(() => {
        dispatch(resetMessage());
        dispatch(getSettingData(appMembersTabelSearch));
    }, [dispatch])

    const appSettingData = useSelector(state => {
        return state.settingReducer.respGetSetting;
    });

    const appMembersData = useSelector(state => {
        return state.settingReducer.respGetMembers;
    });

    const [radioValue1, setRadioValue1] = useState("")
    const [radioValue2, setRadioValue2] = useState("")
    const [radioValue3, setRadioValue3] = useState("")

    const [generalSetting, setGeneralSetting] = useState([radioValue1, radioValue2, radioValue3])

    const appMembersp01Tabel = [
        {
            dataField: "name",
            text: "Name",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "id",
            text: "Email",
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
            text: "Rank",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "pname",
            text: "Permission",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "bgcolor",
            text: "Background Color",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "edit",
            isDummyField: true,
            text: "Edit",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app008p01PreEdit(data)} />
                        <UncontrolledTooltip placement="top" target="edittooltip">
                            Ubah
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
        {
            dataField: "delete",
            isDummyField: true,
            text: "Delete",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app008p01Delete(data)} />
                        <UncontrolledTooltip placement="top" target="deletetooltip">
                            Hapus
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
    ]

    const appGroupp01Tabel = [
        {
            dataField: "memberName",
            text: "Name (Email)",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "edit",
            isDummyField: true,
            text: "Edit",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app008p01PreEdit(data)} />
                        <UncontrolledTooltip placement="top" target="edittooltip">
                            Ubah
                        </UncontrolledTooltip>
                    </div>
                </>
            ),
        },
        {
            dataField: "delete",
            isDummyField: true,
            text: "Delete",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, data) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                        <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app008p01Delete(data)} />
                        <UncontrolledTooltip placement="top" target="deletetooltip">
                            Hapus
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
            setGeneralContentModal("Update Success")
        } else {
            setGeneralContentModal("Update Failed")
        }
        toggleMsgModal()
    }

    const appSettingPreEdit = (e) => {
        null
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

    const [tempState, setTempState] = useState([]);

    const filterByGroupName = (data, groupName) => {
        return data.filter((item) => item.groupName === groupName);
    };

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setAppSettingMsg}
            componentJsx={
                <>
                    <MsgModal
                        modal={generalMsgModal}
                        toggle={toggleMsgModal}
                        message={generalContentModal}
                    />
                    <AddMember
                        modal={addMemberModal}
                        toggle={toggleAddMemberModal}
                    />

                    <Container style={{ display: appSettingPage ? 'block' : 'none' }} fluid={true}>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>General Settings</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <Col md="12" lg="4" >
                                                    <Row className="mb-2">
                                                        <b>Instruction Display Settings</b>
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
                                                            <span> </span>Show Your Own Instruction
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_display_setting"
                                                                value="1"
                                                                checked={radioValue1 === "1"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            <span> </span>Show All Instruction
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>Notification Settings</b>
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
                                                            <span> </span>Send Notifications
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice_setting"
                                                                value="1"
                                                                checked={radioValue2 === "1"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            <span> </span>Don&rsquo;t Send Notifications
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>Notification Settings 2</b>
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
                                                            <span> </span>Email
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="2"
                                                                checked={radioValue3 === "2"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>Both
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
                                                            Apply
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
                                                <i className="fas fa-plus font-size-14  me-2"></i> Add Member
                                            </button>
                                        </div>
                                    </Col>
                                </Row>

                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>Members</strong>
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
                                            <button className="btn btn-primary w-100">
                                                <i className="fas fa-plus font-size-14"></i> Add Group Mapping
                                            </button>
                                        </div>
                                    </Col>
                                </Row>

                                <Card className="col-xl-9">
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>Group Mapping</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <Row className="mb-2">
                                            {/* {appSettingData?.data?.groupList.map((num) => (
                                                <React.Fragment key={num.id}>
                                                    <Row className="mb-2">
                                                        <h2><strong>{num.name}</strong></h2>
                                                    </Row>
                                                    <Row>
                                                        <TableCustom2
                                                            keyField={"num"}
                                                            columns={appGroupp01Tabel}
                                                            redukResponse={appSettingData}
                                                            appdata={filterByGroupName(appSettingData?.data?.relationList, num.name)}
                                                            appdataTotal={appSettingData?.data?.relationList?.length != null ? appSettingData?.data?.relationList?.length : 0}
                                                            searchSet={setAppMembersTabelSearch}
                                                            searchGet={appMembersTabelSearch}
                                                            redukCall={getSettingData}
                                                        />
                                                       
                                                    </Row>
                                                </React.Fragment>
                                            ))} */}
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
export default Setting