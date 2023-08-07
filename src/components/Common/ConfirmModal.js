import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmModal = ({ modal, toggle, message }) => {
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Confirm</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Yes
                </Button>
                <Button color="danger" onClick={toggle}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    message: PropTypes.any,
};

export default ConfirmModal;
