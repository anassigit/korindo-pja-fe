import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
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
  addMaintainMenu,
  getMenuParentListLov,
  resetMessage,
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const AddMenu = props => {
  const dispatch = useDispatch()

  const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const addMenuFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
    //   menuId: "",
      menuName: "",
      parentMenuId: "",
      parentMenuName: "",
      menuPath: "",
      menuIcon: "",
      groupStatus: false,
      pos: "",
    },
    validationSchema: Yup.object().shape({
      menuName: Yup.string().required(props.t("Required")),
      menuPath: Yup.string().required(props.t("Required")),
      // pos: Yup.string().required(props.t('Required'))
    }),
    onSubmit: values => {
      dispatch(
        addMaintainMenu({
        //   menuId: values.menuId,
          menuName: values.menuName,
          parentMenuId: values.parentMenuId,
          menuPath: values.menuPath,
          menuIcon: values.menuIcon,
          groupStatus: values.groupStatus ? 1 : 0,
          pos: values.pos,
        })
      )
    },
  })

  useEffect(() => {
    if (props.appAddMaintainMenu) {
      addMenuFormik.resetForm()
    }
  }, [props.appAddMaintainMenu])

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
      headerStyle: { textAlign: "center" },
    },
  ]

  const appCallBackMenu = row => {
    setAppMenuSearchLov(row.menuId)
    addMenuFormik.setFieldValue("parentMenuId", row.menuId)
    addMenuFormik.setFieldValue("parentMenuName", row.menuName)
  }
  return (
    <Container
      style={{ display: props.appAddMaintainMenu ? "block" : "none" }}
      fluid="true"
    >
      <Card style={{ marginBottom: 0 }}>
        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
          <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
          {props.t("Add New Menu")}
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={e => {
              e.preventDefault()
              addMenuFormik.handleSubmit()
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
                      {props.t("Parent Menu ID")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Lovv2
                      title={props.t("Menu")}
                      keyFieldData="menuId"
                      columns={appLovMenuListColumns}
                      getData={getMenuParentListLov}
                      pageSize={10}
                      callbackFunc={appCallBackMenu}
                      defaultSetInput="menuId"
                      invalidData={addMenuFormik}
                      fieldValue="menuId"
                      stateSearchInput={appMenuSearchLov}
                      stateSearchInputSet={setAppMenuSearchLov}
                      touchedLovField={addMenuFormik.touched.menuId}
                      errorLovField={addMenuFormik.errors.menuId}
                      hasNoSearch={true}
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.menuId}
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
                      {props.t("Parent Menu Name")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      disabled
                      value={addMenuFormik.values.parentMenuName}
                      invalid={
                        addMenuFormik.touched.parentMenuName &&
                        addMenuFormik.errors.parentMenuName
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue(
                          "parentMenuName",
                          e.target.value
                        )
                      }
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.menuId}
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
                      {props.t("Menu Name")}{" "}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addMenuFormik.values.menuName}
                      invalid={
                        addMenuFormik.touched.menuName &&
                        addMenuFormik.errors.menuName
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue("menuName", e.target.value)
                      }
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.menuName}
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
                      {props.t("Menu Path")}{" "}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addMenuFormik.values.menuPath}
                      invalid={
                        addMenuFormik.touched.menuPath &&
                        addMenuFormik.errors.menuPath
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue("menuPath", e.target.value)
                      }
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.menuPath}
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
                      {props.t("Order")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addMenuFormik.values.pos}
                      invalid={
                        addMenuFormik.touched.pos && addMenuFormik.errors.pos
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue("pos", e.target.value)
                      }
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.pos}
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
                      {props.t("Icon (FA Icon)")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addMenuFormik.values.menuIcon}
                      invalid={
                        addMenuFormik.touched.menuIcon &&
                        addMenuFormik.errors.menuIcon
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue("menuIcon", e.target.value)
                      }
                    />
                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.menuIcon}
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
                      {props.t("Group Separate Permission")}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="checkbox"
                      checked={addMenuFormik.values.groupStatus}
                      value={addMenuFormik.values.groupStatus}
                      invalid={
                        addMenuFormik.touched.groupStatus &&
                        addMenuFormik.errors.groupStatus
                          ? true
                          : false
                      }
                      onChange={e =>
                        addMenuFormik.setFieldValue(
                          "groupStatus",
                          e.target.checked
                        )
                      }
                    />

                    <FormFeedback type="invalid">
                      {addMenuFormik.errors.groupStatus}
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
          props.setAppMaintainMenu(true)
          props.setAppAddMaintainMenu(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        &nbsp;{props.t("Back")}
      </Button>
    </Container>
  )
}

AddMenu.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appAddMaintainMenu: PropTypes.any,
  setAppMaintainMenu: PropTypes.any,
  setAppAddMaintainMenu: PropTypes.any,
  setLoadingSpinner: PropTypes.any,
}

export default withTranslation()(AddMenu)
