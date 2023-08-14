import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} backdrop="static">
      <ModalBody className="py-3 px-3">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle"
                style={{ fontSize: "9em", color: "red" }}
              />
              <h5>{"Apakah anda yakin akan menghapus data ini?"}</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-primary btn-md ms-2"
                onClick={onDeleteClick}
              >
                Hapus
              </button>
              <button
                type="button"
                className="btn btn-danger btn-md ms-2"
                onClick={onCloseClick}
              >
                Batal
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default DeleteModal
