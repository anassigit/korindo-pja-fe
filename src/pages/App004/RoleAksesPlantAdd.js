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
import { getRoAksesData, getRoAksesUserData, getRoAksesPlantData, editRoAkses, resetMessage, saveRoAkses, deleteRoAkses, saveRoAksesUser, deleteRoAksesUser, saveRoAksesPlant, deleteRoAksesPlant } from "../../store/app004/actions"


const RoleAksesPlantAdd = (props) => {

    const dispatch = useDispatch();
    const [app004p05Spinner, setApp004p05Spinner] = useState(false);
    const [app004p05SearchLovPlant, setApp004p05SearchLovPlant] = useState("");
    

    useEffect(() => {
            if (props.app004p05Page) {
                app004p05ValidInput.resetForm()
                app004p05ValidInput.setFieldValue("roleAksesId", props.app004p01RoAksesId)
                setApp004p05SearchLovPlant('')
            }
    }, [props.app004p05Page])

    const app004p05ValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleAksesId: '',
            plantCd: '',
        },
        validationSchema: Yup.object().shape({
            roleAksesId: Yup.string().required("Wajib diisi"),
            plantCd: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            setApp004p05Spinner(true);
            props.setApp004setMsg("")
            dispatch(saveRoAksesPlant(values));
        }
    });

    const app004p05Message = useSelector(state => {
        return state.RoleAksesReducer.msgAdd1;
    });

    useEffect(() => {
        if (app004p05Message.status == "1") {
            props.setApp004p04Page(true);
            props.setApp004p05Page(false);
            props.setApp004p01Page(false);
            dispatch(getRoAksesPlantData(props.app004p04TabelRoAksesPlantReq))
        }
        props.setApp004setMsg(app004p05Message)
        setApp004p05Spinner(false);
    }, [app004p05Message])

    function app004p05ChangeFunc(row) {
        app004p05ValidInput.setFieldValue("plantCd", row.plantCd)

    }

    const [app004p05MsgPlant, setApp004p05MsgPlant] = useState("")

    const app004p05LovPlantColumns = [
        {
            dataField: "no",
            text: "no",
            sort: true,
            align: "center",
            hidden : true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "plantCd",
            text: "Kode Plant",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "plantNm",
            text: "Nama Plant",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    return (
        <Container style={{ display: props.app004p05Page ? 'block' : 'none' }} fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Maintain Role Akses" />

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i> Add Role Akses Plant</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    app004p05ValidInput.handleSubmit();
                                    return false;
                                }}>
                                <FormGroup className="mb-0">

                                <div className="mb-3 col-sm-3">
                                        <Label>Role Akses ID <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            name="roleAksesId"
                                            type="text"
                                            disabled
                                            onChange={app004p05ValidInput.handleChange}
                                            value={app004p05ValidInput.values.roleAksesId || ""}
                                            invalid={
                                                app004p05ValidInput.touched.roleAksesId && app004p05ValidInput.errors.roleAksesId ? true : false
                                            }
                                        />
                                        {app004p05ValidInput.touched.roleAksesId && app004p05ValidInput.errors.roleAksesId ? (
                                            <FormFeedback type="invalid">{app004p05ValidInput.errors.roleAksesId}</FormFeedback>
                                        ) : null}
                                    </div>

                                    <div className="mb-3 col-sm-3">
                                    <Label> Plant <span style={{ color: "red" }}>*</span></Label>
                                    <Lovv2
                                        title="Plant"
                                        keyFieldData="no"
                                        columns={app004p05LovPlantColumns}
                                        getData={getPlant}
                                        pageSize={10}
                                        defaultSetInput="plantCd"
                                        callbackFunc={app004p05ChangeFunc}
                                        invalidData={app004p05ValidInput}
                                        fieldValue="plantCd"
                                        stateSearchInput={app004p05SearchLovPlant}
                                        stateSearchInputSet={setApp004p05SearchLovPlant}
                                        touchedLovField={app004p05ValidInput.touched.plantCd}
                                        errorLovField={app004p05ValidInput.errors.plantCd}
                                        msgCustom={app004p05MsgPlant}
                                        setMsgCustom={setApp004p05MsgPlant}
                                    />
                                </div>

                                    <Button type="submit" color="primary" className="ms-1">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        <Spinner style={{ display: app004p05Spinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                                    </Button>&nbsp;

                                    <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setApp004p04Page(true); props.setApp004p05Page(false); props.setApp004setMsg("") }}
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

RoleAksesPlantAdd.propTypes = {
    app004p05Page: PropTypes.any,
    setApp004p05Page: PropTypes.any,
    setApp004setMsg: PropTypes.any,
    setApp004p04Page: PropTypes.any,
    app004p04TabelRoAksesPlantReq: PropTypes.any,
    app004p05Data: PropTypes.any,
    app004p01RoAksesId: PropTypes.any,
    setApp004p01Page: PropTypes.any,
    appDetailPage:PropTypes.any
}

export default RoleAksesPlantAdd