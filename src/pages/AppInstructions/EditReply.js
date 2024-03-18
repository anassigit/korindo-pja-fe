import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner, Alert, UncontrolledAlert } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { editInstructions, editReply, getSelectedReply, saveReply, saveReplys } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { format } from 'date-fns';
import { withTranslation } from "react-i18next"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EditReply = (props) => {

    const refCleanser = useRef(null)
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [editReplySpinner, setEditReplySpinner] = useState(false)
    const [preservedFiles, setPreservedFiles] = useState([]);

    const history = useHistory()

    const [editReplyMsg, setEditReplyMsg] = useState(false)

    const editReplyMessage = useSelector(state => {
        return state.instructionsReducer.msgEditReply;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const insertEdit = async (values) => {
        await dispatch(editReply(values));
        setEditReplySpinner(true)
    };

    const validationSchemaReply = Yup.object().shape({
        content: Yup.string().required('Content is required'),
    });

    const onSubmit = (values) => {

        props.setLoadingSpinner(true)
        if (values.content !== '') {
            // ----------------->> PENTING NIH <<----------------- //
            const addedFiles = preservedFiles.filter(file => (
                !props.replyData.attachFileList.some(existingFile => existingFile.num === file.num)
            ));

            const removedFiles = props.replyData.attachFileList.filter(file => (
                !preservedFiles.some(existingFile => existingFile.num === file.num)
            ));
            var bodyForm = new FormData();

            bodyForm.append('reply_num', props.replyData.num);
            bodyForm.append('content', values.content);

            if (addedFiles.length > 0) {
                addedFiles.forEach((element, index) => {
                    bodyForm.append('file' + index, element);
                });
            }

            if (removedFiles.length > 0) {
                removedFiles.forEach(element => {
                    bodyForm.append('removeFile', element.num.toString());
                })
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            // setEditInstructionsSpinner(true);
            insertEdit(bodyForm, config)
            editReplyValidInput.setFieldValue('content', '')
            editReplyValidInput.setFieldValue('files', [])
            if (refCleanser.current) {
                refCleanser.current.value = "";
            }
        } else {
            editReplyValidInput.setFieldError('content', props.t('Please enter content'))
        }

    };

    const editReplyValidInput = useFormik({
        initialValues: {
            content: '',
            files: [],
        },
        validationSchemaReply,
        onSubmit,
    });

    useEffect(() => {
        if (props.modal) {
            editReplyValidInput.setFieldValue('content', props.replyData?.content)
            editReplyValidInput.setFieldValue('files', props.replyData?.attachFileList)
            setPreservedFiles(props.replyData?.attachFileList)
        } else {
            setPreservedFiles([])
            setEditReplyMsg('')
        }
    }, [props.modal]);

    const [editReplyMsgModal, setEditReplyMsgModal] = useState(false)
    const [addmemberContentModal, setEditReplyContentModal] = useState("")

    const toggleMsgModal = () => {
        setEditReplyMsgModal(!editReplyMsgModal)
    }

    useEffect(() => {

        if (editReplyMessage.status === "1") {
            props.toggle()
            setEditReplyMsg('')
        } else if (editReplyMessage.status === "0") {
            setEditReplyMsg(editReplyMessage)
            editReplyValidInput.setFieldValue('content', props.replyData?.content)
        }
        setEditReplyContentModal(editReplyMessage.message);
        setEditReplySpinner(false)
        props.setLoadingSpinner(false)
    }, [editReplyMessage])

    const handleFileChange = (e) => {
        const allowedFileExtensions = /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i;
        if (e.target.files.length !== 0) {
            const file = e.target.files[0];
            const fileName = file.name;
            const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();

            if (!allowedFileExtensions.test(fileExtension)) {
                alert("No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv");
                if (refCleanser.current) {
                    refCleanser.current.value = "";
                }
                if (e.target) {
                    e.target.value = "";
                }
                return; // Exit function early if file extension is not allowed
            }
            const newFiles = Array.from(event.currentTarget.files)
            const existingFiles = Array.from(preservedFiles)
            const mergedFiles = [...existingFiles, ...newFiles]
            setPreservedFiles([...mergedFiles])
        }
    }

    return (
        <Modal className='modal-xl' isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal
                modal={editReplyMsgModal}
                toggle={toggleMsgModal}
                message={addmemberContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                editReplyValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Edit Reply")}</ModalHeader>
                <ModalBody>
                    {editReplyMsg ? <UncontrolledAlert color="danger">{editReplyMsg.message}</UncontrolledAlert> : null}
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <label>{props.t("Answer")}</label>
                            <Input
                                style={{
                                    width: "100%",
                                    minHeight: "26em",
                                }}
                                maxLength={4500}
                                placeholder={props.t("Please input your answer here")}
                                name="content"
                                type="textarea"
                                onChange={(event) => {
                                    editReplyValidInput.handleChange(event);
                                }}
                                value={editReplyValidInput.values.content || ""}
                                invalid={
                                    editReplyValidInput.touched.content && editReplyValidInput.errors.content ? true : false
                                }
                            />
                            {editReplyValidInput.touched.content && editReplyValidInput.errors.content && (
                                <div className="invalid-feedback">{editReplyValidInput.errors.content}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <label>{props.t("Attached Files")}</label>
                            <div className="kb-file-upload">
                                <div className="file-upload-box">
                                    <input
                                        type="file"
                                        id="fileupload3"
                                        className="form-control"
                                        ref={refCleanser}
                                        multiple
                                        accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .avi, .mov, .mp4, .mkv, .flv"
                                        onChange={(event) => {
                                            handleFileChange(event)
                                        }}
                                    />
                                </div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {preservedFiles.map((file, index) => (
                                    <div className="file-atc-box" key={index}>
                                        {/* Display file details here */}
                                        <div className="file-detail">
                                            <span>
                                                <i className="fas fa-paperclip" />
                                                &nbsp;{file.name}
                                            </span>
                                            &nbsp;&nbsp;&nbsp;
                                            <i
                                                className="mdi mdi-close"
                                                style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }}
                                                onClick={() => {
                                                    const newPreservedFiles = [...preservedFiles];
                                                    newPreservedFiles.splice(index, 1);
                                                    setPreservedFiles(newPreservedFiles);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <span style={{ fontSize: "12px", color: "blue" }}>{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv")}</span>
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={editReplySpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        {/* <Spinner style={{ display: editReplySpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

EditReply.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idInstruction: PropTypes.any,
    replyData: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
    SetFiles: PropTypes.any,
    getDetailInstructionData: PropTypes.any,
    editInstructionsMessage: PropTypes.any,
    setOnlyReply: PropTypes.any,
    onlyReply: PropTypes.any,
    editedContent: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(EditReply);
