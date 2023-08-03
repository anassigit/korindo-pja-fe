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
} from "reactstrap";
import { getInstructionsData, getInstructionsData2, resetMessage } from "../../store/appInstructions/actions"
import { useSelector, useDispatch } from "react-redux"
//import { ReactSession } from 'react-client-session';
import AddInstructions from "./AddInstructions";
import EditInstructions from "./EditInstructions";
import "../../assets/scss/custom/table/TableCustom.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const Instructions = () => {

    const dispatch = useDispatch();
    let history = useHistory()
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

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const [appInstructionsTabelSearch, setAppInstructionsTabelSearch] = useState({
        page: 1, limit: 10, offset: 0, sort: "num", order: "desc", search: {
            search: "", langType: "eng", status: selected
        }
    });

    const appInstructionsData = useSelector(state => {
        return state.instructionsReducer.respGetInstructions;
    });


    useEffect(() => {
        if (appInstructionsData.status == "0") {
            setAppInstructionsMsg(appInstructionsData)
        }
    }, [appInstructionsData])

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
                    debugger
                    appInstructionsPreEdit(appInstructionsData);
                },
            },
        },

        {
            dataField: "title",
            text: "Instructions",
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
        // {
        //     dataField: "title",
        //     text: "Instructions",
        //     sort: true,
        //     align: "left",
        //     headerStyle: { textAlign: 'center' },
        //     classes: "custom-title-column",
        //     style: { maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
        //     formatter: (cellContent, appInstructionsData) => (
        //         <>
        //             <a onClick={() => appInstructionsPreEdit(appInstructionsData)} >{appInstructionsData.title}</a>
        //         </>
        //     ),
        // },
        {
            dataField: "owner",
            text: "Owner",
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
            text: "Manager",
            align: "left",
            headerStyle: { textAlign: 'center' },
            style: { width: "150px", minWidth: "150px", maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
            formatter: (cellContent, appInstructionsData) => (
                <>
                    <a>
                        {cellContent.map((data, index) => {
                            return index === 0 ? data.name : `, ${data.name}`;
                        })}
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
            text: "Instruction Date",
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
            text: "Status",
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
            // formatter: (cellContent, appInstructionsData) => {
            //     if (cellContent.status == "1") {
            //         return <Badge color="warning" className="me-1 bg-soft">
            //             Not Started
            //         </Badge>
            //     } else if (cellContent.status == "2") {
            //         return <Badge color="secondary" className="me-1">
            //            In Proccess
            //         </Badge>
            //     } else if (cellContent.status == "3") {
            //         return <Badge color="danger" className="me-1">
            //             Action Completed
            //         </Badge>
            //     } else if (cellContent.status == "4") {
            //         return <Badge color="success" className="me-1">
            //             Rejected
            //         </Badge>
            //     } else {
            //         return <Badge color="warning" className="me-1">
            //             Completed
            //         </Badge>
            //     }
            // },
        },
        {
            dataField: "reply_count",
            text: "Replies",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-replies-column",
            formatter: (cellContent, appInstructionsData) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">

                        <span>
                            <div>
                                <i className="bx bx-message-dots" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.reply_count}
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
            text: "Notices",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-notices-column",
            formatter: (cellContent, appInstructionsData) => (
                <>
                    <div style={{ justifyContent: 'center' }} className="d-flex gap-3">

                        <span>
                            <div>
                                <i className="bx bxs-bell" id="repliesCount" style={{ fontSize: "25px", verticalAlign: "middle" }} />&nbsp;{appInstructionsData.notice_count}
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
        localStorage.setItem('appInstructionsData', JSON.stringify(appInstructionsData));
        history.push('/AppEditInstruction');
        setAppInstructionsMsg("")
        setInstructionsData(appInstructionsData)
        setAppInstructionsPage(false)
        setEditInstructions(true)
    }


    const handleChange = event => {
        setAppInstructionsTabelSearch({
            page: 1, limit: appInstructionsTabelSearch.limit, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: appInstructionsTabelSearch.search.search, langType: appInstructionsTabelSearch.search.langType, status: event.target.value }
        })
        setAppInstructionsMsg("")
        console.log(event.target.value);
        setSelected(event.target.value);
    };


    return (
        <RootPageCustom msgStateGet={appInstructionsMsg.message} msgStateSet={setAppInstructionsMsg}
            componentJsx={
                <>

                    <Container style={{ display: appInstructionsPage ? 'block' : 'none' }} fluid={true} >
                        <Row>
                            <Col>
                                <Row className="mb-2">
                                    <Col sm="12">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <Col md="4">
                                                    <Row className="mb-1 col-sm-10">
                                                        <label className="col-sm-3" style={{ marginTop: "8px" }}>Search : </label>
                                                        <div className="col-sm-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={appInstructionsTabelSearch.search.search}
                                                                onChange={e => {
                                                                    setAppInstructionsTabelSearch({
                                                                        page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset,
                                                                        sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: e.target.value, langType: appInstructionsTabelSearch.search.langType, status: appInstructionsTabelSearch.search.status }
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </Row>
                                                </Col>

                                                <Col md="4" style={{ marginLeft: "-0px" }}>
                                                    <Row className="mb-1 col-sm-10">
                                                        <label className="col-sm-3" style={{ marginTop: "8px" }}>
                                                            Status :{" "}
                                                        </label>
                                                        <div className="col-sm-7">
                                                            <Input
                                                                type="select"
                                                                name="status"
                                                                onChange={handleChange}
                                                                value={selected}
                                                            >
                                                                <option id="" value={""}>All</option>
                                                                <option id="1" value={"1"}>Not Started</option>
                                                                <option id="2" value={"2"}>In Process</option>
                                                                <option id="3" value={"3"}>Action Completed</option>
                                                                <option id="4" value={"4"}>Rejected</option>
                                                                <option id="5" value={"5"}>Completed</option>

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
                                                            <i className="mdi mdi-plus" style={{ verticalAlign: "middle" }}></i>{" "}
                                                            New Instructions
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
                    </Container>

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
export default Instructions