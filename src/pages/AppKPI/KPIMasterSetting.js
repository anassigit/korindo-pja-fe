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
    Spinner
} from "reactstrap";
import { getCorporationList, getDownloadMasterTemplate, getGroupListKPI, getKPIMaster, getYearList, resetMessage } from "store/actions";
import '../../assets/scss/custom/components/custom-datepicker.scss';
import "../../assets/scss/custom/table/TableCustom.css";
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';
import UploadKPIMaster from "./UploadKPIMaster";
import { getDownloadMasterTemplateBE } from "helpers/backend_helper";


const KPIMasterSetting = (props) => {

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

    const appKPIMasterListData = useSelector((state) => {
        return state.kpiReducer.respGetKPIMaster
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIMasterState, setAppKPIMasterState] = useState([])

    const [appKPIMsg, setAppKPIMsg] = useState("")

    const [uploadModal, setUploadModal] = useState(false)

    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")

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
    }, [appYearListData])

    useEffect(() => {
        if (selectedGroupList) {
            dispatch(getCorporationList({
                groupNum: selectedGroupList
            }))
        }
    }, [selectedGroupList, selectedYear])

    useEffect(() => {
        dispatch(getKPIMaster({
            groupNum: selectedGroupList,
            corporationId: selectedCorporationList,
            year: selectedYear,
        }))
    }, [selectedCorporationList, selectedGroupList, selectedYear])

    useEffect(() => {
        if (appKPIMasterListData.status === '1') {
            setAppKPIMasterState(appKPIMasterListData.data.list)
        } else {
            setAppKPIMasterState([])
        }
    }, [appKPIMasterListData])


    const downloadMasterTemplate = async () => {
        try {
            dispatch(getDownloadMasterTemplateBE({
                file_nm: "KPI MASTER TEMPLATE.xlsx"
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const toggleUploadModal = () => {
        setUploadModal(!uploadModal)
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {props.t('KPI Master Setting')}
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
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
                                                <option>{props.t('Select Year')}</option>
                                                {appYearListData?.data?.list.map((item, index) => (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option>
                                                {props.t('No Data')}
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
                                                <option value={''}>{props.t('Select Group')}</option>
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
                                                {props.t('No Data')}
                                            </option>
                                        )}
                                    </Input>
                                    <Input
                                        type="select"
                                        onChange={(e) => setSelectedCorporationList(e.target.value)}
                                    >
                                        {Array.isArray(appCorporationListData?.data?.list) ? (
                                            <>
                                                <option value={''}>{props.t('Select Corporation')}</option>
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
                                                {props.t('No Data')}
                                            </option>
                                        )}
                                    </Input>
                                </div>
                                <div>
                                    <Button onClick={() => downloadMasterTemplate()}>
                                        <i className="mdi mdi-download" />{" "}
                                        {props.t('Download Template')}
                                    </Button>
                                    <Button style={{ marginLeft: "1rem" }} onClick={() => toggleUploadModal()}>
                                        {props.t('Upload')}
                                    </Button>
                                </div>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t('KPI Category')}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t('Unit')}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t('Increase')}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t('Definitions and Formulas')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appKPIMasterState.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1}>{item.unit}</td>
                                                        <td colSpan={1}>{item.increase}</td>
                                                        <td colSpan={1}>{item.formulas}</td>
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
                    <UploadKPIMaster
                        modal={uploadModal}
                        toggle={toggleUploadModal}
                    />
                </>
            }
        />
    );


}

KPIMasterSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIMasterSetting)