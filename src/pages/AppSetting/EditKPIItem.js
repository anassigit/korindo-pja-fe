
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
    Label
} from "reactstrap"
import {
    editKPIItem,
    getKPICategoryListLov,
    getKPIItem,
    getKPIUnitListLov,
    resetMessage
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import { withTranslation } from "react-i18next"
import Lovv2 from "common/Lovv2"

const EditKPIUnit = props => {

    const dispatch = useDispatch()

    const [appCategorySearchLov, setAppCategorySearchLov] = useState("")
    const [appUnitSearchLov, setAppUnitSearchLov] = useState("")

    const selectedModel = useSelector(state => {
        return state.settingReducer.respGetKPIItem
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            kpiItemId: 0,
            categoryId: 0,
            categoryName: "",
            unitId: 0,
            unitName: ""
        },
        validationSchema: Yup.object().shape({
            kpiItemId: Yup.string().required("Required"),
            categoryId: Yup.string().required("Required"),
            categoryName: Yup.string().required("Required"),
            unitId: Yup.string().required("Required"),
            unitName: Yup.string().required("Required")
        }),
        onSubmit: values => {
            dispatch(
                editKPIItem({
                    itemId: values.kpiItemId,
                    categoryId: values.categoryId,
                    unitId: values.unitId
                })
            )
        }
    })

    useEffect(() => {
        if (props.app) {
            editFormik.resetForm()
            setAppCategorySearchLov("")
            setAppUnitSearchLov("")
            dispatch(
                getKPIItem({
                    itemId: props.appData?.kpiItemId,
                })
            )
        }
    }, [props.app])

    useEffect(() => {
        if (selectedModel.status === "1") {
            editFormik.setFieldValue(
                "kpiItemId",
                selectedModel.data.result?.kpiItemId
            )
            editFormik.setFieldValue(
                "categoryId",
                selectedModel.data.result?.category.categoryId
            )
            editFormik.setFieldValue(
                "categoryName",
                selectedModel.data.result?.category.categoryName
            )
            editFormik.setFieldValue(
                "unitId",
                selectedModel.data.result?.unit.unitId
            )
            editFormik.setFieldValue(
                "unitName",
                selectedModel.data.result?.unit.unitName
            )
            setAppCategorySearchLov(selectedModel.data.result?.category.categoryId)
            setAppUnitSearchLov(selectedModel.data.result?.unit.unitId)
        }
    }, [selectedModel.data])

    const appLovCategoryListColumns = [
        {
            dataField: "categoryId",
            text: "Category ID",
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" }
        },
        {
            dataField: "categoryName",
            text: "Category Name",
            sort: true,
            headerStyle: { textAlign: "center" }
        },
        {
            dataField: "increase",
            text: "Increase",
            sort: true,
            headerStyle: { textAlign: "center" }
        }
    ]

    const appLovUnitListColumns = [
        {
            dataField: "unitId",
            text: "Unit ID",
            sort: true,
            style: { textAlign: "center" },
            headerStyle: { textAlign: "center" }
        },
        {
            dataField: "unitName",
            text: "Unit Name",
            sort: true,
            headerStyle: { textAlign: "center" }
        }
    ]

    const appCallBackCategory = row => {
        setAppCategorySearchLov(row.categoryId)
        editFormik.setFieldValue("categoryId", row.categoryId)
        editFormik.setFieldValue("categoryName", row.categoryName)
    }

    const appCallBackUnit = row => {
        setAppUnitSearchLov(row.unitId)
        editFormik.setFieldValue("unitId", row.unitId)
        editFormik.setFieldValue("unitName", row.unitName)
    }

    return (
        <Container
            style={{ display: props.app ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    Edit KPI Item
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
                                            {"KPI Item ID"}{" "}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="number"
                                            disabled
                                            value={editFormik.values.kpiItemId}
                                            invalid={
                                                editFormik.touched.kpiItemId &&
                                                    editFormik.errors.kpiItemId
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue("kpiItemId", e.target.value)
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.kpiItemId}
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
                                            {"Category ID"}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title={"Category"}
                                            keyFieldData="categoryId"
                                            columns={appLovCategoryListColumns}
                                            getData={getKPICategoryListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackCategory}
                                            defaultSetInput="categoryId"
                                            invalidData={editFormik}
                                            fieldValue="categoryId"
                                            stateSearchInput={appCategorySearchLov}
                                            stateSearchInputSet={setAppCategorySearchLov}
                                            touchedLovField={editFormik.touched.categoryId}
                                            errorLovField={editFormik.errors.categoryId}
                                            hasNoSearch={true}
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
                                            {"Category Name"}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editFormik.values.categoryName}
                                            invalid={
                                                editFormik.touched.categoryName &&
                                                    editFormik.errors.categoryName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue(
                                                    "categoryName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {editFormik.errors.categoryId}
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
                                            {"Unit ID"}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title={"Unit"}
                                            keyFieldData="unitId"
                                            columns={appLovUnitListColumns}
                                            getData={getKPIUnitListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackUnit}
                                            defaultSetInput="unitId"
                                            invalidData={editFormik}
                                            fieldValue="unitId"
                                            stateSearchInput={appUnitSearchLov}
                                            stateSearchInputSet={setAppUnitSearchLov}
                                            touchedLovField={editFormik.touched.unitId}
                                            errorLovField={editFormik.errors.unitId}
                                            hasNoSearch={true}
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
                                            {"Unit Name"}
                                            <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editFormik.values.unitName}
                                            invalid={
                                                editFormik.touched.unitName &&
                                                    editFormik.errors.unitName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                editFormik.setFieldValue(
                                                    "unitName",
                                                    e.target.value
                                                )
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