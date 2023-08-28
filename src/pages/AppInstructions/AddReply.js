import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveReply, saveReplys } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { withTranslation } from "react-i18next"

const AddReply = (props) => {

    const refCleanser = useRef(null)
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [addReplySpinner, setAddReplySpinner] = useState(false)

    const [addReplyMsg, setAddReplyMsg] = useState(false)

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    })

    const appRankListData = useSelector(state => {
        return state.settingReducer.respGetRankList;
    });

    const appPermissionListData = useSelector(state => {
        return state.settingReducer.respGetPermissionList;
    })

    useEffect(() => {
        dispatch(getRankListData())
        dispatch(getPermissionListData())
    }, [])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const insert3 = async (values) => {
        await dispatch(saveReply(values));

        setAddReplySpinner(true)
    };

    const initialValues = {
        content: '',
        files: [],
    };

    const validationSchemaReply = Yup.object().shape({
        content: Yup.string().required('Content is required'),
    });

    const onSubmit = (values) => {
        if (values.content !== '') {
            var bodyForm = new FormData();

            bodyForm.append('instruction_num', props.idInstruction);
            bodyForm.append('content', values.content);

            if (values.files.length > 0) {

                for (let index = 0; index < values.files.length; index++) {

                    const file = values.files[index];
                    bodyForm.append('file' + index, file);
                }
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            // setEditInstructionsSpinner(true);
            insert3(bodyForm, config)
            replyValidInput.setFieldValue('content', '')
            replyValidInput.setFieldValue('files', [])
            refCleanser.current.value = ""
        } else {
            replyValidInput.setFieldError('content', props.t('Please enter content'))
        }

    };

    const replyValidInput = useFormik({
        initialValues,
        validationSchemaReply,
        onSubmit,
    });

    useEffect(() => {
        replyValidInput.resetForm();
    }, [props.toggle]);

    /* HP Validation */
    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode;

        if (keyCode < 48 || keyCode > 57) {
            event.preventDefault();
        }
    }
    
    const [addReplyMsgModal, setAddReplyMsgModal] = useState(false)
    const [addmemberContentModal, setAddReplyContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddReplyMsgModal(!addReplyMsgModal)

        if (addReplyMsg.status === "1") {
            props.toggle()
            setAddReplyMsg('')
            dispatch()
        }
    }

    useEffect(() => {
        if (msgSaveReply.status == "1") {
            setAddReplyMsg(msgSaveReply)
            props.toggle()
        }
        setAddReplyContentModal(msgSaveReply.message);
        setAddReplySpinner(false)
    }, [msgSaveReply]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={addReplyMsgModal}
                toggle={toggleMsgModal}
                message={addmemberContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                replyValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Add New Reply")}</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <label>{props.t("Answer")}</label>
                            <Input
                                style={{
                                    minHeight: "10em",
                                }}
                                maxLength={400}
                                placeholder={props.t("Please input your answer here")}
                                name="content"
                                type="textarea"
                                onChange={(event) => {
                                    replyValidInput.handleChange(event);
                                }}
                                value={replyValidInput.values.content || ""}
                                invalid={
                                    replyValidInput.touched.content && replyValidInput.errors.content ? true : false
                                }
                            />
                            {replyValidInput.touched.content && replyValidInput.errors.content && (
                                <div className="invalid-feedback">{replyValidInput.errors.content}</div>
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
                                            replyValidInput.setFieldValue('files', event.currentTarget.files);
                                        }}
                                    />
                                </div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {replyValidInput.values.files &&
                                    Array.from(replyValidInput.values.files).map((file, index) => (
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
                                                        const newFiles = Array.from(replyValidInput.values.files);
                                                        newFiles.splice(index, 1);
                                                        replyValidInput.setFieldValue('files', newFiles);
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
                    <Button type="submit" color={addReplySpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: addReplySpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

AddReply.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idInstruction: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddReply);
