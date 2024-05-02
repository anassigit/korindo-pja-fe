import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import '../../assets/scss/custom/modal/modal.css'
import { withTranslation } from 'react-i18next'

const PdfViewerModal = (props) => {

    const toggleClose = () => {
        props.toggle()
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" style={{ maxWidth: '80vw' }}>
            <ModalHeader toggle={props.toggle}>{props.t("PDF Viewer")}</ModalHeader>
            <ModalBody>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        props?.url ? (
                            <embed src={`${encodeURI(props.url)}#page=${props.pageNum}`} type="application/pdf" style={{ width: "100%", minHeight: "70vh" }} />
                        ) :
                            (
                                <span className="text-danger">
                                    {props.t("File doesn't exist")}
                                </span>
                            )
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggleClose}>
                    {props.t("Close")}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

PdfViewerModal.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    url: PropTypes.string,
    pageNum: PropTypes.any,
    t: PropTypes.any
}

export default withTranslation()(PdfViewerModal)