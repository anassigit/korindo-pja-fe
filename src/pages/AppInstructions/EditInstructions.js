
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
import { deleteReply, downloadFile, editInstructions, deleteInstructions, editReply, getAttachmentData, getLogs, getManager, getOwner, getStatus, msgEdit, resetMessage, respGetAttachment, saveDescription, saveReply } from "../../store/appInstructions/actions";
// import { getDetailInstruction } from "helpers/backend_helper"
import { getDetailInstruction, getReply, getSelectedManager } from "../../store/appInstructions/actions"


import { format } from 'date-fns';
import moment from "moment";
import { ReactSession } from 'react-client-session';
import Select, { components } from "react-select";
import shortid from "shortid";
import VerticalLayout from "components/VerticalLayout";
import { saveDescriptions } from "helpers/backend_helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { preventDefault } from "@fullcalendar/core";
import { reset } from "redux-form";
import RootPageCustom from "common/RootPageCustom";


const EditInstructions = (props) => {


    const history = useHistory()
    const dispatch = useDispatch();

    const [appEditInstructionsMsg, setAppEditInstructionsMsg] = useState("")
    const [appDeleteInstructionsMsg, setAppDeleteInstructionsMsg] = useState("")

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

    const [ownerObj1, setOwnerObj1] = useState([])
    const [ownerObj2, setOwnerObj2] = useState([])

    const [addUser, setAddUser] = useState([])
    const [removeUser, setRemoveUser] = useState([])

    const [removeFile, setRemoveFile] = useState([])

    const [appInstructionsData, setAppInstructionsData] = useState(null);

    /* MULTI SELECT OPTIONS */

    const getOwnerList = useSelector(state => {
        return state.instructionsReducer.respGetOwner;
    });

    const getManagerList = useSelector(state => {
        return state.instructionsReducer.respGetManager;
    });

    const selectedManager = useSelector(state => {
        return state.instructionsReducer.respGetSelectedManager;
    })

    /* ENDS HERE */

    const statusData = useSelector(state => {
        return state.instructionsReducer.respGetStatus;
    })

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    });

    const getDetailInstructionData = useSelector(state => {
        return state.instructionsReducer.respGetDetailInstruction;
    })

    const replyData = useSelector(state => {
        return state.instructionsReducer.respGetReply;
    })

    const attachmentReplyData = useSelector(state => {
        return state.instructionsReducer.respGetAttachment;
    })

    const attachmentInstructionData = useSelector(state => {
        return state.instructionsReducer.respGetAttachment;
    })

    const logsData = useSelector(state => {
        return state.instructionsReducer.respGetLogs;
    })

    useEffect(() => {
        setEditInstructionsFirstRenderDone(true);
        dispatch(resetMessage());

        /* Get Last Data For Reload by Sigit */
        const storedData = localStorage.getItem('appInstructionsData');
        let parsedData = null

        if (storedData) {
            parsedData = JSON.parse(storedData);
            setAppInstructionsData(parsedData);
        }

        let num = parsedData?.num.toString()
        dispatch(getDetailInstruction({
            search: {
                "num": num,
                "langType": "eng"
            }
        }))
        dispatch(getStatus({
            search: {
                "num": num,
                "langType": "eng"
            }

        }))
        dispatch(getReply({
            search: {
                "num": num,
                "langType": "eng"
            }
        }))
        dispatch(getManager({
            search: {
                "num": num,
                "langType": "eng"
            }

        }))
        dispatch(getOwner({
            search: {
                "num": num,
                "langType": "eng"
            }

        }))
        dispatch(getSelectedManager({
            search: {
                "num": num,
                "langType": "eng"
            }

        }))
        dispatch(getAttachmentData({
            search: {
                "instruction_num": num,
                "langType": "eng"
            }

        }))
        dispatch(getLogs({
            search: {
                "num": num,
            }

        }))

    }, [])

    useEffect(() => {

        /*** OWNER SELECT ***/

        let selectedOwner = null;
        selectedOwner = getDetailInstructionData?.data?.instruction.owner

        if (selectedOwner) {
            selectedOwner = [{
                label: selectedOwner.name,
                value: selectedOwner.id,
                bgColor: selectedOwner.bgColor
            }]
        }

        setselectedMulti(selectedOwner)

        if (selectedOwner === null) {
            setOptionOwner0(getOwnerList?.data?.ownerList.map((owner) => ({
                value: owner.id,
                label: owner.name,
                bgColor: owner.bgColor,
            })));
        } else {
            setOptionOwner0([]);
        }


        /*** MANAGER SELECT ***/
        setselectedMulti2(selectedManager?.data?.managerList.map((manager) => ({
            value: manager.id,
            label: manager.name,
            gname: manager.gname,
        })))

        setOptionManager0(getManagerList?.data?.managerList.map((manager) => ({
            value: manager.id,
            label: manager.name,
            gname: manager.gname,
        })))

        if (attachmentInstructionData?.data?.attachFileList) {
            const entries = Object.values(attachmentInstructionData?.data?.attachFileList);
            SetFiles(entries);
        }

        /* useEffect field here */
        const storedData = localStorage.getItem('appInstructionsData');
        let parsedData = null
        if (storedData) {
            parsedData = JSON.parse(storedData);
        }

        editInstructionsValidInput.setFieldValue("no", parsedData?.num)
        editInstructionsValidInput.setFieldValue("title", parsedData?.title)
        editInstructionsValidInput.setFieldValue("insDate", parsedData?.insDate)
        editInstructionsValidInput.setFieldValue("status", getDetailInstructionData?.data?.instruction?.status)
        editInstructionsValidInput.setFieldValue("description", getDetailInstructionData?.data?.instruction?.description)

        setStartDate(format(currentDate, 'yyyy-MM-dd'))


    }, [getDetailInstructionData, selectedManager, getManagerList, getOwnerList, attachmentInstructionData]);

    // useEffect(() => {
    //     if (attachmentInstructionData?.data?.attachFileList) {
    //         const entries = Object.values(attachmentInstructionData?.data?.attachFileList);
    //         SetFiles(entries);
    //     }
    // }, [attachmentInstructionData]);


    useEffect(() => {
        if (replyNum != null && replyNum != undefined) {
            setReplyNum(replyNum)
            return;
        }
    }, [replyNum], [])

    const insert = async (values) => {

        await dispatch(editInstructions(values))
    };

    // const downloadFiles = async num => {

    //     debugger
    //     var ix = { num: num }
    //     await dispatch(downloadFile(ix))
    // }

    const editInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: '',
            insDate: '',
            description: '',
            status: '',
        },

        validationSchema: Yup.object().shape({
            //title: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {


            debugger

            var bodyForm = new FormData();

            bodyForm.append('num', values.no);
            bodyForm.append('title', editInstructionsValidInput.values.title);
            bodyForm.append('insDate', editInstructionsValidInput.values.insDate);
            bodyForm.append('description', values.description);


            //remove/add - Owner & Manager//

            if (addUser.length > 0) {
                addUser.forEach(user => {
                    bodyForm.append('addUser', user);
                });
            }
            if (removeUser.length > 0) {
                removeUser.forEach(user => {
                    bodyForm.append('removeUser', user);
                });
            }

            //end//

            //status//

            let statusId = null
            statusId = statusData?.data?.statusList.map((item, index) => {
                if (item.name == values.status) {
                    bodyForm.append('status', item.no)
                }
            })

            //end status//

            //attach files//

            if (selectedfile.length > 0) {

                var getFileNm = selectedfile[0].filename;
    
                getFileNm = getFileNm.substring(getFileNm.lastIndexOf('.') + 1);
    
                if (getFileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|csv)$/i)) {
    
    
                    for (let index = 0; index < selectedfile.length; index++) {
                        let a = selectedfile[index];
    
                        bodyForm.append('file' + index, selectedfile[index].fileori);
    
                        console.log(a);
                        SetSelectedFile([]);
                        SetFiles([...Files, a]);
    
                    }
    
    
                } else {

                    alert("Files type are not allowed to upload or not supported.");
                }
            } else {

                if (removeFile.length > 0) {
                    removeFile.forEach(files => {
                        bodyForm.append('removeFile', files);
                    });
                }
                
            }

            //end//


            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            insert(bodyForm, config);
            //alert('Add description success.')
        }

    });

    const deleteInstruction = async () => {
        try {
          debugger
          var map = {
            "num": editInstructionsValidInput.values.no
          };
          await dispatch(deleteInstructions(map));

        } catch (message) {
            console.log(message)
        }
    };
    
    const deleteInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgDelete;
    });

    useEffect(()=> {
        debugger
        if (deleteInstructionsMessage.status == "1") {
            history.push({
                pathname: '/AppInstructions',
                state: { setAppInstructionsMsg: deleteInstructionsMessage }
            });
        }
        // setAppEditInstructionsMsg(deleteInstructionsMessage)
    },[deleteInstructionsMessage])

    const downloadAttach = async (num, fileNm) => {
        try {
            debugger
            var indexed_array = {
                "file_num": num,
                "file_nm" : fileNm
            };
            await dispatch(downloadFile(indexed_array));
        } catch (error) {
            console.log(error)
        }
    };

    const editInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgEdit;
    });

    const insertUploadFileEdit = async (values) => {

        await dispatch(editInstructions(values));
    };

    function handleUploadFile() {

        deletedValues.forEach((deletedItem) => {
            setRemoveUser(current => [...current, deletedItem]);
        })

        if (selectedfile.length > 0) {

            var getFileNm = selectedfile[0].filename;

            getFileNm = getFileNm.substring(getFileNm.lastIndexOf('.') + 1);

            if (getFileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i)) {


                for (let index = 0; index < selectedfile.length; index++) {
                    let a = selectedfile[index];

                    //bodyForm.append('file' + index, selectedfile[index].fileori);

                    console.log(a);
                    SetSelectedFile([]);
                    SetFiles([...Files, a]);

                }

            } else {
                alert("Files type are not allowed to upload or not supported.");
            }
        }

    }

    function DeleteFileAttached(FileNo) {

    
        const bodyForm = new FormData();
        bodyForm.append('num', editInstructionsValidInput.values.no);

        if (SetFiles.length > 0) {

            for (let index = 0; index < SetFiles.length; index++) {

                let a = SetFiles[index];

                const result = (Object.values(Files).filter((data) => data.num !== FileNo));

                result.forEach((deleteFile) => {
                    setRemoveFile(current => [...current, deleteFile]);
                })
                console.log(removeFile);
                SetFiles(result);

            }

        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        //insert(bodyForm, config);

        //deleteFiles(bodyForm, config)
        alert('Delete success.')


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

            let fileNm = e.target.files[i].name;
            fileNm = fileNm.substring(fileNm.lastIndexOf('.') + 1);

            if (fileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i)) {
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
            } else {
                alert("Files type are not allowed to upload or not supported.");
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
        const currentSelection = (selectedMulti || []).map((item) => item.value);

        const addedValues = s.filter((item) => !currentSelection.includes(item.value));
        const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

        addedValues.forEach((addedItem) => {
            setAddUser(current => [...current, addedItem.value]);
        })

        deletedValues.forEach((deletedItem) => {
            setRemoveUser(current => [...current, deletedItem]);
        })

        if (s && s.length === 0) {
            setOptionOwner0(getOwnerList?.data?.ownerList.map((owner) => ({
                value: owner.id,
                label: owner.name,
                bgColor: owner.bgColor,
            })));
        } else {
            setOptionOwner0([]);
        }
        // insert(bodyForm, config)
        setselectedMulti(s);
    }

    function handleMulti2(s) {

        const currentSelection = selectedMulti2.map((item) => item.value);

        const addedValues = s.filter((item) => !currentSelection.includes(item.value));
        const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

        // const bodyForm = new FormData();
        // bodyForm.append('num', editInstructionsValidInput.values.no);


        addedValues.forEach((addedItem) => {
            setAddUser(current => [...current, addedItem.value]);
        })

        deletedValues.forEach((deletedItem) => {
            setRemoveUser(current => [...current, deletedItem]);
        })
        console.log(addUser)
        console.log(removeUser)

        setselectedMulti2(s);
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

        let num = editInstructionsValidInput.values.no
        num = num.toString()

        setTimeout(() => {

            dispatch(getReply({
                search: {
                    "num": num,
                    "langType": "eng"
                }
            }))
            dispatch(getAttachmentData({
                search: {
                    "instruction_num": num,
                }
            }))

            setReplyClicked(false)
            editInstructionsValidInput.setFieldValue("content", '')
        }, 500)
    };

    const [replyClicked, setReplyClicked] = useState(false)

    function insertReplyAndFiles(values) {
        var bodyForm = new FormData();

        bodyForm.append('instruction_num', editInstructionsValidInput.values.no);
        bodyForm.append('content', editInstructionsValidInput.values.content);

        if (selectedfileR.length > 0) {

            for (let index = 0; index < selectedfileR.length; index++) {

                let a = selectedfileR[index];

                bodyForm.append('file' + index, selectedfileR[index].fileori);
                SetSelectedFileR([])
            }

        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }


        // setEditInstructionsSpinner(true);
        insert3(bodyForm, config)
        setReplyClicked(!replyClicked)

    };

    // Reply tables functions //

    const replyDelete = async (row) => {
        try {

            var map = {
                "reply_num": row.no
            };

            // setEditInstructionsSpinner(true);
            // setEditInstructionMsg("")
            let num = editInstructionsValidInput.values.no
            num = num.toString()
            await dispatch(deleteReply(map))
            setTimeout(() => {

                dispatch(getReply({
                    search: {
                        "num": num,
                        "langType": "eng"
                    }
                }))
                dispatch(getAttachmentData({
                    search: {
                        "instruction_num": num,
                    }
                }))

            }, 500)

        } catch (error) {
            console.log(error)
        }
    };


    // end function //

    useEffect(() => {
        if (msgSaveReply.status == "1") {
        }
    }, [msgSaveReply])


    /*********************************** SIGIT MADE FROM HERE ***********************************/
    /*********************************** SIGIT MADE FROM HERE ***********************************/
    /*********************************** SIGIT MADE FROM HERE ***********************************/

    const [isHiddenReply, setIsHiddenReply] = useState(true)
    const [isHiddenLogs, setIsHiddenLogs] = useState(true)
    const [isEditableSelectedReply, setIsEditableSelectedReply] = useState(false)

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const [editedContent, setEditedContent] = useState('');


    const handleSaveDesc = async (val) => {
        try {
            await dispatch(saveDescriptions({ "num": editInstructionsValidInput.values.no, "description": val }))
        } catch (error) {
            console.error("Error saving descriptions:", error)
        }
    }

    useEffect(() => {
        if (getDetailInstructionData?.data?.instruction?.replyList) {
            setReplyTabelListData(getDetailInstructionData?.data?.instruction?.replyList);
        }
    }, [replyTabelListData])

    useEffect(() => {

        if (editInstructionsMessage.status == "1") {
            history.push({
                pathname: '/AppInstructions',
                state: { setAppInstructionsMsg: editInstructionsMessage }
            });
        }
        setAppEditInstructionsMsg(editInstructionsMessage)
    }, [editInstructionsMessage])

    const updateReply = async (values) => {
        await dispatch(editReply(values));


        let num = editInstructionsValidInput.values.no
        num = num.toString()

        setTimeout(() => {

            dispatch(getReply({
                search: {
                    "num": num,
                    "langType": "eng"
                }
            }))
            dispatch(getAttachmentData({
                search: {
                    "instruction_num": num,
                }
            }))

            setReplyClicked(false)
            editInstructionsValidInput.setFieldValue("content", '')
        }, 500)
    };

    const handleEditReply = (reply_num, editedContent) => {

        var bodyForm = new FormData();
        let selectedNum = null

        replyData?.data?.replyList.map((row, index) => {
            if (index == reply_num) {
                selectedNum = row.no
            }
        })

        bodyForm.append('reply_num', selectedNum);
        bodyForm.append('content', editedContent);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }


        // setEditInstructionsSpinner(true);
        updateReply(bodyForm, config)
        setReplyClicked(!replyClicked)

    }
    /*********************************** ENDS HERE ***********************************/

    return (
        <RootPageCustom msgStateGet={appEditInstructionsMsg.message} msgStateSet={setAppEditInstructionsMsg}
            componentJsx={
                <>
                    {/* {editInstructionMsg !== "" ? <UncontrolledAlert toggle={editInstructionCloseAllert} color={editInstructionMsg.status == "1" ? "success" : "danger"}>
                    {typeof editInstructionMsg == 'string' ? editInstructionMsg : editInstructionMsg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null} */}

                    <Container fluid={true}>

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
                                                                //onBlur={handleAutoSaveTitle}
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
                                                                //onBlur={handleAutoSaveDate}
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
                                                                    editInstructionsValidInput.handleChange(e)
                                                                }}

                                                                value={editInstructionsValidInput.values.status}
                                                                invalid={editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status}
                                                            >
                                                                {statusData?.data?.statusList.map((value, key) => (
                                                                    <option key={key} value={value.name}>
                                                                        {value.name}
                                                                    </option>
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

                                                            <Col>
                                                                <Input
                                                                    name="description"
                                                                    type="textarea"
                                                                    rows="5"
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
                                                                options={optionOwner0}
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
                                                                onChange={(e) => {
                                                                    handleMulti2(e);
                                                                }}
                                                                options={optionManager0}

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

                                                            </Form>
                                                            {Files.length > 0 ?
                                                                <div className="kb-attach-box">
                                                                    <hr />
                                                                    <h6>Recent files uploaded</h6>
                                                                    {
                                                                        Files.map((data, index) => {
                                                                            //const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                            return (
                                                                                <div className="file-atc-box" key={index}>
                                                                                    <div className="file-detail">
                                                                                        <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{data.name}</span>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteFileAttached(data.num)} />
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i className="mdi mdi-download" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => downloadAttach(data.num, data.name)} />

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

                                            <Button type="submit" color="primary" className="ms-1">
                                                Update
                                            </Button>&nbsp;

                                        </Form>

                                        <div className="text-sm-end" >


                                            <Button color="danger" className="ms-1" type="button" onClick={() => { deleteInstruction() }}>
                                                Delete
                                            </Button>&nbsp;
                                            <Button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => { history.push('/AppInstructions'); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); setGetFiles([]); SetFiles([]); SetFiles2([]) }}
                                            >
                                                <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                                Back
                                            </Button>
                                        </div>

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

                                        <div className="text-sm-end" >

                                            <Button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => { history.push('/AppInstructions'); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); setGetFiles([]); SetFiles([]); SetFiles2([]) }}
                                            >
                                                <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                                Back
                                            </Button>
                                        </div>

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
                                                                            value={replyClicked == true ? '' : editInstructionsValidInput.values.content}
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
                                                        <Row>

                                                            <table className="tg"
                                                                style={{ marginTop: "10px", marginRight: "18px", marginLeft: "18px" }}
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
                                                                        replyData?.data?.replyList?.length > 0 &&
                                                                        replyData?.data?.replyList.map((row, reply_num) => (
                                                                            <>
                                                                                <tr style={{ height: "25px" }}></tr>
                                                                                <tr key={row.no} style={{ verticalAlign: "text-top" }}>
                                                                                    <td style={{ width: "10%" }} className="tg-0lax">{row.name}</td>
                                                                                    <td className="tg-0lax" style={{ maxWidth: "250px", wordBreak: "break-word" }}>
                                                                                        {selectedRowIndex === reply_num ? (
                                                                                            <Input
                                                                                                maxLength={100}
                                                                                                style={{ maxWidth: "75%" }}
                                                                                                name="content"
                                                                                                type="textarea"
                                                                                                value={editedContent}
                                                                                                onChange={(e) => setEditedContent(e.target.value)}
                                                                                            />
                                                                                        ) : (
                                                                                            <span
                                                                                                style={{ maxWidth: "75%" }}
                                                                                            >
                                                                                                {row.content}
                                                                                            </span>
                                                                                        )}
                                                                                        <p />
                                                                                        {row.edit ? (
                                                                                            <a className="text-primary" onClick={() => {
                                                                                                if (selectedRowIndex === reply_num) {
                                                                                                    handleEditReply(reply_num, editedContent);
                                                                                                    setSelectedRowIndex(null);
                                                                                                } else {
                                                                                                    setSelectedRowIndex(reply_num);
                                                                                                    setEditedContent(row.content);
                                                                                                }
                                                                                            }}>
                                                                                                {selectedRowIndex === reply_num ? "Save" : "Edit"}
                                                                                            </a>
                                                                                        ) : ('')}

                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        {row.delete ? (
                                                                                            <a className="text-primary" onClick={() => replyDelete(row)}>
                                                                                                Delete
                                                                                            </a>
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                    </td>
                                                                                    <td style={{ width: "10%" }} className="tg-0lax">
                                                                                        {row.write_time === " " || row.write_time === ""
                                                                                            ? ""
                                                                                            : moment(row.write_time).format("yyyy-MM-DD hh:mm")}
                                                                                    </td>
                                                                                     <td
                                                                                        className="tg-0lax"
                                                                                        style={{
                                                                                            maxWidth: "50px",
                                                                                            textOverflow: "clip",
                                                                                            whiteSpace: "nowrap",
                                                                                            overflow: "hidden",
                                                                                        }}
                                                                                    >
                                                                                        {row.attachFileList.length > 0 ? row.attachFileList[0].name : ""}
                                                                                    </td>
                                                                                    {/* <td className="tg-0lax" align="left" style={{ cursor: "pointer" }}>
                                                                                        {row.attachFileList.length > 0 || row.attachFileList !== null ? (
                                                                                            <i className="mdi mdi-download" onClick={() => xxx()} />
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                    </td> */}
                                                                                    {/* <td className="tg-0lax" align="right">{row.delete ? <i className="mdi mdi-delete font-size-18 text-danger" id="deletetooltip" onClick={() => app027p01Delete(app027p01SpkData)} /> : ''}</td> */}
                                                                                </tr>
                                                                                <tr style={{ height: "25px" }}></tr>
                                                                            </>
                                                                        ))
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

                        <Row style={{ display: getDetailInstructionData?.data?.instruction?.log ? 'flex' : 'none' }}>

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
                                                                        logsData?.data?.logList != null && logsData?.data?.logList.length > 0 && logsData?.data?.logList.map((row, logs) =>
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
                    </Container>
                </>
            }
        />
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