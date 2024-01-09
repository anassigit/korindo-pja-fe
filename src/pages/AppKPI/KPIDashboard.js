import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    InputGroup,
    Spinner
} from "reactstrap";
import '../../assets/scss/custom/components/custom-datepicker.scss';
import "../../assets/scss/custom/table/TableCustom.css";
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';
import { getColumnList, getCorporationList, getDashboardKPI, getGroupListKPI, getYearList, resetMessage } from "store/actions";
import ReactEcharts from "echarts-for-react"

const KPIDashboard = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch();

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
    const [appKPIPage, setAppKPIPage] = useState(true)

    const [appKPIMsg, setAppKPIMsg] = useState('')

    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [selectedColumnList, setSelectedColumnList] = useState([])

    const [optionBar, setOptionBar] = useState({});

    useEffect(() => {
        dispatch(getYearList())
        dispatch(getGroupListKPI())
        setLoadingSpinner(true)
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false);
    }, [appYearListData, appGroupListData, appCorporationListData, appColumnListData, appDashboardListData]);

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
        if (selectedYear && selectedMonth && selectedCorporationList && selectedGroupList) {
            dispatch(getDashboardKPI({
                search: {
                    year: selectedYear,
                    month: selectedMonth,
                    groupNum: selectedGroupList,
                    corporationId: selectedCorporationList,
                    column: selectedColumnList.join(','),
                }
            }))
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                    data: ['Total', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {

                },
                series: [
                    {
                        name: 'Bar Series',
                        type: 'bar',
                        data: [
                            1000,
                            150.5,
                            200.75,
                            180.25,
                            220.3,
                            300.0,
                            250.8,
                            190.6,
                            240.9,
                            280.2,
                            320.4,
                            270.1,
                            310.7
                        ]
                    },
                    {
                        name: 'Line Series',
                        type: 'line',
                        data: [
                            800,
                            120.5,
                            160.75,
                            140.25,
                            180.3,
                            250.0,
                            200.8,
                            150.6,
                            190.9,
                            220.2,
                            260.4,
                            210.1,
                            240.7
                        ]
                    }
                ]
            }
            setOptionBar(option)
        } else {
            dispatch(getDashboardKPI({
                search: {
                    groupNum: '',
                    corporationId: '',
                    year: '',
                }
            }))
        }
    }, [selectedCorporationList, selectedMonth, selectedGroupList, selectedYear])

    useEffect(() => {
        // debugger
        console.log(appDashboardListData)
        if (appDashboardListData.status === '1') {
            let result = appDashboardListData?.data?.resultList


        } else {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                    data: ['Total', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {

                },
                series: [
                    {
                        name: 'Bar Series',
                        type: 'bar',
                        data: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        name: 'Line Series',
                        type: 'line',
                        data: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ]
            }
            setOptionBar(option)
        }
    }, [appDashboardListData])

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card style={{ display: appKPIPage ? 'block' : 'none' }} fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            KPI {props.t('Dashboard')}
                        </CardHeader>
                        <CardBody>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '16px'
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
                                    <option>Select Year</option>
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
                                    <option>Select Month</option>
                                    {
                                        Array.from({ length: 12 }, (_, index) => {
                                            const month = new Date(selectedYear, index, 1).toLocaleString('en-US', { month: 'short' });
                                            return (
                                                <option key={index} value={index + 1}>
                                                    {month}
                                                </option>
                                            );
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
                                    value={selectedCorporationList}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedCorporationList(e.target.value)
                                    }}
                                >
                                    {
                                        appCorporationListData?.data?.list?.length > 0 ? (
                                            <>
                                                <option value={''}>Select Group</option>
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
                                <Input
                                    type="select"
                                    style={{ width: 'auto' }}
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedYear(e.target.value)
                                    }}
                                >
                                    {
                                        appYearListData?.data?.list.map((item, index) => {
                                            return (
                                                <option key={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </div>
                            <h3 className="my-2">
                                {Array.isArray(appDashboardListData?.data?.resultList) && appDashboardListData?.data?.resultList.length > 0 ? appDashboardListData?.data?.resultList[0].corporationName : ''}
                            </h3>
                            {
                                appDashboardListData?.data?.resultList.map((item, index) => {

                                    return (
                                        <React.Fragment key={index}>
                                            <div className="mx-2">
                                                <h5 style={{ marginTop: '1.25vh' }}>
                                                    {item.item || "No Data"}
                                                </h5>
                                                <span className={item.plan >= item.result ? 'opacity-50' : null} style={{ color: item.plan >= item.result ? 'grey' : '#7F7EF7' }}>
                                                    {item.plan} /
                                                </span>
                                                <span style={{ color: '#7F7EF7' }}>
                                                    &nbsp;{item.result}
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
                                                    option={{
                                                        tooltip: {
                                                            trigger: 'axis',
                                                            axisPointer: {
                                                                type: 'shadow'
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
                                                        yAxis: {

                                                        },
                                                        series: [
                                                            {
                                                                name: 'Plan',
                                                                type: 'bar',
                                                                data: item?.details.map(e => {
                                                                    return ({
                                                                        value: e.plan,
                                                                        itemStyle: {
                                                                            color: e.chose ? '#7F7EF7' : 'grey',
                                                                        },
                                                                    })
                                                                }) || []
                                                            },
                                                            {
                                                                name: 'Result',
                                                                type: 'line',
                                                                data: item?.details.map(e => e.result) || []
                                                            },
                                                            {
                                                                name: 'Note',
                                                                type: 'scatter',
                                                                data: item?.details.map(e => ({
                                                                    name: e.month,
                                                                    value: e.note,
                                                                    symbol: 'circle',
                                                                    symbolSize: 10,
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
                                                        fontSize: '18px'
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '10%',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        {item.corporationName}
                                                    </span>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '25%'
                                                    }}>
                                                        <span className="text-primary">
                                                            {item.totalPlan} /
                                                        </span>
                                                        <span style={{ color: 'grey', opacity: '50%' }}>
                                                            &nbsp;{item.totalResult}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="bg-primary"
                                                        style={{
                                                            padding: '12px 42px 12px 42px',
                                                            position: 'absolute',
                                                            top: '35%',
                                                            color: '#fff',
                                                        }}>
                                                        {item.totalRate}
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
    );


}

KPIDashboard.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIDashboard)