import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getMembersData, getPermissionListData, getRankListData, resetMessage, saveGroupMapping } from 'store/appSetting/actions';
import MsgModal2 from 'components/Common/MsgModal2';
import { withTranslation } from 'react-i18next';

const AddGroupMapping = (props) => {
    const dispatch = useDispatch();
    const [addGroupMappingSpinner, setAddGroupMappingSpinner] = useState(false)

    const [isClosed, setIsClosed] = useState(false)

    const [addGroupMappingMsg, setAddGroupMappingMsg] = useState(false)

    const addGroupMappingMessage = useSelector(state => {
        return state.settingReducer.msgAdd;
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

    const addGroupMappingValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            member_id: '',
            group_id: '',
        },

        validationSchema: Yup.object().shape({
            member_id: Yup.string().required("Name is required"),
            group_id: Yup.string().required("Group is required"),
        }),

        onSubmit: (value) => {
            setAddGroupMappingSpinner(true)
            dispatch(saveGroupMapping(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addGroupMappingValidInput.resetForm();
    }, [props.toggle]);

    const memberOption = (appMembersData?.data?.memberList || []).map(({ id, index }) => ({
        value: id,
        label: id,
    }))

    const groupOption = (appGroupListData?.data?.groupList || []).map(({ num, name }) => ({
        value: num,
        label: name,
    }))

    const [addGroupMappingMsgModal, setAddGroupMappingMsgModal] = useState(false)
    const [addgroupmappingContentModal, setAddGroupMappingContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddGroupMappingMsgModal(!addGroupMappingMsgModal)
        if (addGroupMappingMsg.status === "1") {
            props.toggle()
            setAddGroupMappingMsg('')
            window.location.reload()
        }
    }

    useEffect(() => {
        if (addGroupMappingMessage.status == "1") {
            setAddGroupMappingMsg(addGroupMappingMessage)
        }
        setAddGroupMappingContentModal(addGroupMappingMessage.message);
        setAddGroupMappingSpinner(false)
    }, [addGroupMappingMessage]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <MsgModal2
                modal={addGroupMappingMsgModal}
                toggle={toggleMsgModal}
                message={addgroupmappingContentModal}
                setIsClosed={setIsClosed}
            />
            <Form onSubmit={(e) => {
                e.preventDefault();
                addGroupMappingValidInput.handleSubmit();
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Add Group Mapping")}</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Name (Email)")} <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="select"
                                name="member_id"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.member_id || ''}
                            >
                                <option value="">{props.t("Select Member")}</option>
                                {memberOption.map((member) => (
                                    <option key={member.value} value={member.value}>
                                        {member.label}
                                    </option>
                                ))}
                            </Input>
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Group")} <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="select"
                                name="group_id"
                                onChange={addGroupMappingValidInput.handleChange}
                                value={addGroupMappingValidInput.values.group_id || ''}
                            >
                                <option value="">{props.t("Select Group")}</option>
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
                    <Button type="submit" color={addGroupMappingSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: addGroupMappingSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                    {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

AddGroupMapping.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddGroupMapping);
