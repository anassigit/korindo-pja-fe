import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveReplys } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getReplysData, getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { withTranslation } from "react-i18next"

const AddReply = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [addReplySpinner, setAddReplySpinner] = useState(false)

    const [addReplyMsg, setAddReplyMsg] = useState(false)

    const addReplyMessage = useSelector(state => {
        return state.settingReducer.msgAdd;
    });

    const appRankListData = useSelector(state => {
        return state.settingReducer.respGetRankList;
    });

    const appPermissionListData = useSelector(state => {
        return state.settingReducer.respGetPermissionList;
    });

    useEffect(() => {
        dispatch(getRankListData())
        dispatch(getPermissionListData())
    }, [])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const addReplyValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: '',
            rank: '',
            hp: '',
            permission: '',
            pw: '',
            name: '',
            bgColor: '',
        },

        validationSchema: Yup.object().shape({
            id: Yup.string()
                .email("Email must be a valid email address")
                .required("Email is required"),
            name: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {

            setAddReplySpinner(true)
            dispatch(saveReplys(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addReplyValidInput.resetForm();
    }, [props.toggle]);

    /* HP Validation */
    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode;

        if (keyCode < 48 || keyCode > 57) {
            event.preventDefault();
        }
    }

    /******* rank *******/

    const rankOptionsEng = (appRankListData?.data?.rankList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const rankOptionsIdr = (appRankListData?.data?.rankList || []).map(({ num, name_idr }) => ({
        value: num,
        label: name_idr,
    }))

    const rankOptionsKor = (appRankListData?.data?.rankList || []).map(({ num, name_kor }) => ({
        value: num,
        label: name_kor,
    }))

    /******* Permission *******/

    const permissionOptionsEng = (appPermissionListData?.data?.permissionList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const permissionOptionsIdr = (appPermissionListData?.data?.permissionList || []).map(({ num, name_idr }) => ({
        value: num,
        label: name_idr,
    }))

    const permissionOptionsKor = (appPermissionListData?.data?.permissionList || []).map(({ num, name_kor }) => ({
        value: num,
        label: name_kor,
    }))

    const [addReplyMsgModal, setAddReplyMsgModal] = useState(false)
    const [addmemberContentModal, setAddReplyContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddReplyMsgModal(!addReplyMsgModal)

        if (addReplyMsg.status === "1") {
            props.toggle()
            setAddReplyMsg('')
            dispatch(getReplysData(props.appReplysTabelSearch))
        }
    }

    useEffect(() => {
        if (addReplyMessage.status == "1") {

            setAddReplyMsg(addReplyMessage)
        }
        setAddReplyContentModal(addReplyMessage.message);
        setAddReplySpinner(false)
    }, [addReplyMessage]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={addReplyMsgModal}
                toggle={toggleMsgModal}
                message={addmemberContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                addReplyValidInput.handleSubmit();
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
                                    addReplyValidInput.handleChange(event);
                                }}
                                value={addReplyValidInput.values.content || ""}
                                invalid={
                                    addReplyValidInput.touched.content && addReplyValidInput.errors.content ? true : false
                                }
                            />
                            {addReplyValidInput.touched.content && addReplyValidInput.errors.content && (
                                <div className="invalid-feedback">{addReplyValidInput.errors.content}</div>
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
                                            addReplyValidInput.setFieldValue('files', event.currentTarget.files);
                                        }}
                                    />
                                </div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="kb-attach-box mb-3">
                                {addReplyValidInput.values.files &&
                                    Array.from(addReplyValidInput.values.files).map((file, index) => (
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
                                                        const newFiles = Array.from(addReplyValidInput.values.files);
                                                        newFiles.splice(index, 1);
                                                        addReplyValidInput.setFieldValue('files', newFiles);
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
    appReplysTabelSearch: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddReply);
