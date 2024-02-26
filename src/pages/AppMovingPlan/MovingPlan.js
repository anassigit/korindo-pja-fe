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
import { getCompanyCodeList, getMovingPlantList, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'

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

    const [selectedYear, setSelectedYear] = useState("")
    const [selectedCompanyCode, setselectedCompanyCode] = useState("")

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getCompanyCodeList())
        dispatch(getMovingPlantList(
            {
                year: selectedYear,
                companyCode: selectedCompanyCode,
            }
        ))
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appCompanyCodeListData?.status === '0') {
            setappMovingPlanMsg(appCompanyCodeListData)
        }
    }, [appCompanyCodeListData])

    useEffect(() => {
        if (appListData?.status === 0 || appListData?.status === '0') {
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
        setLoadingSpinner(true)
        dispatch(getMovingPlantList(
            {
                year: selectedYear,
                companyCode: selectedCompanyCode,
            }
        ))
    }

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
            props.t("PreY"),
            'BP',
            'MP',
            props.t("Actual"),
            props.t("GrowthVsPY"),
            props.t("AchieveVsBP"),
            props.t("AchieveVsMP"),
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
                                                backgroundColor: item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white'
                                            }}>
                                            <div
                                                style={{ width: '154px' }}
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
                                                    <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                                                    <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                                                    <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                    <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                    <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                    <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                                                    style={{ width: '175px' }}
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
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.interestExpenseList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomeList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
                                                    </React.Fragment>
                                                )) : item?.netIncomePersenteList.map((row, i) => (
                                                    <React.Fragment key={i}>
                                                        <td style={{textAlign: 'right'}}>{row.pyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.bp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.cyac}</td>
                                                        <td style={{textAlign: 'right'}}>{row.grw}</td>
                                                        <td style={{textAlign: 'right'}}>{row.abp}</td>
                                                        <td style={{textAlign: 'right'}}>{row.amp}</td>
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
                            {props.t('Moving Plan')}
                        </CardHeader>
                        <CardBody>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '.75vw',
                            }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '.75vw',
                                    }}
                                >
                                    <span style={{ whiteSpace: 'nowrap' }}>{props.t("Year")}</span>
                                    <Input
                                        type="text"
                                        style={{
                                            width: '90%',
                                        }}
                                        className="form-control"
                                        onChange={e => {
                                            setSelectedYear(e.target.value)
                                        }}
                                        onKeyDown={e => e.key === 'Enter' ? handleSearch() : null}
                                    />
                                </div>
                                <Input
                                    style={{ width: 'auto' }}
                                    type="select"
                                    onChange={(e) => {
                                        setselectedCompanyCode(e.target.value)
                                    }}
                                >
                                    {Array.isArray(appCompanyCodeListData?.data?.resultList) ? (
                                        <>
                                            <option value={''}>{props.t("Select Company")}</option>
                                            {appCompanyCodeListData?.data?.resultList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item?.companyCode}>
                                                        {item?.companyName}
                                                    </option>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <option>
                                            {props.t("No Data")}
                                        </option>
                                    )}
                                </Input>
                                <Button
                                    style={{ width: 'auto' }}
                                    className="btn btn-primary" onClick={() => handleSearch()}>
                                    {props.t("Search")}
                                </Button>
                            </div>
                            <div style={{ overflow: 'auto', maxHeight: '80vh', marginTop: '10px' }}>
                                <table className="table table-bordered my-3">
                                    <thead style={{ color: 'white', backgroundColor: '#81B642', zIndex: 3 }}>
                                        <tr>
                                            <th colSpan={5} rowSpan={2} style={{ textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: 0, backgroundColor: '#81B642', zIndex: '2', minWidth: '300px' }}>
                                                {props.t("ITEMS")}
                                            </th>
                                            {Array.from({ length: 12 }, (_, monthIndex) => (
                                                <React.Fragment key={monthIndex}>
                                                    <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                        {getMonthAbbreviation(monthIndex + 1)}
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                            <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                {props.t("Year to Date")}
                                            </th>
                                            <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                {props.t("Total")}
                                            </th>
                                        </tr>
                                        <tr>
                                            {Array.from({ length: 14 * 7 }, (_, index) => (
                                                <th key={index} style={{ textAlign: 'center', minWidth: 'auto' }}>
                                                    {getColumnHeader(index)}
                                                </th>
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