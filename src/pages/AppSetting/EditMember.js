import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { editMembers, getMembersData, getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { withTranslation } from "react-i18next"

const EditMember = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [editMemberSpinner, setEditMemberSpinner] = useState(false)

    const [editMemberMsg, setEditMemberMsg] = useState(false)
    const [successClose, setSuccessClose] = useState(false)

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
            email: '',
            rank: '',
            hp: '',
            role: '',
            name: '',
            bgColor: '',
        },

        validationSchema: Yup.object().shape({
            id: Yup.string()
                .required(props.t('Please enter ID')),
            email: Yup.string()
                .email(props.t('Email must be a valid email address'))
                .required(props.t("Please enter Email")),
            name: Yup.string().required(props.t('Please enter Name')),
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
            editMemberValidInput.setFieldValue('email', props.data.email);
            editMemberValidInput.setFieldValue('hp', props.data.hp);
            editMemberValidInput.setFieldValue('name', props.data.name);
            editMemberValidInput.setFieldValue('bgColor', props.data.bgcolor);

            const filteredRankOption = (langType === 'eng' ? rankOptionsEng : (langType === 'idr' ? rankOptionsIdr : rankOptionsKor)).find(option => option.label === props.data.rname);
            const filteredPermissionOption = (langType === 'eng' ? permissionOptionsEng : (langType === 'idr' ? permissionOptionsIdr : permissionOptionsKor)).find(option => option.label === props.data.pname);

            if (filteredRankOption) {
                editMemberValidInput.setFieldValue('rank', filteredRankOption.value);
            }
            if (filteredPermissionOption) {
                editMemberValidInput.setFieldValue('role', filteredPermissionOption.value);
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

    /******* rank *******/

    const rankOptionsEng = (appRankListData?.data?.rankList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const rankOptionsIdr = (appRankListData?.data?.rankList || []).map(({ num, name_idr }) => ({
        value: num,
        label: name_idr,
    }))

    const rankOptionsKor = (appRankListData?.data?.rankList || []).map(({ num, name_kor }) => ({
        value: num,
        label: name_kor,
    }))

    /******* Permission *******/

    const permissionOptionsEng = (appPermissionListData?.data?.list || []).map(({ num, roleName }) => ({
        value: num,
        label: roleName,
    }))

    const permissionOptionsIdr = (appPermissionListData?.data?.list || []).map(({ num, roleName }) => ({
        value: num,
        label: roleName,
    }))

    const permissionOptionsKor = (appPermissionListData?.data?.list || []).map(({ num, roleName }) => ({
        value: num,
        label: roleName,
    }))

    const [editMemberMsgModal, setEditMemberMsgModal] = useState(false)
    const [editmemberContentModal, setEditMemberContentModal] = useState("")

    const toggleMsgModal = () => {
        setEditMemberMsgModal(!editMemberMsgModal)

        if (editMemberMsg.status === "1") {
            props.toggle()
            setEditMemberMsg('')
            dispatch(getMembersData(props.appMembersTabelSearch))
        }
    }

    useEffect(() => {
        if (editMemberMessage.status == "1") {
            setEditMemberMsg(editMemberMessage)
            setSuccessClose(true)
        } else {
            setSuccessClose(false)
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
                successClose={successClose}
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
                            <Label>ID <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                disabled
                                type="text"
                                name="id"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.id}
                            />
                            {editMemberValidInput.errors.id && editMemberValidInput.touched.id && (
                                <div style={{ color: 'red' }}>{editMemberValidInput.errors.id}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>Email <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="email"
                                name="email"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.email}
                            />
                            {editMemberValidInput.errors.email && editMemberValidInput.touched.email && (
                                <div style={{ color: 'red' }}>{editMemberValidInput.errors.email}</div>
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
                                <option value="">{props.t("Select Rank")}</option>
                                {
                                    (langType === 'eng' ? rankOptionsEng : (langType === 'idr' ? rankOptionsIdr : rankOptionsKor)).map((rank) => (
                                        <option key={rank.value} value={rank.value}>
                                            {rank.label}
                                        </option>
                                    ))
                                }
                            </Input>
                        </div>
                        <div className="mb-3 mx-3">
                            <Label>Role</Label>
                            <Input
                                type="select"
                                name="role"
                                onChange={editMemberValidInput.handleChange}
                                value={editMemberValidInput.values.role}
                            >
                                <option value="">{props.t("Select Role")}</option>
                                {
                                    (langType === 'eng' ? permissionOptionsEng : (langType === 'idr' ? permissionOptionsIdr : permissionOptionsKor)).map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                            </Input>
                        </div>

                        <div className="mb-3 mx-3" hidden={editMemberValidInput?.values?.role !== 2 && editMemberValidInput?.values?.role !== '2'}>
                            <Label>Background Color</Label>
                            <Input
                                type="color"
                                name="bgColor"
                                onChange={event => {
                                    const selectedColor = event.target.value;
                                    const isWhite = selectedColor === '#000000'; // Check if selected color is white

                                    if (isWhite) {
                                        // You can set a default color or another color here
                                        // For example, setting it to red (#ff0000)
                                        editMemberValidInput.handleChange({
                                            target: {
                                                name: 'bgColor',
                                                value: '#FFFFFF' // Change this to the color you want
                                            }
                                        });
                                    } else {
                                        editMemberValidInput.handleChange(event);
                                    }
                                }}
                                value={editMemberValidInput.values.bgColor || '#FFFFFF'}
                            />
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={editMemberSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: editMemberSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
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
    appMembersTabelSearch: PropTypes.any,
    t: PropTypes.any
};

export default withTranslation()(EditMember);
