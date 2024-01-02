import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux"
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

import { getMenuAlldata, editMenu } from "../../store/app002/actions"

const MenuEdit = (props) => {
  //p03
  const dispatch = useDispatch();
  const [app002p03Spinner, setApp002p03Spinner] = useState(false);

  useEffect(() => {
    if (props.app002p03Page) {
      app002p03ValidInput.setFieldValue("moduleName", props.app002p03Data.moduleName)
      app002p03ValidInput.setFieldValue("orderNo", props.app002p03Data.orderNo != null ? props.app002p03Data.orderNo : 1)
      app002p03ValidInput.setFieldValue("parent", props.app002p03Data.parent)
      app002p03ValidInput.setFieldValue("menuid", props.app002p03Data.menuid)
      app002p03ValidInput.setFieldValue("title", props.app002p03Data.title)
      app002p03ValidInput.setFieldValue("path", props.app002p03Data.path)
      app002p03ValidInput.setFieldValue("icon", props.app002p03Data.icon)
      app002p03ValidInput.setFieldValue("bHide", props.app002p03Data.bHide != null ? props.app002p03Data.bHide : false)
    }
  }, [props.app002p03Page])

  const app002p03ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      moduleName: '',
      orderNo: null,
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
      setApp002p03Spinner(true);
      props.setApp002setMsg("")
      dispatch(editMenu(values));
    }
  });

  const app002p03Message = useSelector(state => {
    return state.MenuReduce.msgEdit;
  });

  useEffect(() => {
    if (app002p03Message.status == "1") {
      props.setApp002p01Page(true);
      props.setApp002p03Page(false);
      dispatch(getMenuAlldata(props.app002p01TabelSearch))
    }
    props.setApp002setMsg(app002p03Message)
    setApp002p03Spinner(false);
  }, [app002p03Message])


  return (

    <Container style={{ display: props.app002p03Page ? 'block' : 'none' }} fluid="true">
      <Breadcrumbs title="Forms" breadcrumbItem="Maintain Menu" />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Ubah Menu</CardHeader>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  app002p03ValidInput.handleSubmit();
                  return false;
                }}>
                <FormGroup className="mb-0">
                  <Row>
                    <Col md="5">
                      <div className="mb-3 col-sm-10">
                        <Label>Parent ID Menu</Label>
                        <Input
                          name="parent"
                          type="text"
                          maxLength={20}
                          disabled
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.parent || ""}
                        />
                      </div>

                      <div className="mb-3 col-sm-10">
                        <Label>ID Menu</Label>
                        <Input
                          name="menuid"
                          disabled
                          type="text"
                          maxLength={6}
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.menuid || ""}
                        />
                      </div>

                      <div className="mb-3 col-sm-10">
                        <Label>Nama Menu <span style={{ color: "red" }}>* </span></Label>
                        <Input
                          name="title"
                          type="text"
                          maxLength={100}
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.title || ""}
                          invalid={
                            app002p03ValidInput.touched.title && app002p03ValidInput.errors.title ? true : false
                          }
                        />
                        {app002p03ValidInput.touched.title && app002p03ValidInput.errors.title ? (
                          <FormFeedback type="invalid">{app002p03ValidInput.errors.title}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-sm-10">
                        <Label>ID Modul <span style={{ color: "red" }}>* </span></Label>
                        <Input
                          name="moduleName"
                          type="text"
                          maxLength={20}
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.moduleName || ""}
                          invalid={
                            app002p03ValidInput.touched.moduleName && app002p03ValidInput.errors.moduleName ? true : false
                          }
                        />
                        {app002p03ValidInput.touched.moduleName && app002p03ValidInput.errors.moduleName ? (
                          <FormFeedback type="invalid">{app002p03ValidInput.errors.moduleName}</FormFeedback>
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
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.path || ""}
                          invalid={
                            app002p03ValidInput.touched.path && app002p03ValidInput.errors.path ? true : false
                          }
                        />
                        {app002p03ValidInput.touched.path && app002p03ValidInput.errors.path ? (
                          <FormFeedback type="invalid">{app002p03ValidInput.errors.path}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-sm-10">
                        <Label>Icon</Label>
                        <Input
                          name="icon"
                          type="text"
                          maxLength={50}
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.icon || ""}
                        />
                      </div>

                      <div className="mb-3 col-sm-3">
                        <Label>Urutan <span style={{ color: "red" }}>* </span></Label>
                        <Input
                          name="orderNo"
                          type="number"
                          onChange={app002p03ValidInput.handleChange}
                          value={app002p03ValidInput.values.orderNo || ""}
                          invalid={
                            app002p03ValidInput.touched.orderNo && app002p03ValidInput.errors.orderNo ? true : false
                          }
                        />
                        {app002p03ValidInput.touched.orderNo && app002p03ValidInput.errors.orderNo ? (
                          <FormFeedback type="invalid">{app002p03ValidInput.errors.orderNo}</FormFeedback>
                        ) : null}
                      </div>

                      <br />
                      <div className="mb-3 col-sm-10">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={e => app002p03ValidInput.setFieldValue('bHide', e.target.checked ? false : true)}
                            checked={app002p03ValidInput.values.bHide}
                          />
                          <label className="form-check-label" htmlFor="autoSizingCheck">
                            Jangan Tampilkan Menu
                          </label>
                        </div>
                      </div>

                    </Col>


                  </Row>
                  <Button type="submit" color="primary" className="ms-1">
                    <i className="bx bxs-save align-middle me-2"></i>{" "}
                    Ubah
                    <Spinner style={{ display: app002p03Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  <Button
                    type="button"
                    className="btn btn-danger justify-right"
                    onClick={() => { props.setApp002p01Page(true); props.setApp002p03Page(false); props.setApp002setMsg("") }}
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

}

MenuEdit.propTypes = {
  app002p03Page: PropTypes.any,
  setApp002p03Page: PropTypes.any,
  setApp002setMsg: PropTypes.any,
  setApp002p01Page: PropTypes.any,
  app002p03Data: PropTypes.any,
  app002p01TabelSearch: PropTypes.any,
}


export default MenuEdit  