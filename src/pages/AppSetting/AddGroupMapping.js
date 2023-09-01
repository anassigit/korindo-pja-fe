import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getMembersData, getMembersData2, getMembersMapping, getPermissionListData, getRankListData, resetMessage, saveGroupMapping } from 'store/appSetting/actions';
import MsgModal2 from 'components/Common/MsgModal2';
import { withTranslation } from 'react-i18next';

const AddGroupMapping = (props) => {
    const dispatch = useDispatch();
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const [addGroupMappingSpinner, setAddGroupMappingSpinner] = useState(false)
    const [successClose, setSuccessClose] = useState(false)

    const [isClosed, setIsClosed] = useState(false)

    const [addGroupMappingMsg, setAddGroupMappingMsg] = useState(false)

    const addGroupMappingMessage = useSelector(state => {
        return state.settingReducer.msgAdd;
    });

    const appMembersData2 = useSelector(state => {
        return state.settingReducer.respGetMembersMapping;
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
            member_id: Yup.string().required(props.t("Please select member")),
            group_id: Yup.string().required(props.t("Please select group")),
        }),

        onSubmit: (value) => {
            debugger
            setAddGroupMappingSpinner(true)
            dispatch(saveGroupMapping(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addGroupMappingValidInput.resetForm();
    }, [props.toggle]);

    const memberOption = (appMembersData2?.data?.memberList || []).map(({ name, id, index }) => ({
        value: id,
        label: name + " (" + id + ")",
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
        if (props.modal === true) {
            dispatch(getMembersMapping({
                page: 1, limit: 10000, offset: 0, sort: "id", order: "desc", search: {
                    any: "", langType: langType
                }
            }))
        }
    }, [props.toggle])

    useEffect(() => {
        if (addGroupMappingMessage.status == "1") {
            setSuccessClose(true)
            setAddGroupMappingMsg(addGroupMappingMessage)
        } else {
            setSuccessClose(false)
        }
        setAddGroupMappingContentModal(addGroupMappingMessage.message);
        setAddGroupMappingSpinner(false)
    }, [addGroupMappingMessage]);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal2
                modal={addGroupMappingMsgModal}
                toggle={toggleMsgModal}
                message={addgroupmappingContentModal}
                setIsClosed={setIsClosed}
                successClose={successClose}
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
                            {addGroupMappingValidInput.errors.member_id && addGroupMappingValidInput.touched.member_id && (
                                <div style={{ color: 'red' }}>{addGroupMappingValidInput.errors.member_id}</div>
                            )}
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
                            {addGroupMappingValidInput.errors.group_id && addGroupMappingValidInput.touched.group_id && (
                                <div style={{ color: 'red' }}>{addGroupMappingValidInput.errors.group_id}</div>
                            )}
                        </div>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={addGroupMappingSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Add")}
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
