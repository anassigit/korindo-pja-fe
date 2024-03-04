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
    Spinner
} from "reactstrap"
import { getCorporationList, getDownloadPlan, getGroupListKPI, getPlan, getYearList, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getDownloadPlanTemplateBE } from "helpers/backend_helper"
import UploadKPIPlan from "./UploadKPIPlan"


const KPIPlanSetting = (props) => {

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

    const appPlanListData = useSelector((state) => {
        return state.kpiReducer.respGetPlan
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appPlanState, setAppPlanState] = useState([])
    const [appKPIMsg, setAppKPIMsg] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [uploadModal, setUploadModal] = useState(false)

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
    }, [appYearListData, appGroupListData, appCorporationListData, appPlanListData])

    useEffect(() => {
        if (selectedGroupList) {
            dispatch(getCorporationList({
                groupNum: selectedGroupList
            }))
        }
    }, [selectedGroupList, selectedYear])

    useEffect(() => {
        if (selectedYear && selectedCorporationList && selectedGroupList) {
            dispatch(getPlan({
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                year: selectedYear,
            }))
        } else {
            dispatch(getPlan({
                groupNum: '',
                corporationId: '',
                year: '',
            }))
        }
    }, [selectedCorporationList, selectedGroupList, selectedYear])

    useEffect(() => {
        if (appPlanListData.status === '1') {
            setAppPlanState(appPlanListData.data.list)
        } else {
            setAppPlanState([])
        }
    }, [appPlanListData])

    const toggleUploadModal = () => {
        setUploadModal(!uploadModal)
    }

    const downloadPlanTemplate = async () => {
        try {
            dispatch(getDownloadPlanTemplateBE({
                file_nm: 'KPI PLAN TEMPLATE.xlsx'
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const downloadPlan = async () => {
        try {
            dispatch(getDownloadPlan({
                file_nm: 'KPI PLAN.xlsx',
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                year: selectedYear,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const getMonthAbbreviation = (monthIndex) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
        return months[monthIndex - 1]
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {'KPI Plan Setting'}
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
                                        width: '30%',
                                        gap: '.75vw'
                                    }}>
                                    <Input
                                        type="select"
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                    >
                                        {Array.isArray(appYearListData?.data?.list) ? (
                                            <>
                                                <option>{'Select Year'}</option>
                                                {appYearListData?.data?.list.map((item, index) => (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option>
                                                {'No Data'}
                                            </option>
                                        )}
                                    </Input>
                                    <Input
                                        type="select"
                                        onChange={(e) => {
                                            setSelectedGroupList(e.target.value)
                                        }}
                                    >
                                        {Array.isArray(appGroupListData?.data?.list) ? (
                                            <>
                                                <option value={''}>{'Select Group'}</option>
                                                {appGroupListData?.data?.list.map((item, index) => {
                                                    let nameLang = langType === 'eng' ? item.name_eng : langType === 'kor' ? item.name_kor : item.name_idr
                                                    return (
                                                        <option key={index} value={item.num}>
                                                            {nameLang}
                                                        </option>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <option>
                                                {'No Data'}
                                            </option>
                                        )}
                                    </Input>
                                    <Input
                                        type="select"
                                        value={selectedCorporationList}
                                        onChange={(e) => setSelectedCorporationList(e.target.value)}
                                    >
                                        {Array.isArray(appCorporationListData?.data?.list) ? (
                                            <>
                                                <option value={''}>{'Select Corporation'}</option>
                                                {appCorporationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.corporationId}>
                                                            {item.corporationName}
                                                        </option>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <option>
                                                {'No Data'}
                                            </option>
                                        )}
                                    </Input>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '.75vw',
                                    }}
                                >
                                    <Button
                                        disabled={appPlanState.length > 0 ? false : true}
                                        className={appPlanState.length > 0 ? "" : "btn btn-dark opacity-25"}
                                        onClick={() => { downloadPlan() }}>
                                        <i className="mdi mdi-download" />{" "}
                                        {'Download Excel'}
                                    </Button>
                                    <Button onClick={() =>
                                        downloadPlanTemplate()
                                    }>
                                        <i className="mdi mdi-download" />{" "}
                                        {'Download Template'}
                                    </Button>
                                    <Button onClick={() => toggleUploadModal()}>
                                        {'Upload'}
                                    </Button>
                                </div>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">KPI Category</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">Unit</th>
                                        {
                                            (() => {
                                                const thElements = []
                                                for (let month = 1; month <= 12; month++) {
                                                    thElements.push(
                                                        <th key={month - 1} style={{ textAlign: 'center' }} scope="col">{getMonthAbbreviation(month)}</th>
                                                    )
                                                }

                                                return thElements
                                            })()
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appPlanState.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1}>{item.unit}</td>
                                                        {
                                                            item.plan.map((planValue, monthIndex) => {
                                                                if (planValue !== null) {
                                                                    return (
                                                                        <td style={{ textAlign: "right" }} key={monthIndex}>{planValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td key={monthIndex}>{'No Data'}</td>
                                                                    )
                                                                }
                                                            })
                                                        }
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
                    <UploadKPIPlan
                        modal={uploadModal}
                        toggle={toggleUploadModal}
                        onSuccess={() => {
                            setLoadingSpinner(true)
                            if (selectedYear && selectedCorporationList && selectedGroupList) {
                                dispatch(getPlan({
                                    groupNum: selectedGroupList,
                                    corporationId: selectedCorporationList,
                                    year: selectedYear,
                                }))
                            } else {
                                dispatch(getPlan({
                                    groupNum: '',
                                    corporationId: '',
                                    year: '',
                                }))
                            }
                        }}
                    />
                </>
            }
        />
    )
}

KPIPlanSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIPlanSetting)