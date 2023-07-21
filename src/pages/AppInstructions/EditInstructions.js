
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
    UncontrolledAlert
} from "reactstrap";
import { editInstructions, getDetailInstruction, saveDescription, saveReply, resetMessage, downloadFile, deleteReply } from "../../store/appInstructions/actions"
import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';
import Select from "react-select";
import shortid from "shortid";
import moment from "moment";
// import { values } from "lodash";
// import { arrayRemove, arrayRemoveAll } from "redux-form";

import axios from "axios";


const EditInstructions = (props) => {

    const dispatch = useDispatch();
    const currentDate = new Date();
    const [editInstructionMsg, setEditInstructionMsg] = useState("")
    const [startDate, setStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [editInstructionsSpinner, setEditInstructionsSpinner] = useState(false);
    const [editInstructionsFirstRenderDone, setEditInstructionsFirstRenderDone] = useState(false);
    let memberId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
    let pId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).pname : "";
    const [selectedMulti, setselectedMulti] = useState(null);
    const [selectedMulti2, setselectedMulti2] = useState(null);
    const [optionOwner, setOptionOwner] = useState([]);
    const [optionManager, setOptionManager] = useState([]);
    const [optionOwner0, setOptionOwner0] = useState([]);
    const [optionManager0, setOptionManager0] = useState([]);
    const [replyTabelListData, setReplyTabelListData] = useState([]);
    const [attchedFilesTables, setAttchedFilesTables] = useState([]);
    const [logTable, setLogTable] = useState([]);
    const [getSelectedFiles, setGetSelectedFiles] = useState([]);
    const [getFiles, setGetFiles] = useState([]);
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [Files2, SetFiles2] = useState([]);
    const [replyNum, setReplyNum] = useState([]);

    const getDetailInstructionData = useSelector(state => {
        // console.log("detail", state.instructionsReducer.respGetDetailInstruction);
        // console.log("array1", replyTabelListData);
        return state.instructionsReducer.respGetDetailInstruction;
    })

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])


    const editInstructionCloseAllert = () => {
        setEditInstructionMsg("")
    }

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    });

    useEffect(() => {

        if (getDetailInstructionData.data !== undefined && getDetailInstructionData.status == "1") {

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

            setReplyTabelListData(getDetailInstructionData?.data?.instruction?.replyList);

            setAttchedFilesTables(getDetailInstructionData?.data?.instruction?.attachFileList?.attachFileList);

            setLogTable(getDetailInstructionData?.data?.instruction?.logList)

            //SetFiles(getDetailInstructionData?.data?.instruction?.attachFileList)

            getDetailInstructionData?.data?.instruction?.attachFileList.map((attachFileList) => {
                const newObj = {

                    file_num: attachFileList.no,
                    filename: attachFileList.name,

                };

                setGetFiles((option) => [...option, newObj]);

                // SetFiles((option) => [...option, newObj]);

                SetFiles2((option) => [...option, newObj]);
            });

            getDetailInstructionData?.data?.instruction?.replyList.map((replyList) => {
                const objRply = {

                    reply_num: replyList.no
                };

                setReplyNum((option) => [...option, objRply])
            })

        }


    }, [getDetailInstructionData], []);


    useEffect(() => {
        if (optionOwner0 != null && optionManager0 != null) {
            setselectedMulti(optionOwner0)
            setselectedMulti2(optionManager0)
        }
    }, [optionOwner0, optionManager0], [])

    useEffect(() => {
        if (Files2 != null && Files2 != undefined) {
            SetFiles(Files2)
        }
    }, [Files2], [])

    useEffect(() => {
        if (replyNum != null && replyNum != undefined) {
            setReplyNum(replyNum)
        }
    }, [replyNum], [])


    useEffect(() => {
        setEditInstructionsFirstRenderDone(true);
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

    const insert = async (values) => {
        debugger
        await dispatch(editInstructions(values));
    };

    const insert2 = async (val) => {
        await dispatch(saveDescription(val));
    };

    const editInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            insId: '',
            descriptions: '',

        },

        validationSchema: Yup.object().shape({
            insId: Yup.string().required("Wajib diisi"),
            descriptions: Yup.string().required("Wajib diisi"),

        }),

        onSubmit: (val) => {

            var bodyForm = new FormData();
            debugger
            bodyForm.append('num', val.insId);
            bodyForm.append('description', val.descriptions);

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

    });

    const editInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgEdit;
    });

    function handleUploadFile(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.insId);


        if (selectedfile.length > 0) {


            for (let index = 0; index < selectedfile.length; index++) {

                let a = selectedfile[index];

                bodyForm.append('file' + index, selectedfile[index].fileori);

            }
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        insert(bodyForm, config);
    };


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
            //images.push((e.target.files[i]));
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

    // -- delete file attachded EDIT -- //

    const deleteFiles = async (values) => {
        debugger
        await dispatch(editInstructions(values));
    };

    function DeleteFileAttached(file_num) {
        var bodyForm = new FormData();
        bodyForm.append('num', editInstructionsValidInput.values.insId);
        bodyForm.append('removeFile', file_num);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(bodyForm);

        deleteFiles(bodyForm, config);
    };

    // const replyDelete = async (row) => {
    //     debugger
    //     console.log(row);
    //     try {
    //         debugger
    //         var map = {
    //             "reply_num": row.no
    //         };
    //         console.log('map', map);

    //         setEditInstructionsSpinner(true);
    //         setEditInstructionMsg("")

    //         await dispatch(deleteReply(map));

    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    // const downloadFiles = (url, filename) => {
    //     axios.post(url, {
    //       responseType: 'blob',
    //     })
    //     .then((res) => {
    //         downloadFile(res.data, filename)
    //     })
    //   }

    // const downloadFiles = (file_num) => {
	// 	fetch('http://localhost:8080/employees/download')
	// 		.then(response => {
	// 			response.blob().then(blob => {
	// 				let url = window.URL.createObjectURL(blob);
	// 				let a = document.createElement('a');
	// 				a.href = url;
	// 				a.download = 'employees.json';
	// 				a.click();
	// 			});
	// 			//window.location.href = response.url;
	// 	});
	// }

    // const downloadFiles = async (file_num) => {
    //     debugger
    //     console.log(file_num);

    //     try {
    //     var map = {
    //         'file_num': file_num
    //     };
    //     console.log('map', map);


    //     // setEditInstructionsSpinner(true);
    //     // setEditInstructionMsg("")
    //     await dispatch(downloadFile(map));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    // -- end -- //
    function handleMulti(s) {
        debugger

        var id1 = "";
        if (selectedMulti.length < s.length) {

            console.log('1 : ' + s.value)



            console.log(' id : ', id1)

            var jml = 0;

            jml = s.length


            var bodyForm = new FormData();
            debugger
            bodyForm.append('num', editInstructionsValidInput.values.insId);

            debugger
            console.log(selectedMulti)

            if (jml > 1) {
                for (let i = 0; i < s.length; i++) {
                    if (i == s.length - 1) {
                        debugger
                        id1 = s[s.length - 1].value
                        //console.log('2 :' + s[s.length - 1].value)
                        bodyForm.append('addUser', id1);
                    }
                }
                //jml = s.length -1
            } else {
                s.map((data, index) => {
                    bodyForm.append('addUser', data.value);
                })
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            console.log(bodyForm);
            insert(bodyForm, config);

        } else {

            var bodyForm = new FormData();
            debugger
            bodyForm.append('num', editInstructionsValidInput.values.insId);


            var jml = 0;

            jml = s.length

            if (jml > 1) {
                for (let i = 0; i < s.length; i++) {
                    if (i == s.length - 1) {
                        debugger
                        id1 = s[s.length - 1].value
                        //console.log('2 :' + s[s.length - 1].value)
                        bodyForm.append('removeUser', id1);
                    }
                }

            } else {
                s.map((data, index) => {
                    bodyForm.append('removeUser', data.value);
                })
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            insert(bodyForm, config);

        }

        setselectedMulti(s);


    }

    function handleMulti2(s) {

        var id2 = "";
        if (selectedMulti2.length < s.length) {

            console.log('1 : ' + s.value)

            console.log(' id : ', id2)

            var jml2 = 0;

            jml2 = s.length


            var bodyForm = new FormData();
            debugger
            bodyForm.append('num', editInstructionsValidInput.values.insId);

            debugger
            console.log(selectedMulti)

            if (jml2 > 1) {
                for (let i = 0; i < s.length; i++) {
                    if (i == s.length - 1) {
                        debugger
                        id2 = s[s.length - 1].value
                        //console.log('2 :' + s[s.length - 1].value)
                        bodyForm.append('addUser', id2);
                    }
                }
                //jml = s.length -1
            } else {
                s.map((data, index) => {
                    bodyForm.append('addUser', data.value);
                })
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            console.log(bodyForm);
            insert(bodyForm, config);

        } else {

            var bodyForm = new FormData();
            debugger
            bodyForm.append('num', editInstructionsValidInput.values.insId);


            var jml2 = 0;

            jml2 = s.length

            if (jml2 > 1) {
                for (let i = 0; i < s.length; i++) {
                    if (i == s.length - 1) {
                        debugger
                        id2 = s[s.length - 1].value
                        //console.log('2 :' + s[s.length - 1].value)
                        bodyForm.append('removeUser', id2);
                    }
                }

            } else {
                s.map((data, index) => {
                    bodyForm.append('removeUser', data.value);
                })
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            insert(bodyForm, config);

        }

        setselectedMulti2(s);


    }

    function handleAutoSaveTitle(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.insId);
        bodyForm.append('title', editInstructionsValidInput.values.insTitle);


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
        // dispatch(editInstructions(values));

    }

    function handleAutoSaveDate(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.insId);
        bodyForm.append('insDate', editInstructionsValidInput.values.insDate);


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
        // dispatch(editInstructions(values));

    }

    function handleAutoSaveStatus(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.insId);
        bodyForm.append('status', editInstructionsValidInput.values.statusId);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        insert(bodyForm, config);
        // dispatch(editInstructions(values));

    }

    const FileUploadSubmitD = async (e) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (getSelectedFiles.length > 0) {
            for (let index = 0; index < getSelectedFiles.length; index++) {
                setGetFiles((preValue) => {
                    return [
                        ...preValue,
                        getSelectedFiles[index]
                    ]
                })
            }
            setGetSelectedFiles([]);
        } else {
            setGetSelectedFiles("kosong")
        }

    }


    // -- Replies area -- //


    const [selectedfileR, SetSelectedFileR] = useState([]);
    const [FilesR, SetFilesR] = useState([]);


    const InputChangeR = (e) => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFileR((preValue) => {
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

    const DeleteSelectFileR = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfileR.filter((data) => data.id !== id);
            SetSelectedFileR(result);
        } else {
            // alert('No');
        }

    }

    const FileUploadSubmitR = async (e) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (selectedfileR.length > 0) {
            for (let index = 0; index < selectedfileR.length; index++) {
                SetFilesR((preValue) => {
                    return [
                        ...preValue,
                        selectedfileR[index]
                    ]
                })
            }
            SetSelectedFileR([]);
        } else {
            alert('Please select file')
        }

    }

    const DeleteFileR = async (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = Files.filter((data) => data.id !== id);
            SetFilesR(result);
        } else {
            // alert('No');
        }
    }

    const insert3 = async (values) => {

        await dispatch(saveReply(values));
    };

    function insertReplyAndFiles(values) {

        var bodyForm = new FormData();

        bodyForm.append('instruction_num', editInstructionsValidInput.values.insId);
        bodyForm.append('content', editInstructionsValidInput.values.content);

        if (selectedfileR.length > 0) {

            for (let index = 0; index < selectedfileR.length; index++) {

                let a = selectedfileR[index];

                bodyForm.append('file' + index, selectedfileR[index].fileori);

            }
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }


        insert3(bodyForm, config);
        //window.location.reload();
        

    };

    // Reply tables functions //

    const replyDelete = async (row) => {
        debugger
        console.log(row);
        try {
            debugger
            var map = {
                "reply_num": row.no
            };
            console.log('map', map);

            setEditInstructionsSpinner(true);
            setEditInstructionMsg("")

            await dispatch(deleteReply(map));

        } catch (error) {
            console.log(error)
        }
    };


    // end function //

    return (
        <React.Fragment>
            <div className="page-content">
                {editInstructionMsg !== "" ? <UncontrolledAlert toggle={editInstructionCloseAllert} color={editInstructionMsg.status == "1" ? "success" : "danger"}>
                    {typeof editInstructionMsg == 'string' ? editInstructionMsg : editInstructionMsg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null}

                <Container style={{ display: props.appEditInstructions ? 'block' : 'none' }} fluid={true}>

                    <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit == undefined || getDetailInstructionData?.data?.instruction?.edit == null || getDetailInstructionData?.data?.instruction?.memberId != memberId ? 'none' : 'flex' }}>
                        <Col lg={12}>
                            <Card>
                                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Edit Instructions</CardHeader>
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
                                                            //onBlur={handleAutoSaveUsers}
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
                                                            //onBlur={handleAutoSaveUsers}
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
                                                                                    <span><i className="fas fa-paperclip" />&nbsp;{filename}</span>
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
                                                            <div className="kb-buttons-box">
                                                                <button onClick={() => handleUploadFile()} className="btn btn-primary form-submit">Upload</button>
                                                            </div>
                                                        </Form>
                                                        {Files.length > 0 ?
                                                            <div className="kb-attach-box">
                                                                <hr />
                                                                <h6>Recent files uploaded</h6>
                                                                {
                                                                    Files.map((data, index) => {
                                                                        const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                        return (
                                                                            <div className="file-atc-box" key={index}>
                                                                                {
                                                                                    filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                        <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                                        <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                                                }
                                                                                <div className="file-detail">
                                                                                    <h6><i className="fas fa-paperclip" />&nbsp;{filename}</h6>
                                                                                    {/* <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p> */}
                                                                                    <div className="file-actions">
                                                                                        <a href={fileimage} className="file-action-btn" onClick={() => DeleteFileAttached(file_num)}>Delete</a>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <a href={fileimage} className="file-action-btn" download={filename} onClick={() => downloadFiles(file_num)}>Download</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            : ''}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <br></br>

                                            <Button color="primary" className="ms-1" type="submit">
                                                {/* <i className="bx bxs-save align-middle me-2"></i>{" "} */}
                                                Save
                                                {/* <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                                            </Button>&nbsp;

                                        </FormGroup>

                                    </Form>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit == undefined || getDetailInstructionData?.data?.instruction?.edit == null || getDetailInstructionData?.data?.instruction?.memberId == memberId ? 'none' : 'flex' }}>
                        <Col lg={12}>
                            <Card>
                                <CardHeader style={{ borderRadius: "15px 15px 0 0" }} ><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Detail Instructions</CardHeader>
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
                                                            disabled
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
                                                            disabled
                                                            name="insTitle"
                                                            type="text"
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

                                                        </Label>

                                                        <Input
                                                            disabled
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
                                                        <Label> Status </Label>
                                                        <Input
                                                            disabled
                                                            type="select"
                                                            name="statusId"
                                                            onChange={editInstructionsValidInput.handleChange}
                                                            onBlur={() => {
                                                                editInstructionsValidInput.handleBlur;
                                                                handleAutoSaveStatus();
                                                            }}
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

                                                        </Input>
                                                        {editInstructionsValidInput.touched.statusId && editInstructionsValidInput.errors.statusId ? (
                                                            <FormFeedback type="invalid">{editInstructionsValidInput.errors.statusId}</FormFeedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3 col-sm-6">
                                                        <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions</Label>
                                                        <Input
                                                            disabled
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
                                                        <Label> Choose Owner</Label>
                                                        <Select
                                                            isDisabled={true}
                                                            value={selectedMulti}
                                                            isMulti={true}
                                                            className="select2-selection"
                                                        />
                                                    </div>

                                                    <div className="mb-3 col-sm-6">
                                                        <label>Choose Manager </label>
                                                        <Select
                                                            isDisabled={true}
                                                            value={selectedMulti2}
                                                            isMulti={true}
                                                            className="select2-selection"
                                                        />
                                                    </div>

                                                    <div className="mb-3 col-sm-6">
                                                        <label>Attached Files </label>

                                                        <Form onSubmit={FileUploadSubmit}>

                                                        </Form>
                                                        {getFiles.length > 0 ?
                                                            <div className="kb-attach-box">
                                                                {
                                                                    getFiles.map((data, index) => {
                                                                        const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                        return (
                                                                            <div className="file-atc-box" key={index}>
                                                                                {
                                                                                    filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                        <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                                        <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                                                }
                                                                                <div className="file-detail">
                                                                                    <h6><i className="fas fa-paperclip" />&nbsp;{filename}</h6>

                                                                                    <div className="file-actions">
                                                                                        {/* <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button> */}
                                                                                        <a href={fileimage} className="file-action-btn" download={filename} onClick={() => downloadFiles(file_num)}>Download</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            : ''}
                                                    </div>

                                                </Col>
                                            </Row>

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
                                                                <div className="col-sm-8">
                                                                    <label>Answer </label>
                                                                    <Input
                                                                        name="content"
                                                                        type="textarea"
                                                                        onChange={editInstructionsValidInput.handleChange}
                                                                        value={editInstructionsValidInput.values.content || ""}
                                                                        invalid={
                                                                            editInstructionsValidInput.touched.content && editInstructionsValidInput.errors.content ? true : false
                                                                        }
                                                                    />
                                                                    {editInstructionsValidInput.touched.content && editInstructionsValidInput.errors.content ? (
                                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.content}</FormFeedback>
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
                                                                <div className="col-sm-8">
                                                                    <div className="mb-3 col-sm-6">
                                                                        <label>Attached Files </label>

                                                                        <Form onSubmit={FileUploadSubmitR}>
                                                                            <div className="kb-file-upload">
                                                                                <div className="file-upload-box">
                                                                                    <input type="file" id="fileupload3" className="file-upload-input" onChange={InputChangeR} name="removeFile" multiple />
                                                                                </div>
                                                                            </div>
                                                                            <div className="kb-attach-box mb-3">
                                                                                {
                                                                                    selectedfileR.map((data, index) => {
                                                                                        const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                                        return (
                                                                                            <div className="file-atc-box" key={id}>

                                                                                                {
                                                                                                    filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                                        <div className="file-image"> <img src={fileimage} alt="" /></div>
                                                                                                        :
                                                                                                        <div className="file-image"><i className="fas fa-file-alt" /></div>
                                                                                                }
                                                                                                <div className="file-detail">
                                                                                                    <span><i className="fas fa-paperclip" />&nbsp;{filename}</span>
                                                                                                    {/* <p></p> */}
                                                                                                    {/* <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p> */}
                                                                                                    <div className="file-actions">
                                                                                                        <button type="button" className="file-action-btn" onClick={() => DeleteSelectFileR(id)}>Delete</button>
                                                                                                    </div>
                                                                                                    <p />
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>

                                                                        </Form>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col md="12">
                                                            <div className="text-sm-end" >

                                                                <Button
                                                                    type="button"

                                                                    color="primary"
                                                                    className="ms-1"
                                                                    onClick={() => { insertReplyAndFiles() }}
                                                                >
                                                                    {/* <i className="bx bx-arrow-back align-middle me-2"></i>{" "} */}
                                                                    Reply
                                                                </Button>

                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>

                                            </div>
                                            <br />
                                            <Row>
                                                <hr />
                                                <h6> Other Replies</h6>
                                            </Row>
                                            <Row style={{ marginTop: "30px" }}>
                                                <Col md="12">
                                                    <Card>

                                                        <CardBody>
                                                            <Row>

                                                                <table className="tg"
                                                                    style={{ marginTop: "10px" }}
                                                                >
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="tg-0lax">Name</th>
                                                                            <th className="tg-0lax">Reply</th>
                                                                            <th className="tg-0lax">Time</th>
                                                                            <th className="tg-0lax">Attached Files</th>
                                                                            <th className="tg-0lax"></th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="replyTabelList">

                                                                        {

                                                                            replyTabelListData != null && replyTabelListData.length > 0 && replyTabelListData.map((row, reply_num) =>


                                                                                <>
                                                                                    <tr key={row.no} style={{ verticalAlign: "text-top" }}>
                                                                                        <td className="tg-0lax" >

                                                                                        {row.name}

                                                                                        </td>
                                                                                        <td className="tg-0lax" >

                                                                                      
                                                                                            {row.content}

                                                                                            <p />
                                                                                            {row.edit ? <a href="/">Edit</a> : ''}&nbsp;&nbsp;&nbsp;{row.delete ? <a href="/" onClick={() => { replyDelete(row) }}>Delete</a> : ''}
                                                                                        </td>
                                                                                        <td className="tg-0lax" >{row.write_time === ' ' || row.write_time === '' ? '' : moment(row.write_time).format('yyyy-MM-DD hh:mm')}</td>
                                                                                        <td className="tg-0lax" >{row.attachFileList.length > 0 ? row.attachFileList[0].name : ''}&nbsp;({row.attachFileList.length})</td>
                                                                                        <td className="tg-0lax" align="left"> {row.delete ? <i className="fas fa-file-download" onClick={() => { replyDelete(row.no) }} /> : ''}</td>
                                                                                        {/* <td className="tg-0lax" align="right">{row.delete ? <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app027p01Delete(app027p01SpkData)} /> : ''}</td> */}
                                                                                    </tr>
                                                                                </>

                                                                            )
                                                                        }
                                                                    </tbody>
                                                                </table>

                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </FormGroup>
                                    </React.Fragment>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit == undefined || getDetailInstructionData?.data?.instruction?.edit == null || pId !== 'admin' ? 'none' : 'flex' }}>

                        <Col lg={12}>
                            <Card>
                                <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-list-check font-size-18 align-middle me-2"></i> Logs</CardHeader>

                                <CardBody>
                                    <React.Fragment>
                                        <FormGroup className="mb-0">

                                            <Row style={{ marginTop: "30px" }}>
                                                <Col md="12">
                                                    <Card>

                                                        <CardBody>
                                                            <Row>

                                                                <table className="tg"
                                                                    style={{ marginTop: "10px" }}
                                                                >
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="tg-0lax"></th>
                                                                            <th className="tg-0lax"></th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="logTabelList">

                                                                        {
                                                                            logTable != null && logTable.length > 0 && logTable.map((row, logs) =>
                                                                                <>
                                                                                    <tr key={logs}>
                                                                                        <td className="tg-0lax" >{row.content}</td>
                                                                                        <td className="tg-0lax" >{row.write_time === ' ' || row.write_time === '' ? '' : moment(row.write_time).format('yyyy-MM-DD hh:mm')}</td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </tbody>
                                                                </table>

                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </FormGroup>

                                    </React.Fragment>

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
                                    onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg(""); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); window.location.reload(); }}
                                >
                                    <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                    Kembali
                                </Button>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
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