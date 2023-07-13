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
import { getInstructionsData, resetMessage } from "../../store/appInstructions/actions"
import { useSelector, useDispatch } from "react-redux"
//import { ReactSession } from 'react-client-session';
import AddInstructions from "./AddInstructions";
import EditInstructions from "./EditInstructions";
import DetailInstructions from "./DetailInstructions";

const Instructions = () => {

    const dispatch = useDispatch();
    const [appInstructionsPage, setAppInstructionsPage] = useState(true)
    const [appAddInstructions, setAppAddInstructions] = useState(false)
    const [appEditInstructions, setEditInstructions] = useState(false)
    const [appDetailInstructions, setAppDetailInstructions] = useState(true)
    const [appInstructionsMsg, setAppInstructionsMsg] = useState("")
    // const [app052DeleteModal, setApp052DeleteModal] = useState(false);
    const [instructionsData, setInstructionsData] = useState()
    const [selected, setSelected] = useState("");


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const [appInstructionsTabelSearch, setAppInstructionsTabelSearch] = useState({
        page: 1, limit: 10, offset: 0, sort: "insId", order: "desc", search: {
            any: "", statusId: selected
        }
    });

    const appInstructionsData = useSelector(state => {
        //console.log(state.instructionsReducer.respGetInstructions);
        return state.instructionsReducer.respGetInstructions;
    });

    useEffect(() => {
        if (appInstructionsData.status == "0") {
            setAppInstructionsMsg(appInstructionsData)
        }
    }, [appInstructionsData])

    const appInstructionsp01Tabel = [
        {
            dataField: "insId",
            text: "No.",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "insTitle",
            text: "Instructions",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, appInstructionsData) => (
                <>
                    <div style={{ justifyContent: 'left' }} className="d-flex gap-3">

                        <button style={{ backgroundColor: "transparent", borderColor: "transparent", boxShadow: "none" }}
                            type="button"
                            className="btn btn-primary "
                            onClick={() => appInstructionsPreEdit(appInstructionsData) }
                        >
                            <a title="Instructions" style={{ color: "#495057" }}>{appInstructionsData.insTitle}</a>
                        </button>

                    </div>
                </>
            ),
        },
        {
            dataField: "ownerId",
            text: "Owner",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "managerId",
            text: "Manager",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "insDate",
            text: "Instruction Date",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "insStatus",
            text: "Status",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "insReplies",
            text: "Replies",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "insUsers",
            text: "Notices",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "statusId",
            text: "ID status",
            sort: true,
            align: "left",
            hidden: true,
            headerStyle: { textAlign: 'center' },
        },
        // {
        //     dataField: "action",
        //     isDummyField: true,
        //     text: "Aksi",
        //     headerStyle: { textAlign: 'center' },
        //     formatter: (cellContent, appInstructionsData) => (
        //         <>
        //             <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
        //                 <i className="mdi mdi-pencil font-size-18  text-primary" id="edittooltip" onClick={() => app052p01PreEdit(appInstructionsData)} />
        //                 <UncontrolledTooltip placement="top" target="edittooltip">
        //                     Ubah
        //                 </UncontrolledTooltip>

        //                 <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app052p01Delete(appInstructionsData)} />
        //                 <UncontrolledTooltip placement="top" target="deletetooltip">
        //                     Hapus
        //                 </UncontrolledTooltip>

        //             </div>
        //         </>
        //     ),
        // },
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
        // setAppDetailInstructions(true)
    }

    // const [app052p01JarakTanamDelete, setApp052p01JarakTanamDelete] = useState(null);

    // const app052p01Delete = (app052p01JarakTanamData) => {
    //     setApp052setMsg("")
    //     setApp052p01JarakTanamDelete(app052p01JarakTanamData);
    //     setApp052DeleteModal(true)
    // }

    // const app052HandleDeleteJarakTanam = () => {
    //     if (app052p01JarakTanamDelete.jarakTanamId) {
    //         dispatch(deleteJarakTanam(app052p01JarakTanamDelete));
    //         setApp052DeleteModal(false);
    //         setApp052p01JarakTanamDelete(null)
    //     }
    // }

    // const app052p04Message = useSelector(state => {
    //     return state.JarakTanamReducer.msgDelete;
    // });

    // useEffect(() => {
    //     if (app052p04Message.status == "1") {
    //         dispatch(getJarakTanamData(app052p01TabelSearch))
    //     }
    //     setApp052setMsg(app052p04Message);
    // }, [app052p04Message])

    const handleChange = event => {
        // setApp045p01MsgPlant("");
        setAppInstructionsTabelSearch({
            page: 1, limit: appInstructionsTabelSearch.limit, offset: 0,
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { any: appInstructionsTabelSearch.search.any, statusId: event.target.value }
        })
        setAppInstructionsMsg("")
        console.log(event.target.value);
        // console.log('dropdown: ', selected);
        setSelected(event.target.value);
    };


    return (
        <RootPageCustom msgStateGet={appInstructionsMsg} msgStateSet={setAppInstructionsMsg}
            componentJsx={
                <>

                    {/* <DeleteModal
                        show={app052DeleteModal}
                        onDeleteClick={app052HandleDeleteJarakTanam}
                        onCloseClick={() => setApp052DeleteModal(false)}
                    /> */}

                    <Container style={{ display: appInstructionsPage ? 'block' : 'none' }} fluid={true}>
                        {/* <Breadcrumbs title="Forms" breadcrumbItem="Master Jarak Tanam" /> */}

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
                                                                value={appInstructionsTabelSearch.any}
                                                                onChange={e => {
                                                                    setAppInstructionsTabelSearch({
                                                                        page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset,
                                                                        sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { any: e.target.value }
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
                                                                name="statusId"
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

                                <Card>
                                    {/* <CardHeader>
                                        <i className="bx bx-list-check font-size-18 align-middle me-2"></i>Instructions
                                    </CardHeader> */}

                                    <CardBody>
                                        <React.Fragment>

                                            <Row>
                                                <TableCustom
                                                    keyField={"insId"}
                                                    columns={appInstructionsp01Tabel}
                                                    redukResponse={appInstructionsData}
                                                    appdata={appInstructionsData.data != null ? appInstructionsData.data.ins : []}
                                                    appdataTotal={appInstructionsData.data != null ? appInstructionsData.data.insTotal : 0}
                                                    searchSet={setAppInstructionsTabelSearch}
                                                    searchGet={appInstructionsTabelSearch}
                                                    redukCall={getInstructionsData}
                                                />

                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
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

                    {/* <DetailInstructions
                        appDetailInstructions={appDetailInstructions}
                        setAppDetailInstructions={setAppDetailInstructions}
                        setAppInstructionsMsg={setAppInstructionsMsg}
                        setAppInstructionsPage={setAppInstructionsPage}
                        instructionsData={instructionsData}
                        appInstructionsTabelSearch={appInstructionsTabelSearch} /> */}

                </>
            }
        />
    );


}
export default Instructions