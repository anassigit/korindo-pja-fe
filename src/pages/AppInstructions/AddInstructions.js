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
import { getInstructionsData, saveInstructions, getUserList } from "../../store/appInstructions/actions";
import { useSelector, useDispatch } from "react-redux"
import { formatRpAfterInput, replaceAll } from '../../common/Regex'
import { getCombo } from "../../store/combo/actions"
// import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';
import images from "assets/images";
import Select from "react-select";

import shortid from "shortid";


const AddInstructions = (props) => {

    const dispatch = useDispatch();

    const currentDate = new Date()
    const [addInstructionsStartDate, setAddInstructionsStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    let status = 1;

    const [addInstructionsFirstRenderDone, setAddInstructionsFirstRenderDone] = useState(false);
    const [addInstructionsSpinner, setAddInstructionsSpinner] = useState(false);
    const [selectedMulti, setselectedMulti] = useState(null);

    useEffect(() => {
        setAddInstructionsFirstRenderDone(true);
        dispatch(getUserList({}))
    }, [])

    

    useEffect(() => {
        if (props.appAddInstructions) {
            addInstructionsValidInput.resetForm()
            addInstructionsValidInput.setFieldValue("status", status)
            setAddInstructionsStartDate(format(currentDate, 'yyyy-MM-dd'))

        }
    }, [props.appAddInstructions])

    const addInstructionsUserList = useSelector(state => {
        console.log(state.instructionsReducer.respGetUserList.data);
        return state.instructionsReducer.respGetUserList;
    });

    const insert = async (val) => {
        await dispatch(saveInstructions(val));
    };

    const addInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: '',
            insDate: '',
            status: '',
            desciption: '',
            // user: '',
            // _file: '',
        },

        validationSchema: Yup.object().shape({
            title: Yup.string().required("Wajib diisi"),
            desciption: Yup.string().required("Wajib diisi"),
            // user: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (val) => {

            var bodyForm = new FormData();
            debugger
            bodyForm.append('title', val.title);
            bodyForm.append('insDate', val.insDate);
            bodyForm.append('status', val.status);
            bodyForm.append('desciption', val.desciption);
            if (selectedfile.length > 0) {

                for (let index = 0; index < selectedfile.length; index++) {
                    debugger
                    let a = selectedfile[index];

                    bodyForm.append('file' + index, selectedfile[index].fileori);

                }
            }
            debugger
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            setAddInstructionsSpinner(true);
            props.setAppInstructionsPage(true);
            props.setAppAddInstructions(false);
            insert(bodyForm, config);
            props.setAppInstructionsMsg(appAddInstructionsMessage);

        }
        // onSubmit: (values) => {
        //     velues.ownerList = selectedMulti;
        //     setAddInstructionsSpinner(true);
        //     props.setAppInstructionsMsg("")
        //     dispatch(saveInstructions(values));
        // }
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


    ///

    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);


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
                                }}
                            >

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
                                                    name="insDate"
                                                    type="date"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.insDate || addInstructionsStartDate}
                                                    invalid={
                                                        addInstructionsValidInput.touched.insDate && addInstructionsValidInput.errors.insDate ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.insDate && addInstructionsValidInput.errors.insDate ? (
                                                    <FormFeedback type="invalid"> {addInstructionsValidInput.errors.insDate} </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    type="select"
                                                    name="status"
                                                    disabled
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    onBlur={addInstructionsValidInput.handleBlur}
                                                    // fieldValue={1}
                                                    value={"Not Started"}
                                                    invalid={
                                                        addInstructionsValidInput.touched.status && addInstructionsValidInput.errors.status ? true : false
                                                    }
                                                >
                                                    <option></option>

                                                    <option id="1">Not Started</option>


                                                </Input>
                                                {addInstructionsValidInput.touched.status && addInstructionsValidInput.errors.status ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.status}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="desciption"
                                                    type="textarea"
                                                    rows="5"
                                                    maxLength={50}
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={
                                                        addInstructionsValidInput.values.desciption ||
                                                        ""
                                                    }
                                                    invalid={
                                                        addInstructionsValidInput.touched.desciption &&
                                                            addInstructionsValidInput.errors.desciption
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.desciption &&
                                                    addInstructionsValidInput.errors.desciption ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionsValidInput.errors.desciption}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3 col-sm-6">
                                                <Label> Choose Owner <span style={{ color: "red" }}>* </span></Label>
                                                <label className="control-label">
                                                    Role <span style={{ color: "red" }}>* </span>
                                                </label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti(e);
                                                    }}
                                                    options={
                                                        addInstructionsUserList.data != null ? addInstructionsUserList.data.options : null
                                                    }
                                                    className="select2-selection"
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <label>Choose Manager <span style={{ color: "red" }}>* </span></label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti(e);
                                                    }}
                                                    options={
                                                        addInstructionsUserList.data != null ? addInstructionsUserList.data.options : null
                                                    }
                                                    className="select2-selection"
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <label>Upload Files <span style={{ color: "red" }}>* </span></label>

                                                <Form onSubmit={FileUploadSubmit}>
                                                    <div className="kb-file-upload">
                                                        <div className="file-upload-box">
                                                            <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                                                        </div>
                                                    </div>
                                                    <div className="kb-attach-box mb-3">
                                                        {
                                                            selectedfile.map((data, index) => {
                                                                const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                return (
                                                                    <div className="file-atc-box" key={id}>
                                                                        {
                                                                            filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                                        }
                                                                        <div className="file-detail">
                                                                            <span>{filename}</span>
                                                                            {/* <p></p> */}
                                                                            {/* <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p> */}
                                                                            <div className="file-actions">
                                                                                <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                                                            </div>
                                                                            <p />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {/* <div className="kb-buttons-box">
                                                        <button type="submit" className="btn btn-primary form-submit">Upload</button>
                                                    </div> */}
                                                </Form>
                                                {Files.length > 0 ?
                                                    <div className="kb-attach-box">
                                                        <hr />
                                                        {
                                                            Files.map((data, index) => {
                                                                const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                return (
                                                                    <div className="file-atc-box" key={index}>
                                                                        {
                                                                            filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                                        }
                                                                        <div className="file-detail">
                                                                            <h6>{filename}</h6>
                                                                            <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                                            <div className="file-actions">
                                                                                <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button>
                                                                                <a href={fileimage} className="file-action-btn" download={filename}>Download</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    : ''}
                                                {/* <Input
                                                            id="idFileUpload"
                                                            name="_file"
                                                            type="file"
                                                            // accept="xlsx/*"
                                                            onChange={(e) => addInstructionsValidInput.setFieldValue("_file", e.target.files[0])}
                                                            invalid={
                                                                addInstructionsValidInput.touched._file && addInstructionsValidInput.errors._file ? true : false
                                                            }
                                                        />
                                                        <Button outline type="button" color="danger" onClick={() => { addInstructionsValidInput.setFieldValue("_file", ""); document.getElementById('idFileUpload').value = null; }}>
                                                            <i className="mdi mdi-close-thick font-size-13 align-middle"></i>{" "}
                                                        </Button> */}
                                                {/* </div> */}

                                            </div>



                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Button color="primary" className="ms-1" type="submit">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        {/* <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
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