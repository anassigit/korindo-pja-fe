import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
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
import { useSelector, useDispatch } from "react-redux"
import { getRoAksesData, getRoAksesUserData, getRoAksesPlantData, editRoAkses, resetMessage, saveRoAkses, deleteRoAkses, saveRoAksesUser, deleteRoAksesUser, saveRoAksesPlant, deleteRoAksesPlant } from "../../store/app004/actions"

const RoleAksesEdit = (props) => {

  const dispatch = useDispatch();
  const [app004p03Spinner, setApp004p03Spinner] = useState(false);

  useEffect(() => {
    if (props.app004p03Page) {
      app004p03ValidInput.resetForm()
    }
  }, [props.app004p03Page])

  useEffect(() => {
    if (props.app004p03Page) {
      app004p03ValidInput.setFieldValue("roleAksesId", props.app004p03Data.roleAksesId)
      app004p03ValidInput.setFieldValue("roleAksesNm", props.app004p03Data.roleAksesNm)
    }
  }, [props.app004p03Page])

  const app004p03ValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      roleAksesId: '',
      roleAksesNm: '',
    },
    validationSchema: Yup.object().shape({
      roleAksesId: Yup.string()
        .required("Wajib diisi"),
      roleAksesNm: Yup.string()
        .required("Wajib diisi"),
    }),


    onSubmit: (values) => {
      setApp004p03Spinner(true);
      props.setApp004setMsg("")
      dispatch(editRoAkses(values));
    }
  });

  const app004p03Message = useSelector(state => {
    return state.RoleAksesReducer.msgEdit;
  });

  useEffect(() => {
    if (app004p03Message.status == "1") {
      props.setApp004p01Page(true);
      props.setApp004p03Page(false);
      dispatch(getRoAksesData(props.app004p01TabelSearch))
    }
    props.setApp004setMsg(app004p03Message)
    setApp004p03Spinner(false);
  }, [app004p03Message])

  return (
    <Container style={{ display: props.app004p03Page ? 'block' : 'none' }} fluid={true}>
      <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Akses" />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>Edit Role Akses</CardHeader>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  app004p03ValidInput.handleSubmit();
                  return false;
                }}>
                <FormGroup className="mb-0">

                  <div className="mb-3 col-sm-3">
                    <Label>Role Akses ID <span style={{ color: "red" }}>*</span></Label>
                    <Input
                      name="roleAksesId"
                      type="text"
                      disabled
                      maxLength={50}
                      onChange={app004p03ValidInput.handleChange}
                      value={app004p03ValidInput.values.roleAksesId || ""}
                      invalid={
                        app004p03ValidInput.touched.roleAksesId && app004p03ValidInput.errors.roleAksesId ? true : false
                      }
                    />
                    {app004p03ValidInput.touched.roleAksesId && app004p03ValidInput.errors.roleAksesId ? (
                      <FormFeedback type="invalid">{app004p03ValidInput.errors.roleAksesId}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3 col-sm-3">
                    <Label>Role Akses Name <span style={{ color: "red" }}>*</span></Label>
                    <Input
                      name="roleAksesNm"
                      type="text"
                      maxLength={50}
                      onChange={app004p03ValidInput.handleChange}
                      value={app004p03ValidInput.values.roleAksesNm || ""}
                      invalid={
                        app004p03ValidInput.touched.roleAksesNm && app004p03ValidInput.errors.roleAksesNm ? true : false
                      }
                    />
                    {app004p03ValidInput.touched.roleAksesNm && app004p03ValidInput.errors.roleAksesNm ? (
                      <FormFeedback type="invalid">{app004p03ValidInput.errors.roleAksesNm}</FormFeedback>
                    ) : null}
                  </div>

                  <Button type="submit" color="primary" className="ms-1">
                    <i className="bx bxs-save align-middle me-2"></i>{" "}
                    Simpan
                    <Spinner style={{ display: app004p03Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                  </Button>&nbsp;

                  <Button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => { props.setApp004p01Page(true); props.setApp004p03Page(false); props.setApp004setMsg("") }}
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

RoleAksesEdit.propTypes = {
  app004p03Page: PropTypes.any,
  setApp004p03Page: PropTypes.any,
  setApp004setMsg: PropTypes.any,
  setApp004p01Page: PropTypes.any,
  app004p03Data: PropTypes.any,
  app004p01TabelSearch: PropTypes.any,
}

export default RoleAksesEdit