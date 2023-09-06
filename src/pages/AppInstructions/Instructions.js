import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import '../../config';
import RootPageCustom from '../../common/RootPageCustom';
import TableCustom from '../../common/TableCustom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Container,
    UncontrolledTooltip,
    CardHeader,
    Badge,
    Input,
    UncontrolledAlert,
} from "reactstrap";
import { getInstructionsData, getInstructionsData2, resetMessage } from "../../store/appInstructions/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import AddInstructions from "./AddInstructions";
import EditInstructions from "./EditInstructions";
import "../../assets/scss/custom/table/TableCustom.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker";
import '../../assets/scss/custom/components/custom-datepicker.scss'
import CustomDatePicker from "../../common/CustomDatePicker.js"
import e from "cors";
import { ContextMenu } from "react-contextmenu";


const Instructions = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const history = useHistory()
    const [appInstructionsPage, setAppInstructionsPage] = useState(true)
    const [appAddInstructions, setAppAddInstructions] = useState(false)
    const [appEditInstructions, setEditInstructions] = useState(false)
    const [appDetailInstructions, setAppDetailInstructions] = useState(true)
    const [appInstructionsMsg, setAppInstructionsMsg] = useState("")
    const [appInstructionsMsg2, setAppInstructionsMsg2] = useState("")
    const [instructionsData, setInstructionsData] = useState()
    const [selected, setSelected] = useState("");
    const [getData, setGetData] = useState([]);
    const [getData2, setGetData2] = useState([]);
    const [isClosed, setIsClosed] = useState(false)

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');


    useEffect(() => {
        const lastURL = localStorage.getItem('currentURL');
        let temp = ReactSession.get('firstTime_Login')
        if (temp === "true") {
            history.push('/FirstLogin')
        } else if (lastURL) {
            debugger
            // Parse the lastURL to extract the path part
            const urlParts = lastURL.split('/');
            const path = urlParts[urlParts.length - 1];

            history.replace(`/${path}`);
            localStorage.removeItem('currentURL');
        }
        setAppInstructionsTabelSearch(JSON.parse(localStorage.getItem('appInstructionsTabelSearch')))
        console.log(JSON.parse(localStorage.getItem('appInstructionsTabelSearch')))
        // console.log(appInstructionsTabelSearch)
    }, [])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const [sessionAppInstructionsTabelSearch, setSessionAppInstructionsTabelSearch] = useState(
        ReactSession.get("appInstructionsTabelSearch") || {}
    );

    const defaultAppInstructionsTabelSearch = {
        page: 1,
        limit: 10,
        offset: 0,
        sort: "ins_date",
        order: "desc",
        search: {
            search: "",
            langType: langType,
            status: selected,
            from: dateFrom,
            to: dateTo
        }
    };

    const [appInstructionsTabelSearch, setAppInstructionsTabelSearch] = useState(
        ReactSession.get("appInstructionsTabelSearch") ? sessionAppInstructionsTabelSearch : defaultAppInstructionsTabelSearch
    );

    useEffect(() => {
        getInstructionsData(appInstructionsTabelSearch)
        ReactSession.set("appInstructionsTabelSearch", appInstructionsTabelSearch)
    }, [appInstructionsTabelSearch])

    useEffect(() => {
        if (!sessionAppInstructionsTabelSearch) {
            setSessionAppInstructionsTabelSearch(appInstructionsTabelSearch)
        }
    }, [sessionAppInstructionsTabelSearch])

    useEffect(() => {
        setAppInstructionsTabelSearch({
            page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset, sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: {
                search: appInstructionsTabelSearch.search.search, langType: langType, status: appInstructionsTabelSearch.search.status, from: dateFrom, to: dateTo
            }
        });
    }, [props.t, langType])

    const appInstructionsData = useSelector(state => {
        return state.instructionsReducer.respGetInstructions;
    });

    useEffect(() => {
        if (appInstructionsData.status == "0") {
            setAppInstructionsMsg(appInstructionsData)
        }
        if (history.location.state != undefined || history.location.state != null || !performance.navigation.TYPE_RELOAD) {
            setAppInstructionsMsg(history.location.state?.setAppInstructionsMsg)
        }
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
            text: "No.",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-num-column",
            events: {
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    // debugger
                    appInstructionsPreEdit(appInstructionsData);
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
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
                },
            },
        },
        {
            dataField: "owner",
            text: props.t("Owner"),
            align: "center",
            headerStyle: { textAlign: 'center' },
            style: { width: "150px" },
            formatter: (cellContent, appInstructionsData) => {
                if (!cellContent || !cellContent.name || !cellContent.bgColor) {
                    return null;
                }

                return (
                    <>
                        <span className="px-3 py-1 rounded" style={{ backgroundColor: cellContent.bgColor, color: "white", height: "30px" }}>
                            {cellContent.name}
                        </span>
                    </>
                );
            },
            events: {
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
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
            formatter: (cellContent, appInstructionsData) => (
                <>
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
                </>
            ),
            events: {
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
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
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
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
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
                },
            },
        },
        {
            dataField: "reply_count",
            text: props.t("Replies"),
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-replies-column",
            formatter: (cellContent, appInstructionsData) => (
                <>
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
                </>
            ),
            events: {
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
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
            formatter: (cellContent, appInstructionsData) => (
                <>
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
                </>
            ),
            events: {
                onClick: (e, column, columnIndex, appInstructionsData, rowIndex) => {
                    appInstructionsPreEdit(appInstructionsData);
                },
            },
        },
    ]

    const appInstructionsPreAdd = () => {
        setAppInstructionsMsg("")
        setAppInstructionsPage(false)
        setAppAddInstructions(true)
    }

    const appInstructionsPreEdit = (appInstructionsData) => {
        const num = appInstructionsData?.num;
        const searchParams = new URLSearchParams();
        searchParams.append("num", num);

        // Construct the URL with the search parameters
        const urlWithParams = '/AppEditInstruction?' + searchParams.toString();

        // Use history.push() to navigate to the new URL
        history.replace(urlWithParams);

        // Rest of your code
        setAppInstructionsMsg("");
        setInstructionsData(appInstructionsData);
        setAppInstructionsPage(false);
        setEditInstructions(true);
    }

    const handleChange = event => {
        setAppInstructionsTabelSearch({
            page: 1, limit: appInstructionsTabelSearch.limit, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: appInstructionsTabelSearch.search.search, langType: appInstructionsTabelSearch.search.langType, status: event.target.value, from: dateFrom, to: dateTo }
        })
        setAppInstructionsMsg("")
        console.log(event.target.value);
        setSelected(event.target.value);
    }

    const [applyClicked, setApplyClicked] = useState(false);

    const dateChanger = (name, selectedDate) => {
        let convertedDate = selectedDate.toISOString().substr(0, 7);
        if (name === 'from') {
            setDateFrom(convertedDate);
            setAppInstructionsTabelSearch((prevSearch) => ({
                ...prevSearch,
                search: {
                    ...prevSearch.search,
                    from: convertedDate,
                    to: dateTo,
                },
            }));
        } else if (name === 'to') {
            setDateTo(convertedDate);
            setAppInstructionsTabelSearch((prevSearch) => ({
                ...prevSearch,
                search: {
                    ...prevSearch.search,
                    from: dateFrom,
                    to: convertedDate,
                },
            }));
        }
    };

    const handleKeyDown = (e) => {
        e.preventDefault();
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) {
            e.preventDefault();
        }
    };

    // buat test doang
    // const [clicked, setClicked] = useState(false);
    // const [points, setPoints] = useState({
    //     x: 0,
    //     y: 0,
    // });

    // useEffect(() => {
    //     const handleClick = () => setClicked(false);
    //     window.addEventListener("click", handleClick);
    //     return () => {
    //         window.removeEventListener("click", handleClick);
    //     };
    // }, []);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <>
                    {appInstructionsMsg !== "" ? <UncontrolledAlert toggle={() => { setAppInstructionsMsg(""); setIsClosed(true) }} color={appInstructionsMsg.status == "1" ? "success" : "danger"}>
                        {typeof appInstructionsMsg == 'string' ? null : appInstructionsMsg.message}</UncontrolledAlert> : null}
                    < Container style={{ display: appInstructionsPage ? 'block' : 'none' }} fluid={true} >
                        <Row>
                            <Col>
                                {/* <div
                                    className="p-5"
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setClicked(true);
                                        setPoints({
                                            x: e.pageX,
                                            y: e.pageY,
                                        });
                                    }}
                                    style={{
                                        backgroundColor: "grey",
                                    }}
                                >
                                    <div>
                                        {clicked && (
                                            <div
                                                style={{
                                                    position: "fixed",
                                                    top: `${points?.y}px`,
                                                    left: `${points?.x}px`,
                                                    backgroundColor: "white",
                                                    border: "1px solid black",
                                                    padding: "5px",
                                                }}
                                            >
                                                <ul>
                                                    <li>Edit</li>
                                                    <li>Copy</li>
                                                    <li>Delete</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div> */}

                                <Row className="mb-2">
                                    <Col sm="12">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <Col md="3">
                                                    <Row className="mb-1 col-sm-10">
                                                        <label className="col-sm-4" style={{ marginTop: "8px" }}>{props.t("Search")} </label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={appInstructionsTabelSearch.search.search}
                                                                onChange={e => {
                                                                    setAppInstructionsTabelSearch({
                                                                        page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset,
                                                                        sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: e.target.value, langType: appInstructionsTabelSearch.search.langType, status: appInstructionsTabelSearch.search.status, from: dateFrom, to: dateTo }
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </Row>
                                                </Col>

                                                <Col md="6" style={{ display: "flex", alignItems: "center" }}>
                                                    <div style={{ width: '30%', display: "flex", alignItems: "center" }}>
                                                        <CustomDatePicker
                                                            selected={dateFrom ? new Date(dateFrom + '-01') : null}
                                                            onChange={(date) => dateChanger('from', date)}
                                                            onClear={() => {
                                                                setDateFrom('');
                                                                setAppInstructionsTabelSearch((prevSearch) => ({
                                                                    ...prevSearch,
                                                                    search: {
                                                                        ...prevSearch.search,
                                                                        from: null,
                                                                        to: dateTo,
                                                                    },
                                                                }));
                                                            }}
                                                        />

                                                        <div style={{ width: '50px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            -
                                                        </div>
                                                        <CustomDatePicker
                                                            selected={dateTo ? new Date(dateTo + '-01') : null}
                                                            onChange={(date) => dateChanger('to', date)}
                                                            onClear={() => {
                                                                setDateTo('');
                                                                setAppInstructionsTabelSearch((prevSearch) => ({
                                                                    ...prevSearch,
                                                                    search: {
                                                                        ...prevSearch.search,
                                                                        from: dateFrom,
                                                                        to: null,
                                                                    },
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md="3">
                                                </Col>

                                                <Col md="3" style={{ marginLeft: "-0px" }}>
                                                    <Row className="mb-1 col-sm-10">
                                                        <label className="col-sm-4" style={{ marginTop: "8px" }}>
                                                            Status{" "}
                                                        </label>
                                                        <div className="col-sm-8">
                                                            <Input
                                                                type="select"
                                                                name="status"
                                                                onChange={handleChange}
                                                                value={selected}
                                                            >
                                                                <option id="" value={""}>{props.t("All")}</option>
                                                                <option id="1" value={"1"}>{props.t("Not Started")}</option>
                                                                <option id="2" value={"2"}>{props.t("In Process")}</option>
                                                                <option id="3" value={"3"}>{props.t("Action Completed")}</option>
                                                                <option id="4" value={"4"}>{props.t("Rejected")}</option>
                                                                <option id="5" value={"5"}>{props.t("Completed")}</option>

                                                            </Input>
                                                        </div>
                                                    </Row>
                                                </Col>

                                                <Col sm="12">
                                                    <div className="text-sm-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary "
                                                            onClick={() => { appInstructionsPreAdd() }}
                                                        >
                                                            <i className="mdi mdi-plus fs-5 align-middle" />{" "}
                                                            {props.t("New Instructions")}
                                                        </button>
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <TableCustom
                                        keyField={"insId"}
                                        columns={appInstructionsp01Tabel}
                                        redukResponse={appInstructionsData}
                                        appdata={appInstructionsData.data != null ? appInstructionsData.data.instructions : []}
                                        appdataTotal={appInstructionsData.data != null ? appInstructionsData.data.totalCount : 0}
                                        searchSet={setAppInstructionsTabelSearch}
                                        searchGet={appInstructionsTabelSearch}
                                        redukCall={getInstructionsData}
                                    //rowClick={() => appInstructionsPreEdit(appInstructionsData)}
                                    />

                                </Row>
                            </Col>
                        </Row>
                    </Container >

                    <AddInstructions
                        appAddInstructions={appAddInstructions}
                        setAppAddInstructions={setAppAddInstructions}
                        setAppInstructionsMsg={setAppInstructionsMsg}
                        setAppInstructionsPage={setAppInstructionsPage}
                        appInstructionsTabelSearch={appInstructionsTabelSearch} />

                </>
            }
        />
    );


}

Instructions.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(Instructions)