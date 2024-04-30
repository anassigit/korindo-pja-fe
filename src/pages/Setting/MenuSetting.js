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
import { resetMessage } from "store/actions"
import { deleteMaintainMenu, getMenuListDataAction } from "store/actions"
import '../../assets/scss/custom.scss'
import '../../config'
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import AddMenu from "./AddMenu"
import ConfirmModal from "components/Common/ConfirmModal"
import EditMenu from "./EditMenu"
import TableCustom3 from "common/TableCustom3"

const MenuSetting = (props) => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [searchVal, setSearchVal] = useState("")
    const [appMaintainMenu, setAppMaintainMenu] = useState(true)
    const [appAddMaintainMenu, setAppAddMaintainMenu] = useState(false)
    const [appEditMaintainMenu, setAppEditMaintainMenu] = useState(false)
    const [appMaintainMenuData, setAppMaintainMenuData] = useState({})
    const [isYes, setIsYes] = useState(false)
    const [menuId, setmenuId] = useState('')
    const [isClosed, setIsClosed] = useState(false)

    const appMenuListData = useSelector((state) => {
        return state.settingReducer.respGetMenuList
    })

    const [appMenuMsg, setAppMenuMsg] = useState('')

    const appMessageDelete = useSelector((state) => state.settingReducer.msgDelete)
    const appMessageAdd = useSelector((state) => state.settingReducer.msgAdd)

    const appMessageEdit = useSelector((state) => state.settingReducer.msgEdit)

    const [appMenuTabelSearch, setAppMenuTabelSearch] = useState({
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

    const appMenuColumn = [
        {
            dataField: "menuId",
            text: props.t("Menu ID"),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuName",
            text: props.t("Menu Name"),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "parent",
            text: props.t("Parent Menu"),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, cellData) => {
                return cellContent?.menuName
            }
        },
        {
            dataField: "menuPath",
            text: props.t("Menu Path"),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuIcon",
            text: props.t("Icon"),
            sort: true,
            style: { textAlign: 'center', fontSize: '18px' },
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, _cellData) => {
                return <span className={`fa ${cellContent}`} />
            },
        },
        {
            dataField: "groupStatus",
            text: props.t("Group Separate Permission"),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, _cellData) => {
                return cellContent === 0 ? false : true
            },
        },
        {
            dataField: "pos",
            text: props.t("Order"),
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
                        <UncontrolledTooltip target={`edit-${index}`}>{'Edit'}</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>{'Delete'}</UncontrolledTooltip>
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
        setAppMenuTabelSearch((prevState) => ({
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
        setAppAddMaintainMenu(true)
        setAppMaintainMenu(false)
    }

    const preEditApp = (data) => {
        setAppEditMaintainMenu(true)
        setAppMaintainMenu(false)
        setAppMaintainMenuData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data?.menuId) {
            setmenuId(data.menuId)
        }
    }

    useEffect(() => {
        if (isYes) {
            dispatch(deleteMaintainMenu({ menuId: menuId }))
            setLoadingSpinner(true)
            setIsYes(false)
        }
    }, [isYes])

    useEffect(() => {
        let messageToUpdate
        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete
            if (appMessageDelete.status === '1') {
                setAppMaintainMenu(true)
                setAppAddMaintainMenu(false)
            }
            setAppMenuMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appMenuTabelSearch))
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
                setAppMaintainMenu(true)
                setAppAddMaintainMenu(false)
            }
            setAppMenuMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appMenuTabelSearch))
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
                setAppMaintainMenu(true)
                setAppEditMaintainMenu(false)
            }
            setAppMenuMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appMenuTabelSearch))
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageEdit])

    return (
        <RootPageCustom componentJsx={
            <>
                {appMenuMsg !== "" ? (
                    <UncontrolledAlert
                        toggle={() => {
                            setAppMenuMsg("")
                            setIsClosed(true)
                        }}
                        color={appMenuMsg.status == "1" ? "success" : "danger"}
                    >
                        {typeof appMenuMsg == "string"
                            ? null
                            : appMenuMsg.message}
                    </UncontrolledAlert>
                ) : null}
                <Container style={{ display: appMaintainMenu ? 'block' : "none" }} fluid="true">
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
                            <span className="mdi mdi-plus" /> {props.t("Add New Menu")}
                        </Button>
                    </div>
                    <TableCustom3
                        keyField={"menuId"}
                        columns={appMenuColumn}
                        redukResponse={appMenuListData}
                        appdata={appMenuListData?.data != null && appMenuListData?.data.list ? appMenuListData?.data.list : []}
                        appdataTotal={appMenuListData?.data != null ? appMenuListData?.data.count : 0}
                        searchSet={setAppMenuTabelSearch}
                        searchGet={appMenuTabelSearch}
                        redukCall={getMenuListDataAction}
                    />
                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                </Container>
                {appAddMaintainMenu && <AddMenu
                    appAddMaintainMenu={appAddMaintainMenu}
                    setAppMaintainMenu={setAppMaintainMenu}
                    setAppAddMaintainMenu={setAppAddMaintainMenu}
                    setLoadingSpinner={setLoadingSpinner}
                />}
                {appEditMaintainMenu && <EditMenu
                    appMaintainMenuData={appMaintainMenuData}
                    appEditMaintainMenu={appEditMaintainMenu}
                    setAppMaintainMenu={setAppMaintainMenu}
                    setAppEditMaintainMenu={setAppEditMaintainMenu}
                    setLoadingSpinner={setLoadingSpinner}
                />}
                <ConfirmModal
                    modal={modal}
                    toggle={toggleDeleteModal}
                    message={props.t("Are you sure to delete this?")}
                    setIsYes={setIsYes}
                />
            </>
        }
        />
    )
}

MenuSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MenuSetting)