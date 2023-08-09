import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
//import { getSelectFile, deleteFileFolder, resetMessage } from "../../store/appFileManagement/actions"
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, renameFileFolder } from '../../store/appFileManagement/actions';
import { msgAdd } from 'store/actions';



const Rename = (props) => {

    const dispatch = useDispatch();
    const [renameSpinner, setRenameSpinner] = useState(false)

    const renameMsg = useSelector(state => {
        return state.fileManagementReducer.msgAdd;
      })

      useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const renameFileFolderValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            file_num: props.idToggle,
            newName: '',
        },

        validationSchema: Yup.object().shape({

            newName: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {
            debugger
            setRenameSpinner(true)
            dispatch(renameFileFolder(value));
            toggleMsgModal(msgAdd)
            //setRenameSpinner(false)
        }
    });

    const [renameMsgModal, setRenameMsgModal] = useState(false)
    const [renameContentModal, setRenameContentModal] = useState("")

    const toggleMsgModal = () => {
        setRenameMsgModal(!renameMsgModal)
        if (renameContentModal === "Sukses") {
            props.toggle()
        }
    }

    useEffect(() => {
        if (renameMsg) {
            setRenameContentModal(renameMsg.message);
            dispatch(resetMessage());
        }
        setRenameSpinner(false)
    }, [renameMsg]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={renameMsgModal}
                toggle={toggleMsgModal}
                message={renameContentModal}
                //data={idFile}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                renameFileFolderValidInput.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>Rename File or Folder</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Rename <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="newName" onChange={renameFileFolderValidInput.handleChange} value={renameFileFolderValidInput.values.newName} />
                            {renameFileFolderValidInput.errors.newName && renameFileFolderValidInput.touched.newName && (
                                <div style={{ color: 'red' }}>{renameFileFolderValidInput.errors.newName}</div>
                            )}
                        </div>                       
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={renameSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Save
                        <Spinner style={{ display: renameSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
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
};
export default Rename