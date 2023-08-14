import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { editMembers, getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';

const EditMember = (props) => {
    const dispatch = useDispatch();
    const [editMemberSpinner, setEditMemberSpinner] = useState(false)

    const [editMemberMsg, setEditMemberMsg] = useState(false)

    const editMemberMessage = useSelector(state => {
        return state.settingReducer.msgEdit;
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

    const editMemberValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: '',
            rank: '',
            hp: '',
            permission: '',
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
            setEditMemberSpinner(true)
            dispatch(editMembers(value));
            toggleMsgModal()
        }
    })


    useEffect(() => {
        if (props.data) {
            editMemberValidInput.setFieldValue('id', props.data.id);
            editMemberValidInput.setFieldValue('hp', props.data.hp);
            editMemberValidInput.setFieldValue('name', props.data.name);
            editMemberValidInput.setFieldValue('bgColor', props.data.bgcolor);

            const filteredRankOption = rankOptions.find(option => option.label === props.data.rname);
            const filteredPermissionOption = permissionOptions.find(option => option.label === props.data.pname);

            if (filteredRankOption) {
                editMemberValidInput.setFieldValue('rank', filteredRankOption.value);
            }
            if (filteredPermissionOption) {
                editMemberValidInput.setFieldValue('permission', filteredPermissionOption.value);
            }
        }
    }, [props.data]);

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

    const [editMemberMsgModal, setEditMemberMsgModal] = useState(false)
    const [editmemberContentModal, setEditMemberContentModal] = useState("")

    const toggleMsgModal = () => {
        setEditMemberMsgModal(!editMemberMsgModal)
        
        if (editMemberMsg.status === "1") {
            props.toggle()
            setEditMemberMsg('')
        }
    }

    useEffect(() => {
        if (editMemberMessage.status == "1") {
            setEditMemberMsg(editMemberMessage)
        }
        setEditMemberContentModal(editMemberMessage.message);
        setEditMemberSpinner(false)
    }, [editMemberMessage]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal
                modal={editMemberMsgModal}
                toggle={toggleMsgModal}
                message={editmemberContentModal}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                editMemberValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>Edit Member</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Name <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.name}
                            />
                            {editMemberValidInput.errors.name && editMemberValidInput.touched.name && (
                                <div style={{ color: 'red' }}>{editMemberValidInput.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Email <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="email"
                                name="id"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.id}
                            />
                            {editMemberValidInput.errors.id && editMemberValidInput.touched.id && (
                                <div style={{ color: 'red' }}>{editMemberValidInput.errors.id}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>HP</Label>
                            <Input
                                type="text"
                                name="hp"
                                maxLength={12}
                                onKeyPress={handleKeyPress}
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.hp}
                            />
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Rank</Label>
                            <Input
                                type="select"
                                name="rank"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.rank}
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
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.permission}
                            >
                                <option value="">Select Permission</option>
                                {permissionOptions.map((permission) => (
                                    <option key={permission.value} value={permission.value}>
                                        {permission.label}
                                    </option>
                                ))}
                            </Input>
                        </div>

                        <div className="mb-3 mx-3" hidden={editMemberValidInput?.values?.permission !== '2'}>
                            <Label>Background Color</Label>
                            <Input
                                type="color"
                                name="bgColor"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.bgColor || '#000'}
                            />
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={editMemberSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Save
                        <Spinner style={{ display: editMemberSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

EditMember.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    data: PropTypes.any,
};

export default EditMember;
