import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';

const AddGroupMapping = (props) => {
    const dispatch = useDispatch();
    const [addGroupMappingSpinner, setAddGroupMappingSpinner] = useState(false)

    const [addGroupMappingMsg, setAddGroupMappingMsg] = useState(false)

    const addGroupMappingMessage = useSelector(state => {
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

    const addGroupMappingValidInput = useFormik({
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
            debugger
            setAddGroupMappingSpinner(true)
            dispatch(saveMembers(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addGroupMappingValidInput.resetForm();
      }, [props.toggle]);

    /* HP Validation */
    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode;

        if (keyCode < 48 || keyCode > 57) {
            event.preventDefault();
        }
    }

    const rankOptions = (appRankListData?.data?.rankList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const permissionOptions = (appPermissionListData?.data?.permissionList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const [addGroupMappingMsgModal, setAddGroupMappingMsgModal] = useState(false)
    const [addgroupmappingContentModal, setAddGroupMappingContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddGroupMappingMsgModal(!addGroupMappingMsgModal)
        debugger
        if (addGroupMappingMsg.status === "1") {
            props.toggle()
        }
    }

    useEffect(() => {
        if (addGroupMappingMessage.status == "1") {
            debugger
            setAddGroupMappingMsg(addGroupMappingMessage)
        }
        setAddGroupMappingContentModal(addGroupMappingMessage.message);
        setAddGroupMappingSpinner(false)
    }, [addGroupMappingMessage]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal
                modal={addGroupMappingMsgModal}
                toggle={toggleMsgModal}
                message={addgroupmappingContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                addGroupMappingValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>Add New Member</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Name <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.name || ''}
                            />
                            {addGroupMappingValidInput.errors.name && addGroupMappingValidInput.touched.name && (
                                <div style={{ color: 'red' }}>{addGroupMappingValidInput.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Email <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="email"
                                name="id"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.id || ''}
                            />
                            {addGroupMappingValidInput.errors.id && addGroupMappingValidInput.touched.id && (
                                <div style={{ color: 'red' }}>{addGroupMappingValidInput.errors.id}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>HP</Label>
                            <Input
                                type="text"
                                name="hp"
                                maxLength={12}
                                onKeyPress={handleKeyPress}
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.hp || ''}
                            />
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Rank</Label>
                            <Input
                                type="select"
                                name="rank"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.rank || ''}
                            >
                                <option value="">Select Rank</option>
                                {rankOptions.map((rank) => (
                                    <option key={rank.value} value={rank.value}>
                                        {rank.label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="mb-3 mx-3">
                            <Label>Permission</Label>
                            <Input
                                type="select"
                                name="permission"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.permission || ''}
                            >
                                <option value="">Select Permission</option>
                                {permissionOptions.map((permission) => (
                                    <option key={permission.value} value={permission.value}>
                                        {permission.label}
                                    </option>
                                ))}
                            </Input>
                        </div>

                        <div className="mb-3 mx-3" hidden={addGroupMappingValidInput?.values?.permission !== '2'}>
                            <Label>Background Color</Label>
                            <Input
                                type="color"
                                name="bgColor"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.bgColor || '#000'}
                            />
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={addGroupMappingSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Save
                        <Spinner style={{ display: addGroupMappingSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

AddGroupMapping.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
};

export default AddGroupMapping;
