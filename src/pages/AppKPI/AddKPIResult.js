import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Col, Row, InputGroup, UncontrolledTooltip } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { getKPIFile } from 'store/actions'
import { resetMessage, saveGroupMapping } from 'store/appSetting/actions'
import MsgModal2 from 'components/Common/MsgModal2'
import { withTranslation } from 'react-i18next'
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const AddKPIResult = (props) => {
    const dispatch = useDispatch()
    const [successClose, setSuccessClose] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")

    const [isClosed, setIsClosed] = useState(false)

    const [addKPIResultMsg, setAddKPIResultMsg] = useState(false)

    const addKPIResultMessage = useSelector(state => {
        return state.settingReducer.msgAdd
    })

    const appFileListData = useSelector(state => {
        return state.kpiReducer.respGetKPIFile
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const [addKPIResultMsgModal, setAddKPIResultMsgModal] = useState(false)
    const [addgroupmappingContentModal, setAddGroupMappingContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddKPIResultMsgModal(!addKPIResultMsgModal)
        if (addKPIResultMsg.status === "1") {
            props.toggle()
            setAddKPIResultMsg('')
            window.location.reload()
        }
    }

    useEffect(() => {
        if (props.modal === true) {
            setSelectedDate(props.date)
            dispatch(getKPIFile({
                groupNum: props.groupNum,
                date: props.date.replace(/-/g, "")
            }))
        }
    }, [props.toggle])

    useEffect(() => {
        if (addKPIResultMessage.status == "1") {
            setSuccessClose(true)
            setAddKPIResultMsg(addKPIResultMessage)
        } else {
            setSuccessClose(false)
        }
        setAddGroupMappingContentModal(addKPIResultMessage.message)
    }, [addKPIResultMessage])

    const getFileIconClass = (fileName) => {
        const fileExtensions = {
            media: [".jpg", ".png", ".img", ".gif", ".mp4", ".3gp", ".mov", ".mkv", ".webm", ".avi", ".MOV", ".ogg", ".wmv"],
            pdf: [".pdf"],
            documents: [".doc", ".docx", ".txt", ".rtf", ".odt", ".html", ".xml", ".csv", ".xls", ".xlsx", ".odp"],
            excel: [".xls", ".xlsx"],
            powerpoint: [".ppt", ".pptx"],
            txt: [".txt"],
        }

        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))

        if (fileExtensions.pdf.includes(extension)) {
            return pdf
        } else if (fileExtensions.excel.includes(extension)) {
            return xls
        } else if (fileExtensions.powerpoint.includes(extension)) {
            return ppt
        } else if (fileExtensions.txt.includes(extension)) {
            return txt
        } else if (fileExtensions.media.includes(extension)) {
            return media
        } else if (fileExtensions.documents.some(ext => extension === ext)) {
            return doc
        } else {
            return doc
        }
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal2
                modal={addKPIResultMsgModal}
                toggle={toggleMsgModal}
                message={addgroupmappingContentModal}
                setIsClosed={setIsClosed}
                successClose={successClose}
            />
            <ModalHeader toggle={props.toggle} className='add-kpi-result-header-modal'>
                <div className='wrapper-class'>
                    <span style={{ width: 'inherit' }}>Add KPI Result</span>
                    <InputGroup style={{ flexWrap: 'unset', display: 'flex', justifyContent: "right" }}>
                        <div style={{ width: '150px' }}>
                            <DatePicker
                                onClickOutside={() => {
                                    setShowDatePicker(false)
                                    setIsButtonClicked(false)
                                }}
                                onInputClick={() => {
                                    setShowDatePicker(!showDatePicker)
                                    setIsButtonClicked(false)
                                }}
                                open={showDatePicker}
                                className="form-control custom-reset-date"
                                showMonthYearPicker
                                dateFormat="yyyy-MM"
                                selected={selectedDate ? moment(selectedDate, 'yyyy-MM').toDate() : new Date()}
                                onChange={(date) => {
                                    setSelectedDate(date ? moment(date).format('yyyy-MM') : new Date())
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                }}
                                customInput={
                                    <>
                                        <div className="react-datepicker__input-container">
                                            <input
                                                type="text"
                                                className="form-control custom-reset-date"
                                                value={selectedDate ? moment(selectedDate).format('yyyy-MM') : moment().format('yyyy-MM')}
                                            />
                                        </div>
                                    </>
                                }
                            />
                        </div>
                        <Button onClick={(e) => {
                            if (!isButtonClicked) {
                                setShowDatePicker(!showDatePicker)
                                setIsButtonClicked(true)
                            }
                        }}>
                            <span className="mdi mdi-calendar" />
                        </Button>
                    </InputGroup>
                </div>
            </ModalHeader>
            <ModalBody>
                <Row className="text-center justify-content-center" style={{ marginTop: "-5%" }}>
                    {appFileListData?.data?.list?.count > 0 ? (
                        <>
                            {appFileListData?.data?.list?.fileList?.map((file, index) => {
                                return (
                                    index < 3 ? (
                                        appFileListData?.data?.list?.fileList?.count > 1 ? (
                                            <Col
                                                md={appFileListData?.data?.list?.fileList?.count > 3 ? '3' : (appFileListData?.data?.list?.fileList?.count === 2 ? '5' : '3')}
                                                style={{ height: "12vh" }}
                                                className="files"
                                                key={index}
                                            >
                                                <div style={{ position: "relative", textAlign: "center" }}>
                                                    <img style={{
                                                        height: '50px',
                                                        marginTop: '24px',
                                                        cursor: "pointer"
                                                    }}
                                                        src={getFileIconClass(file.name)}
                                                        onClick={appFileListData?.data?.list?.open ? () => window.open(new URL(file.url)) : null}
                                                    />
                                                    {appFileListData?.data?.list?.edit ?
                                                        <span
                                                            style={{
                                                                fontSize: "18px",
                                                                position: "absolute",
                                                                top: "4px",
                                                                left: "2.5em",
                                                                right: "0",
                                                                textAlign: "center",
                                                                color: "#B4B4B8",
                                                                cursor: "pointer"
                                                            }}
                                                            className="mdi mdi-delete"
                                                            onClick={() => confirmToggleDelete(file.num)}
                                                        ></span> : null}
                                                </div>
                                                <div
                                                    id={`fileName_${index}_${index}`}
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '3em',
                                                        fontSize: '11px',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        whiteSpace: 'normal',
                                                        textOverflow: 'ellipsis',
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                        margin: '0 auto',
                                                    }}
                                                    onClick={appFileListData?.data?.list?.open ? () => window.open(new URL(file.url)) : null}
                                                >
                                                    {file.name}
                                                </div>
                                                <UncontrolledTooltip placement="top" target={`fileName_${index}_${index}`}>
                                                    {file.name}
                                                </UncontrolledTooltip>
                                            </Col>
                                        ) : (
                                            <Col className="files" style={{ height: "12vh" }} key={index}>
                                                <div style={{ position: "relative", textAlign: "center" }}>
                                                    <img style={{
                                                        height: '50px',
                                                        marginTop: '24px',
                                                        cursor: "pointer"
                                                    }}
                                                        src={getFileIconClass(file.name)}
                                                        onClick={appFileListData?.data?.list?.open ? () => window.open(new URL(file.url)) : null}
                                                    />
                                                    {appFileListData?.data?.list?.edit ? <span
                                                        style={{
                                                            fontSize: "18px",
                                                            position: "absolute",
                                                            top: "4px",
                                                            left: "2.5em",
                                                            right: "0",
                                                            textAlign: "center",
                                                            color: "#B4B4B8",
                                                            cursor: "pointer"
                                                        }}
                                                        className="mdi mdi-delete"
                                                        onClick={() => confirmToggleDelete(file.num)}
                                                    ></span> : null}
                                                </div>
                                                <div
                                                    id={`fileName_${index}_${index}`}
                                                    style={{
                                                        width: '100%',
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        textAlign: "center",
                                                        marginLeft: "50%",
                                                        transform: "translateX(-50%)",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={appFileListData?.data?.list?.open ? () => window.open(new URL(file.url)) : null}
                                                >
                                                    {file.name}
                                                </div>

                                                <UncontrolledTooltip placement="top" target={`fileName_${index}_${index}`}>
                                                    {file.name}
                                                </UncontrolledTooltip>
                                            </Col>
                                        )
                                    ) : (
                                        index === 3 ? (
                                            <Col md='3' style={{ marginTop: "2%" }} className="files" key={index}>
                                                <a
                                                    style={{
                                                        fontSize: "50px",
                                                        color: appFileListData?.data?.list?.open ? "#7BAE40" : "#BBBCBE",
                                                        opacity: "0.75",
                                                        cursor: appFileListData?.data?.list?.open ? "pointer" : "default"
                                                    }}
                                                    className="mdi mdi-dots-horizontal"
                                                    onClick={appFileListData?.data?.list?.open ? () => toggleDetailModalMonthly(appFileListData?.data?.list?.num) : null}
                                                ></a>
                                            </Col>
                                        ) : null
                                    )
                                )
                            }
                            )}

                        </>
                    ) : (
                        <Col className="nofile" style={{ height: "12vh" }}>
                            <span
                                style={{
                                    fontSize: "50px",
                                        color: appFileListData?.data?.list?.open ? "#f46a6a" : "#BBBCBE",
                                    opacity: "0.75",
                                }}
                                className="mdi mdi-file-cancel-outline"
                            ></span>
                            <span
                                hidden
                                style={{
                                    fontSize: "18px",
                                    position: "absolute",
                                    top: "12%",
                                    left: "55%",
                                    color: "#B4B4B8",
                                    cursor: "pointer"
                                }}
                                className="mdi mdi-delete"
                            ></span>
                            <div
                                style={{
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    textAlign: "center",
                                    marginLeft: "50%",
                                    transform: "translateX(-50%)"
                                }}
                            >
                                {props.t('No File')}
                            </div>
                        </Col>
                    )}
                </Row>
                <Row className="align-items-center mt-3">
                    <Col className="col-8" style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "-5%"
                    }}>
                        {appFileListData?.data?.list?.name}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter style={{ justifyContent: "space-between" }}>
                <Row style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Col style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        width: "30%",
                        gap: ".75vw",
                    }}
                    >
                        <span style={{ marginTop: "8px" }}>Page</span>
                        <Input
                            type="number"
                            className="form-control"
                            onChange={e => setSearchVal(e.target.value)}
                            onKeyDown={e =>
                                e.key === "Enter" ? handleEnterKeyPress(e) : null
                            }
                        />
                    </Col>
                    <Col style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "right",
                        width: "30%",
                        gap: ".75vw",
                    }}
                    >
                        <Button
                            className="btn btn-primary btn-block"
                            onClick={() => handleClick()}
                        >
                            Submit
                        </Button>
                        <Button color="danger" onClick={props.toggle}>
                            {props.t("Close")}
                        </Button>
                    </Col>
                </Row>
            </ModalFooter>
        </Modal>
    )
}

AddKPIResult.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    groupNum: PropTypes.any,
    date: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(AddKPIResult)