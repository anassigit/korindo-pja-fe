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
    InputGroup,
    Spinner
} from "reactstrap"
import { getCompanyList, getGroupListMovingPlan, getMovingPlanInputResultList, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import Swal from "sweetalert2"
import DatePicker from "react-datepicker"
import moment from "moment"

const MovingPlanInputResult = (props) => {

    const dispatch = useDispatch()

    const appGroupListData = useSelector((state) => {
        return state.movingPlanReducer.respGetGroupListMovingPlan
    })

    const appCompanyListData = useSelector((state) => {
        return state.movingPlanReducer.respGetCompanyList
    })

    const appListData = useSelector((state) => {
        return state.movingPlanReducer.respGetMovingPlanInputResultList
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [firstSearch, setFirstSearch] = useState(false)
    const [appMsg, setAppMsg] = useState("")
    const [selectedDate, setSelectedDate] = useState(moment().format('yyyy-MM'))
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [selectedGroupNum, setSelectedGroupNum] = useState("")
    const [selectedCompanyCode, setSelectedCompanyCode] = useState("")

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getGroupListMovingPlan())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (selectedGroupNum) {
            setLoadingSpinner(true)
            dispatch(getCompanyList({
                viewType: 2,
                groupNum: selectedGroupNum
            }))
        }
    }, [selectedGroupNum])

    useEffect(() => {
        if (appCompanyListData?.status === '0') {
            setAppMsg(appCompanyListData)
        }
        setLoadingSpinner(false)
    }, [appCompanyListData])

    useEffect(() => {
        setLoadingSpinner(false)
        if (appListData?.status === '0') {
            if (firstSearch) {
                setAppMsg(appListData)
            }
        } else if (appListData?.status === '1') {
            if (appListData?.data?.resultList?.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "No Data",
                    text: "There is no data!",
                    confirmButtonColor: "#7BAE40"
                })
            }
        }
    }, [appListData])

    const handleSearch = () => {
        setAppMsg('')
        if (!selectedGroupNum) {
            setAppMsg({
                message: "Group must be selected."
            })
            return
        }
        setFirstSearch(true)
        setLoadingSpinner(true)
        if (!selectedCompanyCode) {
            dispatch(getMovingPlanInputResultList(
                {
                    date: selectedDate.replace(/-/g, ""),
                    groupNum: selectedGroupNum
                }
            ))
        } else {
            dispatch(getMovingPlanInputResultList(
                {
                    date: selectedDate.replace(/-/g, ""),
                    companyCode: selectedCompanyCode
                }
            ))
        }
    }

    const years = []

    for (let year = 2017; year <= new Date().getFullYear(); year++) {
        years.push(year);
    }

    return (
        <RootPageCustom msgStateGet={appMsg} msgStateSet={setAppMsg}
            componentJsx={
                <>
                    <Card fluid="true" style={{ paddingBottom: '32px' }}>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            Input Result
                        </CardHeader>
                        <CardBody>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '.75vw',
                                }}>

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
                                            setSelectedCompanyCode("")
                                        }}
                                    >
                                        <option value={''}>Select Group</option>
                                        {
                                            appGroupListData?.data?.resultList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.groupNum}>
                                                        {item.groupName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <Input
                                        type="select"
                                        style={{ width: 'auto' }}
                                        value={selectedCompanyCode}
                                        onChange={(e) => setSelectedCompanyCode(e.target.value)}
                                    >
                                        {
                                            appCompanyListData?.data?.resultList?.length > 0 ? (
                                                <>
                                                    <option value={''}>All</option>
                                                    {
                                                        appCompanyListData?.data?.resultList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.companyCode}>
                                                                    {item.companyInitial}
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
                                    <Button
                                        className="btn btn-primary"
                                        onClick={() => handleSearch()}
                                        style={{ width: "100%" }}
                                    >
                                        Search
                                    </Button>
                                </div>
                                <div style={{
                                    color: 'red',
                                    display: 'flex',
                                    justifyContent: 'right',
                                    marginTop: '10px',
                                    marginRight: '8px'
                                }}>
                                    * (Unit: Juta-Rp)
                                </div>
                            </div>
                            <div className="moving-plan-summary-table">
                                <table className="table table-borderless my-3" style={{
                                    display: appListData?.data ? "table" : "none",
                                    borderCollapse: "separate",
                                    borderSpacing: "0",
                                    width: localStorage.getItem("I18N_LANGUAGE") === "kor" ? "60%" : "75%",
                                }}>
                                    <thead style={{
                                        color: 'white',
                                        backgroundColor: '#81B642',
                                    }}>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <th className="mpst-th" colSpan={2} style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: "10px"
                                            }}>
                                                {appListData?.data?.name ? appListData?.data?.name : ""}
                                            </th>
                                            <th className="mpst-th" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {appListData?.data?.resultList[0]?.amount ? appListData?.data?.resultList[0]?.amount : ""}
                                            </th>
                                            <th className="mpst-th" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {appListData?.data?.resultList[0]?.amount1 ? appListData?.data?.resultList[0]?.amount1 : ""}
                                            </th>
                                            <th className="mpst-th" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {appListData?.data?.resultList[0]?.amount2 ? appListData?.data?.resultList[0]?.amount2 : ""}
                                            </th>
                                            <th className="mpst-th" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {appListData?.data?.resultList[0]?.amount3 ? appListData?.data?.resultList[0]?.amount3 : ""}
                                            </th>
                                            <th className="mpst-th" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                backgroundColor: '#81B642',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {appListData?.data?.resultList[0]?.amtttl ? appListData?.data?.resultList[0]?.amtttl : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" valign="middle" rowSpan={5} style={{
                                                fontWeight: 'bold',
                                                maxWidth: '40px',
                                                backgroundColor: '#CCE295',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {props.t("Sales Revenue")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Business plan(BP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[1]?.amount.startsWith("-") ? "red" : "black",
                                            }}>
                                                {appListData?.data?.resultList[1]?.amount ? appListData?.data?.resultList[1]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[1]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[1]?.amount1 ? appListData?.data?.resultList[1]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[1]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[1]?.amount2 ? appListData?.data?.resultList[1]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[1]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[1]?.amount3 ? appListData?.data?.resultList[1]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[1]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[1]?.amtttl ? appListData?.data?.resultList[1]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Current Month Moving Plan(MP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[2]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[2]?.amount ? appListData?.data?.resultList[2]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[2]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[2]?.amount1 ? appListData?.data?.resultList[2]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[2]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[2]?.amount2 ? appListData?.data?.resultList[2]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[2]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[2]?.amount3 ? appListData?.data?.resultList[2]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[2]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[2]?.amtttl ? appListData?.data?.resultList[2]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Previous Month Moving Plan(MP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[3]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[3]?.amount ? appListData?.data?.resultList[3]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[3]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[3]?.amount1 ? appListData?.data?.resultList[3]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[3]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[3]?.amount2 ? appListData?.data?.resultList[3]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[3]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[3]?.amount3 ? appListData?.data?.resultList[3]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[3]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[3]?.amtttl ? appListData?.data?.resultList[3]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Moving Plan Difference")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[4]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[4]?.amount ? appListData?.data?.resultList[4]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[4]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[4]?.amount1 ? appListData?.data?.resultList[4]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[4]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[4]?.amount2 ? appListData?.data?.resultList[4]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[4]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[4]?.amount3 ? appListData?.data?.resultList[4]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[4]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[4]?.amtttl ? appListData?.data?.resultList[4]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {props.t("Performance")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[5]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[5]?.amount ? appListData?.data?.resultList[5]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" colSpan={4} style={{
                                                backgroundColor: '#f8f8fb',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }} />
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" valign="middle" rowSpan={5} style={{
                                                fontWeight: 'bold',
                                                maxWidth: '40px',
                                                backgroundColor: '#E6F0D8',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {props.t("Operating Income")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Business plan(BP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[6]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[6]?.amount ? appListData?.data?.resultList[6]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[6]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[6]?.amount1 ? appListData?.data?.resultList[6]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[6]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[6]?.amount2 ? appListData?.data?.resultList[6]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[6]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[6]?.amount3 ? appListData?.data?.resultList[6]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[6]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[6]?.amtttl ? appListData?.data?.resultList[6]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Current Month Moving Plan(MP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[7]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[7]?.amount ? appListData?.data?.resultList[7]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[7]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[7]?.amount1 ? appListData?.data?.resultList[7]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[7]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[7]?.amount2 ? appListData?.data?.resultList[7]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[7]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[7]?.amount3 ? appListData?.data?.resultList[7]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[7]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[7]?.amtttl ? appListData?.data?.resultList[7]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Previous Month Moving Plan(MP)")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[8]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[8]?.amount ? appListData?.data?.resultList[8]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[8]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[8]?.amount1 ? appListData?.data?.resultList[8]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[8]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[8]?.amount2 ? appListData?.data?.resultList[8]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[8]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[8]?.amount3 ? appListData?.data?.resultList[8]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[8]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[8]?.amtttl ? appListData?.data?.resultList[8]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Moving Plan Difference")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[9]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[9]?.amount ? appListData?.data?.resultList[9]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[9]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[9]?.amount1 ? appListData?.data?.resultList[9]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[9]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[9]?.amount2 ? appListData?.data?.resultList[9]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[9]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[9]?.amount3 ? appListData?.data?.resultList[9]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[9]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[9]?.amtttl ? appListData?.data?.resultList[9]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px',
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Performance")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[10]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[10]?.amount ? appListData?.data?.resultList[10]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" colSpan={4} style={{
                                                backgroundColor: '#f8f8fb',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }} />
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" valign="middle" rowSpan={2} style={{
                                                fontWeight: 'bold',
                                                maxWidth: '40px',
                                                backgroundColor: '#F2F2F2',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                            }}>
                                                {props.t("Non-Operating Income, Expenses")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Non-Operating Income")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[11]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[11]?.amount ? appListData?.data?.resultList[11]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[11]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[11]?.amount1 ? appListData?.data?.resultList[11]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[11]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[11]?.amount2 ? appListData?.data?.resultList[11]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[11]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[11]?.amount3 ? appListData?.data?.resultList[11]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[11]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[11]?.amtttl ? appListData?.data?.resultList[11]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: '10px'
                                            }}>
                                                {props.t("Non-Operating Expenses")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[12]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[12]?.amount ? appListData?.data?.resultList[12]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[12]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[12]?.amount1 ? appListData?.data?.resultList[12]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[12]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[12]?.amount2 ? appListData?.data?.resultList[12]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[12]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[12]?.amount3 ? appListData?.data?.resultList[12]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[12]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[12]?.amtttl ? appListData?.data?.resultList[12]?.amtttl : "0"}
                                            </td>
                                        </tr>
                                        <tr className="mpst-tr" style={{ height: "100%" }}>
                                            <td className="mpst-td" colSpan={2} valign="middle" style={{
                                                fontWeight: 'bold',
                                                backgroundColor: '#EEECE1',
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                maxWidth: "10px"
                                            }}>
                                                {props.t("Income(Loss) Before Income Tax")}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[13]?.amount.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[13]?.amount ? appListData?.data?.resultList[13]?.amount : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[13]?.amount1.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[13]?.amount1 ? appListData?.data?.resultList[13]?.amount1 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[13]?.amount2.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[13]?.amount2 ? appListData?.data?.resultList[13]?.amount2 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[13]?.amount3.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[13]?.amount3 ? appListData?.data?.resultList[13]?.amount3 : "0"}
                                            </td>
                                            <td className="mpst-td" style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb",
                                                padding: " 0.25rem !important",
                                                color: appListData?.data?.resultList[13]?.amtttl.startsWith("-") ? "red" : "black"
                                            }}>
                                                {appListData?.data?.resultList[13]?.amtttl ? appListData?.data?.resultList[13]?.amtttl : "0"}
                                            </td>
                                        </tr>
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

MovingPlanInputResult.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MovingPlanInputResult)