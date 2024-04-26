import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import MsgModal from 'components/Common/MsgModal'
import shortid from "shortid"
import { withTranslation } from "react-i18next"
import { resetMessage } from 'store/appKPI/actions'

const UploadKPI = (props) => {

    const dispatch = useDispatch()
    const [uploadSpinner, setUploadSpinner] = useState(false)
    const [uploadMsg, setUploadMsg] = useState(false)
    const [selectedfile, SetSelectedFile] = useState([])
    const [successClose, setSuccessClose] = useState(false)

    const uploadRespMsg = useSelector(state => {
        return state.kpiReducer.msgUpload
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const insertUpload = async (value) => {
        await dispatch(props.apiCall(value))
    }

    const [uploadMsgModal, setUploadMsgModal] = useState(false)
    const [uploadContentModal, setUploadContentModal] = useState("")

    const toggleMsgModal = () => {
        setUploadMsgModal(!uploadMsgModal)
        if (uploadMsg.status === "1") {
            setUploadMsg("")
            SetSelectedFile([])
            props.toggle()
            props.onSuccess()
        }
    }

    useEffect(() => {
        if (uploadRespMsg.status === "1") {
            setSuccessClose(true)
            setUploadMsg(uploadRespMsg)
        }
        setUploadContentModal(uploadRespMsg.message)
        setUploadSpinner(false)
    }, [uploadRespMsg])

    const refCleanser = useRef(null)

    const InputChange = (e) => {
        const allowedFileExtensions = /(xls|xlsx)$/i
        const selectedFiles = Array.from(e.target.files)
        const validFiles = selectedFiles.filter((file) => allowedFileExtensions.test(file.name))
        const invalidFiles = selectedFiles.filter((file) => !allowedFileExtensions.test(file.name))
        if (invalidFiles.length === 0 && validFiles.length > 0) {
            const processedFiles = []
            validFiles.forEach((file) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    processedFiles.push({
                        id: shortid.generate(),
                        filename: file.name,
                        filetype: file.type,
                        fileimage: reader.result,
                        fileori: file,
                    })
                    if (processedFiles.length === validFiles.length) {
                        SetSelectedFile((prevValue) => [...prevValue, ...processedFiles])
                    }
                }
                reader.readAsDataURL(file)
            })
        } else if (e.target.files.length != 0) {
            alert("No valid files selected. Allowed file types: xls & xlsx")
            if (refCleanser.current) {
                refCleanser.current.value = ""
            }
            e.target.value = ""
        }
    }


    const DeleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfile.filter((data) => data.id !== id)
            SetSelectedFile(result)
        }
        if (refCleanser.current) {
            refCleanser.current.value = ""
        }
    }

    const closeButton = () => {
        props.toggle()
        SetSelectedFile([])
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" modalOptions={{ dismissible: false }}>
            <MsgModal
                modal={uploadMsgModal}
                toggle={toggleMsgModal}
                message={uploadContentModal}
                successClose={successClose}
            />
            <ModalHeader toggle={props.toggle}>{props.t("Upload New File")}</ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label>{props.t("Choose File")}</label>
                    <Form>
                        <div className="kb-file-upload">
                            <div className="file-upload-box">
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    ref={refCleanser}
                                    id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" />
                            </div>
                        </div>
                        &nbsp;
                        <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are xls, xlsx")}</span>
                        &nbsp;&nbsp;&nbsp;
                        <div className="kb-attach-box mb-3">
                            {
                                selectedfile?.map((data, index) => {
                                    const { id, filename, filetype, fileimage, datetime, filesize } = data
                                    return (
                                        <div className="file-atc-box" key={id}>
                                            <div className="file-detail text-wrap">
                                                <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                &nbsp;&nbsp;&nbsp;

                                                <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteSelectFile(id)} />

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Form>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => {
                    var bodyForm = new FormData()
                    if (selectedfile.length > 0) {
                        bodyForm.append('file', selectedfile[0].fileori)
                    }
                    setUploadSpinner(true)
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }
                    insertUpload(bodyForm, config)
                    toggleMsgModal()
                }} color={uploadSpinner ? "primary disabled" : "primary"}>
                    <i className="bx bxs-save align-middle me-2"></i>{" "}
                    {props.t("Add")}
                    <Spinner style={{ display: uploadSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                </Button>
                <Button color="danger" onClick={() => { closeButton() }}>
                    {props.t("Close")}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

UploadKPI.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idToggleUpload: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any,
    onSuccess: PropTypes.any,
    apiCall: PropTypes.any
}
export default withTranslation()(UploadKPI)