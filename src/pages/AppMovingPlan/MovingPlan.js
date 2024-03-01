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
import { getCompanyCodeList, getMovingPlantList, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import ReactDatePicker from "react-datepicker"

const MovingPlan = (props) => {

    const dispatch = useDispatch()

    const appCompanyCodeListData = useSelector((state) => {
        return state.movingPlanReducer.respGetCompanyCodeList
    })

    const appListData = useSelector((state) => {
        return state.movingPlanReducer.respGetMovingPlanList
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [firstSearch, setFirstSearch] = useState(false)

    const [highestLevel, setHighestLevel] = useState(null)

    const [appMovingPlanMsg, setappMovingPlanMsg] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedCompanyCode, setselectedCompanyCode] = useState("")

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getCompanyCodeList())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appCompanyCodeListData?.status === '0') {
            setappMovingPlanMsg(appCompanyCodeListData)
        }
        setLoadingSpinner(false)
    }, [appCompanyCodeListData])

    useEffect(() => {
        if (appListData?.status === '0') {
            if (firstSearch) {
                setappMovingPlanMsg(appListData)
            }
            setLoadingSpinner(false)
        } else if (appListData?.status === '1') {
            setLoadingSpinner(false)
        }
    }, [appListData])

    const handleSearch = () => {
        setappMovingPlanMsg('')
        setFirstSearch(true)
        setHighestLevel(null)
        // if (selectedYear) {
        setLoadingSpinner(true)
        dispatch(getMovingPlantList(
            {
                year: selectedYear ? selectedYear.getFullYear() : '',
                companyCode: selectedCompanyCode,
            }
        ))
        // }
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
                        data.map((item, index, array) => {
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
                                        }}>
                                            Revenue (ITEM)
                                        </td>
                                        {
                                            item.revenueList.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.amp}</td>
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
                                                    }}
                                                    colSpan={1} rowSpan={1}></td>
                                            ) : item.level === 2 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={2} rowSpan={1}></td>
                                            ) : item.level === 3 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            ) : (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            )
                                        }
                                        <td colSpan={1} rowSpan={1} style={{
                                            position: 'sticky',
                                            left: '12.7rem',
                                            backgroundColor: 'white',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            O.I (ITEM)
                                        </td>
                                        {
                                            item.oiLIst.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.amp}</td>
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
                                                    }}
                                                    colSpan={1} rowSpan={1}></td>
                                            ) : item.level === 2 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={2} rowSpan={1}></td>
                                            ) : item.level === 3 ? (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={3} rowSpan={1}></td>
                                            ) : (
                                                <td
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        position: 'sticky',
                                                        left: 0,
                                                    }}
                                                    colSpan={4} rowSpan={1}></td>
                                            )
                                        }
                                        <td colSpan={1} rowSpan={1} style={{
                                            position: 'sticky',
                                            left: '12.7rem',
                                            backgroundColor: 'white'
                                        }}>
                                            O.I (%) (ITEM)
                                        </td>
                                        {
                                            item.oiPersenteList.map((row, i) => (
                                                <React.Fragment key={i}>
                                                    <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                    <td style={{ textAlign: 'right' }}>{row.amp}</td>
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
                            data.map((item, index, array) => {
                                if (Array.isArray(item.childList)) {
                                    setHighestLevel(getMaxLevel(item.childList))
                                }
                                function getMaxLevel(data) {
                                    let maxLevel = 0
                                    function traverse(node) {
                                        if (!node || !node.level) {
                                            return
                                        }
                                        maxLevel = Math.max(maxLevel, node.level)
                                        if (Array.isArray(node.childList)) {
                                            for (const child of node.childList) {
                                                traverse(child)
                                            }
                                        }
                                    }
                                    if (data) {
                                        for (const item of data) {
                                            traverse(item)
                                        }
                                    }

                                    return maxLevel
                                }
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td colSpan={4} rowSpan={3} align="center" valign="middle" style={{
                                                position: 'sticky',
                                                left: '0',
                                                backgroundColor: item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white'
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
                                            }}>
                                                {
                                                    item.interestExpenseList ? "Interest Expense" : "Revenue (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.revenueList) ? item?.revenueList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.interestExpenseList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td colSpan={1} rowSpan={1} style={{
                                                position: 'sticky',
                                                left: '12.7rem',
                                                backgroundColor: 'white'
                                            }}>
                                                {
                                                    item.netIncomeList ? "Net Income" : "O.I (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.oiLIst) ? item?.oiLIst.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomeList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td colSpan={1} rowSpan={1} style={{
                                                position: 'sticky',
                                                left: '12.7rem',
                                                backgroundColor: 'white'
                                            }}>
                                                {
                                                    item.netIncomeList ? "Net Income (%)" : "O.I (%) (ITEM)"
                                                }
                                            </td>
                                            {
                                                Array.isArray(item.oiPersenteList) ? item?.oiPersenteList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomePersenteList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{ textAlign: 'right' }}>{row.pyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.bp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.mp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.cyac}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.grw}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.abp}</td>
                                                        <td style={{ textAlign: 'right' }}>{row.amp}</td>
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
        <RootPageCustom msgStateGet={appMovingPlanMsg} msgStateSet={setappMovingPlanMsg}
            componentJsx={
                <>
                    <Card fluid="true" style={{ paddingBottom: '32px' }}>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {'Moving Plan'}
                        </CardHeader>
                        <CardBody>
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
                                            <option value={''}>{"All Company"}</option>
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
                                <InputGroup
                                    onClick={() => {
                                        setIsOpen(!isOpen)
                                    }}
                                    style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: '8vw',
                                        }}
                                    >
                                        <ReactDatePicker
                                            className={`form-control`}
                                            selected={selectedYear ? new Date(selectedYear) : ''}
                                            onChange={(selectedDate) => {
                                                setSelectedYear(selectedDate)
                                            }}
                                            open={isOpen}
                                            dateFormat="yyyy"
                                            showYearPicker
                                            onClickOutside={() => {
                                                setIsOpen(!isOpen)
                                            }}
                                        />
                                    </div>
                                    <span
                                        className="fas fa-calendar text-dark"
                                        onClick={() => {
                                            setIsOpen(!isOpen)
                                        }}
                                        style={{ fontSize: '16px', position: 'absolute', top: '25%', right: '10%' }}
                                    >

                                    </span>
                                </InputGroup>
                                <Button
                                    className="btn btn-primary" onClick={() => handleSearch()}>
                                    {"Search"}
                                </Button>
                            </div>
                            <div style={{ overflow: 'auto', maxHeight: '80vh', marginTop: '10px' }}>
                                <table className="table table-bordered my-3" style={{ borderColor: 'black' }}>
                                    <thead style={{ color: 'white', backgroundColor: '#81B642', zIndex: 3 }}>
                                        <tr>
                                            <th colSpan={5} rowSpan={2} style={{ color: 'black', textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: 0, backgroundColor: '#81B642', zIndex: '2', minWidth: '300px' }}>
                                                {"ITEMS"}
                                            </th>
                                            {Array.from({ length: 12 }, (_, monthIndex) => (
                                                <React.Fragment key={monthIndex}>
                                                    <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center', color: 'black' }}>
                                                        {getMonthAbbreviation(monthIndex + 1)}
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                            <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center', }}>
                                                {"Year to Date"}
                                            </th>
                                            <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center', }}>
                                                {"Total"}
                                            </th>
                                        </tr>
                                        <tr>
                                            {Array.from({ length: 14 * 7 }, (_, index) => (
                                                <React.Fragment key={index}>
                                                    <th id={`tooltip-${index}`} style={{ textAlign: 'center', minWidth: 'auto', color: 'black' }}>
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

MovingPlan.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MovingPlan)