import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Lovv2 from "../../common/Lovv2";
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
import { getInstructionsData, saveInstructions } from "../../store/appInstructions/actions";
import { useSelector, useDispatch } from "react-redux"
import { formatRpAfterInput, replaceAll } from '../../common/Regex'
import { getCombo } from "../../store/combo/actions"
import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';

const AddInstructions = (props) => {

    const dispatch = useDispatch();

    const currentDate = new Date()
    const [addInstructionsStartDate, setAddInstructionsStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [addInstructionsEndDate, setAddInstructionsEndDate] = useState(format(new Date('9999-12-31'), 'yyyy-MM-dd'))

    //p02
    const [addInstructionsFirstRenderDone, setAddInstructionsFirstRenderDone] = useState(false);
    const [addInstructionsSpinner, setAddInstructionsSpinner] = useState(false);

    useEffect(() => {
        if (props.appAddInstructions) {
            addInstructionsValidInput.resetForm()
            setAddInstructionsStartDate(format(currentDate, 'yyyy-MM-dd'))
            setAddInstructionsEndDate(format(new Date('9999-12-31'), 'yyyy-MM-dd'))
        }
    }, [props.appAddInstructions])

    const addInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            jarakTanamId: '',
            jarakTanamName: '',
        },

        validationSchema: Yup.object().shape({
            jarakTanamName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            setAddInstructionsSpinner(true);
            props.setAppInstructionsMsg("")
            dispatch(saveInstructions(values));
        }
    });

    const appAddInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgAdd;
    });

    useEffect(() => {
        if (appAddInstructionsMessage.status == "1") {
            props.setAppInstructionsPage(true);
            props.setAppAddInstructions(false);
            dispatch(getInstructionsData(props.appInstructionsTabelSearch))
        }
        props.setAppInstructionsMsg(appAddInstructionsMessage)
        setAddInstructionsSpinner(false);
    }, [appAddInstructionsMessage])


    return (
        <Container style={{ display: props.appAddInstructions ? 'block' : 'none' }} fluid={true}>
            {/* <Breadcrumbs title="Forms" breadcrumbItem="Master Rumus Tegakan" pageNow={props.setAppAddInstructions} pageBefore={props.setAppInstructionsPage} message={props.setAppInstructionsMsg} /> */}

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Add Instructions</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addInstructionsValidInput.handleSubmit();
                                    return false;
                                }}>

                                <FormGroup className="mb-0">

                                    <Row>
                                        <Col md="6">

                                            <div className="mb-3 col-sm-6">
                                                <Label>Title</Label>
                                                <Input
                                                    name="title"
                                                    type="text"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.title || ""}
                                                    invalid={
                                                        addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.title}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label>
                                                    Instruction Date{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>

                                                <Input
                                                    name="validFrom"
                                                    type="date"
                                                    onChange={(e) => app032p02OnChangeStartDate(e.target.value)}
                                                    //  onChange={addInstructionsValidInput.handleChange}
                                                    //value={addInstructionsValidInput.values.validFrom}
                                                    value={addInstructionsStartDate}
                                                    invalid={
                                                        addInstructionsValidInput.touched.validFrom && addInstructionsValidInput.errors.validFrom ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.validFrom && addInstructionsValidInput.errors.validFrom ? (
                                                    <FormFeedback type="invalid"> {addInstructionsValidInput.errors.validFrom} </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    type="select"
                                                    name="kategoryId"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    onBlur={addInstructionsValidInput.handleBlur}
                                                    value={addInstructionsValidInput.values.kategoryId || ""}
                                                    invalid={
                                                        addInstructionsValidInput.touched.kategoryId && addInstructionsValidInput.errors.kategoryId ? true : false
                                                    }
                                                >
                                                    <option></option>
                                                    {/* {
                                                        app032SelectedKategori.dtlsetting?.map((value, key) =>
                                                            <option key={key} value={value.id}>{value.desc}</option>)
                                                    } */}
                                                </Input>
                                                {addInstructionsValidInput.touched.kategoryId && addInstructionsValidInput.errors.kategoryId ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.kategoryId}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="keterangan"
                                                    type="textarea"
                                                    rows="5"
                                                    maxLength={50}
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={
                                                        addInstructionsValidInput.values.keterangan ||
                                                        ""
                                                    }
                                                    invalid={
                                                        addInstructionsValidInput.touched.keterangan &&
                                                        addInstructionsValidInput.errors.keterangan
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.keterangan &&
                                                    addInstructionsValidInput.errors.keterangan ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionsValidInput.errors.keterangan}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3 col-sm-6">
                                                <Label> Choose Owner <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="title"
                                                    type="text"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.title || ""}
                                                    invalid={
                                                        addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.title}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <label>Choose Manager <span style={{ color: "red" }}>* </span></label>
                                                <Input
                                                    name="title"
                                                    type="text"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.title || ""}
                                                    invalid={
                                                        addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.title}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Attach File <span style={{ color: "red" }}>* </span></Label>
                                                <div className="input-group">
                                            <Input
                                                id="idFileUpload"
                                                name="_file1"
                                                type="file"
                                                accept="json/*"
                                                onChange={(e) => addInstructionsValidInput.setFieldValue("_file1", e.target.files[0])}
                                                invalid={
                                                    addInstructionsValidInput.touched._file1 && addInstructionsValidInput.errors._file1 ? true : false
                                                }
                                            />
                                            <Button outline type="button" color="danger" onClick={() => { addInstructionsValidInput.setFieldValue("_file1", ""); document.getElementById('idFileUpload').value = null; }}>
                                                <i className="mdi mdi-close-thick font-size-13 align-middle"></i>{" "}
                                            </Button>
                                                </div>
                                            </div>



                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Button type="submit" color="primary" className="ms-1">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                                    </Button>&nbsp;

                                    <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setAppInstructionsPage(true); props.setAppAddInstructions(false); props.setAppInstructionsMsg("") }}
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

AddInstructions.propTypes = {

    appAddInstructions: PropTypes.any,
    setAppAddInstructions: PropTypes.any,
    setAppInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,

}
export default AddInstructions