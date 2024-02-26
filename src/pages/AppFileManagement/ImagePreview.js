
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from "react-i18next"
import "../../assets/scss/custom/modal/modal.css"


const ImagePreview = (props) => {

    const dispatch = useDispatch();
    const [previewSpinner, setPreviewSpinner] = useState(false)

    return (
        <Modal
            className="modal-custom"
            isOpen={props.modal}
            toggle={props.toggle}
            centered={true}
        >

            <ModalBody>
                {["jpg", "jpeg", "gif", "png"].includes(props.fileType.toLowerCase()) && (
                    <img
                        style={{
                            maxHeight: "100%",
                            width: "100%",
                        }}
                        src={props.URLImage}
                        alt={props.nmImage}
                    />
                )}
                {["mp4", "mkv", "flv", "mov","avi"].includes(props.fileType.toLowerCase()) && (
                    <video
                        controls
                        style={{
                            maxHeight: "100%",
                            width: "100%",
                        }}
                        src={props.URLImage}
                        alt={props.nmImage}
                    />
                )}
                <ModalFooter className="modal-footer">{props.nmImage}</ModalFooter>
            </ModalBody>



        </Modal>
    );

};

ImagePreview.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idImage: PropTypes.any,
    nmImage: PropTypes.any,
    fileType: PropTypes.any,
    URLImage: PropTypes.any,
    locImage: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};

export default withTranslation()(ImagePreview)