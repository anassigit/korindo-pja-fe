import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Label,
    Spinner
} from "reactstrap";
import { getCompanyCodeList, getMovingPlantList, resetMessage } from "store/actions";
import '../../assets/scss/custom/components/custom-datepicker.scss';
import "../../assets/scss/custom/table/TableCustom.css";
import RootPageCustom from '../../common/RootPageCustom';
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

    const [appMovingPlanMsg, setappMovingPlanMsg] = useState("")

    const [selectedYear, setSelectedYear] = useState("2023")
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
        if (appListData?.status === '0') {
            setappMovingPlanMsg(appListData)
            setLoadingSpinner(false)
        } else if (appListData?.status === '1') {
            setLoadingSpinner(false)
        }
    }, [appListData])

    const handleSearch = () => {
        setappMovingPlanMsg('')
        setLoadingSpinner(true)
        dispatch(getMovingPlantList(
            {
                year: selectedYear,
                companyCode: selectedCompanyCode,
            }
        ))
    }

    const getMonthAbbreviation = (monthIndex) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex - 1];
    };

    const getColumnHeader = (index) => {
        const baseHeaders = ['Pre. Y', 'BP', 'MP', 'Actual', 'Growth vs. PY', 'Achieve vs. BP', 'Achieve vs. MP']
        const singkatanHeader = ['PYAC', 'BP', 'MP', 'CYAC', 'GRW', 'ABP', 'AMP']
        const monthNumber = Math.floor(index / baseHeaders.length) + 1
        const columnHeader = `${baseHeaders[index % baseHeaders.length]} (${singkatanHeader[index % singkatanHeader.length]}${monthNumber.toString().padStart(2, '0')})`
        return columnHeader
    }

    const RecursiveJsx = ({ data, depth = 0 }) => {

        return (
            <React.Fragment>
                {
                    Array.isArray(data) ? data?.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    {/* {
                                        index === 0 ? null : (
                                            <td colSpan={1} rowSpan={appListData?.data?.resultList.length}>
                                            </td>
                                        )
                                    } */}
                                    <td colSpan={4} rowSpan={3} align="center" valign="middle" style={{
                                        position: 'sticky',
                                        left: '0',
                                        backgroundColor: item?.level === 0 ? '#CCE295' : item?.level === 1 ? '#E6F0D8' : item?.level === 2 ? '#F2F2F2' : item?.level === 3 ? 'white' : item?.level === 4 ? '#EEECE1' : 'white'
                                    }}>
                                        {item?.title}
                                    </td>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white',
                                    }}>
                                        Revenue (ITEM)
                                    </td>
                                    {
                                        item.revenueList.map((row, i) => (
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
                                    }
                                </tr>
                                <tr>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white'
                                    }}>
                                        O.I (ITEM)
                                    </td>
                                    {
                                        item.oiLIst.map((row, i) => (
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
                                    }
                                </tr>
                                <tr>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white'
                                    }}>
                                        O.I (%) (ITEM)
                                    </td>
                                    {
                                        item.oiPersenteList.map((row, i) => (
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
                                    }
                                </tr>
                                <RecursiveJsx
                                    data={item.childList}
                                    depth={depth}
                                />
                            </>
                        )
                    }) : data ?
                        (
                            <React.Fragment>
                                <tr>
                                    <td colSpan={4} rowSpan={3} align="center" valign="middle" style={{
                                        position: 'sticky',
                                        left: '0',
                                        // backgroundColor: item.ival1 ? '#CCE295' : item.ival1_1 ? '#E6F0D8' : item.ival1_2 ? '#F2F2F2' : item.ival1_3 ? 'white' : item.ival1_4 ? '#EEECE1' : 'white'
                                        backgroundColor: data?.level === 0 ? '#CCE295' : data?.level === 1 ? '#E6F0D8' : data?.level === 2 ? '#F2F2F2' : data?.level === 3 ? 'white' : data?.level === 4 ? '#EEECE1' : 'white'
                                    }}>
                                        {data?.title}
                                    </td>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white',
                                    }}>
                                        Revenue (ITEM)
                                    </td>
                                    {
                                        data?.revenueList.map((row, i) => (
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
                                    }
                                </tr>
                                <tr>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white'
                                    }}>
                                        O.I (ITEM)
                                    </td>
                                    {
                                        data?.oiLIst.map((row, i) => (
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
                                    }
                                </tr>
                                <tr>
                                    <td colSpan={1} rowSpan={1} style={{
                                        position: 'sticky',
                                        left: '8.6rem',
                                        backgroundColor: 'white'
                                    }}>
                                        O.I (%) (ITEM)
                                    </td>
                                    {
                                        data?.oiPersenteList.map((row, i) => (
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
                                    }
                                </tr>
                                <RecursiveJsx
                                    data={data.childList}
                                    depth={depth}
                                />
                            </React.Fragment>
                        ) : null
                }
            </React.Fragment>
        )
    }

    RecursiveJsx.propTypes = {
        data: PropTypes.any,
        depth: PropTypes.any,
    };



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
                                width: '30%',
                                gap: '.75vw',
                            }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        gap: '.75vw',
                                    }}
                                >
                                    <span>{props.t("Year")}</span>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        onChange={e => {
                                            setSelectedYear(e.target.value);
                                        }}
                                        onKeyDown={e => e.key === 'Enter' ? handleSearch() : null}
                                    />
                                </div>
                                <Input
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
                                                    <option key={index} value={item.companyCode}>
                                                        {item.companyName}
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
                                <Button className="btn btn-primary" onClick={() => handleSearch()}>
                                    {props.t("Search")}
                                </Button>
                            </div>
                            <div style={{ overflow: 'auto', maxHeight: '80vh', marginTop: '10px' }}>
                                <table className="table table-bordered my-3">
                                    <thead style={{ color: 'white', backgroundColor: '#81B642', zIndex: 3 }}>
                                        <tr>
                                            <th colSpan={5} rowSpan={2} style={{ textAlign: 'center', verticalAlign: 'center', position: 'sticky', left: 0, backgroundColor: '#81B642', zIndex: '2' }}>
                                                ITEMS
                                            </th>
                                            {Array.from({ length: 12 }, (_, monthIndex) => (
                                                <React.Fragment key={monthIndex}>
                                                    <th colSpan={7} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                        {getMonthAbbreviation(monthIndex + 1)}
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                        <tr>
                                            {Array.from({ length: 12 * 7 }, (_, index) => (
                                                <th key={index} style={{ textAlign: 'center', minWidth: '200px' }}>
                                                    {getColumnHeader(index)}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody style={{ position: 'relative' }}>
                                        {console.log(appListData)}

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
    );


}

MovingPlan.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MovingPlan)