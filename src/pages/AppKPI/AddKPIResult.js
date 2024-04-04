import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Col, Row, InputGroup, UncontrolledTooltip, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getKPIFile, setKPINote } from 'store/actions'
import { resetMessage } from 'store/appSetting/actions'
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
import '../../assets/scss/custom/components/custom-datepicker.scss'
import FileTables from 'pages/AppFileManagement/FileTables'
import FileTable from './FileTable'

const AddKPIResult = (props) => {
    const dispatch = useDispatch()
    const [addKPIResultSpinner, setAddKPIResultSpinner] = useState(false)
    const [successClose, setSuccessClose] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedKpiId, setSelectedKpiId] = useState("")
    const [selectedFileNum, setSelectedFileNum] = useState("")
    const [pageNum, setPageNum] = useState("0")
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [addKPIResultContentModal, setAddKPIResultContentModal] = useState("")
    const [addKPIResultMsg, setAddKPIResultMsg] = useState(false)
    const [detailModalMonthly, setDetailModalMonthly] = useState(false)

    const setKPINoteMessage = useSelector(state => {
        return state.kpiReducer.msgEdit
    })

    const appFileListData = useSelector(state => {
        return state.kpiReducer.respGetKPIFile
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (props.modal === true) {
            setSelectedDate(props.date)
            setSelectedKpiId(props.kpiId)
            dispatch(getKPIFile({
                groupNum: props.groupNum,
                date: props.date.replace(/-/g, "")
            }))
        }
    }, [props.toggle])

    useEffect(() => {
        if (selectedDate) {
            dispatch(getKPIFile({
                groupNum: props.groupNum,
                date: selectedDate.replace(/-/g, "")
            }))
        }
    }, [selectedDate])

    useEffect(() => {
        if (setKPINoteMessage.status == "1") {
            setSuccessClose(true)
            setAddKPIResultMsg(setKPINoteMessage)
        } else {
            setSuccessClose(false)
        }
        setAddKPIResultContentModal(setKPINoteMessage.message)
        setAddKPIResultSpinner(false)
    }, [setKPINoteMessage])

    const toggleMsgModal = () => {
        props.setAddKPIResultMsgModal(!props.addKPIResultMsgModal)
        if (addKPIResultMsg.status === "1") {
            props.toggle()
            setAddKPIResultMsg('')
            setSelectedFileNum("")
            setPageNum("")
        }
    }

    const handleClick = () => {
        setAddKPIResultSpinner(true)
        dispatch(setKPINote({
            kpiId: selectedKpiId,
            num: selectedFileNum,
            page: pageNum === "" ? 0 : pageNum
        }))
    }

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

    const toggleDetailModalMonthly = () => {
        setDetailModalMonthly(!detailModalMonthly)
    }

    return (
        <Modal size={appFileListData?.data?.list?.count > 2 ? 'lg' : 'md'} style={{ width: appFileListData?.data?.list?.count > 2 ? '650px' : '50vw' }} isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal2
                modal={props.addKPIResultMsgModal}
                toggle={toggleMsgModal}
                message={addKPIResultContentModal}
                setIsClosed={setIsClosed}
                successClose={successClose}
            />
            <FileTable
                modal={detailModalMonthly}
                toggle={toggleDetailModalMonthly}
                appFileListData={appFileListData}
                currentSelectedFileNum={selectedFileNum}
                setCurrentSelectedFileNum={setSelectedFileNum}
            />
            <ModalHeader toggle={props.toggle} className='add-kpi-result-header-modal'>
                <div className='wrapper-class'>
                    <span style={{ width: 'inherit' }}>Add KPI Result</span>
                    <InputGroup style={{ flexWrap: 'unset', display: 'flex', justifyContent: "right", width: "50%" }}>
                        <div style={{ width: '100px' }}>
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
                                className="form-control custom-reset-date kpi-result-datepicker"
                                showMonthYearPicker
                                dateFormat="yyyy-MM"
                                selected={selectedDate ? moment(selectedDate, 'yyyy-MM').toDate() : new Date()}
                                onChange={(date) => {
                                    setShowDatePicker(false)
                                    setIsButtonClicked(false)
                                    setSelectedDate(date ? moment(date).format('yyyy-MM') : new Date())
                                    setSelectedFileNum("")
                                    setPageNum("")
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                }}
                                customInput={
                                    <>
                                        <div className="react-datepicker__input-container">
                                            <input
                                                type="text"
                                                className="form-control custom-reset-date kpi-result-datepicker"
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
                <div className="text-center d-flex" style={{ marginTop: "-5%" }}>
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
                                                    />
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
                                                >
                                                    {file.name}
                                                </div>
                                                <UncontrolledTooltip placement="top" target={`fileName_${index}_${index}`}>
                                                    {file.name}
                                                </UncontrolledTooltip>
                                            </Col>
                                        ) : (
                                            <Col className="files" style={{ height: "12vh", borderRadius: "10px", backgroundColor: selectedFileNum === file.num.toString() ? "silver" : "" }} key={index}>
                                                <div style={{ position: "relative", textAlign: "center" }}>
                                                    <img onClick={() => setSelectedFileNum(file.num.toString())} style={{
                                                        height: '50px',
                                                        marginTop: '24px',
                                                        cursor: "pointer"
                                                    }}
                                                        src={getFileIconClass(file.name)}
                                                    />
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
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '150px',
                                                            textOverflow: 'ellipsis',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                        }}>
                                                        {file.name}</span>
                                                </div>

                                                <UncontrolledTooltip placement="top" target={`fileName_${index}_${index}`}>
                                                    {file.name}
                                                </UncontrolledTooltip>
                                            </Col>
                                        )
                                    ) : (
                                        index === 3 ? (
                                            <Col md='2' style={{ marginTop: "2%" }} className="files" key={index}>
                                                <a
                                                    style={{
                                                        fontSize: "50px",
                                                        color: "#7BAE40",
                                                        opacity: "0.75",
                                                        cursor: "pointer"
                                                    }}
                                                    className="mdi mdi-dots-horizontal"
                                                    onClick={() => toggleDetailModalMonthly()}
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
                                    color: "#BBBCBE",
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
                                }}
                            >
                                {props.t('No File')}
                            </div>
                        </Col>
                    )}
                </div>
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
            <ModalFooter style={{ justifyContent: "space-between", display: 'flex' }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: '100%',
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
                            value={pageNum}
                            style={{ width: '50%' }}
                            onChange={e => {
                                try {
                                    setPageNum(e.target.value)
                                } catch (error) {
                                    setPageNum("0")
                                }
                            }}
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
                            onClick={selectedFileNum !== "" ? () => {
                                handleClick()
                                toggleMsgModal()
                            } : null}
                            color={(addKPIResultSpinner || selectedFileNum === "") ? "primary disabled" : "primary"}
                        >
                            Submit
                            <Spinner style={{
                                display: addKPIResultSpinner ? "block" : "none",
                                marginTop: '-27px',
                                zIndex: 2,
                                position: "absolute"
                            }} className="ms-4" color="danger" />
                        </Button>
                        <Button color="danger" onClick={() => {
                            props.toggle()
                            setSelectedFileNum("")
                            setPageNum("")
                        }}>
                            Close
                        </Button>
                    </Col>
                </div>
            </ModalFooter>
        </Modal>
    )
}

AddKPIResult.propTypes = {
    addKPIResultMsgModal: PropTypes.any,
    setAddKPIResultMsgModal: PropTypes.any,
    modal: PropTypes.any,
    toggle: PropTypes.any,
    groupNum: PropTypes.any,
    date: PropTypes.any,
    kpiId: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(AddKPIResult)