import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage } from 'store/appSetting/actions';

const AddMember = (props) => {
    const dispatch = useDispatch();
    const [addMemberSpinner, setAddMemberSpinner] = useState(false)

    const addMemberMsg = useSelector(state => {
        return state.settingReducer.msgAdd;
    });

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const addMemberValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: '',
            rank_id: '',
            hp: '',
            permission_id: '',
            pw: '',
            name: '',
            bgcolor: '',
        },

        validationSchema: Yup.object().shape({
            id: Yup.string()
                .email("Email must be a valid email address")
                .required("Email is required"),
            name: Yup.string().required("Name is required"),
        }),

        onSubmit: (value) => {
            setAddMemberSpinner(true)
            dispatch(saveMembers(value));
            toggleMsgModal()
        }
    });

    const [addMemberMsgModal, setAddMemberMsgModal] = useState(false)
    const [addmemberContentModal, setAddMemberContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddMemberMsgModal(!addMemberMsgModal)
        if (addmemberContentModal === "Sukses") {
            props.toggle()
        }
    }

    useEffect(() => {
        if (addMemberMsg) {
            setAddMemberContentModal(addMemberMsg.message);
            dispatch(resetMessage());
        }
        setAddMemberSpinner(false)
    }, [addMemberMsg]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={addMemberMsgModal}
                toggle={toggleMsgModal}
                message={addmemberContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                addMemberValidInput.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>Add New Member</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Name <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="name" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.name} />
                            {addMemberValidInput.errors.name && addMemberValidInput.touched.name && (
                                <div style={{ color: 'red' }}>{addMemberValidInput.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Email <span style={{ color: "red" }}>*</span></Label>
                            <Input type="email" name="id" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.id} />
                            {addMemberValidInput.errors.id && addMemberValidInput.touched.id && (
                                <div style={{ color: 'red' }}>{addMemberValidInput.errors.id}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>HP</Label>
                            <Input type="text" name="hp" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.hp} />
                        </div>
                        <div className="mb-3 mx-3">
                            <Label>Rank</Label>
                            <Input type="text" name="rank_id" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.rank_id} />
                        </div>
                        <div className="mb-3 mx-3">
                            <Label>Permission</Label>
                            <Input type="text" name="permission_id" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.permission_id} />
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Background Color</Label>
                            <Input type="text" name="bgcolor" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.bgcolor} />
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={addMemberSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        <Spinner style={{ display: addMemberSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

AddMember.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
};

export default AddMember;
