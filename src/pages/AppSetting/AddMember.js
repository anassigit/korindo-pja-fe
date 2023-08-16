import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getMembersData, getPermissionListData, getRankListData, resetMessage } from 'store/appSetting/actions';
import { withTranslation } from "react-i18next"

const AddMember = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const dispatch = useDispatch();
    const [addMemberSpinner, setAddMemberSpinner] = useState(false)

    const [addMemberMsg, setAddMemberMsg] = useState(false)

    const addMemberMessage = useSelector(state => {
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

    const addMemberValidInput = useFormik({
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

            setAddMemberSpinner(true)
            dispatch(saveMembers(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addMemberValidInput.resetForm();
    }, [props.toggle]);

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

    const permissionOptionsEng = (appPermissionListData?.data?.permissionList || []).map(({ num, name_eng }) => ({
        value: num,
        label: name_eng,
    }))

    const permissionOptionsIdr = (appPermissionListData?.data?.permissionList || []).map(({ num, name_idr }) => ({
        value: num,
        label: name_idr,
    }))

    const permissionOptionsKor = (appPermissionListData?.data?.permissionList || []).map(({ num, name_kor }) => ({
        value: num,
        label: name_kor,
    }))

    const [addMemberMsgModal, setAddMemberMsgModal] = useState(false)
    const [addmemberContentModal, setAddMemberContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddMemberMsgModal(!addMemberMsgModal)

        if (addMemberMsg.status === "1") {
            props.toggle()
            setAddMemberMsg('')
            dispatch(getMembersData(props.appMembersTabelSearch))
        }
    }

    useEffect(() => {
        if (addMemberMessage.status == "1") {

            setAddMemberMsg(addMemberMessage)
        }
        setAddMemberContentModal(addMemberMessage.message);
        setAddMemberSpinner(false)
    }, [addMemberMessage]);

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
                return false
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("Add New Member")}</ModalHeader>
                <ModalBody>
                    <FormGroup className="mb-0">

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Name")} <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.name || ''}
                            />
                            {addMemberValidInput.errors.name && addMemberValidInput.touched.name && (
                                <div style={{ color: 'red' }}>{addMemberValidInput.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Email")} <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                type="email"
                                name="id"
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.id || ''}
                            />
                            {addMemberValidInput.errors.id && addMemberValidInput.touched.id && (
                                <div style={{ color: 'red' }}>{addMemberValidInput.errors.id}</div>
                            )}
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>HP</Label>
                            <Input
                                type="text"
                                name="hp"
                                maxLength={12}
                                onKeyPress={handleKeyPress}
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.hp || ''}
                            />
                        </div>

                        <div className="mb-3 mx-3">
                            <Label>{props.t("Rank")}</Label>
                            <Input
                                type="select"
                                name="rank"
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.rank || ''}
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
                            <Label>{props.t("Permission")}</Label>
                            <Input
                                type="select"
                                name="permission"
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.permission || ''}
                            >
                                <option value="">{props.t("Select Permission")}</option>
                                {
                                    (langType === 'eng' ? permissionOptionsEng : (langType === 'idr' ? permissionOptionsIdr : permissionOptionsKor)).map((permission) => (
                                        <option key={permission.value} value={permission.value}>
                                            {permission.label}
                                        </option>
                                    ))}
                            </Input>
                        </div>

                        <div className="mb-3 mx-3" hidden={addMemberValidInput?.values?.permission !== '2'}>
                            <Label>{props.t("Background Color")}</Label>
                            <Input
                                type="color"
                                name="bgColor"
                                onChange={addMemberValidInput.handleChange}
                                value={addMemberValidInput.values.bgColor || '#000'}
                            />
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={addMemberSpinner ? "primary disabled" : "primary"}>
                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                        {props.t("Save")}
                        <Spinner style={{ display: addMemberSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

AddMember.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    appMembersTabelSearch: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddMember);
