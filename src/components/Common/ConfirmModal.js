import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { withTranslation } from "react-i18next"

const ConfirmModal = ( props ) => {

    const toggleYes = () => {
        props.setIsYes(true)
        props.toggle()
    }

    const toggleNo = () => {
        props.setIsYes(false)
        props.toggle()
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <ModalHeader toggle={props.toggle}>{props.t("Confirmation Message")}</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleYes}>
                  {props.t("Yes")}
                </Button>
                <Button color="danger" onClick={toggleNo}>
                    {props.t("No")}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    message: PropTypes.string,
    setIsYes: PropTypes.func,
    location: PropTypes.object,
    t: PropTypes.any
}

export default withTranslation()(ConfirmModal)