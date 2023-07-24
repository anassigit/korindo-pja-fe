import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux'; // Import the useDispatch hook from react-redux

const AddMember = ({ modal, toggle }) => {
    const dispatch = useDispatch(); // Access the dispatch function

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
            id: Yup.string().required("Wajib diisi"),
            name: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (value) => {
            console.log("clicked")
            console.log(value)
            // dispatch(savePosition(value)); // Dispatch the action with the form values
        }
    });

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                addMemberValidInput.handleSubmit();
            }}>
                <ModalHeader toggle={toggle}>Add New Member</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">
                        <div className="mb-3 mx-3">
                            <Label>Name <span style={{ color: "red" }}>*</span></Label>
                            <Input type="text" name="name" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.name} />
                        </div>

                        <div className="mb-3 mx-3"> 
                            <Label>Email <span style={{ color: "red" }}>*</span></Label>
                            <Input type="email" name="id" onChange={addMemberValidInput.handleChange} value={addMemberValidInput.values.id} />
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
                    <Button type="submit" color="primary">
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Simpan
                        {/* You can add the spinner here if needed */}
                        {/* <Spinner style={{ display: app009p02Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                    </Button>
                    <Button color="danger" onClick={toggle}>
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
