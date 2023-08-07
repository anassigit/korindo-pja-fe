import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmModal = ( props ) => {

    const toggleYes = () => {
        props.setIsYes(true);
        props.toggle();
    };

    const toggleNo = () => {
        props.setIsYes(false);
        props.toggle();
    };

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Confirmation Message</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleYes}>
                    Yes
                </Button>
                <Button color="danger" onClick={toggleNo}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    message: PropTypes.string,
    setIsYes: PropTypes.func,
};

export default ConfirmModal;
