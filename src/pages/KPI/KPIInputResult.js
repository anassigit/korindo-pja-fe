import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Input,
    InputGroup,
    Spinner,
    UncontrolledTooltip
} from "reactstrap"
import { getKPIInputData, getCorporationList, getGroupListKPI, resetMessage, getDownloadKPITemplate, getDownloadKPIExcel, setKPINoteToDelete, uploadKPIResult } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import DatePicker from "react-datepicker"
import moment from "moment"
import AddKPIResult from "./AddKPIResult"
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'
import ConfirmModal from "components/Common/ConfirmModal"
import PdfViewerModal from "components/Common/PdfViewerModal"
import UploadKPI from "./UploadKPI"

const KPIInputResult = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appKPIListData = useSelector((state) => {
        return state.kpiReducer.respGetKPIInputData
    })

    const appGroupListData = useSelector((state) => {
        return state.kpiReducer.respGetGroupListKpi
    })

    const appCorporationListData = useSelector((state) => {
        return state.kpiReducer.respGetCorporationList
    })

    const setKPINoteMessage = useSelector(state => {
        return state.kpiReducer.msgDelete
    })

    const toggleAddKPIResultModal = () => {
        setAddKPIResultModal(!addKPIResultModal)
    }

    const [appState, setAppState] = useState([])
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState("")
    const [selectedGroupNum, setSelectedGroupNum] = useState("")
    const [selectedCorporationId, setSelectedCorporationId] = useState("")
    const [selectedKpiId, setSelectedKpiId] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('yyyy-MM'))
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [addKPIResultModal, setAddKPIResultModal] = useState(false)
    const [confirmModalDelete, setConfirmModalDelete] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [selectedKpiIdToBeDeleted, setSelectedKpiIdToBeDeleted] = useState()
    const [selectedPageToBeDeleted, setSelectedPageToBeDeleted] = useState()
    const [modalPdfViewer, setModalPdfViewer] = useState(false)
    const [pdfUrl, setPdfUrl] = useState("")
    const [pdfPageNum, setPdfPageNum] = useState("")
    const [addKPIResultMsgModal, setAddKPIResultMsgModal] = useState(false)
    const [uploadModal, setUploadModal] = useState(false)

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getGroupListKPI({
            viewType: 2
        }))
    }, [])

    useEffect(() => {
        setLoadingSpinner(false)
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appGroupListData, appCorporationListData, appKPIListData])

    useEffect(() => {
        setSelectedCorporationId("")
        setAppState([])
        if (selectedGroupNum) {
            dispatch(getCorporationList({
                groupNum: selectedGroupNum
            }))
        }
    }, [selectedGroupNum])

    useEffect(() => {
        if (selectedCorporationId || (selectedGroupNum && selectedDate)) {
            setLoadingSpinner(true)
            dispatch(getKPIInputData({
                groupNum: selectedGroupNum,
                corporationId: selectedCorporationId,
                date: selectedDate.replace(/-/g, "")
            }))
        }
    }, [selectedCorporationId, selectedDate])

    useEffect(() => {
        if (appKPIListData.status === '1') {
            setAppState(appKPIListData.data.list)
        } else {
            setAppState([])
        }
    }, [appKPIListData])

    useEffect(() => {
        if (isYes && selectedKpiIdToBeDeleted && selectedPageToBeDeleted != null) {
            setLoadingSpinner(true);
            dispatch(setKPINoteToDelete({
                kpiId: selectedKpiIdToBeDeleted,
                num: -1,
                page: selectedPageToBeDeleted
            }))
            setAppKPIMsg('')
            setIsYes(false)
        }
    }, [isYes])

    useEffect(() => {
        if (setKPINoteMessage?.status == "1") {
            setSelectedKpiIdToBeDeleted(null)
            setSelectedPageToBeDeleted(null)
            setIsYes(false)
            setLoadingSpinner(true)
            dispatch(getKPIInputData({
                groupNum: selectedGroupNum,
                corporationId: selectedCorporationId,
                date: selectedDate.replace(/-/g, "")
            }))
        } else {
            setLoadingSpinner(false)
        }
        setAppKPIMsg(setKPINoteMessage)
    }, [setKPINoteMessage])

    const onMsgModalClosed = () => {
        setLoadingSpinner(true)
        dispatch(getKPIInputData({
            groupNum: selectedGroupNum,
            corporationId: selectedCorporationId,
            date: selectedDate.replace(/-/g, "")
        }))
    }

    const confirmToggleDelete = (e) => {
        if (e?.kpiId) {
            setSelectedKpiIdToBeDeleted(e.kpiId)
        }
        if (e?.page != null) {
            setSelectedPageToBeDeleted(e.page)
        }
        setConfirmModalDelete(!confirmModalDelete)
    }

    const toggleUploadModal = () => {
        setUploadModal(!uploadModal)
    }

    const downloadKPITemplate = async () => {
        try {
            dispatch(getDownloadKPITemplate({
                file_nm: 'KPI TEMPLATE.xlsx'
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const downloadExcel = async () => {
        try {
            dispatch(getDownloadKPIExcel({
                file_nm: 'KPI EXCEL.xlsx',
                year: selectedDate.substring(0, 4),
                corporationId: selectedCorporationId,
            }))
        } catch (error) {
            console.log(error)
        }
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

    const toggleModalPdf = (url, pageNum) => {
        if (url) setPdfUrl(url)
        setPdfPageNum(pageNum)
        setModalPdfViewer(!modalPdfViewer)
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <UploadKPI
                        modal={uploadModal}
                        toggle={toggleUploadModal}
                        onSuccess={() => {
                            setLoadingSpinner(true)
                            if (selectedCorporationId || (selectedGroupNum && selectedDate)) {
                                setLoadingSpinner(true)
                                dispatch(getKPIInputData({
                                    groupNum: selectedGroupNum,
                                    corporationId: selectedCorporationId,
                                    date: selectedDate.replace(/-/g, "")
                                }))
                            } else {
                                dispatch(getKPIInputData({
                                    groupNum: '',
                                    corporationId: '',
                                    date: selectedDate.replace(/-/g, "")
                                }))
                            }
                        }}
                        apiCall={uploadKPIResult}
                    />
                    <PdfViewerModal
                        modal={modalPdfViewer}
                        toggle={toggleModalPdf}
                        url={pdfUrl}
                        pageNum={pdfPageNum}
                    />
                    <ConfirmModal
                        modal={confirmModalDelete}
                        toggle={confirmToggleDelete}
                        message={"Are you sure to delete this?"}
                        setIsYes={setIsYes}
                    />
                    <AddKPIResult
                        addKPIResultMsgModal={addKPIResultMsgModal}
                        setAddKPIResultMsgModal={setAddKPIResultMsgModal}
                        modal={addKPIResultModal}
                        toggle={toggleAddKPIResultModal}
                        groupNum={selectedGroupNum}
                        date={selectedDate}
                        kpiId={selectedKpiId}
                        onMsgModalClosed={onMsgModalClosed}
                    />
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            Input Result
                        </CardHeader>
                        <CardBody>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <InputGroup style={{ flexWrap: 'unset' }}>
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
                                                    setShowDatePicker(false)
                                                    setIsButtonClicked(false)
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
                                                                readOnly
                                                                style={{ backgroundColor: "white", cursor: "default", userSelect: "none" }}
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
                                                setShowDatePicker(!showDatePicker);
                                                setIsButtonClicked(true)
                                            }
                                        }}>
                                            <span className="mdi mdi-calendar" />
                                        </Button>
                                    </InputGroup>
                                    <Input
                                        type="select"
                                        style={{ width: 'auto' }}
                                        value={selectedGroupNum}
                                        onChange={(e) => {
                                            setSelectedGroupNum(e.target.value)
                                        }}
                                    >
                                        <option value={''}>Select Group</option>
                                        {
                                            appGroupListData?.data?.list.map((item, index) => {
                                                let nameLang = langType === 'eng' ? item.name_eng : langType === 'kor' ? item.name_kor : item.name_idr
                                                return (
                                                    <option key={index} value={item.num}>
                                                        {nameLang}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <Input
                                        type="select"
                                        style={{ width: 'auto' }}
                                        value={selectedCorporationId}
                                        onChange={(e) => setSelectedCorporationId(e.target.value)}
                                    >
                                        {
                                            appCorporationListData?.data?.list?.length > 0 && selectedGroupNum ? (
                                                <>
                                                    <option value={''}>Select Corporation</option>
                                                    {
                                                        appCorporationListData?.data?.list.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.corporationId}>
                                                                    {item.corporationName}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                    <option value={''}>No Data</option>
                                            )
                                        }
                                    </Input>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '.75vw',
                                    }}
                                >
                                    <Button
                                        disabled={appState.length > 0 ? false : true}
                                        className={appState.length > 0 ? "" : "btn btn-dark opacity-25"}
                                        onClick={() => { downloadExcel() }}>
                                        <i className="mdi mdi-download" />{" "}
                                        Download Excel
                                    </Button>
                                    <Button onClick={() =>
                                        downloadKPITemplate()
                                    }>
                                        <i className="mdi mdi-download" />{" "}
                                        Download Template
                                    </Button>
                                    <Button onClick={() => toggleUploadModal()}>
                                        Upload
                                    </Button>
                                </div>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">KPI Category</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">Plan</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">Result</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">Catch Up</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appState.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1} style={{ textAlign: "right" }}>{item.plan.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                        <td colSpan={1} style={{ textAlign: "right" }}>{item.result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                        <td colSpan={1} style={{ textAlign: "center" }}>
                                                            {item.url ? (
                                                                <Col className="files" style={{ height: "12vh" }} key={index}>
                                                                    <div style={{ position: "relative", textAlign: "center" }}>
                                                                        <img
                                                                            style={{
                                                                                height: '50px',
                                                                                marginTop: '24px',
                                                                                cursor: "pointer"
                                                                            }}
                                                                            src={getFileIconClass(decodeURIComponent(item.url.split('/')[item.url.split('/').length - 1]))}
                                                                            onClick={item.url.endsWith(".pdf") ? () => toggleModalPdf(item.url, item.page) : () => window.open(new URL(item.url))}
                                                                        />
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
                                                                            onClick={() => confirmToggleDelete(item)}
                                                                        ></span>
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
                                                                        onClick={item.url.endsWith(".pdf") ? () => toggleModalPdf(item.url, item.page) : () => window.open(new URL(item.url))}
                                                                    >
                                                                        {decodeURIComponent(item.url.split('/')[item.url.split('/').length - 1])}
                                                                    </div>
                                                                    <UncontrolledTooltip placement="top" target={`fileName_${index}_${index}`}>
                                                                        {decodeURIComponent(item.url.split('/')[item.url.split('/').length - 1])}
                                                                    </UncontrolledTooltip>
                                                                </Col>
                                                            ) : (
                                                                <Button onClick={() => {
                                                                    setSelectedKpiId(item.kpiId.toString())
                                                                    toggleAddKPIResultModal()
                                                                }}>
                                                                    <i className="mdi mdi-plus fs-5 align-middle" /> Add
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
                    </div>
                </>
            }
        />
    )
}

KPIInputResult.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIInputResult)