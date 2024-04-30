
import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
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
    editKPIUnit,
    getKPIUnit,
    resetMessage,
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import { withTranslation } from "react-i18next"

const EditKPIUnit = props => {

    const dispatch = useDispatch()

    const selectedModel = useSelector(state => {
        return state.settingReducer.respGetKPIUnit
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            unitId: 0,
            unitName: ""
        },
        validationSchema: Yup.object().shape({
            unitId: Yup.string().required("Required"),
            unitName: Yup.string().required("Required")
        }),
        onSubmit: values => {
            dispatch(
                editKPIUnit({
                    unitId: values.unitId,
                    unitName: values.unitName
                })
            )
        }
    })

    useEffect(() => {
        if (props.app) {
            editFormik.resetForm()
            dispatch(
                getKPIUnit({
                    unitId: props.appData?.unitId,
                })
            )
        }
    }, [props.app])

    useEffect(() => {
        if (selectedModel.status === "1") {
            editFormik.setFieldValue(
                "unitId",
                selectedModel.data.result?.unitId
            )
            editFormik.setFieldValue(
                "unitName",
                selectedModel.data.result?.unitName
            )
        }
    }, [selectedModel.data])

    return (
        <Container
            style={{ display: props.app ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    Edit KPI Unit
                </CardHeader>
                <CardBody>
                    <Form
                        onSubmit={e => {
                            e.preventDefault()
                            editFormik.handleSubmit()
                            return false
                        }}
                    >
                        <FormGroup>
                            <div className="col-4">
                                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {"Unit ID"}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="number"
                                            disabled
                                            value={editFormik.values.unitId}
                                            invalid={
                                                editFormik.touched.unitId &&
                                                    editFormik.errors.unitId
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("unitId", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.unitId}
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
                                            {"Unit Name"}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editFormik.values.unitName}
                                            invalid={
                                                editFormik.touched.unitName &&
                                                    editFormik.errors.unitName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("unitName", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.unitName}
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
                    props.setApp(true)
                    props.setAppEdit(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{"Back"}
            </Button>
        </Container>
    )
}

EditKPIUnit.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    app: PropTypes.any,
    setApp: PropTypes.any,
    setAppEdit: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
    appData: PropTypes.any
}

export default withTranslation()(EditKPIUnit)