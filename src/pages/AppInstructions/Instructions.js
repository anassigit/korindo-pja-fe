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
    Input,
} from "reactstrap";
import { getInstructionsData, getInstructionsData2, resetMessage } from "../../store/appInstructions/actions"
import { useSelector, useDispatch } from "react-redux"
//import { ReactSession } from 'react-client-session';
import AddInstructions from "./AddInstructions";
import EditInstructions from "./EditInstructions";
import "../../assets/scss/custom/table/TableCustom.css"

const Instructions = () => {

    const dispatch = useDispatch();
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
            search: "", langType: "kor", status: selected
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
        },
        {
            dataField: "title",
            text: "Instructions",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, appInstructionsData) => (
                <>
                    <button
                        style={{ width: "250px", backgroundColor: "transparent", borderColor: "transparent", boxShadow: "none" }}
                        type="button"
                        className="btn btn-primary "
                        onClick={() => appInstructionsPreEdit(appInstructionsData)}
                    >
                        <a title="Instructions" style={{ textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#495057" }} className="d-block">{appInstructionsData.title}</a>
                    </button>
                </>
            ),
        },
        {
            dataField: "ownerList",
            text: "Owner",
            align: "center",
            headerStyle: { textAlign: 'center' },
            style: { width: "180px"},
            formatter: (cellContent, appInstructionsData) => {
                let ownerElements = "";
                if (cellContent.length > 1) {
                    ownerElements = cellContent.map((owner, index) => (
                        <span className="mx-1" key={index}>
                            <span className="rounded-circle" style={{ backgroundColor: owner.bgColor, color: "white", width: "35px", height: "35px", display: "inline-block", textAlign: "center", justifyContent: "center", lineHeight: "35px" }}>
                                {owner.name.charAt(0).toUpperCase()}
                            </span>
                        </span>
                    ))
                } else {
                    ownerElements = cellContent.map((owner, index) => (
                        <span className="px-3 py-1 rounded" key={index} style={{ backgroundColor: owner.bgColor, color: "white" }}>
                            {owner.name}
                        </span>
                    ))
                }

                return (
                    <>
                        <div>{ownerElements}</div>
                    </>
                );
            },
        },
        {
            dataField: "managerList",
            text: "Manager",
            align: "left",
            headerStyle: { textAlign: 'center' },
            style: { width: "180px"},
            formatter: (cellContent, appInstructionsData) => {
                return (
                    <>
                        <div style={{ width: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} className="d-block">
                            {cellContent.map((data, index) => {
                                return index === 0 ? data.name : `, ${data.name}`;
                            })}
                        </div>
                    </>
                )
            },
        },
        {
            dataField: "insDate",
            text: "Instruction Date",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-insdate-column",
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            classes: "custom-status-column",
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
                        <i className="mdi mdi-chat-processing-outline text-primary" id="repliesCount" style={{fontSize: "25px"}}/>&nbsp;{appInstructionsData.reply_count}
                        </div>
                        </span>

                    </div>
                </>
            ),
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
                        <i className="mdi mdi-bell text-primary" id="repliesCount" style={{fontSize: "25px"}}/>&nbsp;{appInstructionsData.notice_count}
                        </div>
                        </span>

                    </div>
                </>
            ),
        },
        {
            dataField: "status",
            text: "ID status",
            sort: true,
            align: "center",
            hidden: true,
            headerStyle: { textAlign: 'center' },
            classes: "custom-status-column",
        },
    ]

    const appInstructionsPreAdd = () => {
        setAppInstructionsMsg("")
        setAppInstructionsPage(false)
        setAppAddInstructions(true)
    }

    const appInstructionsPreEdit = (appInstructionsData) => {
        setAppInstructionsMsg("")
        setInstructionsData(appInstructionsData)
        setAppInstructionsPage(false)
        setEditInstructions(true)
    }


    const handleChange = event => {
        setAppInstructionsTabelSearch({
            page: 1, limit: appInstructionsTabelSearch.limit, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: appInstructionsTabelSearch.search.search, status: event.target.value }
        })
        setAppInstructionsMsg("")
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    return (
        <RootPageCustom msgStateGet={appInstructionsMsg} msgStateSet={setAppInstructionsMsg}
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
                                                                        sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: e.target.value, status: appInstructionsTabelSearch.search.status }
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
                                                                //onSelect={""}
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
                                                            <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                                            New Instructions
                                                        </button>
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <React.Fragment>
                                    <Row>
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
                                </React.Fragment>
                            </Col>
                        </Row>
                    </Container>

                    <AddInstructions
                        appAddInstructions={appAddInstructions}
                        setAppAddInstructions={setAppAddInstructions}
                        setAppInstructionsMsg={setAppInstructionsMsg}
                        setAppInstructionsPage={setAppInstructionsPage}
                        appInstructionsTabelSearch={appInstructionsTabelSearch} />

                    <EditInstructions
                        appEditInstructions={appEditInstructions}
                        setEditInstructions={setEditInstructions}
                        setAppInstructionsMsg={setAppInstructionsMsg}
                        setAppInstructionsPage={setAppInstructionsPage}
                        instructionsData={instructionsData}
                        appInstructionsTabelSearch={appInstructionsTabelSearch} />

                </>
            }
        />
    );


}
export default Instructions