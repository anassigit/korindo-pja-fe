import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Spinner
} from "reactstrap"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getColumnList, getCorporationList, getDashboardKPI, getGroupListKPI, getYearList, resetMessage } from "store/actions"

const KPIDashboardDetail = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appYearListData = useSelector((state) => {
        return state.kpiReducer.respGetYearList
    })

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
    const [appKPIMsg, setAppKPIMsg] = useState('')
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [selectedColumnList, setSelectedColumnList] = useState([])
    const [initialWidths, setInitialWidths] = useState([])

    useEffect(() => {
        dispatch(getYearList())
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
            setInitialWidths(new Array(appDashboardListData.data.resultList.length).fill(0))
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
        } else if (appDashboardListData.status === '0') setInitialWidths([])
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
        if (selectedYear && selectedGroupList) {
            dispatch(getDashboardKPI({
                search: {
                    year: selectedYear,
                    groupNum: selectedGroupList,
                    corporationId: selectedCorporationList,
                    column: selectedColumnList
                        .filter(columnObj => Object.values(columnObj)[0])
                        .map(columnObj => Object.keys(columnObj)[0])
                        .join(',')
                }
            }))
        } else {
            dispatch(getDashboardKPI({
                search: {
                    groupNum: '',
                    corporationId: '',
                    year: '',
                }
            }))
        }
        setLoadingSpinner(true)
    }, [selectedCorporationList, selectedGroupList, selectedYear, selectedColumnList])

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

    const getMonthAbbreviation = (monthIndex) => {
        const months = [
            props.t("Jan"),
            props.t("Feb"),
            props.t("Mar"),
            props.t("Apr"),
            props.t("May"),
            props.t("Jun"),
            props.t("Jul"),
            props.t("Aug"),
            props.t("Sep"),
            props.t("Oct"),
            props.t("Nov"),
            props.t("Dec")
        ]
        return months[monthIndex - 1]
    }

    const getColumnHeader = (index) => {
        const baseHeaders = [
            props.t('Plan'),
            props.t('Result')
        ]
        return `${baseHeaders[index % baseHeaders.length]}`
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            KPI {props.t('Dashboard Detail')}
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
                                    <option>{props.t('Select Year')}</option>
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
                                    value={selectedGroupList}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedCorporationList('')
                                        setSelectedColumnList([])
                                        setSelectedGroupList(e.target.value)
                                    }}
                                >
                                    <option value={''}>{props.t('Select Group')}</option>
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
                                                <option value={''}>{props.t('Select Group')}</option>
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
                                            <option value={''}>{props.t('No Data')}</option>
                                        )
                                    }
                                </Input>
                            </div>
                            <div style={{ overflow: 'auto', maxHeight: '80vh', marginTop: '10px' }}>
                                <table className="table table-bordered my-3">
                                    <thead style={{ color: 'white', backgroundColor: '#81B642', zIndex: 3 }}>
                                        <tr>
                                            <th rowSpan={2} style={{ textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: 0, backgroundColor: '#81B642', zIndex: '2', minWidth: '300px' }}>
                                                {props.t("ITEMS")}
                                            </th>
                                            {Array.from({ length: 12 }, (_, monthIndex) => (
                                                <React.Fragment key={monthIndex}>
                                                    <th colSpan={2} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                        {getMonthAbbreviation(monthIndex + 1)}
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                        <tr>
                                            {Array.from({ length: 24 }, (_, index) => (
                                                <th key={index} style={{ textAlign: 'center', minWidth: 'auto' }}>
                                                    {getColumnHeader(index)}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody style={{ position: 'relative' }}>
                                        {
                                            <tr>
                                                <td rowSpan={2} align="center" valign="middle" style={{
                                                    position: 'sticky',
                                                    left: '0',
                                                    backgroundColor: 'white'
                                                }}>
                                                    <div
                                                        style={{ width: '175px' }}
                                                    >
                                                        data
                                                    </div>
                                                </td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                <td>data</td>
                                                {/* {
                                                    Array.isArray(item.revenueList) ? item?.revenueList.map((row, i) => (
                                                        <React.Fragment key={i}>
                                                            <td>{row.pyac}</td>
                                                            <td>{row.bp}</td>
                                                            <td>{row.amp}</td>
                                                            <td>{row.cyac}</td>
                                                            <td>{row.grw}</td>
                                                            <td>{row.abp}</td>
                                                            <td>{row.amp}</td>
                                                        </React.Fragment>
                                                    )) : item?.interestExpenseList.map((row, i) => (
                                                        <React.Fragment key={i}>
                                                            <td>{row.pyac}</td>
                                                            <td>{row.bp}</td>
                                                            <td>{row.amp}</td>
                                                            <td>{row.cyac}</td>
                                                            <td>{row.grw}</td>
                                                            <td>{row.abp}</td>
                                                            <td>{row.amp}</td>
                                                        </React.Fragment>
                                                    ))
                                                } */}
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
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

KPIDashboardDetail.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIDashboardDetail)