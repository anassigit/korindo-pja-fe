import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Row,
    UncontrolledAlert
} from "reactstrap"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { editGeneralSetting, getSettingData, resetMessage } from "store/Setting/actions"
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
            dispatch(getSettingData())
        } else if (appEditMessage.status === '0') {
            setAppSettingMsg(appEditMessage)
        }
    }, [appEditMessage])

    const [radioValue2, setRadioValue2] = useState("")
    const [radioValue3, setRadioValue3] = useState("")
    const [radioValueIOSButton, setRadioValueIOSButton] = useState("")

    const handleRadioChange2 = (event) => {
        setRadioValue2(event.target.value)
    }

    const handleRadioChange3 = (event) => {
        setRadioValue3(event.target.value)
    }

    const handleSaveGeneral = () => {
        const updatedSettings = []
        if (radioValue2 !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_notice_setting")?.value.toString()) {
            updatedSettings.push({ ins_notice_setting: radioValue2 })
        }
        if (radioValue3 !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_notice2_setting")?.value.toString()) {
            updatedSettings.push({ ins_notice2_setting: radioValue3 })
        }
        if (radioValueIOSButton !== appSettingData?.data?.setting?.find(setting => setting.id === "ins_button_setting")?.value.toString()) {
            updatedSettings.push({ ins_button_setting: radioValueIOSButton })
        }
        if (updatedSettings.length > 0) {
            dispatch(editGeneralSetting(Object.assign({}, ...updatedSettings)))
        }
        toggleMsgModal()
        setAppSettingMsg("")
    }

    useEffect(() => {
        if (appSettingData?.data?.setting && Array.isArray(appSettingData.data.setting)) {
            appSettingData.data.setting.forEach((setting) => {
                if (setting.id === "ins_notice_setting") {
                    setRadioValue2(setting.value.toString())
                } else if (setting.id === "ins_notice2_setting") {
                    setRadioValue3(setting.value.toString())
                } else if (setting.id === "ins_button_setting") {
                    setRadioValueIOSButton(setting.value.toString())
                }
            })
        }
    }, [appSettingData])

    return (
        <RootPageCustom
            componentJsx={
                <Container fluid="true">
                    {appSettingMsg !== "" ? <UncontrolledAlert toggle={() => { setAppSettingMsg("") }} color={appSettingMsg.status == "1" ? "success" : "danger"}>
                        {typeof appSettingMsg == 'string' ? null : appSettingMsg.message}</UncontrolledAlert> : null}
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                    <strong>General Setting</strong>
                                </CardHeader>
                                <CardBody>
                                    <React.Fragment>
                                        <Row className="mb-2">
                                            <Col md="12" lg="4">
                                                <Row className="mb-2">
                                                    <b>Notification Setting</b>
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
                                                        &nbsp;{props.t("Send Notifications")}
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="ins_notice_setting"
                                                            value="1"
                                                            checked={radioValue2 === "1"}
                                                            onChange={handleRadioChange2}
                                                        />
                                                        &nbsp;{props.t("Don't Send Notifications")}
                                                    </label>
                                                </Row>
                                            </Col>
                                            <Col md="12" lg="4">
                                                <Row className="mb-2">
                                                    <b>{props.t("Notification Target")}</b>
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
                                                        &nbsp;WhatsApp
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="ins_notice2_setting"
                                                            value="1"
                                                            checked={radioValue3 === "1"}
                                                            onChange={handleRadioChange3}
                                                        />
                                                        &nbsp;{props.t("Email")}
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="ins_notice2_setting"
                                                            value="2"
                                                            checked={radioValue3 === "2"}
                                                            onChange={handleRadioChange3}
                                                        />
                                                        &nbsp;{props.t("Both")}
                                                    </label>
                                                </Row>
                                            </Col>
                                            <Col md="12" lg="4">
                                                <Row className="mb-2">
                                                    <b>{props.t("Registration iOS Button")}</b>
                                                </Row>
                                                <Row>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="ins_button_setting"
                                                            value="0"
                                                            checked={radioValueIOSButton === "0"}
                                                            onChange={(e) => setRadioValueIOSButton(e.target.value)}
                                                        />
                                                        &nbsp;{props.t("Hide")}
                                                    </label>
                                                    <label>
                                                        <Input
                                                            type="radio"
                                                            name="ins_button_setting"
                                                            value="1"
                                                            checked={radioValueIOSButton === "1"}
                                                            onChange={(e) => setRadioValueIOSButton(e.target.value)}
                                                        />
                                                        &nbsp;{props.t("Show")}
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