import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
//import DeleteModal from "../../common/DeleteModal";
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

const Instructions = () => {

    const dispatch = useDispatch();
    const [appInstructionsPage, setAppInstructionsPage] = useState(true)
    const [appAddInstructions, setAppAddInstructions] = useState(false)
    // const [app052p03Page, setApp052p03Page] = useState(false)
    const [appInstructionsMsg, setAppInstructionsMsg] = useState("")
    // const [app052DeleteModal, setApp052DeleteModal] = useState(false);
    // const [app052p03Data, setApp052p03Data] = useState()
    const [selected, setSelected] = useState("");


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    //let plantCd = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).plantCd : "";

    const [appInstructionsTabelSearch, setAppInstructionsTabelSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "num", order: "desc", search: { 
        any: "", status: selected } });

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
            dataField: "no",
            text: "No.",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "title",
            text: "Instructions",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "managerList",
            text: "Owner/ Manager",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        // {
        //     dataField: "managerList",
        //     text: "Manager",
        //     sort: true,
        //     align: "left",
        //     headerStyle: { textAlign: 'center' },
        // },
        {
            dataField: "instDate",
            text: "Instruction Date",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            align: "left",
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

    // const app052p01PreEdit = (app052p01JarakTanamData) => {
    //     setApp052setMsg("")
    //     setApp052p03Data(app052p01JarakTanamData)
    //     setApp052p01Page(false)
    //     setApp052p03Page(true)
    // }

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
            sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { any: appInstructionsTabelSearch.search.any, status: event.target.value }
        })
        setAppInstructionssetMsg("")
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
                                                name="statusApprove"
                                                onChange={handleChange}
                                                // onSelect={""}
                                                value={selected}
                                            >
                                                <option id="" value={""}>Semua</option>
                                                <option id="NS" value={"1"}>Not Started</option>
                                                <option id="IP" value={"2"}>In Progress</option>
                                                <option id="CP" value={"3"}>Completed</option>
                                                <option id="RJ" value={"4"}>Rejected</option>

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
                                                    keyField={"no"}
                                                    columns={appInstructionsp01Tabel}
                                                    redukResponse={appInstructionsData}
                                                    appdata={appInstructionsData.data != null ? appInstructionsData.data.instructions : []}
                                                    appdataTotal={appInstructionsData.data != null ? appInstructionsData.data.instructionsTotal : 0}
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
                        appInstructionsTabelSearch={appInstructionsTabelSearch}/>

                      {/* <EditInstructions
                        app052p03Page={app052p03Page}
                        setApp052p03Page={setApp052p03Page}
                        setApp052setMsg={setApp052setMsg}
                        setApp052p01Page={setApp052p01Page}
                        app052p03Data={app052p03Data}
                        app052p01TabelSearch={app052p01TabelSearch}  />   */}

                </>
            }
        />
    );


}
export default Instructions