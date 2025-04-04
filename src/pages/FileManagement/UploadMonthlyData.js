import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Spinner } from 'reactstrap'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import MsgModal from 'components/Common/MsgModal'
import { resetMessage, uploadFile, getMonthlyData } from '../../store/FileManagement/actions'
import shortid from "shortid"
import { withTranslation } from "react-i18next"

const UploadMonthlyData = (props) => {

    const dispatch = useDispatch()
    const [uploadSpinner, setUploadSpinner] = useState(false)
    const [selectedfile, setSelectedFile] = useState([])
    const [successClose, setSuccessClose] = useState(false)

    const uploadMonthlyRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgUpload
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const insertUpload = async (value) => {
        await dispatch(uploadFile(value))
    }

    const [uploadMsgModal, setUploadMsgModal] = useState(false)
    const [uploadContentModal, setUploadContentModal] = useState("")

    const toggleMsgModal = () => {
        setUploadMsgModal(!uploadMsgModal)
        if (uploadMsgModal.status === "1") {
            setUploadMsgModal("")
            setSelectedFile([])
            props.toggle()
            setUploadSpinner(false)
            if (props.dateState instanceof Date) {
                const tempDate = `${props.dateState.getFullYear()}-${(props.dateState.getMonth() + 1).toString().padStart(2, '0')}`
                const formattedDate = tempDate.replace(/-/g, '')
                dispatch(getMonthlyData({ date: formattedDate }))
            } else {
                const formattedDate = props.dateState.replace(/-/g, '')
                dispatch(getMonthlyData({ date: formattedDate }))
            }
        }
    }

    useEffect(() => {
        if (uploadMonthlyRespMsg.status === "1") {
            setUploadSpinner(false)
            setSuccessClose(true)
            setUploadMsgModal(uploadMonthlyRespMsg)
        }
        setUploadContentModal(uploadMonthlyRespMsg.message)
        setUploadSpinner(false)
    }, [uploadMonthlyRespMsg])

    const refCleanser = useRef(null)

    const inputChange = (e) => {
        const allowedFileExtensions = /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
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
                        setSelectedFile((prevValue) => [...prevValue, ...processedFiles])
                    }
                }
                reader.readAsDataURL(file)
            })
        } else if (e.target.files.length != 0) {
            alert("No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")
            if (refCleanser.current) {
                refCleanser.current.value = ""
            }
            e.target.value = ""
        }
    }

    const deleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfile.filter((data) => data.id !== id)
            setSelectedFile(result)
        }
        if (refCleanser.current) {
            refCleanser.current.value = ""
        }
    }

    const closeButton = () => {
        props.toggle()
        setSelectedFile([])
    }

    const uploadFileFolderValidInput = useFormik({
        enableReinitialize: true,
        initialValues: {
            parent_num: props.idFolderUpload,
        },
        onSubmit: (value) => {
            var bodyForm = new FormData()
            const isParentUndefined = value.parent_num === -1 || value.parent_num === null || value.parent_num === undefined
            value.parent_num = isParentUndefined ? 0 : value.parent_num
            if (selectedfile.length > 0) {
                for (let index = 0; index < selectedfile.length; index++) {
                    bodyForm.append('file' + index, selectedfile[index].fileori)
                }
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            bodyForm.append('parent_num', value.parent_num)
            setUploadSpinner(true)
            insertUpload(bodyForm, config)
            toggleMsgModal()
        }
    })

    useEffect(() => {
        uploadFileFolderValidInput.resetForm()
    }, [props.toggle])

    const FileUploadSubmit = async (e) => {
        e.preventDefault()
        e.target.reset()
        if (selectedfile.length > 0) {
            setSelectedFile([])
        } else {
            alert('Please select file')
        }
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" modalOptions={{ dismissible: false }}>
            <MsgModal
                modal={uploadMsgModal}
                toggle={toggleMsgModal}
                message={uploadContentModal}
                successClose={successClose}
            />
            <Form onSubmit={(e) => {
                e.preventDefault()
                uploadFileFolderValidInput.handleSubmit()
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Upload New File")}</ModalHeader>
                <ModalBody>
                    <div className="mb-3">
                        <label>{props.t("Choose files")} </label>
                        <Form onSubmit={FileUploadSubmit}>
                            <div className="kb-file-upload">
                                <div className="file-upload-box">
                                    <input
                                        type="file"
                                        accept=".docx, .doc, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .jpg, .jpeg, .png, .gif, .svg, .avi, .mov, .mp4, .mkv, .flv"
                                        id="fileupload2" className="form-control" onChange={inputChange} name="removeFile" multiple />
                                </div>
                            </div>
                            &nbsp;
                            <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv")}</span>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {
                                    selectedfile.map((data) => {
                                        const { id, filename } = data
                                        return (
                                            <div className="file-atc-box" key={id}>
                                                <div className="file-detail text-wrap">
                                                    <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => deleteSelectFile(id)} />
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
                    <Button type="submit" color={uploadSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Add")}
                        <Spinner style={{ display: uploadSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={() => { closeButton() }}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

UploadMonthlyData.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idFolderUpload: PropTypes.any,
    dateState: PropTypes.any,
    setUploadSpinner: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(UploadMonthlyData)