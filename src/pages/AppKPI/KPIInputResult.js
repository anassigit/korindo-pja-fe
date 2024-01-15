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
import { getActualInputData, getCorporationList, getGroupListKPI, getYearList, resetMessage, setActualInputData } from "store/actions"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'


const KPIInputResult = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")

    const dispatch = useDispatch()

    const appListData = useSelector((state) => {
        return state.kpiReducer.respGetActualInputData
    })

    const appYearListData = useSelector((state) => {
        return state.kpiReducer.respGetYearList
    })

    const appGroupListData = useSelector((state) => {
        return state.kpiReducer.respGetGroupListKpi
    })

    const appCorporationListData = useSelector((state) => {
        return state.kpiReducer.respGetCorporationList
    })

    const appEditActualInputMessage = useSelector(state => {
        return state.kpiReducer.msgEdit;
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appEditMode, setAppEditMode] = useState(false)
    const [appKPIMsg, setAppKPIMsg] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCorporationList, setSelectedCorporationList] = useState("")
    const [appDataEdited, setAppDataEdited] = useState([])
    const [isEdit, setIsEdit] = useState([])

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getYearList())
        dispatch(getGroupListKPI())
    }, [])

    useEffect(() => {
        setLoadingSpinner(false)
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setLoadingSpinner(false)
    }, [appYearListData, appGroupListData, appCorporationListData, appListData])

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
        setAppEditMode(false)
        if (selectedYear && selectedMonth && selectedCorporationList && selectedGroupList) {
            setLoadingSpinner(true)
            dispatch(getActualInputData({
                groupNum: selectedGroupList,
                corporationId: selectedCorporationList,
                year: selectedYear,
                month: selectedMonth,
            }))
        } else {
            dispatch(getActualInputData({
                groupNum: '',
                corporationId: '',
                year: '',
                month: '',
            }))
        }
    }, [selectedYear, selectedMonth, selectedGroupList, selectedCorporationList])

    useEffect(() => {
        if (appListData.status === '1') {
            setIsEdit(appListData.data.edit)
        } else {
            setIsEdit(false)
        }
    }, [appListData])

    useEffect(() => {
        if (appEditMode === true) {
            setAppDataEdited(appListData.data.list)
        } else {
            setAppDataEdited([])
        }
    }, [appEditMode])

    useEffect(() => {
        setLoadingSpinner(false)
        setAppKPIMsg(appEditActualInputMessage)
    }, [appEditActualInputMessage])

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    <Card fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            {props.t("Input KPI Result")}
                        </CardHeader>
                        <CardBody>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center',
                                }}
                            >
                                <Input
                                    type="select"
                                    style={{ width: 'auto' }}
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value)
                                    }}
                                >
                                    <option>{props.t('Select Year')}</option>
                                    {
                                        appYearListData?.data?.list.map((item) => {
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
                                        setSelectedMonth(e.target.value)
                                    }}
                                >
                                    <option>{props.t('Select Month')}</option>
                                    {
                                        Array.from({ length: 12 }, (_, index) => {
                                            const month = new Date(selectedYear, index, 1).toLocaleString('en-US', { month: 'short' });
                                            return (
                                                <option key={index} value={index + 1}>
                                                    {langType === 'kor' ? index + 1 + "월" : month}
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
                                        setSelectedCorporationList('')
                                        setSelectedGroupList(e.target.value)
                                    }}
                                >
                                    <option value={''}>{props.t('Select Group')}</option>
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
                                                <option value={''}>{props.t('Select Group')}</option>
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
                                            <option value={''}>{props.t('No Data')}</option>
                                        )
                                    }
                                </Input>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t("KPI Category")}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t("Unit")}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t("Plan")}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t("Result")}</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t("Note")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appEditMode === false ? appListData?.data?.list.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1}>{item.unit}</td>
                                                        <td colSpan={1}>{item.plan}</td>
                                                        <td colSpan={1}>{item.result}</td>
                                                        <td>{item.note}</td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        }) : appDataEdited.map((item, index) => {

                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>{item.item}</td>
                                                        <td colSpan={1}>{item.unit}</td>
                                                        <td colSpan={1}>{item.plan}</td>
                                                        {
                                                            appEditMode ?
                                                                (
                                                                    <td colSpan={1}>
                                                                        <Input
                                                                            type="number"
                                                                            value={item.result}
                                                                            onChange={(e) => {
                                                                                setAppDataEdited((prevState) => {
                                                                                    const updatedAppDataEdited = [...prevState]
                                                                                    updatedAppDataEdited[index] = {
                                                                                        ...updatedAppDataEdited[index],
                                                                                        result: parseInt(e.target.value)
                                                                                    }
                                                                                    return updatedAppDataEdited
                                                                                })
                                                                            }}
                                                                        >
                                                                        </Input>
                                                                    </td>
                                                                ) : (
                                                                    <td>{item.result}</td>
                                                                )
                                                        }
                                                        {
                                                            appEditMode ?
                                                                (
                                                                    <td colSpan={1}>
                                                                        <Input
                                                                            type="text"
                                                                            value={item.note}
                                                                            onChange={(e) => {
                                                                                setAppDataEdited((prevState) => {
                                                                                    const updatedAppDataEdited = [...prevState]
                                                                                    updatedAppDataEdited[index] = {
                                                                                        ...updatedAppDataEdited[index],
                                                                                        note: e.target.value
                                                                                    }
                                                                                    return updatedAppDataEdited
                                                                                });
                                                                            }}
                                                                        >
                                                                        </Input>
                                                                    </td>
                                                                ) : (
                                                                    <td>{item.note}</td>
                                                                )
                                                        }
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                appEditMode ? (
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'end' }}>
                                        <Button onClick={() => {
                                            const kpiSetDetailList = appDataEdited.reduce((changed, editedRow, index) => {
                                                const originalRow = appListData?.data?.list[index]
                                                editedRow.result = isNaN(editedRow.result) ? 0 : editedRow.result
                                                editedRow.note = editedRow.note.trim()
                                                if (
                                                    originalRow &&
                                                    (originalRow.result !== editedRow.result || originalRow.note !== editedRow.note)
                                                ) {
                                                    changed.push({
                                                        kpiId: originalRow.kpiId,
                                                        month: parseInt(selectedMonth),
                                                        result: editedRow.result,
                                                        note: editedRow.note
                                                    })
                                                }

                                                return changed
                                            }, [])
                                            if (kpiSetDetailList.length > 0) {
                                                setLoadingSpinner(true)
                                                dispatch(setActualInputData({kpiSetDetailList: kpiSetDetailList}))
                                            } else {
                                                setAppEditMode(false)
                                            }
                                        }}>
                                            {props.t("Save")}
                                        </Button>
                                        <Button className="btn-danger" onClick={() => setAppEditMode(false)}>
                                            {props.t("Cancel")}
                                        </Button>
                                    </div>
                                ) :
                                    appListData ?
                                        (
                                            <div style={{ display: isEdit ? 'flex' : 'none', justifyContent: 'end' }}>
                                                <Button
                                                    onClick={() => {
                                                        setAppEditMode(true)
                                                    }}>
                                                    {props.t("Edit")}
                                                </Button>
                                            </div>
                                        ) : null
                            }
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