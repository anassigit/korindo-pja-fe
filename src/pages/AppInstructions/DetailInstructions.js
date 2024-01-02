

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux"
import TableCustom from '../../common/TableCustom';
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
import { getInstructionsData, editInstructions, getUserList, getDetailInstruction } from "../../store/appInstructions/actions"
import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';
import Select from "react-select";
import shortid from "shortid";

const DetailInstructions = (props) => {
    const dispatch = useDispatch();
    const currentDate = new Date()
    const [startDate, setStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [detailInstructionsSpinner, setDetailInstructionsSpinner] = useState(false);
    const [detailInstructionsFirstRenderDone, setDetailInstructionsFirstRenderDone] = useState(false);
    const [selectedMulti, setselectedMulti] = useState(null);
    const [selectedMulti2, setselectedMulti2] = useState(null);

    const [optionOwner, setOptionOwner] = useState([]);
    const [optionManager, setOptionManager] = useState([]);

    const [optionOwner0, setOptionOwner0] = useState([]);
    const [optionManager0, setOptionManager0] = useState([]);

    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);

    const getDetailInstructionData = useSelector(state => {
        //console.log("detail", state.instructionsReducer.respGetDetailInstruction);
        return state.instructionsReducer.respGetDetailInstruction;
    })


    useEffect(() => {

        if (getDetailInstructionData.status == "1") {

            getDetailInstructionData?.data?.instruction?.ownerList.map((ownerList) => {
                const newObj = {
                    value: ownerList.id,
                    label: ownerList.name,
                };
                setOptionOwner0((option) => [...option, newObj]);
            });

            getDetailInstructionData?.data?.instruction?.managerList.map((managerList) => {
                const newObj = {
                    value: managerList.id,
                    label: managerList.name,
                };
                setOptionManager0((option) => [...option, newObj]);
            });

        }
    }, [getDetailInstructionData])

    useEffect(() => {
        if (optionOwner0 != null && optionManager0 != null) {
            setselectedMulti(optionOwner0)
            setselectedMulti2(optionManager0)
        }
    }, [optionOwner0, optionManager0])

    useEffect(() => {
        setDetailInstructionsFirstRenderDone(true);
        dispatch(getUserList({}))
        dispatch(getDetailInstruction({}))

    }, [])

    useEffect(() => {
        if (props.appDetailInstructions) {

            // dispatch(getDetailInstruction({
            //     "insId": props.instructionsData.insId
            // }
            // ));


            detailInstructionsValidInput.setFieldValue("insId", props.instructionsData?.insId)
            detailInstructionsValidInput.setFieldValue("insTitle", props.instructionsData?.insTitle)
            detailInstructionsValidInput.setFieldValue("insDate", props.instructionsData?.insDate)
            detailInstructionsValidInput.setFieldValue("insStatus", props.instructionsData?.insStatus)
            detailInstructionsValidInput.setFieldValue("descriptions", props.instructionsData?.descriptions)

            setStartDate(format(currentDate, 'yyyy-MM-dd'))

            if (getDetailInstructionData?.data !== undefined) {

                getDetailInstructionData?.data?.ownerList.map((data) => {
                    const newObj = {
                        value: data.id,
                        label: data.name,

                    };
                    setOptionOwner((option) => [...option, newObj]);
                });

                getDetailInstructionData?.data?.managerList.map((data) => {
                    const newObj = {
                        value: data.id,
                        label: data.name,

                    };
                    setOptionManager((option) => [...option, newObj]);
                });

            }


        } else {
            dispatch(getDetailInstruction({}))
        }
    }, [props.appDetailInstructions])


    const insert = async (val) => {
        await dispatch(editInstructions(val));
    };

    const detailInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            num: '',
            title: '',
            insDate: '',
            status: '',
        },

        validationSchema: Yup.object().shape({
            num: Yup.string().required("Wajib diisi"),
            title: Yup.string().required("Wajib diisi"),
            insDate: Yup.string().required("Wajib diisi"),
            status: Yup.string().required("Wajib diisi"),
        }),


    });

    // const editInstructionsMessage = useSelector(state => {
    //     return state.instructionsReducer.msgEdit;
    // });

    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = (e) => {
        // --For Multiple File Input
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            fileori: file
                            //datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            //filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }


    const DeleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }

    }

    const FileUploadSubmit = async (e) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]
                })
            }
            SetSelectedFile([]);
        } else {
            alert('Please select file')
        }
    }


    const DeleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = Files.filter((data) => data.id !== id);
            SetFiles(result);
        } else {
            // alert('No');
        }
    }

    function handleMulti(s) {
        setselectedMulti(s);
    }

    function handleMulti2(s) {
        setselectedMulti2(s);
    }

    return (
        <Container style={{ display: props.appDetailInstructions ? 'block' : 'none' }} fluid="true">

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Detail Instructions</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    detailInstructionsValidInput.handleSubmit();
                                    return false;
                                }}
                            >

                                <FormGroup className="mb-0">

                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3 col-sm-6">
                                                <Label>Instruction ID</Label>
                                                <Input
                                                    name="insId"
                                                    type="text"
                                                    onChange={detailInstructionsValidInput.handleChange}
                                                    value={detailInstructionsValidInput.values.insId || ""}
                                                    invalid={
                                                        detailInstructionsValidInput.touched.insId && detailInstructionsValidInput.errors.insId ? true : false
                                                    }
                                                />
                                                {detailInstructionsValidInput.touched.insId && detailInstructionsValidInput.errors.insId ? (
                                                    <FormFeedback type="invalid">{detailInstructionsValidInput.errors.insId}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label>Title</Label>
                                                <Input
                                                    name="insTitle"
                                                    type="text"
                                                    onChange={detailInstructionsValidInput.handleChange}
                                                    value={detailInstructionsValidInput.values.insTitle || ""}
                                                    invalid={
                                                        detailInstructionsValidInput.touched.insTitle && detailInstructionsValidInput.errors.insTitle ? true : false
                                                    }
                                                />
                                                {detailInstructionsValidInput.touched.insTitle && detailInstructionsValidInput.errors.insTitle ? (
                                                    <FormFeedback type="invalid">{detailInstructionsValidInput.errors.insTitle}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label>
                                                    Instruction Date{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>

                                                <Input
                                                    name="insDate"
                                                    type="date"
                                                    onChange={detailInstructionsValidInput.handleChange}
                                                    value={detailInstructionsValidInput.values.insDate || startDate}
                                                    invalid={
                                                        detailInstructionsValidInput.touched.insDate && detailInstructionsValidInput.errors.insDate ? true : false
                                                    }
                                                />
                                                {detailInstructionsValidInput.touched.insDate && detailInstructionsValidInput.errors.insDate ? (
                                                    <FormFeedback type="invalid"> {detailInstructionsValidInput.errors.insDate} </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    type="select"
                                                    name="insStatus"
                                                    onChange={detailInstructionsValidInput.handleChange}
                                                    onBlur={detailInstructionsValidInput.handleBlur}
                                                    // fieldValue={1}
                                                    value={"Not Started"}
                                                    invalid={
                                                        detailInstructionsValidInput.touched.insStatus && detailInstructionsValidInput.errors.insStatus ? true : false
                                                    }
                                                >
                                                    <option></option>

                                                    <option id="1">Not Started</option>


                                                </Input>
                                                {detailInstructionsValidInput.touched.status && detailInstructionsValidInput.errors.status ? (
                                                    <FormFeedback type="invalid">{detailInstructionsValidInput.errors.status}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="descriptions"
                                                    type="textarea"
                                                    rows="5"
                                                    maxLength={50}
                                                    onChange={detailInstructionsValidInput.handleChange}
                                                    value={
                                                        detailInstructionsValidInput.values.descriptions ||
                                                        ""
                                                    }
                                                    invalid={
                                                        detailInstructionsValidInput.touched.descriptions &&
                                                            detailInstructionsValidInput.errors.descriptions
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {detailInstructionsValidInput.touched.descriptions &&
                                                    detailInstructionsValidInput.errors.descriptions ? (
                                                    <FormFeedback type="invalid">
                                                        {detailInstructionsValidInput.errors.descriptions}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3 col-sm-6">
                                                <Label> Choose Owner <span style={{ color: "red" }}>* </span></Label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti(e);
                                                    }}
                                                    options={optionOwner
                                                    }
                                                    className="select2-selection"
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <label>Choose Manager <span style={{ color: "red" }}>* </span></label>
                                                <Select
                                                    value={selectedMulti2}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti2(e);
                                                    }}
                                                    options={optionManager
                                                    }
                                                    className="select2-selection"
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <label>Upload Files <span style={{ color: "red" }}>* </span></label>

                                                {/* <Input
                                                            id="idFileUpload"
                                                            name="_file"
                                                            type="file"
                                                            // accept="xlsx/*"
                                                            onChange={(e) => detailInstructionsValidInput.setFieldValue("_file", e.target.files[0])}
                                                            invalid={
                                                                detailInstructionsValidInput.touched._file && detailInstructionsValidInput.errors._file ? true : false
                                                            }
                                                        />
                                                        <Button outline type="button" color="danger" onClick={() => { detailInstructionsValidInput.setFieldValue("_file", ""); document.getElementById('idFileUpload').value = null; }}>
                                                            <i className="mdi mdi-close-thick font-size-13 align-middle"></i>{" "}
                                                        </Button> */}
                                                {/* </div> */}

                                            </div>



                                        </Col>
                                    </Row>

                                    <br></br>

                                    {/* <Button color="primary" className="ms-1" type="submit">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan */}
                                    {/* <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                                    {/* </Button>&nbsp; */}

                                    {/* <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg("") }}
                                    >
                                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                        Kembali
                                    </Button> */}
                                </FormGroup>

                            </Form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Reply</CardHeader>

                        <CardBody>
                            <React.Fragment>
                                <FormGroup className="mb-0">
                                    <div className="row row-cols-2">
                                        <div className="col">
                                            <Row className="mb-2">
                                                <Col sm="12">
                                                    <div className="input-group">
                                                        <label className="col-sm-3" style={{ marginTop: "8px" }}>Answer</label>
                                                        <div className="col-sm-8">
                                                            <Input
                                                                name="permasalahan"
                                                                type="textarea"
                                                                disabled
                                                                onChange={detailInstructionsValidInput.handleChange}
                                                                value={detailInstructionsValidInput.values.permasalahan || ""}
                                                                invalid={
                                                                    detailInstructionsValidInput.touched.permasalahan && detailInstructionsValidInput.errors.permasalahan ? true : false
                                                                }
                                                            />
                                                            {detailInstructionsValidInput.touched.permasalahan && detailInstructionsValidInput.errors.permasalahan ? (
                                                                <FormFeedback type="invalid">{detailInstructionsValidInput.errors.permasalahan}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="col">
                                            <Row className="mb-2">
                                                <Col sm="12">
                                                    <div className="input-group">
                                                        <label className="col-sm-3" style={{ marginTop: "8px" }}>Attach File </label>
                                                        <div className="col-sm-8">
                                                            <Input
                                                                name="spkNo"
                                                                type="text"
                                                                disabled
                                                                onChange={detailInstructionsValidInput.handleChange}
                                                                value={detailInstructionsValidInput.values.spkNo || ""}
                                                                invalid={
                                                                    detailInstructionsValidInput.touched.spkNo && detailInstructionsValidInput.errors.spkNo ? true : false
                                                                }
                                                            />
                                                            {detailInstructionsValidInput.touched.spkNo && detailInstructionsValidInput.errors.spkNo ? (
                                                                <FormFeedback type="invalid">{detailInstructionsValidInput.errors.spkNo}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <Row className="mb-2">
                                            <Col md="12">
                                                <div className="text-sm-end" >

                                                    <Button
                                                        type="button"
                                                        className="btn btn-primary "
                                                        onClick={() => { props.setAppInstructionsPage(true); props.setAppDetailInstructions(false); props.setAppInstructionsMsg("") }}
                                                    >
                                                        {/* <i className="bx bx-arrow-back align-middle me-2"></i>{" "} */}
                                                        Reply
                                                    </Button>

                                                </div>
                                            </Col>
                                        </Row>

                                    </div>

                                    <Row style={{ marginTop: "30px" }}>
                                        <Col md="12">
                                            <Card>
                                                {/* <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Aspek Penilaian</CardHeader> */}
                                                <CardBody>
                                                    <Row>
                                                        <div>
                                                            {/* <TableCustom
                                                                keyField={"kegiatanAspekId"}
                                                                columns={app042p02TabelHasilTanamDetailColumns}
                                                                redukResponse={app042p02HasilTanamData}
                                                                appdata={app042p02HasilTanamData.data != null ? app042p02HasilTanamData.data.trckegtanam2 : []}
                                                                appdataTotal={app042p02HasilTanamData.data != null ? app042p02HasilTanamData.data.trckegtanamtot2 : 0}
                                                                searchSet={setApp042p02TabelSearch}
                                                                searchGet={app042p02TabelSearch}
                                                                redukCall={getHasilTanamDataDetail}
                                                            /> */}
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "10px" }}>
                                        <Col lg={12}>
                                            <Card>
                                                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Logs </CardHeader>
                                                <CardBody>
                                                    <Row>
                                                        <div>
                                                            {/* <TableCustom
                                                                keyField={"kegiatanKritId"}
                                                                columns={app042p02TabelHasilTanamDetail2Columns}
                                                                redukResponse={app042p02HasilTanamData2}
                                                                appdata={app042p02HasilTanamData2.data != null ? app042p02HasilTanamData2.data.trckegkriteria2 : []}
                                                                appdataTotal={app042p02HasilTanamData2.data != null ? app042p02HasilTanamData2.data.trckegkriteriatot2 : 0}
                                                                searchSet={setApp042p02TabelSearch}
                                                                searchGet={app042p02TabelSearch}
                                                                redukCall={getHasilTanamDataDetail2}
                                                            /> */}
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col md="12">
                                            <div className="text-sm-end" >

                                                <Button
                                                    type="button"
                                                    className="btn btn-danger "
                                                    onClick={() => { props.setAppInstructionsPage(true); props.setAppDetailInstructions(false); props.setAppInstructionsMsg("") }}
                                                >
                                                    <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                                    Kembali
                                                </Button>

                                            </div>
                                        </Col>
                                    </Row>

                                </FormGroup>
                            </React.Fragment>
                        </CardBody>

                    </Card>
                </Col>
            </Row>

        </Container>



    );


}

DetailInstructions.propTypes = {
    appDetailInstructions: PropTypes.any,
    setAppDetailInstructions: PropTypes.any,
    setAppInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    instructionsData: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,
}

export default DetailInstructions