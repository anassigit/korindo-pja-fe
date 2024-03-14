import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Spinner,
    Row,
    Label,
    Input,
    UncontrolledTooltip
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, getMonthlyData } from '../../store/appFileManagement/actions';
import { withTranslation } from "react-i18next"
import { downloadFileFolder } from "helpers/backend_helper";

import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import unknown from '../../assets/images/file_management/unknown.png'

const FileTables = (props) => {


    const dispatch = useDispatch();
    const [detailSpinner, setDetailSpinner] = useState(false)
    const [detailMsg, setDetailMsg] = useState(false)
    const [detailMsgModal, setDetailMsgModal] = useState(false)
    const [detailContentModal, setDetailContentModal] = useState("")
    const [successClose, setSuccessClose] = useState(false)

    const [numF, setNumF] = useState("")
    const [numP, setNumP] = useState(0)
    const [nem, setNem] = useState("")


    const dashboardData = useSelector(state => {
        return state.fileManagementReducer.respGetMonthlyData;
    })

    const moveRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgMove;
    })

    useEffect(() => {
        if (props.dateState instanceof Date) {
            const tempDate = `${props.dateState.getFullYear()}-${(props.dateState.getMonth() + 1).toString().padStart(2, '0')}`
            const formattedDate = tempDate.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        } else {
            const formattedDate = props.dateState.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))

        }
    }, [props.dateState])


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])



    const closeButton = () => {

        props.toggle();
        if (props.dateState instanceof Date) {
            const tempDate = `${props.dateState.getFullYear()}-${(props.dateState.getMonth() + 1).toString().padStart(2, '0')}`
            const formattedDate = tempDate.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        } else {
            const formattedDate = props.dateState.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))

        }

    }


    const handlePreview = (pUrl) => {

        const previewFile = window.open();
        previewFile.location.href = new URL(pUrl);

    };

    const [numTemp, setNumTemp] = useState()
    const [fileNmTemp, setFileNmTemp] = useState()
    const [downloadFlag, setDownloadFlag] = useState(false)


    const downloadFile = async (pNum, pName) => {
        try {

            const indexed_array = {
                file_num: pNum,
                file_nm: pName
            };
            dispatch(downloadFileFolder(indexed_array))
        } catch (error) {
            console.log(error)
        }
    };



    return (

        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static" keyboard={false}>

            {/* <MsgModal
                modal={detailMsgModal}
                toggle={toggleMsgModal}
                message={detailContentModal}
                successClose={successClose}
            /> */}

            <Form onSubmit={(e) => {
                e.preventDefault();
                valid.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("List files")}</ModalHeader>
                <ModalBody>
                    {/* <Row><h6><i className="mdi mdi-folder align-middle fs-5" /> {"  "}{props.t("Folders")}</h6></Row> */}

                    <Row>

                        <div >
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">{props.t("Files name")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData?.data?.list.map((myfiles, index) => (
                                        myfiles.num === props.idFolderDetail ? (
                                            myfiles.fileList.map((item, key) => {
                                                const fileExtension = item.name.slice(item.name.lastIndexOf(".") + 1).toLowerCase();
                                                const allowedExtensions = ["jpg", "jpeg", "gif", "png", "pdf"];
                                                let icon = unknown;
                                                let action;

                                                if (allowedExtensions.includes(fileExtension)) {
                                                    icon = new URL(item.url);
                                                    action = () => handlePreview(item.url);
                                                } else if (item.name.endsWith("docx") || item.name.endsWith("doc")) {
                                                    icon = doc;
                                                    action = () => handlePreview(item.url);
                                                } else if (item.name.endsWith("xls") || item.name.endsWith("xlsx") || item.name.endsWith("csv")) {
                                                    icon = xls;
                                                    action = () => handlePreview(item.url);
                                                } else if (item.name.endsWith("ppt") || item.name.endsWith("pptx")) {
                                                    icon = ppt;
                                                    action = () => handlePreview(item.url);
                                                } else if (item.name.endsWith("pdf")) {
                                                    icon = pdf;
                                                    action = () => handlePreview(item.url);
                                                } else if (item.name.endsWith("txt")) {
                                                    icon = txt;
                                                    action = () => handlePreview(item.url);
                                                } else {
                                                    action = () =>  window.open(new URL(item.url));
                                                }

                                                return (
                                                    <tr key={key}>
                                                        <td scope="row">{key + 1}</td>
                                                        <td
                                                            style={{
                                                                maxWidth: "400px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            }}
                                                            onClick={myfiles.open ? action : null}
                                                            id={`nameTooltip_${key}`}
                                                        >
                                                            <>
                                                                <img
                                                                    src={icon}
                                                                    style={{
                                                                        height: "15px",
                                                                        width: "15px",
                                                                        alignItems: "unset"
                                                                    }}
                                                                />{" "}{item.name}
                                                                <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                                                    {item.name}
                                                                </UncontrolledTooltip>
                                                            </>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : null
                                    ))}

                                </tbody>
                            </table>
                        </div>


                    </Row>



                </ModalBody>
                <ModalFooter>
                    {/* <Button type="submit" color={detailSpinner ? "primary disabled" : "primary"}>
                        <i className="mdi mdi-check fs-5 align-middle me-2"></i>{" "}
                        {props.t("Move")}
                        <Spinner style={{ display: detailSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button> */}
                    <Button color="danger" onClick={() => { closeButton() }} className='align-middle me-2'>

                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>

        </Modal>

    );


}

FileTables.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idFolderDetail: PropTypes.any,
    dateState: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(FileTables)