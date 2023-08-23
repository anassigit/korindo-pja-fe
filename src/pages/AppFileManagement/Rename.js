import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { getSelectFile, resetMessage, renameFileFolder } from '../../store/appFileManagement/actions';
import { withTranslation } from "react-i18next"


const Rename = (props) => {

    const dispatch = useDispatch();
    const [renameSpinner, setRenameSpinner] = useState(false)

    const [renameFFMsg, setRenameFFMsg] = useState(false)
    const [successClose, setSuccessClose] = useState(false)

    const renameMsg = useSelector(state => {
        return state.fileManagementReducer.msgRename;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    useEffect(() => {
        renameFileFolderValidInput.setFieldValue("newName", props.nmToggle)
    }, [props.toggle])

    const renameFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            file_num: props.idToggle,
            newName: props.nmToggle,
        },

        validationSchema: Yup.object().shape({

            newName: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {

            var file_ext = props.nmToggleExt
            var types_rename = props.typeRename
            if (types_rename === "FILE") {

                let NewName = value.newName + '.' + file_ext
                setRenameSpinner(true)
                value.newName = NewName
                dispatch(renameFileFolder(value));
                toggleMsgModal()

            } else {
                let NewName = value.newName
                setRenameSpinner(true)
                value.newName = NewName
                dispatch(renameFileFolder(value));
                toggleMsgModal()
            }

        }
    });

    useEffect(() => {

        renameFileFolderValidInput.resetForm();
    }, [props.toggle])

    const [renameMsgModal, setRenameMsgModal] = useState(false)
    const [renameContentModal, setRenameContentModal] = useState("")

    const toggleMsgModal = () => {
        debugger
        setRenameMsgModal(!renameMsgModal)
        if (renameFFMsg.status === "1") {

            props.toggle()

            setRenameFFMsg("")
            dispatch(getSelectFile({ 'folder_num': props.idNowLoc }))

        }
    }

    useEffect(() => {
        debugger
        if (renameMsg.status === "1") {
            // debugger
            setSuccessClose(true)
            setRenameFFMsg(renameMsg)
            renameFileFolderValidInput.resetForm();

        }
        setRenameContentModal(renameMsg.message);
        setRenameSpinner(false);


    }, [renameMsg]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal
                modal={renameMsgModal}
                toggle={toggleMsgModal}
                message={renameContentModal}
                successClose={successClose}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                renameFileFolderValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Rename File or Folder")}</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Rename")} <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="newName" onChange={renameFileFolderValidInput.handleChange} value={renameFileFolderValidInput.values.newName || ""} />
                            {renameFileFolderValidInput.errors.newName && renameFileFolderValidInput.touched.newName && (
                                <div style={{ color: 'red' }}>{renameFileFolderValidInput.errors.newName}</div>
                            )}
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={renameSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: renameSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );


}

Rename.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idToggle: PropTypes.any,
    nmToggle: PropTypes.any,
    nmToggleExt: PropTypes.any,
    typeRename: PropTypes.any,
    idNowLoc: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(Rename)