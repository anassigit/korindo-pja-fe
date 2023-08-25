
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
    Row,
    Spinner
} from "reactstrap";
import * as Yup from "yup";
import { deleteReply, downloadFile, editInstructions, deleteInstructions, editReply, getAttachmentData, getLogs, getManager, getOwner, getStatus, msgEdit, resetMessage, respGetAttachment, saveDescription, saveReply, getCheckDownloadData } from "../../store/appInstructions/actions";
// import { getDetailInstruction } from "helpers/backend_helper"
import { getDetailInstruction, getReply, getSelectedManager } from "../../store/appInstructions/actions"

import { format } from 'date-fns';
import moment from "moment";
import { ReactSession } from 'react-client-session';
import Select, { components } from "react-select";
import shortid from "shortid";
import VerticalLayout from "components/VerticalLayout";
import { downloadFiles, saveDescriptions } from "helpers/backend_helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { preventDefault } from "@fullcalendar/core";
import { reset } from "redux-form";
import RootPageCustom from "common/RootPageCustom";
import ConfirmModal from "components/Common/ConfirmModal";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { withTranslation } from "react-i18next";
import MsgModal from "components/Common/MsgModal";


const EditInstructions = (props) => {


    let langType = localStorage.getItem("I18N_LANGUAGE")
    const history = useHistory()
    const dispatch = useDispatch();

    const [appEditInstructionsMsg, setAppEditInstructionsMsg] = useState("")
    const [appDeleteInstructionsMsg, setAppDeleteInstructionsMsg] = useState("")

    const currentDate = new Date();
    const [editInstructionMsg, setEditInstructionMsg] = useState("")
    const [startDate, setStartDate] = useState(format(currentDate, 'yyyy-MM-dd'))
    const [insEditDate, setInsEditDate] = useState('')
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

    const [confirmModal, setConfirmModal] = useState(false)
    const [confirmModal2, setConfirmModal2] = useState(false)

    const [tempAttachReply, setTempAttachReply] = useState([])
    const [tempAttachReply2, setTempAttachReply2] = useState([])

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const [selectedDeletedReplyAtt, setSelectedDeletedReplyAtt] = useState([])

    const [downloadMsgModal, setDownloadMsgModal] = useState(false)
    const [downloadContentModal, setDownloadContentModal] = useState("")

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

    const msgEditInstruction = useSelector(state => {
        return state.instructionsReducer.msgEdit;
    })

    const msgDeleteInstruction = useSelector(state => {
        return state.instructionsReducer.msgDelete;
    })

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply;
    })

    const msgEditReply = useSelector(state => {
        return state.instructionsReducer.msgEditReply;
    })

    const msgDeleteReply = useSelector(state => {
        return state.instructionsReducer.msgDeleteReply;
    })

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
                "langType": langType
            }
        }))
        dispatch(getStatus({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getReply({
            search: {
                "num": num,
                "langType": langType
            }
        }))
        dispatch(getManager({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getOwner({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getSelectedManager({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getAttachmentData({
            search: {
                "instruction_num": num,
                "langType": langType
            }

        }))
        dispatch(getLogs({
            search: {
                "num": num,
            }

        }))

    }, [])

    useEffect(() => {
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
                "langType": langType
            }
        }))
        dispatch(getStatus({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getReply({
            search: {
                "num": num,
                "langType": langType
            }
        }))
        dispatch(getManager({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getOwner({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getSelectedManager({
            search: {
                "num": num,
                "langType": langType
            }

        }))
        dispatch(getAttachmentData({
            search: {
                "instruction_num": num,
                "langType": langType
            }

        }))
        dispatch(getLogs({
            search: {
                "num": num,
            }

        }))

    }, [props.t, langType])


    useEffect(() => {

        /** OWNER SELECT **/

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


        /** MANAGER SELECT **/
        const managerList = selectedManager?.data?.managerList;

        if (managerList) {
            const uniqueManagers = [];
            const seenNames = new Set();

            managerList.forEach(manager => {
                const name = manager.name;
                const gname = manager.gname;

                const fullName = gname !== null ? `${name} (${gname})` : name;

                if (!seenNames.has(fullName)) {
                    seenNames.add(fullName);
                    uniqueManagers.push({
                        value: manager.id,
                        label: fullName,
                        gname: manager.gname,
                    });
                }
            });

            setselectedMulti2(uniqueManagers);
        }


        setOptionManager0(getManagerList?.data?.managerList.map((manager) => ({
            value: manager.id,
            label: manager.name + (manager.gname !== null ? ` (` + manager.gname + `)` : ''),
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

        const inputDateString = parsedData?.insDate;

        const inputDate = new Date(inputDateString);
        const timeZoneOffset = 7 * 60;
        const adjustedDate = new Date(inputDate.getTime() + timeZoneOffset * 60 * 1000)

        editInstructionsValidInput.setFieldValue("insDate", adjustedDate)
        editInstructionsValidInput.setFieldValue("status", getDetailInstructionData?.data?.instruction?.status)
        editInstructionsValidInput.setFieldValue("description", getDetailInstructionData?.data?.instruction?.description)

        setStartDate(format(currentDate, 'yyyy-MM-dd'))

    }, [getDetailInstructionData, selectedManager, getManagerList, getOwnerList, attachmentInstructionData]);

    useEffect(() => {
        replyData?.data?.replyList?.length > 0 && replyData.data.replyList.map((row, reply_num) => {
            if (reply_num === selectedRowIndex && (selectedRowIndex != null || selectedRowIndex != undefined)) {
                row.attachFileList.map((file, index) => {
                    setTempAttachReply(oldFile => [...(oldFile || []), file])
                })
            }
        })
        SetSelectedFileR2([])
        setTempAttachReply2([])
    }, [selectedRowIndex]);

    useEffect(() => {
        if (tempAttachReply?.length > 0) {
            setTempAttachReply(null)
            setTempAttachReply2(tempAttachReply)
        }
    }, [tempAttachReply])

    useEffect(() => {
        if (replyNum != null && replyNum != undefined) {
            setReplyNum(replyNum)
            return;
        }
    }, [replyNum], [])

    const insert = async (values) => {

        await dispatch(editInstructions(values))
    };

    const validationMessages = {
        eng: {
            title: "Please enter instructions.",
        },
        kor: {
            title: "지시사항을 입력해 주세요.",
        },
        idr: {
            title: "Harap masukkan instruksi.",
        },
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(validationMessages[langType].title),
    })

    const editInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: '',
            insDate: '',
            description: '',
            status: '',
            content: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {

            var bodyForm = new FormData();

            bodyForm.append('num', values.no);
            bodyForm.append('title', editInstructionsValidInput.values.title);

            bodyForm.append('insDate', format(editInstructionsValidInput.values.insDate, "yyyy-MM-dd"));
            bodyForm.append('description', values.description);


            //remove/add - Owner & Manager//

            const uniqueAddUser = new Set(addUser);
            const uniqueRemoveUser = new Set(removeUser);

            const filteredAddUser = Array.from(uniqueAddUser).filter(user => !uniqueRemoveUser.has(user));
            const filteredRemoveUser = Array.from(uniqueRemoveUser).filter(user => !uniqueAddUser.has(user));

            filteredAddUser.forEach(user => {
                bodyForm.append('addUser', user);
            });

            filteredRemoveUser.forEach(user => {
                bodyForm.append('removeUser', user);
            });

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
            }

            if (removeFile.length > 0) {
                removeFile.forEach(files => {
                    bodyForm.append('removeFile', files);
                });
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


    const deleteInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgDelete;
    });

    useEffect(() => {

        if (deleteInstructionsMessage.status == "1") {
            history.push({
                pathname: '/AppInstructions',
                state: { setAppInstructionsMsg: deleteInstructionsMessage }
            });
        }
        // setAppEditInstructionsMsg(deleteInstructionsMessage)
    }, [deleteInstructionsMessage])


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

        if (SetFiles.length > 0) {
            debugger

            for (let index = 0; index < SetFiles.length; index++) {

                let a = SetFiles[index];

                const result = (Object.values(Files).filter((data) => data.num !== FileNo));
                let temp = null
                temp = removeFile
                temp.push(FileNo)
                setRemoveFile(temp);
                SetFiles(result);

            }

        }

    }

    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const refCleanser = useRef(null)

    const InputChange = (e) => {
        const allowedFileExtensions = /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i
        const selectedFiles = Array.from(e.target.files)

        const validFiles = selectedFiles.filter((file) => allowedFileExtensions.test(file.name))
        const invalidFiles = selectedFiles.filter((file) => !allowedFileExtensions.test(file.name))

        if (invalidFiles.length === 0 && validFiles.length > 0) {
            const processedFiles = []

            validFiles.forEach((file) => {
                const reader = new FileReader()

                reader.onloadend = () => {
                    processedFiles.push({
                        id: shortid.generate(),
                        filename: file.name,
                        filetype: file.type,
                        fileimage: reader.result,
                        fileori: file,
                    })

                    if (processedFiles.length === validFiles.length) {
                        // All files have been processed
                        SetSelectedFile((prevValue) => [...prevValue, ...processedFiles])
                    }
                }

                reader.readAsDataURL(file)
            })
        } else if (e.target.files.length != 0) {
            alert("No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")
            refCleanser.current.value = ""
            e.target.value = ""
        }

    };


    const DeleteSelectFile = (id) => {
        debugger
        const result = selectedfile.filter((data) => data.id !== id);
        SetSelectedFile(result);
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
    }

    const DropdownIndicatorDisabled = (props) => {
        return (
            null
        );
    }

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

    const colourStylesDisabled = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused || state.isSelected ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',
            '& input': {
                paddingRight: '0', // Hide the "+" symbol by removing right padding
            },
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
            color: data.bgColor,
        }),

        DropdownIndicator: (base, state) => ({
            ...base,
            display: 'block',
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

    const colourStyles2Disabled = {
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
            color: '#579DFF'
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
    const [selectedfileR2, SetSelectedFileR2] = useState([]);
    const [FilesR, SetFilesR] = useState([]);
    const [FilesR2, SetFilesR2] = useState([]);


    const InputChangeR = (e) => {
        const files = e.target.files;
        const allowedExtensions = /\.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i;
        const validFiles = [];
        const invalidFiles = [];

        for (let i = 0; i < files.length; i++) {
            if (allowedExtensions.test(files[i]?.name)) {
                validFiles.push(files[i]);
            } else {
                invalidFiles.push(files[i]);
            }
        }
        if (invalidFiles.length > 0 && e.target.files.length != 0) {
            alert("No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")
            refCleanser.current.value = ""
        } else {

            const processedFiles = [];

            validFiles.forEach((file) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    processedFiles.push({
                        id: shortid.generate(),
                        filename: file.name,
                        filetype: file.type,
                        fileimage: reader.result,
                        fileori: file,
                    });

                    if (processedFiles.length === validFiles.length) {
                        SetSelectedFileR((prevValue) => [...prevValue, ...processedFiles]);
                    }
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            });

        }
    };

    const InputChangeR2 = (e) => {
        const files = e.target.files;
        const allowedExtensions = /\.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i;
        const validFiles = [];
        const invalidFiles = [];

        for (let i = 0; i < files.length; i++) {
            if (allowedExtensions.test(files[i]?.name)) {
                validFiles.push(files[i]);
            } else {
                invalidFiles.push(files[i]);
            }
        }
        if (invalidFiles.length > 0 && e.target.files.length != 0) {
            alert("No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")
            refCleanser.current.value = ""
        } else {

            const processedFiles = [];

            validFiles.forEach((file) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    processedFiles.push({
                        id: shortid.generate(),
                        filename: file.name,
                        filetype: file.type,
                        fileimage: reader.result,
                        fileori: file,
                    });

                    if (processedFiles.length === validFiles.length) {
                        SetSelectedFileR2((prevValue) => [...prevValue, ...processedFiles]);
                    }
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            });

        }
    };

    const DeleteSelectFileR = (id) => {
        const result = selectedfileR.filter((data) => data.id !== id);
        SetSelectedFileR(result);
    }

    const FileUploadSubmitR = async (e) => {
        e.preventDefault();

        e.target.reset();

        if (selectedfileR.length > 0) {
            SetFilesR((prevFiles) => [...prevFiles, ...selectedfileR]);
            SetSelectedFileR([]);
            refCleanser.current.value = ""
        } else {
        }
    }

    const FileUploadSubmitR2 = async (e) => {
        e.preventDefault();

        e.target.reset();

        if (selectedfileR2.length > 0) {
            SetFilesR2((prevFiles) => [...prevFiles, ...selectedfileR2]);
            SetSelectedFileR2([]);
            refCleanser.current.value = ""
        } else {
        }
    }

    const DeleteFileR = async (id) => {
        const result = Files.filter((data) => data.id !== id);
        SetFilesR(result)
    }

    const insert3 = async (values) => {
        await dispatch(saveReply(values));

        setLoadingSpinner(true)
    };

    const [replyClicked, setReplyClicked] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        const storedData = localStorage.getItem('appInstructionsData');
        let parsedData = null
        if (storedData) {
            parsedData = JSON.parse(storedData);
        }

        let num = parsedData?.num
        num = num.toString()
        if (msgSaveReply.status == '0') {
        }
        if (msgSaveReply.status == '1') {
            dispatch(getReply({
                search: {
                    "num": num,
                    "langType": langType
                }
            }))
            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
        }
        setReplyClicked(!replyClicked)
        setLoadingSpinner(false)
    }, [msgSaveReply])

    useEffect(() => {
        const storedData = localStorage.getItem('appInstructionsData');
        let parsedData = null
        if (storedData) {
            parsedData = JSON.parse(storedData);
        }

        let num = parsedData?.num
        num = num.toString()
        if (msgEditReply.status == '1') {
            dispatch(getReply({
                search: {
                    "num": num,
                    "langType": langType
                }
            }))

            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
        }
        setLoadingSpinner(false)
    }, [msgEditReply])

    useEffect(() => {
        const storedData = localStorage.getItem('appInstructionsData');
        let parsedData = null
        if (storedData) {
            parsedData = JSON.parse(storedData);
        }

        let num = parsedData?.num
        num = num.toString()
        if (msgDeleteReply.status == '1') {
            dispatch(getReply({
                search: {
                    "num": num,
                    "langType": langType
                }
            }))

            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
        }
        setLoadingSpinner(false)
    }, [msgDeleteReply])

    /*********************************** SIGIT MADE FROM HERE ***********************************/
    /*********************************** SIGIT MADE FROM HERE ***********************************/
    /*********************************** SIGIT MADE FROM HERE ***********************************/

    const [isHiddenReply, setIsHiddenReply] = useState(false)
    const [isHiddenLogs, setIsHiddenLogs] = useState(true)
    const [isEditableSelectedReply, setIsEditableSelectedReply] = useState(false)

    const [isYes, setIsYes] = useState(false)
    const [isYes2, setIsYes2] = useState(false)
    const [replyRow, setReplyRow] = useState()

    const [editedContent, setEditedContent] = useState('');

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
        setLoadingSpinner(true)
    };

    const handleEditReply = (reply_num, editedContent) => {
        var bodyForm = new FormData();
        let selectedNum = null

        replyData?.data?.replyList.map((row, index) => {
            if (index == reply_num) {
                selectedNum = row.num
            }
        })

        bodyForm.append('reply_num', selectedNum);
        bodyForm.append('content', editedContent);

        selectedDeletedReplyAtt?.map((item, index) => {
            bodyForm.append('removeFile', selectedDeletedReplyAtt[index])
        })

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        if (selectedfileR2.length > 0) {

            var getFileNm = selectedfileR2[0].filename;

            getFileNm = getFileNm.substring(getFileNm.lastIndexOf('.') + 1);

            if (getFileNm.match(/(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|csv)$/i)) {

                for (let index = 0; index < selectedfileR2.length; index++) {
                    let a = selectedfileR2[index];

                    bodyForm.append('file' + index, selectedfileR2[index].fileori);

                    SetSelectedFileR2([]);

                }


            } else {

                alert("Files type are not allowed to upload or not supported.");
            }
        } else {

            // 
            if (removeFile.length > 0) {
                removeFile.forEach(files => {
                    bodyForm.append('removeFile', files);
                });
            }

        }


        // setEditInstructionsSpinner(true);
        updateReply(bodyForm, config)
        setSelectedDeletedReplyAtt([])

    }


    const noEnterAllowed = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const confirmToggle = () => {
        setConfirmModal(!confirmModal)
    }

    const confirmToggle2 = (tempRow) => {
        if (tempRow?.num != null) {
            setReplyRow(tempRow)
        }
        setConfirmModal2(!confirmModal2)
    }

    /* DELETE INSTRUCTION */
    useEffect(() => {

        const handleDeleteInstructions = async () => {
            try {
                const map = {
                    "num": editInstructionsValidInput.values.no
                };
                await dispatch(deleteInstructions(map));
                setConfirmModal(!confirmModal);
            } catch (error) {
                console.log(error);
                setConfirmModal(!confirmModal);
            }
        };

        if (isYes === true) {
            handleDeleteInstructions();
            setConfirmModal(!confirmModal);
        }


    }, [isYes]);


    /* DELETE REPLY */
    useEffect(() => {
        const replyDelete = async () => {
            // 
            let row = replyRow

            if (isYes2 === true) {

                try {
                    var map = {
                        "reply_num": row.num
                    }
                    dispatch(deleteReply(map))

                    setLoadingSpinner(true)

                } catch (error) {
                    console.log(error)
                }

            } else {
                null
            }

        };

        if (isYes2 === true) {
            replyDelete();
        }

        setIsYes2(false)

    }, [replyRow, isYes2])

    const handleChangeDate = val => {
        if (val == "") {
            editInstructionsValidInput.setFieldValue("insDate", '')
        } else {
            editInstructionsValidInput.setFieldValue("insDate", val)
        }
    }

    const DeleteSelectFileR2 = (id) => {
        const result = selectedfileR2.filter((data) => data.id !== id);
        SetSelectedFileR2(result);
    }

    const handleDeleteAttachedReplyRow = async (fNum, fName) => {
        let tempDeletedFiles = []
        tempAttachReply2.map((item, index) => {
            if (fNum != item.num) {
                tempDeletedFiles.push(tempAttachReply2[index])
            }
        })
        setTempAttachReply2(tempDeletedFiles)
        setSelectedDeletedReplyAtt((oldFnum) => [...oldFnum, fNum])
    };


    const datepickerRef = useRef(null);

    useEffect(() => {
        const inputElement = datepickerRef.current.input;
        inputElement.addEventListener('keydown', handleDateInputKeydown);
        inputElement.addEventListener('paste', handleDateInputPaste);

        return () => {
            inputElement.removeEventListener('keydown', handleDateInputKeydown);
            inputElement.removeEventListener('paste', handleDateInputPaste);
        };
    }, []);

    const handleDateInputKeydown = (event) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
        }
    };

    const handleDateInputPaste = (event) => {
        event.preventDefault();
    };

    /* FOR MODAL */

    const [numTemp, setNumTemp] = useState()
    const [fileNmTemp, setFileNmTemp] = useState()

    const [downloadMsg, setDownloadMsg] = useState()

    // first
    const downloadCheckFileInst = (num, fileNm) => {
        setNumTemp(num)
        setFileNmTemp(fileNm)
    }

    const downloadAttach = async () => {
        try {
            var indexed_array = {
                "file_num": numTemp,
                "file_nm": fileNmTemp
            };
            await dispatch(downloadFiles(indexed_array));
        } catch (error) {
            console.log(error)
        }
    };

    // const downloadAttach = async () => {
    //     try {
    //         var indexed_array = {
    //             "file_num": numTemp,
    //             "file_nm": fileNmTemp
    //         };
    //         await dispatch(downloadFiles(indexed_array));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    const downloadMessage = useSelector(state => {
        return state.instructionsReducer.respGetCheckDownload;
    });

    const toggleMsgModal = () => {
        setDownloadMsgModal(!downloadMsgModal);
    };

    // first
    useEffect(() => {
        if (numTemp) {
            dispatch(getCheckDownloadData({ file_num: numTemp }))
        }
    }, [numTemp])

    useEffect(() => {
        debugger
        if (downloadMsg?.status === "0") {
            setDownloadMsg(downloadMessage);
            toggleMsgModal()
        } else if (downloadMsg?.status === "1") {
            downloadAttach()
        }
        setDownloadContentModal(downloadMessage.message)
        setDownloadMsg("")

    }, [downloadMsg])

    useEffect(() => {
        setDownloadMsg(downloadMessage)
    }, [downloadMessage])


    /* REPLY VALID INPUT */
    const initialValues = {
        content: '',
    };

    const validationSchemaReply = Yup.object().shape({
        content: Yup.string().required('Content is required'),
    });

    const onSubmit = (values) => {
        debugger

        if (values.content !== '') {
            var bodyForm = new FormData();

            bodyForm.append('instruction_num', editInstructionsValidInput.values.no);
            bodyForm.append('content', values.content);

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
            replyValidInput.setFieldValue('content', '')
        } else {
            replyValidInput.setFieldError('content', props.t('Please enter content'))
        }

    };

    const replyValidInput = useFormik({
        initialValues,
        validationSchemaReply,
        onSubmit,
    });

    /*********************************** ENDS HERE ***********************************/

    return (
        <RootPageCustom msgStateGet={appEditInstructionsMsg.message} msgStateSet={setAppEditInstructionsMsg}
            componentJsx={
                <>

                    <ConfirmModal
                        modal={confirmModal}
                        toggle={confirmToggle}
                        message={props.t("Are you sure to delete this?")}
                        setIsYes={setIsYes}
                    />

                    <ConfirmModal
                        modal={confirmModal2}
                        toggle={confirmToggle2}
                        message={props.t("Are you sure to delete this?")}
                        setIsYes={setIsYes2}
                    />

                    <MsgModal
                        modal={downloadMsgModal}
                        toggle={toggleMsgModal}
                        message={downloadContentModal}

                    />

                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
                    </div>

                    <Container fluid={true}>

                        <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit == "ALL" || getDetailInstructionData?.data?.instruction?.edit == "STATUS" ? 'flex' : 'none' }}>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>{props.t("Edit Instructions")}</CardHeader>
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
                                                            <Label>{props.t("Title")} <span style={{ color: "red" }}>* </span></Label>
                                                            <Input
                                                                disabled={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
                                                                maxLength={400}
                                                                name="title"
                                                                type="text"
                                                                onChange={editInstructionsValidInput.handleChange}
                                                                //onBlur={handleAutoSaveTitle}
                                                                value={editInstructionsValidInput.values.title || ""}
                                                                onKeyPress={noEnterAllowed}
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
                                                                {props.t("Instruction Date")}{" "}
                                                                <span style={{ color: "red" }}>* </span>
                                                            </Label>

                                                            <DatePicker
                                                                disabled={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
                                                                name="insDate"
                                                                ref={datepickerRef}
                                                                className="form-control"
                                                                dateFormat="yyyy-MM-dd"
                                                                onChange={date => {
                                                                    handleChangeDate(date);
                                                                    editInstructionsValidInput.handleChange('insDate', date);
                                                                }}
                                                                selected={editInstructionsValidInput.values.insDate ? new Date(editInstructionsValidInput.values.insDate) : null}
                                                            />

                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <Label>
                                                                {props.t("Status")} <span style={{ color: "red" }}>*</span>
                                                            </Label>
                                                            <Input
                                                                disabled={getDetailInstructionData?.data?.instruction?.edit !== "STATUS" && getDetailInstructionData?.data?.instruction?.edit !== "ALL"}
                                                                name="status"
                                                                type="select"
                                                                onChange={(e) => {
                                                                    editInstructionsValidInput.handleChange(e);
                                                                }}
                                                                value={editInstructionsValidInput.values.status}
                                                                invalid={editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status}
                                                            >
                                                                {statusData?.data?.statusList.map((value, key) => {
                                                                    if (value.use) {
                                                                        return (
                                                                            <option key={key} value={value.name}>
                                                                                {value.name}
                                                                            </option>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <option style={{ backgroundColor: "#DDDDDD" }} disabled key={key} value={value.name}>
                                                                            {value.name}
                                                                        </option>
                                                                    )
                                                                })}
                                                            </Input>
                                                            {editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status ? (
                                                                <FormFeedback type="invalid">{editInstructionsValidInput.errors.status}</FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <Label className="col-sm-5" style={{ marginTop: "15px" }}>
                                                                {props.t("Descriptions")}
                                                            </Label>

                                                            <Col>
                                                                <Input
                                                                    disabled={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
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
                                                            <Label> {props.t("Choose Owners")} </Label>
                                                            <Select
                                                                isDisabled={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
                                                                value={selectedMulti}
                                                                isMulti={true}
                                                                onChange={(e) => {
                                                                    handleMulti(e);
                                                                }}
                                                                options={optionOwner0}
                                                                className="select2-selection"
                                                                styles={getDetailInstructionData?.data?.instruction?.edit === "STATUS" ? colourStylesDisabled : colourStyles}
                                                                components={{
                                                                    DropdownIndicator: getDetailInstructionData?.data?.instruction?.edit === "STATUS" ? DropdownIndicatorDisabled : DropdownIndicator,
                                                                }}
                                                                placeholder={props.t("Select or type")}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Choose Managers")} </label>
                                                            <Select
                                                                isDisabled={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
                                                                value={selectedMulti2}
                                                                isMulti={true}
                                                                onChange={(e) => {
                                                                    handleMulti2(e);
                                                                }}
                                                                options={optionManager0}

                                                                className="select2-selection"
                                                                styles={getDetailInstructionData?.data?.instruction?.edit === "STATUS" ? colourStyles2Disabled : colourStyles2}
                                                                components={{
                                                                    DropdownIndicator: getDetailInstructionData?.data?.instruction?.edit === "STATUS" ? DropdownIndicatorDisabled : DropdownIndicator,
                                                                }}
                                                                placeholder={props.t("Select or type")}
                                                            />
                                                        </div>

                                                        <div className="col-sm-8">
                                                            <label>{props.t("Attached Files")} </label>

                                                            <Form onSubmit={FileUploadSubmit}>
                                                                <div className="kb-file-upload">

                                                                    <div className="file-upload-box">
                                                                        <input type="file"
                                                                            ref={refCleanser}
                                                                            hidden={getDetailInstructionData?.data?.instruction?.edit === "STATUS"}
                                                                            id="fileupload2"
                                                                            className="form-control"
                                                                            onChange={InputChange}
                                                                            name="removeFile"
                                                                            multiple
                                                                            accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <div className="kb-attach-box">
                                                                    {
                                                                        selectedfile.map((data, index) => {
                                                                            const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                            return (
                                                                                <div className="file-atc-box" key={id}>
                                                                                    <div className="file-detail">
                                                                                        <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{filename}</span>
                                                                                        &nbsp;&nbsp;&nbsp;

                                                                                        <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteSelectFile(id)} />

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
                                                                    <h6>{props.t("Recent files uploaded")}</h6>
                                                                    {
                                                                        Files.map((data, index) => {
                                                                            //const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                            return (
                                                                                <div className="file-atc-box" key={index}>
                                                                                    <div className="file-detail">
                                                                                        <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{data.name}</span>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i hidden={getDetailInstructionData?.data?.instruction?.edit === "STATUS"} className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteFileAttached(data.num)} />
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i className="mdi mdi-download" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => downloadCheckFileInst(data.num, data.name)} />

                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                : ''}
                                                            <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")}</span>
                                                        </div>
                                                    </Col>
                                                </Row>


                                            </FormGroup>

                                            <div className="text-sm-end col-10" >

                                                <Button type="submit" color="primary">
                                                    <i className="mdi mdi-check-circle fs-5 align-middle me-2"></i>
                                                    {props.t("Update")}
                                                </Button>&nbsp;

                                                <Button hidden={!getDetailInstructionData?.data?.instruction?.delete} color="danger" type="button" onClick={() => { confirmToggle() }}>
                                                    <i className="mdi mdi-delete-forever fs-5 align-middle me-2"></i>
                                                    {props.t("Delete")}
                                                </Button>&nbsp;
                                                <Button
                                                    type="button"
                                                    className="btn btn-danger "
                                                    onClick={() => { history.push('/AppInstructions'); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); setGetFiles([]); SetFiles([]); SetFiles2([]) }}
                                                >
                                                    <i className="mdi mdi-keyboard-backspace fs-5 align-middle" />{" "}
                                                    {props.t("Back")}
                                                </Button>
                                            </div>

                                        </Form>


                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row style={{ display: getDetailInstructionData?.data?.instruction?.edit == "ALL" || getDetailInstructionData?.data?.instruction?.edit == "STATUS" ? 'none' : 'flex' }}>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }} ><i className="mdi mdi-file-document fs-5 align-middle me-2"></i>{props.t("Detail Instructions")}</CardHeader>
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
                                                            <Label>{props.t("Title")} <span style={{ color: "red" }}>* </span></Label>
                                                            <Input
                                                                disabled
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
                                                                {props.t("Instruction Date")}{" "}
                                                                <span style={{ color: "red" }}>* </span>
                                                            </Label>

                                                            <DatePicker
                                                                disabled
                                                                name="insDate"
                                                                className="form-control"
                                                                dateFormat="yyyy-MM-dd"
                                                                onChange={date => {
                                                                    handleChangeDate(date);
                                                                    editInstructionsValidInput.handleChange('insDate', date);
                                                                }}
                                                                selected={editInstructionsValidInput.values.insDate ? new Date(editInstructionsValidInput.values.insDate) : null}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <Label> Status <span style={{ color: "red" }}>* </span></Label>

                                                            <Input
                                                                disabled
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
                                                                {props.t("Descriptions")}
                                                            </Label>

                                                            <Col>
                                                                <Input
                                                                    disabled
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
                                                            <Label> {props.t("Choose Owners")} </Label>

                                                            <Select
                                                                isDisabled
                                                                value={selectedMulti}
                                                                isMulti={true}
                                                                onChange={(e) => {
                                                                    handleMulti(e);
                                                                }}
                                                                options={optionOwner0}
                                                                className="select2-selection"
                                                                styles={colourStylesDisabled}
                                                                components={{
                                                                    DropdownIndicator: DropdownIndicatorDisabled
                                                                }}
                                                                placeholder={'Select or type...'}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Choose Managers")} </label>
                                                            <Select
                                                                isDisabled
                                                                value={selectedMulti2}
                                                                isMulti={true}
                                                                onChange={(e) => {
                                                                    handleMulti2(e);
                                                                }}
                                                                options={optionManager0}

                                                                className="select2-selection"
                                                                styles={colourStyles2Disabled}
                                                                components={{
                                                                    DropdownIndicator: DropdownIndicatorDisabled
                                                                }}
                                                                placeholder={'Select or type...'}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Attached Files")} </label>

                                                            {/* <Form onSubmit={FileUploadSubmit}>
                                                                <div className="kb-file-upload">

                                                                    <div className="file-upload-box">
                                                                        <input disabled type="file" id="fileupload2" className="form-control" onChange={InputChange} name="removeFile" multiple accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt"/>
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

                                                            </Form> */}
                                                            {Files.length > 0 ?
                                                                <div className="kb-attach-box">


                                                                    {
                                                                        Files.map((data, index) => {
                                                                            //const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                            return (
                                                                                <div className="file-atc-box" key={index}>
                                                                                    <div className="file-detail">
                                                                                        <span><i className="mdi mdi-paperclip" style={{ fontSize: "20px", verticalAlign: "middle" }} />&nbsp;{data.name}</span>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        {/* <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteFileAttached(data.num)} /> */}
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i className="mdi mdi-download" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => downloadCheckFileInst(data.num, data.name)} />

                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                : ''}
                                                        </div>
                                                        <span style={{ fontSize: "12px", color: "blue" }} >{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")}</span>
                                                    </Col>
                                                </Row>


                                            </FormGroup>
                                        </Form>

                                        <div className="text-sm-end col-10" >

                                            <Button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => { history.push('/AppInstructions'); setOptionManager0([]); setOptionOwner0([]); setOptionOwner([]); setOptionManager([]); setGetFiles([]); SetFiles([]); SetFiles2([]) }}
                                            >
                                                <i className="mdi mdi-keyboard-backspace fs-5 align-middle" />{" "}
                                                {props.t("Back")}
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
                                                <i className="mdi mdi-forum fs-5 align-middle me-2"></i>{props.t("Replies")}
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

                                                <div className="row col-8">
                                                    <div className="col">
                                                        <form onSubmit={replyValidInput.handleSubmit}>
                                                            <div className="mb-2">
                                                                <div className="input-group">
                                                                    <div className="col-sm-12">
                                                                        <label>{props.t("Answer")}</label>
                                                                        <Input
                                                                            style={{
                                                                                minHeight: "10em",
                                                                            }}
                                                                            maxLength={400}
                                                                            placeholder={props.t("Please input your answer here")}
                                                                            name="content"
                                                                            type="textarea"
                                                                            onChange={(event) => {
                                                                                replyValidInput.handleChange(event);
                                                                            }}
                                                                            value={replyValidInput.values.content || ""}
                                                                            invalid={
                                                                                replyValidInput.touched.content && replyValidInput.errors.content ? true : false
                                                                            }
                                                                        />
                                                                        {replyValidInput.touched.content && replyValidInput.errors.content && (
                                                                            <div className="invalid-feedback">{replyValidInput.errors.content}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-1">
                                                                <div className="mb-3 col-sm-12">
                                                                    <label>{props.t("Attached Files")}</label>
                                                                    <div className="kb-file-upload">
                                                                        <div className="file-upload-box">
                                                                            <input
                                                                                type="file"
                                                                                id="fileupload3"
                                                                                className="form-control"
                                                                                multiple
                                                                                accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt"
                                                                                onChange={(event) => {
                                                                                    replyValidInput.setFieldValue('files', event.currentTarget.files);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <div className="kb-attach-box mb-3">
                                                                        {replyValidInput.values.files &&
                                                                            Array.from(replyValidInput.values.files).map((file, index) => (
                                                                                <div className="file-atc-box" key={index}>
                                                                                    {/* Display file details here */}
                                                                                    <div className="file-detail">
                                                                                        <span>
                                                                                            <i className="fas fa-paperclip" />
                                                                                            &nbsp;{file.name}
                                                                                        </span>
                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                        <i
                                                                                            className="mdi mdi-close"
                                                                                            style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }}
                                                                                            onClick={() => {
                                                                                                const newFiles = Array.from(replyValidInput.values.files);
                                                                                                newFiles.splice(index, 1);
                                                                                                replyValidInput.setFieldValue('files', newFiles);
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        <span style={{ fontSize: "12px", color: "blue" }}>{props.t("Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm-end col-12">
                                                                <button type="submit" className="btn btn-primary ms-1">
                                                                    <i className="mdi mdi-send align-middle me-2" />
                                                                    {props.t("Reply")}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                &nbsp;
                                                <Row>
                                                    <hr />
                                                </Row>
                                                <Row style={{ marginTop: "15px" }}>
                                                    <Col md="12">
                                                        <Row>
                                                            {
                                                                replyData?.data?.replyList?.length > 0 && replyData?.data?.replyList.map((row, reply_num) => (
                                                                    <div
                                                                        key={reply_num}
                                                                        className="reply-row my-1 p-3"
                                                                        style={{
                                                                            backgroundColor: "#EEE",
                                                                            display: "flex",
                                                                            alignItems: "flex-start",
                                                                            justifyContent: "space-between",
                                                                        }}
                                                                    >
                                                                        <div className="reply-num" style={{ width: "0.01%" }}>
                                                                            {reply_num + 1}
                                                                        </div>
                                                                        <div className="reply-fill" style={{ width: "90%" }}>
                                                                            <div className="reply-content d-flex align-items-start mb-1">
                                                                                <div className="vertical-line" style={{ borderLeft: "2px solid #919191", height: "16px", margin: "0 10px" }} />

                                                                                {selectedRowIndex === reply_num ? (
                                                                                    <Input
                                                                                        maxLength={1900}
                                                                                        style={{ maxWidth: "82%", height: "10em" }}
                                                                                        name="content"
                                                                                        type="textarea"
                                                                                        value={editedContent}
                                                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                                                    />
                                                                                ) : (


                                                                                    <b
                                                                                        style={{
                                                                                            whiteSpace: "pre-wrap",
                                                                                            overflowWrap: "break-word",
                                                                                            wordWrap: "break-word",
                                                                                            wordBreak: "break-word",
                                                                                        }}
                                                                                    >{row.content}</b>

                                                                                )}
                                                                            </div>
                                                                            {selectedRowIndex === reply_num ? (
                                                                                tempAttachReply2.map((file, index) => (
                                                                                    <React.Fragment key={index}>
                                                                                        <div className="reply-attachment d-flex align-items-start mb-1">
                                                                                            <div className="vertical-line" style={{ borderLeft: "2px solid #919191", height: "16px", margin: "0 10px" }} />
                                                                                            <i className="mdi mdi-paperclip" style={{ cursor: "pointer", verticalAlign: "middle" }} onClick={() => downloadCheckFileInst(file.num, file.name)} />
                                                                                            <u
                                                                                                style={{ cursor: "pointer", display: "inline-block", maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                                                                                onClick={() => downloadCheckFileInst(file.num, file.name)}
                                                                                            >
                                                                                                {file.name}
                                                                                            </u>
                                                                                            &nbsp;
                                                                                            <i
                                                                                                style={{ cursor: "pointer", fontSize: "20px", marginTop: "-4px" }}
                                                                                                className="mdi mdi-download"
                                                                                                onClick={() => downloadCheckFileInst(file.num, file.name)}
                                                                                            />
                                                                                            {selectedRowIndex === reply_num && (
                                                                                                <i
                                                                                                    style={{ cursor: "pointer", fontSize: "20px", marginTop: "-4px", marginLeft: "10px" }}
                                                                                                    className="mdi mdi-close"
                                                                                                    onClick={() => handleDeleteAttachedReplyRow(file.num, file.name)}
                                                                                                />
                                                                                            )}
                                                                                            <br />
                                                                                        </div>
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ) : (
                                                                                row.attachFileList.map((file, index) => (
                                                                                    <React.Fragment key={index}>
                                                                                        <div className="reply-attachment d-flex align-items-start mb-1">
                                                                                            <div className="vertical-line" style={{ borderLeft: "2px solid #919191", height: "16px", margin: "0 10px" }} />
                                                                                            <i className="mdi mdi-paperclip" style={{ cursor: "pointer", verticalAlign: "middle" }} onClick={() => downloadCheckFileInst(file.num, file.name)} />
                                                                                            <u
                                                                                                style={{ cursor: "pointer", display: "inline-block", maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                                                                                onClick={() => downloadCheckFileInst(file.num, file.name)}
                                                                                            >
                                                                                                {file.name}
                                                                                            </u>
                                                                                            &nbsp;
                                                                                            <i
                                                                                                style={{ cursor: "pointer", fontSize: "20px", marginTop: "-4px" }}
                                                                                                className="mdi mdi-download"
                                                                                                onClick={() => downloadCheckFileInst(file.num, file.name)}
                                                                                            />
                                                                                            <br />
                                                                                        </div>
                                                                                    </React.Fragment>
                                                                                ))
                                                                            )}

                                                                            <Row style={{ paddingLeft: "24px" }}>
                                                                                <Col sm="10">
                                                                                    <div className="col-sm-12">

                                                                                        <Form onSubmit={FileUploadSubmitR2}>
                                                                                            <div className="kb-file-upload">

                                                                                                {selectedRowIndex === reply_num && (
                                                                                                    <div className="file-upload-box">
                                                                                                        <input type="file" id="fileupload3" className="form-control" ref={refCleanser} onChange={InputChangeR2} name="removeFile" multiple accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt" />
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            &nbsp;
                                                                                            <div className="kb-attach-box">
                                                                                                {selectedRowIndex === reply_num && selectedfileR2.map((data, index) => {
                                                                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                                                    return (
                                                                                                        <div className="file-atc-box" key={id}>
                                                                                                            {filename.match(/\.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/i) ? (
                                                                                                                <div className="file-image"></div>
                                                                                                            ) : (
                                                                                                                <div className="file-image"></div>
                                                                                                            )}
                                                                                                            <div className="file-detail">
                                                                                                                <span><i className="fas fa-paperclip" />&nbsp;{filename}</span>
                                                                                                                &nbsp;&nbsp;&nbsp;
                                                                                                                <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteSelectFileR2(id)} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    );
                                                                                                })}
                                                                                            </div>
                                                                                        </Form>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                            <div className="reply-history d-flex align-items-start">
                                                                                <div className="vertical-line" style={{ borderLeft: "2px solid #919191", height: "16px", margin: "0 10px" }} />
                                                                                <i>{row.write_time}</i>&nbsp; {props.t("by")} {row.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="reply-actions" style={{ width: "7%", display: "flex", justifyContent: "end" }}>
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
                                                                                    {selectedRowIndex === reply_num ?
                                                                                        <span className="mdi mdi-check-bold" style={{ fontSize: "18px" }}></span>
                                                                                        :
                                                                                        <span className="mdi mdi-pencil-outline" style={{ fontSize: "18px" }}></span>
                                                                                    }
                                                                                </a>
                                                                            ) : ('')}

                                                                            &nbsp;&nbsp;&nbsp;
                                                                            {row.delete ? (
                                                                                <a className="text-primary" onClick={() => confirmToggle2(row)}>
                                                                                    <span className="mdi mdi-trash-can-outline text-danger" style={{ fontSize: "18px" }}></span>
                                                                                </a>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

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
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(EditInstructions)