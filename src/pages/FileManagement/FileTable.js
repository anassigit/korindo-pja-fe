import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Row,
    UncontrolledTooltip
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessage, getMonthlyData, deleteFileFolder } from '../../store/FileManagement/actions'
import { withTranslation } from "react-i18next"
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'
import unknown from '../../assets/images/file_management/unknown.png'
import ConfirmModal from 'components/Common/ConfirmModal'

const FileTable = (props) => {

    const dispatch = useDispatch()

    const [confirmModalDelete, setConfirmModalDelete] = useState(false)
    const [tempIdDel, setTempIdDel] = useState()
    const [isYes, setIsYes] = useState(false)

    const dashboardData = useSelector(state => {
        return state.fileManagementReducer.respGetMonthlyData
    })

    useEffect(() => {
        if (props.dateState && props.dateState instanceof Date) {
            const tempDate = `${props.dateState.getFullYear()}-${(props.dateState.getMonth() + 1).toString().padStart(2, '0')}`
            const formattedDate = tempDate.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        } else if (props.dateState) {
            const formattedDate = props.dateState.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        }
    }, [props.dateState])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (isYes && tempIdDel) {
            let num = null
            num = tempIdDel
            num.toString()
            props.setEnterMonthlyDataSpinner(true)
            dispatch(deleteFileFolder(
                {
                    'file_num': num
                }
            ))
            props.setMonthlyDataMsg('')
            setIsYes(false)
        }
    }, [isYes])

    const closeButton = () => {
        props.toggle()
        if (props.dateState instanceof Date) {
            const tempDate = `${props.dateState.getFullYear()}-${(props.dateState.getMonth() + 1).toString().padStart(2, '0')}`
            const formattedDate = tempDate.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        } else {
            const formattedDate = props.dateState.replace(/-/g, '')
            dispatch(getMonthlyData({ date: formattedDate }))
        }

    }

    const handlePreview = (pUrl) => window.open().location.href = new URL(pUrl)

    const confirmToggleDelete = (e) => {
        if (e) {
            setTempIdDel(e)
        }
        setConfirmModalDelete(!confirmModalDelete)
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static">
            <ConfirmModal
                modal={confirmModalDelete}
                toggle={confirmToggleDelete}
                message={props.t("Are you sure to delete this?")}
                setIsYes={setIsYes}
            />
            <Form onSubmit={(e) => {
                e.preventDefault()
                valid.handleSubmit()
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("List files")}</ModalHeader>
                <ModalBody>
                    <Row>
                        <div >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col"/>
                                        <th scope="col">{props.t("Files name")}</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData?.data?.list.map((myfiles, index) => (
                                        myfiles.num === props.idFolderDetail ? (
                                            myfiles.fileList.map((item, key) => {
                                                const fileExtension = item.name.slice(item.name.lastIndexOf(".") + 1).toLowerCase()
                                                const allowedExtensions = ["jpg", "jpeg", "gif", "png", "mp4", "mov", "avi", "mpg", "mpeg"]
                                                let icon = unknown
                                                let action
                                                if (allowedExtensions.includes(fileExtension)) {
                                                    icon = media
                                                    action = () => handlePreview(item.url)
                                                } else if (item.name.endsWith("docx") || item.name.endsWith("doc")) {
                                                    icon = doc
                                                    action = () => handlePreview(item.url)
                                                } else if (item.name.endsWith("xls") || item.name.endsWith("xlsx") || item.name.endsWith("csv")) {
                                                    icon = xls
                                                    action = () => handlePreview(item.url)
                                                } else if (item.name.endsWith("ppt") || item.name.endsWith("pptx")) {
                                                    icon = ppt
                                                    action = () => handlePreview(item.url)
                                                } else if (item.name.endsWith("pdf")) {
                                                    icon = pdf
                                                    action = () => handlePreview(item.url)
                                                } else if (item.name.endsWith("txt")) {
                                                    icon = txt
                                                    action = () => handlePreview(item.url)
                                                } else {
                                                    icon = doc
                                                    action = () => window.open(new URL(item.url))
                                                }
                                                return (
                                                    <tr key={key}>
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
                                                            onClick={myfiles.open ? action : null}
                                                            id={`nameTooltip_${key}`}
                                                        >
                                                            <>
                                                                {item.name}
                                                                <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                                                    {item.name}
                                                                </UncontrolledTooltip>
                                                            </>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span
                                                                className='mdi mdi-delete'
                                                                style={{
                                                                    color: "#B4B4B8",
                                                                    fontSize: '18px',
                                                                }}
                                                                onClick={() => confirmToggleDelete(item?.num)}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { closeButton() }} className='align-middle me-2'>
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

FileTable.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idFolderDetail: PropTypes.any,
    dateState: PropTypes.any,
    setMonthlyDataMsg: PropTypes.any,
    setEnterMonthlyDataSpinner: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(FileTable)