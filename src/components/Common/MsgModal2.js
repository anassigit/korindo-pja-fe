import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const MsgModal2 = (props) => {

    const toggleClose = () => {
        props.setIsClosed(true);
        props.toggle();
    };

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Message</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggleClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

MsgModal2.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    message: PropTypes.string,
    setIsClosed: PropTypes.func,
};

export default MsgModal2;
