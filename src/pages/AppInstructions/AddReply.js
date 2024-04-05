import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner, UncontrolledAlert, FormFeedback } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { editInstructions, getDetailInstruction, saveReply, saveReplys } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { format } from 'date-fns';
import { withTranslation } from "react-i18next"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactSession } from 'react-client-session';

const AddReply = (props) => {

    const refCleanser = useRef(null)
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [addReplySpinner, setAddReplySpinner] = useState(false)
    const [preservedFiles, setPreservedFiles] = useState([]);


    const history = useHistory()

    const [addReplyMsg, setAddReplyMsg] = useState(false)

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    })


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const insert3 = async (values) => {
        await dispatch(saveReply(values));

        setAddReplySpinner(true)
    };

    const initialValues = {
        status: '',
        content: '',
        files: [],
    };

    const validationSchemaReply = Yup.object().shape({
        content: Yup.string().required('Content is required'),
    });

    const onSubmit = (values) => {

        props.setLoadingSpinner(true)
        if (values.content !== '') {
            var bodyForm = new FormData();

            bodyForm.append('instruction_num', props.idInstruction);
            bodyForm.append('content', values.content);

            // if (values.files.length > 0) {

            //     for (let index = 0; index < values.files.length; index++) {

            //         const file = values.files[index];
            //         bodyForm.append('file' + index, file);
            //     }
            // }

            if (values.files.length > 0 || preservedFiles.length > 0) {
                for (let index = 0; index < values.files.length; index++) {
                    const file = values.files[index];
                    bodyForm.append('file' + index, file);
                }

                for (let index = 0; index < preservedFiles.length; index++) {
                    const file = preservedFiles[index];
                    bodyForm.append('file' + (index + values.files.length), file);
                }
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            insert3(bodyForm, config)

            const currentStatus = props.getDetailInstructionData?.data?.instruction?.status;
            const prevStatus = props.statusData?.data?.statusList.find(value => value.name === currentStatus);
            const selectedStatus = props.statusData?.data?.statusList.find(value => value.name === values.status);
            const selectedStatusWhenValuesBlank = props.statusData?.data?.statusList.find(value => value.name === props.statusInstruction);

            if (selectedStatus && selectedStatus.no !== prevStatus?.no) {
                const bodyForm2 = new FormData();

                bodyForm2.append('num', props.idInstruction);
                bodyForm2.append('status', selectedStatus.no);

                insert(bodyForm2, config);
            } else if (prevStatus?.no !== selectedStatusWhenValuesBlank?.no) {
                const bodyForm2 = new FormData();

                bodyForm2.append('num', props.idInstruction);
                bodyForm2.append('status', selectedStatusWhenValuesBlank.no);

                insert(bodyForm2, config);
            }
            if (refCleanser.current) {
                refCleanser.current.value = "";
            }
        } else {
            replyValidInput.setFieldError('content', props.t('Please enter content'));
        }

        props.setLoadingSpinner(false);
    };

    const replyValidInput = useFormik({
        initialValues,
        validationSchemaReply,
        onSubmit,
    });

    useEffect(() => {
        if (!props.modal) {

            setAddReplyMsg('')
            setPreservedFiles([])
            replyValidInput.setFieldValue('content', '')
        }
    }, [props.toggle]);


    const [addReplyMsgModal, setAddReplyMsgModal] = useState(false)
    const [addmemberContentModal, setAddReplyContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddReplyMsgModal(!addReplyMsgModal)
    }

    useEffect(() => {

        if (msgSaveReply.status == "1") {

            const queryParameters = new URLSearchParams(window.location.search)
            const queryNum = queryParameters.get("num")

            let num = queryNum?.toString()
            dispatch(getDetailInstruction({
                search: {
                    "num": num,
                    "langType": langType
                }
            }))
            props.toggle()
            replyValidInput.resetForm();
            if (props.getDetailInstructionData?.data?.instruction?.comment && props.onlyReply === false) {
                var bodyForm = new FormData();

                bodyForm.append('num', props.idInstruction);
                bodyForm.append('title', props.titleInstruction);

                bodyForm.append('insDate', format(props.dateInstruction, "yyyy-MM-dd"));
                bodyForm.append('description', props.descriptionInstruction);


                //remove/add - Owner & Manager//

                const uniqueAddUser = new Set(props.addUser);
                const uniqueRemoveUser = new Set(props.removeUser);

                const filteredAddUser = Array.from(uniqueAddUser).filter(user => !uniqueRemoveUser.has(user));
                const filteredRemoveUser = Array.from(uniqueRemoveUser).filter(user => !uniqueAddUser.has(user));

                filteredAddUser.forEach(user => {
                    bodyForm.append('addUser', user);
                });

                filteredRemoveUser.forEach(user => {
                    bodyForm.append('removeUser', user);
                });

                //end//

                //status//

                let statusId = null
                statusId = props.statusData?.data?.statusList.map((item, index) => {
                    if (item.name == props.statusInstruction) {
                        bodyForm.append('status', item.no)
                    }
                })

                //end status//

                //attach files//

                if (props.selectedfile.length > 0) {

                    var getFileNm = selectedfile[0].filename;

                    getFileNm = getFileNm.substring(getFileNm.lastIndexOf('.') + 1);
                    
                    if (getFileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i)) {


                        for (let index = 0; index < props.selectedfile?.length; index++) {
                            let a = selectedfile[index];

                            bodyForm.append('file' + index, selectedfile[index].fileori);

                            console.log(a);
                            SetSelectedFile([]);
                            SetFiles([...Files, a]);

                        }


                    } else {

                        alert("Files type are not allowed to upload or not supported.");
                    }
                }

                if (props.removeFile.length > 0) {
                    props.removeFile.forEach(files => {
                        bodyForm.append('removeFile', files);
                    });
                }

                //end//

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                props.setUpdateNoReply(true)
                insert(bodyForm, config)
                ReactSession.set('appEditInstructionsMsg', props.appEditInstructionsMsg)
            }
        } else {
            setAddReplyMsg(msgSaveReply);
        }
        setAddReplyContentModal(msgSaveReply.message);
        setAddReplySpinner(false)
        props.setLoadingSpinner(false)
    }, [msgSaveReply])

    const insert = async (values) => {

        await dispatch(editInstructions(values))
        props.setLoadingSpinner(true)

    };

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
            const newFiles = Array.from(e.currentTarget.files);
            setPreservedFiles([...preservedFiles, ...newFiles]);
        }
    }

    return (
        <Modal className='modal-xl' isOpen={props.modal} toggle={props.toggle} backdrop="static">

            <div className="spinner-wrapper" style={{ display: addReplySpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
            </div>

            <Form onSubmit={(e) => {
                e.preventDefault();
                replyValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Add New Reply")}</ModalHeader>
                <ModalBody>
                    {addReplyMsg != '' ? <UncontrolledAlert color="danger">{addReplyMsg.message}</UncontrolledAlert> : null}
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3" hidden={props.getDetailInstructionData?.data?.instruction?.comment && props.onlyReply === true}>
                            <Label>
                                {props.t("Status")} <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                disabled={props.getDetailInstructionData?.data?.instruction?.edit !== "STATUS" && props.getDetailInstructionData?.data?.instruction?.edit !== "ALL"}
                                name="status"
                                type="select"
                                onChange={(e) => {
                                    replyValidInput.handleChange(e)
                                    props.handleChange(e)
                                }}
                                value={props.statusInstruction}
                                invalid={replyValidInput.touched.status && replyValidInput.errors.status}
                            >
                                {props.statusData?.data?.statusList.map((value, key) => {
                                    if (value.use) {
                                        return (
                                            <option key={key} value={value.name}>
                                                {value.name}
                                            </option>
                                        );
                                    }
                                    return (
                                        <option style={{ backgroundColor: "#DDDDDD" }} disabled key={key} value={value.name}>
                                            {value.name}
                                        </option>
                                    )
                                })}
                            </Input>
                            {replyValidInput.touched.status && replyValidInput.errors.status ? (
                                <FormFeedback type="invalid">{replyValidInput.errors.status}</FormFeedback>
                            ) : null}
                        </div>

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
                                id="cntnt"
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
                                        accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .avi, .mov, .mp4, .mkv, .flv"
                                        // onChange={(event) => {
                                        //     replyValidInput.setFieldValue('files', event.currentTarget.files);
                                        // }}
                                        onChange={(event) => { handleFileChange(event) }}
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
                    <Button type="submit" color={addReplySpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Add")}
                        {/* <Spinner style={{ display: addReplySpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                    </Button>
                    <Button color="danger" onClick={() => {
                        props.setUpdateNoReply(true)
                        props.toggle()
                    }}
                    >
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
    titleInstruction: PropTypes.any,
    dateInstruction: PropTypes.any,
    statusInstruction: PropTypes.any,
    descriptionInstruction: PropTypes.any,
    addUser: PropTypes.any,
    removeUser: PropTypes.any,
    removeFile: PropTypes.any,
    statusData: PropTypes.any,
    Files: PropTypes.any,
    selectedfile: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
    SetFiles: PropTypes.any,
    getDetailInstructionData: PropTypes.any,
    editInstructionsMessage: PropTypes.any,
    appEditInstructionsMsg: PropTypes.any,
    setOnlyReply: PropTypes.any,
    onlyReply: PropTypes.any,
    handleChange: PropTypes.any,
    setAppInstructionsData: PropTypes.any,
    setUpdateNoReply: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddReply);
