import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Spinner,
    Row
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, msgMove, getSelectFile, getSelectFile2, moveFile } from '../../store/appFileManagement/actions';
import { withTranslation } from "react-i18next"


const Move = (props) => {

    const dispatch = useDispatch();
    const [moveSpinner, setMoveSpinner] = useState(false)
    const [moveMsg, setMoveMsg] = useState(false)
    const [moveMsgModal, setMoveMsgModal] = useState(false)
    const [moveContentModal, setMoveContentModal] = useState("")

    const [numF, setNumF] = useState(0)
    const [numP, setNumP] = useState(0)
    const [nem, setNem] = useState("")


    const getFileSelect = useSelector(state => {
        return state.fileManagementReducer.respGetSelect;
    })

    const getFileSelect2 = useSelector(state => {
        return state.fileManagementReducer.respGetSelect2;
    })

    const moveRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgMove;
    })


    useEffect(() => {
        dispatch(getSelectFile2())
        dispatch(getSelectFile())
    }, [])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])


    const valid = useFormik({
        enableReinitialize: true,

        initialValues: {

            file_num: props.fNum,
            parent_num: numF,
        },

        validationSchema: Yup.object().shape({

            //newName: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {
            
            setMoveSpinner(true)
            dispatch(moveFile(value));
            toggleMsgModal()


        }
    });

    const getInsideFolderMove = (e, f, n) => {
  
        dispatch(getSelectFile2({ "folder_num": e }))
        setNumF(e)
        setNumP(f)
        setNem(n)

    }

    const toggleMsgModal = () => {
    
        setMoveMsgModal(!moveMsgModal);

        if (moveMsg.status === "1") {
            props.toggle();
            dispatch(getSelectFile({ "folder_num": props.idNowLoc }));
            handleEffect();
            setMoveMsg("");
            
        }
    };

    const handleEffect = () => {
     
        if (moveRespMsg.status === "1") {
            setMoveMsg(moveRespMsg);
        }
        setMoveContentModal(moveRespMsg.message);
        setMoveSpinner(false);

    };

    useEffect(() => {
       
        setMoveMsg("");
        handleEffect();
    }, [moveRespMsg]);



    const closeButton = () => {

        props.toggle();
        dispatch(getSelectFile2({
            "folder_num": 0
        }))
        

    }
    // useEffect(() => {
    //     if (moveRespMsg.status === "1") {

    //         setMoveMsg(moveRespMsg);
    //         //dispatch(getSelectFile({ 'folder_num': numF }));

    //     }
    //     setMoveContentModal(moveRespMsg.message)

    //     setMoveSpinner(false)
    // }, [getFileSelect,moveRespMsg]);

    // const callEffect = () => {
    //     useEffect(() => {
    //         if (moveRespMsg.status === "1") {

    //             setMoveMsg(moveRespMsg);
    //             //dispatch(getSelectFile({ 'folder_num': numF }));

    //         }
    //         setMoveContentModal(moveRespMsg.message)

    //         setMoveSpinner(false)
    //     }, [moveRespMsg]);
    // }


    return (

        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static">

            <MsgModal
                modal={moveMsgModal}
                toggle={toggleMsgModal}
                message={moveContentModal}

            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                valid.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Move File or Folder")}</ModalHeader>
                <ModalBody>
                    {/* <div className="mb-3 mx-3">
                            <Label>id file yang mau dipindah<span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" value={props.fNum || ""} />

                          
                        </div> 
                        <div className="mb-3 mx-3">
                            <Label>parent file yang mau dipindah <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" value={props.pNum || ""} />
                      
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>id folder yang dituju yang akan jadi parent baru <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text"  value={numF || ""} />

                        </div> */}
                    {/* <Row>
                        <div className='align-middle text-body'>
                            Current folder: {props.fName}
                        </div>
                    </Row> */}

                    {/* <hr /> */}
                    <Row>
                    <div className="align-baseline fs-6">
                                {getFileSelect2?.data?.path.map((breadcrumb, index) => (
                                    <span key={index}>
                                        {index > 0 && <i className="mdi mdi-chevron-right" />}
                                        <a onClick={() => getInsideFolderMove(breadcrumb.num, breadcrumb.parent_num, breadcrumb.name)} style={{ cursor: "pointer" }}>{breadcrumb.name}</a>
                                    </span>
                                ))}
                        </div>
                    </Row>
                    <hr />
                    <Row><h6><i className="mdi mdi-folder align-middle fs-5" /> {"  "}{props.t("Folders")}</h6></Row>
                    
                    <Row>
                        {getFileSelect2?.data?.childList.map((myfiles2, key) => (
                            myfiles2.type === "FOLDER" ?

                                myfiles2.num === props.fNum ?

                                    null :

                                    <div >

                                        {myfiles2.type === "FOLDER" ?
                                            <ul className="list-group" key={key}>
                                                <li className="list-group-item border-0 py-1 fs-6 align-baseline" onClick={() => { getInsideFolderMove(myfiles2.num, myfiles2.parent_num, myfiles2.name) }} style={{ cursor: "pointer" }}>
                                                    <i className="fa fa-solid fa-folder fs-6 align-baseline" style={{ color: "#7bae40" }}></i> {myfiles2.name}
                                                </li>
                                            </ul>

                                            :
                                            null

                                        }

                                    </div>

                                : ''

                        ))}
                    </Row>

                    {/* <Row>
                        {getFileSelect2?.data?.childList.map((myfiles, key) => (
                            myfiles.type === "FOLDER" ?

                                myfiles.num === props.fNum ?

                                    null :

                                    <Col xl={4} sm={6} key={key}>
                                        <Card className="shadow-none border ">
                                            <CardBody className="p-3" onDoubleClick={() => { getInsideFolderMove(myfiles.num, myfiles.parent_num) }} style={{ cursor: "pointer" }}>

                                                <div >

                                                    <div className="avatar-xs me-3 mb-3">
                                                        <div className="avatar-title bg-transparent rounded">
                                                            {myfiles.type === "FOLDER" ?
                                                                <i className="fa fa-solid fa-folder fs-3 align-middle" style={{ color: "#7bae40" }}></i>
                                                                :
                                                                <i className="fa fa-solid fa-file fs-3 align-middle" style={{ color: "#7bae40" }} ></i>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="overflow-hidden me-auto">
                                                            <h5 className="font-size-14 text-truncate mb-1">
                                                                <a className="text-body fs-6 align-baseline" id={`folderTooltip_${key}`}>
                                                                    {myfiles.name}
                                                                    <UncontrolledTooltip placement="bottom" target={`folderTooltip_${key}`}>
                                                                        {myfiles.name}
                                                                    </UncontrolledTooltip>
                                                                </a>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                : ''

                        ))}
                    </Row> */}

                    <p />
                    <h6><i className="mdi mdi-file align-middle fs-5" /> {"  "}{props.t("Files")}</h6>
                   

                    <Row>

                        {
                            getFileSelect2?.data?.childList.map((myfiles2, key) => (
                                myfiles2.type === "FILE" && myfiles2.num !== props.fNum ? (
                                    <div key={key} className="text-break">
                                        <ul className="list-group">
                                            <li className="list-group-item border-0 py-1 fs-6 align-baseline disabled">
                                                {myfiles2.name.endsWith("docx") || myfiles2.name.endsWith("doc") ? (
                                                    <i className="fa fa-solid fa-file-word fs-6" style={{ verticalAlign: "middle", color: "#41a5ee" }}></i>
                                                ) : myfiles2.name.endsWith("jpg") || myfiles2.name.endsWith("jpeg") || myfiles2.name.endsWith("gif") || myfiles2.name.endsWith("png") ? (
                                                    <i className="fa fa-solid fa-image fs-6 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                ) : myfiles2.name.endsWith("xls") || myfiles2.name.endsWith("xlsx") || myfiles2.name.endsWith("csv") ? (
                                                    <i className="fa fa-solid fa-file-excel fs-6" style={{ verticalAlign: "middle", color: "#32c37e" }}></i>
                                                ) : myfiles2.name.endsWith("ppt") || myfiles2.name.endsWith("pptx") ? (
                                                    <i className="fa fa-solid fa-file-powerpoint fs-6" style={{ verticalAlign: "middle", color: "#ff8f6b" }}></i>
                                                ) : myfiles2.name.endsWith("pdf") ? (
                                                    <i className="fa fa-solid fa-file-pdf fs-6" style={{ verticalAlign: "middle", color: "#b40c01" }}></i>
                                                ) : (
                                                    <i className="fa fa-solid fa-file fs-6 align-baseline" style={{ verticalAlign: "middle", color: "#b7b7b7" }}></i>
                                                )}
                                                {" "}{myfiles2.name}
                                            </li>
                                        </ul>
                                    </div>
                                ) : null
                            ))
                        }


                    </Row>

                    {/* <Row>

                        {getFileSelect2?.data?.childList.map((myfiles2, key) => (



                            myfiles2.type === "FILE" ?

                                myfiles2.num === props.fNum ?

                                    null :

                                    <Col xl={4} sm={6} key={key}>
                                        <Card className="shadow-none border">
                                            <CardBody className="p-3">
                                                <div >

                                                    <div className="avatar-xs me-3 mb-3">
                                                        <div className="avatar-title bg-transparent rounded">
                                                            {myfiles2.name.endsWith("docx") || myfiles2.name.endsWith("doc") ? (
                                                                <i className="fa fa-solid fa-file-word fs-3 " style={{ verticalAlign: "middle", color: "#41a5ee" }}></i>
                                                            ) :
                                                                myfiles2.name.endsWith("jpg") || myfiles2.name.endsWith("jpeg") || myfiles2.name.endsWith("gif") || myfiles2.name.endsWith("png") ? (
                                                                    // <img src={myfiles} key={key}
                                                                    //   style={{
                                                                    //     width: 20,
                                                                    //     height: 20,
                                                                    //     resizeMode: 'contain',
                                                                    //   }} />
                                                                    <i className="fa fa-solid fa-image fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                                )
                                                                    : myfiles2.name.endsWith("xls") || myfiles2.name.endsWith("xlsx") || myfiles2.name.endsWith("csv") ? (
                                                                        <i className="fa fa-solid fa-file-excel fs-3 " style={{ verticalAlign: "middle", color: "#32c37e" }}></i>
                                                                    )
                                                                        : myfiles2.name.endsWith("ppt") || myfiles2.name.endsWith("pptx") ? (
                                                                            <i className="fa fa-solid fa-file-powerpoint fs-3" style={{ verticalAlign: "middle", color: "#ff8f6b" }}></i>
                                                                        )
                                                                            : myfiles2.name.endsWith("pdf") ? (
                                                                                <i className="fa fa-solid fa-file-pdf fs-3" style={{ verticalAlign: "middle", color: "#b40c01" }}></i>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <i className="fa fa-solid fa-file fs-3 align-baseline" style={{ verticalAlign: "middle", color: "#b7b7b7" }}></i>
                                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="overflow-hidden me-auto">
                                                            <h5 className="font-size-14 text-truncate mb-1">
                                                                <Link to="#" className="text-body" id={`nameTooltip_${key}`}>
                                                                    &nbsp;{myfiles2.name}&nbsp;

                                                                    <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                                                        {myfiles2.name}
                                                                    </UncontrolledTooltip>
                                                                </Link>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                : ''

                        ))}


                    </Row> */}
                    {/* <hr /> */}

                    {/* <Row>
                        <div className="align-baseline fs-6">
                                {getFileSelect2?.data?.path.map((breadcrumb, index) => (
                                    <span key={index}>
                                        {index > 0 && <i className="mdi mdi-chevron-right" />}
                                        <a onClick={() => getInsideFolderMove(breadcrumb.num, breadcrumb.parent_num, breadcrumb.name)} style={{ cursor: "pointer" }}><u>{breadcrumb.name}</u></a>
                                    </span>
                                ))}
                        </div>
                    </Row> */}
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={moveSpinner ? "primary disabled" : "primary"}>
                        <i className="mdi mdi-check fs-5 align-middle me-2"></i>{" "}
                        {props.t("Move")}
                        <Spinner style={{ display: moveSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={()=>{closeButton()}} className='align-middle me-2'>
                        <i className="mdi mdi-window-close fs-5 align-middle me-2"></i>{" "}
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>

        </Modal>

    );


}

Move.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    fNum: PropTypes.any,
    pNum: PropTypes.any,
    fName: PropTypes.any,
    idNowLoc: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(Move)