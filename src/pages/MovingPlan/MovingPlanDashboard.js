import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    InputGroup,
    Spinner,
    UncontrolledTooltip
} from "reactstrap"
import { downloadMovingPlanDashboardExcel, getCompanyList, getMovingPlanDashboardList, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import Swal from "sweetalert2"
import moment from "moment"
import DatePicker from "react-datepicker"

const MovingPlanDashboard = (props) => {

    const dispatch = useDispatch()

    const appCompanyCodeListData = useSelector((state) => {
        return state.movingPlanReducer.respGetCompanyList
    })

    const appListData = useSelector((state) => {
        return state.movingPlanReducer.respGetMovingPlanDashboardList
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [firstSearch, setFirstSearch] = useState(false)
    const [appMsg, setAppMsg] = useState("")
    const [selectedYear, setSelectedYear] = useState(moment().format('yyyy'))
    const [selectedCompanyCode, setselectedCompanyCode] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const datePickerRef = useRef(null);

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getCompanyList({ viewType: 1 }))
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appCompanyCodeListData?.status === '0') {
            setAppMsg(appCompanyCodeListData)
        }
        setLoadingSpinner(false)
    }, [appCompanyCodeListData])

    useEffect(() => {
        if (appListData?.status === '0') {
            if (firstSearch) {
                setAppMsg(appListData)
            }
            setLoadingSpinner(false)
        } else if (appListData?.status === '1') {
            setLoadingSpinner(false)
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
        setFirstSearch(true)
        setLoadingSpinner(true)
        if (!selectedCompanyCode) {
            dispatch(getMovingPlanDashboardList(
                {
                    year: selectedYear
                }
            ))
        } else {
            dispatch(getMovingPlanDashboardList(
                {
                    year: selectedYear,
                    companyCode: selectedCompanyCode
                }
            ))
        }
    }

    const years = []

    for (let year = 2017; year <= new Date().getFullYear(); year++) {
        years.push(year);
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
            "Dec",
        ]
        return months[monthIndex - 1]
    }

    const getColumnHeader = (index) => {
        const baseHeaders = [
            "Pre. Y",
            'BP',
            'MP',
            "Actual",
            "Growth vs. PY",
            "Achieve vs. BP",
            "Achieve vs. MP",
        ]
        const columnHeader = `${baseHeaders[index % baseHeaders.length]}`
        return columnHeader
    }

    const getToolTipHeader = (index) => {
        const baseHeaders = [
            "작년 실적",
            "사업계획",
            "이동계획",
            "실적",
            "작년 대비 실적",
            "사업계획 대비 실적",
            "이동계획 대비 실적",
        ]
        const columnHeader = `${baseHeaders[index % baseHeaders.length]}`
        return columnHeader
    }

    const RecursiveJsx = ({ data, depth = 0 }) => {
        return (
            <React.Fragment>
                {
                    Array.isArray(data) && data.every(item => item.level !== 0) ? (
                        data.map((item, index) => {
                            const backgroundColor = item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white'
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        {
                                            item.level > 0 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        fontWeight: 'bold',
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={item.level < 3 ? item.level : 3}
                                                    rowSpan={1}></td>
                                            ) : null
                                        }
                                        <td
                                            colSpan={item.level === 1 ? 3 : item.level === 2 ? 2 : item.level === 3 ? 1 : item.level === 4 ? 1 : 4}
                                            rowSpan={3}
                                            align="center"
                                            valign="middle"
                                            style={{
                                                position: 'sticky',
                                                left: item.level === 0 ? '0' : '1.55rem',
                                                backgroundColor: item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white',
                                                fontWeight: 'bold',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                            <div
                                                style={{ width: '154px', fontWeight: 'bold' }}
                                            >
                                                {item?.title}
                                            </div>
                                        </td>
                                        <td colSpan={1} rowSpan={1} style={{
                                            position: 'sticky',
                                            left: '12.7rem',
                                            backgroundColor: 'white',
                                            whiteSpace: 'nowrap',
                                            border: "1px solid #f8f8fb"
                                        }}>
                                            Revenue (ITEM)
                                        </td>
                                        {
                                            item.revenueList.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                </React.Fragment>
                                            ))
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            item.level === 0 ? (
                                                null
                                            ) : item.level === 1 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={1} rowSpan={1}></td>
                                            ) : item.level === 2 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={2} rowSpan={1}></td>
                                            ) : item.level === 3 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            ) : (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            )
                                        }
                                        <td colSpan={1} rowSpan={1} style={{
                                            position: 'sticky',
                                            left: '12.7rem',
                                            backgroundColor: 'white',
                                            whiteSpace: 'nowrap',
                                            border: "1px solid #f8f8fb"
                                        }}>
                                            O.I (ITEM)
                                        </td>
                                        {
                                            item.oiLIst.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                </React.Fragment>
                                            ))
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            item.level === 0 ? (
                                                null
                                            ) : item.level === 1 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={1} rowSpan={1}></td>
                                            ) : item.level === 2 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={2} rowSpan={1}></td>
                                            ) : item.level === 3 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            ) : (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                        border: "1px solid #f8f8fb"
                                                    }}
                                                    colSpan={4} rowSpan={1}></td>
                                            )
                                        }
                                        <td colSpan={1} rowSpan={1} style={{
                                            position: 'sticky',
                                            left: '12.7rem',
                                            backgroundColor: 'white',
                                            border: "1px solid #f8f8fb"
                                        }}>
                                            O.I (%) (ITEM)
                                        </td>
                                        {
                                            item.oiPersenteList.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                </React.Fragment>
                                            ))
                                        }
                                    </tr>
                                    {
                                        item.title === 'GROUP TOTAL' ? null : (
                                            <RecursiveJsx
                                                data={item.childList}
                                                depth={depth}
                                            />
                                        )
                                    }
                                </React.Fragment>
                            )
                        })) : Array.isArray(data) ? (
                            data.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td colSpan={4} rowSpan={3} align="center" valign="middle" style={{
                                                position: 'sticky',
                                                left: '0',
                                                backgroundColor: item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                <div
                                                    style={{ width: '175px', fontWeight: 'bold' }}
                                                >
                                                    {item?.title}
                                                </div>
                                            </td>
                                            <td colSpan={1} rowSpan={1} style={{
                                                position: 'sticky',
                                                left: '12.7rem',
                                                backgroundColor: 'white',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                {
                                                    item.interestExpenseList ? "Interest Expense" : "Revenue (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.revenueList) ? item?.revenueList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.interestExpenseList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td colSpan={1} rowSpan={1} style={{
                                                position: 'sticky',
                                                left: '12.7rem',
                                                backgroundColor: 'white',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                {
                                                    item.netIncomeList ? "Net Income" : "O.I (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.oiLIst) ? item?.oiLIst.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomeList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td colSpan={1} rowSpan={1} style={{
                                                position: 'sticky',
                                                left: '12.7rem',
                                                backgroundColor: 'white',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                {
                                                    item.netIncomeList ? "Net Income (%)" : "O.I (%) (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.oiPersenteList) ? item?.oiPersenteList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomePersenteList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right', border: "1px solid #f8f8fb" }}>{row.amp}</td>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tr>
                                        {
                                            Array.isArray(item.childList) && (
                                                <RecursiveJsx
                                                    data={item.childList}
                                                    depth={depth}
                                                />
                                            )
                                        }
                                    </React.Fragment>
                                )
                            })
                        ) : null
                }
            </React.Fragment>
        )
    }

    RecursiveJsx.propTypes = {
        data: PropTypes.any,
        depth: PropTypes.any,
    }

    return (
        <RootPageCustom msgStateGet={appMsg} msgStateSet={setAppMsg}
            componentJsx={
                <>
                    <Card fluid="true" style={{ paddingBottom: '32px' }}>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            Dashboard
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '.75vw',
                                }}>

                                    <Input
                                        style={{ width: 'auto' }}
                                        type="select"
                                        onChange={(e) => {
                                            setselectedCompanyCode(e.target.value)
                                        }}
                                    >
                                        {Array.isArray(appCompanyCodeListData?.data?.resultList) ? (
                                            <>
                                                <option value={''}>All Company</option>
                                                {appCompanyCodeListData?.data?.resultList.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item?.companyCode}>
                                                            {item?.companyInitial}
                                                        </option>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <option>
                                                {"No Data"}
                                            </option>
                                        )}
                                    </Input>
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
                                                showYearPicker
                                                dateFormat="yyyy"
                                                yearItemNumber={years.length}
                                                yearDropdownItem={years.map(year => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                                selected={selectedYear ? moment(selectedYear, 'yyyy').toDate() : new Date()}
                                                onChange={(date) => {
                                                    setShowDatePicker(false)
                                                    setIsButtonClicked(false)
                                                    setSelectedYear(date ? moment(date).format('yyyy') : new Date())
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
                                                                value={selectedYear ? moment(selectedYear).format('yyyy') : moment().format('yyyy')}
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
                                    <Button
                                        className="btn btn-primary"
                                        onClick={() => handleSearch()}
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        Search
                                    </Button>
                                </div>
                                <Button
                                    disabled={appListData?.data?.resultList.length > 0 ? false : true}
                                    className={appListData?.data?.resultList.length > 0 ? "" : "btn btn-dark opacity-25"}
                                    onClick={() => {
                                        dispatch(downloadMovingPlanDashboardExcel({
                                            year: selectedYear ? selectedYear.getFullYear() : '',
                                            companyCode: selectedCompanyCode,
                                            file_nm: 'MOVING PLAN.xlsx',
                                        }))
                                    }}>
                                    <i className="mdi mdi-download" />{" "}
                                    Download Excel
                                </Button>
                            </div>
                            <div style={{
                                color: 'red',
                                display: 'flex',
                                justifyContent: 'right',
                                marginTop: '10px',
                                marginRight: '8px'
                            }}>
                                * Pre.Y, BP, MP, Actual is In Million (Juta)
                            </div>
                            <div style={{
                                overflow: 'auto',
                                maxHeight: '80vh'
                            }}>
                                <table className="table table-borderless my-3" style={{
                                    borderCollapse: "separate",
                                    borderSpacing: "0"
                                }}>
                                    <thead style={{
                                        color: 'white',
                                        backgroundColor: '#81B642',
                                        zIndex: 3
                                    }}>
                                        <tr>
                                            <th colSpan={5} rowSpan={2} style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                position: 'sticky',
                                                left: 0,
                                                backgroundColor: '#81B642',
                                                zIndex: '2',
                                                minWidth: '300px',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                ITEMS
                                            </th>
                                            {Array.from({ length: 12 }, (_, monthIndex) => (
                                                <React.Fragment key={monthIndex}>
                                                    <th colSpan={7} style={{
                                                        textAlign: 'center',
                                                        verticalAlign: 'center',
                                                        border: "1px solid #f8f8fb"
                                                    }}>
                                                        {getMonthAbbreviation(monthIndex + 1)}
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                            <th colSpan={7} style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                {"Year to Date"}
                                            </th>
                                            <th colSpan={7} style={{
                                                textAlign: 'center',
                                                verticalAlign: 'center',
                                                border: "1px solid #f8f8fb"
                                            }}>
                                                {"Total"}
                                            </th>
                                        </tr>
                                        <tr>
                                            {Array.from({ length: 14 * 7 }, (_, index) => (
                                                <React.Fragment key={index}>
                                                    <th id={`tooltip-${index}`} style={{
                                                        textAlign: 'center',
                                                        minWidth: 'auto',
                                                        border: "1px solid #f8f8fb"
                                                    }}>
                                                        {getColumnHeader(index)}
                                                    </th>
                                                    <UncontrolledTooltip target={`tooltip-${index}`} placement="bottom">
                                                        {getToolTipHeader(index)}
                                                    </UncontrolledTooltip>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody style={{ position: 'relative' }}>
                                        {
                                            <RecursiveJsx
                                                data={appListData?.data?.resultList}
                                            />
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

MovingPlanDashboard.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MovingPlanDashboard)