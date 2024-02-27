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
  UncontrolledTooltip,
} from "reactstrap"
import { React, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import {
  addRoleAccess,
  getMenuParentListLov,
  getRoleParentListLov,
  resetMessage,
} from "store/actions"
import { useDispatch } from "react-redux"
import Lovv2 from "common/Lovv2"
import { useFormik } from "formik"
import * as Yup from "yup"

const AddRoleAccess = props => {
  const dispatch = useDispatch()

  const [appRoleAccessSearchLov, setAppRoleAccessSearchLov] = useState("")
  const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

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
      roleId: Yup.string().required(props.t("Required")),
      menuId: Yup.string().required(props.t("Required")),
      groupId: Yup.string().required(props.t("Required")),
    }),
    onSubmit: values => {
      debugger
      dispatch(
        addRoleAccess({
          roleId: values.roleId,
          menuId: values.menuId,
          bCreate: values.bCreate ? 1 : 0,
          bRead: values.bRead ? 1 : 0,
          bUpdate: values.bUpdate ? 1 : 0,
          bPrint: values.bPrint ? 1 : 0,
          bDelete: values.bDelete ? 1 : 0,
          groupId: values.groupId,
        })
      )
    },
  })

  useEffect(() => {
    if (props.addAppRoleDetail) {
      addRoleAccessFormik.resetForm()
    }
  }, [props.addAppRoleDetail])

  const appLovRoleAccessListColumns = [
    {
      dataField: "roleId",
      text: props.t("Role ID"),
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "roleName",
      text: props.t("Role Name"),
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
  ]

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

  const appCallBackRoleAccess = row => {
    setAppRoleAccessSearchLov(row.roleId)
    addRoleAccessFormik.setFieldValue("roleId", row.roleId)
    addRoleAccessFormik.setFieldValue("roleName", row.roleName)
  }

  const appCallBackMenuAccess = row => {
    addRoleAccessFormik.setFieldValue("menuId", row.menuId)
    addRoleAccessFormik.setFieldValue("menuName", row.menuName)
  }

  return (
    <Container
      fluid="true"
      style={{ display: props.addAppRoleDetail ? "block" : "none" }}
    >
      <Card style={{ marginBottom: 0 }}>
        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
          <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
          {props.t("Add New Access Role")}
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
                      {props.t("Role ID")}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Lovv2
                      title={props.t("Role")}
                      keyFieldData="roleId"
                      columns={appLovRoleAccessListColumns}
                      getData={getRoleParentListLov}
                      pageSize={10}
                      callbackFunc={appCallBackRoleAccess}
                      defaultSetInput="roleId"
                      invalidData={addRoleAccessFormik}
                      fieldValue="roleId"
                      stateSearchInput={appRoleAccessSearchLov}
                      stateSearchInputSet={setAppRoleAccessSearchLov}
                      touchedLovField={addRoleAccessFormik.touched.roleId}
                      errorLovField={addRoleAccessFormik.errors.roleId}
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
                      invalidData={addRoleAccessFormik}
                      fieldValue="menuId"
                      stateSearchInput={appMenuSearchLov}
                      stateSearchInputSet={setAppMenuSearchLov}
                      touchedLovField={addRoleAccessFormik.touched.menuId}
                      errorLovField={addRoleAccessFormik.errors.menuId}
                    />
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
                      {props.t("Create")}
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
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.bCreate}
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
                      {props.t("Read")}
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
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.bRead}
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
                      {props.t("Update")}
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
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.bUpdate}
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
                      {props.t("Print")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addRoleAccessFormik.values.bPrint}
                      value={addRoleAccessFormik.values.parentRoleName}
                      invalid={
                        addRoleAccessFormik.touched.parentRoleName &&
                        addRoleAccessFormik.errors.parentRoleName
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
                          "parentRoleName",
                          e.target.value
                        )
                      }
                    />
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
                      {props.t("Delete")}
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
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleAccessFormik.errors.bDelete}
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
                      {props.t("Group ID")}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addRoleAccessFormik.values.groupId}
                      invalid={
                        addRoleAccessFormik.touched.groupId &&
                        addRoleAccessFormik.errors.groupId
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleAccessFormik.setFieldValue(
                          "groupId",
                          e.target.value
                        )
                      }
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
          props.setAddAppRoleDetail(false)
          props.setAppDetailRole(true)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        &nbsp;{props.t("Back")}
      </Button>
    </Container>
  )
}

AddRoleAccess.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  addAppRoleDetail: PropTypes.any,
  appRoleAccess: PropTypes.any,
  setAppRoleAccess: PropTypes.any,
  setAddAppRoleDetail: PropTypes.any,
  setAppDetailRole: PropTypes.any,
}

export default withTranslation()(AddRoleAccess)
