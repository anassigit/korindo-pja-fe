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
  Label,
} from "reactstrap"
import { React, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import {
  addRoleAccess,
  getGroupListRoleAccess,
  getMenuParentListLov,
  getRoleParentListLov,
  resetMessage,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import Lovv2 from "common/Lovv2"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select, { components } from "react-select"

const AddRoleAccess = props => {
  const dispatch = useDispatch()

  const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

  const [selectedMulti2, setselectedMulti2] = useState([]);
  const [optionGroupList, setOptionGroupList] = useState([]);
  
  const [addUser, setAddUser] = useState([])
  const [removeUser, setRemoveUser] = useState([])

  const selectedGroupList = useSelector(state => {
    return state.settingReducer.respGetGroupListRoleAccess
  })

  useEffect(() => {
    const groupList = selectedGroupList?.data?.list;

    if (groupList) {
      const uniqueGroups = [];
      const seenIds = new Set();

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
          });
        }
      });

      // setselectedMulti2(uniqueGroups);
      setOptionGroupList(uniqueGroups);
    }
    debugger
    setOptionGroupList(selectedGroupList?.data?.list.map((group) => ({
      value: group.groupId,
      label: group.groupName,
      groupStatus: group.groupStatus,
      isDisabled: group.groupStatus === 'CANNOT',
    })))

  }, [selectedGroupList]);

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const addRoleAccessFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
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
      roleId: Yup.string().required("Required"),
      menuId: Yup.string().required("Required"),
      groupId: Yup.string().required("Required"),
    }),
    onSubmit: values => {
      const groupIdString = values.groupId
      const groupIdList = groupIdString.split(",").map(Number)

      groupIdList.map(groupId => {
        dispatch(
          addRoleAccess({
            roleId: values.roleId,
            menuId: values.menuId,
            bCreate: values.bCreate ? 1 : 0,
            bRead: values.bRead ? 1 : 0,
            bUpdate: values.bUpdate ? 1 : 0,
            bPrint: values.bPrint ? 1 : 0,
            bDelete: values.bDelete ? 1 : 0,
            groupId: groupId,
          })
        );
      });
    },
  })

  useEffect(() => {
    if (props.appAddDetailRole) {
      addRoleAccessFormik.resetForm()
      addRoleAccessFormik.setFieldValue(
        "roleId",
        props.appMaintainRoleData?.roleId
      )

      dispatch(
        getGroupListRoleAccess({
          roleId: props.appMaintainRoleData?.roleId,
          menuId: '',
        })
      )
    }
  }, [props.appAddDetailRole])

  const appLovMenuListColumns = [
    {
      dataField: "menuId",
      text: "Menu ID",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "menuName",
      text: "Menu Name",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
  ]

  const appCallBackMenuAccess = row => {
    addRoleAccessFormik.setFieldValue("menuId", row.menuId)
    addRoleAccessFormik.setFieldValue("menuName", row.menuName)

    dispatch(
      getGroupListRoleAccess({
        roleId: addRoleAccessFormik.values.roleId,
        menuId: row.menuId,
      })
    )
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

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <i className="mdi mdi-plus-thick" />
      </components.DropdownIndicator>
    );
  }
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

  return (
    <Container
      fluid="true"
      style={{ display: props.appAddDetailRole ? "block" : "none" }}
    >
      <Card style={{ marginBottom: 0 }}>
        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
          <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
          {"Add New Role Access"}
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={e => {
              e.preventDefault()
              addRoleAccessFormik.handleSubmit()
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
                      {"Role ID"}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      disabled
                      value={addRoleAccessFormik.values.roleId}
                      invalid={
                        addRoleAccessFormik.touched.roleId &&
                          addRoleAccessFormik.errors.roleId
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
                          "roleId",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.roleId}
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
                      {"Menu ID"}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    {props.appAddDetailRole ? (
                      <Lovv2
                        title={"Menu"}
                        keyFieldData="menuId"
                        columns={appLovMenuListColumns}
                        getData={getMenuParentListLov}
                        pageSize={10}
                        callbackFunc={appCallBackMenuAccess}
                        defaultSetInput="menuId"
                        invalidData={addRoleAccessFormik}
                        fieldValue="menuId"
                        stateSearchInput={appMenuSearchLov}
                        stateSearchInputSet={setAppMenuSearchLov}
                        touchedLovField={addRoleAccessFormik.touched.menuId}
                        errorLovField={addRoleAccessFormik.errors.menuId}
                      />
                    ) : null}
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.roleId}
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
                      {"Create"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bCreate}
                      value={addRoleAccessFormik.values.bCreate}
                      invalid={
                        addRoleAccessFormik.touched.bCreate &&
                          addRoleAccessFormik.errors.bCreate
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
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
                      {"Read"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bRead}
                      value={addRoleAccessFormik.values.bRead}
                      invalid={
                        addRoleAccessFormik.touched.bRead &&
                          addRoleAccessFormik.errors.bRead
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
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
                      {"Update"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bUpdate}
                      value={addRoleAccessFormik.values.bUpdate}
                      invalid={
                        addRoleAccessFormik.touched.bUpdate &&
                          addRoleAccessFormik.errors.bUpdate
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
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
                      {"Print"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bPrint}
                      value={addRoleAccessFormik.values.bPrint}
                      invalid={
                        addRoleAccessFormik.touched.bPrint &&
                          addRoleAccessFormik.errors.bPrint
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
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
                      {"Delete"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bDelete}
                      value={addRoleAccessFormik.values.bDelete}
                      invalid={
                        addRoleAccessFormik.touched.bDelete &&
                          addRoleAccessFormik.errors.bDelete
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
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
                      {"Group ID"}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Select
                      value={selectedMulti2}
                      isMulti={true}
                      onChange={(e) => {
                        handleMulti2(e)
                      }}
                      options={optionGroupList}
                      className="select2-selection"
                      styles={colourStyles2}
                      // styles = {colourStyles2Disabled}
                      components={{
                        DropdownIndicator: DropdownIndicator,
                      }}
                      placeholder={"Select or type"}
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.groupId}
                    </FormFeedback>
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
                    <Button type="submit">{"Submit"}</Button>
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
          props.setAppAddDetailRole(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        &nbsp;{"Back"}
      </Button>
    </Container>
  )
}

AddRoleAccess.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  setAppDetailRole: PropTypes.any,
  appAddDetailRole: PropTypes.any,
  setAppAddDetailRole: PropTypes.any,
  appMaintainRoleData: PropTypes.any,
}

export default withTranslation()(AddRoleAccess)
