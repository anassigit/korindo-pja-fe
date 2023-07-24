import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const MsgModal = ({ modal, toggle, message }) => {
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Message</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

MsgModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    message: PropTypes.any,
};

export default MsgModal;
