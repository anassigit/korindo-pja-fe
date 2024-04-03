import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    UncontrolledTooltip
} from 'reactstrap'
import { withTranslation } from "react-i18next"
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'
import unknown from '../../assets/images/file_management/unknown.png'

const FileTable = (props) => {

    const [selectedFileNum, setSelectedFileNum] = useState("")

    const closeButton = () => {
        props.toggle()
    }

    const handlePreview = (pUrl) => {
        const previewFile = window.open()
        previewFile.location.href = new URL(pUrl)
    }

    useEffect(() => {
        if (props.modal === true) {
            setSelectedFileNum(props.currentSelectedFileNum)
        }
    }, [props.toggle])

    return (

        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static">
            <ModalHeader toggle={props.toggle}>{props.t("List files")}</ModalHeader>
            <ModalBody>
                <Row>
                    <div >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col" style={{}}></th>
                                    <th scope="col">{props.t("Files name")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.appFileListData?.data?.list?.fileList?.map((file, key) => {
                                    const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase()
                                    const allowedExtensions = ["jpg", "jpeg", "gif", "png", "mp4", "mov", "avi", "mpg", "mpeg"]
                                    let icon = unknown
                                    let action

                                    if (allowedExtensions.includes(fileExtension)) {
                                        icon = media
                                        action = () => handlePreview(file.url)
                                    } else if (file.name.endsWith("docx") || file.name.endsWith("doc")) {
                                        icon = doc
                                        action = () => handlePreview(file.url)
                                    } else if (file.name.endsWith("xls") || file.name.endsWith("xlsx") || file.name.endsWith("csv")) {
                                        icon = xls
                                        action = () => handlePreview(file.url)
                                    } else if (file.name.endsWith("ppt") || file.name.endsWith("pptx")) {
                                        icon = ppt
                                        action = () => handlePreview(file.url)
                                    } else if (file.name.endsWith("pdf")) {
                                        icon = pdf
                                        action = () => handlePreview(file.url)
                                    } else if (file.name.endsWith("txt")) {
                                        icon = txt
                                        action = () => handlePreview(file.url)
                                    } else {
                                        icon = doc
                                        action = () => window.open(new URL(file.url))
                                    }

                                    return (
                                        <tr key={key} onClick={() => setSelectedFileNum(file.num.toString())} style={{ backgroundColor: selectedFileNum === file.num.toString() ? "silver" : "" }}>
                                            <td scope="row" style={{ textAlign: 'center' }}>{key + 1}</td>
                                            <td scope="row" style={{
                                                width: '1%'
                                            }}>
                                                <img
                                                    src={icon}
                                                    style={{
                                                        height: "15px",
                                                        width: "12px",
                                                        alignItems: "unset"
                                                    }}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    maxWidth: "315px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}
                                                id={`nameTooltip_${key}`}
                                            >
                                                <>
                                                    {file.name}
                                                    <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                                        {file.name}
                                                    </UncontrolledTooltip>
                                                </>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={selectedFileNum !== "" ? () => {
                    props.setCurrentSelectedFileNum(selectedFileNum)
                    closeButton()
                } : null}
                    color={selectedFileNum === "" ? "primary disabled" : "primary"}
                    className='align-middle me-2'>
                    {props.t("Select")}
                </Button>
                <Button color="danger" onClick={() => { 
                    closeButton() 
                    }} className='align-middle me-2'>
                    {props.t("Close")}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

FileTable.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    appFileListData: PropTypes.any,
    currentSelectedFileNum: PropTypes.any,
    setCurrentSelectedFileNum: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(FileTable)