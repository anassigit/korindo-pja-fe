import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap'
import '../../assets/scss/custom/modal/modal.css'
import { withTranslation } from 'react-i18next'

const MsgModal = ({ modal, toggle, message, successClose, t }) => {

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>{t("Message")}</ModalHeader>
            <ModalBody>
                {message == null ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner
                            animation="grow"
                            style={{
                                width: '25px',
                                height: '25px',
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
            <ModalFooter>
                {
                    successClose === true ?
                        <Button color="primary" onClick={toggle}>
                            {t("Ok")}
                        </Button>
                        :
                        <Button color="danger" onClick={toggle}>
                            {t("Close")}
                        </Button>
                }
            </ModalFooter>
        </Modal>
    )
}

MsgModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    message: PropTypes.any,
    successClose: PropTypes.any,
    t: PropTypes.any
}

export default withTranslation()(MsgModal)