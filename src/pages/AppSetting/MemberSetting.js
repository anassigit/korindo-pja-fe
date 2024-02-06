import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { deleteMembers, getGroupListData, getMembersData, getSettingData, resetMessage } from "store/appSetting/actions"
import TableCustom2 from "common/TableCustom2"
import MsgModal from "components/Common/MsgModal"
import AddMember from "./AddMember"
import EditMember from "./EditMember"
import ConfirmModal from "components/Common/ConfirmModal"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"

const MemberSetting = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch()
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [selectedMemberData, setSelectedMemberData] = useState()
    const [confirmModal, setConfirmModal] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [generalMsgModal, setGeneralMsgModal] = useState(false)
    const [generalContentModal, setGeneralContentModal] = useState("")
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [editMemberModal, setEditMemberModal] = useState(false)
    const [successClose, setSuccessClose] = useState(false)

    const appMembersData = useSelector(state => {
        return state.settingReducer.respGetMembers
    })

    const appEditMessage = useSelector(state => {
        return state.settingReducer.msgEdit
    })

    const appDeleteMessage = useSelector(state => {
        return state.settingReducer.msgDelete
    })

    const toggleMsgModal = () => {
        setGeneralMsgModal(!generalMsgModal)
    }

    const toggleAddMemberModal = () => {
        setAddMemberModal(!addMemberModal)
    }

    const toggleEditMemberModal = () => {
        setEditMemberModal(!editMemberModal)
    }

    const [appMembersTabelSearch, setAppMembersTabelSearch] = useState({
        page: 1, limit: 10, offset: 0, sort: "id", order: "desc", search: {
            any: "", langType: langType
        }
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroupListData({ search: { langType: langType } }))
    }, [])

    useEffect(() => {
        setAppMembersTabelSearch({
            page: appMembersTabelSearch.page, limit: appMembersTabelSearch.limit, offset: appMembersTabelSearch.offset, sort: appMembersTabelSearch.sort, order: appMembersTabelSearch.order, search: {
                any: appMembersTabelSearch.search, langType: langType
            }
        })
        dispatch(getGroupListData({ search: { langType: langType } }))
    }, [props.t, langType])

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
            formatter: (cellContent, _data) => (
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
            ),
        },
        {
            dataField: "edit",
            isDummyField: true,
            text: props.t("Edit"),
            headerStyle: { textAlign: 'center' },
            formatter: (_cellContent, data) => (
                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                    <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => appSettingPreEdit(data)} />
                    <UncontrolledTooltip placement="top" target="edittooltip">
                        {props.t("Edit")}
                    </UncontrolledTooltip>
                </div>
            ),
        },
        {
            dataField: "delete",
            isDummyField: true,
            text: props.t("Delete"),
            headerStyle: { textAlign: 'center' },
            formatter: (_cellContent, data) => (
                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                    <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => confirmToggle(data)} />
                    <UncontrolledTooltip placement="top" target="deletetooltip">
                        {props.t("Delete")}
                    </UncontrolledTooltip>
                </div>
            )
        }
    ]

    const appSettingPreEdit = (e) => {
        setSelectedMemberData(e)
        toggleEditMemberModal()
    }

    const confirmToggle = (val) => {
        if (val) {
            setSelectedMemberData(val)
        }
        setConfirmModal(!confirmModal)
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
        if (appDeleteMessage.status === '1') {
            window.location.reload()
        }
    }, [appDeleteMessage])

    useEffect(() => {
        if (appEditMessage.status === '1') {
            setSuccessClose(true)
            setGeneralContentModal(appEditMessage?.message)
        } else if (appEditMessage.status === '0') {
            setSuccessClose(false)
            setGeneralContentModal(appEditMessage?.message)
        } else {
            setGeneralContentModal('There are no modifications')
            setSuccessClose(false)
        }
        dispatch(getMembersData(appMembersTabelSearch))
    }, [appEditMessage])

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setAppSettingMsg}
            componentJsx={
                <>
                    <ConfirmModal
                        modal={confirmModal}
                        toggle={confirmToggle}
                        message={props.t("Are you sure to delete this?")}
                        setIsYes={setIsYes}
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
                    <Container fluid="true">
                        <Row>
                            <Col>
                                <Row className="my-3">
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
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        />
    )
}

MemberSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MemberSetting)