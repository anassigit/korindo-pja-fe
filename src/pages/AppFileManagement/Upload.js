import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, msgUpload, uploadFile, getSelectFile } from '../../store/appFileManagement/actions';
import shortid from "shortid";
import { withTranslation } from "react-i18next"

const Upload = (props) => {

    const dispatch = useDispatch();
    const [uploadSpinner, setUploadSpinner] = useState(false)
    const [uploadMsg, setUploadMsg] = useState(false)
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [successClose, setSuccessClose] = useState(false)

    const uploadRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgUpload;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const uploadFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            parent_num: props.idToggleUpload,
            //file_name: '',
        },

        validationSchema: Yup.object().shape({

            //file_name: Yup.string().required("Please choose and upload at least an file."),
        }),

        onSubmit: (value) => {
    //debugger
            var bodyForm = new FormData();
            
            const isParentUndefined = value.parent_num === -1 || value.parent_num === null || value.parent_num === undefined;

            value.parent_num = isParentUndefined ? 0 : value.parent_num;
            
                //debugger
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
        //debugger
        
        await dispatch(uploadFile(value));
        // toggleMsgModal()
        
    };


    useEffect(() => {

        uploadFileFolderValidInput.resetForm();
    }, [props.toggle])

    const [uploadMsgModal, setUploadMsgModal] = useState(false)
    const [uploadContentModal, setUploadContentModal] = useState("")

    const toggleMsgModal = () => {
        // debugger
        setUploadMsgModal(!uploadMsgModal)
        if (uploadMsg.status === "1") {

            props.toggle()

            setUploadMsg("")

            SetSelectedFile([])

            dispatch(getSelectFile({'folder_num': props.idNowLoc}))

        }
    }

    useEffect(() => {
        if (uploadRespMsg.status === "1") {

        // 
        setSuccessClose(true)
            setUploadMsg(uploadRespMsg);

        }
        setUploadContentModal(uploadRespMsg.message)
        setUploadSpinner(false)
    }, [uploadRespMsg]);

    const InputChange = (e) => {
        // debugger

        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];

            let fileNm = e.target.files[i].name;
            fileNm = fileNm.substring(fileNm.lastIndexOf('.') + 1);

            if (fileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i)) {
                reader.onloadend = () => {
                    SetSelectedFile((preValue) => {
                        return [
                            ...preValue,
                            {
                                id: shortid.generate(),
                                filename: e.target.files[i].name,
                                filetype: e.target.files[i].type,
                                fileimage: reader.result,
                                fileori: file
                            }
                        ]
                    });
                }
                if (e.target.files[i]) {
                    reader.readAsDataURL(file);
                }
            } else {
                alert("Files type are not allowed to upload or not supported.");
            }
        }

    }


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


    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
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
                                        <input type="file" id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" multiple />
                                    </div>
                                </div>
                                &nbsp;
                                <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")}</span>
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
                        {props.t("Save")}
                        <Spinner style={{ display: uploadSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );


}

Upload.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idToggleUpload: PropTypes.any,
    idNowLoc: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(Upload)