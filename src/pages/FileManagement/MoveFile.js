import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Spinner,
    Row
} from 'reactstrap'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import MsgModal from 'components/Common/MsgModal'
import { resetMessage, getSelectFile, getSelectFile2, moveFile } from '../../store/FileManagement/actions'
import { withTranslation } from "react-i18next"

const MoveFile = (props) => {

    const dispatch = useDispatch()
    const [moveSpinner, setMoveSpinner] = useState(false)
    const [moveMsg, setMoveMsg] = useState(false)
    const [moveMsgModal, setMoveMsgModal] = useState(false)
    const [moveContentModal, setMoveContentModal] = useState("")
    const [successClose, setSuccessClose] = useState(false)
    const [numF, setNumF] = useState("")

    const selectFileData = useSelector(state => {
        return state.fileManagementReducer.respGetSelect2
    })

    const moveRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgMove
    })

    useEffect(() => {
        dispatch(getSelectFile2({
            "folder_num": props.pNum
        }))
    }, [props.pNum])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const getInsideFolderMove = (e) => {
        dispatch(getSelectFile2({ "folder_num": e }))
        setNumF(e)
    }

    const moveFileFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            file_num: props.fNum,
            parent_num: numF,
        },
        onSubmit: (value) => {
            var newParent = props.pNum
            if (numF === null || numF === undefined || numF === "") {
                value.parent_num = newParent

                setMoveSpinner(true)
                dispatch(moveFile(value))
                toggleMsgModal()
            } else {
                value.parent_num = numF
                setMoveSpinner(true)
                dispatch(moveFile(value))
                toggleMsgModal()
            }
        }
    })

    const toggleMsgModal = () => {
        setMoveMsgModal(!moveMsgModal)
        if (moveMsg.status === "1") {
            props.toggle()
            dispatch(getSelectFile({ folder_num: props.idNowLoc }))
            dispatch(getSelectFile2({ folder_num: "" }))
        } else if (moveMsg.status === "0") {
            props.toggle()
            dispatch(getSelectFile({ folder_num: props.idNowLoc }))
            dispatch(getSelectFile2({ folder_num: "" }))
        }
        handleEffect()
        setMoveMsg("")
    }

    const handleEffect = () => {
        if (moveRespMsg.status === "1") {
            setSuccessClose(true)
            setMoveMsg(moveRespMsg)
            setMoveContentModal(moveRespMsg.message)
            setMoveSpinner(false)
        } else {
            setSuccessClose(false)
            setMoveMsg(moveRespMsg)
            setMoveContentModal(moveRespMsg.message)
            setMoveSpinner(false)
        }
    }

    useEffect(() => {
        setMoveMsg("")
        handleEffect()
    }, [moveRespMsg])

    const closeButton = () => {
        props.toggle()
        dispatch(getSelectFile2({ "folder_num": "" }))
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static">
            <MsgModal
                modal={moveMsgModal}
                toggle={toggleMsgModal}
                message={moveContentModal}
                successClose={successClose}
            />
            <Form onSubmit={(e) => {
                e.preventDefault()
                moveFileFormik.handleSubmit()
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Move File or Folder")}</ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="align-baseline fs-6">
                            {selectFileData?.data?.path.map((breadcrumb, index) => (
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
                        {selectFileData?.data?.childList.map((myfiles2, key) => (
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
                    <p />
                    <h6><i className="mdi mdi-file align-middle fs-5" /> {"  "}{props.t("Files")}</h6>
                    <Row>
                        {
                            selectFileData?.data?.childList.map((myfiles2, key) => (
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
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={moveSpinner ? "primary disabled" : "primary"}>
                        <i className="mdi mdi-check fs-5 align-middle me-2"></i>{" "}
                        {props.t("Move")}
                        <Spinner style={{ display: moveSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={() => { closeButton() }} className='align-middle me-2'>
                        <i className="mdi mdi-window-close fs-5 align-middle me-2"></i>{" "}
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

MoveFile.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    fNum: PropTypes.any,
    pNum: PropTypes.any,
    fName: PropTypes.any,
    idNowLoc: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(MoveFile)