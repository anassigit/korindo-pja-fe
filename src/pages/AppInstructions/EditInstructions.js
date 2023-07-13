
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
import { getInstructionsData, editInstructions, getUserList, getDetailInstruction, saveDescription } from "../../store/appInstructions/actions"
import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';
import Select from "react-select";
import shortid from "shortid";

const EditInstructions = (props) => {

    const dispatch = useDispatch();
    const currentDate = new Date()
    const [startDate, setStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [editInstructionsSpinner, setEditInstructionsSpinner] = useState(false);
    const [editInstructionsFirstRenderDone, setEditInstructionsFirstRenderDone] = useState(false);
    const [selectedMulti, setselectedMulti] = useState(null);
    const [selectedMulti2, setselectedMulti2] = useState(null);

    const [optionOwner, setOptionOwner] = useState([]);
    const [optionManager, setOptionManager] = useState([]);

    const [optionOwner0, setOptionOwner0] = useState([]);
    const [optionManager0, setOptionManager0] = useState([]);

    const [statusList, setStatusList] = useState([]);

    const [updTitle, setUpdTitle] = useState([]);

    const [selectedfile2, SetSelectedFile2] = useState([]);
    const [Files2, SetFiles2] = useState([]);
    const [isiFile, setIsiFile] = useState([]);

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

        if (getDetailInstructionData.data !== undefined && getDetailInstructionData.status == "1" ) {

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

        if (getDetailInstructionData.data !== undefined && getDetailInstructionData.status == "1" ) {

            getDetailInstructionData?.data?.instruction?.attachFileList.map((attachFileList) => {
                const newObj = {
                    no: attachFileList.no,
                    name: attachFileList.name,
    
                };
                SetSelectedFile2((option) => [...option, newObj]);
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
        if (Files2 != null && Files2 != null) {
            SetSelectedFile2(Files2)
            console.log("files", Files2)

        }
    }, [Files2])

    useEffect(() => {
        setEditInstructionsFirstRenderDone(true);
        dispatch(getUserList({}))
        dispatch(getDetailInstruction({}))

    }, [])

    useEffect(() => {
        if (props.appEditInstructions) {
            dispatch(getDetailInstruction({
                "num": props.instructionsData.insId
            }
            ));
            editInstructionsValidInput.setFieldValue("insId", props.instructionsData?.insId)
            editInstructionsValidInput.setFieldValue("insTitle", props.instructionsData?.insTitle)
            editInstructionsValidInput.setFieldValue("insDate", props.instructionsData?.insDate)
            editInstructionsValidInput.setFieldValue("statusId", props.instructionsData?.statusId)
            editInstructionsValidInput.setFieldValue("descriptions", props.instructionsData?.descriptions)

            setStartDate(format(currentDate, 'yyyy-MM-dd'))

        } else {
            dispatch(getDetailInstruction({}))
        }
    }, [props.appEditInstructions])

    const editInstructionsUserList = useSelector(state => {
        // console.log(state.instructionsReducer.respGetUserList.data);
        return state.instructionsReducer.respGetUserList;
    });

    const insert = async (values) => {
        await dispatch(editInstructions(values));
    };

    const insert2 = async (val) => {
        await dispatch(saveDescription(val));
    };

    const editInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            insId: '',
            title: '',
            insDate: '',
            statusId: '',
            descriptions: '',

        },

        validationSchema: Yup.object().shape({
            insId: Yup.string().required("Wajib diisi"),
            title: Yup.string().required("Wajib diisi"),
            insDate: Yup.string().required("Wajib diisi"),
            statusId: Yup.string().required("Wajib diisi"),
            descriptions: Yup.string().required("Wajib diisi"),

        }),

        onSubmit: (val) => {

            var bodyForm = new FormData();
            debugger
            bodyForm.append('insId', val.insId);
            bodyForm.append('description', val.descriptions);

            // selectedMulti.map((data, index) => {

            //     bodyForm.append('addUser', data.value);

            // })
            // selectedMulti2.map((data, index) => {

            //     bodyForm.append('addUser', data.value);

            // })

            // if (selectedfile.length > 0) {

            //     for (let index = 0; index < selectedfile.length; index++) {
            //         debugger
            //         let a = selectedfile[index];

            //         bodyForm.append('file' + index, selectedfile[index].fileori);

            //     }
            // }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            setEditInstructionsSpinner(true);
            // props.setAppInstructionsPage(true);
            props.setEditInstructions(true);
            insert2(bodyForm, config);
            //props.setAppInstructionsMsg(appAddInstructionsMessage);

        }

        // onSubmit: (values) => {
        //     setEditInstructionsSpinner(true);
        //     props.setAppInstructionsMsg("")
        //     dispatch(editInstructions(values));
        // }
    });

    const editInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgEdit;
    });

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
                }) 

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

    function handleAutoSaveTitle (values) {

        var bodyForm = new FormData();
    //   debugger
        bodyForm.append('num', editInstructionsValidInput.values.insId );
        bodyForm.append('title', editInstructionsValidInput.values.insTitle);

        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
            // dispatch(editInstructions(values));
        
    }

    function handleAutoSaveDate (values) {

        var bodyForm = new FormData();
    //   debugger
        bodyForm.append('num', editInstructionsValidInput.values.insId );
        bodyForm.append('insDate', editInstructionsValidInput.values.insDate);

        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
            // dispatch(editInstructions(values));
        
    }

    function handleAutoSaveStatus (values) {

        var bodyForm = new FormData();
      debugger
        bodyForm.append('num', editInstructionsValidInput.values.insId );
        bodyForm.append('status', editInstructionsValidInput.values.statusId);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
            // dispatch(editInstructions(values));
        
    }
    
    

    return (
        <Container style={{ display: props.appEditInstructions ? 'block' : 'none' }} fluid={true}>

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Edit Instructions</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    editInstructionsValidInput.handleSubmit();
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
                                                    onChange={editInstructionsValidInput.handleChange}
                                                    value={editInstructionsValidInput.values.insId || ""}
                                                    invalid={
                                                        editInstructionsValidInput.touched.insId && editInstructionsValidInput.errors.insId ? true : false
                                                    }
                                                />
                                                {editInstructionsValidInput.touched.insId && editInstructionsValidInput.errors.insId ? (
                                                    <FormFeedback type="invalid">{editInstructionsValidInput.errors.insId}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label>Title</Label>
                                                <Input
                                                    name="insTitle"
                                                    type="text"
                                                    // onChange={(editInstructionsValidInput.handleChange) => {
                                                    //     handleUpdTitle
                                                    // }}
                                                    onChange={editInstructionsValidInput.handleChange}
                                                    onBlur={handleAutoSaveTitle}
                                                    value={editInstructionsValidInput.values.insTitle || ""}
                                                    invalid={
                                                        editInstructionsValidInput.touched.insTitle && editInstructionsValidInput.errors.insTitle ? true : false
                                                    }
                                                />
                                                {editInstructionsValidInput.touched.insTitle && editInstructionsValidInput.errors.insTitle ? (
                                                    <FormFeedback type="invalid">{editInstructionsValidInput.errors.insTitle}</FormFeedback>
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
                                                    onChange={editInstructionsValidInput.handleChange}
                                                    onBlur={handleAutoSaveDate}
                                                    value={editInstructionsValidInput.values.insDate || startDate}
                                                    invalid={
                                                        editInstructionsValidInput.touched.insDate && editInstructionsValidInput.errors.insDate ? true : false
                                                    }
                                                />
                                                {editInstructionsValidInput.touched.insDate && editInstructionsValidInput.errors.insDate ? (
                                                    <FormFeedback type="invalid"> {editInstructionsValidInput.errors.insDate} </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    type="select"
                                                    name="statusId"
                                                    onChange={editInstructionsValidInput.handleChange}
                                                    // onBlur={editInstructionsValidInput.handleBlur}
                                                    onBlur={() => { 
                                                        editInstructionsValidInput.handleBlur; 
                                                        handleAutoSaveStatus();
                                                    }}
                                                    // onBlur={handleAutoSaveStatus}
                                                    // fieldValue={1}
                                                    value={editInstructionsValidInput.values.statusId || ""}
                                                    invalid={
                                                        editInstructionsValidInput.touched.statusId && editInstructionsValidInput.errors.statusId ? true : false
                                                    }
                                                >
                                                    <option no="" value={""}></option>
                                                    <option value={"1"}>Not Start</option>
                                                    <option value={"2"}>In Progress</option>
                                                    <option value={"3"}>Action Completed</option>
                                                    <option value={"4"}>Rejection</option>
                                                    <option value={"5"}>Complete</option>
                                                    {/* {
                                                    selectStatus.dtlsetting?.map((value, key) =>
                                                    <option key={key} value={value.no}>{value.name}</option>)
                                                    } */}

                                                </Input>
                                                {editInstructionsValidInput.touched.statusId && editInstructionsValidInput.errors.statusId ? (
                                                    <FormFeedback type="invalid">{editInstructionsValidInput.errors.statusId}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-6">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="descriptions"
                                                    type="textarea"
                                                    rows="5"
                                                    maxLength={50}
                                                    onChange={editInstructionsValidInput.handleChange}
                                                    value={
                                                        editInstructionsValidInput.values.descriptions ||
                                                        ""
                                                    }
                                                    invalid={
                                                        editInstructionsValidInput.touched.descriptions &&
                                                            editInstructionsValidInput.errors.descriptions
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {editInstructionsValidInput.touched.descriptions &&
                                                    editInstructionsValidInput.errors.descriptions ? (
                                                    <FormFeedback type="invalid">
                                                        {editInstructionsValidInput.errors.descriptions}
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
                                                <label>Attached Files <span style={{ color: "red" }}>* </span></label>

                                                <Form onSubmit={FileUploadSubmit}>
                                                    <div className="kb-file-upload">
                                                        <div className="file-upload-box">
                                                            <input type="file" id="fileupload2" className="file-upload-input" onChange={InputChange} name="removeFile" multiple />
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
                                                            onChange={(e) => editInstructionsValidInput.setFieldValue("_file", e.target.files[0])}
                                                            invalid={
                                                                editInstructionsValidInput.touched._file && editInstructionsValidInput.errors._file ? true : false
                                                            }
                                                        />
                                                        <Button outline type="button" color="danger" onClick={() => { editInstructionsValidInput.setFieldValue("_file", ""); document.getElementById('idFileUpload').value = null; }}>
                                                            <i className="mdi mdi-close-thick font-size-13 align-middle"></i>{" "}
                                                        </Button> */}
                                                {/* </div> */}

                                            </div>



                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Button color="primary" className="ms-1" type="submit">
                                        {/* <i className="bx bxs-save align-middle me-2"></i>{" "} */}
                                        Save
                                        {/* <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                                    </Button>&nbsp;

                                    {/* <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg(""); setOptionManager0([]); setOptionOwner0([])}}
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
                        <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Reply</CardHeader>

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
                                                                onChange={editInstructionsValidInput.handleChange}
                                                                value={editInstructionsValidInput.values.permasalahan || ""}
                                                                invalid={
                                                                    editInstructionsValidInput.touched.permasalahan && editInstructionsValidInput.errors.permasalahan ? true : false
                                                                }
                                                            />
                                                            {editInstructionsValidInput.touched.permasalahan && editInstructionsValidInput.errors.permasalahan ? (
                                                                <FormFeedback type="invalid">{editInstructionsValidInput.errors.permasalahan}</FormFeedback>
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
                                                                onChange={editInstructionsValidInput.handleChange}
                                                                value={editInstructionsValidInput.values.spkNo || ""}
                                                                invalid={
                                                                    editInstructionsValidInput.touched.spkNo && editInstructionsValidInput.errors.spkNo ? true : false
                                                                }
                                                            />
                                                            {editInstructionsValidInput.touched.spkNo && editInstructionsValidInput.errors.spkNo ? (
                                                                <FormFeedback type="invalid">{editInstructionsValidInput.errors.spkNo}</FormFeedback>
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
                                                    onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg("") }}
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
                                                {/* <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Aspek Penilaian</CardHeader> */}
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
                                                <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Logs </CardHeader>
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
                                                    onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg(""); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); window.location.reload();}}
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
EditInstructions.propTypes = {
    appEditInstructions: PropTypes.any,
    setEditInstructions: PropTypes.any,
    setAppInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    instructionsData: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,
}
export default EditInstructions