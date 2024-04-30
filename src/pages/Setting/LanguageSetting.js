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
import { getLanguageList, resetMessage } from "store/actions"
import { deleteMaintainMenu, getMenuListDataAction } from "store/actions"
import '../../assets/scss/custom.scss'
import '../../config'
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import AddMenu from "./AddMenu"
import ConfirmModal from "components/Common/ConfirmModal"
import EditMenu from "./EditMenu"
import TableCustom3 from "common/TableCustom3"

const LanguageSetting = (props) => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [searchVal, setSearchVal] = useState("")
    const [appLanguageSetting, setAppLanguageSetting] = useState(true)
    const [appAddLanguageSetting, setAppAddLanguageSetting] = useState(false)
    const [appEditLanguageSetting, setAppEditLanguageSetting] = useState(false)
    const [appLanguageSettingData, setAppLanguageSettingData] = useState({})
    const [isYes, setIsYes] = useState(false)
    const [languageManagementId, setLanguageManagementId] = useState('')
    const [isClosed, setIsClosed] = useState(false)

    const appLanguageManagementListData = useSelector((state) => {
        return state.settingReducer.respGetLanguageList
    })

    useEffect(() => {
        console.log(appLanguageManagementListData)
    }, [appLanguageManagementListData])

    const [appLanguageSettingMsg, setAppLanguageSettingMsg] = useState('')

    const appMessageDelete = useSelector((state) => state.settingReducer.msgDelete)
    const appMessageAdd = useSelector((state) => state.settingReducer.msgAdd)

    const appMessageEdit = useSelector((state) => state.settingReducer.msgEdit)

    const [appLanguageSettingTabelSearch, setAppLanguageSettingTabelSearch] = useState({
        page: 1,
        offset: 0,
        limit: 10,
        sort: "",
        order: "",
        search:
        {
            search: searchVal
        }
    })

    const appLanguageSettingColumn = [
        {
            dataField: "id",
            text: 'Language ID',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "moduleName",
            text: 'Module Name',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "langType",
            text: 'Language Type',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "value",
            text: 'Value',
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            text: 'Actions',
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
        setAppLanguageSettingTabelSearch((prevState) => ({
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
        setAppAddLanguageSetting(true)
        setAppLanguageSetting(false)
    }

    const preEditApp = (data) => {
        setAppEditLanguageSetting(true)
        setAppLanguageSetting(false)
        setAppLanguageSettingData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data?.id) {
            setLanguageManagementId(data.id)
        }
    }

    useEffect(() => {
        if (isYes) {
            dispatch(deleteMaintainMenu({ id: languageManagementId }))
            setLoadingSpinner(true)
            setIsYes(false)
        }
    }, [isYes])

    useEffect(() => {
        let messageToUpdate
        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete
            if (appMessageDelete.status === '1') {
                setAppLanguageSetting(true)
                setAppAddLanguageSetting(false)
            }
            setAppLanguageSettingMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appLanguageSettingTabelSearch))
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
                setAppLanguageSetting(true)
                setAppAddLanguageSetting(false)
            }
            setAppLanguageSettingMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appLanguageSettingTabelSearch))
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
                setAppLanguageSetting(true)
                setAppEditLanguageSetting(false)
            }
            setAppLanguageSettingMsg(messageToUpdate)
            dispatch(getMenuListDataAction(appLanguageSettingTabelSearch))
        }
        if (messageToUpdate) {
            setLoadingSpinner(false)
        }
    }, [appMessageEdit])

    return (
        <RootPageCustom componentJsx={
            <>
                {appLanguageSettingMsg !== "" ? (
                    <UncontrolledAlert
                        toggle={() => {
                            setAppLanguageSettingMsg("")
                            setIsClosed(true)
                        }}
                        color={appLanguageSettingMsg.status == "1" ? "success" : "danger"}
                    >
                        {typeof appLanguageSettingMsg == "string"
                            ? null
                            : appLanguageSettingMsg.message}
                    </UncontrolledAlert>
                ) : null}
                <Container style={{ display: appLanguageSetting ? 'block' : "none" }} fluid="true">
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '30%',
                            gap: '.75vw'
                        }}>
                            <label className="col-sm-3" style={{ marginTop: "8px" }}>{"Search"}</label>
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
                                    {"Search"}
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
                            <span className="mdi mdi-plus" /> {'Add New Language Management'}
                        </Button>
                    </div>
                    <TableCustom3
                        keyField={"id"}
                        columns={appLanguageSettingColumn}
                        redukResponse={appLanguageManagementListData}
                        appdata={appLanguageManagementListData?.data != null && appLanguageManagementListData?.data.list ? appLanguageManagementListData?.data.list : []}
                        appdataTotal={appLanguageManagementListData?.data != null ? appLanguageManagementListData?.data.count : 0}
                        searchSet={setAppLanguageSettingTabelSearch}
                        searchGet={appLanguageSettingTabelSearch}
                        redukCall={getLanguageList}
                    />
                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                </Container>
                {/* <AddMenu
                    appAddMaintainMenu={appAddLanguageSetting}
                    setAppMaintainMenu={setAppLanguageSetting}
                    setAppAddMaintainMenu={setAppAddLanguageSetting}
                    setLoadingSpinner={setLoadingSpinner}
                />

                <EditMenu
                    appMaintainMenuData={appLanguageSettingData}
                    appEditMaintainMenu={appEditLanguageSetting}
                    setAppMaintainMenu={setAppLanguageSetting}
                    setAppEditMaintainMenu={setAppEditLanguageSetting}
                    setLoadingSpinner={setLoadingSpinner}
                /> */}

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

LanguageSetting.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(LanguageSetting)