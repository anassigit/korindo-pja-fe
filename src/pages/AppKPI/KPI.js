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
import { getCoorporationList, getGroupListKPI, getItemList, getPlan, getUnitList, getYearList, resetMessage } from "store/actions";
import '../../assets/scss/custom/components/custom-datepicker.scss';
import "../../assets/scss/custom/table/TableCustom.css";
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';


const KPI = (props) => {

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

    const appPlanListData = useSelector((state) => {
        return state.kpiReducer.respGetPlan
    })

    const appItemListData = useSelector((state) => {
        return state.kpiReducer.respGetItemList
    })

    const appUnitListData = useSelector((state) => {
        return state.kpiReducer.respGetUnitList
    })

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appKPIPage, setAppKPIPage] = useState(true)
    const [appEditMode, setAppEditMode] = useState(false)

    const [appPlanState, setAppPlanState] = useState([])

    const [selectedItems, setSelectedItems] = useState({})
    const [selectedItemsVal, setSelectedItemsVal] = useState([]);

    const [selectedItems2, setSelectedItems2] = useState({})
    const [selectedItemsVal2, setSelectedItemsVal2] = useState([]);

    const [newItemVal, setNewItemVal] = useState([])
    const [newUnitVal, setNewUnitVal] = useState([])
    const [newPlanVal, setNewPlanVal] = useState([[]])

    const [appKPIMsg, setAppKPIMsg] = useState("")

    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroupList, setSelectedGroupList] = useState("")
    const [selectedCoorporationList, setSelectedCoorporationList] = useState("")

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
            dispatch(getCoorporationList({
                groupNum: selectedGroupList
            }))
            dispatch(getItemList({
                groupNum: selectedGroupList
            }))
            dispatch(getUnitList({
                groupNum: selectedGroupList
            }))
        }
    }, [selectedGroupList, selectedYear])

    useEffect(() => {
        if (selectedYear && selectedCoorporationList && selectedGroupList) {
            dispatch(getPlan({
                groupNum: selectedGroupList,
                corporationId: selectedCoorporationList,
                year: selectedYear,
            }))
        } else {
            dispatch(getPlan({
                groupNum: '',
                corporationId: '',
                year: '',
            }))
        }
    }, [selectedCoorporationList, selectedGroupList, selectedYear])

    const handleCellClick = (index) => {
        setSelectedItems({
            ...selectedItems,
            [index]: true, // Toggle the value
        });
    };

    const handleCellBlur = (index) => {
        setSelectedItems({
            ...selectedItems,
            [index]: false,
        });
    };

    const updateSelectedItem = (index, newItem) => {
        setSelectedItemsVal((prevSelectedItems) => {
            const newSelectedItems = [...prevSelectedItems];
            newSelectedItems[index] = newItem;
            return newSelectedItems;
        });
    };

    useEffect(() => {
        if (appItemListData.status === '1' && appPlanListData?.data?.list) {
            const planListItems = appPlanListData.data.list.map((item) => item.item);
            const newSelectedItemsVal = appItemListData.data.list.map((item) => {
                const isSelected = planListItems.includes(item);
                return isSelected ? item : '';
            });
            setSelectedItemsVal(planListItems);
        }
    }, [appItemListData, appPlanListData]);

    const handleCellClick2 = (index) => {
        setSelectedItems2({
            ...selectedItems2,
            [index]: true, // Toggle the value
        });
    };

    const handleCellBlur2 = (index) => {
        setSelectedItems2({
            ...selectedItems2,
            [index]: false,
        });
    };

    const updateSelectedItem2 = (index, newItem) => {
        setSelectedItemsVal2((prevSelectedItems) => {
            const newSelectedItems = [...prevSelectedItems];
            newSelectedItems[index] = newItem;
            return newSelectedItems;
        });
    };

    useEffect(() => {
        if (appUnitListData.status === '1' && appPlanListData?.data?.list) {
            const planListItems = appPlanListData.data.list.map((item) => item.unit);
            const newSelectedItemsVal = appUnitListData.data.list.map((item) => {
                const isSelected = planListItems.includes(item);
                return isSelected ? item : '';
            });
            setSelectedItemsVal2(planListItems);
        }
    }, [appUnitListData, appPlanListData]);

    useEffect(() => {
        if (appPlanListData.status === '1') {
            setAppPlanState(appPlanListData.data.list)
        } else {
            setAppPlanState([])
        }
    }, [appPlanListData])

    const handlerAdd = () => {

        // const firstIndexItem = appItemListData.data.list[appItemListData.data.list.length - 1]
        // const firstIndexUnit = appUnitListData.data.list[appUnitListData.data.list - 1]
        const firstIndexItem = props.t("Direct Input")
        const firstIndexUnit = props.t("Direct Input")

        setAppPlanState((prevState) => ([
            ...prevState,
            {
                "kpiId": null,
                "groupNum": null,
                "corporationId": null,
                "year": null,
                "item": firstIndexItem,
                "unit": firstIndexUnit,
                "increase": null,
                "plan": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                ]
            }
        ]))
    }

    return (
        <RootPageCustom msgStateGet={appKPIMsg} msgStateSet={setAppKPIMsg}
            componentJsx={
                <>
                    {/* {appKPIMsg !== "" ? <UncontrolledAlert toggle={() => { setAppKPIMsg("") }} color={appKPIMsg.status == "1" ? "success" : "danger"}>
                        {typeof appKPIMsg == 'string' ? null : appKPIMsg.message}</UncontrolledAlert> : null} */}

                    <Card style={{ display: appKPIPage ? 'block' : 'none' }} fluid="true" >
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            KPI 계획 설정
                        </CardHeader>
                        <CardBody>
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
                                            <option>Select Year</option>
                                            {appYearListData?.data?.list.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option>
                                            No Data
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
                                            <option value={''}>Select Group</option>
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
                                            No Data
                                        </option>
                                    )}
                                </Input>
                                <Input
                                    type="select"
                                    onChange={(e) => setSelectedCoorporationList(e.target.value)}
                                >
                                    {Array.isArray(appCoorporationListData?.data?.list) ? (
                                        <>
                                            <option value={''}>Select Coorporation</option>
                                            {appCoorporationListData?.data?.list.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.corporationId}>
                                                        {item.corporationName}
                                                    </option>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <option>
                                            No Data
                                        </option>
                                    )}
                                </Input>
                            </div>
                            <table className="table table-bordered cust-border my-3">
                                <thead style={{ backgroundColor: 'transparent', }}>
                                    <tr style={{ color: '#495057' }}>
                                        <th style={{ textAlign: 'center' }} colSpan={appEditMode ? 2 : 1} scope="col">KPI 항목</th>
                                        <th style={{ textAlign: 'center' }} colSpan={appEditMode ? 2 : 1} scope="col">단위</th>
                                        <th style={{ textAlign: 'center' }} colSpan={1} scope="col">실적 증가</th>
                                        {
                                            (() => {
                                                const numberOfMonths = 12;
                                                const thElements = [];

                                                for (let month = 1; month <= numberOfMonths; month++) {
                                                    thElements.push(
                                                        <th key={month - 1} style={{ textAlign: 'center' }} scope="col">{`${month}월`}</th>
                                                    );
                                                }

                                                return thElements;
                                            })()
                                        }
                                        {
                                            appEditMode &&
                                            (
                                                <th style={{ textAlign: 'center' }} colSpan={1} scope="col">{props.t('Delete')}</th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appPlanState.map((item, index) => {

                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td colSpan={1}>
                                                            {
                                                                item.item === props.t('Direct Input') && appEditMode ? (
                                                                    (
                                                                        <Input
                                                                            type="text"
                                                                            value={newItemVal[index]}
                                                                            onChange={(e) => {
                                                                                const updatedValues = [...newItemVal];
                                                                                updatedValues[index] = e.target.value;
                                                                                setNewItemVal(updatedValues);
                                                                            }}
                                                                        />
                                                                    )
                                                                ) :
                                                                    item.item === props.t('Direct Input') ? '' : item.item
                                                            }
                                                        </td>
                                                        {
                                                            appEditMode ?
                                                                (
                                                                    <td colSpan={1} onClick={() => handleCellClick(index)} onBlur={() => handleCellBlur(index)}>
                                                                        {selectedItems[index] ? (
                                                                            <Input
                                                                                type="select"
                                                                                value={item.item}
                                                                                onChange={(e) => {
                                                                                    const newItem = e.target.value;
                                                                                    setAppPlanState((prevState) => {
                                                                                        const updatedState = [...prevState];
                                                                                        updatedState[index] = {
                                                                                            ...updatedState[index],
                                                                                            "item": newItem,
                                                                                        };
                                                                                        return updatedState;
                                                                                    });
                                                                                }}
                                                                            >
                                                                                {selectedItemsVal.map((row, i) => (
                                                                                    <option key={i} value={row}>
                                                                                        {row}
                                                                                    </option>
                                                                                ))}
                                                                                <option value={props.t('Direct Input')}>
                                                                                    {props.t('Direct Input')}
                                                                                </option>
                                                                            </Input>
                                                                        ) : (
                                                                            <>
                                                                                {item.item} <span style={{ fontSize: '24px', verticalAlign: 'middle', lineHeight: '1' }} className="mdi mdi-menu-down" />
                                                                            </>
                                                                        )}
                                                                    </td>
                                                                ) : (
                                                                    null
                                                                )
                                                        }
                                                        <td colSpan={1}>
                                                            {
                                                                item.unit === props.t('Direct Input') ? (
                                                                    (
                                                                        <Input
                                                                            type="text"
                                                                            value={newUnitVal[index]}
                                                                            onChange={(e) => {
                                                                                const updatedValues = [...newUnitVal];
                                                                                updatedValues[index] = e.target.value;
                                                                                setNewUnitVal(updatedValues);
                                                                            }}
                                                                        />
                                                                    )
                                                                ) :
                                                                    item.unit
                                                            }
                                                        </td>
                                                        {
                                                            appEditMode ? (
                                                                <td colSpan={1} onClick={() => handleCellClick2(index)} onBlur={() => handleCellBlur2(index)}>
                                                                    {selectedItems2[index] ? (
                                                                        <Input
                                                                            type="select"
                                                                            value={item.unit}
                                                                            onChange={(e) => {
                                                                                const newUnit = e.target.value;
                                                                                setAppPlanState((prevState) => {
                                                                                    const updatedState = [...prevState];
                                                                                    updatedState[index] = {
                                                                                        ...updatedState[index],
                                                                                        "unit": newUnit,
                                                                                    };
                                                                                    return updatedState;
                                                                                });
                                                                            }}
                                                                        >
                                                                            {selectedItemsVal2.map((row, i) => (
                                                                                <option key={i} value={row}>
                                                                                    {row}
                                                                                </option>
                                                                            ))}
                                                                            <option value={props.t('Direct Input')}>
                                                                                {props.t('Direct Input')}
                                                                            </option>
                                                                        </Input>
                                                                    ) : (
                                                                        <>
                                                                            {item.unit} <span style={{ fontSize: '24px', verticalAlign: 'middle', lineHeight: '1' }} className="mdi mdi-menu-down" />
                                                                        </>
                                                                    )}
                                                                </td>
                                                            ) : (
                                                                null
                                                            )
                                                        }
                                                        {
                                                            appEditMode ? (
                                                                <td style={{ fontSize: '16px', verticalAlign: 'middle', lineHeight: '1', textAlign: 'center' }} colSpan={1}>
                                                                    <Input
                                                                        type="checkbox"
                                                                        value={item.increase === 1 ? true : false}
                                                                        checked={item.increase === 1 ? true : false}
                                                                        onChange={(e) => {
                                                                            let newValue = e.target.value === "true" ? 0 : 1
                                                                            setAppPlanState((prevState) => {
                                                                                debugger
                                                                                let updatedState = [...prevState]
                                                                                updatedState[index] = {
                                                                                    ...updatedState[index],
                                                                                    increase: newValue,
                                                                                };
                                                                                return updatedState;
                                                                            })
                                                                        }}
                                                                    />
                                                                </td>
                                                            ) : (
                                                                item.increase === 1 ? (
                                                                    <td style={{ fontSize: '16px', verticalAlign: 'middle', lineHeight: '1', textAlign: 'center' }} colSpan={1}>
                                                                        <span className="mdi mdi-check text-primary" />
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ textAlign: 'center' }} colSpan={1}></td>
                                                                )
                                                            )
                                                        }
                                                        {
                                                            item.plan.map((planValue, monthIndex) => {
                                                                if (planValue !== null) {
                                                                    return (
                                                                        <td key={monthIndex}>{planValue}</td>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td>
                                                                            <Input
                                                                                type="text"
                                                                                value={(newPlanVal[index] && newPlanVal[index][monthIndex]) || ''}
                                                                                onChange={(e) => {
                                                                                    const updatedValues = [...newPlanVal];
                                                                                    if (!updatedValues[index]) {
                                                                                        updatedValues[index] = [];
                                                                                    }
                                                                                    updatedValues[index][monthIndex] = e.target.value;
                                                                                    setNewPlanVal(updatedValues);
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        {
                                                            appEditMode &&
                                                            (
                                                                <td
                                                                    style={{
                                                                        fontSize: '16px',
                                                                        lineHeight: '1',
                                                                        textAlign: 'center'
                                                                    }}
                                                                    colSpan={1}
                                                                >
                                                                    <span
                                                                        onClick={() => {
                                                                            setAppPlanState((prevState) => {
                                                                                let newState = [...prevState]
                                                                                newState.splice(index, 1)
                                                                                return newState
                                                                            })
                                                                        }}
                                                                        className="mdi mdi-delete text-danger"
                                                                    />
                                                                </td>
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
                                selectedCoorporationList && selectedGroupList && selectedItems && appEditMode && (
                                    <a style={{ fontSize: '32px', verticalAlign: 'middle', lineHeight: '1', color: 'grey' }} className="mdi mdi-plus-box" onClick={handlerAdd} />
                                )
                            }

                            {
                                appEditMode ? (
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'end' }}>
                                        <Button>
                                            Save
                                        </Button>
                                        <Button className="btn-danger" onClick={() => setAppEditMode(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                ) :
                                    selectedCoorporationList && selectedGroupList && selectedItems ?
                                        (
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Button
                                                    onClick={() => setAppEditMode(true)}>
                                                    Edit
                                                </Button>
                                            </div>
                                        ) :
                                        null
                            }
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

KPI.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPI)