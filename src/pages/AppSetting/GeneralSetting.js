import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Row
} from "reactstrap"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { editGeneralSetting, getSettingData, resetMessage } from "store/appSetting/actions"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"

const GeneralSetting = (props) => {

    const dispatch = useDispatch()
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [generalMsgModal, setGeneralMsgModal] = useState(false)

    const appSettingData = useSelector(state => {
        return state.settingReducer.respGetSetting
    })

    const appEditMessage = useSelector(state => {
        return state.settingReducer.msgEdit
    })

    const toggleMsgModal = () => {
        setGeneralMsgModal(!generalMsgModal)
    }

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getSettingData())
    }, [])

    useEffect(() => {
        if (appEditMessage.status === '1') {
            setAppSettingMsg(appEditMessage)
        } else if (appEditMessage.status === '0') {
            setAppSettingMsg(appEditMessage)
        } else {
            setAppSettingMsg('There are no modifications')
        }
        dispatch(getSettingData())
    }, [appEditMessage])

    const [radioValue1, setRadioValue1] = useState("")
    const [radioValue2, setRadioValue2] = useState("")
    const [radioValue3, setRadioValue3] = useState("")
    const [radioValueFileManage1, setRadioValueFileManage1] = useState("")
    const [radioValueFileManage2, setRadioValueFileManage2] = useState("")

    const handleRadioChange1 = (event) => {
        setRadioValue1(event.target.value)
    }

    const handleRadioChange2 = (event) => {
        setRadioValue2(event.target.value)
    }

    const handleRadioChange3 = (event) => {
        setRadioValue3(event.target.value)
    }

    const handleRadioChangeFile1 = (event) => {
        setRadioValueFileManage1(event.target.value)
        setFileManageSetting([event.target.value, radioValueFileManage2])
    }

    const handleRadioChangeFile2 = (event) => {
        setRadioValueFileManage2(event.target.value)
        setFileManageSetting([radioValueFileManage1, event.target.value])
    }

    const handleSaveGeneral = () => {
        const updatedSettings = []
        if (radioValue1 !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_display_setting")?.value.toString()) {
            updatedSettings.push({ ins_display_setting: radioValue1 })
        }
        if (radioValue2 !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_notice_setting")?.value.toString()) {
            updatedSettings.push({ ins_notice_setting: radioValue2 })
        }
        if (radioValue3 !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_notice2_setting")?.value.toString()) {
            updatedSettings.push({ ins_notice2_setting: radioValue3 })
        }
        if (radioValueFileManage1 !== appSettingData?.data?.setting?.find(setting => setting.id === "file_edit_setting")?.value.toString()) {
            updatedSettings.push({ file_edit_setting: radioValueFileManage1 })
        }
        if (radioValueFileManage2 !== appSettingData?.data?.setting?.find(setting => setting.id === "file_access_setting")?.value.toString()) {
            updatedSettings.push({ file_access_setting: radioValueFileManage2 })
        }
        if (updatedSettings.length > 0) {
            dispatch(editGeneralSetting(Object.assign({}, ...updatedSettings)))
        }
        toggleMsgModal()
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

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setAppSettingMsg}
            componentJsx={
                <Container fluid="true">
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
                                        {/* setting v2 */}
                                        <Row>
                                            <hr></hr>
                                            <Col md="12" lg="4" >
                                                <Row className="mb-2">
                                                    <b>{props.t("File Management Edit Permission")}</b>
                                                </Row>
                                                <Row>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="file_edit_setting"
                                                            value="0"
                                                            checked={radioValueFileManage1 === "0"}
                                                            onChange={handleRadioChangeFile1}
                                                        />
                                                        <span> </span>{props.t("All File Can Be Modified")}
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="file_edit_setting"
                                                            value="1"
                                                            checked={radioValueFileManage1 === "1"}
                                                            onChange={handleRadioChangeFile1}
                                                        />
                                                        <span> </span>{props.t("Only Your Own Group Can Be Modified")}
                                                    </label>
                                                </Row>
                                            </Col>
                                            <Col md="12" lg="4">
                                                <Row className="mb-2">
                                                    <b>{props.t("File Management Access Permission")}</b>
                                                </Row>
                                                <Row>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="file_access_setting"
                                                            value="0"
                                                            checked={radioValueFileManage2 === "0"}
                                                            onChange={handleRadioChangeFile2}
                                                        />
                                                        <span> </span>{props.t("All File Can Be Accessed")}
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="file_access_setting"
                                                            value="1"
                                                            checked={radioValueFileManage2 === "1"}
                                                            onChange={handleRadioChangeFile2}
                                                        />
                                                        <span> </span>{props.t("Only Your Own Group Can Be Accessed")}
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
                        </Col>
                    </Row>
                </Container>
            }
        />
    )
}

GeneralSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(GeneralSetting)