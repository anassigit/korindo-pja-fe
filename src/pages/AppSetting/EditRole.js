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
import { editMaintainMenu, getMenuDataAction, getMenuParentListLov, getPositionAndLevelLov, resetMessage } from "store/actions"
import * as Yup from "yup"
import '../../assets/scss/custom.scss'
import '../../config'
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const EditMenu = (props) => {

    const dispatch = useDispatch()

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("")

    const selectedMaintainMenu = useSelector((state) => {
        return state.settingReducer.respGetMenu2
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const editMenuFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            menuName: '',
            menuParentId: '',
            menuParentName: '',
            menuPath: '',
            menuIcon: '',
            pos: ''
        },
        validationSchema: Yup.object().shape({
            menuName: Yup.string().required(props.t('Required')),
            menuPath: Yup.string().required(props.t('Required')),
            pos: Yup.string().required(props.t('Required'))
        }),
        onSubmit: (values) => {
            dispatch(editMaintainMenu({
                menuId: selectedMaintainMenu.data.result?.menuId,
                menuName: values.menuName,
                menuParentId: values.menuParentId,
                menuPath: values.menuPath,
                menuIcon: values.menuIcon,
                pos: values.pos
            }))
        }
    })

    useEffect(() => {
        if (props.appEditMaintainMenu) {
            editMenuFormik.resetForm()
            dispatch(getMenuDataAction({
                menuId: props.appMaintainMenuData?.menuId
            }))
        }
    }, [props.appEditMaintainMenu])

    useEffect(() => {
        if (selectedMaintainMenu.status === '1') {
            setAppMenuSearchLov(props.appMaintainMenuData?.menuParentId)
            editMenuFormik.setFieldValue('menuName', selectedMaintainMenu.data.result?.menuName)
            editMenuFormik.setFieldValue('menuParentId', selectedMaintainMenu.data.result?.menuParentId)
            editMenuFormik.setFieldValue('menuParentName', selectedMaintainMenu.data.result?.menuParentName)
            editMenuFormik.setFieldValue('menuPath', selectedMaintainMenu.data.result?.menuPath)
            editMenuFormik.setFieldValue('menuIcon', selectedMaintainMenu.data.result?.menuIcon)
            editMenuFormik.setFieldValue('pos', selectedMaintainMenu.data.result?.pos)
        }
    }, [selectedMaintainMenu.data])

    const appLovMenuListColumns = [
        {
            dataField: "menuId",
            text: props.t('Menu ID'),
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuName",
            text: props.t('Menu Name'),
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackMenu = (row) => {
        setAppMenuSearchLov(row.menuId)
        editMenuFormik.setFieldValue("menuParentId", row.menuId)
        editMenuFormik.setFieldValue("menuParentName", row.menuName)
    }

    return (
        <Container style={{ display: props.appEditMaintainMenu ? 'block' : "none" }} fluid="true">
            <Card style={{ marginBottom: 0 }}>
                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>{props.t("Edit Menu")}</CardHeader>
                <CardBody>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            editMenuFormik.handleSubmit()
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
                                            {props.t('Parent Menu ID')}
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
                                            defaultSetInput="menuParentId"
                                            invalidData={editMenuFormik}
                                            fieldValue="menuParentId"
                                            stateSearchInput={appMenuSearchLov}
                                            stateSearchInputSet={setAppMenuSearchLov}
                                            touchedLovField={editMenuFormik.touched.menuParentId}
                                            errorLovField={editMenuFormik.errors.menuParentId}
                                            hasNoSearch={true}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.menuParentId}</FormFeedback>
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
                                            {props.t('Parent Menu Name')}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={editMenuFormik.values.menuParentName}
                                            invalid={editMenuFormik.touched.menuParentName && editMenuFormik.errors.menuParentName
                                                ? true : false
                                            }
                                            onChange={(e) => editMenuFormik.setFieldValue('menuParentName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.menuId}</FormFeedback>
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
                                            {props.t('Menu Name')} <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editMenuFormik.values.menuName}
                                            invalid={editMenuFormik.touched.menuName && editMenuFormik.errors.menuName
                                                ? true : false
                                            }
                                            onChange={(e) => editMenuFormik.setFieldValue('menuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.menuName}</FormFeedback>
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
                                            {props.t('Menu Path')} <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editMenuFormik.values.menuPath}
                                            invalid={editMenuFormik.touched.menuPath && editMenuFormik.errors.menuPath
                                                ? true : false
                                            }
                                            onChange={(e) => editMenuFormik.setFieldValue('menuPath', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.menuPath}</FormFeedback>
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
                                            {props.t('Order')} <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editMenuFormik.values.pos}
                                            invalid={editMenuFormik.touched.pos && editMenuFormik.errors.pos
                                                ? true : false
                                            }
                                            onChange={(e) => editMenuFormik.setFieldValue('pos', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.pos}</FormFeedback>
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
                                            {props.t('Icon (FA Icon)')}
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={editMenuFormik.values.menuIcon}
                                            invalid={editMenuFormik.touched.menuIcon && editMenuFormik.errors.menuIcon
                                                ? true : false
                                            }
                                            onChange={(e) => editMenuFormik.setFieldValue('menuIcon', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{editMenuFormik.errors.menuIcon}</FormFeedback>
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
                    props.setAppMaintainMenu(true)
                    props.setAppEditMaintainMenu(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;{props.t('Back')}
            </Button>
        </Container >
    )
}

EditMenu.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    appMaintainMenuData: PropTypes.any,
    appEditMaintainMenu: PropTypes.any,
    setAppMaintainMenu: PropTypes.any,
    setAppEditMaintainMenu: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default withTranslation()(EditMenu)
