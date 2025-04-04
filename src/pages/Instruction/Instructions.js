import React, { useState, useEffect, useMemo } from "react"
import '../../config'
import RootPageCustom from '../../common/RootPageCustom'
import TableCustom from '../../common/TableCustom'
import {
    Row,
    Col,
    Container,
    Input,
    UncontrolledAlert,
    Spinner,
    Button,
} from "reactstrap"
import { getInstructionsData, resetMessage, getGroupListData, getAllStatusData, getReply } from "../../store/Instruction/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session'
import AddInstruction from "./AddInstruction"
import "../../assets/scss/custom/table/TableCustom.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import '../../assets/scss/custom/components/custom-datepicker.scss'
import moment from "moment"
import ReplyModal from "./ReplyModal"

const Instructions = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const localSelected2 = ReactSession.get('selected2')

    const dispatch = useDispatch()
    const history = useHistory()
    const [appInstructionsPage, setAppInstructionsPage] = useState(true)
    const [appAddInstructions, setAppAddInstructions] = useState(false)
    const [appEditInstructions, setEditInstructions] = useState(false)
    const [appInstructionsMsg, setAppInstructionsMsg] = useState("")
    const [instructionsData, setInstructionsData] = useState()
    const [selected, setSelected] = useState()
    const [selectedArray, setSelectedArray] = useState([])
    const [selected2, setSelected2] = useState(localSelected2 ? localSelected2 : null)
    const [isClosed, setIsClosed] = useState(false)
    const [dateFrom, setDateFrom] = useState(ReactSession.get('dateFrom') ? ReactSession.get('dateFrom') : "")
    const [dateTo, setDateTo] = useState(ReactSession.get('dateTo') ? ReactSession.get('dateTo') : "")
    const [searchValue, setSearchValue] = useState(ReactSession.get('searchValue') ? ReactSession.get('searchValue') : '')
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const [sessionAppInstructionsTabelSearch, setSessionAppInstructionsTabelSearch] = useState(ReactSession.get("appInstructionsTabelSearch") || null)

    const defaultAppInstructionsTabelSearch = {
        page: 1,
        limit: 10,
        offset: 0,
        sort: "ins_date",
        order: "desc",
        search: {
            search: "",
            langType: langType,
            status: selected ? selected : '1,2,3,4',
            from: dateFrom,
            group: selected2,
            to: dateTo
        }
    }

    const [appInstructionsTabelSearch, setAppInstructionsTabelSearch] = useState(
        ReactSession.get("appInstructionsTabelSearch") ? sessionAppInstructionsTabelSearch : defaultAppInstructionsTabelSearch
    )

    useEffect(() => {
        getInstructionsData(appInstructionsTabelSearch)
        ReactSession.set("appInstructionsTabelSearch", appInstructionsTabelSearch)
    }, [appInstructionsTabelSearch])

    useEffect(() => {
        if (!sessionAppInstructionsTabelSearch) {
            setSessionAppInstructionsTabelSearch(appInstructionsTabelSearch)
            getInstructionsData(appInstructionsTabelSearch)
        }
    }, [sessionAppInstructionsTabelSearch])

    useEffect(() => {
        const lastURL = localStorage.getItem('currentURL')
        let temp = localStorage.getItem("firstTime_Login")
        if (temp === "true") {
            history.push('/FirstLogin')
        } else if (lastURL) {
            // Parse the lastURL to extract the path part
            const urlParts = lastURL.split('/')
            const path = urlParts[urlParts.length - 1]

            history.push(`/${path}`)
            localStorage.removeItem('currentURL')
        }

        let temp1 = ReactSession.get('selected')
        let temp2 = ReactSession.get('dateFrom')
        let temp3 = ReactSession.get('dateTo')
        let temp4 = ReactSession.get('searchValue')
        let temp5 = ReactSession.get('selected2')
        let temp6 = Array.isArray(ReactSession.get('selectedArray')) && ReactSession.get('selectedArray').length > 0 ? ReactSession.get('selectedArray') : ['1', '2', '3', '4']

        let stringArray = ''
        stringArray = temp6.join(',')
        setSelected(stringArray)
        setDateFrom(temp2)
        setDateTo(temp3)
        setSearchValue(temp4)
        setSelected2(temp5)
        setSelectedArray(temp6)
        getInstructionsData(appInstructionsTabelSearch)

    }, [])

    useEffect(() => {

        ReactSession.set('selected', selected)
        ReactSession.set('selectedArray', selectedArray)
        ReactSession.set('selected2', selected2)
        ReactSession.set('dateFrom', dateFrom)
        ReactSession.set('dateTo', dateTo)
        ReactSession.set('searchValue', searchValue)

    }, [selected, dateFrom, dateTo, searchValue, selectedArray])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appGroupListData = useSelector(state => {
        return state.instructionsReducer.respGetGroupList
    })

    const appStatusData = useSelector(state => {
        return state.instructionsReducer.respGetAllStatus
    })

    useEffect(() => {
        setLoadingSpinner(true)
        setAppInstructionsTabelSearch({
            page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset, sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: {
                search: appInstructionsTabelSearch.search.search, langType: langType, status: appInstructionsTabelSearch.search.status, from: dateFrom, to: dateTo,
                group: appInstructionsTabelSearch.search.group,
            }
        })
        dispatch(getGroupListData({ search: { langType: langType } }))
        dispatch(getAllStatusData({ search: { langType: langType } }))
    }, [langType])

    const appInstructionsData = useSelector(state => {
        return state.instructionsReducer.respGetInstructions
    })

    useEffect(() => {
        if (appInstructionsData.status == "0") {
            setAppInstructionsMsg(appInstructionsData)
        }
        if (ReactSession.get('appEditInstructionsMsg') != undefined || history.location.state != null || !performance.navigation.TYPE_RELOAD) {
            setAppInstructionsMsg(ReactSession.get('appEditInstructionsMsg'))
            ReactSession.set('appEditInstructionsMsg', null)
        }
        setLoadingSpinner(false)
    }, [appInstructionsData])

    useEffect(() => {
        if (isClosed == true) {
            history.push({
                state: {
                    setAppInstructionsMsg: ""
                }
            })
        }
    }, [appInstructionsMsg])

    const appInstructionsp01Tabel = [
        {
            dataField: "num",
            text: props.t("No."),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-num-column",
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },

        {
            dataField: "title",
            text: props.t("Instructions"),
            sort: true,
            align: "left",
            headerStyle: { textAlign: "center" },
            classes: "custom-title-column",
            style: { maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },
        {
            dataField: "owner",
            text: props.t("Owner"),
            align: "center",
            headerStyle: { textAlign: 'center' },
            style: { width: "150px" },
            formatter: (cellContent, _appInstructionsData) => {
                if (!cellContent || !cellContent.name || !cellContent.bgColor) {
                    return null
                }

                return (
                    <span className="px-3 py-1 rounded" style={{ backgroundColor: cellContent.bgColor, color: "white", height: "30px" }}>
                        {cellContent.name}
                    </span>
                )
            },
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },
        {
            dataField: "managerList",
            text: props.t("Manager"),
            align: "left",
            headerStyle: { textAlign: 'center' },
            style: {
                width: "250px",
                minWidth: "250px",
                maxWidth: "250px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            },
            formatter: (cellContent, _appInstructionsData) => (
                <a>
                    {cellContent.map((data, index) => (
                        <span key={index}>
                            {index === 0
                                ? data.name + (data.gname !== null ? ` (${data.gname})` : '')
                                : `, ${data.name}` + (data.gname !== null ? ` (${data.gname})` : '')
                            }
                        </span>
                    ))}
                </a>
            ),
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },
        {
            dataField: "insDate",
            text: props.t("Instruction Date"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-insdate-column",
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },
        {
            dataField: "status",
            text: props.t("Status"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            style: { minWidth: "180px" },
            classes: "custom-status-column",
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
            formatter: (cellContent, appInstructionsData) => (
                <span style={{
                    fontWeight: appInstructionsData.status_id === 4 ? "bold" : appInstructionsData.status_id === 5 ? "bold" : appInstructionsData.status_id === 1 ? "inherit" : "inherit",
                    color: appInstructionsData.status_id === 4 ? "red" : appInstructionsData.status_id === 5 ? "green" : appInstructionsData.status_id === 1 ? "#b8b8b8" : "inherit"
                }}>
                    {cellContent}
                </span>
            ),
        },
        {
            dataField: "reply_count",
            text: props.t("Replies"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-replies-column",
            formatter: (_cellContent, appInstructionsData) => (
                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                    <span>
                        <div>
                            {
                                appInstructionsData.reply_count > 0 ?
                                    <>
                                        <i className="bx bx-message-dots text-primary" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.reply_count}
                                    </>
                                    :
                                    <>
                                        <i className="bx bx-message-dots" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.reply_count}
                                    </>
                            }
                        </div>
                    </span>
                </div>
            ),
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    setInstructionsData(appInstructionsData.num.toString())
                    toggle()
                },
            },
        },
        {
            dataField: "notice_count",
            text: props.t("Notices"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-notices-column",
            formatter: (_cellContent, appInstructionsData) => (
                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                    <span>
                        <div>
                            {
                                appInstructionsData.notice_count > 0 ?
                                    <>
                                        <i className="bx bxs-bell text-danger" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.notice_count}
                                    </>
                                    :
                                    <>
                                        <i className="bx bxs-bell" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.notice_count}
                                    </>
                            }
                        </div>
                    </span>

                </div>
            ),
            events: {
                onClick: (_e, _column, _columnIndex, appInstructionsData, _rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData)
                },
            },
        },
    ]

    const appInstructionsPreAdd = () => {
        dispatch(resetMessage())
        setAppInstructionsMsg("")
        setAppInstructionsPage(false)
        setAppAddInstructions(true)
    }

    const appInstructionsPreEdit = (appInstructionsData) => {
        dispatch(resetMessage())
        const num = appInstructionsData?.num
        const searchParams = new URLSearchParams()
        searchParams.append("num", num)
        const urlWithParams = '/AppEditInstruction?' + searchParams.toString()
        localStorage.setItem('tempSelect', true)
        history.push(urlWithParams)
        setAppInstructionsMsg("")
        setAppInstructionsPage(false)
        setEditInstructions(true)
    }

    const handleChange = (event) => {
        const selectedValue = event.target.value
        const isChecked = event.target.checked
        let updatedSelectedArray = [...selectedArray]
        let stringArray = ''
        setSelectedArray((prevSelected) => {
            if (isChecked) {
                updatedSelectedArray.push(selectedValue)
                stringArray = updatedSelectedArray.join(',')
                return prevSelected?.length > 0 ? [...prevSelected, selectedValue] : [selectedValue]
            } else {
                updatedSelectedArray = prevSelected.filter((value) => value !== selectedValue)
                stringArray = updatedSelectedArray.join(',')
                return updatedSelectedArray
            }
        })
        setAppInstructionsTabelSearch((prevSearch) => ({
            ...prevSearch,
            page: 1,
            offset: 0,
            search: {
                ...prevSearch.search,
                status: stringArray,
            },
        }))
        setSelected(stringArray)
        setAppInstructionsMsg("")
    }

    const handleChangeGroup = event => {
        setLoadingSpinner(true)
        setAppInstructionsTabelSearch({
            page: 1, limit: appInstructionsTabelSearch.limit, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: {
                search: appInstructionsTabelSearch.search.search, langType: appInstructionsTabelSearch.search.langType, status: appInstructionsTabelSearch.search.status, from: dateFrom, to: dateTo,
                group: event.target.value,
            }
        })
        setAppInstructionsMsg("")
        setSelected2(event.target.value)
        ReactSession.set('selected2', event.target.value)
    }

    const dateChanger = (name, selectedDate) => {
        if (name === 'from') {
            setDateFrom(selectedDate)
        } else if (name === 'to') {
            setDateTo(selectedDate)
        }
    }

    useEffect(() => {
        if (dateFrom === null) setDateFrom('')
        if (dateTo === null) setDateTo('')
        setLoadingSpinner(true)
        setAppInstructionsTabelSearch((prevSearch) => ({
            ...prevSearch,
            search: {
                ...prevSearch.search,
                from: dateFrom,
                to: dateTo,
            },
        }))
    }, [dateFrom, dateTo])

    const handleSearch = () => {
        setLoadingSpinner(true)
        history.replace("/AppInstructions?page=1")
        setAppInstructionsTabelSearch({
            page: 1, limit: 10, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: {
                search: searchValue, langType: appInstructionsTabelSearch.search.langType, status: appInstructionsTabelSearch.search.status, from: dateFrom, to: dateTo,
                group: appInstructionsTabelSearch.search.group,
            }
        })
    }

    const toggle = () => setReplyModal(!replyModal)

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <>
                    {appInstructionsMsg !== "" ?
                        <UncontrolledAlert
                            toggle={() => {
                                setAppInstructionsMsg("")
                                setIsClosed(true)
                            }}
                            color={appInstructionsMsg.status == "1" ? "success" : "danger"}>
                            {typeof appInstructionsMsg == 'string' ? null : appInstructionsMsg.message}
                        </UncontrolledAlert> : null}
                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                    < Container style={{ display: appInstructionsPage ? 'block' : 'none' }} fluid="true" >
                        <Row>
                            <Col>
                                <Row className="mb-2">
                                    <Col sm="12">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <Col md="5">
                                                    <Row className="mb-1 col-sm-11">
                                                        <label className="col-sm-2" style={{ marginTop: "8px" }}>{props.t("Search")}</label>
                                                        <div className="col-sm-6">
                                                            <input
                                                                type="search"
                                                                className="form-control"
                                                                value={searchValue}
                                                                onChange={e => {
                                                                    const inputValue = e.target.value
                                                                    setSearchValue(inputValue)
                                                                }}
                                                                onKeyDown={e => e.key === 'Enter' ? handleSearch() : null}
                                                            />
                                                        </div>
                                                    </Row>
                                                    <Row className="mb-1 col-sm-12">
                                                        <label className="col-sm-2" style={{ marginTop: "8px", width: "15%" }}>
                                                            {props.t("Status")}
                                                        </label>
                                                        <div className="col-sm-8" style={{ display: "flex", flexWrap: "wrap", marginTop: "8px" }}>
                                                            {appStatusData?.data?.statusList.map((status, index) =>
                                                                status.id !== 0 ?
                                                                    (
                                                                        <div key={index} style={{ marginRight: "10px" }}>
                                                                            <Input
                                                                                type="checkbox"
                                                                                name="status"
                                                                                onChange={handleChange}
                                                                                value={status.id}
                                                                                id={`statusCheckbox${status.id}`}
                                                                                checked={selectedArray?.includes(status.id.toString())}
                                                                            />
                                                                            <label htmlFor={`statusCheckbox${status.id}`}>&nbsp;{status.name}</label>
                                                                        </div>
                                                                    ) :
                                                                    null
                                                            )}
                                                        </div>
                                                    </Row>
                                                    <Col md='1'>
                                                        <button className="btn btn-primary" style={{ position: "absolute", left: "25%", top: 0 }} onClick={() => handleSearch()}>
                                                            {props.t("Search")}
                                                        </button>
                                                    </Col>
                                                </Col>
                                                <Col md="5" style={{ marginLeft: "-0px" }}>
                                                    <Row className="mb-1 col-sm-11">
                                                        <label className="col-sm-2" style={{ marginTop: "8px" }}>
                                                            {props.t("Group")}
                                                        </label>
                                                        <div className="col-sm-6">
                                                            <Input
                                                                type="select"
                                                                name="group"
                                                                onChange={handleChangeGroup}
                                                                value={selected2}
                                                            >
                                                                {appGroupListData?.data?.groupList.map((group) => (
                                                                    <option key={group.num} value={group.num}>
                                                                        {group.name}
                                                                    </option>
                                                                ))}
                                                            </Input>
                                                        </div>
                                                    </Row>
                                                    <Row className="mb-1 col-sm-11">
                                                        <label className="col-sm-2 ">
                                                            <i style={{ position: "absolute", fontSize: "18px", top: '0.25em', left: "24px" }} className="mdi mdi-calendar-month opacity-75" />
                                                        </label>
                                                        <div className="col-sm-3" style={{ paddingRight: "-15%" }}>
                                                            <DatePicker
                                                                className="form-control"
                                                                wrapperClassName="customDatePicker"
                                                                showMonthYearPicker
                                                                dateFormat="yyyy-MM"
                                                                maxDate={new Date(dateTo)}
                                                                selected={dateFrom ? moment(dateFrom, 'yyyy-MM').toDate() : null}
                                                                onChange={(tglMulai) =>
                                                                    dateChanger('from', tglMulai ? moment(tglMulai).format('yyyy-MM') : null)
                                                                }
                                                                onKeyDown={(e) => {
                                                                    e.preventDefault()
                                                                }}
                                                                isClearable

                                                            />
                                                        </div>
                                                        <label className="col-sm-1" style={{ marginTop: "8px", marginLeft: "-2.6%", marginRight: "-2.5%" }}>
                                                            -
                                                        </label>
                                                        <div className="col-sm-3" style={{}}>
                                                            <DatePicker
                                                                className="form-control"
                                                                wrapperClassName="customDatePicker"
                                                                showMonthYearPicker
                                                                dateFormat="yyyy-MM"
                                                                minDate={new Date(dateFrom ? moment(dateFrom, 'yyyy-MM').toDate() : '')}
                                                                selected={dateTo ? moment(dateTo, 'yyyy-MM').toDate() : null}
                                                                onChange={(tglSelesai) =>
                                                                    dateChanger('to', tglSelesai ? moment(tglSelesai).format('yyyy-MM') : null)
                                                                }
                                                                onKeyDown={(e) => {
                                                                    e.preventDefault()
                                                                }}
                                                                isClearable
                                                            />
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm="12">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <Col sm="12">
                                                    <div className="text-sm-end">
                                                        <Button
                                                            disabled={appInstructionsData?.data?.create ? false : true}
                                                            className={appInstructionsData?.data?.create ? "" : "btn btn-dark opacity-25"}
                                                            type="button"
                                                            onClick={() => { appInstructionsPreAdd() }}
                                                        >
                                                            <i className="mdi mdi-plus fs-5 align-middle" />{" "}
                                                            {props.t("New Instruction")}
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-5" style={{ marginRight: "0px", marginLeft: "0px" }}>
                                    <TableCustom
                                        keyField={"insId"}
                                        columns={appInstructionsp01Tabel}
                                        redukResponse={appInstructionsData}
                                        appdata={appInstructionsData.data != null ? appInstructionsData.data.instructions : []}
                                        appdataTotal={appInstructionsData.data != null ? appInstructionsData.data.totalCount : 0}
                                        searchSet={setAppInstructionsTabelSearch}
                                        searchGet={appInstructionsTabelSearch}
                                        redukCall={getInstructionsData}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Container >
                    {
                        appAddInstructions && <AddInstruction
                            appAddInstructions={appAddInstructions}
                            setAppAddInstructions={setAppAddInstructions}
                            setAppInstructionsMsg={setAppInstructionsMsg}
                            setAppInstructionsPage={setAppInstructionsPage}
                            appInstructionsTabelSearch={appInstructionsTabelSearch}
                        />
                    }
                    {
                        replyModal && <ReplyModal
                            modal={replyModal}
                            toggle={toggle}
                            data={instructionsData}
                            setLoadingSpinner={setLoadingSpinner}
                        />
                    }
                </>
            }
        />
    )
}

Instructions.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(Instructions)