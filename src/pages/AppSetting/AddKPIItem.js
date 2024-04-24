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
    addKPIItem,
    addKPIUnit,
    getKPICategoryListLov,
    getKPIUnitListLov,
    resetMessage
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import { withTranslation } from "react-i18next"
import Lovv2 from "common/Lovv2"

const AddKPIItem = props => {

    const dispatch = useDispatch()

    const [appCategorySearchLov, setAppCategorySearchLov] = useState("")
    const [appUnitSearchLov, setAppUnitSearchLov] = useState("")

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const addFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryId: 0,
            categoryName: "",
            unitId: 0,
            unitName: ""
        },
        validationSchema: Yup.object().shape({
            categoryId: Yup.string().required("Required"),
            categoryName: Yup.string().required("Required"),
            unitId: Yup.string().required("Required"),
            unitName: Yup.string().required("Required")
        }),
        onSubmit: values => {
            dispatch(
                addKPIItem({
                    categoryId: values.categoryId,
                    unitId: values.unitId
                })
            )
        }
    })

    useEffect(() => {
        if (props.app) {
            addFormik.resetForm()
            setAppCategorySearchLov("")
            setAppUnitSearchLov("")
        }
    }, [props.app])

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
        addFormik.setFieldValue("categoryId", row.categoryId)
        addFormik.setFieldValue("categoryName", row.categoryName)
    }

    const appCallBackUnit = row => {
        setAppUnitSearchLov(row.unitId)
        addFormik.setFieldValue("unitId", row.unitId)
        addFormik.setFieldValue("unitName", row.unitName)
    }

    return (
        <Container
            style={{ display: props.app ? "block" : "none" }}
            fluid="true"
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                    <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                    Add New KPI Item
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
                                <div className="d-flex flex-row col-10 align-items-start py-2 justify-content-between">
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            {"Category ID"}
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
                                            invalidData={addFormik}
                                            fieldValue="categoryId"
                                            stateSearchInput={appCategorySearchLov}
                                            stateSearchInputSet={setAppCategorySearchLov}
                                            touchedLovField={addFormik.touched.categoryId}
                                            errorLovField={addFormik.errors.categoryId}
                                            hasNoSearch={true}
                                        />
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.categoryId}
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
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={addFormik.values.categoryName}
                                            invalid={
                                                addFormik.touched.categoryName &&
                                                    addFormik.errors.categoryName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addFormik.setFieldValue(
                                                    "categoryName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.categoryId}
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
                                            invalidData={addFormik}
                                            fieldValue="unitId"
                                            stateSearchInput={appUnitSearchLov}
                                            stateSearchInputSet={setAppUnitSearchLov}
                                            touchedLovField={addFormik.touched.unitId}
                                            errorLovField={addFormik.errors.unitId}
                                            hasNoSearch={true}
                                        />
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.unitId}
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
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={addFormik.values.unitName}
                                            invalid={
                                                addFormik.touched.unitName &&
                                                    addFormik.errors.unitName
                                                    ? true
                                                    : false
                                            }
                                            onChange={e =>
                                                addFormik.setFieldValue(
                                                    "unitName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormFeedback type="invalid">
                                            {addFormik.errors.unitId}
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
                    props.setAppAdd(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{"Back"}
            </Button>
        </Container>
    )
}

AddKPIItem.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    app: PropTypes.any,
    setApp: PropTypes.any,
    setAppAdd: PropTypes.any,
    setLoadingSpinner: PropTypes.any
}

export default withTranslation()(AddKPIItem)