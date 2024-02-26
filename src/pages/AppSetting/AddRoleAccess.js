import RootPageCustom from "common/RootPageCustom"
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
import TableCustom from "common/TableCustom"
import TableCustom3 from "common/TableCustom3"
import { addMaintainRole, getRoleAccessList } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import Lovv2 from "common/Lovv2"
import { useFormik } from "formik"
import * as Yup from "yup"

const AddRoleAccess = props => {

    const dispatch = useDispatch()

    const addRoleFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            roleId: '',
            menuId: '',
            bCreate: '',
            bRead: '',
            bUpdate: '',
            bPrint: '',
            bDelete: '',
            groupId: '',
        },
        validationSchema: Yup.object().shape({
            // roleId: Yup.string().required(props.t('Required')),
            menuId: Yup.string().required(props.t('Required')),
            groupId: Yup.string().required(props.t('Required')),
        }),
        onSubmit: (values) => {
            dispatch(AddRoleAccess({
                roleId: values.roleId,
                menuId: values.menuId,
                bCreate: values.bCreate,
                bRead: values.bRead,
                bUpdate: values.bUpdate, 
                bPrint: values.bPrint,
                bDelete: values.bDelete,
                groupId: values.groupId,
            }))
        }
    })

  return (
    <Container
      fluid
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
              addRoleFormik.handleSubmit()
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
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    {/* <Lovv2
                      title={props.t("Role")}
                      keyFieldData="roleId"
                      columns={appLovRoleListColumns}
                      getData={getRoleParentListLov}
                      pageSize={10}
                      callbackFunc={appCallBackRole}
                      defaultSetInput="roleId"
                      invalidData={addRoleFormik}
                      fieldValue="roleId"
                      stateSearchInput={appRoleSearchLov}
                      stateSearchInputSet={setAppRoleSearchLov}
                      touchedLovField={addRoleFormik.touched.roleId}
                      errorLovField={addRoleFormik.errors.roleId}
                    /> */}
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.roleId}
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
                      {props.t("Menu ID")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addRoleFormik.values.menuId}
                      invalid={
                        addRoleFormik.touched.menuId &&
                        addRoleFormik.errors.menuId
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "menuId",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.menuId}
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
                      
                      value={addRoleFormik.values.bCreate}
                      invalid={
                        addRoleFormik.touched.bCreate &&
                        addRoleFormik.errors.bCreate
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "bCreate",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.bCreate}
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
                      
                      value={addRoleFormik.values.bRead}
                      invalid={
                        addRoleFormik.touched.bRead &&
                        addRoleFormik.errors.bRead
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "bRead",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.bRead}
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
                      
                      value={addRoleFormik.values.bUpdate}
                      invalid={
                        addRoleFormik.touched.bUpdate &&
                        addRoleFormik.errors.bUpdate
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "bUpdate",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.bUpdate}
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
                      
                      value={addRoleFormik.values.parentRoleName}
                      invalid={
                        addRoleFormik.touched.parentRoleName &&
                        addRoleFormik.errors.parentRoleName
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "parentRoleName",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.roleId}
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
                      
                      value={addRoleFormik.values.bDelete}
                      invalid={
                        addRoleFormik.touched.bDelete &&
                        addRoleFormik.errors.bDelete
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "bDelete",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.bDelete}
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
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      
                      value={addRoleFormik.values.groupId}
                      invalid={
                        addRoleFormik.touched.groupId &&
                        addRoleFormik.errors.groupId
                          ? true
                          : false
                      }
                      onChange={e =>
                        addRoleFormik.setFieldValue(
                          "groupId",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addRoleFormik.errors.groupId}
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
    </Container>
  )
}

AddRoleAccess.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  setAddAppRoleDetail: PropTypes.any,
  addAppRoleDetail: PropTypes.any,
}

export default withTranslation()(AddRoleAccess)
