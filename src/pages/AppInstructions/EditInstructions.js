
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import * as Yup from "yup";
import { deleteReply, downloadFile, editInstructions, resetMessage, saveDescription, saveReply } from "../../store/appInstructions/actions";
// import { getDetailInstruction } from "helpers/backend_helper"
import { getDetailInstruction } from "../../store/appInstructions/actions"


import { format } from 'date-fns';
import moment from "moment";
import { ReactSession } from 'react-client-session';
import Select, { components } from "react-select";
import shortid from "shortid";
import VerticalLayout from "components/VerticalLayout";
import { saveDescriptions } from "helpers/backend_helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import { values } from "lodash";
// import { arrayRemove, arrayRemoveAll } from "redux-form";



const EditInstructions = (props) => {

    const dispatch = useDispatch();
    const currentDate = new Date();
    const [editInstructionMsg, setEditInstructionMsg] = useState("")
    const [startDate, setStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [editInstructionsSpinner, setEditInstructionsSpinner] = useState(false);
    const [editInstructionsFirstRenderDone, setEditInstructionsFirstRenderDone] = useState(false);
    let memberId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
    let pId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).pname : "";
    const [selectedMulti, setselectedMulti] = useState([]);
    const [selectedMulti2, setselectedMulti2] = useState([]);
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
    const [editInstruction, setEditInstruction] = useState(false)
    const [statusList, setStatusList] = useState([])

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])


    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    });

    const getDetailInstructionData = useSelector(state => {
        return state.instructionsReducer.respGetDetailInstruction;
    })

    useEffect(() => {

        if (getDetailInstructionData.data !== undefined && getDetailInstructionData.status == "1") {


            // get response label (yang sudah dipilih sebelumnya) -- Owner -- //
            getDetailInstructionData?.data?.instruction?.ownerList.map((ownerList) => {
                const newOwnerEdit = {
                    value: ownerList.id,
                    label: ownerList.name,
                    bgColor: ownerList.bgColor,

                };
                setOptionOwner0((option) => [...option, newOwnerEdit]);
            });

            // get response label (yang sudah dipilih sebelumnya) -- Manager -- //
            getDetailInstructionData?.data?.instruction?.managerList.map((managerList) => {
                const newManagerEdit = {
                    value: managerList.id,
                    label: managerList.name,

                };
                setOptionManager0((option) => [...option, newManagerEdit]);
            });

            // get dropdown list data -- Owner -- //
            getDetailInstructionData?.data?.ownerList.map((data) => {
                const newOwnerSet = {
                    value: data.id,
                    label: data.name,
                    bgColor: data.bgColor,

                };
                setOptionOwner((option) => [...option, newOwnerSet]);
            });

            // get dropdown list data -- Manager -- //
            getDetailInstructionData?.data?.managerList.map((data) => {
                const newManagerSet = {
                    value: data.id,
                    label: data.name,

                };
                setOptionManager((option) => [...option, newManagerSet]);
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

            getDetailInstructionData?.data?.statusList.map((statusList) => {
                const objList = {

                    statusId: statusList.no,
                    statusNm: statusList.name,
                    colorList: statusList.bgColor,
                };

                setStatusList((option) => [...option, objList]);
            })

        }

        /* useEffect field here */

        editInstructionsValidInput.setFieldValue("no", props.instructionsData?.num)
        editInstructionsValidInput.setFieldValue("title", props.instructionsData?.title)
        editInstructionsValidInput.setFieldValue("insDate", props.instructionsData?.insDate)
        editInstructionsValidInput.setFieldValue("status", props.instructionsData?.status)
        editInstructionsValidInput.setFieldValue("description", getDetailInstructionData?.data?.instruction?.description)

        setStartDate(format(currentDate, 'yyyy-MM-dd'))


    }, [getDetailInstructionData]);

    useEffect(() => {
        if (optionOwner0 != null && optionManager0 != null) {
            setselectedMulti(optionOwner0)
            setselectedMulti2(optionManager0)
            return;
        }

    }, [optionOwner0, optionManager0])

    useEffect(() => {
        if (Files2 != null && Files2 != undefined) {
            SetFiles(Files2)
            return;
        }
    }, [Files2], [])

    useEffect(() => {
        if (replyNum != null && replyNum != undefined) {
            setReplyNum(replyNum)
            return;
        }
    }, [replyNum], [])


    useEffect(() => {
        setEditInstructionsFirstRenderDone(true);
        // dispatch(getDetailInstruction({
        //     langType: "kor"
        // }))
    }, [])

    useEffect(() => {

        if (props.appEditInstructions) {
            let num = props.instructionsData?.num.toString()
            dispatch(getDetailInstruction({
                search: {
                    "num": num,
                    "langType": "eng"
                }
            }))
        }
        // else {
        //     dispatch(getDetailInstruction({}))
        // }
    }, [props.appEditInstructions])

    const insert = async (values) => {

        await dispatch(editInstructions(values));
    };

    const downloadFiles = async file_num => {
        debugger
        var ix = { file_num: file_num }
        await dispatch(downloadFile(ix))
    }

    const editInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            no: '',
            title: '',
            insDate: '',
            status: '',
            description: '',

            content: '',

        },

        validationSchema: Yup.object().shape({
            no: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (val) => {

            var bodyForm = new FormData();

            bodyForm.append('num', val.no);
            bodyForm.append('description', val.description);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            insert2(bodyForm, config);
            alert('Add description success.')
        }

    });

    const editInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgEdit;
    });

    const insertUploadFileEdit = async (values) => {

        await dispatch(editInstructions(values));
    };

    function handleUploadFile(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.no);


        if (selectedfile.length > 0) {


            for (let index = 0; index < selectedfile.length; index++) {

                let a = selectedfile[index];

                bodyForm.append('file' + index, selectedfile[index].fileori);

                console.log(a);
                SetFiles([...Files, a ]);
            }
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        insertUploadFileEdit(bodyForm, config);

    }


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

        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]

                })
                break;
            }
            SetSelectedFile([]);

        } else {
            alert('Please select file')
        }

    }

    const deleteFiles = async (values) => {

        await dispatch(editInstructions(values));
        
    };

    function DeleteFileAttached(file_num) {

        var bodyForm = new FormData();
        bodyForm.append('num', editInstructionsValidInput.values.no);
        bodyForm.append('removeFile', file_num);

        //console.log(a);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        deleteFiles(bodyForm, config)
        alert('Delete success.')
        SetFiles([]);
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


    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i className="mdi mdi-plus-thick" />
            </components.DropdownIndicator>
        );
    };

    const colourStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused || state.isSelected || state.isDisabled ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? '#e6e6e6'
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? 'white'
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            };
        },

        multiValue: (styles, { data }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: color,

            };
        },

        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: 'white',
            fontSize: '13px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '7.5px',
            paddingBottom: '7.5px',
            borderRadius: '0.25rem',
        }),

        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: 'white',
            ':hover': {
                backgroundColor: data.bgColor,
                color: 'white',
            },
        }),
    };

    const colourStyles2 = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isSelected ? 'white' : 'white',
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isDisabled ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',

        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? '#e6e6e6'
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? 'white'
                        : 'black', // <-- Updated line here
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            };
        },

        multiValue: (styles, { data }) => {
            const color = data.bgColor;
            return {
                ...styles,
                backgroundColor: '#579DFF',

            };
        },

        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: 'white',
            fontSize: '13px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '7.5px',
            paddingBottom: '7.5px',
            borderRadius: '4px',
        }),

        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: 'white',
            ':hover': {
                backgroundColor: data.bgColor,
                color: 'white',
            },
        }),
    };

    function handleMulti(s) {
        const currentSelection = selectedMulti.map((item) => item.value);

        const addedValues = s.filter((item) => !currentSelection.includes(item.value));
        const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

        const bodyForm = new FormData();
        bodyForm.append('num', editInstructionsValidInput.values.no);

        addedValues.forEach((addedItem) => {
            bodyForm.append('addUser', addedItem.value);
        });

        deletedValues.forEach((deletedItem) => {
            bodyForm.append('removeUser', deletedItem);
        });

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        insert(bodyForm, config)
        setselectedMulti(s);
    }

    function handleMulti2(s) {
        const currentSelection = selectedMulti2.map((item) => item.value);

        const addedValues = s.filter((item) => !currentSelection.includes(item.value));
        const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

        const bodyForm = new FormData();
        bodyForm.append('num', editInstructionsValidInput.values.no);

        addedValues.forEach((addedItem) => {
            bodyForm.append('addUser', addedItem.value);
        });

        deletedValues.forEach((deletedItem) => {
            bodyForm.append('removeUser', deletedItem);
        });

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        insert(bodyForm, config);

        setselectedMulti2(s);
    }


    function handleAutoSaveTitle(values) {

        var bodyForm = new FormData();

        bodyForm.append('num', editInstructionsValidInput.values.no);
        bodyForm.append('title', editInstructionsValidInput.values.title);


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

        bodyForm.append('num', editInstructionsValidInput.values.no);
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

        const targetStatusNm = values.target.value
        const targetStatus = statusList.find((status) => status.statusNm === targetStatusNm)

        let statusId = null
        statusId = targetStatus.statusId

        var bodyForm = new FormData()
        bodyForm.append('num', editInstructionsValidInput.values.no)
        bodyForm.append('status', statusId)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        insert(bodyForm, config)
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
                break;
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
            break;
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
                break;
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

        bodyForm.append('instruction_num', editInstructionsValidInput.values.no);
        bodyForm.append('content', editInstructionsValidInput.values.content);

        if (selectedfileR.length > 0) {

            for (let index = 0; index < selectedfileR.length; index++) {

                let a = selectedfileR[index];

                bodyForm.append('file' + index, selectedfileR[index].fileori);
                break;
            }

        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }


        // setEditInstructionsSpinner(true);
        alert('Add reply success.')
        insert3(bodyForm, config);


    };

    // Reply tables functions //

    const replyDelete = async (row) => {
        try {
            debugger
            var map = {
                "reply_num": row.no
            };

            // setEditInstructionsSpinner(true);
            // setEditInstructionMsg("")

            await dispatch(deleteReply(map));

        } catch (error) {
            console.log(error)
        }
    };


    // end function //

    useEffect(() => {
        if (msgSaveReply.status == "1") {
            // setApp015p02LovWilayah('')
            // props.setApp015p01Page(true);
            // props.setApp015p02Page(false);
            // dispatch(getVendorData(props.app015p01TabelSearch))
        }
        // setEditInstructionMsg(msgSaveReply)
        // setEditInstructionsSpinner(false);
    }, [msgSaveReply])


    /*********************************** SIGIT MADE FROM HERE ***********************************/

    const [showDesc, setShowDesc] = useState(false)
    const [isHiddenReply, setIsHiddenReply] = useState(true)
    const [isHiddenLogs, setIsHiddenLogs] = useState(true)

    const handleSaveDesc = async (val) => {
        try {
            await dispatch(saveDescriptions({ "num": editInstructionsValidInput.values.no, "description": val }))
        } catch (error) {
            console.error("Error saving descriptions:", error)
        }
    }

    /*********************************** ENDS HERE ***********************************/

    return (
        <React.Fragment>

            {/* {editInstructionMsg !== "" ? <UncontrolledAlert toggle={editInstructionCloseAllert} color={editInstructionMsg.status == "1" ? "success" : "danger"}>
                    {typeof editInstructionMsg == 'string' ? editInstructionMsg : editInstructionMsg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null} */}

            <Container style={{ display: props.appEditInstructions ? 'block' : 'none' }} fluid={true}>

                <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit ? 'flex' : 'none' }}>
                    <Col lg={12}>
                        <Card>
                            <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="mdi mdi-lead-pencil font-size-18 align-middle me-2"></i>Edit Instructions</CardHeader>
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
                                                <div className="mb-3 col-sm-8" hidden>
                                                    <Label>Instruction ID</Label>
                                                    <Input

                                                        name="no"
                                                        type="text"
                                                        value={editInstructionsValidInput.values.no || ""}
                                                        invalid={
                                                            editInstructionsValidInput.touched.no && editInstructionsValidInput.errors.no ? true : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.no && editInstructionsValidInput.errors.no ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.no}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <Label>Title <span style={{ color: "red" }}>* </span></Label>
                                                    <Input
                                                        maxLength={50}
                                                        name="title"
                                                        type="text"
                                                        onChange={editInstructionsValidInput.handleChange}
                                                        onBlur={handleAutoSaveTitle}
                                                        value={editInstructionsValidInput.values.title || ""}
                                                        invalid={
                                                            editInstructionsValidInput.touched.title && editInstructionsValidInput.errors.title ? true : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.title && editInstructionsValidInput.errors.title ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.title}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
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

                                                <div className="mb-3 col-sm-8">
                                                    <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                    <Input
                                                        name="status"
                                                        type="select"
                                                        onChange={(e) => {
                                                            editInstructionsValidInput.handleChange(e);
                                                            handleAutoSaveStatus(e)
                                                        }}
                                                        onBlur={() => {
                                                        }}
                                                        value={editInstructionsValidInput.values.status}
                                                        invalid={
                                                            editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status ? true : false
                                                        }
                                                    >
                                                        {statusList.map((value, key) => (
                                                            <option key={key} value={value.statusNm}>{value.statusNm}</option>
                                                        ))}
                                                    </Input>
                                                    {editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.status}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3 col-sm-8">
                                                    <Label className="col-sm-5" style={{ marginTop: "15px" }}>
                                                        Descriptions
                                                    </Label>

                                                    <Col hidden={showDesc} style={{ minHeight: "97.5px" }} onClick={() => {
                                                        setShowDesc(!showDesc)
                                                    }}>
                                                        {editInstructionsValidInput.values.description || ""}
                                                    </Col>

                                                    <Col>
                                                        <Input
                                                            hidden={!showDesc}
                                                            name="description"
                                                            type="textarea"
                                                            rows="5"
                                                            maxLength={100}
                                                            onChange={editInstructionsValidInput.handleChange}
                                                            value={editInstructionsValidInput.values.description || ""}
                                                            invalid={editInstructionsValidInput.touched.description && editInstructionsValidInput.errors.description ? true : false}
                                                        />
                                                        {editInstructionsValidInput.touched.description && editInstructionsValidInput.errors.description ? (
                                                            <FormFeedback type="invalid">
                                                                {editInstructionsValidInput.errors.description}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </div>


                                                <br></br>

                                                <Button hidden={!showDesc} color="primary" className="ms-1" type="button" onClick={() => {
                                                    setShowDesc(!showDesc)
                                                    handleSaveDesc(editInstructionsValidInput.values.description)
                                                }}>
                                                    Save
                                                </Button>&nbsp;
                                            </Col>

                                            <Col md="6">
                                                <div className="mb-3 col-sm-8">
                                                    <Label> Choose Owner </Label>
                                                    <Select
                                                        value={selectedMulti}
                                                        isMulti={true}
                                                        onChange={(e) => {
                                                            handleMulti(e);
                                                        }}
                                                        options={optionOwner}
                                                        className="select2-selection"
                                                        styles={colourStyles}
                                                        components={{ DropdownIndicator }}
                                                        placeholder={'Select or type...'}
                                                    />
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <label>Choose Manager </label>
                                                    <Select
                                                        value={selectedMulti2}
                                                        isMulti={true}
                                                        //onBlur={handleAutoSaveUsers}
                                                        onChange={(e) => {
                                                            handleMulti2(e);
                                                        }}
                                                        options={optionManager}

                                                        className="select2-selection"
                                                        styles={colourStyles2}
                                                        components={{ DropdownIndicator }}
                                                        placeholder={'Select or type...'}
                                                    />
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <label>Attached Files </label>

                                                    <Form onSubmit={FileUploadSubmit}>
                                                        <div className="kb-file-upload">

                                                            <div className="file-upload-box">
                                                                <input type="file" id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" multiple />
                                                            </div>
                                                        </div>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <div className="kb-attach-box mb-3">
                                                            {
                                                                selectedfile.map((data, index) => {
                                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                    return (
                                                                        <div className="file-atc-box" key={id}>
                                                                            {
                                                                                filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                    <div className="file-image"></div> :
                                                                                    <div className="file-image"></div>
                                                                            }
                                                                            <div className="file-detail">
                                                                                <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                                                &nbsp;&nbsp;&nbsp;

                                                                                <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteSelectFile(id)} />

                                                                                <p />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="kb-buttons-box">
                                                            <a onClick={() => handleUploadFile()} className="btn btn-primary">Upload</a>
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
                                                                                    <div className="file-image"></div> :
                                                                                    <div className="file-image"></div>
                                                                            }
                                                                            <div className="file-detail">
                                                                                <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteFileAttached(file_num)} />
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <i className="mdi mdi-download" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} download={filename} onClick={() => downloadFiles(file_num)} />

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

                <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit ? 'none' : 'flex' }}>
                    <Col lg={12}>
                        <Card>
                            <CardHeader style={{ borderRadius: "15px 15px 0 0" }} ><i className="mdi mdi-file-document-box font-size-18 align-middle me-2"></i>Detail Instructions</CardHeader>
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
                                                <div className="mb-3 col-sm-8" hidden>
                                                    <Label>Instruction ID</Label>
                                                    <Input
                                                        disabled
                                                        name="no"
                                                        type="text"
                                                        value={editInstructionsValidInput.values.no || ""}
                                                        invalid={
                                                            editInstructionsValidInput.touched.no && editInstructionsValidInput.errors.no ? true : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.no && editInstructionsValidInput.errors.no ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.no}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <Label>Title</Label>
                                                    <Input
                                                        disabled
                                                        name="title"
                                                        type="text"
                                                        value={editInstructionsValidInput.values.title || ""}
                                                        invalid={
                                                            editInstructionsValidInput.touched.title && editInstructionsValidInput.errors.title ? true : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.title && editInstructionsValidInput.errors.title ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.title}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <Label>
                                                        Instruction Date{" "}

                                                    </Label>

                                                    <Input
                                                        disabled
                                                        name="insDate"
                                                        type="date"
                                                        value={editInstructionsValidInput.values.insDate || startDate}
                                                        invalid={
                                                            editInstructionsValidInput.touched.insDate && editInstructionsValidInput.errors.insDate ? true : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.insDate && editInstructionsValidInput.errors.insDate ? (
                                                        <FormFeedback type="invalid"> {editInstructionsValidInput.errors.insDate} </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <Label> Status </Label>
                                                    <Input
                                                        disabled
                                                        type="select"
                                                        name="status"
                                                        value={editInstructionsValidInput.values.status || ""}
                                                        invalid={
                                                            editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status ? true : false
                                                        }
                                                    >
                                                        {statusList.map((value, key) => (
                                                            <option key={key} value={value.statusNm}>{value.statusNm}</option>
                                                        ))}

                                                    </Input>
                                                    {editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status ? (
                                                        <FormFeedback type="invalid">{editInstructionsValidInput.errors.status}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions</Label>
                                                    <Input
                                                        disabled
                                                        name="description"
                                                        type="textarea"
                                                        rows="5"
                                                        maxLength={50}
                                                        value={
                                                            editInstructionsValidInput.values.description ||
                                                            ""
                                                        }
                                                        invalid={
                                                            editInstructionsValidInput.touched.description &&
                                                                editInstructionsValidInput.errors.description
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {editInstructionsValidInput.touched.description &&
                                                        editInstructionsValidInput.errors.description ? (
                                                        <FormFeedback type="invalid">
                                                            {editInstructionsValidInput.errors.description}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                            </Col>

                                            <Col md="6">
                                                <div className="mb-3 col-sm-8">
                                                    <Label> Choose Owner</Label>
                                                    <Select
                                                        isDisabled={true}
                                                        value={selectedMulti}
                                                        isMulti={true}
                                                        className="select2-selection"
                                                        styles={colourStyles}
                                                        components={{ DropdownIndicator }}
                                                        placeholder={'No Owner Choosen'}
                                                    />
                                                </div>

                                                <div className="mb-3 col-sm-8">
                                                    <label>Choose Manager </label>
                                                    <Select
                                                        isDisabled={true}
                                                        value={selectedMulti2}
                                                        isMulti={true}
                                                        className="select2-selection"
                                                        styles={colourStyles2}
                                                        components={{ DropdownIndicator }}
                                                        placeholder={'No manager choosen'}
                                                    />
                                                </div>

                                                <div className="mb-3 col-sm-8">
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
                                                                                    <div className="file-image"></div> :
                                                                                    <div className="file-image"></div>
                                                                            }
                                                                            <div className="file-detail">
                                                                                <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                                                &nbsp;&nbsp;
                                                                                <i className="mdi mdi-download" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} download={filename} onClick={() => downloadFiles(file_num)}></i>
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
                            <a>
                                <CardHeader onClick={() => setIsHiddenReply(!isHiddenReply)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "15px 15px 0 0" }}>
                                    <span style={{ flex: "1", textAlign: "left" }}>
                                        <i className="mdi mdi-forum font-size-8 align-middle me-2"></i>Reply
                                    </span>
                                    {isHiddenReply ? (
                                        <i className="bx bxs-down-arrow font-size-8 align-middle me-2"></i>
                                    ) : (
                                        <i className="bx bxs-up-arrow font-size-8 align-middle me-2"></i>
                                    )}
                                </CardHeader>
                            </a>

                            <CardBody hidden={isHiddenReply}>
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
                                                                    maxLength={100}
                                                                    name="content"
                                                                    type="textarea"
                                                                    onChange={editInstructionsValidInput.handleChange}
                                                                    //style={{ color: "black" }}
                                                                    //placeholder={'Type here...'}
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
                                                        <div className="mb-3 col-sm-8">
                                                            <label>Attached Files </label>

                                                            <Form onSubmit={FileUploadSubmitR}>
                                                                <div className="kb-file-upload">
                                                                    <div className="file-upload-box">
                                                                        <input type="file" id="fileupload3" className="form-control" onChange={InputChangeR} name="removeFile" multiple />
                                                                    </div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <div className="kb-attach-box mb-3">
                                                                    {
                                                                        selectedfileR.map((data, index) => {
                                                                            const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                            return (
                                                                                <div className="file-atc-box" key={id}>

                                                                                    {
                                                                                        filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                            <div className="file-image"></div>
                                                                                            :
                                                                                            <div className="file-image"></div>
                                                                                    }
                                                                                    <div className="file-detail">
                                                                                        <span><i className="fas fa-paperclip" />&nbsp;{filename}</span>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteSelectFileR(id)} />

                                                                                        <p />
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </Form>

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
                                                                                    <td className="tg-0lax" style={{ maxWidth: "250px", wordBreak: "break-word" }}>
                                                                                        {row.content}
                                                                                        <p />
                                                                                        {row.edit ? <a href="/">Edit</a> : ''}&nbsp;&nbsp;&nbsp;{row.delete ? <a href="/" onClick={() => { replyDelete(row) }}>Delete</a> : ''}
                                                                                    </td>
                                                                                    <td className="tg-0lax" >{row.write_time === ' ' || row.write_time === '' ? '' : moment(row.write_time).format('yyyy-MM-DD hh:mm')}</td>
                                                                                    <td className="tg-0lax" style={{ maxWidth: "50px", textOverflow:"clip", whiteSpace: "nowrap", overflow:"hidden"  }}>{row.attachFileList.length > 0 ? row.attachFileList[0].name : ''}</td>
                                                                                    <td className="tg-0lax" align="left" style={{ cursor: "pointer"}}> {row.attachFileList.length > 0 || row.attachFileList !== null ? <i className="mdi mdi-download" onClick={() => { xxx() }} /> : ''}</td>
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

                <Row>

                    <Col lg={12}>
                        <Card>
                            <a>
                                <CardHeader onClick={() => setIsHiddenLogs(!isHiddenLogs)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "15px 15px 0 0" }}>
                                    <span style={{ flex: "1", textAlign: "left" }}>
                                        <i className="mdi mdi-timer-sand font-size-8 align-middle me-2"></i>Log
                                    </span>
                                    {isHiddenLogs ? (
                                        <i className="bx bxs-down-arrow font-size-8 align-middle me-2"></i>
                                    ) : (
                                        <i className="bx bxs-up-arrow font-size-8 align-middle me-2"></i>
                                    )}
                                </CardHeader>
                            </a>

                            <CardBody hidden={isHiddenLogs}>
                                <React.Fragment>
                                    <FormGroup className="mb-0">

                                        <Row>
                                            <Col md="12">
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
                                onClick={() => { props.setAppInstructionsPage(true); props.setEditInstructions(false); props.setAppInstructionsMsg(""); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); setGetFiles([]); SetFiles([]); SetFiles2([]) }}
                            >
                                <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                Kembali
                            </Button>

                        </div>
                    </Col>
                </Row>
            </Container>

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