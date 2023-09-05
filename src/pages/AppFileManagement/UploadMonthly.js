import React, { useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, msgUpload, uploadFile, getSelectFile, getMonthlyData } from '../../store/appFileManagement/actions';
import shortid from "shortid";
import { withTranslation } from "react-i18next"

const UploadMonthly = (props) => {

    const dispatch = useDispatch();
    const [uploadMonthlySpinner, setUploadMonthlySpinner] = useState(false)
    const [uploadMonthlyMsg, setUploadMonthlyMsg] = useState(false)
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [successClose, setSuccessClose] = useState(false)

    const uploadMonthlyRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgUpload;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const uploadFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            parent_num: props.idFolderUpload,
        },

        validationSchema: Yup.object().shape({

        }),

        onSubmit: (value) => {
    debugger
            var bodyForm = new FormData();
            
            const isParentUndefined = value.parent_num === -1 || value.parent_num === null || value.parent_num === undefined;

            value.parent_num = isParentUndefined ? 0 : value.parent_num;
            
                debugger
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
            setUploadMonthlySpinner(true)
            insertUpload(bodyForm, config);
            toggleMsgModal()
            
        
        }
    });

    
    const insertUpload = async (value) => {
        debugger
        
        await dispatch(uploadFile(value));
        // toggleMsgModal()
        
    };


    useEffect(() => {

        uploadFileFolderValidInput.resetForm();
    }, [props.toggle])

    const [uploadMsgModal, setUploadMsgModal] = useState(false)
    const [uploadContentModal, setUploadContentModal] = useState("")

    const toggleMsgModal = () => {
        debugger
        setUploadMsgModal(!uploadMsgModal)
        if (uploadMsgModal.status === "1") {

            props.toggle()

            setUploadMsgModal("")

            SetSelectedFile([])

            // dispatch(getSelectFile({'folder_num': props.idNowLoc}))
            dispatch(getMonthlyData({ month: props.currMonth, year: props.currYear }))

        }
    }

    useEffect(() => {
        if (uploadMonthlyRespMsg.status === "1") {

       debugger
        setSuccessClose(true)
            setUploadMsgModal(uploadMonthlyRespMsg);
            

        }
        setUploadContentModal(uploadMonthlyRespMsg.message)
        setUploadMonthlySpinner(false)
    }, [uploadMonthlyRespMsg]);

    const refCleanser = useRef(null)

    const InputChange = (e) => {
        const allowedFileExtensions = /(pdf)$/i
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
                        // All files have been processed
                        SetSelectedFile((prevValue) => [...prevValue, ...processedFiles])
                    }
                }

                reader.readAsDataURL(file)
            })
        } else if (e.target.files.length != 0) {
            alert("Allowed File Types is pdf")
            refCleanser.current.value = ""
            e.target.value = ""
        }

    };


    const DeleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
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
            alert('Please select file')
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
            //data={idFile}
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
                                        accept=".pdf"
                                        id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" multiple />
                                    </div>
                                </div>
                                &nbsp;
                                <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types is pdf")}</span>
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
                    <Button type="submit" color={uploadMonthlySpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Add")}
                        <Spinner style={{ display: uploadMonthlySpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger"  onClick={()=>{closeButton()}}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );


}

UploadMonthly.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idFolderUpload: PropTypes.any,
    currMonth: PropTypes.any,
    currYear: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(UploadMonthly)