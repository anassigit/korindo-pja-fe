import RootPageCustom from "common/RootPageCustom"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Container,
    Spinner,
    UncontrolledAlert,
    UncontrolledTooltip
} from "reactstrap"
import { deleteKPIItem, getKPIItemList, resetMessage } from "store/actions"
import '../../assets/scss/custom.scss'
import '../../config'
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import ConfirmModal from "components/Common/ConfirmModal"
import TableCustom3 from "common/TableCustom3"
import AddKPIItem from "./AddKPIItem"
import EditKPIItem from "./EditKPIItem"

const KPIItemSetting = (props) => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [searchVal, setSearchVal] = useState("")
    const [appSetting, setAppSetting] = useState(true)
    const [appAdd, setAppAdd] = useState(false)
    const [appEdit, setAppEdit] = useState(false)
    const [appData, setAppData] = useState({})
    const [isYes, setIsYes] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [isClosed, setIsClosed] = useState(false)
    const [appMsg, setAppMsg] = useState('')
    const [searchTable, setSearchTable] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            search: searchVal,
        }
    })

    const appListData = useSelector((state) => {
        return state.settingReducer.respGetKPIItemList
    })
    const appMessageDelete = useSelector((state) => state.settingReducer.msgDelete)
    const appMessageAdd = useSelector((state) => state.settingReducer.msgAdd)
    const appMessageEdit = useSelector((state) => state.settingReducer.msgEdit)

    const appColumn = [
        {
            dataField: "kpiItemId",
            text: 'KPI Item ID',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "itemName",
            text: 'KPI Item Name',
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "category.categoryName",
            text: 'Category Name',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "unit.unitName",
            text: 'Unit Name',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            text: props.t("Actions"),
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (_cellContent, cellData, index) => {
                return (
                    <div style={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
                        <a id={`edit-${index}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${index}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${index}`}>{props.t("Edit")}</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>{props.t("Delete")}</UncontrolledTooltip>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleClick()
        }
    }

    const handleClick = () => {
        setSearchTable((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }))
    }

    const preAddApp = () => {
        setAppAdd(true)
        setAppSetting(false)
    }

    const preEditApp = (data) => {
        setAppEdit(true)
        setAppSetting(false)
        setAppData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data?.kpiItemId) {
            setSelectedId(data.kpiItemId)
        }
    }

    useEffect(() => {
        if (isYes) {
            dispatch(deleteKPIItem({ itemId: selectedId }))
            setLoadingSpinner(true)
            setIsYes(false)
        }
    }, [isYes])

    useEffect(() => {
        let messageToUpdate
        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete
            if (appMessageDelete.status === '1') {
                setAppSetting(true)
                setAppAdd(false)
            }
            setAppMsg(messageToUpdate)
            dispatch(getKPIItemList(searchTable))
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageDelete])

    useEffect(() => {
        let messageToUpdate
        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd
            if (appMessageAdd.status === '1') {
                setAppSetting(true)
                setAppAdd(false)
            }
            setAppMsg(messageToUpdate)
            dispatch(getKPIItemList(searchTable))
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageAdd])

    useEffect(() => {
        let messageToUpdate
        if (appMessageEdit?.status === '1' || appMessageEdit?.status === '0') {
            messageToUpdate = appMessageEdit
            if (appMessageEdit?.status === '1') {
                setAppSetting(true)
                setAppEdit(false)
            }
            setAppMsg(messageToUpdate)
            dispatch(getKPIItemList(searchTable))
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageEdit])

    return (
        <RootPageCustom componentJsx={
            <>
                {appMsg !== "" ? (
                    <UncontrolledAlert
                        toggle={() => {
                            setAppMsg("")
                            setIsClosed(true)
                        }}
                        color={appMsg.status == "1" ? "success" : "danger"}
                    >
                        {typeof appMsg == "string"
                            ? null
                            : appMsg.message}
                    </UncontrolledAlert>
                ) : null}
                <Container style={{ display: appSetting ? 'block' : "none" }} fluid="true">
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '30%',
                            gap: '.75vw'
                        }}>
                            <label className="col-sm-3" style={{ marginTop: "8px" }}>{props.t("Search")}</label>
                            <div className="col-sm-5">
                                <input
                                    type="search"
                                    className="form-control"
                                    onChange={e => setSearchVal(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' ? handleEnterKeyPress(e) : null}
                                />
                            </div>
                            <div className="col-sm-3">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => handleClick()}
                                >
                                    {props.t("Search")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-12 pb-2"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "12px",
                            justifyContent: "right",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            onClick={() => preAddApp()}
                        >
                            <span className="mdi mdi-plus" /> {'Add New KPI Item'}
                        </Button>
                    </div>
                    <TableCustom3
                        keyField={"kpiItemId"}
                        columns={appColumn}
                        redukResponse={appListData}
                        appdata={appListData?.data != null && appListData?.data.list ? appListData?.data.list : []}
                        appdataTotal={appListData?.data != null ? appListData?.data.count : 0}
                        searchSet={setSearchTable}
                        searchGet={searchTable}
                        redukCall={getKPIItemList}
                    />
                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                </Container>
                { appAdd && 
                    <AddKPIItem
                        app={appAdd}
                        setApp={setAppSetting}
                        setAppAdd={setAppAdd}
                        setLoadingSpinner={setLoadingSpinner}
                    />
                }
                {appEdit &&
                    <EditKPIItem
                        app={appEdit}
                        setApp={setAppSetting}
                        setAppEdit={setAppEdit}
                        setLoadingSpinner={setLoadingSpinner}
                        appData={appData}
                    />
                }
                <ConfirmModal
                    modal={modal}
                    toggle={toggleDeleteModal}
                    message={"Are you sure to delete this?"}
                    setIsYes={setIsYes}
                />
            </>
        }
        />
    )
}

KPIItemSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(KPIItemSetting)