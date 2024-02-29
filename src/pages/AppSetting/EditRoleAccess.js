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
  Label,
} from "reactstrap"
import {
  addMaintainRole,
  editRoleAccess,
  getMenuParentListLov,
  getRoleAccess,
  getRoleDataAction,
  getRoleParentListLov,
  resetMessage,
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const EditRoleAccess = props => {
  const dispatch = useDispatch()

  const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

  const selectedMaintainRoleAccess = useSelector(state => {
    return state.settingReducer.respGetRoleAccess
  })

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])
  
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
      // rolroleAccessIdId: Yup.string().required(props.t("Required")),
      // roleId: Yup.string().required(props.t("Required")),
      menuId: Yup.string().required(props.t("Required")),
      groupId: Yup.string().required(props.t("Required")),
    }),
    onSubmit: values => {
      const groupIdString = values.groupId
      const groupIdList = groupIdString.split(',').map(Number);
      
      dispatch(
        editRoleAccess({
          // roleAccessId: values.roleAccessId,
          // roleId: values.roleId,
          menuId: values.menuId,
          bCreate: values.bCreate ? 1 : 0,
          bRead: values.bRead ? 1 : 0,
          bUpdate: values.bUpdate ? 1 : 0,
          bPrint: values.bPrint ? 1 : 0,
          bDelete: values.bDelete ? 1 : 0,
          groupId: groupIdList,
        })
      )
    },
  })

  useEffect(() => {
    if (props.appEditDetailAccessRole) {
      editRoleAccessFormik.resetForm()
      setAppMenuSearchLov("")
      dispatch(
        getRoleAccess({
          roleAccessId: props.roleAccessId,
        })
      )
    }
  }, [props.appEditDetailAccessRole])

  useEffect(() => {
    if (selectedMaintainRoleAccess?.status === "1") {
      debugger
      editRoleAccessFormik.setFieldValue(
        "roleAccessId",
        selectedMaintainRoleAccess?.data?.result?.roleAccessId
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
        "bcreate",
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
    }
  }, [selectedMaintainRoleAccess?.data])

  const appLovMenuListColumns = [
    {
      dataField: "menuId",
      text: props.t("Menu ID"),
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "menuName",
      text: props.t("Menu Name"),
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
  ]

  const appCallBackMenuAccess = row => {
    editRoleAccessFormik.setFieldValue("menuId", row.menuId)
    editRoleAccessFormik.setFieldValue("menuName", row.menuName)
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
                      value={editRoleAccessFormik.values.list?.roleId}
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
                    {props.appEditDetailAccessRole ? (
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
                    ) : null}
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
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={editRoleAccessFormik.values.groupId}
                      invalid={
                        editRoleAccessFormik.touched.groupId &&
                        editRoleAccessFormik.errors.groupId
                          ? true
                          : false
                      }
                      onChange={e =>
                        editRoleAccessFormik.setFieldValue(
                          "groupId",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {editRoleAccessFormik.errors.groupId}
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
