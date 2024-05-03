import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Spinner,
    UncontrolledAlert,
} from "reactstrap"
import * as Yup from "yup"
import {
    deleteReply,
    downloadFile,
    editInstructions,
    deleteInstructions,
    editReply,
    getAttachmentData,
    getLogs,
    getManager,
    getOwner,
    getStatus,
    resetMessage,
    getCheckDownloadData
} from "../../store/Instruction/actions"
import {
    getDetailInstruction,
    getReply,
    getSelectedManager
} from "../../store/Instruction/actions"
import { format } from "date-fns"
import moment from "moment"
import { ReactSession } from "react-client-session"
import Select, { components } from "react-select"
import shortid from "shortid"
import { downloadFileBE } from "helpers/backend_helper"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import RootPageCustom from "common/RootPageCustom"
import ConfirmModal from "components/Common/ConfirmModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { withTranslation } from "react-i18next"
import MsgModal from "components/Common/MsgModal"
import AddReply from "./AddReply"
import EditReply from "./EditReply"

const EditInstruction = props => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    if (!langType) {
        localStorage.setItem("I18N_LANGUAGE", "kor")
    }

    const dispatch = useDispatch()
    const history = useHistory()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [updateNoReply, setUpdateNoReply] = useState(false)
    const [appEditInstructionsMsg, setAppEditInstructionsMsg] = useState("")
    const [selectedMulti, setselectedMulti] = useState([])
    const [selectedMulti2, setselectedMulti2] = useState([])
    const [optionOwner0, setOptionOwner0] = useState([])
    const [optionManager0, setOptionManager0] = useState([])
    const [replyTabelListData, setReplyTabelListData] = useState([])
    const [getSelectedFiles, setGetSelectedFiles] = useState([])
    const [selectedfile, SetSelectedFile] = useState([])
    const [Files, SetFiles] = useState([])
    const [replyNum, setReplyNum] = useState([])
    const [addUser, setAddUser] = useState([])
    const [removeUser, setRemoveUser] = useState([])
    const [removeFile, setRemoveFile] = useState([])
    const [confirmModal, setConfirmModal] = useState(false)
    const [confirmModal2, setConfirmModal2] = useState(false)
    const [tempAttachReply, setTempAttachReply] = useState([])
    const [tempAttachReply2, setTempAttachReply2] = useState([])
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const [selectedDeletedReplyAtt, setSelectedDeletedReplyAtt] = useState([])
    const [downloadMsgModal, setDownloadMsgModal] = useState(false)
    const [downloadContentModal, setDownloadContentModal] = useState("")
    const [onlyReply, setOnlyReply] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false)

    const queryParameters = new URLSearchParams(window.location.search)
    const queryNum = queryParameters.get("num")

    const getOwnerList = useSelector(state => {
        return state.instructionsReducer.respGetOwner
    })

    const getManagerList = useSelector(state => {
        return state.instructionsReducer.respGetManager
    })

    const selectedManager = useSelector(state => {
        return state.instructionsReducer.respGetSelectedManager
    })

    const statusData = useSelector(state => {
        return state.instructionsReducer.respGetStatus
    })

    const editInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgEdit
    })

    const msgSaveReply = useSelector(state => {
        return state.instructionsReducer.msgAddReply
    })

    const msgEditReply = useSelector(state => {
        return state.instructionsReducer.msgEditReply
    })

    const msgDeleteReply = useSelector(state => {
        return state.instructionsReducer.msgDeleteReply
    })

    const getDetailInstructionData = useSelector(state => {
        return state.instructionsReducer.respGetDetailInstruction
    })

    const replyData = useSelector(state => {
        return state.instructionsReducer.respGetReply
    })

    const attachmentInstructionData = useSelector(state => {
        return state.instructionsReducer.respGetAttachment
    })

    const logsData = useSelector(state => {
        return state.instructionsReducer.respGetLogs
    })

    const deleteInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgDelete
    })

    const downloadMessage = useSelector(state => {
        return state.instructionsReducer.respGetCheckDownload
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        let num = queryNum?.toString()
        dispatch(
            getDetailInstruction({
                search: {
                    num: num,
                    langType: langType,
                },
            })
        )
        dispatch(
            getStatus({
                search: {
                    num: num,
                    langType: langType,
                },
            })
        )
        dispatch(
            getManager({
                search: {
                    num: num,
                    langType: langType,
                },
            })
        )
        dispatch(
            getOwner({
                search: {
                    num: num,
                    langType: langType,
                },
            })
        )
        dispatch(
            getSelectedManager({
                search: {
                    num: num,
                    langType: langType,
                },
            })
        )
        dispatch(
            getAttachmentData({
                search: {
                    instruction_num: num,
                    langType: langType,
                },
            })
        )
    }, [langType])

    useEffect(() => {
        let selectedOwner = null
        selectedOwner = getDetailInstructionData?.data?.instruction.owner
        if (selectedOwner) {
            selectedOwner = [
                {
                    label: selectedOwner.name,
                    value: selectedOwner.id,
                    bgColor: selectedOwner.bgColor,
                },
            ]
        }
        setselectedMulti(selectedOwner)
        if (selectedOwner === null) {
            setOptionOwner0(
                getOwnerList?.data?.ownerList.map(owner => ({
                    value: owner.id,
                    label: owner.name,
                    bgColor: owner.bgColor,
                }))
            )
        } else {
            setOptionOwner0([])
        }
        const managerList = selectedManager?.data?.managerList
        if (managerList) {
            const uniqueManagers = []
            const seenNames = new Set()
            managerList.forEach(manager => {
                const name = manager.name
                const gname = manager.gname
                const fullName = gname !== null ? `${name} (${gname})` : name
                if (!seenNames.has(fullName)) {
                    seenNames.add(fullName)
                    uniqueManagers.push({
                        value: manager.id,
                        label: fullName,
                        gname: manager.gname,
                    })
                }
            })
            setselectedMulti2(uniqueManagers)
        }
        setOptionManager0(
            getManagerList?.data?.managerList.map(manager => ({
                value: manager.id,
                label:
                    manager.name +
                    (manager.gname !== null ? ` (` + manager.gname + `)` : ""),
                gname: manager.gname,
            }))
        )
        if (attachmentInstructionData?.data?.attachFileList) {
            const entries = Object.values(
                attachmentInstructionData?.data?.attachFileList
            )
            SetFiles(entries)
        }
        editInstructionFormik.setFieldValue("no", queryNum)
        editInstructionFormik.setFieldValue(
            "title",
            getDetailInstructionData?.data?.instruction?.title
        )
        const inputDateString =
            getDetailInstructionData?.data?.instruction?.insDate?.toString()

        if (inputDateString) {
            const inputDate = new Date(inputDateString)
            const timeZoneOffset = 7 * 60
            const adjustedDate = new Date(
                inputDate.getTime() + timeZoneOffset * 60 * 1000
            )
            editInstructionFormik.setFieldValue("insDate", adjustedDate)
        }
        editInstructionFormik.setFieldValue(
            "status",
            getDetailInstructionData?.data?.instruction?.status
        )
        editInstructionFormik.setFieldValue(
            "description",
            getDetailInstructionData?.data?.instruction?.description
        )
    }, [
        getDetailInstructionData,
        selectedManager,
        getManagerList,
        getOwnerList,
        attachmentInstructionData,
    ])

    useEffect(() => {
        replyData?.data?.replyList?.length > 0 &&
            replyData.data.replyList.map((row, reply_num) => {
                if (
                    reply_num === selectedRowIndex &&
                    (selectedRowIndex != null || selectedRowIndex != undefined)
                ) {
                    row.attachFileList.map((file, index) => {
                        setTempAttachReply(oldFile => [...(oldFile || []), file])
                    })
                }
            })
        SetSelectedFileR2([])
        setTempAttachReply2([])
    }, [selectedRowIndex])

    useEffect(() => {
        if (tempAttachReply?.length > 0) {
            setTempAttachReply(null)
            setTempAttachReply2(tempAttachReply)
        }
    }, [tempAttachReply])

    useEffect(() => {
        if (replyNum != null && replyNum != undefined) {
            setReplyNum(replyNum)
            return
        }
    }, [replyNum], [])

    const editInstructionFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            insDate: "",
            description: "",
            status: "",
            content: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required({
                eng: {
                    title: "Please enter instructions.",
                },
                kor: {
                    title: "지시사항을 입력해 주세요.",
                },
                idr: {
                    title: "Harap masukkan instruksi.",
                },
            }[langType]?.title),
        }),
        onSubmit: values => {
            setSubmitClicked(true)
            if (getDetailInstructionData?.data?.instruction?.comment === false) {
                var bodyForm = new FormData()
                bodyForm.append("num", values.no)
                bodyForm.append("title", editInstructionFormik.values.title)
                bodyForm.append(
                    "insDate",
                    format(editInstructionFormik.values.insDate, "yyyy-MM-dd")
                )
                bodyForm.append("description", values.description)
                const uniqueAddUser = new Set(addUser)
                const uniqueRemoveUser = new Set(removeUser)
                const filteredAddUser = Array.from(uniqueAddUser).filter(
                    user => !uniqueRemoveUser.has(user)
                )
                const filteredRemoveUser = Array.from(uniqueRemoveUser).filter(
                    user => !uniqueAddUser.has(user)
                )
                filteredAddUser.forEach(user => {
                    bodyForm.append("addUser", user)
                })
                filteredRemoveUser.forEach(user => {
                    bodyForm.append("removeUser", user)
                })
                let statusId = null
                statusId = statusData?.data?.statusList.map((item, index) => {
                    if (item.name == values.status) {
                        bodyForm.append("status", item.no)
                    }
                })
                if (selectedfile.length > 0) {
                    var getFileNm = selectedfile[0].filename
                    getFileNm = getFileNm.substring(getFileNm.lastIndexOf(".") + 1)
                    if (
                        getFileNm.match(
                            /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
                        )
                    ) {
                        for (let index = 0; index < selectedfile.length; index++) {
                            let a = selectedfile[index]

                            bodyForm.append("file" + index, selectedfile[index].fileori)

                            console.log(a)
                            SetSelectedFile([])
                            SetFiles([...Files, a])
                        }
                    } else {
                        alert("Files type are not allowed to upload or not supported.")
                    }
                }
                if (removeFile.length > 0) {
                    removeFile.forEach(files => {
                        bodyForm.append("removeFile", files)
                    })
                }
                insert(bodyForm, {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                })
            } else {
                if (
                    getDetailInstructionData?.data?.instruction?.comment &&
                    !addReplyModal
                ) {
                    toggleAddReplyModal()
                }
            }
        }
    })

    const insert = async values => {
        await dispatch(editInstructions(values))
        setLoadingSpinner(true)
    }

    useEffect(() => {
        if (deleteInstructionsMessage.status == "1") {
            history.push({
                pathname: "/AppInstructions",
            })
            ReactSession.set("appEditInstructionsMsg", deleteInstructionsMessage)
        }
    }, [deleteInstructionsMessage])

    function DeleteFileAttached(FileNo) {
        if (SetFiles.length > 0) {
            for (let index = 0; index < SetFiles.length; index++) {
                let a = SetFiles[index]

                const result = Object.values(Files).filter(data => data.num !== FileNo)
                let temp = null
                temp = removeFile
                temp.push(FileNo)
                setRemoveFile(temp)
                SetFiles(result)
            }
        }
    }

    const refCleanser = useRef(null)

    const InputChange = e => {
        const allowedFileExtensions =
            /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
        const selectedFiles = Array.from(e.target.files)
        const validFiles = selectedFiles.filter(file =>
            allowedFileExtensions.test(file.name)
        )
        const invalidFiles = selectedFiles.filter(
            file => !allowedFileExtensions.test(file.name)
        )
        if (invalidFiles.length === 0 && validFiles.length > 0) {
            const processedFiles = []
            validFiles.forEach(file => {
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
                        SetSelectedFile(prevValue => [...prevValue, ...processedFiles])
                    }
                }
                reader.readAsDataURL(file)
            })
        } else if (e.target.files.length != 0) {
            alert(
                "No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv"
            )
            if (refCleanser.current) {
                refCleanser.current.value = "";
            }
            if (e.target) {
                e.target.value = "";
            }
        }
    }

    const DeleteSelectFile = id => {
        SetSelectedFile(selectedfile.filter(data => data.id !== id))
    }

    const FileUploadSubmit = async e => {
        e.preventDefault()
        e.target.reset()
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles(preValue => {
                    return [...preValue, selectedfile[index]]
                })
                break
            }
            SetSelectedFile([])
        } else {
        }
    }

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <i className="mdi mdi-plus-thick" />
            </components.DropdownIndicator>
        )
    }

    const DropdownIndicatorDisabled = () => {
        return null
    }

    const colourStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor:
                state.isFocused || state.isSelected || state.isDisabled
                    ? "white"
                    : "white",
            border: 0,
            boxShadow: "none",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "#e6e6e6"
                            : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                        ? "white"
                            ? "white"
                            : "black"
                        : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            }
        },
        multiValue: (styles, { data }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: color,
            }
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "white",
            fontSize: "13px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "7.5px",
            paddingBottom: "7.5px",
            borderRadius: "0.25rem",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "white",
            ":hover": {
                backgroundColor: data.bgColor,
                color: "white",
            },
        }),
    }

    const colourStylesDisabled = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused || state.isSelected ? "white" : "white",
            border: 0,
            boxShadow: "none",
            "& input": {
                paddingRight: "0",
            },
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "#e6e6e6"
                            : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                        ? "white"
                            ? "white"
                            : "black"
                        : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            }
        },
        multiValue: (styles, { data }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: color,
            }
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "white",
            fontSize: "13px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "7.5px",
            paddingBottom: "7.5px",
            borderRadius: "0.25rem",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.bgColor,
        }),

        DropdownIndicator: (base, state) => ({
            ...base,
            display: "block",
        }),
    }
    const colourStyles2 = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isSelected ? "white" : "white",
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isDisabled ? "white" : "white",
            border: 0,
            boxShadow: "none",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "#e6e6e6"
                            : undefined,
                color: isDisabled ? "#ccc" : isSelected ? "white" : "black", // <-- Updated line here
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            }
        },
        multiValue: (styles, { data }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: "#579DFF",
            }
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "white",
            fontSize: "13px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "7.5px",
            paddingBottom: "7.5px",
            borderRadius: "4px",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "white",
            ":hover": {
                backgroundColor: data.bgColor,
                color: "white",
            },
        }),
    }
    const colourStyles2Disabled = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isSelected ? "white" : "white",
            borderColor: state.isFocused ? "white" : "white",
            borderColor: state.isDisabled ? "white" : "white",
            border: 0,
            boxShadow: "none",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "#e6e6e6"
                            : undefined,
                color: isDisabled ? "#ccc" : isSelected ? "white" : "black", // <-- Updated line here
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color
                        : undefined,
                },
            }
        },
        multiValue: (styles, { data }) => {
            const color = data.bgColor
            return {
                ...styles,
                backgroundColor: "#579DFF",
            }
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "white",
            fontSize: "13px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "7.5px",
            paddingBottom: "7.5px",
            borderRadius: "4px",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#579DFF",
        }),
    }

    function handleMulti(s) {
        const currentSelection = (selectedMulti || []).map(item => item.value)
        const addedValues = s.filter(item => !currentSelection.includes(item.value))
        const deletedValues = currentSelection.filter(
            item => !s.some(selectedItem => selectedItem.value === item)
        )
        addedValues.forEach(addedItem => {
            setAddUser(current => [...current, addedItem.value])
        })
        deletedValues.forEach(deletedItem => {
            setRemoveUser(current => [...current, deletedItem])
        })
        if (s && s.length === 0) {
            setOptionOwner0(
                getOwnerList?.data?.ownerList.map(owner => ({
                    value: owner.id,
                    label: owner.name,
                    bgColor: owner.bgColor,
                }))
            )
        } else {
            setOptionOwner0([])
        }
        setselectedMulti(s)
    }

    function handleMulti2(s) {
        const currentSelection = selectedMulti2.map((item) => item.value)
        const addedValues = s.filter((item) => !currentSelection.includes(item.value))
        const deletedValues = currentSelection.filter(
            item => !s.some((selectedItem) => selectedItem.value === item)
        )
        addedValues.forEach(addedItem => {
            setAddUser(current => [...current, addedItem.value])
        })
        deletedValues.forEach(deletedItem => {
            setRemoveUser(current => [...current, deletedItem])
        })
        setselectedMulti2(s)
    }

    const [selectedfileR, SetSelectedFileR] = useState([])
    const [selectedfileR2, SetSelectedFileR2] = useState([])
    const [FilesR, SetFilesR] = useState([])
    const [FilesR2, SetFilesR2] = useState([])

    const FileUploadSubmitR2 = async e => {
        e.preventDefault()
        e.target.reset()
        if (selectedfileR2.length > 0) {
            SetFilesR2(prevFiles => [...prevFiles, ...selectedfileR2])
            SetSelectedFileR2([])
            if (refCleanser.current) {
                refCleanser.current.value = "";
            }
        }
    }

    const [replyClicked, setReplyClicked] = useState(false)

    useEffect(() => {
        let num = queryNum
        num = num?.toString()
        if (msgSaveReply.status == "0") {
            setLoadingSpinner(false)
        }
        if (msgSaveReply.status == "1" || updateNoReply) {
            setUpdateNoReply(false)
            if (getDetailInstructionData?.data?.instruction?.comment && !onlyReply) {
                var bodyForm = new FormData()

                bodyForm.append("num", num)
                bodyForm.append("title", editInstructionFormik.values.title)

                bodyForm.append(
                    "insDate",
                    format(editInstructionFormik.values.insDate, "yyyy-MM-dd")
                )
                bodyForm.append(
                    "description",
                    editInstructionFormik.values.description
                )

                //remove/add - Owner & Manager//

                const uniqueAddUser = new Set(addUser)
                const uniqueRemoveUser = new Set(removeUser)

                const filteredAddUser = Array.from(uniqueAddUser).filter(
                    user => !uniqueRemoveUser.has(user)
                )
                const filteredRemoveUser = Array.from(uniqueRemoveUser).filter(
                    user => !uniqueAddUser.has(user)
                )

                filteredAddUser.forEach(user => {
                    bodyForm.append("addUser", user)
                })

                filteredRemoveUser.forEach(user => {
                    bodyForm.append("removeUser", user)
                })

                //end//

                //status//

                let statusId = null
                statusId = statusData?.data?.statusList.map((item, index) => {
                    if (item.name == editInstructionFormik.values.status) {
                        bodyForm.append("status", item.no)
                    }
                })

                //end status//

                //attach files//

                if (selectedfile.length > 0) {
                    var getFileNm = selectedfile[0].filename

                    getFileNm = getFileNm.substring(getFileNm.lastIndexOf(".") + 1)

                    if (
                        getFileNm.match(
                            /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
                        )
                    ) {
                        for (let index = 0; index < selectedfile.length; index++) {
                            let a = selectedfile[index]

                            bodyForm.append("file" + index, selectedfile[index].fileori)

                            console.log(a)
                            SetSelectedFile([])
                            SetFiles([...Files, a])
                        }
                    } else {
                        alert("Files type are not allowed to upload or not supported.")
                    }
                }

                if (removeFile.length > 0) {
                    removeFile.forEach(files => {
                        bodyForm.append("removeFile", files)
                    })
                }

                //end//

                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
                insert(bodyForm, config)
                setLoadingSpinner(false)
            }

            dispatch(
                getReply({
                    offset: offset,
                    limit: 5,
                    search: {
                        num: num,
                        langType: langType,
                    },
                })
            )
            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
        }
        setReplyClicked(false)
        setLoadingSpinner(false)
    }, [msgSaveReply, updateNoReply])

    useEffect(() => {
        let num = queryNum
        num = num?.toString()
        if (msgEditReply.status == "1") {
            dispatch(
                getReply({
                    offset: offset,
                    limit: 5,
                    search: {
                        num: num,
                        langType: langType,
                    },
                })
            )

            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
            setLoadingSpinner(false)
        }
    }, [msgEditReply])

    useEffect(() => {
        let num = queryNum
        num = num?.toString()
        if (msgDeleteReply.status == "1") {
            dispatch(
                getReply({
                    offset: offset,
                    limit: 5,
                    search: {
                        num: num,
                        langType: langType,
                    },
                })
            )

            if (refCleanser.current != null) {
                refCleanser.current.value = ""
            }
            setLoadingSpinner(false)
        }
    }, [msgDeleteReply])

    /** SIGIT MADE FROM HERE **/

    const [isHiddenReply, setIsHiddenReply] = useState(false)
    const [isHiddenLogs, setIsHiddenLogs] = useState(true)
    const [isYes, setIsYes] = useState(false)
    const [isYes2, setIsYes2] = useState(false)
    const [replyRow, setReplyRow] = useState()
    const [editedContent, setEditedContent] = useState("")

    useEffect(() => {
        if (getDetailInstructionData?.data?.instruction?.replyList) {
            setReplyTabelListData(
                getDetailInstructionData?.data?.instruction?.replyList
            )
        }
    }, [replyTabelListData])

    useEffect(() => {
        let tempMsg = ReactSession.get("appEditInstructionsMsg")
        let num = queryNum?.toString()
        if (
            editInstructionsMessage.status === "1" &&
            getDetailInstructionData?.data?.instruction?.comment &&
            !addReplyModal &&
            tempMsg == ""
        ) {
            history.push({
                pathname: "/AppInstructions",
            })
            setLoadingSpinner(false)
            ReactSession.set("appEditInstructionsMsg", editInstructionsMessage)
        } else if (
            editInstructionsMessage.status == "1" &&
            !onlyReply &&
            ReactSession.get("appEditInstructionsMsg")?.status !== "1" &&
            tempMsg == ""
        ) {
            history.push({
                pathname: "/AppInstructions",
            })
            setLoadingSpinner(false)
            ReactSession.set("appEditInstructionsMsg", editInstructionsMessage)
        } else if (editInstructionsMessage.status == "1" && submitClicked) {
            history.push({
                pathname: "/AppInstructions",
            })

            ReactSession.set("appEditInstructionsMsg", editInstructionsMessage)
        }

        setLoadingSpinner(false)
        setSubmitClicked(false)

        localStorage.removeItem("tempSelect")
        setAppEditInstructionsMsg(editInstructionsMessage)
    }, [editInstructionsMessage])

    const updateReply = async values => {
        await dispatch(editReply(values))
    }

    const handleEditReply = (reply_num, editedContent) => {
        var bodyForm = new FormData()
        let selectedNum = null

        replyData?.data?.replyList.map((row, index) => {
            if (index == reply_num) {
                selectedNum = row.num
            }
        })

        bodyForm.append("reply_num", selectedNum)
        bodyForm.append("content", editedContent)

        selectedDeletedReplyAtt?.map((item, index) => {
            bodyForm.append("removeFile", selectedDeletedReplyAtt[index])
        })

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        }

        if (selectedfileR2.length > 0) {
            var getFileNm = selectedfileR2[0].filename

            getFileNm = getFileNm.substring(getFileNm.lastIndexOf(".") + 1)

            if (
                getFileNm.match(
                    /(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
                )
            ) {
                for (let index = 0; index < selectedfileR2.length; index++) {
                    let a = selectedfileR2[index]

                    bodyForm.append("file" + index, selectedfileR2[index].fileori)

                    SetSelectedFileR2([])
                }
            } else {
                alert("Files type are not allowed to upload or not supported.")
            }
        } else {
            //
            if (removeFile.length > 0) {
                removeFile.forEach(files => {
                    bodyForm.append("removeFile", files)
                })
            }
        }

        // setEditInstructionsSpinner(true);
        updateReply(bodyForm, config)
        setSelectedDeletedReplyAtt([])
    }

    const noEnterAllowed = event => {
        if (event.key === "Enter") {
            event.preventDefault()
        }
    }

    const confirmToggle = () => {
        setConfirmModal(!confirmModal)
    }

    const confirmToggle2 = tempRow => {
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
                    num: editInstructionFormik.values.no,
                }
                await dispatch(deleteInstructions(map))
                setConfirmModal(!confirmModal)
            } catch (error) {
                console.log(error)
                setConfirmModal(!confirmModal)
            }
        }

        if (isYes === true) {
            handleDeleteInstructions()
            setConfirmModal(!confirmModal)
            setLoadingSpinner(false)
        }
    }, [isYes])

    /* Paginations */

    const [currentPage, setCurrentPage] = useState(1);
    const totalReplies = replyData?.data?.count || 0;
    const totalPages = Math.ceil(totalReplies / 5);
    const repliesPerPage = 5;

    const [currentPage2, setCurrentPage2] = useState(1);
    const totalLogs = logsData?.data?.count || 0;
    const totalPages2 = Math.ceil(totalLogs / 5);
    const logsPerPage = 5;

    const offset = (currentPage - 1) * repliesPerPage;
    const offset2 = (currentPage2 - 1) * logsPerPage;

    useEffect(() => {
        if (currentPage && editInstructionFormik.values.no) {
            dispatch(getReply({
                offset: offset,
                limit: repliesPerPage,
                search: {
                    num: editInstructionFormik.values.no,
                    langType: langType,
                }
            }))
        }
    }, [currentPage, editInstructionFormik.values.no]);

    useEffect(() => {
        if (currentPage2 && editInstructionFormik.values.no) {
            dispatch(getLogs({
                offset: offset2,
                limit: logsPerPage,
                search: {
                    num: editInstructionFormik.values.no,
                    langType: langType,
                }
            }))
        }
    }, [currentPage2, editInstructionFormik.values.no]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageChange2 = (page) => {
        setCurrentPage2(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPages = 3;

        if (totalPages <= maxPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage, endPage;

            if (currentPage <= maxPages) {
                if (currentPage === maxPages) {
                    startPage = 1;
                    endPage = maxPages + 1;
                } else {
                    startPage = 1;
                    endPage = maxPages;
                }
            } else if (currentPage >= totalPages - maxPages + 1) {
                if (currentPage === totalPages - maxPages + 1) {
                    startPage = totalPages - maxPages;
                    endPage = totalPages;
                } else {
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                if (startPage > 2) {
                    pages.unshift('...');
                }
                pages.unshift(1);
            }


            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const getPageNumbers2 = () => {
        const pages = [];
        const maxPages = 3;

        if (totalPages2 <= maxPages) {
            for (let i = 1; i <= totalPages2; i++) {
                pages.push(i);
            }
        } else {
            let startPage, endPage;

            if (currentPage2 <= maxPages) {
                if (currentPage2 === maxPages) {
                    startPage = 1;
                    endPage = maxPages + 1;
                } else {
                    startPage = 1;
                    endPage = maxPages;
                }
            } else if (currentPage2 >= totalPages2 - maxPages + 1) {
                if (currentPage2 === totalPages2 - maxPages + 1) {
                    startPage = totalPages2 - maxPages;
                    endPage = totalPages2;
                } else {
                    startPage = totalPages2 - maxPages + 1;
                    endPage = totalPages2;
                }
            } else {
                startPage = currentPage2 - 1;
                endPage = currentPage2 + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                if (startPage > 2) {
                    pages.unshift('...');
                }
                pages.unshift(1);
            }

            if (endPage < totalPages2) {
                if (endPage < totalPages2 - 1) {
                    pages.push('...')
                }
                pages.push(totalPages2)
            }
        }

        return pages
    }

    /* END OF REPLY */

    /* DELETE REPLY */
    useEffect(() => {
        const replyDelete = async () => {
            //
            let row = replyRow

            if (isYes2 === true) {
                try {
                    var map = {
                        reply_num: row.num,
                    }
                    dispatch(deleteReply(map))

                    setLoadingSpinner(true)
                } catch (error) {
                    console.log(error)
                }
            } else {
                null
            }
        }

        if (isYes2 === true) {
            replyDelete()
        }

        setIsYes2(false)
    }, [replyRow, isYes2])

    const handleChangeDate = val => {
        if (val == "") {
            editInstructionFormik.setFieldValue("insDate", "")
        } else {
            editInstructionFormik.setFieldValue("insDate", val)
        }
    }

    const DeleteSelectFileR2 = id => {
        const result = selectedfileR2.filter(data => data.id !== id)
        SetSelectedFileR2(result)
    }

    const handleDeleteAttachedReplyRow = async (fNum, fName) => {
        let tempDeletedFiles = []
        tempAttachReply2.map((item, index) => {
            if (fNum != item.num) {
                tempDeletedFiles.push(tempAttachReply2[index])
            }
        })
        setTempAttachReply2(tempDeletedFiles)
        setSelectedDeletedReplyAtt(oldFnum => [...oldFnum, fNum])
    }

    const datepickerRef = useRef(null)

    useEffect(() => {
        const inputElement = datepickerRef.current.input
        inputElement.addEventListener("keydown", handleDateInputKeydown)
        inputElement.addEventListener("paste", handleDateInputPaste)

        return () => {
            inputElement.removeEventListener("keydown", handleDateInputKeydown)
            inputElement.removeEventListener("paste", handleDateInputPaste)
        }
    }, [])

    const handleDateInputKeydown = event => {
        if (event.key === "Delete" || event.key === "Backspace") {
            event.preventDefault()
        }
    }

    const handleDateInputPaste = event => {
        event.preventDefault()
    }

    /* FOR MODAL */

    const [numTemp, setNumTemp] = useState()
    const [fileNmTemp, setFileNmTemp] = useState()

    const [downloadMsg, setDownloadMsg] = useState()

    // first
    const downloadCheckFileInst = (num, fileNm) => {
        setLoadingSpinner(true)
        setNumTemp(num)
        setFileNmTemp(fileNm)
    }

    const downloadAttach = async () => {
        try {
            var indexed_array = {
                file_num: numTemp,
                file_nm: fileNmTemp,
            }
            await dispatch(downloadFileBE(indexed_array))
        } catch (error) {
            console.log(error)
        }
    }

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



    const toggleMsgModal = () => {
        setDownloadMsgModal(!downloadMsgModal)
    }

    // first
    useEffect(() => {
        if (numTemp) {
            dispatch(getCheckDownloadData({ file_num: numTemp }))
        }
    }, [numTemp])

    useEffect(() => {
        if (downloadMsg?.status === "0") {
            setDownloadMsg(downloadMessage)
            toggleMsgModal()
        } else if (downloadMsg?.status === "1") {
            downloadAttach()
        }

        setLoadingSpinner(false)
        setDownloadContentModal(downloadMessage.message)
        setDownloadMsg("")
    }, [downloadMsg])

    useEffect(() => {
        setDownloadMsg(downloadMessage)
    }, [downloadMessage])

    /* REPLY MODAL */

    const [addReplyModal, setAddReplyModal] = useState(false)

    const toggleAddReplyModal = () => {
        setAddReplyModal(!addReplyModal)
        setTimeout(() => {
            var inputField = document.getElementById("cntnt")
            if (inputField) {
                inputField.focus()
            }
        }, 0)
    }

    const [editReplyModal, setEditReplyModal] = useState(false)
    const [rowReply, setRowReply] = useState()

    const toggleEditReplyModal = row => {
        setEditReplyModal(!editReplyModal)
        setRowReply(row)
    }

    /*********************************** ENDS HERE ***********************************/

    return (
        <RootPageCustom
            msgStateGet={
                // appEditInstructionsMsg.status == 1
                //   ? null
                //   : appEditInstructionsMsg.message
                null
            }
            msgStateSet={setAppEditInstructionsMsg}
            componentJsx={
                <>
                    {appEditInstructionsMsg !== "" ? <UncontrolledAlert toggle={() => { setAppEditInstructionsMsg(""); }} color={appEditInstructionsMsg.status == "1" ? "success" : "danger"}>
                        {typeof appEditInstructionsMsg == 'string' ? null : appEditInstructionsMsg.message}</UncontrolledAlert> : null}

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

                    <AddReply
                        modal={addReplyModal}
                        toggle={toggleAddReplyModal}
                        idInstruction={editInstructionFormik?.values?.no}
                        titleInstruction={editInstructionFormik?.values?.title}
                        dateInstruction={editInstructionFormik?.values?.insDate}
                        statusInstruction={editInstructionFormik?.values?.status}
                        descriptionInstruction={
                            editInstructionFormik?.values?.description
                        }
                        addUser={addUser}
                        removeUser={removeUser}
                        removeFile={removeFile}
                        statusData={statusData}
                        selectedfile={selectedfile}
                        Files={Files}
                        setLoadingSpinner={setLoadingSpinner}
                        SetSelectedFile={SetSelectedFile}
                        SetFiles={SetFiles}
                        getDetailInstructionData={getDetailInstructionData}
                        editInstructionsMessage={editInstructionsMessage}
                        appEditInstructionsMsg={appEditInstructionsMsg}
                        setOnlyReply={setOnlyReply}
                        onlyReply={onlyReply}
                        handleChange={editInstructionFormik.handleChange}
                        setAppInstructionsData={null}
                        setUpdateNoReply={setUpdateNoReply}
                    />

                    <EditReply
                        modal={editReplyModal}
                        toggle={toggleEditReplyModal}
                        idInstruction={editInstructionFormik?.values?.no}
                        replyData={rowReply}
                        setLoadingSpinner={setLoadingSpinner}
                        getDetailInstructionData={getDetailInstructionData}
                        editInstructionsMessage={editInstructionsMessage}
                        onlyReply={onlyReply}
                        editedContent={editedContent}
                    />

                    <div
                        className="spinner-wrapper"
                        style={{
                            display: loadingSpinner ? "block" : "none",
                            zIndex: "9999",
                            position: "fixed",
                            top: "0",
                            right: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            opacity: "1",
                        }}
                    >
                        <Spinner
                            style={{
                                padding: "24px",
                                display: "block",
                                position: "fixed",
                                top: "42.5%",
                                right: "50%",
                            }}
                            color="danger"
                        />
                    </div>

                    <Container fluid="true">
                        <Row
                            style={{
                                display:
                                    getDetailInstructionData?.data?.instruction?.edit == "ALL" ||
                                        getDetailInstructionData?.data?.instruction?.edit == "STATUS"
                                        ? "flex"
                                        : "none",
                            }}
                        >
                            <Col lg={12}>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                                        {props.t("Edit Instructions")}
                                    </CardHeader>
                                    <CardBody>
                                        <Form
                                            onSubmit={e => {
                                                e.preventDefault()
                                                editInstructionFormik.handleSubmit()
                                                return false
                                            }}
                                        >
                                            <FormGroup className="mb-0">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3 col-sm-10" hidden>
                                                            <Label>Instruction ID</Label>
                                                            <Input
                                                                name="no"
                                                                type="text"
                                                                value={
                                                                    editInstructionFormik.values.no || ""
                                                                }
                                                                invalid={
                                                                    editInstructionFormik.touched.no &&
                                                                        editInstructionFormik.errors.no
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {editInstructionFormik.touched.no &&
                                                                editInstructionFormik.errors.no ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.no}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label>
                                                                {props.t("Title")}{" "}
                                                                <span style={{ color: "red" }}>* </span>
                                                            </Label>
                                                            <Input
                                                                disabled={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                }
                                                                maxLength={400}
                                                                name="title"
                                                                type="text"
                                                                onChange={
                                                                    editInstructionFormik.handleChange
                                                                }
                                                                //onBlur={handleAutoSaveTitle}
                                                                value={
                                                                    editInstructionFormik.values.title || ""
                                                                }
                                                                onKeyPress={noEnterAllowed}
                                                                invalid={
                                                                    editInstructionFormik.touched.title &&
                                                                        editInstructionFormik.errors.title
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {editInstructionFormik.touched.title &&
                                                                editInstructionFormik.errors.title ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.title}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label>
                                                                {props.t("Instruction Date")}{" "}
                                                                <span style={{ color: "red" }}>* </span>
                                                            </Label>

                                                            <DatePicker
                                                                disabled={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                }
                                                                name="insDate"
                                                                ref={datepickerRef}
                                                                className="form-control"
                                                                dateFormat="yyyy-MM-dd"
                                                                onChange={date => {
                                                                    handleChangeDate(date)
                                                                    editInstructionFormik.handleChange(
                                                                        "insDate",
                                                                        date
                                                                    )
                                                                }}
                                                                selected={
                                                                    editInstructionFormik.values.insDate
                                                                        ? new Date(
                                                                            editInstructionFormik.values.insDate
                                                                        )
                                                                        : null
                                                                }
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label>
                                                                {props.t("Status")}{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </Label>
                                                            <Input
                                                                disabled={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit !== "STATUS" &&
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit !== "ALL"
                                                                }
                                                                name="status"
                                                                type="select"
                                                                onChange={e => {
                                                                    editInstructionFormik.handleChange(e)
                                                                }}
                                                                value={editInstructionFormik.values.status}
                                                                invalid={
                                                                    editInstructionFormik.touched.status &&
                                                                    editInstructionFormik.errors.status
                                                                }
                                                            >
                                                                {statusData?.data?.statusList.map(
                                                                    (value, key) => {
                                                                        if (value.use) {
                                                                            return (
                                                                                <option key={key} value={value.name}>
                                                                                    {value.name}
                                                                                </option>
                                                                            )
                                                                        }
                                                                        return (
                                                                            <option
                                                                                style={{ backgroundColor: "#DDDDDD" }}
                                                                                disabled
                                                                                key={key}
                                                                                value={value.name}
                                                                            >
                                                                                {value.name}
                                                                            </option>
                                                                        )
                                                                    }
                                                                )}
                                                            </Input>
                                                            {editInstructionFormik.touched.status &&
                                                                editInstructionFormik.errors.status ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.status}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label
                                                                className="col-sm-5"
                                                                style={{ marginTop: "15px" }}
                                                            >
                                                                {props.t("Descriptions")}
                                                            </Label>

                                                            <Col>
                                                                <Input
                                                                    disabled={
                                                                        getDetailInstructionData?.data?.instruction
                                                                            ?.edit === "STATUS"
                                                                    }
                                                                    name="description"
                                                                    type="textarea"
                                                                    rows="12"
                                                                    onChange={
                                                                        editInstructionFormik.handleChange
                                                                    }
                                                                    value={
                                                                        editInstructionFormik.values
                                                                            .description || ""
                                                                    }
                                                                    invalid={
                                                                        editInstructionFormik.touched
                                                                            .description &&
                                                                            editInstructionFormik.errors
                                                                                .description
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                {editInstructionFormik.touched
                                                                    .description &&
                                                                    editInstructionFormik.errors
                                                                        .description ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            editInstructionFormik.errors
                                                                                .description
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </div>
                                                    </Col>

                                                    <Col md="6">
                                                        <div className="mb-3 col-sm-8">
                                                            <Label> {props.t("Owner")} </Label>
                                                            <Select
                                                                isDisabled={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                }
                                                                value={selectedMulti}
                                                                isMulti={true}
                                                                onChange={e => {
                                                                    handleMulti(e)
                                                                }}
                                                                options={optionOwner0}
                                                                className="select2-selection"
                                                                styles={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                        ? colourStylesDisabled
                                                                        : colourStyles
                                                                }
                                                                components={{
                                                                    DropdownIndicator:
                                                                        getDetailInstructionData?.data?.instruction
                                                                            ?.edit === "STATUS"
                                                                            ? DropdownIndicatorDisabled
                                                                            : DropdownIndicator,
                                                                }}
                                                                placeholder={props.t("Select or type")}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Managers")} </label>
                                                            <Select
                                                                isDisabled={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                }
                                                                value={selectedMulti2}
                                                                isMulti={true}
                                                                onChange={e => {
                                                                    handleMulti2(e)
                                                                }}
                                                                options={optionManager0}
                                                                className="select2-selection"
                                                                styles={
                                                                    getDetailInstructionData?.data?.instruction
                                                                        ?.edit === "STATUS"
                                                                        ? colourStyles2Disabled
                                                                        : colourStyles2
                                                                }
                                                                components={{
                                                                    DropdownIndicator:
                                                                        getDetailInstructionData?.data?.instruction
                                                                            ?.edit === "STATUS"
                                                                            ? DropdownIndicatorDisabled
                                                                            : DropdownIndicator,
                                                                }}
                                                                placeholder={props.t("Select or type")}
                                                            />
                                                        </div>

                                                        <div className="col-sm-8">
                                                            <label>{props.t("Attached Files")} </label>

                                                            <Form onSubmit={FileUploadSubmit}>
                                                                <div className="kb-file-upload">
                                                                    <div className="file-upload-box">
                                                                        <input
                                                                            type="file"
                                                                            ref={refCleanser}
                                                                            hidden={
                                                                                getDetailInstructionData?.data
                                                                                    ?.instruction?.edit === "STATUS"
                                                                            }
                                                                            id="fileupload2"
                                                                            className="form-control"
                                                                            onChange={InputChange}
                                                                            name="removeFile"
                                                                            multiple
                                                                            accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .avi, .mov, .mov, .mp4, .mkv, .flv"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <div className="kb-attach-box">
                                                                    {selectedfile.map((data, index) => {
                                                                        const {
                                                                            id,
                                                                            filename,
                                                                            filetype,
                                                                            fileimage,
                                                                            datetime,
                                                                            filesize,
                                                                        } = data
                                                                        return (
                                                                            <div className="file-atc-box" key={id}>
                                                                                <div className="file-detail">
                                                                                    <span>
                                                                                        <i
                                                                                            className="mdi mdi-paperclip"
                                                                                            style={{
                                                                                                fontSize: "20px",
                                                                                                verticalAlign: "middle",
                                                                                            }}
                                                                                        />
                                                                                        &nbsp;{filename}
                                                                                    </span>
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    <i
                                                                                        className="mdi mdi-close"
                                                                                        style={{
                                                                                            fontSize: "20px",
                                                                                            verticalAlign: "middle",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() => DeleteSelectFile(id)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </Form>
                                                            {Files.length > 0 ? (
                                                                <div className="kb-attach-box">
                                                                    <hr />
                                                                    {Files.map((data, index) => {
                                                                        //const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                        return (
                                                                            <div className="file-atc-box" key={index}>
                                                                                <div className="file-detail">
                                                                                    <span>
                                                                                        <i
                                                                                            className="mdi mdi-paperclip"
                                                                                            style={{
                                                                                                fontSize: "20px",
                                                                                                verticalAlign: "middle",
                                                                                            }}
                                                                                        />
                                                                                        &nbsp;{data.name}
                                                                                    </span>
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    <i
                                                                                        hidden={
                                                                                            getDetailInstructionData?.data
                                                                                                ?.instruction?.edit === "STATUS"
                                                                                        }
                                                                                        className="mdi mdi-close"
                                                                                        style={{
                                                                                            fontSize: "20px",
                                                                                            verticalAlign: "middle",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            DeleteFileAttached(data.num)
                                                                                        }
                                                                                    />
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    <i
                                                                                        className="mdi mdi-download"
                                                                                        style={{
                                                                                            fontSize: "20px",
                                                                                            verticalAlign: "middle",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            downloadCheckFileInst(
                                                                                                data.num,
                                                                                                data.name
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <span style={{ fontSize: "12px", color: "blue" }}>
                                                                {props.t(
                                                                    "Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv"
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <div className="text-sm-end col-10">
                                                <Button
                                                    hidden={
                                                        !getDetailInstructionData?.data?.instruction?.reply
                                                    }
                                                    onClick={() => {
                                                        toggleAddReplyModal()
                                                        setOnlyReply(true)
                                                    }}
                                                    color="primary"
                                                >
                                                    <i className="mdi mdi-reply fs-5 align-middle me-2"></i>
                                                    {props.t("Reply")}
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    onClick={() => {
                                                        setOnlyReply(false)
                                                        !editInstructionFormik.errors
                                                            ? setLoadingSpinner(true)
                                                            : null
                                                    }
                                                    }
                                                >
                                                    <i className="mdi mdi-check-circle fs-5 align-middle me-2"></i>
                                                    {props.t("Update")}
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    hidden={
                                                        !getDetailInstructionData?.data?.instruction?.delete
                                                    }
                                                    color="danger"
                                                    type="button"
                                                    onClick={() => {
                                                        confirmToggle()
                                                    }}
                                                >
                                                    <i className="mdi mdi-delete-forever fs-5 align-middle me-2"></i>
                                                    {props.t("Delete")}
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    type="button"
                                                    className="btn btn-danger "
                                                    onClick={() => {
                                                        history.go(-1)
                                                        setOptionManager0([])
                                                        setOptionOwner0([])
                                                        SetFiles([])
                                                    }}
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

                        <Row
                            style={{
                                display:
                                    getDetailInstructionData?.data?.instruction?.edit == "ALL" ||
                                        getDetailInstructionData?.data?.instruction?.edit == "STATUS"
                                        ? "none"
                                        : "flex",
                            }}
                        >
                            <Col lg={12}>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <i className="mdi mdi-file-document fs-5 align-middle me-2"></i>
                                        {props.t("Detail Instructions")}
                                    </CardHeader>
                                    <CardBody>
                                        <Form
                                            onSubmit={e => {
                                                e.preventDefault()
                                                editInstructionFormik.handleSubmit()
                                                return false
                                            }}
                                        >
                                            <FormGroup className="mb-0">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3 col-sm-10" hidden>
                                                            <Label>Instruction ID</Label>
                                                            <Input
                                                                name="no"
                                                                type="text"
                                                                value={
                                                                    editInstructionFormik.values.no || ""
                                                                }
                                                                invalid={
                                                                    editInstructionFormik.touched.no &&
                                                                        editInstructionFormik.errors.no
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {editInstructionFormik.touched.no &&
                                                                editInstructionFormik.errors.no ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.no}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label>
                                                                {props.t("Title")}{" "}
                                                                <span style={{ color: "red" }}>* </span>
                                                            </Label>
                                                            <Input
                                                                disabled
                                                                maxLength={50}
                                                                name="title"
                                                                type="text"
                                                                onChange={
                                                                    editInstructionFormik.handleChange
                                                                }
                                                                //onBlur={handleAutoSaveTitle}
                                                                value={
                                                                    editInstructionFormik.values.title || ""
                                                                }
                                                                invalid={
                                                                    editInstructionFormik.touched.title &&
                                                                        editInstructionFormik.errors.title
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {editInstructionFormik.touched.title &&
                                                                editInstructionFormik.errors.title ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.title}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
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
                                                                    handleChangeDate(date)
                                                                    editInstructionFormik.handleChange(
                                                                        "insDate",
                                                                        date
                                                                    )
                                                                }}
                                                                selected={
                                                                    editInstructionFormik.values.insDate
                                                                        ? new Date(
                                                                            editInstructionFormik.values.insDate
                                                                        )
                                                                        : null
                                                                }
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-10">
                                                            <Label>
                                                                {" "}
                                                                Status <span style={{ color: "red" }}>* </span>
                                                            </Label>

                                                            <Input
                                                                disabled
                                                                name="status"
                                                                type="select"
                                                                onChange={e => {
                                                                    editInstructionFormik.handleChange(e)
                                                                }}
                                                                value={editInstructionFormik.values.status}
                                                                invalid={
                                                                    editInstructionFormik.touched.status &&
                                                                    editInstructionFormik.errors.status
                                                                }
                                                            >
                                                                {statusData?.data?.statusList.map(
                                                                    (value, key) => (
                                                                        <option key={key} value={value.name}>
                                                                            {value.name}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Input>

                                                            {editInstructionFormik.touched.status &&
                                                                editInstructionFormik.errors.status ? (
                                                                <FormFeedback type="invalid">
                                                                    {editInstructionFormik.errors.status}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-sm-10">
                                                            <Label
                                                                className="col-sm-5"
                                                                style={{ marginTop: "15px" }}
                                                            >
                                                                {props.t("Descriptions")}
                                                            </Label>

                                                            <Col>
                                                                <Input
                                                                    disabled
                                                                    name="description"
                                                                    type="textarea"
                                                                    rows="12"
                                                                    onChange={
                                                                        editInstructionFormik.handleChange
                                                                    }
                                                                    value={
                                                                        editInstructionFormik.values
                                                                            .description || ""
                                                                    }
                                                                    invalid={
                                                                        editInstructionFormik.touched
                                                                            .description &&
                                                                            editInstructionFormik.errors
                                                                                .description
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                {editInstructionFormik.touched
                                                                    .description &&
                                                                    editInstructionFormik.errors
                                                                        .description ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            editInstructionFormik.errors
                                                                                .description
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </div>
                                                    </Col>

                                                    <Col md="6">
                                                        <div className="mb-3 col-sm-8">
                                                            <Label> {props.t("Owner")} </Label>

                                                            <Select
                                                                isDisabled
                                                                value={selectedMulti}
                                                                isMulti={true}
                                                                onChange={e => {
                                                                    handleMulti(e)
                                                                }}
                                                                options={optionOwner0}
                                                                className="select2-selection"
                                                                styles={colourStylesDisabled}
                                                                components={{
                                                                    DropdownIndicator: DropdownIndicatorDisabled,
                                                                }}
                                                                placeholder={"Select or type..."}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Managers")} </label>
                                                            <Select
                                                                isDisabled
                                                                value={selectedMulti2}
                                                                isMulti={true}
                                                                onChange={e => {
                                                                    handleMulti2(e)
                                                                }}
                                                                options={optionManager0}
                                                                className="select2-selection"
                                                                styles={colourStyles2Disabled}
                                                                components={{
                                                                    DropdownIndicator: DropdownIndicatorDisabled,
                                                                }}
                                                                placeholder={"Select or type..."}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-sm-8">
                                                            <label>{props.t("Attached Files")} </label>

                                                            {Files.length > 0 ? (
                                                                <div className="kb-attach-box">
                                                                    {Files.map((data, index) => {
                                                                        //const { id, filename, filetype, fileimage, datetime, filesize, file_num } = data;
                                                                        return (
                                                                            <div className="file-atc-box" key={index}>
                                                                                <div className="file-detail">
                                                                                    <span>
                                                                                        <i
                                                                                            className="mdi mdi-paperclip"
                                                                                            style={{
                                                                                                fontSize: "20px",
                                                                                                verticalAlign: "middle",
                                                                                            }}
                                                                                        />
                                                                                        &nbsp;{data.name}
                                                                                    </span>
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    {/* <i className="mdi mdi-close" style={{ fontSize: "20px", verticalAlign: "middle", cursor: "pointer" }} onClick={() => DeleteFileAttached(data.num)} /> */}
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    <i
                                                                                        className="mdi mdi-download"
                                                                                        style={{
                                                                                            fontSize: "20px",
                                                                                            verticalAlign: "middle",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            downloadCheckFileInst(
                                                                                                data.num,
                                                                                                data.name
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        <span style={{ fontSize: "12px", color: "blue" }}>
                                                            {props.t(
                                                                "Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv"
                                                            )}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </Form>

                                        <div className="text-sm-end col-10">
                                            <Button
                                                hidden={
                                                    !getDetailInstructionData?.data?.instruction?.reply
                                                }
                                                onClick={() => {
                                                    toggleAddReplyModal()
                                                    setOnlyReply(true)
                                                }}
                                                color="primary"
                                            >
                                                <i className="mdi mdi-reply fs-5 align-middle me-2"></i>
                                                {props.t("Reply")}
                                            </Button>
                                            &nbsp;
                                            <Button
                                                hidden={
                                                    !getDetailInstructionData?.data?.instruction?.delete
                                                }
                                                color="danger"
                                                type="button"
                                                onClick={() => {
                                                    confirmToggle()
                                                }}
                                            >
                                                <i className="mdi mdi-delete-forever fs-5 align-middle me-2"></i>
                                                {props.t("Delete")}
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => {
                                                    history.go(-1)
                                                    setOptionManager0([])
                                                    setOptionOwner0([])
                                                    SetFiles([])
                                                }}
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
                                        <CardHeader
                                            onClick={() => setIsHiddenReply(!isHiddenReply)}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderRadius: "15px 15px 0 0",
                                            }}
                                        >
                                            <span style={{ flex: "1", textAlign: "left" }}>
                                                <i className="mdi mdi-forum fs-5 align-middle me-2"></i>
                                                {props.t("Replies")}
                                            </span>
                                            {isHiddenReply ? (
                                                <i className="bx bxs-down-arrow font-size-8 align-middle me-2"></i>
                                            ) : (
                                                <i className="bx bxs-up-arrow font-size-8 align-middle me-2"></i>
                                            )}
                                        </CardHeader>
                                    </a>

                                    <CardBody hidden={isHiddenReply}>
                                        <div style={{ marginBottom: '16px' }}>{'Page ' + currentPage + ' of ' + totalPages}</div>
                                        <React.Fragment>
                                            <FormGroup>
                                                <Row>
                                                    <Col md="12">
                                                        <Row>

                                                            {replyData?.data?.replyList?.length > 0 &&
                                                                replyData?.data?.replyList.map((row, index) => {
                                                                    const reply_num =
                                                                        replyData?.data?.replyList.length - index
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="reply-row my-1 p-3"
                                                                            style={{
                                                                                backgroundColor: "#EEE",
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <div className="reply-num">
                                                                                {row.displayNum}
                                                                            </div>
                                                                            <div
                                                                                className="reply-fill"
                                                                                style={{ width: "95%" }}
                                                                            >
                                                                                <div className="reply-content d-flex align-items-start mb-1">
                                                                                    <div
                                                                                        className="vertical-line"
                                                                                        style={{
                                                                                            borderLeft: "2px solid #919191",
                                                                                            height: "16px",
                                                                                            margin: "0 10px",
                                                                                        }}
                                                                                    />

                                                                                    <b
                                                                                        style={{
                                                                                            whiteSpace: "pre-wrap",
                                                                                            overflowWrap: "break-word",
                                                                                            wordWrap: "break-word",
                                                                                            wordBreak: "break-word",
                                                                                        }}
                                                                                    >
                                                                                        {row.content}
                                                                                    </b>
                                                                                </div>

                                                                                {selectedRowIndex === reply_num
                                                                                    ? tempAttachReply2.map(
                                                                                        (file, index) => (
                                                                                            <React.Fragment key={index}>
                                                                                                <div className="reply-attachment d-flex align-items-start mb-1">
                                                                                                    <div
                                                                                                        className="vertical-line"
                                                                                                        style={{
                                                                                                            borderLeft:
                                                                                                                "2px solid #919191",
                                                                                                            height: "16px",
                                                                                                            margin: "0 10px",
                                                                                                        }}
                                                                                                    />
                                                                                                    <i
                                                                                                        className="mdi mdi-paperclip"
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            verticalAlign: "middle",
                                                                                                        }}
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                    <u
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            display: "inline-block",
                                                                                                            maxWidth: "80%",
                                                                                                            overflow: "hidden",
                                                                                                            textOverflow:
                                                                                                                "ellipsis",
                                                                                                            whiteSpace: "nowrap",
                                                                                                        }}
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {file.name}
                                                                                                    </u>
                                                                                                    &nbsp;
                                                                                                    <i
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            fontSize: "20px",
                                                                                                            marginTop: "-4px",
                                                                                                        }}
                                                                                                        className="mdi mdi-download"
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                    {selectedRowIndex ===
                                                                                                        reply_num && (
                                                                                                            <i
                                                                                                                style={{
                                                                                                                    cursor: "pointer",
                                                                                                                    fontSize: "20px",
                                                                                                                    marginTop: "-4px",
                                                                                                                    marginLeft: "10px",
                                                                                                                }}
                                                                                                                className="mdi mdi-close"
                                                                                                                onClick={() =>
                                                                                                                    handleDeleteAttachedReplyRow(
                                                                                                                        file.num,
                                                                                                                        file.name
                                                                                                                    )
                                                                                                                }
                                                                                                            />
                                                                                                        )}
                                                                                                    <br />
                                                                                                </div>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    )
                                                                                    : row.attachFileList.map(
                                                                                        (file, index) => (
                                                                                            <React.Fragment key={index}>
                                                                                                <div className="reply-attachment d-flex align-items-start mb-1">
                                                                                                    <div
                                                                                                        className="vertical-line"
                                                                                                        style={{
                                                                                                            borderLeft:
                                                                                                                "2px solid #919191",
                                                                                                            height: "16px",
                                                                                                            margin: "0 10px",
                                                                                                        }}
                                                                                                    />
                                                                                                    <i
                                                                                                        className="mdi mdi-paperclip"
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            verticalAlign: "middle",
                                                                                                        }}
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                    <u
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            display: "inline-block",
                                                                                                            maxWidth: "80%",
                                                                                                            overflow: "hidden",
                                                                                                            textOverflow:
                                                                                                                "ellipsis",
                                                                                                            whiteSpace: "nowrap",
                                                                                                        }}
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {file.name}
                                                                                                    </u>
                                                                                                    &nbsp;
                                                                                                    <i
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            fontSize: "20px",
                                                                                                            marginTop: "-4px",
                                                                                                        }}
                                                                                                        className="mdi mdi-download"
                                                                                                        onClick={() =>
                                                                                                            downloadCheckFileInst(
                                                                                                                file.num,
                                                                                                                file.name
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                    <br />
                                                                                                </div>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    )}
                                                                                <Row style={{ paddingLeft: "24px" }}>
                                                                                    <Col sm="10">
                                                                                        <div className="col-sm-12">
                                                                                            <Form
                                                                                                onSubmit={FileUploadSubmitR2}
                                                                                            >
                                                                                                &nbsp;
                                                                                                <div className="kb-attach-box">
                                                                                                    {selectedRowIndex ===
                                                                                                        reply_num &&
                                                                                                        selectedfileR2.map(
                                                                                                            (data, index) => {
                                                                                                                const {
                                                                                                                    id,
                                                                                                                    filename,
                                                                                                                    filetype,
                                                                                                                    fileimage,
                                                                                                                    datetime,
                                                                                                                    filesize,
                                                                                                                } = data
                                                                                                                return (
                                                                                                                    <div
                                                                                                                        className="file-atc-box"
                                                                                                                        key={id}
                                                                                                                    >
                                                                                                                        {filename.match(
                                                                                                                            /\.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
                                                                                                                        ) ? (
                                                                                                                            <div className="file-image"></div>
                                                                                                                        ) : (
                                                                                                                            <div className="file-image"></div>
                                                                                                                        )}
                                                                                                                        <div className="file-detail">
                                                                                                                            <span>
                                                                                                                                <i className="fas fa-paperclip" />
                                                                                                                                &nbsp;{filename}
                                                                                                                            </span>
                                                                                                                            &nbsp;&nbsp;&nbsp;
                                                                                                                            <i
                                                                                                                                className="mdi mdi-close"
                                                                                                                                style={{
                                                                                                                                    fontSize:
                                                                                                                                        "20px",
                                                                                                                                    verticalAlign:
                                                                                                                                        "middle",
                                                                                                                                    cursor:
                                                                                                                                        "pointer",
                                                                                                                                }}
                                                                                                                                onClick={() =>
                                                                                                                                    DeleteSelectFileR2(
                                                                                                                                        id
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                )
                                                                                                            }
                                                                                                        )}
                                                                                                </div>
                                                                                            </Form>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                                <div className="reply-history d-flex align-items-start">
                                                                                    <div
                                                                                        className="vertical-line"
                                                                                        style={{
                                                                                            borderLeft: "2px solid #919191",
                                                                                            height: "16px",
                                                                                            margin: "0 10px",
                                                                                        }}
                                                                                    />
                                                                                    <i>{row.write_time}</i>&nbsp;{" "}
                                                                                    {props.t("by")} {row.name}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="reply-actions"
                                                                                style={{
                                                                                    width: "5%",
                                                                                    display: "flex",
                                                                                    justifyContent: "end",
                                                                                }}
                                                                            >
                                                                                {row.edit ? (
                                                                                    <a
                                                                                        className="text-primary"
                                                                                        onClick={() => {
                                                                                            toggleEditReplyModal(row)
                                                                                            setEditedContent(row.content)
                                                                                        }}
                                                                                    >
                                                                                        {selectedRowIndex === reply_num ? (
                                                                                            <span
                                                                                                className="mdi mdi-check-bold"
                                                                                                style={{ fontSize: "18px" }}
                                                                                            ></span>
                                                                                        ) : (
                                                                                            <span
                                                                                                className="mdi mdi-pencil-outline"
                                                                                                style={{ fontSize: "18px" }}
                                                                                            ></span>
                                                                                        )}
                                                                                    </a>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                {row.delete ? (
                                                                                    <a
                                                                                        className="text-primary"
                                                                                        onClick={() => confirmToggle2(row)}
                                                                                    >
                                                                                        <span
                                                                                            className="mdi mdi-trash-can-outline text-danger"
                                                                                            style={{ fontSize: "18px" }}
                                                                                        ></span>
                                                                                    </a>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <Pagination aria-label="Page navigation example">
                                                <PaginationItem disabled={currentPage === 1}>
                                                    <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                                                </PaginationItem>
                                                {getPageNumbers().map((pageNumber, index) => (
                                                    <PaginationItem key={index} active={pageNumber === currentPage} disabled={pageNumber === "..."}>
                                                        <PaginationLink onClick={() => handlePageChange(pageNumber)}>
                                                            {pageNumber}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                                <PaginationItem disabled={currentPage === totalPages}>
                                                    <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                                                </PaginationItem>
                                            </Pagination>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row
                            style={{
                                display: getDetailInstructionData?.data?.instruction?.log
                                    ? "flex"
                                    : "none",
                            }}
                        >
                            <Col lg={12}>
                                <Card>
                                    <a>
                                        <CardHeader
                                            onClick={() => setIsHiddenLogs(!isHiddenLogs)}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderRadius: "15px 15px 0 0",
                                            }}
                                        >
                                            <span style={{ flex: "1", textAlign: "left" }}>
                                                <i className="mdi mdi-timer-sand font-size-8 align-middle me-2"></i>
                                                {props.t("Log")}
                                            </span>
                                            {isHiddenLogs ? (
                                                <i className="bx bxs-down-arrow font-size-8 align-middle me-2"></i>
                                            ) : (
                                                <i className="bx bxs-up-arrow font-size-8 align-middle me-2"></i>
                                            )}
                                        </CardHeader>
                                    </a>

                                    <CardBody hidden={isHiddenLogs}>

                                        <div style={{ marginBottom: '16px' }}>{'Page ' + currentPage2 + ' of ' + totalPages2}</div>

                                        <React.Fragment>
                                            <FormGroup className="mb-0">
                                                <Row>
                                                    <Col md="12">
                                                        <Row style={{ padding: "0 24px 0 24px" }}>
                                                            <table
                                                                className="tg"
                                                                style={{ marginTop: "10px" }}
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th className="tg-0lax"></th>
                                                                        <th className="tg-0lax"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="logTabelList">
                                                                    {console.log(logsData?.data?.logList)}
                                                                    {logsData?.data?.logList.length > 0 ? logsData?.data?.logList.map((row, logs) => (
                                                                            <tr key={logs} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', height: 'auto' }}>
                                                                                <td className="tg-0lax">
                                                                                    {row.write_time === " " ||
                                                                                        row.write_time === ""
                                                                                        ? ""
                                                                                        : moment(row.write_time).format(
                                                                                            "yyyy-MM-DD hh:mm"
                                                                                        )}
                                                                                </td>
                                                                                <td className="tg-0lax">
                                                                                    {row.name}
                                                                                </td>
                                                                                <td className="tg-0lax" style={{ width: '72vw', height: '100% ' }}>
                                                                                    {row.content}
                                                                                </td>
                                                                            </tr>
                                                                        )) : null}
                                                                </tbody>
                                                            </table>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <Pagination aria-label="Page navigation example">
                                                <PaginationItem disabled={currentPage2 === 1}>
                                                    <PaginationLink previous onClick={() => handlePageChange2(currentPage2 - 1)} />
                                                </PaginationItem>
                                                {getPageNumbers2().map((pageNumber, index) => (
                                                    <PaginationItem key={index} active={pageNumber === currentPage2} disabled={pageNumber === "..."}>
                                                        <PaginationLink onClick={() => handlePageChange2(pageNumber)}>
                                                            {pageNumber}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                                <PaginationItem disabled={currentPage2 === totalPages2}>
                                                    <PaginationLink next onClick={() => handlePageChange2(currentPage2 + 1)} />
                                                </PaginationItem>
                                            </Pagination>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        />
    )
}
EditInstruction.propTypes = {
    appEditInstructions: PropTypes.any,
    setEditInstructions: PropTypes.any,
    setappEditInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    instructionsData: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any,
}

export default withTranslation()(EditInstruction)