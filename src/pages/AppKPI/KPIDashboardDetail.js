import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Spinner,
    UncontrolledTooltip
} from "reactstrap"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getCorporationList, getDashboardDetailKPI, getGroupListKPI, getYearList, resetMessage } from "store/actions"

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

    const appDashboardDetailListData = useSelector((state) => {
        return state.kpiReducer.respGetDashboardDetailKPI
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState('')
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")

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
    }, [appYearListData, appGroupListData, appCorporationListData, appDashboardDetailListData])

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
        if (selectedYear && selectedGroupList) {
            dispatch(getDashboardDetailKPI({
                search: {
                    year: selectedYear,
                    groupNum: selectedGroupList,
                    corporationId: selectedCorporationList
                }
            }))
        } else {
            dispatch(getDashboardDetailKPI({
                search: {
                    groupNum: '',
                    corporationId: '',
                    year: '',
                }
            }))
        }
        setLoadingSpinner(true)
    }, [selectedCorporationList, selectedGroupList, selectedYear])

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
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '.75vw',
                                    }}
                                >
                                    <Button>
                                        <i className="mdi mdi-download" />{" "}
                                        {props.t('Download Data')}
                                    </Button>
                                </div>
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
                                            appDashboardDetailListData?.data?.resultList.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td align="center" valign="middle" style={{
                                                            position: 'sticky',
                                                            left: '0',
                                                            backgroundColor: 'white'
                                                        }}>
                                                            <div
                                                                style={{ width: '175px' }}
                                                            >
                                                                {data.item}
                                                            </div>
                                                        </td>
                                                        {Array.from(data.details, (detail, index) => (
                                                            <React.Fragment key={index}>
                                                                <td style={{ textAlign: "right" }} id="detailTooltip">
                                                                    {detail.plan.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                                                </td>
                                                                <td style={{ textAlign: "right" }} id="detailTooltip">
                                                                    {detail.result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                                                </td>
                                                                <UncontrolledTooltip placement="top" target="detailTooltip">
                                                                    {detail.note}
                                                                </UncontrolledTooltip>
                                                            </React.Fragment>
                                                        ))}
                                                    </tr>
                                                )
                                            })
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