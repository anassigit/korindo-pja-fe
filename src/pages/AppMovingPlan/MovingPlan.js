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
        setLoadingSpinner(false)
        if (appCompanyCodeListData.status === '0') {
            setappMovingPlanMsg(appCompanyCodeListData)
        }
    }, [appCompanyCodeListData])

    useEffect(() => {
        setLoadingSpinner(false)
        if (appListData.status === '0') {
            setappMovingPlanMsg(appListData)
        }
    }, [appListData])

    const handleSearch = () => {
        setappMovingPlanMsg('')
        setLoadingSpinner(true)
        dispatch(getMovingPlantList(
            {
                year: parseInt(selectedYear),
                companyCode: selectedCompanyCode,
            }
        ))
    }

    return (
        <RootPageCustom msgStateGet={appMovingPlanMsg} msgStateSet={setappMovingPlanMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {props.t('Moving Plan')}
                        </CardHeader>
                        <CardBody>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '30%',
                                gap: '.75vw'
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
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th colSpan={5} rowSpan={2}>
                                            ITEMS
                                        </th>
                                        <th>
                                            test
                                        </th>
                                        <th>
                                            test
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={4} rowSpan={3} align="center" valign="middle">
                                            Group TOTAL (IVAL1)
                                        </td>
                                        <td colSpan={1} rowSpan={1}>
                                            Revenue (ITEM)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={1} rowSpan={1}>
                                            O.I (ITEM)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={1} rowSpan={1}>
                                            O.I (%) (ITEM)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={1} rowSpan={1}>
                                        </td>
                                        <td colSpan={3} rowSpan={2} align="center" valign="middle">
                                            자원
                                            <br/>
                                            (Resources) (IVAL1_1)
                                        </td>
                                        <td colSpan={1} rowSpan={1}>
                                            Revenue (ITEM)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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