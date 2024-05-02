import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
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
    addKPICategory,
    resetMessage,
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import { withTranslation } from "react-i18next"

const AddKPICategory = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const addFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryName: "",
            increase: 0,
        },
        validationSchema: Yup.object().shape({
            categoryName: Yup.string().required("Required"),
            increase: Yup.string().required("Required")
        }),
        onSubmit: values => {
            dispatch(
                addKPICategory({
                    categoryName: values.categoryName,
                    increase: values.increase,
                })
            )
        }
    })

    useEffect(() => {
        if (props.app) {
            addFormik.resetForm()
        }
    }, [props.app])

    return (
        <Container
            style={{ display: props.app ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    {props.t("Add New KPI Category")}
                </CardHeader>
                <CardBody>
                    <Form
                        onSubmit={e => {
                            e.preventDefault()
                            addFormik.handleSubmit()
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
                                            {props.t("Category Name")}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={addFormik.values.categoryName}
                                            invalid={
                                                addFormik.touched.categoryName &&
                                                    addFormik.errors.categoryName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addFormik.setFieldValue("categoryName", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.categoryName}
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
                                            {props.t("Increase")}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="select"
                                            value={addFormik.values.increase}
                                            invalid={
                                                addFormik.touched.increase &&
                                                    addFormik.errors.increase
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addFormik.setFieldValue("increase", e.target.value)
                                            }
                                        >
                                            <option value="0">
                                                0
                                            </option>
                                            <option value="1">
                                                1
                                            </option>
                                        </Input>
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.increase}
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
                    props.setApp(true)
                    props.setAppAdd(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t("Back")}
            </Button>
        </Container>
    )
}

AddKPICategory.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    app: PropTypes.any,
    setApp: PropTypes.any,
    setAppAdd: PropTypes.any,
    setLoadingSpinner: PropTypes.any
}

export default withTranslation()(AddKPICategory)