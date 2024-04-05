import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
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
    Input,
    InputGroup,
    Spinner
} from "reactstrap"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getColumnList, getCorporationList, getDashboardKPI, getGroupListKPI, resetMessage } from "store/actions"
import ReactEcharts from "echarts-for-react"
import DatePicker from "react-datepicker"
import moment from "moment"

const KPIDashboard = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appCorporationListData = useSelector((state) => {
        return state.kpiReducer.respGetCorporationList
    })

    const appColumnListData = useSelector((state) => {
        return state.kpiReducer.respGetColumnList
    })

    const appDashboardListData = useSelector((state) => {
        return state.kpiReducer.respGetDashboardKPI
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState('')
    const [selectedCorporationId, setSelectedCorporationId] = useState("")
    const [selectedColumnList, setSelectedColumnList] = useState([])
    const [selectedCorporationList, setSelectedCorporationList] = useState([])
    const [filterColumn, setFilterColumn] = useState(false)
    const [filterCorporations, setFilterCorporations] = useState(false)
    const [showFromDatePicker, setShowFromDatePicker] = useState(false)
    const [isFromDateButtonClicked, setIsFromDateButtonClicked] = useState(false)
    const [selectedFromDate, setSelectedFromDate] = useState(moment().format('yyyy-MM'))
    const [showToDatePicker, setShowToDatePicker] = useState(false)
    const [isToDateButtonClicked, setIsToDateButtonClicked] = useState(false)
    const [selectedToDate, setSelectedToDate] = useState(moment().format('yyyy-MM'))

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
    }, [appCorporationListData, appColumnListData, appDashboardListData])

    // useEffect(() => {
    //     if (selectedFromDate && selectedCorporationId) {
    //         dispatch(getColumnList({
    //             // groupNum: selectedGroupId,
    //             corporationId: selectedCorporationId,
    //             year: selectedFromDate.substring(0, 4),
    //         }))
    //     } else {
    //         dispatch(getColumnList({
    //             // groupNum: '',
    //             corporationId: '',
    //             year: '',
    //         }))
    //     }

    // }, [selectedCorporationId, selectedFromDate])

    // useEffect(() => {
    //     if (selectedDate) {
    //         dispatch(getDashboardKPI({
    //             year: selectedDate.substring(0, 4),
    //             month: selectedDate.substring(5),
    //             // groupNum: selectedGroupId,
    //             corporationId: selectedCorporationId,
    //             column: selectedColumnList
    //                 .filter(columnObj => Object.values(columnObj)[0])
    //                 .map(columnObj => Object.keys(columnObj)[0])
    //                 .join(',')
    //         }))
    //     } else {
    //         dispatch(getDashboardKPI({
    //             // groupNum: '',
    //             corporationId: '',
    //             year: '',
    //             month: ''
    //         }))
    //     }
    //     setLoadingSpinner(true)
    // }, [selectedCorporationId, selectedFromDate, selectedColumnList])

    // useEffect(() => {
    //     dispatch(getDashboardKPI({
    //             year: 2023,
    //             month: "06",
    //             groupNum: 2,
    //             corporationId: 1
    //         }))
    // }, [])

    // useEffect(() => {
    //     if (appColumnListData.status === '1') {
    //         const initialCheckboxesState = appColumnListData?.data?.list.map((e) => {
    //             return (
    //                 { [e]: false }
    //             )
    //         }) || []

    //         setSelectedColumnList(initialCheckboxesState)
    //     } else {
    //         setSelectedColumnList([])
    //     }

    // }, [appColumnListData])

    useEffect(() => {
        if (appCorporationListData.status === '1') {
            setSelectedCorporationList(appCorporationListData?.data?.list.reduce((accumulator, group) => {
                return accumulator.concat(group.coporationList.map(corporation => ({ isChecked: false, ...corporation })))
            }, []))
        } else {
            setSelectedCorporationList([])
        }
    }, [appCorporationListData])

    const years = []
    for (let year = 2017; year <= new Date().getFullYear(); year++) {
        years.push(year)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const handleColumnCheckboxChange = (index) => {
        const newCheckboxes = [...selectedColumnList]
        const columnName = appColumnListData?.data?.list[index]

        newCheckboxes[index] = {
            ...newCheckboxes[index],
            [columnName]: !newCheckboxes[index]?.[columnName]
        }

        setSelectedColumnList(newCheckboxes)
    }

    const getKPIDashboard = () => {
        var bodyForm = new FormData();
        bodyForm.append('from', selectedFromDate.replace(/-/g, ""))
        bodyForm.append('to', selectedToDate.replace(/-/g, ""))
        selectedCorporationList
            .filter(corporation => corporation.isChecked)
            .forEach(corporation => {
                bodyForm.append('corporationId', corporation.corporationId);
            });
        dispatch(getDashboardKPI(bodyForm, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }))
        console.log(selectedCorporationList)
    }

    const handleCorporationCheckboxChange = (corporationId, toogleCheck) => {
        const newCheckboxes = [...selectedCorporationList]
        const foundIndex = newCheckboxes.findIndex(corporation => corporation.corporationId === corporationId)
        if (foundIndex !== -1) {
            newCheckboxes[foundIndex].isChecked = toogleCheck
        }
        setSelectedCorporationList(newCheckboxes)
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
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
                                    <InputGroup style={{ flexWrap: 'unset' }}>
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
                                    <InputGroup style={{ flexWrap: 'unset' }}>
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
                                    <Dropdown style={{ height: "30px" }} isOpen={filterCorporations} toggle={() => setFilterCorporations(!filterCorporations)} className="d-inline-block">
                                        <DropdownToggle style={{ paddingTop: "0" }} className="btn header-item" id="page-header-user-dropdown" tag="button">
                                            <Button style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mdi mdi-filter" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            {Array.isArray(appCorporationListData?.data?.list) && appCorporationListData?.data?.list.length > 0 ? (
                                                <React.Fragment>
                                                    {appCorporationListData?.data?.list.map((group, groupIndex) => (
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
                                                            {groupIndex < (appCorporationListData?.data?.list?.length || 0) - 1 && <div className="dropdown-divider" />}
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ) : (
                                                <DropdownItem>{'No Data'}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/* <Dropdown
                                        isOpen={filterColumn}
                                        toggle={() => setFilterColumn(!filterColumn)}
                                        className="`d`-inline-block"
                                        style={{ height: "30px" }}
                                    >
                                        <DropdownToggle
                                            className="btn header-item "
                                            id="page-header-user-dropdown"
                                            tag="button"
                                            style={{ paddingTop: "0" }}
                                        >
                                            <Button
                                                style={{
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                }}
                                                className="mdi mdi-filter"
                                            />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            {Array.isArray(appColumnListData?.data?.list) && appColumnListData?.data?.list.length > 0 ? (
                                                appColumnListData?.data?.list.map((columnName, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column'
                                                        }}
                                                    >
                                                        <a
                                                            className="dropdown-item"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'left',
                                                            }}
                                                            onClick={() => handleColumnCheckboxChange(index)}
                                                        >
                                                            <Input
                                                                type="checkbox"
                                                                id={`checkbox${index + 1}`}
                                                                checked={selectedColumnList[index]?.[columnName] || false}
                                                                onClick={() => handleColumnCheckboxChange(index)}
                                                            />
                                                            <a onClick={() => handleColumnCheckboxChange(index)} style={{ marginBottom: '0' }}>
                                                                &nbsp;{columnName}
                                                            </a>
                                                        </a>
                                                        {index < appColumnListData.data.list.length - 1 && <div className="dropdown-divider" />}
                                                    </div>
                                                ))
                                            ) : (
                                                <DropdownItem>{'No Data'}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown> */}
                                    <Button onClick={() => getKPIDashboard()} className="btn btn-primary">
                                        Search
                                    </Button>
                                </div>
                            </div>
                            {
                                appDashboardListData?.data?.resultList.map((item, index, array) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {(index === 0 || index !== 0 && item.corporationName !== array[index - 1]?.corporationName) && (
                                                <h3 className="my-2">
                                                    {item.corporationName}
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
                                            }}>
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
                                                                    if (item.seriesName !== 'Note') {
                                                                        content += item.marker + ' ' + item.seriesName + ': ' + formatter.format(item.value) + '<br>'
                                                                    } else if (item.value) {
                                                                        content += 'Note: \n' + item.value + '<br>'
                                                                    }
                                                                })
                                                                return content
                                                            },
                                                        },
                                                        legend: {},
                                                        grid: {
                                                            left: '3%',
                                                            right: '4%',
                                                            bottom: '3%',
                                                            containLabel: true
                                                        },
                                                        xAxis: {

                                                            type: 'category',
                                                            data: item?.details.map(item => item.date) || []
                                                        },
                                                        yAxis: {},
                                                        series: [
                                                            {
                                                                name: 'Plan',
                                                                type: 'bar',
                                                                color: '#D4D4FD',
                                                                data: item?.details.map(e => {
                                                                    return ({
                                                                        value: e.plan,
                                                                        itemStyle: {
                                                                            color: '#D4D4FD'
                                                                        },
                                                                    })
                                                                }) || [],
                                                            },
                                                            {
                                                                name: 'Result',
                                                                type: 'line',
                                                                data: item?.details.map(e => e.result) || [],
                                                                color: '#7F7EF7'
                                                            }
                                                        ]
                                                    }
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        height: "400px",
                                                        marginTop: "10px",
                                                        backgroundColor: '#F7F7FF',
                                                        padding: '1vw'
                                                    }}
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