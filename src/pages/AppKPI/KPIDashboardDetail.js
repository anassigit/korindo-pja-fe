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
import { getCorporationList, getDashboardDetailKPI, getDownloadDashboardDetail, getGroupListKPI, resetMessage } from "store/actions"
import e from "cors"

const KPIDashboardDetail = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

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

    const tempArray = [];

    const startDate = new Date('2022-03')
    const endDate = new Date('2023-05')


    useEffect(() => {
        dispatch(getGroupListKPI())
        setLoadingSpinner(true)
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appGroupListData, appCorporationListData, appDashboardDetailListData])

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
        if (startDate && endDate) {
            let tempCoorporationId = [1, 2]
            dispatch(getDashboardDetailKPI({
                to: `${startDate.getFullYear()}${startDate.getMonth() + 1}`,
                from: `${endDate.getFullYear()}${endDate.getMonth() + 1}`,
                groupNum: selectedGroupList,
                corporationId: tempCoorporationId.map(e => e)
                // selectedCorporationList
            }))
        } else {
            dispatch(getDashboardDetailKPI({
                // groupNum: '',
                // corporationId: '',
                // year: '',
                // from: endDate,
                to: `${startDate.getFullYear()}${startDate.getMonth() + 1}`,
                from: `${endDate.getFullYear()}${endDate.getMonth() + 1}`,
                groupNum: selectedGroupList,
                corporationId: [1, 2]
            }))
        }
        setLoadingSpinner(true)
    // }, [selectedCorporationList, selectedGroupList, startDate, endDate])
    }, [])

    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setMonth(currentDate.getMonth() + 1)) {
        const data = {
            date: new Date(currentDate),
            plan: getRandomNumber(1, 20),
            result: getRandomNumber(0, 10)
        };
        
        tempArray.push(data);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getMonthAbbreviation = (monthIndex) => {
        const months = tempArray.map(data => {
            return `${data.date.getFullYear()}-${data.date.getMonth() + 1}`
        })
        return months[monthIndex - 1]
    }

    const getColumnHeader = (index) => {
        const baseHeaders = [
            'Plan',
            'Result'
        ]
        return `${baseHeaders[index % baseHeaders.length]}`
    }

    const downloadDashboardDetail = async () => {
        try {
            dispatch(getDownloadDashboardDetail({
                file_nm: 'KPI Dashboard Detail.xlsx',
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                year: selectedYear,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            KPI {'Dashboard Detail'}
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
                                    {/* <Input
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
                                    </Input> */}
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
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '.75vw',
                                    }}
                                >
                                    <Button
                                        disabled={appDashboardDetailListData?.data?.resultList.length > 0 ? false : true}
                                        className={appDashboardDetailListData?.data?.resultList.length > 0 ? "" : "btn btn-dark opacity-25"}
                                        onClick={() => { downloadDashboardDetail() }}>
                                        <i className="mdi mdi-download" />{" "}
                                        {'Download Excel'}
                                    </Button>
                                </div>
                            </div>
                            <div style={{ overflow: 'auto', maxHeight: '80vh', marginTop: '10px' }}>
                                <table className="table table-bordered my-3">
                                    <thead style={{ color: 'white', backgroundColor: '#81B642', zIndex: 3 }}>
                                        <tr>
                                            <th rowSpan={2} style={{ zIndex: 3, textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: '0', backgroundColor: '#81B642', zIndex: '2', minWidth: '225px' }}>
                                                <div>{"Corporation Name"}</div>
                                            </th>
                                            <th rowSpan={2} style={{ zIndex: 3, textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: '225px', backgroundColor: '#81B642', zIndex: '2', minWidth: '225px' }}>
                                                <div>{"ITEMS"}</div>
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
                                                            backgroundColor: 'white',
                                                            left: '0',
                                                            zIndex: '2'
                                                        }}>
                                                            <div>{data.corporationName}</div>
                                                        </td>
                                                        <td align="center" valign="middle" style={{
                                                            position: 'sticky',
                                                            backgroundColor: 'white',
                                                            left: '225px',
                                                            zIndex: '2'
                                                        }}>
                                                            <div style={{ width: '175px' }}>{data.item}</div>
                                                        </td>
                                                        {Array.from(data.details, (detail, index) => (
                                                            <React.Fragment key={index}>
                                                                <td style={{ textAlign: "right" }}>
                                                                    {detail.plan.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                                                </td>
                                                                <td style={{
                                                                    textAlign: "right",
                                                                    color: detail.plan > detail.result ? "red" : "black",
                                                                    width: '100%',
                                                                    position: 'relative'
                                                                }} id={"detailTooltip" + data.item + index}>
                                                                    {detail.note.trim() !== "" ? (
                                                                        <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                                                            <i className="mdi mdi-comment-alert" />
                                                                        </div>
                                                                    ) : null}
                                                                    {detail.result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                                                </td>
                                                                {detail.note.trim() !== "" ? (
                                                                    <UncontrolledTooltip placement="top" target={"detailTooltip" + data.item + index}>
                                                                        {detail.note}
                                                                    </UncontrolledTooltip>
                                                                ) : null
                                                                }
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