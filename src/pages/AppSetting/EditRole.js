import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
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
import { editMaintainRole, getRoleDataAction, getRoleParentListLov, getPositionAndLevelLov, resetMessage } from "store/actions"
import * as Yup from "yup"
import '../../assets/scss/custom.scss'
import '../../config'
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const EditRole = (props) => {

    const dispatch = useDispatch()

    const [appRoleSearchLov, setAppRoleSearchLov] = useState("")

    const selectedMaintainRole = useSelector((state) => {
        return state.settingReducer.respGetRole
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const editRoleFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            roleName: '',
            roleId: '',
            roleParentName: '',
            pos: ''
        },
        validationSchema: Yup.object().shape({
            roleName: Yup.string().required(props.t('Required')),
        }),
        onSubmit: (values) => {
            dispatch(editMaintainRole({
                roleId: selectedMaintainRole.data.result?.roleId,
                roleName: values.roleName,
                // roleId: values.roleId,
                pos: values.pos
            }))
        }
    })

    useEffect(() => {
        if (props.appEditMaintainRole) {
            editRoleFormik.resetForm()
            dispatch(getRoleDataAction({
                roleId: props.appMaintainRoleData?.roleId
            }))
        }
    }, [props.appEditMaintainRole])

    useEffect(() => {
        if (selectedMaintainRole?.status === '1') {
            setAppRoleSearchLov(props.appMaintainRoleData?.roleId)
            editRoleFormik.setFieldValue('roleName', selectedMaintainRole.data.result?.roleName)
            editRoleFormik.setFieldValue('roleId', selectedMaintainRole.data.result?.roleId)
            editRoleFormik.setFieldValue('roleParentName', selectedMaintainRole.data.result?.parent?.roleName)
        }
    }, [selectedMaintainRole?.data])

    const appLovRoleListColumns = [
        {
            dataField: "roleId",
            text: props.t('Role ID'),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "roleName",
            text: props.t('Role Name'),
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackRole = (row) => {
        setAppRoleSearchLov(row.roleId)
        editRoleFormik.setFieldValue("roleId", row.roleId)
        editRoleFormik.setFieldValue("roleParentName", row.roleName)
    }

    return (
        <Container style={{ display: props.appEditMaintainRole ? 'block' : "none" }} fluid="true">
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>{props.t("Edit Role")}</CardHeader>
                <CardBody>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            editRoleFormik.handleSubmit()
                            return false
                        }}
                    >
                        <FormGroup>
                            <div
                                className="col-4"
                            >
                                <div
                                    className="d-flex flex-row col-10 align-items-start py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t('Parent Role ID')}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title={props.t("Role")}
                                            keyFieldData="roleId"
                                            columns={appLovRoleListColumns}
                                            getData={getRoleParentListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackRole}
                                            defaultSetInput="roleId"
                                            invalidData={editRoleFormik}
                                            fieldValue="roleId"
                                            stateSearchInput={appRoleSearchLov}
                                            stateSearchInputSet={setAppRoleSearchLov}
                                            touchedLovField={editRoleFormik.touched.roleId}
                                            errorLovField={editRoleFormik.errors.roleId}
                                            hasNoSearch={true}
                                        />
                                        <FormFeedback type="invalid">{editRoleFormik.errors.roleId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t('Parent Role Name')}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editRoleFormik.values.roleParentName}
                                            invalid={editRoleFormik.touched.roleParentName && editRoleFormik.errors.roleParentName
                                                ? true : false
                                            }
                                            onChange={(e) => editRoleFormik.setFieldValue('roleParentName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editRoleFormik.errors.roleId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {props.t('Role Name')} <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editRoleFormik.values.roleName}
                                            invalid={editRoleFormik.touched.roleName && editRoleFormik.errors.roleName
                                                ? true : false
                                            }
                                            onChange={(e) => editRoleFormik.setFieldValue('roleName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editRoleFormik.errors.roleName}</FormFeedback>
                                    </div>
                                </div>
                                
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Button
                                            type="submit"
                                        >
                                            {props.t('Submit')}
                                        </Button>
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
                    props.setAppEditMaintainRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t('Back')}
            </Button>
        </Container >
    )
}

EditRole.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    appEditMaintainRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppEditMaintainRole: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default withTranslation()(EditRole)
