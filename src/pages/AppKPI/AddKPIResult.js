import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner, Col, Row, InputGroup } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { saveMembers } from 'store/actions';
import MsgModal from 'components/Common/MsgModal';
import { getMembersData, getMembersData2, getMembersMapping, getPermissionListData, getRankListData, resetMessage, saveGroupMapping } from 'store/appSetting/actions';
import MsgModal2 from 'components/Common/MsgModal2';
import { withTranslation } from 'react-i18next';
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'
import DatePicker from 'react-datepicker';
import moment from 'moment';

const AddKPIResult = (props) => {
    const dispatch = useDispatch();
    let langType = localStorage.getItem("I18N_LANGUAGE")
    const [addGroupMappingSpinner, setAddGroupMappingSpinner] = useState(false)
    const [successClose, setSuccessClose] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('yyyy-MM'))

    const [isClosed, setIsClosed] = useState(false)

    const [addGroupMappingMsg, setAddGroupMappingMsg] = useState(false)

    const addGroupMappingMessage = useSelector(state => {
        return state.settingReducer.msgAdd;
    });

    const appMembersData2 = useSelector(state => {
        return state.settingReducer.respGetMembersMapping;
    });

    const appGroupListData = useSelector(state => {
        return state.settingReducer.respGetGroupList;
    });

    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])

    const addGroupMappingValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            member_id: '',
            group_id: '',
        },

        validationSchema: Yup.object().shape({
            member_id: Yup.string().required(props.t("Please select member")),
            group_id: Yup.string().required(props.t("Please select group")),
        }),

        onSubmit: (value) => {
            setAddGroupMappingSpinner(true)
            dispatch(saveGroupMapping(value));
            toggleMsgModal()
        }
    })

    useEffect(() => {
        addGroupMappingValidInput.resetForm();
    }, [props.toggle]);

    const memberOption = (appMembersData2?.data?.memberList || []).map(({ name, id, index }) => ({
        value: id,
        label: name + " (" + id + ")",
    }))

    const groupOption = (appGroupListData?.data?.groupList || []).map(({ num, name }) => ({
        value: num,
        label: name,
    }))

    const [addGroupMappingMsgModal, setAddGroupMappingMsgModal] = useState(false)
    const [addgroupmappingContentModal, setAddGroupMappingContentModal] = useState("")

    const toggleMsgModal = () => {
        setAddGroupMappingMsgModal(!addGroupMappingMsgModal)
        if (addGroupMappingMsg.status === "1") {
            props.toggle()
            setAddGroupMappingMsg('')
            window.location.reload()
        }
    }

    useEffect(() => {
        if (props.modal === true) {
            dispatch(getMembersMapping({
                page: 1, limit: 10000, offset: 0, sort: "id", order: "desc", search: {
                    any: "", langType: langType
                }
            }))
        }
    }, [props.toggle])

    useEffect(() => {
        if (addGroupMappingMessage.status == "1") {
            setSuccessClose(true)
            setAddGroupMappingMsg(addGroupMappingMessage)
        } else {
            setSuccessClose(false)
        }
        setAddGroupMappingContentModal(addGroupMappingMessage.message);
        setAddGroupMappingSpinner(false)
    }, [addGroupMappingMessage]);

    const getFileIconClass = (fileName) => {
        const fileExtensions = {
            media: [".jpg", ".png", ".img", ".gif", ".mp4", ".3gp", ".mov", ".mkv", ".webm", ".avi", ".MOV", ".ogg", ".wmv"],
            pdf: [".pdf"],
            documents: [".doc", ".docx", ".txt", ".rtf", ".odt", ".html", ".xml", ".csv", ".xls", ".xlsx", ".odp"],
            excel: [".xls", ".xlsx"],
            powerpoint: [".ppt", ".pptx"],
            txt: [".txt"],
        };

        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))

        if (fileExtensions.pdf.includes(extension)) {
            return pdf
        } else if (fileExtensions.excel.includes(extension)) {
            return xls
        } else if (fileExtensions.powerpoint.includes(extension)) {
            return ppt
        } else if (fileExtensions.txt.includes(extension)) {
            return txt
        } else if (fileExtensions.media.includes(extension)) {
            return media
        } else if (fileExtensions.documents.some(ext => extension === ext)) {
            return doc
        } else {
            return doc
        }
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <MsgModal2
                modal={addGroupMappingMsgModal}
                toggle={toggleMsgModal}
                message={addgroupmappingContentModal}
                setIsClosed={setIsClosed}
                successClose={successClose}
            />
            <ModalHeader toggle={props.toggle} className='add-kpi-result-header-modal'>
                <div className='wrapper-class'>
                    <span style={{ width: 'inherit' }}>Add KPI Result</span>
                    <InputGroup style={{ flexWrap: 'unset', display: 'flex', justifyContent: "right" }}>
                        <div style={{ width: '150px' }}>
                            <DatePicker
                                onClickOutside={() => {
                                    setShowDatePicker(false)
                                    setIsButtonClicked(false)
                                }}
                                onInputClick={() => {
                                    setShowDatePicker(!showDatePicker)
                                    setIsButtonClicked(false)
                                }}
                                open={showDatePicker}
                                className="form-control custom-reset-date"
                                showMonthYearPicker
                                dateFormat="yyyy-MM"
                                selected={selectedDate ? moment(selectedDate, 'yyyy-MM').toDate() : new Date()}
                                onChange={(date) => {
                                    setSelectedDate(date ? moment(date).format('yyyy-MM') : new Date())
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                }}
                                customInput={
                                    <>
                                        <div className="react-datepicker__input-container">
                                            <input
                                                type="text"
                                                className="form-control custom-reset-date"
                                                value={selectedDate ? moment(selectedDate).format('yyyy-MM') : moment().format('yyyy-MM')}
                                            />
                                        </div>
                                    </>
                                }
                            />
                        </div>
                        <Button onClick={(e) => {
                            if (!isButtonClicked) {
                                setShowDatePicker(!showDatePicker);
                                setIsButtonClicked(true)
                            }
                        }}>
                            <span className="mdi mdi-calendar" />
                        </Button>
                    </InputGroup>
                </div>
            </ModalHeader>
            <ModalBody>
                <Row className="files">
                    <div style={{ position: "relative", textAlign: "center" }}>
                        <img style={{
                            height: '120px',
                            cursor: "pointer"
                        }}
                            // src={getFileIconClass(file.name)}
                            src={getFileIconClass("test.pdf")}
                        // onClick={items.open ? () => window.open(new URL(file.url)) : null}
                        />
                    </div>
                    <div
                        style={{
                            width: '100%',
                            fontSize: "16px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            textAlign: "center",
                            marginLeft: "50%",
                            transform: "translateX(-50%)",
                            cursor: "pointer"
                        }}
                    // onClick={items.open ? () => window.open(new URL(file.url)) : null}
                    >
                        test.pdf
                    </div>
                </Row>
                <Row style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                    marginTop: "10px"
                }}>
                    Palm Oil Corporation
                </Row>
            </ModalBody>
            <ModalFooter style={{justifyContent: "space-between"}}>
                <Row style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Col style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        width: "30%",
                        gap: ".75vw",
                    }}
                    >
                        <label className="col-sm-3" style={{ marginTop: "8px" }}>
                            Page
                        </label>
                        <div className="col-sm-5">
                            <input
                                type="number"
                                className="form-control"
                                onChange={e => setSearchVal(e.target.value)}
                                onKeyDown={e =>
                                    e.key === "Enter" ? handleEnterKeyPress(e) : null
                                }
                            />
                        </div>
                        <div className="col-sm-3">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => handleClick()}
                            >
                                Submit
                            </button>
                        </div>
                    </Col>
                    <Col>
                        <Button color="danger" onClick={props.toggle}>
                            {props.t("Close")}
                        </Button>
                    </Col>
                </Row>
            </ModalFooter>
        </Modal>
    );
};

AddKPIResult.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(AddKPIResult);