import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
//import { getSelectFile, deleteFileFolder, resetMessage } from "../../store/appFileManagement/actions"
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, createFolder } from '../../store/appFileManagement/actions';
import { msgCreate } from 'store/actions';



const Create = (props) => {

    const dispatch = useDispatch();
    const [createSpinner, setCreateSpinner] = useState(false)

    const createMsg = useSelector(state => {
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
            debugger
            setCreateSpinner(true)
            dispatch(createFolder(value));
            toggleMsgModal(msgCreate)
            setCreateSpinner(false)
        }
    });

    const [createMsgModal, setCreateMsgModal] = useState(false)
    const [createContentModal, setCreateContentModal] = useState("")

    const toggleMsgModal = () => {
        setCreateMsgModal(!createMsgModal)
        if (createContentModal === "Sukses") {
            props.toggle()
        }
    }

    useEffect(() => {
        if (createMsg) {
            setCreateContentModal(createMsg.message);
            dispatch(resetMessage());
        }
        setCreateSpinner(false)
    }, [createMsg]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={createMsgModal}
                toggle={toggleMsgModal}
                message={createContentModal}
                //data={idFile}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                createFileFolderValidInput.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>Create File or Folder</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Create <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="folder_name" onChange={createFileFolderValidInput.handleChange} value={createFileFolderValidInput.values.folder_name} />
                            {createFileFolderValidInput.errors.folder_name && createFileFolderValidInput.touched.folder_name && (
                                <div style={{ color: 'red' }}>{createFileFolderValidInput.errors.folder_name}</div>
                            )}
                        </div>                       
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={createSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Save
                        <Spinner style={{ display: createSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
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
};
export default Create