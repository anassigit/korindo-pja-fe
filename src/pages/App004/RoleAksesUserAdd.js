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
import { getUser } from "../../store/lov/actions"
import { getRoAksesData, getRoAksesUserData, getRoAksesPlantData, editRoAkses, resetMessage, saveRoAkses, deleteRoAkses, saveRoAksesUser, deleteRoAksesUser, saveRoAksesPlant, deleteRoAksesPlant } from "../../store/app004/actions"


const RoleAksesUserAdd = (props) => {

    const dispatch = useDispatch();
    const [app004p06Spinner, setApp004p06Spinner] = useState(false);
    const [app004p06SearchLovUser, setApp004p06SearchLovUser] = useState("");

    useEffect(() => {     
        if (props.app004p06Page) {
            app004p06ValidInput.resetForm()
            app004p06ValidInput.setFieldValue("roleAksesId", props.app004p01RoAksesId)
            app004p06ValidInput.setFieldValue("userId", "")
            setApp004p06SearchLovUser('')
        }
    }, [props.app004p06Page])
    
    const app004p06ValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleAksesId: '',
            userId: '',
        },
        validationSchema: Yup.object().shape({
            roleAksesId: Yup.string().required("Wajib diisi"),
            userId: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            setApp004p06Spinner(true);
            props.setApp004setMsg("")
            dispatch(saveRoAksesUser(values));
        }
    });

     const app004p06Message = useSelector(state => {
        return state.RoleAksesReducer.msgAdd2;
    });

    useEffect(() => {
        if (app004p06Message.status == "1") {
            dispatch(getRoAksesUserData(props.app004p04TabelRoAksesUserReq))
            props.setApp004p04Page(true);
            props.setApp004p06Page(false);
            props.setApp004p01Page(false);
        }else{
            props.setAppDetailPage(true);
          }
        props.setApp004setMsg(app004p06Message)
        setApp004p06Spinner(false);
    }, [app004p06Message])

    function app004p06ChangeFunc(row) {
        app004p06ValidInput.setFieldValue("userId", row.userId)

    }

    const [app004p06MsgUser, setApp004p06MsgUser] = useState("")

    const app004p06LovUserColumns = [
        {
            dataField: "userId",
            text: "ID User",
            sort: true,
            headerStyle: { textAlign: 'center' },
          },
          {
            dataField: "userFisrtNm",
            text: "Nama User",
            sort: true,
            headerStyle: { textAlign: 'center' },
          },
    ]


    return (
        <Container style={{ display: props.app004p06Page ? 'block' : 'none' }} fluid="true">
            <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Akses" />

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i> Add Role Akses User</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    app004p06ValidInput.handleSubmit();
                                    return false;
                                }}>
                                <FormGroup className="mb-0">

                                <div className="mb-3 col-sm-3">
                                        <Label>Role Akses ID <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            name="roleAksesId"
                                            type="text"
                                            disabled
                                            onChange={app004p06ValidInput.handleChange}
                                            value={app004p06ValidInput.values.roleAksesId || ""}
                                            invalid={
                                                app004p06ValidInput.touched.roleAksesId && app004p06ValidInput.errors.roleAksesId ? true : false
                                            }
                                        />
                                        {app004p06ValidInput.touched.roleAksesId && app004p06ValidInput.errors.roleAksesId ? (
                                            <FormFeedback type="invalid">{app004p06ValidInput.errors.roleAksesId}</FormFeedback>
                                        ) : null}
                                    </div>

                                    <div className="mb-3 col-sm-3">
                                    <Label> User <span style={{ color: "red" }}>*</span></Label>
                                    <Lovv2
                                        title="userId"
                                        keyFieldData="userId"
                                        columns={app004p06LovUserColumns}
                                        getData={getUser}
                                        pageSize={10}
                                        defaultSetInput="userId"
                                        callbackFunc={app004p06ChangeFunc}
                                        invalidData={app004p06ValidInput}
                                        fieldValue="userId"
                                        stateSearchInput={app004p06SearchLovUser}
                                        stateSearchInputSet={setApp004p06SearchLovUser}
                                        touchedLovField={app004p06ValidInput.touched.userId}
                                        errorLovField={app004p06ValidInput.errors.userId}
                                        msgCustom={app004p06MsgUser}
                                        setMsgCustom={setApp004p06MsgUser}
                                    />
                                </div>

                                    <Button type="submit" color="primary" className="ms-1">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        <Spinner style={{ display: app004p06Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                                    </Button>&nbsp;

                                    <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setApp004p04Page(true); props.setApp004p06Page(false); props.setApp004setMsg("") }}
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
RoleAksesUserAdd.propTypes = {
    app004p06Page: PropTypes.any,
    setApp004p06Page: PropTypes.any,
    setApp004setMsg: PropTypes.any,
    setApp004p04Page: PropTypes.any,
    app004p04TabelRoAksesUserReq: PropTypes.any,
    app004p05Data: PropTypes.any,
    app004p01RoAksesId: PropTypes.any,
    setApp004p01Page: PropTypes.any,
    appDetailPage: PropTypes.any,
    setAppDetailPage: PropTypes.any
}

export default RoleAksesUserAdd