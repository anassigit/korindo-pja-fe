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
} from "reactstrap";
import { getInstructionsData, resetMessage } from "../../store/appInstructions/actions"
import { useSelector, useDispatch } from "react-redux"
//import { ReactSession } from 'react-client-session';
// import JarakTanamAdd from "./JarakTanamAdd";
// import JarakTanamEdit from "./JarakTanamEdit";

const Instructions = () => {

    const dispatch = useDispatch();
    const [appInstructionsp01Page, setAppInstructionsp01Page] = useState(true)
    // const [app052p02Page, setApp052p02Page] = useState(false)
    // const [app052p03Page, setApp052p03Page] = useState(false)
     const [appInstructionsMsg, setAppInstructionsMsg] = useState("")
    // const [app052DeleteModal, setApp052DeleteModal] = useState(false);
    // const [app052p03Data, setApp052p03Data] = useState()

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    //let plantCd = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).plantCd : "";
 
    const [appInstructionsp01TabelSearch, setAppInstructionsp01TabelSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "num", order: "desc", search: { any: "" } });

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
            dataField: "memberId",
            text: "owner/manager",
            sort: true,
            align: "left",
            headerStyle: { textAlign: 'center' },
        },
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

    // const app052p01PreAdd = () => {
    //     setApp052setMsg("")
    //     setApp052p01Page(false)
    //     setApp052p02Page(true)
    // }

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

    return (
        <RootPageCustom msgStateGet={appInstructionsMsg} msgStateSet={setAppInstructionsMsg}
            componentJsx={
                <>

                    {/* <DeleteModal
                        show={app052DeleteModal}
                        onDeleteClick={app052HandleDeleteJarakTanam}
                        onCloseClick={() => setApp052DeleteModal(false)}
                    /> */}

                    <Container style={{ display: appInstructionsp01Page ? 'block' : 'none' }} fluid={true}>
                        {/* <Breadcrumbs title="Forms" breadcrumbItem="Master Jarak Tanam" /> */}

                        <Row>
                            <Col>
                                <Card>
                                    {/* <CardHeader>
                                        <i className="bx bx-list-check font-size-18 align-middle me-2"></i>Instructions
                                    </CardHeader> */}
                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <Col sm="8">
                                                    <div className="input-group">
                                                        <label className="col-sm-1" style={{ marginTop: "8px" }}>Search : </label>
                                                        <div className="col-sm-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={appInstructionsp01TabelSearch.any}
                                                                onChange={e => { setAppInstructionsp01TabelSearch({
                                                                    page: appInstructionsp01TabelSearch.page, limit: appInstructionsp01TabelSearch.limit, offset: appInstructionsp01TabelSearch.offset,
                                                                    sort: appInstructionsp01TabelSearch.sort, order: appInstructionsp01TabelSearch.order, search: { any: e.target.value }
                                                                }) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm="12">
                                                    <div className="text-sm-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary "
                                                            // onClick={() => { app052p01PreAdd() }}
                                                        >
                                                            <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                                            New Instructions
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                         
                                                <TableCustom className="rounded-top"
                                                    keyField={"no"}
                                                    columns={appInstructionsp01Tabel}
                                                    redukResponse={appInstructionsData}
                                                    appdata={appInstructionsData.data != null ? appInstructionsData.data.instructions : []}
                                                    appdataTotal={appInstructionsData.data != null ? appInstructionsData.data.instructionsTotal : 0}
                                                    searchSet={setAppInstructionsp01TabelSearch}
                                                    searchGet={appInstructionsp01TabelSearch}
                                                    redukCall={getInstructionsData}
                                                />
                                           
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    {/* <JarakTanamAdd
                        app052p02Page={app052p02Page}
                        setApp052p02Page={setApp052p02Page}
                        setApp052setMsg={setApp052setMsg}
                        setApp052p01Page={setApp052p01Page}
                        app052p01TabelSearch={app052p01TabelSearch}/>

                     <JarakTanamEdit
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