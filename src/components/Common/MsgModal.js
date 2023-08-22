import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'

const MsgModal = ({ modal, toggle, message, isHidden }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>{isHidden == null ? 'Message' : 'Loading'}</ModalHeader>
            <ModalBody>
                {message == null ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner
                            animation="grow"
                            style={{
                                width: '250px',
                                height: '250px',
                                display: 'block',
                                left: '50%',
                                top: '50%',
                            }}
                            color="danger"
                        />
                    </div>
                ) : (
                    message
                )}
            </ModalBody>
            <ModalFooter hidden={isHidden == null ? false : isHidden}>
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
    isHidden: PropTypes.any,
};

export default MsgModal;
