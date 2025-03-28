import React, { useState, useEffect, useRef } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import "../../config"
import PropTypes from "prop-types"
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
} from "reactstrap"
import {
    getInstructionsData,
    getManager,
    getOwner,
    saveInstructions,
} from "../../store/Instruction/actions"
import { useSelector, useDispatch } from "react-redux"
import { format } from "date-fns"
import Select, { components } from "react-select"
import shortid from "shortid"
import { withTranslation } from "react-i18next"
import DatePicker from "react-datepicker"

const AddInstruction = props => {

    const dispatch = useDispatch()
    let status = 1
    const [addInstructionsSpinner, setAddInstructionsSpinner] = useState(false)
    const [selectedMulti, setselectedMulti] = useState([])
    const [selectedMulti2, setselectedMulti2] = useState([])
    const [optionOwner, setOptionOwner] = useState([])
    const [optionManager, setOptionManager] = useState([])
    const [addInstructionMsgModal, setAddInstructionMsgModal] = useState(false)
    const langType = localStorage.getItem("I18N_LANGUAGE") || "kor"
    const validationMessages = {
        eng: {
            title: "Please enter instructions.",
            owner: "Please enter Owner.",
            manager: "Please enter Manager.",
        },
        kor: {
            title: "지시사항을 입력해 주세요.",
            owner: "소유자를 입력하세요.",
            manager: "관리자를 입력해 주세요.",
        },
        idr: {
            title: "Harap masukkan instruksi.",
            manager: "Harap masukkan Manager.",
            owner: "Harap masukkan Owner.",
        },
    }

    const addInstructionFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            insDate: "",
            status: "",
            description: "",
            owner: "",
            manager: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(validationMessages[langType]?.title),
            owner: Yup.string().required(validationMessages[langType]?.owner),
            manager: Yup.string().required(validationMessages[langType]?.manager)
        }),
        onSubmit: val => {
            var bodyForm = new FormData()
            bodyForm.append("title", val.title)
            bodyForm.append(
                "insDate",
                format(addInstructionFormik.values.insDate, "yyyy-MM-dd")
            )
            bodyForm.append("status", val.status)
            bodyForm.append("description", val.description)
            selectedMulti.map((data, index) => {
                bodyForm.append("user", data.value)
            })
            selectedMulti2.map((data, index) => {
                bodyForm.append("user", data.value)
            })
            if (selectedfile.length > 0) {
                for (let index = 0; index < selectedfile.length; index++) {
                    let a = selectedfile[index]

                    bodyForm.append("file" + index, selectedfile[index].fileori)
                }
            }
            setAddInstructionsSpinner(true)
            setAddInstructionMsgModal(true)
            insert(bodyForm, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            })
        }
    })

    const refCleanser = useRef(null)

    useEffect(() => {
        if (props.appAddInstructions) {
            document.getElementById("tt").focus()
            addInstructionFormik.resetForm()
            setOptionManager([])
            setOptionOwner([])
            setselectedMulti([])
            setselectedMulti2([])
            addInstructionFormik.setFieldValue("status", status)
            addInstructionFormik.setFieldValue("insDate", new Date())
            if (getOwnerList.data !== undefined) {
                getOwnerList?.data?.ownerList?.map(data => {
                    setOptionOwner(option => [...option, {
                        value: data.id,
                        label: data.name,
                        bgColor: data.bgColor,
                    }])
                })
            }
            if (getManagerList?.data !== undefined) {
                getManagerList?.data?.managerList.map(data => {
                    setOptionManager(option => [...option, {
                        value: data.id,
                        label:
                            data.name + (data.gname !== null ? ` (` + data.gname + `)` : ""),
                    }])
                })
            }
        }
    }, [props.appAddInstructions])

    const getOwnerList = useSelector(state => {
        return state.instructionsReducer.respGetOwner
    })

    const getManagerList = useSelector(state => {
        return state.instructionsReducer.respGetManager
    })

    const insert = async val => {
        await dispatch(saveInstructions(val))
    }

    const appAddInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgAdd
    })

    const [selectedfile, SetSelectedFile] = useState([])
    const [Files, SetFiles] = useState([])

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
                "No valid files selected. Allowed file types: jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt"
            )
            if (refCleanser.current) {
                refCleanser.current.value = ""
            }
            e.target.value = ""
        }
    }

    const DeleteSelectFile = id => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            SetSelectedFile(selectedfile.filter(data => data.id !== id))
        }
        if (refCleanser.current) {
            refCleanser.current.value = ""
        }
    }

    const FileUploadSubmit = async e => {
        e.preventDefault()
        e.target.reset()
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles(preValue => {
                    return [...preValue, selectedfile[index]]
                })
            }
            SetSelectedFile([])
        } else {
            alert("Please select file")
        }
    }

    function handleMulti(s) {
        if (s.length === 0) {
            addInstructionFormik.setFieldValue("owner", "")
        } else {
            addInstructionFormik.setFieldValue("owner", "a")
        }
        setselectedMulti(s)
    }
    function handleMulti2(s) {
        if (s.length === 0) {
            addInstructionFormik.setFieldValue("manager", "")
        } else {
            addInstructionFormik.setFieldValue("manager", "a")
        }
        setselectedMulti2(s)
    }

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <i className="mdi mdi-plus-thick" />
            </components.DropdownIndicator>
        )
    }

    const colourStyles = {
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

    const noEnterAllowed = event => {
        if (event.key === "Enter") {
            event.preventDefault()
        }
    }

    const toggleMsgModal = () => {
        setAddInstructionMsgModal(!addInstructionMsgModal)
    }

    useEffect(() => {
        if (appAddInstructionsMessage.status == "1") {
            props.setAppInstructionsPage(true)
            props.setAppAddInstructions(false)
            dispatch(getInstructionsData(props.appInstructionsTabelSearch))
            toggleMsgModal()
        }
        props.setAppInstructionsMsg(appAddInstructionsMessage)
        setAddInstructionsSpinner(false)
    }, [appAddInstructionsMessage])

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
        event.preventDefault()
    }

    const handleDateInputPaste = event => {
        event.preventDefault()
    }

    const handleChangeDate = val => {
        if (val == null) {
            addInstructionFormik.setFieldValue("insDate", null)
        } else {
            addInstructionFormik.setFieldValue("insDate", val)
        }
    }

    useEffect(() => {
        dispatch(
            getOwner({
                search: {
                    langType: langType,
                },
            })
        )

        dispatch(
            getManager({
                search: {
                    langType: langType,
                },
            })
        )
    }, [langType])

    useEffect(() => {
        if (getOwnerList?.data !== undefined) {
            const newOwners = getOwnerList?.data?.ownerList?.map(data => ({
                value: data.id,
                label: data.name,
                bgColor: data.bgColor,
            }))

            if (selectedMulti?.length > 0) {
                getOwnerList?.data?.ownerList?.map(val => {
                    if (val.id == selectedMulti[0].value) {
                        setselectedMulti([
                            {
                                value: val.id,
                                label: val.name,
                                bgColor: val.bgColor,
                            },
                        ])
                    }
                })
            }
            setOptionOwner(newOwners)
        }
    }, [getOwnerList])

    useEffect(() => {
        if (getManagerList?.data !== undefined) {
            const managerList = getManagerList?.data?.managerList // Store managerList in a variable for efficiency
            const newManagers = [] // Array to collect new manager objects

            // Map over selectedMulti to update it
            const updatedSelectedMulti = selectedMulti2.map(item => {
                const matchingManager = managerList?.find(
                    data => data.id === item.value
                )
                if (matchingManager) {
                    return {
                        value: matchingManager.id,
                        label:
                            matchingManager.name +
                            (matchingManager.gname !== null
                                ? ` (${matchingManager.gname})`
                                : ""),
                    }
                }
                return item // Keep other items unchanged
            })

            setselectedMulti2(updatedSelectedMulti) // Update selectedMulti

            managerList?.forEach(data => {
                const newManager = {
                    value: data.id,
                    label: data.name + (data.gname !== null ? ` (${data.gname})` : ""),
                }
                newManagers.push(newManager) // Push the new manager into the array
            })

            setOptionManager(newManagers) // Set the array of new managers outside the loop
        }
    }, [getManagerList, langType])

    useEffect(() => {
        if (props.appAddInstructions) {
            props.setAppInstructionsMsg("")
        }
        refCleanser.current.value = ""
        SetSelectedFile([])
    }, [props.appAddInstructions])

    return (
        <Container
            style={{ display: props.appAddInstructions ? "block" : "none" }}
            fluid="true"
        >
            {/* <MsgModal
                modal={addInstructionMsgModal}
                toggle={toggleMsgModal}
                message={null}
                isHidden={true}
            /> */}

            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                            <i className="mdi mdi-lead-pencil fs-5 align-middle me-2"></i>
                            {props.t("Add Instructions")}
                        </CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={e => {
                                    e.preventDefault()
                                    addInstructionFormik.handleSubmit()
                                    return false
                                }}
                            >
                                <FormGroup className="mb-0">
                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3 col-sm-10">
                                                <Label>
                                                    {props.t("Title")}{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>
                                                <Input
                                                    onKeyPress={noEnterAllowed}
                                                    maxLength={400}
                                                    name="title"
                                                    id="tt"
                                                    type="text"
                                                    onChange={addInstructionFormik.handleChange}
                                                    value={addInstructionFormik.values.title || ""}
                                                    invalid={
                                                        addInstructionFormik.touched.title &&
                                                            addInstructionFormik.errors.title
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionFormik.touched.title &&
                                                    addInstructionFormik.errors.title ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionFormik.errors.title}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label>
                                                    {props.t("Instruction Date")}{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>

                                                <DatePicker
                                                    name="insDate"
                                                    className="form-control"
                                                    dateFormat="yyyy-MM-dd"
                                                    ref={datepickerRef}
                                                    onChange={date => {
                                                        handleChangeDate(date)
                                                        addInstructionFormik.handleChange(
                                                            "insDate",
                                                            date
                                                        )
                                                        addInstructionFormik.setFieldTouched(
                                                            "insDate",
                                                            true
                                                        )
                                                    }}
                                                    selected={
                                                        addInstructionFormik.values.insDate
                                                            ? new Date(
                                                                addInstructionFormik.values.insDate
                                                            )
                                                            : null
                                                    }
                                                    isClearable={false}
                                                    invalid={
                                                        addInstructionFormik.touched.insDate &&
                                                            addInstructionFormik.errors.insDate
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionFormik.touched.insDate &&
                                                    addInstructionFormik.errors.insDate ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionFormik.errors.insDate}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div
                                                className="mb-3 col-sm-10"
                                                style={{ display: "none" }}
                                            >
                                                <Label>
                                                    {" "}
                                                    {props.t("Status")}{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="status"
                                                    disabled
                                                    onChange={addInstructionFormik.handleChange}
                                                    onBlur={addInstructionFormik.handleBlur}
                                                    value={"Not Started"}
                                                    invalid={
                                                        addInstructionFormik.touched.status &&
                                                            addInstructionFormik.errors.status
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <option></option>

                                                    <option id="1">{props.t("Not Started")}</option>
                                                </Input>
                                                {addInstructionFormik.touched.status &&
                                                    addInstructionFormik.errors.status ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionFormik.errors.status}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-10">
                                                <Label
                                                    className="col-sm-5"
                                                    style={{ marginTop: "15px" }}
                                                >
                                                    {props.t("Descriptions")}{" "}
                                                </Label>
                                                <Input
                                                    name="description"
                                                    type="textarea"
                                                    rows="12"
                                                    onChange={addInstructionFormik.handleChange}
                                                    value={
                                                        addInstructionFormik.values.description || ""
                                                    }
                                                    invalid={
                                                        addInstructionFormik.touched.description &&
                                                            addInstructionFormik.errors.description
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionFormik.touched.description &&
                                                    addInstructionFormik.errors.description ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionFormik.errors.description}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3 col-sm-8">
                                                <Label>
                                                    {" "}
                                                    {props.t("Owner")}{" "}
                                                    <span style={{ color: "red" }}>* </span>{" "}
                                                </Label>
                                                <Select
                                                    isOptionDisabled={() => selectedMulti.length >= 1}
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={e => {
                                                        handleMulti(e)
                                                    }}
                                                    options={optionOwner}
                                                    className={`select2-selection ${addInstructionFormik.errors.owner &&
                                                        addInstructionFormik.touched.owner
                                                        ? "custom-invalid"
                                                        : ""
                                                        }`}
                                                    styles={colourStyles}
                                                    components={{ DropdownIndicator }}
                                                    placeholder={props.t("Select or type")}
                                                />
                                                {addInstructionFormik.errors.owner &&
                                                    addInstructionFormik.touched.owner && (
                                                        <div
                                                            style={{
                                                                color: "#f46a6a",
                                                                width: "100%",
                                                                marginTop: "0.25rem",
                                                                fontSize: "80%",
                                                                display: "block",
                                                            }}
                                                        >
                                                            {addInstructionFormik.errors.owner}
                                                        </div>
                                                    )}
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <Label>
                                                    {props.t("Managers")}{" "}
                                                    <span style={{ color: "red" }}>* </span>{" "}
                                                </Label>
                                                <Select
                                                    //id="user"
                                                    value={selectedMulti2}
                                                    isMulti={true}
                                                    onChange={e => {
                                                        handleMulti2(e)
                                                    }}
                                                    options={optionManager}
                                                    className={`select2-selection ${addInstructionFormik.errors.manager &&
                                                        addInstructionFormik.touched.manager
                                                        ? "custom-invalid"
                                                        : ""
                                                        }`}
                                                    styles={colourStyles2}
                                                    components={{ DropdownIndicator }}
                                                    placeholder={props.t("Select or type")}
                                                    invalid={selectedMulti2.length >= 1}
                                                />
                                                {addInstructionFormik.errors.manager &&
                                                    addInstructionFormik.touched.manager && (
                                                        <div
                                                            style={{
                                                                color: "#f46a6a",
                                                                width: "100%",
                                                                marginTop: "0.25rem",
                                                                fontSize: "80%",
                                                                display: "block",
                                                            }}
                                                        >
                                                            {addInstructionFormik.errors.manager}
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="mb-3 col-sm-8">
                                                <label>{props.t("Upload Attach Files")} </label>

                                                <Form onSubmit={FileUploadSubmit}>
                                                    <div className="kb-file-upload">
                                                        <div className="kb-file-upload">
                                                            <div className="file-upload-box">
                                                                <input
                                                                    type="file"
                                                                    id="fileuploadAdd"
                                                                    className="form-control"
                                                                    ref={refCleanser}
                                                                    onChange={InputChange}
                                                                    name="removeFile"
                                                                    multiple
                                                                    accept=".jpg, .jpeg, .png, .gif, .svg, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .avi, .mov, .mp4, .mkv, .flv"
                                                                />
                                                            </div>
                                                        </div>
                                                        <span style={{ fontSize: "12px", color: "blue" }}>
                                                            {props.t(
                                                                "Allowed File Types Are jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, avi, mov, mp4, mkv, flv"
                                                            )}
                                                        </span>
                                                        &nbsp;&nbsp;&nbsp;
                                                    </div>

                                                    <div className="kb-attach-box mb-3">
                                                        <h6>{props.t("Attach files preview")}</h6>

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
                                                                    {filename.match(
                                                                        /.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|avi|mov|mp4|mkv|flv)$/i
                                                                    ) ? (
                                                                        <div className="file-image"></div>
                                                                    ) : (
                                                                        <div className="file-image"></div>
                                                                    )}
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
                                                                        &nbsp;&nbsp;
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
                                            </div>
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <div className="text-sm-end col-10">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            disabled={addInstructionsSpinner}
                                            className="ms-1"
                                        >
                                            <i className="mdi mdi-check fs-5 align-middle" />{" "}
                                            {props.t("Add")}
                                        </Button>
                                        &nbsp;
                                        <Button
                                            type="button"
                                            className="btn btn-danger "
                                            onClick={() => {
                                                props.setAppInstructionsPage(true)
                                                props.setAppAddInstructions(false)
                                                props.setAppInstructionsMsg("")
                                            }}
                                        >
                                            <i className="mdi mdi-keyboard-backspace fs-5 align-middle" />{" "}
                                            {props.t("Back")}
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div
                className="spinner-wrapper"
                style={{
                    display: addInstructionsSpinner ? "block" : "none",
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
        </Container>
    )
}

AddInstruction.propTypes = {
    appAddInstructions: PropTypes.any,
    setAppAddInstructions: PropTypes.any,
    setAppInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any,
}
export default withTranslation()(AddInstruction)