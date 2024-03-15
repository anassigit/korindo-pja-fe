import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, createFolder, msgCreate, getSelectFile } from '../../store/appFileManagement/actions';
import { withTranslation } from "react-i18next"

const Create = (props) => {

    const dispatch = useDispatch();
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const [createSpinner, setCreateSpinner] = useState(false)
    const [createMsg, setCreateMsg] = useState(false)
    const [successClose, setSuccessClose] = useState(false)


    const createRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgCreate;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const createFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            parent_num: props.idToggleCreate,
            folder_name: '',
        },

        validationSchema: Yup.object().shape({

            folder_name: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {
            if (value.parent_num === -1 || value.parent_num === null || value.parent_num === undefined) {

                value.parent_num = 0;

                setCreateSpinner(true)
                dispatch(createFolder(value));
                toggleMsgModal()

            } else {
                setCreateSpinner(true)
                dispatch(createFolder(value));
                toggleMsgModal()

            }
        }
    });

    useEffect(() => {

        createFileFolderValidInput.resetForm();
    }, [props.toggle])

    const [createMsgModal, setCreateMsgModal] = useState(false)
    const [createContentModal, setCreateContentModal] = useState("")

    const toggleMsgModal = () => {
        setCreateMsgModal(!createMsgModal)
        if (createMsg.status === "1") {
            props.toggle()
            setCreateMsg("")

            dispatch(getSelectFile({ 'folder_num': props.idNowLoc }))



        }
    }

    useEffect(() => {
        if (createRespMsg.status === "1") {
            setSuccessClose(true)
            setCreateMsg(createRespMsg);
            createFileFolderValidInput.resetForm();
        }
        setCreateContentModal(createRespMsg.message)
        setCreateSpinner(false)
    }, [createRespMsg]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal
                modal={createMsgModal}
                toggle={toggleMsgModal}
                message={createContentModal}
                successClose={successClose}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                createFileFolderValidInput.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Create Folder")}</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Input folder name")} <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="folder_name" onChange={createFileFolderValidInput.handleChange} value={createFileFolderValidInput.values.folder_name} id="newFolderNm" />
                            {createFileFolderValidInput.errors.folder_name && createFileFolderValidInput.touched.folder_name && (
                                <div style={{ color: 'red' }}>{createFileFolderValidInput.errors.folder_name}</div>
                            )}
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={createSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("New")}
                        <Spinner style={{ display: createSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );


}

Create.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idToggleCreate: PropTypes.any,
    idNowLoc: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(Create)