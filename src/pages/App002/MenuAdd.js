import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Lov from "../../common/Lov";
import * as Yup from "yup";
import '../../config';
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Card,
    CardBody,
    Container,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
    Spinner,
    FormGroup,
    CardHeader,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getMenuAlldata, saveMenu } from "../../store/app002/actions"
import { getMenuParent } from "../../store/lov/actions"

import { useSelector, useDispatch } from "react-redux"

const MenuAdd = (props) => {
    const dispatch = useDispatch();
    //p02
    const [app002p02Spinner, setApp002p02Spinner] = useState(false);
    const [app002p02MenuIdED, setApp002p02MenuIdED] = useState(false);
    const [app002p02LovParentId, setApp002p02LovParentId] = useState('');

    useEffect(() => {
        if (props.app002p02Page) {
            app002p02ValidInput.resetForm()
            setApp002p02LovParentId("")
        }
    }, [props.app002p02Page])

    const app002p02ValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            moduleName: '',
            orderNo: 1,
            parent: '',
            menuid: '',
            title: '',
            path: '',
            icon: '',
            bHide: false,

        },
        validationSchema: Yup.object().shape({
            moduleName: Yup.string()
                .required("Wajib diisi"),
            orderNo: Yup.number()
                .required("Wajib diisi")
                .max(99, "Max 2 chars"),
            title: Yup.string()
                .required("Wajib diisi"),
            path: Yup.string()
                .required("Wajib diisi"),
        }),


        onSubmit: (values) => {
            setApp002p02Spinner(true);
            props.setApp002setMsg("")
            dispatch(saveMenu(values));
        }
    });

    const app002p02Message = useSelector(state => {
        return state.MenuReduce.msgAdd;
    });

    useEffect(() => {
        if (app002p02Message.status == "1") {
            setApp002p02LovParentId('')
            props.setApp002p01Page(true);
            props.setApp002p02Page(false);
            dispatch(getMenuAlldata(props.app002p01TabelSearch))
        }
        props.setApp002setMsg(app002p02Message)
        setApp002p02Spinner(false);
    }, [app002p02Message])

    const app002p02TabelMenuParentColumns = [
        {
            dataField: "parentMenuId",
            text: "Parent ID Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "parentTitle",
            text: "Parent Nama Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    function app002p02callBackLovMenuParent(row) {
        if (row.parentMenuId != null && row.parentMenuId != "") {
            setApp002p02MenuIdED(true)
        } else {
            setApp002p02MenuIdED(false)
        }
    }

    function app002p02ChangeFunc(val) {
        if (val != null && val != "") {
            setApp002p02MenuIdED(true)
        } else {
            setApp002p02MenuIdED(false)
        }
    }

    return (
        <Container style={{ display: props.app002p02Page ? 'block' : 'none' }} fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Maintain Menu" />

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Tambah Menu</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    app002p02ValidInput.handleSubmit();
                                    return false;
                                }}>
                                <FormGroup className="mb-0">
                                    <Row>
                                        <Col md="5">
                                            <div>
                                                <Lov title="Parent ID Menu"
                                                    LenghtLabel=""
                                                    LenghtDiv="mb-3 col-sm-10"
                                                    columns={app002p02TabelMenuParentColumns}
                                                    getData={getMenuParent}
                                                    pageSize={10}
                                                    callbackFunc={app002p02callBackLovMenuParent}
                                                    onChangeFunc={app002p02ChangeFunc}
                                                    defaultSetInput="parentMenuId"
                                                    invalidData={app002p02ValidInput}
                                                    fieldValue="parent"
                                                    stateSearchInput={app002p02LovParentId}
                                                    stateSearchInputSet={setApp002p02LovParentId}
                                                    touchedLovField={app002p02ValidInput.touched.parent}
                                                    errorLovField={app002p02ValidInput.errors.parent}
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label>ID Menu</Label>
                                                <Input
                                                    name="menuid"
                                                    type="text"
                                                    disabled={app002p02MenuIdED}
                                                    maxLength={6}
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.menuid || ""}
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label>Nama Menu <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="title"
                                                    type="text"
                                                    maxLength={100}
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.title || ""}
                                                    invalid={
                                                        app002p02ValidInput.touched.title && app002p02ValidInput.errors.title ? true : false
                                                    }
                                                />
                                                {app002p02ValidInput.touched.title && app002p02ValidInput.errors.title ? (
                                                    <FormFeedback type="invalid">{app002p02ValidInput.errors.title}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label>ID Modul <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="moduleName"
                                                    type="text"
                                                    maxLength={20}
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.moduleName || ""}
                                                    invalid={
                                                        app002p02ValidInput.touched.moduleName && app002p02ValidInput.errors.moduleName ? true : false
                                                    }
                                                />
                                                {app002p02ValidInput.touched.moduleName && app002p02ValidInput.errors.moduleName ? (
                                                    <FormFeedback type="invalid">{app002p02ValidInput.errors.moduleName}</FormFeedback>
                                                ) : null}
                                            </div>

                                        </Col>
                                        <Col md="5">

                                            <div className="mb-3 col-sm-10">
                                                <Label>Path <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="path"
                                                    type="text"
                                                    maxLength={70}
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.path || ""}
                                                    invalid={
                                                        app002p02ValidInput.touched.path && app002p02ValidInput.errors.path ? true : false
                                                    }
                                                />
                                                {app002p02ValidInput.touched.path && app002p02ValidInput.errors.path ? (
                                                    <FormFeedback type="invalid">{app002p02ValidInput.errors.path}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label>Icon</Label>
                                                <Input
                                                    name="icon"
                                                    type="text"
                                                    maxLength={50}
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.icon || ""}
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-3">
                                                <Label>Urutan</Label>
                                                <Input
                                                    name="orderNo"
                                                    type="number"
                                                    onChange={app002p02ValidInput.handleChange}
                                                    value={app002p02ValidInput.values.orderNo || ""}
                                                    invalid={
                                                        app002p02ValidInput.touched.orderNo && app002p02ValidInput.errors.orderNo ? true : false
                                                    }
                                                />
                                                {app002p02ValidInput.touched.orderNo && app002p02ValidInput.errors.orderNo ? (
                                                    <FormFeedback type="invalid">{app002p02ValidInput.errors.orderNo}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <br />
                                            <div className="mb-3 col-sm-10">
                                                <div className="form-check">
                                                    <Input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onClick={e => app002p02ValidInput.setFieldValue('bHide', e.target.checked ? false : true)}
                                                        checked={app002p02ValidInput.values.bHide} />
                                                    <label className="form-check-label" htmlFor="autoSizingCheck">
                                                        Jangan Tampilkan Menu
                                                    </label>
                                                </div>
                                            </div>

                                        </Col>


                                    </Row>
                                    <Button type="submit" color="primary" className="ms-1">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        <Spinner style={{ display: app002p02Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                                    </Button>&nbsp;

                                    <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setApp002p01Page(true); props.setApp002p02Page(false); props.setApp002setMsg("") }}
                                    >
                                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                        Kembali
                                    </Button>
                                </FormGroup>

                            </Form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

MenuAdd.propTypes = {
    app002p02Page: PropTypes.any,
    setApp002p02Page: PropTypes.any,
    setApp002setMsg: PropTypes.any,
    setApp002p01Page: PropTypes.any,
    app002p01TabelSearch: PropTypes.any,
}

export default MenuAdd  
