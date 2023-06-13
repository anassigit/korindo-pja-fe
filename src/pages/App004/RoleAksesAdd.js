import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Lovv2 from "../../common/Lovv2";
import * as Yup from "yup";
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
import { getPlant } from "../../store/lov/actions"
import { getRoAksesData, saveRoAkses } from "../../store/app004/actions"


const RoleAksesAdd = (props) => {

    const dispatch = useDispatch();
    const [app004p02Spinner, setApp004p02Spinner] = useState(false);

    useEffect(() => {
        if (props.app004p02Page) {
            app004p02ValidInput.resetForm()
        }
    }, [props.app004p02Page])

    const app004p02ValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleAksesId: '',
            roleAksesNm: '',
        },
        validationSchema: Yup.object().shape({
            roleAksesId: Yup.string().required("Wajib diisi"),
            roleAksesNm: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            setApp004p02Spinner(true);
            props.setApp004setMsg("")
            dispatch(saveRoAkses(values));
        }
    });

    const app004p02Message = useSelector(state => {
        return state.RoleAksesReducer.msgAdd;
    });

    useEffect(() => {
        if (app004p02Message.status == "1") {
            props.setApp004p01Page(true);
            props.setApp004p02Page(false);
            dispatch(getRoAksesData(props.app004p01TabelSearch))
        }
        props.setApp004setMsg(app004p02Message)
        setApp004p02Spinner(false);
        props.setAppDetailPage(false);
    }, [app004p02Message])

    return (
        <Container style={{ display: props.app004p02Page ? 'block' : 'none' }} fluid={true}>
        <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Akses" />

        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i> Add Role Akses</CardHeader>
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    app004p02ValidInput.handleSubmit();
                    return false;
                  }}>
                  <FormGroup className="mb-0">

                    <div className="mb-3 col-sm-3">
                      <Label>Role Akses ID <span style={{ color: "red" }}>*</span></Label>
                      <Input
                        name="roleAksesId"
                        type="text"
                        maxLength={50}
                        onChange={app004p02ValidInput.handleChange}
                        value={app004p02ValidInput.values.roleAksesId || ""}
                        invalid={
                          app004p02ValidInput.touched.roleAksesId && app004p02ValidInput.errors.roleAksesId ? true : false
                        }
                      />
                      {app004p02ValidInput.touched.roleAksesId && app004p02ValidInput.errors.roleAksesId ? (
                        <FormFeedback type="invalid">{app004p02ValidInput.errors.roleAksesId}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3 col-sm-3">
                      <Label>Role Akses Name <span style={{ color: "red" }}>*</span></Label>
                      <Input
                        name="roleAksesNm"
                        type="text"
                        maxLength={50}
                        onChange={app004p02ValidInput.handleChange}
                        value={app004p02ValidInput.values.roleAksesNm || ""}
                        invalid={
                          app004p02ValidInput.touched.roleAksesNm && app004p02ValidInput.errors.roleAksesNm ? true : false
                        }
                      />
                      {app004p02ValidInput.touched.roleAksesNm && app004p02ValidInput.errors.roleAksesNm ? (
                        <FormFeedback type="invalid">{app004p02ValidInput.errors.roleAksesNm}</FormFeedback>
                      ) : null}
                    </div>

                    <Button type="submit" color="primary" className="ms-1">
                                    <i className="bx bxs-save align-middle me-2"></i>{" "}
                                    Simpan
                                    <Spinner style={{ display: app004p02Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                                </Button>&nbsp;

                                <Button
                                    type="button"
                                    className="btn btn-danger "
                                    onClick={() => { props.setApp004p01Page(true); props.setApp004p02Page(false); props.setApp004setMsg("") }}
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

RoleAksesAdd.propTypes = {
    app004p02Page: PropTypes.any,
    setApp004p02Page: PropTypes.any,
    setApp004setMsg: PropTypes.any,
    setApp004p01Page: PropTypes.any,
    app004p01TabelSearch: PropTypes.any,
    setAppDetailPage: PropTypes.any
}

export default RoleAksesAdd