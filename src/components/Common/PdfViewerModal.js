import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'

const PdfViewerModal = (props) => {

    const toggleClose = () => {
        props.toggle();
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" style={{ maxWidth: '80vw' }}>
            <ModalHeader toggle={props.toggle}>PDF</ModalHeader>
            <ModalBody>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        props?.url ? (
                            <embed src={`${encodeURI(props.url)}#page=8`} type="application/pdf" style={{ width: "100%", minHeight: "70vh" }} />
                        ) :
                            (
                                <span className="text-danger">
                                    File Doesn&#39;t Exist
                                </span>
                            )
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggleClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

PdfViewerModal.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    url: PropTypes.string,
};

export default PdfViewerModal;
