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
            const addedFiles = values.files.filter(file => (
                !props.replyData.attachFileList.some(existingFile => existingFile.num === file.num)
            ));

            const removedFiles = props.replyData.attachFileList.filter(file => (
                !values.files.some(existingFile => existingFile.num === file.num)
            ));
            debugger
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
            refCleanser.current.value = ""
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
        } else {
            setEditReplyMsg('')
        }
    }, [props.toggle]);

    const [editReplyMsgModal, setEditReplyMsgModal] = useState(false)
    const [addmemberContentModal, setEditReplyContentModal] = useState("")

    const toggleMsgModal = () => {
        setEditReplyMsgModal(!editReplyMsgModal)
    }

    useEffect(() => {

        if (editReplyMessage.status === "1") {
            debugger
            props.toggle()
            setEditReplyMsg('')
        } else {
            setEditReplyMsg(editReplyMessage)
        }
        setEditReplyContentModal(editReplyMessage.message);
        setEditReplySpinner(false)
        props.setLoadingSpinner(false)
    }, [editReplyMessage])

    return (
        <Modal className='modal-xl' isOpen={props.modal} toggle={props.toggle}>
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
                                maxLength={400}
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
                                        accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt"
                                        onChange={(event) => {
                                            const newFiles = Array.from(event.currentTarget.files);
                                            const existingFiles = Array.from(editReplyValidInput.values.files);
                                            const mergedFiles = [...existingFiles, ...newFiles];
                                            editReplyValidInput.setFieldValue('files', mergedFiles);
                                        }}
                                    />
                                </div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {editReplyValidInput.values.files &&
                                    Array.from(editReplyValidInput.values.files).map((file, index) => (
                                        <div className="file-atc-box" key={index}>
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
                                                        const newFiles = Array.from(editReplyValidInput.values.files);
                                                        newFiles.splice(index, 1);
                                                        editReplyValidInput.setFieldValue('files', newFiles);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                <span style={{ fontSize: "12px", color: "blue" }}>{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")}</span>
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={editReplySpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: editReplySpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
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
