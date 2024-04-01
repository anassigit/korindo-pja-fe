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
import { getActualInputData, getCorporationList, getGroupListKPI, resetMessage } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import DatePicker from "react-datepicker"
import moment from "moment"
import AddKPIResult from "./AddKPIResult"

const KPIInputResult = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appListData = useSelector((state) => {
        return state.kpiReducer.respGetActualInputData
    })

    const appGroupListData = useSelector((state) => {
        return state.kpiReducer.respGetGroupListKpi
    })

    const appCorporationListData = useSelector((state) => {
        return state.kpiReducer.respGetCorporationList
    })

    const appEditActualInputMessage = useSelector(state => {
        return state.kpiReducer.msgEdit
    })

    const toggleAddGroupMappingModal = () => {
        setAddGroupMappingModal(!addGroupMappingModal)
    }

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appEditMode, setAppEditMode] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [appDataEdited, setAppDataEdited] = useState([])
    const [isEdit, setIsEdit] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('yyyy-MM'))
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [addGroupMappingModal, setAddGroupMappingModal] = useState(false)

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getGroupListKPI({
            viewType: 2
        }))
    }, [])

    useEffect(() => {
        setLoadingSpinner(false)
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appGroupListData, appCorporationListData, appListData])

    useEffect(() => {
        setLoadingSpinner(true)
        if (selectedGroupList) {
            dispatch(getCorporationList({
                groupNum: selectedGroupList
            }))
        } else {
            dispatch(getCorporationList({
                groupNum: ''
            }))
        }
    }, [selectedGroupList])

    useEffect(() => {
        if (selectedCorporationList && selectedGroupList && selectedDate) {
            setLoadingSpinner(true)
            dispatch(getActualInputData({
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                date: selectedDate.replace(/-/g, "")
            }))
        } else {
            dispatch(getActualInputData({
                groupNum: '',
                corporationId: '',
                date: selectedDate.replace(/-/g, "")
            }))
        }
    }, [selectedGroupList, selectedCorporationList, selectedDate])

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <AddKPIResult
                        modal={addGroupMappingModal}
                        toggle={toggleAddGroupMappingModal}
                    />
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {"Input KPI Result"}
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
                                        value={selectedGroupList}
                                        onChange={(e) => {
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
                                        disabled={appListData?.data?.list.length > 0 ? false : true}
                                        className={appListData?.data?.list.length > 0 ? "" : "btn btn-dark opacity-25"}
                                        onClick={() => { downloadPlan() }}>
                                        <i className="mdi mdi-download" />{" "}
                                        {'Download Excel'}
                                    </Button>
                                    <Button onClick={() =>
                                        downloadPlanTemplate()
                                    }>
                                        <i className="mdi mdi-download" />{" "}
                                        {'Download Template'}
                                    </Button>
                                    <Button onClick={() => toggleUploadModal()}>
                                        {'Upload'}
                                    </Button>
                                </div>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{"KPI Category"}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{"Plan"}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{"Result"}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">Catch Up</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appListData?.data?.list.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1} style={{ textAlign: "right" }}>{item.plan.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                        <td colSpan={1} style={{ textAlign: "right" }}>{item.result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <Button onClick={toggleAddGroupMappingModal}><i className="mdi mdi-plus fs-5 align-middle" />{" "}Add</Button>
                                                        </td>
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
                </>
            }
        />
    )
}

KPIInputResult.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIInputResult)