import RootPageCustom from "common/RootPageCustom"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Container,
    Spinner,
    UncontrolledAlert,
    UncontrolledTooltip,
} from "reactstrap"
import { getRoleAccessList, resetMessage } from "store/actions"
import { deleteMaintainRole, getRoleListDataAction } from "store/actions"
import '../../../assets/scss/custom.scss'
import "../../../config"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import AddRole from "./AddRole"
import ConfirmModal from "components/Common/ConfirmModal"
import EditRole from "./EditRole"
import TableCustom3 from "common/TableCustom3"
import RoleAccessSetting from "./RoleAccessSetting"

const RoleSetting = props => {
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [searchVal, setSearchVal] = useState("")
    const [appMaintainRole, setAppMaintainRole] = useState(true)
    const [appAddMaintainRole, setAppAddMaintainRole] = useState(false)
    const [appEditMaintainRole, setAppEditMaintainRole] = useState(false)
    const [appDetailRole, setAppDetailRole] = useState(false)
    const [appAddDetailRole, setAppAddDetailRole] = useState(false)
    const [appEditDetailRole, setAppEditDetailRole] = useState(false)
    const [appEditDetailAccessRole, setAppEditDetailAccessRole] = useState(false)
    const [appMaintainRoleData, setAppMaintainRoleData] = useState({})
    const [appMaintainGroupIdData, setAppMaintainGroupIdData] = useState({})
    const [appMaintainRoleMsg, setAppMaintainRoleMsg] = useState("")
    const [isYes, setIsYes] = useState(false)
    const [roleId, setRoleId] = useState("")
    const [isClosed, setIsClosed] = useState(false)
    const [searchVal2, setSearchVal2] = useState("")

    const appRoleListData = useSelector(state => {
        return state.settingReducer.respGetRoleList
    })
    const appMessageDelete = useSelector(state => state.settingReducer.msgDelete)
    const appMessageAdd = useSelector(state => state.settingReducer.msgAdd)
    const appMessageEdit = useSelector(state => state.settingReducer.msgEdit)

    const [appRoleAccessTabelSearch, setAppRoleAccessTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search: {
            search: searchVal2,
            roleId: "",
        },
    })

    const [appRoleTabelSearch, setAppRoleTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search: {
            search: searchVal,
        },
    })

    const appRoleColumn = [
        {
            dataField: "roleId",
            text: props.t("Role ID"),
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            dataField: "roleName",
            text: props.t("Role Name"),
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            dataField: "parent",
            text: props.t("Parent Name"),
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
            formatter: (cellContent, cellData) => {
                return cellContent?.roleName
            }
        },
        {
            text: props.t("Detail"),
            style: { textAlign: "center", fontSize: "18px" },
            headerStyle: { textAlign: "center" },
            formatter: (_cellContent, cellData, _index) => {
                return (
                    <span
                        onClick={() => preDetailApp(cellData)}
                        className={"mdi mdi-text-box-outline text-primary"}
                    />
                )
            },
        },
        {
            text: props.t("Actions"),
            headerStyle: { textAlign: "center" },
            style: { textAlign: "center", fontSize: "16px" },
            formatter: (_cellContent, cellData, index) => {
                return (
                    <div
                        style={{ display: "flex", gap: "1vw", justifyContent: "center" }}
                    >
                        <a
                            id={`edit-${index}`}
                            className="mdi mdi-pencil text-primary"
                            onClick={() => preEditApp(cellData)}
                        />
                        <a
                            id={`delete-${index}`}
                            className="mdi mdi-delete text-danger"
                            onClick={() => toggleDeleteModal(cellData)}
                        />
                        <UncontrolledTooltip target={`edit-${index}`}>
                            {props.t("Edit")}
                        </UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>
                            {props.t("Delete")}
                        </UncontrolledTooltip>
                    </div>
                )
            },
        },
    ]

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const handleEnterKeyPress = e => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleClick()
        }
    }

    const handleClick = () => {
        setAppRoleTabelSearch(prevState => ({
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
        setAppAddMaintainRole(true)
        setAppMaintainRole(false)
    }

    const preEditApp = data => {
        setAppEditMaintainRole(true)
        setAppMaintainRole(false)
        setAppMaintainRoleData(data)
    }

    const preDetailApp = data => {
        setAppDetailRole(true)
        setAppMaintainRole(false)
        setAppMaintainRoleData(data)
    }

    const toggleDeleteModal = data => {
        setModal(!modal)
        if (data?.roleId) {
            setRoleId(data.roleId)
        }
    }

    useEffect(() => {
        if (isYes) {
            dispatch(deleteMaintainRole({ roleId: roleId }))
            setLoadingSpinner(true)
            setIsYes(false)
        }
    }, [isYes])

    useEffect(() => {
        let messageToUpdate
        if (appMessageDelete.status === "1" || appMessageDelete.status === "0") {
            messageToUpdate = appMessageDelete
            dispatch(getRoleListDataAction(appRoleTabelSearch))
            dispatch(getRoleAccessList(appRoleAccessTabelSearch))
            setAppMaintainRoleMsg(messageToUpdate)
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageDelete])

    useEffect(() => {
        let messageToUpdate
        if (appMessageAdd.status === "1" || appMessageAdd.status === "0") {
            messageToUpdate = appMessageAdd
            if (appMessageAdd.status === "1") {
                if (appAddDetailRole) {
                    setAppDetailRole(true)
                    setAppAddDetailRole(false)
                } else if (appAddMaintainRole) {
                    setAppMaintainRole(true)
                    setAppAddMaintainRole(false)
                }
            }
            dispatch(getRoleListDataAction(appRoleTabelSearch))
            dispatch(getRoleAccessList(appRoleAccessTabelSearch))
            setAppMaintainRoleMsg(messageToUpdate)
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageAdd])

    useEffect(() => {
        let messageToUpdate
        if (appMessageEdit?.status === "1" || appMessageEdit?.status === "0") {
            messageToUpdate = appMessageEdit
            if (appMessageEdit?.status === "1") {
                if (appEditDetailAccessRole) {
                    setAppDetailRole(true)
                    setAppEditDetailAccessRole(false)
                } else if (appEditMaintainRole) {
                    setAppMaintainRole(true)
                    setAppEditMaintainRole(false)
                }
            }
            dispatch(getRoleListDataAction(appRoleTabelSearch))
            setAppMaintainRoleMsg(messageToUpdate)
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageEdit])

    return (
        <RootPageCustom
            componentJsx={
                <>
                    {appMaintainRoleMsg !== "" ? (
                        <UncontrolledAlert
                            toggle={() => {
                                setAppMaintainRoleMsg("")
                                setIsClosed(true)
                            }}
                            color={appMaintainRoleMsg.status == "1" ? "success" : "danger"}
                        >
                            {typeof appMaintainRoleMsg == "string"
                                ? null
                                : appMaintainRoleMsg.message}
                        </UncontrolledAlert>
                    ) : null}
                    <Container
                        style={{ display: appMaintainRole ? "block" : "none" }}
                        fluid="true"
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "30%",
                                    gap: ".75vw",
                                }}
                            >
                                <label className="col-sm-3" style={{ marginTop: "8px" }}>
                                    {props.t("Search")}
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="search"
                                        className="form-control"
                                        onChange={e => setSearchVal(e.target.value)}
                                        onKeyDown={e =>
                                            e.key === "Enter" ? handleEnterKeyPress(e) : null
                                        }
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
                            <Button onClick={() => preAddApp()}>
                                <span className="mdi mdi-plus" /> {props.t("Add New Role")}
                            </Button>
                        </div>
                        <TableCustom3
                            keyField={"roleId"}
                            columns={appRoleColumn}
                            redukResponse={appRoleListData}
                            appdata={
                                appRoleListData?.data != null && appRoleListData?.data.list
                                    ? appRoleListData?.data.list
                                    : []
                            }
                            appdataTotal={
                                appRoleListData?.data != null ? appRoleListData?.data.count : 0
                            }
                            searchSet={setAppRoleTabelSearch}
                            searchGet={appRoleTabelSearch}
                            redukCall={getRoleListDataAction}
                        />
                        <div
                            className="spinner-wrapper"
                            style={{
                                display: loadingSpinner ? "block" : "none",
                                zIndex: "9999",
                                position: "fixed",
                                top: "0",
                                right: "0",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                opacity: "1",
                            }}
                        >
                            <Spinner
                                style={{
                                    padding: "24px",
                                    display: "block",
                                    position: "fixed",
                                    top: "42.5%",
                                    right: "50%",
                                }}
                                color="primary"
                            />
                        </div>
                    </Container>
                    {appAddMaintainRole &&
                        <AddRole
                            appAddMaintainRole={appAddMaintainRole}
                            setAppMaintainRole={setAppMaintainRole}
                            setAppAddMaintainRole={setAppAddMaintainRole}
                            setLoadingSpinner={setLoadingSpinner}
                        />
                    }
                    {appEditMaintainRole &&
                        <EditRole
                            appMaintainRoleData={appMaintainRoleData}
                            appEditMaintainRole={appEditMaintainRole}
                            setAppMaintainRole={setAppMaintainRole}
                            setAppEditMaintainRole={setAppEditMaintainRole}
                            setLoadingSpinner={setLoadingSpinner}
                        />
                    }
                    <RoleAccessSetting
                        appMaintainRoleData={appMaintainRoleData}
                        appDetailRole={appDetailRole}
                        setAppMaintainRole={setAppMaintainRole}
                        setAppDetailRole={setAppDetailRole}
                        appAddDetailRole={appAddDetailRole}
                        setAppAddDetailRole={setAppAddDetailRole}
                        appEditDetailRole={appEditDetailRole}
                        setAppEditDetailRole={setAppEditDetailRole}
                        appRoleAccessTabelSearch={appRoleAccessTabelSearch}
                        setAppRoleAccessTabelSearch={setAppRoleAccessTabelSearch}
                        appEditDetailAccessRole={appEditDetailAccessRole}
                        setAppEditDetailAccessRole={setAppEditDetailAccessRole}
                        searchVal2={searchVal2}
                        setSearchVal2={setSearchVal2}
                        appMaintainGroupData={appMaintainGroupIdData}
                        setLoadingSpinner={setLoadingSpinner}
                    />
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

RoleSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
}

export default withTranslation()(RoleSetting)