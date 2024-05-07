
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
    editKPICategory,
    getKPICategory,
    resetMessage,
} from "store/actions"
import * as Yup from "yup"
import '../../../assets/scss/custom.scss'
import "../../../config"
import { withTranslation } from "react-i18next"

const EditKPICategory = (props) => {

    const dispatch = useDispatch()

    const selectedModel = useSelector(state => {
        return state.settingReducer.respGetKPICategory
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryId: 0,
            categoryName: "",
            increase: 0,
        },
        validationSchema: Yup.object().shape({
            categoryId: Yup.string().required("Required"),
            categoryName: Yup.string().required("Required"),
            increase: Yup.string().required("Required")
        }),
        onSubmit: values => {
            dispatch(
                editKPICategory({
                    categoryId: values.categoryId,
                    categoryName: values.categoryName,
                    increase: values.increase,
                })
            )
        }
    })

    useEffect(() => {
        if (props.app) {
            editFormik.resetForm()
            dispatch(
                getKPICategory({
                    categoryId: props.appData?.categoryId,
                })
            )
        }
    }, [props.app])

    useEffect(() => {
        if (selectedModel.status === "1") {
            editFormik.setFieldValue(
                "categoryId",
                selectedModel.data.result?.categoryId
            )
            editFormik.setFieldValue(
                "categoryName",
                selectedModel.data.result?.categoryName
            )
            editFormik.setFieldValue(
                "increase",
                selectedModel.data.result?.increase
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
                    {props.t("Edit KPI Category")}
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
                                            {props.t("Category ID")}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="number"
                                            disabled
                                            value={editFormik.values.categoryId}
                                            invalid={
                                                editFormik.touched.categoryId &&
                                                    editFormik.errors.categoryId
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("categoryId", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.categoryId}
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
                                            {props.t("Category Name")}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editFormik.values.categoryName}
                                            invalid={
                                                editFormik.touched.categoryName &&
                                                    editFormik.errors.categoryName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("categoryName", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.categoryName}
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
                                            value={editFormik.values.increase}
                                            invalid={
                                                editFormik.touched.increase &&
                                                    editFormik.errors.increase
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("increase", e.target.value)
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
                                            {editFormik.errors.increase}
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
                    props.setAppEdit(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t("Back")}
            </Button>
        </Container>
    )
}

EditKPICategory.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    app: PropTypes.any,
    setApp: PropTypes.any,
    setAppEdit: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
    appData: PropTypes.any
}

export default withTranslation()(EditKPICategory)