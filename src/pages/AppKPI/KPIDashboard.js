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
import { getColumnList, getCoorporationList, getDashboardKPI, getGroupListKPI, getYearList, resetMessage } from "store/actions";
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

    const appCoorporationListData = useSelector((state) => {
        return state.kpiReducer.respGetCoorporationList
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
    const [selectedCoorporationList, setSelectedCoorporationList] = useState("")
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
    }, [appYearListData, appGroupListData, appCoorporationListData, appColumnListData, appDashboardListData]);

    useEffect(() => {
        if (selectedGroupList) {
            dispatch(getCoorporationList({
                groupNum: selectedGroupList
            }))
        } else {
            dispatch(getCoorporationList({
                groupNum: ''
            }))
        }
    }, [selectedGroupList, selectedYear])

    useEffect(() => {
        if (selectedYear && selectedCoorporationList && selectedGroupList) {
            dispatch(getColumnList({
                groupNum: selectedGroupList,
                corporationId: selectedCoorporationList,
                year: selectedYear,
            }))
        } else {
            dispatch(getColumnList({
                groupNum: '',
                corporationId: '',
                year: '',
            }))
        }
    }, [selectedCoorporationList, selectedGroupList, selectedYear])

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedCoorporationList && selectedGroupList) {
            dispatch(getDashboardKPI({
                search: {
                    year: selectedYear,
                    month: selectedMonth,
                    groupNum: selectedGroupList,
                    corporationId: selectedCoorporationList,
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
                series: {
                    name: 'row.nama',
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
                }
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
                series: {
                    name: 'row.nama',
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
                }
            }
            setOptionBar(option)
        }
    }, [selectedCoorporationList, selectedMonth, selectedGroupList, selectedYear])

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
                                    value={selectedCoorporationList}
                                    onChange={(e) => {
                                        setLoadingSpinner(true)
                                        setSelectedCoorporationList(e.target.value)
                                    }}
                                >
                                    {
                                        appCoorporationListData?.data?.list?.length > 0 ? (
                                            <>
                                                <option value={''}>Select Group</option>
                                                {
                                                    appCoorporationListData?.data?.list.map((item, index) => {
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
                            <ReactEcharts
                                option={optionBar}
                                style={{ width: "100%", height: "400px", marginTop: "10px" }}
                            ></ReactEcharts>
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