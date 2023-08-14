import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { editGroupMapping, getMembersData, getPermissionListData, getRankListData, resetMessage, saveGroupMapping } from 'store/appSetting/actions';
import MsgModal2 from 'components/Common/MsgModal2';

const EditGroupMapping = (props) => {
    const dispatch = useDispatch();
    const [editGroupMappingSpinner, setEditGroupMappingSpinner] = useState(false)

    const [isClosed, setIsClosed] = useState(false)

    const [editGroupMappingMsg, setEditGroupMappingMsg] = useState(false)

    const editGroupMappingMessage = useSelector(state => {
        return state.settingReducer.msgEdit;
    });

    const appMembersData = useSelector(state => {
        return state.settingReducer.respGetMembers;
    });

    const appGroupListData = useSelector(state => {
        return state.settingReducer.respGetGroupList;
    });

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const editGroupMappingValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            num: '',
            member_id: '',
            group_id: '',
        },

        validationSchema: Yup.object().shape({
            member_id: Yup.string().required("Name is required"),
            group_id: Yup.string().required("Group is required"),
        }),

        onSubmit: (value) => {
            setEditGroupMappingSpinner(true)
            dispatch(editGroupMapping(value));
            toggleMsgModal()
        }
    })

    const groupOption = (appGroupListData?.data?.groupList || []).map(({ num, name }) => ({
        value: num,
        label: name,
    }))


    useEffect(() => {
        if (props.data) {
        
            editGroupMappingValidInput.setFieldValue('num', props.data.num)
            editGroupMappingValidInput.setFieldValue('member_id', props.data.memberId);
            
            const filteredGroupOption = groupOption.find(option => option.label === props.data.groupName);
            
            if (filteredGroupOption) {
                editGroupMappingValidInput.setFieldValue('group_id', filteredGroupOption.value);
            }
        }
    }, [props.data]);

    const [editGroupMappingMsgModal, setEditGroupMappingMsgModal] = useState(false)
    const [editgroupmappingContentModal, setEditGroupMappingContentModal] = useState("")

    const toggleMsgModal = () => {
        setEditGroupMappingMsgModal(!editGroupMappingMsgModal)
        if (editGroupMappingMsg.status === "1") {
            props.toggle()
            setEditGroupMappingMsg('')
        }
    }

    useEffect(() => {
        if (editGroupMappingMessage.status == "1") {
          
            setEditGroupMappingMsg(editGroupMappingMessage)
        }
        setEditGroupMappingContentModal(editGroupMappingMessage.message);
        setEditGroupMappingSpinner(false)
    }, [editGroupMappingMessage])

    useEffect(() => {
        if (isClosed === true) {
            window.location.reload()
        }
    }, [isClosed])

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal2
                modal={editGroupMappingMsgModal}
                toggle={toggleMsgModal}
                message={editgroupmappingContentModal}
                setIsClosed={setIsClosed}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                editGroupMappingValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>Edit Group Mapping</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>Name (Email) <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                disabled
                                type="text"
                                name="member_id"
                                onChange={editGroupMappingValidInput.handleChange}
                                value={editGroupMappingValidInput.values.member_id || ''}
                            >
                            </Input>
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Group <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="select"
                                name="group_id"
                                onChange={editGroupMappingValidInput.handleChange}
                                value={editGroupMappingValidInput.values.group_id || ''}
                            >
                                <option value="">Select Group</option>
                                {groupOption.map((group) => (
                                    <option key={group.value} value={group.value}>
                                        {group.label}
                                    </option>
                                ))}
                            </Input>
                        </div>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={editGroupMappingSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        Save
                        <Spinner style={{ display: editGroupMappingSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

EditGroupMapping.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    data: PropTypes.any,
};

export default EditGroupMapping;
