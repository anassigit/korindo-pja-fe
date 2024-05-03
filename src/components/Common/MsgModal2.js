import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import '../../assets/scss/custom/modal/modal.css'
import { withTranslation } from 'react-i18next'

const MsgModal2 = (props) => {

    const toggleClose = () => {
        props.setIsClosed(true)
        props.toggle()
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            <ModalHeader toggle={props.toggle}>{props.t("Message")}</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                {
                    props.successClose === true ?
                        <Button color="primary" onClick={toggleClose}>
                            {props.t("Ok")}
                        </Button>
                        :
                        <Button color="danger" onClick={toggleClose}>
                            {props.t("Close")}
                        </Button>
                }
            </ModalFooter>
        </Modal>
    )
}

MsgModal2.propTypes = {
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    message: PropTypes.string,
    setIsClosed: PropTypes.func,
    successClose: PropTypes.any,
    t: PropTypes.any
}

export default withTranslation()(MsgModal2)