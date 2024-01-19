import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import shortid from "shortid";
import { withTranslation } from "react-i18next"
import { uploadPlanKPI } from 'store/actions';
import { resetMessage } from 'store/appKPI/actions';

const UploadKPIPlan = (props) => {

    const dispatch = useDispatch();
    const [uploadSpinner, setUploadSpinner] = useState(false)
    const [uploadMsg, setUploadMsg] = useState(false)
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [successClose, setSuccessClose] = useState(false)

    const uploadRespMsg = useSelector(state => {
        return state.kpiReducer.msgUpload;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const uploadFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            //file_name: '',
        },

        validationSchema: Yup.object().shape({

            //file_name: Yup.string().required("Please choose and upload at least an file."),
        }),

        onSubmit: (value) => {
            var bodyForm = new FormData();

            const isParentUndefined = value.parent_num === -1 || value.parent_num === null || value.parent_num === undefined;

            value.parent_num = isParentUndefined ? 0 : value.parent_num;

            if (selectedfile.length > 0) {

                for (let index = 0; index < selectedfile.length; index++) {

                    let a = selectedfile[index];

                    bodyForm.append('file' + index, selectedfile[index].fileori);

                }
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            bodyForm.append('parent_num', value.parent_num);
            setUploadSpinner(true)
            insertUpload(bodyForm, config);
            toggleMsgModal()


        }
    });


    const insertUpload = async (value) => {

        await dispatch(uploadPlanKPI(value))

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
        uploadFileFolderValidInput.resetForm();
    }, [props.modal])

    useEffect(() => {
        if (uploadRespMsg.status === "1") {
            setSuccessClose(true)
            setUploadMsg(uploadRespMsg)
        }
        setUploadContentModal(uploadRespMsg.message)
        setUploadSpinner(false)
    }, [uploadRespMsg]);

    const refCleanser = useRef(null)

    const InputChange = (e) => {
        const allowedFileExtensions = /(xls|xlsx)$/i;
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
            alert(props.t("No valid files selected. Allowed file types: xls & xlsx"))
            refCleanser.current.value = ""
            e.target.value = ""
        }

    };


    const DeleteSelectFile = (id) => {
        if (window.confirm(props.t("Are you sure you want to delete this file?"))) {
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }
    }

    const FileUploadSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]
                })
            }
            SetSelectedFile([]);
        } else {
            alert(props.t("Please select file"))
        }
    }

    const closeButton = () => {

        props.toggle();
        SetSelectedFile([])

    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" modalOptions={{ dismissible: false }} keyboard={false}>
            <MsgModal
                modal={uploadMsgModal}
                toggle={toggleMsgModal}
                message={uploadContentModal}
                successClose={successClose}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                uploadFileFolderValidInput.handleSubmit();
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
                                        accept=".xlsx, .xls"
                                        id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" multiple />
                                </div>
                            </div>
                            &nbsp;
                            <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are xls, xlsx")}</span>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {
                                    selectedfile.map((data, index) => {
                                        const { id, filename, filetype, fileimage, datetime, filesize } = data;
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
    );


}

UploadKPIPlan.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idToggleUpload: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any,
    onSuccess: PropTypes.any
};
export default withTranslation()(UploadKPIPlan)