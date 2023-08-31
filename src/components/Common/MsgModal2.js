import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'

const MsgModal2 = (props) => {

    const toggleClose = () => {
        props.setIsClosed(true);
        props.toggle();
    };

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <ModalHeader toggle={props.toggle}>Message</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                {
                    props.successClose === true ?
                        <Button color="primary" onClick={toggleClose}>
                            Ok
                        </Button>
                        :
                        <Button color="danger" onClick={toggleClose}>
                            Close
                        </Button>
                }
            </ModalFooter>
        </Modal>
    );
};

MsgModal2.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    message: PropTypes.string,
    setIsClosed: PropTypes.func,
    successClose: PropTypes.any,
};

export default MsgModal2;
