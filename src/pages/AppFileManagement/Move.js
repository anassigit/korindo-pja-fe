import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner,
    Row,
    Col,
    Card,
    CardBody,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, msgMove, getSelectFile, moveFile } from '../../store/appFileManagement/actions';
import shortid from "shortid";
import { Link } from "react-router-dom"


const Move = (props) => {

    const dispatch = useDispatch();
    const [moveSpinner, setMoveSpinner] = useState(false)
    const [moveMsg, setMoveMsg] = useState(false)

    const [numF, setNumF] = useState(0)
    const [numP, setNumP] = useState(0)


    const getFileSelect = useSelector(state => {
        return state.fileManagementReducer.respGetSelect;
    })

    const moveRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgMove;
      })

      
    useEffect(() => {
        dispatch(getSelectFile())
    }, [])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])


    const valid = useFormik({
        enableReinitialize: true,

        initialValues: {
 
            file_num : props.fNum,
            parent_num: numF,           
        },

        validationSchema: Yup.object().shape({

            //newName: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {
            debugger
                setMoveSpinner(true)
                dispatch(moveFile(value));
                toggleMsgModal()
               

        }
    });

    const [moveMsgModal, setMoveMsgModal] = useState(false)
    const [moveContentModal, setMoveContentModal] = useState("")

    const toggleMsgModal = () => {
        debugger
        setMoveMsgModal(!moveMsgModal)
        if (moveMsg.status === "1") {

            props.toggle()

            setMoveMsg("")

            dispatch(getSelectFile({'folder_num': numF}))
            //dispatch(getSelectFile({'folder_num': props.idNowLoc}))
            
        } 
    }

    useEffect(() => {
        if (moveRespMsg.status === "1") {

            setMoveMsg(moveRespMsg);
            //createFileFolderValidInput.resetForm();
        }
        setMoveContentModal(moveRespMsg.message)
        setMoveSpinner(false)
    }, [moveRespMsg]);


    const getInsideFolder = (e, f) => {
        debugger

        dispatch(getSelectFile({ 'folder_num': e }))

        setNumF(e)
        setNumP(f)
    }



    return (

        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog modal-xl">

                <MsgModal
                modal={moveMsgModal}
                toggle={toggleMsgModal}
                message={moveContentModal}
                
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                valid.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>Move File or Folder</ModalHeader>
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
                <Row>
                  <div className="align-baseline fs-6">
                    <strong>
                      {getFileSelect?.data?.path.map((breadcrumb, index) => (
                        <span key={index}>
                          {index > 0 && <i className="mdi mdi-chevron-right" />}
                          <a onClick={() => getInsideFolder(breadcrumb.num, breadcrumb.parent_num)} style={{ cursor: "pointer" }}>{breadcrumb.name}</a>
                        </span>
                      ))}
                    </strong>
                  </div>
                </Row>
                    <hr />
                    <Row><h6>FOLDERS</h6></Row>
                    <p />
                    <p />
                    <Row>
                        {getFileSelect?.data?.childList.map((myfiles, key) => (
                            myfiles.type === "FOLDER" ?
                                <Col xl={4} sm={6} key={key}>
                                    <Card className="shadow-none border">
                                        <CardBody className="p-3" onDoubleClick={() => {getInsideFolder(myfiles.num, myfiles.parent_num)}} style={{ cursor: "pointer" }}>
                                        
                                            <div >

                                                <div className="avatar-xs me-3 mb-3">
                                                    <div className="avatar-title bg-transparent rounded">
                                                        {myfiles.type === "FOLDER" ?
                                                            <i className="fa fa-solid fa-folder fs-3 align-baseline text-warning"></i>
                                                            :
                                                            <i className="fa fa-solid fa-file fs-3 align-baseline text-warning"></i>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="overflow-hidden me-auto">
                                                        <h5 className="font-size-14 text-truncate mb-1">
                                                            <a className="text-body fs-6 align-baseline">
                                                                {/* {myfiles.type === "FOLDER" ?
                                        <i className="fa fa-solid fa-folder fs-3 align-baseline text-warning"></i>
                                        :
                                        <i className="bx bxs-file font-size-24 text-warning"></i>
                                      }&nbsp; */}
                                                                {myfiles.name}&nbsp;
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
                    </Row>


                    <p />
                    <h6>FILES</h6>
                    <p />
                    <Row>

                        {getFileSelect?.data?.childList.map((myfiles, key) => (



                            myfiles.type === "FILE" ?

                                <Col xl={4} sm={6} key={key}>
                                    <Card className="shadow-none border">
                                        <CardBody className="p-3">
                                            <div >

                                                <div className="avatar-xs me-3 mb-3">
                                                    <div className="avatar-title bg-transparent rounded">
                                                        {myfiles.name.endsWith("docx") || myfiles.name.endsWith("doc") ? (
                                                            <i className="fa fa-solid fa-file-word fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                        ) : myfiles.name.endsWith("jpg") || myfiles.name.endsWith("jpeg") || myfiles.name.endsWith("gif") || myfiles.name.endsWith("png") ? (
                                                            <img src={myfiles} key={key}
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    resizeMode: 'contain',
                                                                }} />
                                                        ) : myfiles.name.endsWith("xls") || myfiles.name.endsWith("xlsx") || myfiles.name.endsWith("csv") ? (
                                                            <i className="fa fa-solid fa-file-excel fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                        )
                                                            : myfiles.name.endsWith("ppt") || myfiles.name.endsWith("pptx") ? (
                                                                <i className="fa fa-solid fa-file-powerpoint fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                            )
                                                                : myfiles.name.endsWith("pdf") ? (
                                                                    <i className="fa fa-solid fa-file-pdf fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                                                )
                                                                    :
                                                                    (
                                                                        <i className="fa fa-solid fa-file fs-3 align-baseline text-warning" style={{ verticalAlign: "middle" }}></i>
                                                                    )}
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="overflow-hidden me-auto">
                                                        <h5 className="font-size-14 text-truncate mb-1">
                                                            <Link to="#" className="text-body">
                                                                {/* {myfiles.type === "FILE" ?
                                        <i className="bx bxs-file font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                        :
                                        <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                      } */}
                                                                &nbsp;{myfiles.name}&nbsp;
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


                    </Row>


                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={moveSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Move
                        <Spinner style={{ display: moveSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
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
    idNowLoc: PropTypes.any,
};
export default Move