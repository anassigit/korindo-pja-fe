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
import RootPageCustom from '../../../common/RootPageCustom'
import '../../../config'
import { deleteGroupMapping, getGroupListData, getRelationListData, resetMessage } from "store/Setting/actions"
import MsgModal from "components/Common/MsgModal"
import ConfirmModal from "components/Common/ConfirmModal"
import AddGroupMapping from "./AddGroupMapping"
import EditGroupMapping from "./EditGroupMapping"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"

const OrganizationSetting = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch()
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [selectedMemberData, setSelectedMemberData] = useState()
    const [confirmModal, setConfirmModal] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [generalMsgModal, setGeneralMsgModal] = useState(false)
    const [generalContentModal, setGeneralContentModal] = useState("")
    const [addGroupMappingModal, setAddGroupMappingModal] = useState(false)
    const [editGroupMappingModal, setEditGroupMappingModal] = useState(false)
    const [successClose, setSuccessClose] = useState(false)

    const appSettingData = useSelector(state => {
        return state.settingReducer.respGetSetting
    })

    const appGroupListData = useSelector(state => {
        return state.settingReducer.respGetGroupList
    })

    const appRelationListData = useSelector(state => {
        return state.settingReducer.respGetRelationList
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

    const toggleAddGroupMappingModal = () => {
        setAddGroupMappingModal(!addGroupMappingModal)
    }

    const toggleEditGroupMappingModal = () => {
        setEditGroupMappingModal(!editGroupMappingModal)
    }

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroupListData({ search: { langType: langType } }))
        dispatch(getRelationListData())
    }, [])

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
                } else if (setting.id === "file_edit_setting") {
                    setRadioValueFileManage1(setting.value.toString())
                } else if (setting.id === "file_access_setting") {
                    setRadioValueFileManage2(setting.value.toString())
                }
            })
        }
    }, [appSettingData])

    const confirmToggle = (val) => {
        if (val) {
            setSelectedMemberData(val)
        }
        setConfirmModal(!confirmModal)
    }

    useEffect(() => {
        if (isYes === true) {
            let num = selectedMemberData?.num.toString()
            dispatch(deleteGroupMapping({ num }))
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
                    {addGroupMappingModal && <AddGroupMapping
                        modal={addGroupMappingModal}
                        toggle={toggleAddGroupMappingModal}
                    />}
                    {editGroupMappingModal && <EditGroupMapping
                        modal={editGroupMappingModal}
                        toggle={toggleEditGroupMappingModal}
                        data={selectedMemberData}
                    />}
                    <Container fluid="true">
                        <Row>
                            <Col>
                                <Row className="my-3">
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
                                                                    {appRelationListData?.data?.relationList.filter(
                                                                        (member) => member.groupId === item.num
                                                                    )?.map((member) => (
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
                                                                                    <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => confirmToggle(member)} />
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
                                                    )
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
    )
}

OrganizationSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(OrganizationSetting)