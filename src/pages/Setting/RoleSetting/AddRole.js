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
    Label
} from "reactstrap"
import {
    addMaintainRole,
    getRoleParentListLov,
    resetMessage
} from "store/actions"
import * as Yup from "yup"
import '../../../assets/scss/custom.scss'
import "../../../config"
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const AddRole = props => {
    const dispatch = useDispatch()

    const [appRoleSearchLov, setAppRoleSearchLov] = useState("")

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const addRoleFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            roleName: "",
            parentRoleId: "",
            parentRoleName: "",
            pos: "",
        },
        validationSchema: Yup.object().shape({
            roleName: Yup.string().required("Required"),
        }),
        onSubmit: values => {
            dispatch(
                addMaintainRole({
                    roleName: values.roleName,
                    parentRoleId: values.parentRoleId,

                    pos: values.pos,
                })
            )
        },
    })

    useEffect(() => {
        if (props.appAddMaintainRole) {
            addRoleFormik.resetForm()
            setAppRoleSearchLov("")
        }
    }, [props.appAddMaintainRole])

    const appLovRoleListColumns = [
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
            headerStyle: { textAlign: "center" },
        },
    ]

    const appCallBackRole = row => {
        setAppRoleSearchLov(row.roleId)
        addRoleFormik.setFieldValue("parentRoleId", row.roleId)
        addRoleFormik.setFieldValue("parentRoleName", row.roleName)
    }

    return (
        <Container
            style={{ display: props.appAddMaintainRole ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    {props.t("Add New Role")}
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
                                            {props.t("Parent Role ID")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        {props.appAddMaintainRole ? (
                                            <Lovv2
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
                                            />
                                        ) : null}
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
                                            {props.t("Parent Role Name")}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
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
                                            {props.t("Role Name")}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={addRoleFormik.values.roleName}
                                            invalid={
                                                addRoleFormik.touched.roleName &&
                                                    addRoleFormik.errors.roleName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addRoleFormik.setFieldValue("roleName", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {addRoleFormik.errors.roleName}
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
                                            value={addRoleFormik.values.pos}
                                            invalid={
                                                addRoleFormik.touched.pos && addRoleFormik.errors.pos
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addRoleFormik.setFieldValue("pos", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {addRoleFormik.errors.pos}
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
                    props.setAppMaintainRole(true)
                    props.setAppAddMaintainRole(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t("Back")}
            </Button>
        </Container>
    )
}

AddRole.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    appAddMaintainRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppAddMaintainRole: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default withTranslation()(AddRole)
