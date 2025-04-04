import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from "reactstrap"
import {
    editRoleAccess,
    getMenuParentListLov,
    getRoleAccess,
    resetMessage,
    getGroupListRoleAccess
} from "store/actions"
import * as Yup from "yup"
import Select, { components } from "react-select"
import '../../../assets/scss/custom.scss'
import "../../../config"
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const EditRoleAccess = props => {
    const dispatch = useDispatch()

    const [selectedMulti2, setselectedMulti2] = useState([]);
    const [optionGroupList, setOptionGroupList] = useState([]);

    const [addUser, setAddUser] = useState([])
    const [removeUser, setRemoveUser] = useState([])

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

    const selectedMaintainRoleAccess = useSelector(state => {
        return state.settingReducer.respGetRoleAccess
    })

    /* MULTI SELECTED OPTIONS FOR GROUP LIST ROLE ACCESS */
    const selectedGroupList = useSelector(state => {
        return state.settingReducer.respGetRoleAccess
    })

    const newGroupList = useSelector(state => {
        return state.settingReducer.respGetGroupListRoleAccess
    })


    useEffect(() => {

        const groupList = selectedGroupList?.data?.groupList;
        if (groupList) {
            const uniqueGroups = [];
            const seenIds = new Set();


            // const filteredGroupItem = Array.from(groupList).filter(
            //   group => group
            // )
            groupList.forEach((group) => {
                const id = group.groupId;
                const name = group.groupName;
                const status = group.groupStatus;

                if (!seenIds.has(id)) {
                    seenIds.add(id);
                    uniqueGroups.push({
                        value: group.groupId,
                        label: group.groupName,
                        groupStatus: group.groupStatus,
                        isDisabled: group.groupStatus === 'CANNOT',
                    });
                }
            });

            setOptionGroupList(uniqueGroups);
        }

    }, [selectedGroupList]);

    function handleMulti2(s) {

        const currentSelection = selectedMulti2.map((item) => item.value);

        const addedValues = s.filter((item) => !currentSelection.includes(item.value));
        const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

        addedValues.forEach((addedItem) => {
            setAddUser(current => [...current, addedItem.value]);
        })

        deletedValues.forEach((deletedItem) => {
            setRemoveUser(current => [...current, deletedItem]);
        })

        setselectedMulti2(s);
    }

    useEffect(() => {
        const uniqueAddUser = new Set(addUser);
        const uniqueRemoveUser = new Set(removeUser);

        const filteredAddUser = Array.from(uniqueAddUser).filter(
            user => !uniqueRemoveUser.has(user)
        );
        const filteredRemoveUser = Array.from(uniqueRemoveUser).filter(
            user => !uniqueAddUser.has(user)
        );

    }, [addUser, removeUser]);


    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i className="mdi mdi-plus-thick" />
            </components.DropdownIndicator>
        );
    }

    const colourStyles2 = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isSelected ? 'white' : 'white',
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isDisabled ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',

        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? '#e6e6e6'
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? 'white'
                        : 'black', // <-- Updated line here
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            };
        },

        multiValue: (styles, { data }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: '#579DFF',

            };
        },

        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: 'white',
            fontSize: '13px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '7.5px',
            paddingBottom: '7.5px',
            borderRadius: '4px',
        }),

        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: 'white',
            ':hover': {
                backgroundColor: data.bgColor,
                color: 'white',
            },
        }),
    };

    const colourStyles2Disabled = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isSelected ? "white" : "white",
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isDisabled ? "white" : "white",
            border: 0,
            boxShadow: "none",
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "#e6e6e6"
                            : undefined,
                color: isDisabled ? "#ccc" : isSelected ? "white" : "black", // <-- Updated line here
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            }
        },

        multiValue: (styles, { data }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: "#999999",
            }
        },

        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "white",
            fontSize: "13px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "7.5px",
            paddingBottom: "7.5px",
            borderRadius: "4px",
        }),

        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#579DFF",
        }),
    }

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const groupListNotEmpty = newGroupList?.data?.list?.length === 0;

    const editRoleAccessFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            roleAccessId: "",
            roleId: "",
            menuId: "",
            bCreate: false,
            bRead: false,
            bUpdate: false,
            bPrint: false,
            bDelete: false,
            groupId: "",
        },
        validationSchema: Yup.object().shape({
            // rolroleAccessIdId: Yup.string().required("Required"),
            // roleId: Yup.string().required("Required"),
            menuId: Yup.string().required("Required"),
            groupId: Yup.string().when('groupListNotEmpty', {
                is: false,
                then: Yup.string().required("Required"),
                otherwise: Yup.string()
            }),
        }),
        onSubmit: values => {
            const groupIds = selectedMulti2.map(value => value.value);
            dispatch(
                editRoleAccess({
                    roleAccessId: values.roleAccessId,
                    roleId: values.roleId,
                    menuId: values.menuId,
                    bCreate: values.bCreate ? 1 : 0,
                    bRead: values.bRead ? 1 : 0,
                    bUpdate: values.bUpdate ? 1 : 0,
                    bPrint: values.bPrint ? 1 : 0,
                    bDelete: values.bDelete ? 1 : 0,
                    groupId: groupIds,
                })
            )
        },
    })

    useEffect(() => {
        if (props.appEditDetailAccessRole) {
            editRoleAccessFormik.resetForm()
            setAppMenuSearchLov("")
            setselectedMulti2([])
            dispatch(
                getRoleAccess({
                    roleAccessId: props.roleAccessId,
                })
            )
        }
    }, [props.appEditDetailAccessRole])

    useEffect(() => {
        editRoleAccessFormik.setFieldValue('groupListNotEmpty', groupListNotEmpty);
        if (selectedMaintainRoleAccess?.status === "1") {
            editRoleAccessFormik.setFieldValue(
                "roleAccessId",
                selectedMaintainRoleAccess?.data?.roleAccessId
            )
            editRoleAccessFormik.setFieldValue(
                "roleId",
                selectedMaintainRoleAccess?.data?.result?.roleId
            )
            editRoleAccessFormik.setFieldValue(
                "menuId",
                selectedMaintainRoleAccess?.data?.result?.menuId
            )
            setAppMenuSearchLov(selectedMaintainRoleAccess?.data?.result?.menuId)
            editRoleAccessFormik.setFieldValue(
                "bCreate",
                selectedMaintainRoleAccess.data.result?.bcreate === 1 ? true : false
            )
            editRoleAccessFormik.setFieldValue(
                "bRead",
                selectedMaintainRoleAccess.data.result?.bread === 1 ? true : false
            )
            editRoleAccessFormik.setFieldValue(
                "bUpdate",
                selectedMaintainRoleAccess.data.result?.bupdate === 1 ? true : false
            )
            editRoleAccessFormik.setFieldValue(
                "bPrint",
                selectedMaintainRoleAccess.data.result?.bprint === 1 ? true : false
            )
            editRoleAccessFormik.setFieldValue(
                "bDelete",
                selectedMaintainRoleAccess.data.result?.bdelete === 1 ? true : false
            )
            setselectedMulti2((selectedMaintainRoleAccess?.data?.groupList || []).filter(item => item.groupStatus === 'ALREADY').map((item, index) => {
                editRoleAccessFormik.setFieldValue('groupId', 'a');
                return {
                    value: item.groupId,
                    label: item.groupName,
                    groupStatus: item.groupStatus,
                    isDisabled: item.groupStatus === 'CANNOT',
                }
            }))
        }
    }, [selectedMaintainRoleAccess?.data])

    useEffect(() => {
        if (editRoleAccessFormik.values.menuId !== selectedMaintainRoleAccess?.data?.result?.menuId) {
            dispatch(
                getGroupListRoleAccess({
                    roleId: selectedMaintainRoleAccess?.data?.result?.roleId,
                    menuId: editRoleAccessFormik.values.menuId,
                })
            )
            setselectedMulti2([])
            setOptionGroupList([])
            editRoleAccessFormik.setFieldValue('groupId', '')
        } else {

        }
    }, [editRoleAccessFormik.values.menuId])

    useEffect(() => {

        editRoleAccessFormik.setFieldValue('groupListNotEmpty', groupListNotEmpty);
        if (editRoleAccessFormik.values.menuId !== selectedMaintainRoleAccess?.data?.result?.menuId) {

            if (newGroupList.status === '1') {
                const groupList = newGroupList?.data?.list;
                if (groupList) {
                    const uniqueGroups = [];
                    const seenIds = new Set();


                    // const filteredGroupItem = Array.from(groupList).filter(
                    //   group => group
                    // )
                    groupList.forEach((group) => {
                        const id = group.groupId;
                        const name = group.groupName;
                        const status = group.groupStatus;

                        if (!seenIds.has(id)) {
                            seenIds.add(id);
                            uniqueGroups.push({
                                value: group.groupId,
                                label: group.groupName,
                                groupStatus: group.groupStatus,
                                isDisabled: group.groupStatus === 'CANNOT',
                            });
                        }
                    });

                    setOptionGroupList(uniqueGroups);
                }
            }

        } else {
            const groupList = selectedGroupList?.data?.groupList;
            if (groupList) {
                const uniqueGroups = [];
                const seenIds = new Set();


                // const filteredGroupItem = Array.from(groupList).filter(
                //   group => group
                // )
                groupList.forEach((group) => {
                    const id = group.groupId;
                    const name = group.groupName;
                    const status = group.groupStatus;

                    if (!seenIds.has(id)) {
                        seenIds.add(id);
                        uniqueGroups.push({
                            value: group.groupId,
                            label: group.groupName,
                            groupStatus: group.groupStatus,
                            isDisabled: group.groupStatus === 'CANNOT',
                        });
                    }
                });

                setOptionGroupList(uniqueGroups);
            }
            setselectedMulti2((selectedMaintainRoleAccess?.data?.groupList || []).filter(item => item.groupStatus === 'ALREADY').map((item, index) => {

                editRoleAccessFormik.setFieldValue('groupId', 'a')
                return ({
                    value: item.groupId,
                    label: item.groupName,
                    groupStatus: item.groupStatus,
                    isDisabled: item.groupStatus === 'CANNOT',
                })
            }))
        }
    }, [newGroupList])

    const appLovMenuListColumns = [
        {
            dataField: "menuId",
            text: props.t("Menu ID"),
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" }
        },
        {
            dataField: "menuName",
            text: props.t("Menu Name"),
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" }
        }
    ]

    const appCallBackMenuAccess = row => {
        editRoleAccessFormik.setFieldValue("menuId", row.menuId)
        editRoleAccessFormik.setFieldValue("menuName", row.menuName)

        dispatch(
            getGroupListRoleAccess({
                roleId: selectedMaintainRoleAccess?.data?.result?.roleId,
                menuId: row.menuId,
            })
        )
    }

    return (
        <Container
            style={{ display: props.appEditDetailAccessRole ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    {props.t("Edit Role Access")}
                </CardHeader>
                <CardBody>
                    <Form
                        onSubmit={e => {
                            e.preventDefault()
                            editRoleAccessFormik.handleSubmit()
                            return false
                        }}
                    >
                        <FormGroup>
                            <div className="col-4">
                                <div className="d-flex flex-row col-10 align-items-start py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Role Access ID")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editRoleAccessFormik.values.roleAccessId}
                                            invalid={
                                                editRoleAccessFormik.touched.roleAccessId &&
                                                    editRoleAccessFormik.errors.roleAccessId
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "roleAccessId",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editRoleAccessFormik.errors.roleAccessId}
                                        </FormFeedback>
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-start py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Role ID")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editRoleAccessFormik.values.roleId}
                                            invalid={
                                                editRoleAccessFormik.touched.roleId &&
                                                    editRoleAccessFormik.errors.roleId
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "roleId",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editRoleAccessFormik.errors.roleId}
                                        </FormFeedback>
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-start py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Menu ID")}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title={props.t("Menu")}
                                            keyFieldData="menuId"
                                            columns={appLovMenuListColumns}
                                            getData={getMenuParentListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackMenuAccess}
                                            defaultSetInput="menuId"
                                            invalidData={editRoleAccessFormik}
                                            fieldValue="menuId"
                                            stateSearchInput={appMenuSearchLov}
                                            stateSearchInputSet={setAppMenuSearchLov}
                                            touchedLovField={editRoleAccessFormik.touched.menuId}
                                            errorLovField={editRoleAccessFormik.errors.menuId}
                                        />
                                        <FormFeedback type="invalid">
                                            {editRoleAccessFormik.errors.roleId}
                                        </FormFeedback>
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Create")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="checkbox"
                                            checked={editRoleAccessFormik.values.bCreate}
                                            value={editRoleAccessFormik.values.bCreate}
                                            invalid={
                                                editRoleAccessFormik.touched.bCreate &&
                                                    editRoleAccessFormik.errors.bCreate
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "bCreate",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Read")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="checkbox"
                                            checked={editRoleAccessFormik.values.bRead}
                                            value={editRoleAccessFormik.values.bRead}
                                            invalid={
                                                editRoleAccessFormik.touched.bRead &&
                                                    editRoleAccessFormik.errors.bRead
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "bRead",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Update")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="checkbox"
                                            checked={editRoleAccessFormik.values.bUpdate}
                                            value={editRoleAccessFormik.values.bUpdate}
                                            invalid={
                                                editRoleAccessFormik.touched.bUpdate &&
                                                    editRoleAccessFormik.errors.bUpdate
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "bUpdate",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Print")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="checkbox"
                                            checked={editRoleAccessFormik.values.bPrint}
                                            value={editRoleAccessFormik.values.bPrint}
                                            invalid={
                                                editRoleAccessFormik.touched.bPrint &&
                                                    editRoleAccessFormik.errors.bPrint
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "bPrint",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Delete")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="checkbox"
                                            checked={editRoleAccessFormik.values.bDelete}
                                            value={editRoleAccessFormik.values.bDelete}
                                            invalid={
                                                editRoleAccessFormik.touched.bDelete &&
                                                    editRoleAccessFormik.errors.bDelete
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editRoleAccessFormik.setFieldValue(
                                                    "bDelete",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t("Group ID")}
                                            {
                                                !groupListNotEmpty && (
                                                    <span className="text-danger"> *</span>
                                                )
                                            }
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Select
                                            value={selectedMulti2}
                                            isMulti={true}
                                            onChange={(e) => {
                                                handleMulti2(e)
                                                if (e.length > 0) {
                                                    editRoleAccessFormik.setFieldValue('groupId', 'a')
                                                } else {
                                                    editRoleAccessFormik.setFieldValue('groupId', '')
                                                }
                                            }}
                                            options={optionGroupList}
                                            className={`select2-selection ${editRoleAccessFormik.errors.groupId && editRoleAccessFormik.touched.groupId && 'custom-invalid'}`}
                                            styles={colourStyles2}
                                            // styles = {colourStyles2Disabled}
                                            components={{
                                                DropdownIndicator: DropdownIndicator,
                                            }}
                                            placeholder={"Select or type"}
                                        />

                                        {
                                            editRoleAccessFormik.errors.groupId && editRoleAccessFormik.touched.groupId && (
                                                <div style={{ color: '#f46a6a', width: '100%', marginTop: '0.25rem', fontSize: '80%', display: 'block' }}>{editRoleAccessFormik.errors.groupId}</div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: "nowrap",
                                            }}
                                        ></Label>
                                    </div>
                                    <div className="col-8">
                                        <Button type="submit">{props.t("Submit")}</Button>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>

            <Button
                className="btn btn-danger my-2"
                onClick={() => {
                    props.setAppDetailRole(true)
                    props.setAppEditDetailAccessRole(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t("Back")}
            </Button>
        </Container>
    )
}

EditRoleAccess.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    setAppDetailRole: PropTypes.any,
    appEditDetailAccessRole: PropTypes.any,
    setAppEditDetailAccessRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    roleAccessId: PropTypes.any,
}

export default withTranslation()(EditRoleAccess)
