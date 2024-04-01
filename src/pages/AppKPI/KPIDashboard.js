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
    Spinner
} from "reactstrap"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getColumnList, getCorporationList, getDashboardKPI, getGroupListKPI, resetMessage } from "store/actions"
import ReactEcharts from "echarts-for-react"

const KPIDashboard = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appGroupListData = useSelector((state) => {
        return state.kpiReducer.respGetGroupListKpi
    })

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
    const [appKPIPage, setAppKPIPage] = useState(true)

    const [appKPIMsg, setAppKPIMsg] = useState('')

    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [selectedColumnList, setSelectedColumnList] = useState([])

    const [filterColumn, setFilterColumn] = useState(false)

    const [initialWidths, setInitialWidths] = useState([])

    useEffect(() => {
        dispatch(getGroupListKPI())
        setLoadingSpinner(true)
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appYearListData, appGroupListData, appCorporationListData, appColumnListData, appDashboardListData])

    useEffect(() => {
        if (appDashboardListData.status === '1') {
            if (appDashboardListData && appDashboardListData.data && appDashboardListData.data.resultList) {
                setInitialWidths(new Array(appDashboardListData.data.resultList.length).fill(0));
            }
            if (Array.isArray(initialWidths) && initialWidths?.length > 0) {
                const timeoutId = setTimeout(() => {
                    setInitialWidths(
                        appDashboardListData.data.resultList.map((item) => {
                            const cappedTotalRate = Math.min(100, parseFloat(item.totalRate.replace('%', '')))
                            return cappedTotalRate
                        })
                    )
                }, 100)
                return () => clearTimeout(timeoutId)
            }
        } else if (appDashboardListData.status === '0') {
            setInitialWidths([])
        }
    }, [appDashboardListData])

    useEffect(() => {
        if (selectedGroupList) {
            dispatch(getCorporationList({
                groupNum: selectedGroupList
            }))
        } else {
            dispatch(getCorporationList({
                groupNum: ''
            }))
        }
    }, [selectedGroupList, selectedYear])

    useEffect(() => {

        if (selectedYear && selectedCorporationList && selectedGroupList) {
            dispatch(getColumnList({
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                year: selectedYear,
            }))
        } else {
            dispatch(getColumnList({
                groupNum: '',
                corporationId: '',
                year: '',
            }))
        }

    }, [selectedCorporationList, selectedGroupList, selectedYear])

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedGroupList) {

            const trueColumns = selectedColumnList
                .filter(columnObj => Object.values(columnObj)[0])
                .map(columnObj => Object.keys(columnObj)[0])
                .join(',')
            dispatch(getDashboardKPI({
                year: selectedYear,
                month: selectedMonth,
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                column: trueColumns
            }))
        } else {
            dispatch(getDashboardKPI({
                groupNum: '',
                corporationId: '',
                year: '',
            }))
        }
        setLoadingSpinner(true)
    }, [selectedCorporationList, selectedMonth, selectedGroupList, selectedYear, selectedColumnList])

    useEffect(() => {
        if (appColumnListData.status === '1') {
            const initialCheckboxesState = appColumnListData?.data?.list.map((e) => {
                return (
                    { [e]: false }
                )
            }) || []

            setSelectedColumnList(initialCheckboxesState)
        } else {
            setSelectedColumnList([])
        }

    }, [appColumnListData])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...selectedColumnList]
        const columnName = appColumnListData?.data?.list[index]

        newCheckboxes[index] = {
            ...newCheckboxes[index],
            [columnName]: !newCheckboxes[index]?.[columnName]
        }

        setSelectedColumnList(newCheckboxes)
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card style={{ display: appKPIPage ? 'block' : 'none' }} fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            KPI {'Dashboard'}
                        </CardHeader>
                        <CardBody>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center',
                                }}
                            >
                                <Input
                                    type="select"
                                    style={{ width: 'auto' }}
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedYear(e.target.value)
                                    }}
                                >
                                    <option>{'Select Year'}</option>
                                    {
                                        appYearListData?.data?.list.map((item, index) => {
                                            return (
                                                <option key={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Input>
                                <Input
                                    type="select"
                                    style={{ width: 'auto' }}
                                    value={selectedMonth}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedMonth(e.target.value)
                                    }}
                                >
                                    <option>{'Select Month'}</option>
                                    {
                                        Array.from({ length: 12 }, (_, index) => {
                                            const month = new Date(selectedYear, index, 1).toLocaleString('en-US', { month: 'short' })
                                            return (
                                                <option key={index} value={index + 1}>
                                                    {langType === 'kor' ? index + 1 + "월" : month}
                                                </option>
                                            )
                                        })
                                    }
                                </Input>
                                <Input
                                    type="select"
                                    style={{ width: 'auto' }}
                                    value={selectedGroupList}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedCorporationList('')
                                        setSelectedColumnList([])
                                        setSelectedGroupList(e.target.value)
                                    }}
                                >
                                    <option value={''}>{'Select Group'}</option>
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
                                    value={selectedCorporationList}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedCorporationList(e.target.value)
                                        setSelectedColumnList([])
                                    }}
                                >
                                    {
                                        appCorporationListData?.data?.list?.length > 0 ? (
                                            <>
                                                <option value={''}>{'Select Corporation'}</option>
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
                                            <option value={''}>{'No Data'}</option>
                                        )
                                    }
                                </Input>
                                <Dropdown
                                    isOpen={filterColumn}
                                    toggle={() => setFilterColumn(!filterColumn)}
                                    className="`d`-inline-block"
                                >
                                    <DropdownToggle
                                        className="btn header-item "
                                        id="page-header-user-dropdown"
                                        tag="button"
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
                                                        onClick={() => handleCheckboxChange(index)}
                                                    >
                                                        <Input
                                                            type="checkbox"
                                                            id={`checkbox${index + 1}`}
                                                            checked={selectedColumnList[index]?.[columnName] || false}
                                                            onClick={() => handleCheckboxChange(index)}
                                                        />
                                                        <a onClick={() => handleCheckboxChange(index)} style={{ marginBottom: '0' }}>
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
                                </Dropdown>
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
                                                <span style={{ color: '#D4D4FD' }}>
                                                    {formatter.format(item.plan)} /
                                                </span>
                                                <span style={{ color: '#7F7EF7' }}>
                                                    &nbsp;{formatter.format(item.result)}
                                                </span>
                                                <div className="text-primary" style={{ fontSize: "16px" }}>
                                                    {item.rate}
                                                </div>
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
                                                            data: item?.details.map(item => item.month) || []
                                                        },
                                                        yAxis: {},
                                                        series: [
                                                            {
                                                                name: 'Plan',
                                                                type: 'bar',
                                                                color: '#BEE7BF',
                                                                data: item?.details.map(e => {
                                                                    return ({
                                                                        value: e.plan,
                                                                        itemStyle: {
                                                                            color: e.chose ? '#BEE7BF' : '#D4D4FD',
                                                                        },
                                                                    })
                                                                }) || [],
                                                            },
                                                            {
                                                                name: 'Result',
                                                                type: 'line',
                                                                data: item?.details.map(e => e.result) || [],
                                                                color: '#7F7EF7'
                                                            },
                                                            {
                                                                name: 'Note',
                                                                type: 'scatter',
                                                                data: item?.details.map(e => ({
                                                                    name: e.month,
                                                                    value: e.note,
                                                                })) || []
                                                            }
                                                        ]
                                                    }
                                                    }
                                                    style={{
                                                        width: "49.5%",
                                                        height: "400px",
                                                        marginTop: "10px",
                                                        backgroundColor: '#F7F7FF',
                                                        padding: '1vw'
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        width: "49.5%",
                                                        height: "400px",
                                                        marginTop: "10px",
                                                        backgroundColor: '#F7F7FF',
                                                        padding: '1vw',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '20px'
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '10%',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        {item.item}
                                                    </span>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '30%'
                                                    }}>
                                                        <span className="text-primary">
                                                            {formatter.format(item.totalResult)} /
                                                        </span>
                                                        <span style={{ color: '#D4D4FD' }}>
                                                            &nbsp;
                                                            {formatter.format(item.totalPlan)}
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            padding: '12px 42px 12px 42px',
                                                            position: 'absolute',
                                                            top: '40%',
                                                            color: '#0EAB3D',
                                                            backgroundColor: '#BEE7BF',
                                                        }}>
                                                        {item.totalRate}
                                                    </div>
                                                    <div
                                                        style={{
                                                            padding: '12px 42px 12px 42px',
                                                            position: 'relative',
                                                            top: '25%',
                                                            width: '75%',
                                                            height: '70px',
                                                            color: '#fff',
                                                            backgroundColor: '#D4D4FD',
                                                        }}>
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                left: '0',
                                                                top: '0',
                                                                height: '100%',
                                                                width: `${initialWidths[index]}%`,
                                                                backgroundColor: '#7F7EF7',
                                                                transition: 'width 0.5s ease-in-out',
                                                            }}
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
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