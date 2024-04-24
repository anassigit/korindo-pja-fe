import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup,
    Spinner
} from "reactstrap"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getCorporationList, getDashboardKPI, getKPIItemList, resetMessage } from "store/actions"
import ReactEcharts from "echarts-for-react"
import DatePicker from "react-datepicker"
import moment from "moment"
import PdfViewerModal from "components/Common/PdfViewerModal"
import Swal from 'sweetalert2'

const KPIDashboard = (props) => {

    const dispatch = useDispatch()

    const appCorporationAndGroupListData = useSelector((state) => {
        return state.kpiReducer.respGetCorporationList
    })

    const appKPIItemListData = useSelector((state) => {
        return state.kpiReducer.respGetItemList
    })

    const appDashboardListData = useSelector((state) => {
        return state.kpiReducer.respGetDashboardKPI
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState('')
    const [isFilterByCorporation, setIsFilterByCorporation] = useState(false)
    const [selectedCorporationList, setSelectedCorporationList] = useState([])
    const [filterByCorporationOrGroup, setFilterByCorporationOrGroup] = useState(false)
    const [selectedGroupList, setSelectedGroupList] = useState([])
    const [selectedKPIItemList, setSelectedKPIItemList] = useState([])
    const [filterKPIItems, setFilterKPIItems] = useState(false)
    const [showFromDatePicker, setShowFromDatePicker] = useState(false)
    const [isFromDateButtonClicked, setIsFromDateButtonClicked] = useState(false)
    const [selectedFromDate, setSelectedFromDate] = useState(moment().format('yyyy-MM'))
    const [showToDatePicker, setShowToDatePicker] = useState(false)
    const [isToDateButtonClicked, setIsToDateButtonClicked] = useState(false)
    const [selectedToDate, setSelectedToDate] = useState(moment().format('yyyy-MM'))
    const [modalPdfViewer, setModalPdfViewer] = useState(false)
    const [pdfUrl, setPdfUrl] = useState("")
    const [pdfPageNum, setPdfPageNum] = useState("")
    const [ctrlKeyPressed, setCtrlKeyPressed] = useState(false)
    const [zoomStates, setZoomStates] = useState([])

    const chartRef = useRef(null);
    const divRef = useRef(null);

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getCorporationList({}))
    }, [])

    useEffect(() => {
        setLoadingSpinner(false)
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appCorporationAndGroupListData, appKPIItemListData, appDashboardListData])

    useEffect(() => {
        if (appCorporationAndGroupListData.status === '1') {
            setSelectedCorporationList(appCorporationAndGroupListData?.data?.corporationList.reduce((accumulator, group) => {
                return accumulator.concat(group.coporationList.map(corporation => ({ isChecked: false, ...corporation })))
            }, []))
            setSelectedGroupList(
                appCorporationAndGroupListData?.data?.groupList.map(group => ({
                    ...group,
                    isChecked: false
                }))
            )
            setAppKPIMsg(null)
        } else if (appCorporationAndGroupListData.status === '0') {
            setSelectedCorporationList([])
            setSelectedGroupList([])
            setAppKPIMsg(appCorporationAndGroupListData)
        } else {
            setAppKPIMsg(null)
        }
    }, [appCorporationAndGroupListData])

    useEffect(() => {
        if (appKPIItemListData.status === '1') {
            setSelectedKPIItemList(appKPIItemListData?.data?.list.map(item => ({
                ...item,
                isChecked: false
            })))
            setAppKPIMsg(null)
        } else if (appKPIItemListData.status === '0') {
            setSelectedKPIItemList([])
            setAppKPIMsg(appKPIItemListData)
        } else {
            setAppKPIMsg(null)
        }
    }, [appKPIItemListData])

    useEffect(() => {
        if (selectedCorporationList.some(corporation => corporation.isChecked)) {
            var bodyForm = new FormData()
            bodyForm.append('from', selectedFromDate.replace(/-/g, ""))
            bodyForm.append('to', selectedToDate.replace(/-/g, ""))
            selectedCorporationList
                .filter(corporation => corporation.isChecked)
                .forEach(corporation => {
                    bodyForm.append('corporationId', corporation.corporationId)
                })
            setAppKPIMsg(null)
            dispatch(getKPIItemList(bodyForm, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }))
        } else {
            setSelectedKPIItemList(null)
        }
    }, [selectedCorporationList])

    useEffect(() => {
        if (selectedGroupList.some(group => group.isChecked)) {
            var bodyForm = new FormData()
            bodyForm.append('from', selectedFromDate.replace(/-/g, ""))
            bodyForm.append('to', selectedToDate.replace(/-/g, ""))
            selectedGroupList
                .filter(group => group.isChecked)
                .forEach(group => {
                    bodyForm.append('groupNum', group.groupNum)
                })
            setAppKPIMsg(null)
            dispatch(getKPIItemList(bodyForm, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }))
        } else {
            setSelectedKPIItemList(null)
        }
    }, [selectedGroupList])

    useEffect(() => {
        if (appDashboardListData.status === '1') {
            if (appDashboardListData?.data?.resultList?.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "No data",
                    text: "There is no data!",
                    confirmButtonColor: "#7BAE40"
                })
            }
            setAppKPIMsg(null)
        } else if (appDashboardListData.status === '0') {
            setAppKPIMsg(appDashboardListData)
        } else {
            setAppKPIMsg(null)
        }
    }, [appDashboardListData])

    useEffect(() => {
        if (appDashboardListData?.data?.resultList) {
            const resultListSize = appDashboardListData.data.resultList.length
            const newZoomStates = Array(resultListSize).fill({ start: 0, end: 100 })
            setZoomStates(newZoomStates)
        }
    }, [appDashboardListData?.data?.resultList])

    const years = []

    for (let year = 2017; year <= new Date().getFullYear(); year++) {
        years.push(year)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const parseDateString = (dateString) => {
        if (!/^\d{4}-\d{2}$/.test(dateString)) return null
        const [year, month] = dateString.split('-').map(Number)
        return new Date(year, month - 1)
    }

    const getKPIDashboard = () => {

        if (!isFilterByCorporation) {
            if (!selectedGroupList.some(group => group.isChecked)) {
                setAppKPIMsg({
                    message: 'At least one group must be checked.'
                })
                return
            }
        } else {
            if (!selectedCorporationList.some(corporation => corporation.isChecked)) {
                setAppKPIMsg({
                    message: 'At least one corporation must be checked.'
                })
                return
            }
        }

        if (parseDateString(selectedFromDate) > parseDateString(selectedToDate)) {
            setAppKPIMsg({
                message: 'From date cannot be after to date.'
            })
            return
        }

        var bodyForm = new FormData()
        bodyForm.append('from', selectedFromDate.replace(/-/g, ""))
        bodyForm.append('to', selectedToDate.replace(/-/g, ""))
        if (!isFilterByCorporation) {
            selectedGroupList
                .filter(group => group.isChecked)
                .forEach(group => {
                    bodyForm.append('groupNum', group.groupNum)
                })
        } else {
            selectedCorporationList
                .filter(corporation => corporation.isChecked)
                .forEach(corporation => {
                    bodyForm.append('corporationId', corporation.corporationId)
                })
        }
        selectedKPIItemList?.filter(kpiItem => kpiItem.isChecked)
            .forEach(kpiItem => {
                bodyForm.append('kpiItemId', kpiItem.kpiItemId)
            })
        setAppKPIMsg(null)
        setLoadingSpinner(true)
        dispatch(getDashboardKPI(bodyForm, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }))
    }

    const handleCorporationCheckboxChange = (corporationId, toogleCheck) => {
        const newCheckboxes = [...selectedCorporationList]
        const foundIndex = newCheckboxes.findIndex(corporation => corporation.corporationId === corporationId)
        if (foundIndex !== -1) {
            newCheckboxes[foundIndex].isChecked = toogleCheck
        }
        setSelectedCorporationList(newCheckboxes)
    }

    const handleGroupCheckboxChange = (groupNum, toogleCheck) => {
        const newCheckboxes = [...selectedGroupList]
        const foundIndex = newCheckboxes.findIndex(group => group.groupNum === groupNum)
        if (foundIndex !== -1) {
            newCheckboxes[foundIndex].isChecked = toogleCheck
        }
        setSelectedGroupList(newCheckboxes)
    }

    const handleKPIItemCheckboxChange = (kpiId, toogleCheck) => {
        const newCheckboxes = [...selectedKPIItemList]
        const foundIndex = newCheckboxes.findIndex(kpiItem => kpiItem.kpiItemId === kpiId)
        if (foundIndex !== -1) {
            newCheckboxes[foundIndex].isChecked = toogleCheck
        }
        setSelectedKPIItemList(newCheckboxes)
    }

    const toggleModalPdf = (url, pageNum) => {
        if (url) setPdfUrl(url)
        setPdfPageNum(pageNum)
        setModalPdfViewer(!modalPdfViewer)
    }

    const onChartClick = (params, item) => {
        const file = item?.details[params.dataIndex]
        if (file && file.url) {
            file.url.endsWith(".pdf") ? toggleModalPdf(file.url, file.page) : window.open(new URL(file.url))
        }
    }

    const handleChartClick = useCallback((params, item) => {
        onChartClick(params, item)
    }, [onChartClick])

    const handleKeyDown = (event) => {
        if (event.ctrlKey) {
            setCtrlKeyPressed(true)
        }
    }

    const handleKeyUp = (event) => {
        if (!event.ctrlKey) {
            setCtrlKeyPressed(false)
        }
    }

    const handleDataZoom = (params, index) => {
        const { batch } = params
        if (batch && batch.length > 0) {
            const { start, end } = batch[0]
            setZoomStates(prevZoomStates => {
                const updatedZoomStates = [...prevZoomStates]
                updatedZoomStates[index] = { start, end }
                return updatedZoomStates
            })
        }
    }

    const debounce = (func, delay) => {
        let timeoutId
        return function (...args) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    const debouncedHandleDataZoom = debounce(handleDataZoom, 100)

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <PdfViewerModal
                        modal={modalPdfViewer}
                        toggle={toggleModalPdf}
                        url={pdfUrl}
                        pageNum={pdfPageNum}
                    />
                    <Card tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {props.t("KPI Dashboard")}
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
                                        flexDirection: 'row',
                                        width: '40%',
                                        gap: '.75vw'
                                    }}>
                                    <InputGroup style={{ flexWrap: 'unset', width: "300px" }}>
                                        <div style={{ width: '150px' }}>
                                            <DatePicker
                                                onClickOutside={() => {
                                                    setShowFromDatePicker(false)
                                                    setIsFromDateButtonClicked(false)
                                                }}
                                                onInputClick={() => {
                                                    setShowFromDatePicker(!showFromDatePicker)
                                                    setIsFromDateButtonClicked(false)
                                                }}
                                                open={showFromDatePicker}
                                                className="form-control custom-reset-date"
                                                showMonthYearPicker
                                                dateFormat="yyyy-MM"
                                                selected={selectedFromDate ? moment(selectedFromDate, 'yyyy-MM').toDate() : new Date()}
                                                onChange={(date) => {
                                                    setShowFromDatePicker(false)
                                                    setIsFromDateButtonClicked(false)
                                                    setSelectedFromDate(date ? moment(date).format('yyyy-MM') : new Date())
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
                                                                value={selectedFromDate ? moment(selectedFromDate).format('yyyy-MM') : moment().format('yyyy-MM')}
                                                            />
                                                        </div>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <Button onClick={(e) => {
                                            if (!isFromDateButtonClicked) {
                                                setShowFromDatePicker(!showFromDatePicker)
                                                setIsFromDateButtonClicked(true)
                                            }
                                        }}>
                                            <span className="mdi mdi-calendar" />
                                        </Button>
                                    </InputGroup>
                                    <InputGroup style={{ flexWrap: 'unset', width: "300px" }}>
                                        <div style={{ width: '150px' }}>
                                            <DatePicker
                                                onClickOutside={() => {
                                                    setShowToDatePicker(false)
                                                    setIsToDateButtonClicked(false)
                                                }}
                                                onInputClick={() => {
                                                    setShowToDatePicker(!showToDatePicker)
                                                    setIsToDateButtonClicked(false)
                                                }}
                                                open={showToDatePicker}
                                                className="form-control custom-reset-date"
                                                showMonthYearPicker
                                                dateFormat="yyyy-MM"
                                                selected={selectedToDate ? moment(selectedToDate, 'yyyy-MM').toDate() : new Date()}
                                                onChange={(date) => {
                                                    setShowToDatePicker(false)
                                                    setIsToDateButtonClicked(false)
                                                    setSelectedToDate(date ? moment(date).format('yyyy-MM') : new Date())
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
                                                                value={selectedToDate ? moment(selectedToDate).format('yyyy-MM') : moment().format('yyyy-MM')}
                                                            />
                                                        </div>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <Button onClick={(e) => {
                                            if (!isToDateButtonClicked) {
                                                setShowToDatePicker(!showToDatePicker)
                                                setIsToDateButtonClicked(true)
                                            }
                                        }}>
                                            <span className="mdi mdi-calendar" />
                                        </Button>
                                    </InputGroup>
                                    <Dropdown style={{ height: "30px" }} isOpen={filterByCorporationOrGroup} toggle={() => setFilterByCorporationOrGroup(!filterByCorporationOrGroup)} className="d-inline-block">
                                        <DropdownToggle style={{ paddingTop: "0", marginTop: "-3px" }} className="btn header-item" id="page-header-user-dropdown" tag="button">
                                            <Button style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', whiteSpace: "nowrap", display: "flex" }}>Filter Group & Corporation &nbsp;<span className="mdi mdi-filter" /></Button>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            {Array.isArray(appCorporationAndGroupListData?.data?.corporationList) && appCorporationAndGroupListData?.data?.corporationList.length > 0 ? (
                                                <React.Fragment>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                        }}
                                                    >
                                                        <a
                                                            className="dropdown-item"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'left',
                                                            }}
                                                        >
                                                            <FormGroup switch>
                                                                <Input
                                                                    type="switch"
                                                                    role="switch"
                                                                    checked={isFilterByCorporation}
                                                                    onClick={() => {
                                                                        if (!isFilterByCorporation) {
                                                                            const updatedItems = selectedGroupList.map(group => ({
                                                                                ...group,
                                                                                isChecked: false
                                                                            }));
                                                                            setSelectedGroupList(updatedItems);
                                                                        } else {
                                                                            const updatedItems = selectedCorporationList.map(corporation => ({
                                                                                ...corporation,
                                                                                isChecked: false
                                                                            }));
                                                                            setSelectedCorporationList(updatedItems);
                                                                        }
                                                                        setIsFilterByCorporation(!isFilterByCorporation)
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                            <a style={{ marginBottom: '0' }}>
                                                                &nbsp;{!isFilterByCorporation ? "Group" : "Corporation"}
                                                            </a>
                                                        </a>
                                                    </div>
                                                    {!isFilterByCorporation ? appCorporationAndGroupListData?.data?.groupList.map((grp, grpIndex) => (
                                                        <div
                                                            key={grpIndex}
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <a
                                                                className="dropdown-item"
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'left',
                                                                }}
                                                            >
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`checkbox${grp.groupNum + 1}`}
                                                                    checked={(selectedGroupList.find(group => group.groupNum === grp.groupNum))?.isChecked || false}
                                                                    onClick={(e) => handleGroupCheckboxChange(grp.groupNum, e.target.checked)}
                                                                />
                                                                <a style={{ marginBottom: '0' }}>
                                                                    &nbsp;{grp.groupName}
                                                                </a>
                                                            </a>
                                                        </div>
                                                    ))
                                                        : appCorporationAndGroupListData?.data?.corporationList.map((group, groupIndex) => (
                                                            <div
                                                                key={groupIndex}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    flexDirection: 'column',
                                                                }}
                                                            >
                                                                <span
                                                                    className="dropdown-item"
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'left',
                                                                    }}
                                                                >
                                                                    <a style={{ marginBottom: '0' }}>{group.name}</a>
                                                                </span>
                                                                {group.coporationList?.map((corp, corpIndex) => (
                                                                    <div
                                                                        key={corpIndex}
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            flexDirection: 'column',
                                                                        }}
                                                                    >
                                                                        <a
                                                                            className="dropdown-item"
                                                                            style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left',
                                                                            }}
                                                                        >
                                                                            <Input
                                                                                type="checkbox"
                                                                                id={`checkbox${corp.corporationId + 1}`}
                                                                                checked={(selectedCorporationList.find(corporation => corporation.corporationId === corp.corporationId))?.isChecked || false}
                                                                                onClick={(e) => handleCorporationCheckboxChange(corp.corporationId, e.target.checked)}
                                                                            />
                                                                            <a style={{ marginBottom: '0' }}>
                                                                                &nbsp;{corp.corporationName}
                                                                            </a>
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                                {groupIndex < (appCorporationAndGroupListData?.data?.corporationList?.length || 0) - 1 && <div className="dropdown-divider" />}
                                                            </div>
                                                        ))}
                                                </React.Fragment>
                                            ) : (
                                                <DropdownItem>{'No Data'}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown style={{ height: "30px" }} isOpen={filterKPIItems} toggle={() => setFilterKPIItems(!filterKPIItems)} className="d-inline-block">
                                        <DropdownToggle style={{ paddingTop: "0", marginTop: "-3px" }} className="btn header-item" id="page-header-user-dropdown" tag="button">
                                            <Button style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', whiteSpace: "nowrap", display: "flex" }}>Filter Category &nbsp; <span className="mdi mdi-filter" /></Button>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            {(Array.isArray(appKPIItemListData?.data?.list) && appKPIItemListData?.data?.list.length > 0) && selectedKPIItemList ? (
                                                <React.Fragment>
                                                    {appKPIItemListData?.data?.list.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <a
                                                                className="dropdown-item"
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'left',
                                                                }}
                                                            >
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`checkbox${item.kpiItemId + 1}`}
                                                                    checked={(selectedKPIItemList?.find(kpiItem => kpiItem.kpiItemId === item.kpiItemId))?.isChecked || false}
                                                                    onClick={(e) => handleKPIItemCheckboxChange(item.kpiItemId, e.target.checked)}
                                                                />
                                                                <a style={{ marginBottom: '0' }}>
                                                                    &nbsp;{item.itemName}
                                                                </a>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ) : (
                                                <DropdownItem>{'No Data'}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Button onClick={() => getKPIDashboard()} className="btn btn-primary">
                                        Search
                                    </Button>
                                </div>
                                <span style={{ color: 'red' }}>
                                    * Holding ctrl and mouse wheel triggers zoom.
                                </span>
                            </div>
                            {
                                appDashboardListData?.data?.resultList.map((item, index, array) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {(index === 0 || index !== 0 && item.name !== array[index - 1]?.name) && (
                                                <h3 className="my-2">
                                                    {item.name}
                                                </h3>
                                            )}
                                            <div className="mx-2">
                                                <h5 style={{ marginTop: '1.25vh' }}>
                                                    {item.item || "{'No Data'}"}
                                                </h5>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }} >
                                                <ReactEcharts
                                                    className="custom-chart"
                                                    option={{
                                                        tooltip: {
                                                            trigger: 'axis',
                                                            axisPointer: {
                                                                type: 'shadow'
                                                            },
                                                            confine: true,
                                                            width: '2px',
                                                            formatter: function (params) {
                                                                var content = params[0].name + '<br>'
                                                                params.forEach(function (item) {
                                                                    if (item.seriesName === "File") {
                                                                        if (item.value != null) {
                                                                            content += 'Click the bar to open the file'
                                                                        }
                                                                    } else {
                                                                        content += item.marker + ' ' + item.seriesName + ': ' + formatter.format(item.value) + '<br>'
                                                                    }
                                                                })
                                                                return content
                                                            },
                                                        },
                                                        legend: {},
                                                        dataZoom: [
                                                            {
                                                                type: "inside",
                                                                orient: "vertical",
                                                                filterMode: "none",
                                                                zoomOnMouseWheel: "ctrl",
                                                                zoomLock: ctrlKeyPressed ? false : true,
                                                                start: zoomStates[index]?.start,
                                                                end: zoomStates[index]?.end,
                                                                preventDefaultMouseMove: false
                                                            }
                                                        ],
                                                        animation: false,
                                                        grid: {
                                                            left: '3%',
                                                            right: '4%',
                                                            bottom: '3%',
                                                            containLabel: true
                                                        },
                                                        xAxis: {
                                                            type: 'category',
                                                            data: item?.details?.map(item => item.date) || []
                                                        },
                                                        yAxis: {},
                                                        series: [
                                                            {
                                                                name: 'Plan',
                                                                type: 'bar',
                                                                color: '#D4D4FD',
                                                                data: item?.details?.map(e => {
                                                                    return ({
                                                                        value: e.plan,
                                                                        itemStyle: {
                                                                            color: e.url ? '#BEE7BF' : '#D4D4FD'
                                                                        },
                                                                    })
                                                                }) || []
                                                            },
                                                            {
                                                                name: 'Result',
                                                                type: 'line',
                                                                data: item?.details?.map(e => e.result) || [],
                                                                color: '#7F7EF7'
                                                            },
                                                            {
                                                                name: 'File',
                                                                type: 'scatter',
                                                                data: item?.details?.map(e => e.url) || [],
                                                                color: '#BEE7BF',
                                                            },
                                                            {
                                                                name: 'Page',
                                                                data: item?.details?.map(e => e.page) || []
                                                            }
                                                        ]
                                                    }
                                                    }
                                                    onEvents={{
                                                        'click': (params) => handleChartClick(params, item),
                                                        'dataZoom': (params) => debouncedHandleDataZoom(params, index)
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        height: "400px",
                                                        marginTop: "10px",
                                                        backgroundColor: '#F7F7FF',
                                                        padding: '1vw'
                                                    }}
                                                    opts={{ renderer: 'svg' }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
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

KPIDashboard.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIDashboard)