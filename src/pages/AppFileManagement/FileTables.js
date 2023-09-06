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
        dispatch(getMonthlyData({ month: props.currMonth, year: props.currYear }))
    }, [props.currMonth, props.currYear])


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])



    const closeButton = () => {

        props.toggle();
        dispatch(getMonthlyData({ month: props.currMonth, year: props.currYear }))

    }

    {
        console.log("data", dashboardData?.data?.list)
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
                                        <th scope="col">File name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData?.data?.list.map((myfiles, index) => (
                                        myfiles.num === props.idFolderDetail ? (
                                            myfiles.fileList.map((item, key) => (

                                                <tr key={key}>
                                                    <td scope="row">{key + 1}</td>
                                                    <td style={{ maxWidth: "400px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                        onClick={
                                                            item.name.endsWith("jpg") || item.name.endsWith("jpeg") || item.name.endsWith("gif") || item.name.endsWith("png") || item.name.endsWith("pdf")
                                                                ?
                                                                () => handlePreview(item.url)
                                                                :
                                                                () => downloadFile(item.num, item.name)

                                                        }
                                                        id={`nameTooltip_${key}`}

                                                    >
                                                        {item.name.endsWith("docx") || item.name.endsWith("doc") ? (
                                                            <>
                                                                <img src={doc} />
                                                                <div style={{ width: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                    {item.name}

                                                                </div>
                                                            </>
                                                        ) : (
                                                            item.name.endsWith("jpg") || item.name.endsWith("jpeg") || item.name.endsWith("gif") || item.name.endsWith("png") ? (
                                                                <>
                                                                    <img
                                                                        src={new URL(item.url)}
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
                                                            ) : (
                                                                item.name.endsWith("xls") || item.name.endsWith("xlsx") || item.name.endsWith("csv") ? (
                                                                    <>
                                                                        <img src={xls}
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
                                                                ) :
                                                                    (item.name.endsWith("ppt") || item.name.endsWith("pptx") ? (
                                                                        <>
                                                                            <img src={ppt}
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
                                                                    ) : (item.name.endsWith("pdf") ? (
                                                                        <>
                                                                            <img src={pdf}
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
                                                                    ) : (item.name.endsWith("txt") ? (
                                                                        <>
                                                                            <img src={txt}
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
                                                                    ) : (
                                                                        <>
                                                                            <img src={unknown}
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
                                                                    ))

                                                                    ))))}

                                                    </td>

                                                </tr>

                                            ))
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
                        <i className="mdi mdi-window-close fs-5 align-middle me-2"></i>{" "}
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
    currMonth: PropTypes.any,
    currYear: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(FileTables)